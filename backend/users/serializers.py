from django.contrib.auth import password_validation, get_user_model, authenticate
from django.contrib.auth.password_validation import validate_password
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.encoding import force_bytes
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from rest_framework import serializers
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from users.models import UserCustomProfile, UserRole
from django.conf import settings


class UserSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(default=True)
    class Meta:
        model = UserCustomProfile
        fields = ['id','email', 'role', 'is_active', 'is_staff', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    username_field = 'email'

    def validate(self, attrs):
        print(attrs)
        # custom authenticate using email
        credentials = {
            'email': attrs.get('email'),
            'password': attrs.get('password')
        }

        user = authenticate(**credentials)

        if user is None:
            raise serializers.ValidationError('No active account found')

        refresh = self.get_token(user)
        data = {
            'refresh': str(refresh),
            'access': str(refresh.access_token),
            'user_id': user.id,
            'email': user.email,
            'role': user.role,
        }
        return data

    # def validate(self, attrs):
    #     data = super().validate(attrs)
    #     data['user_id'] = self.user.id
    #     data['email'] = self.user.email
    #     data['role'] = self.user.role
    #     return data

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = UserCustomProfile
        fields = ['email', 'password', 'role']

    def create (self, validated_data):
        user = UserCustomProfile.objects.create_user(
            email = validated_data['email'],
            password = validated_data['password'],
            role = validated_data.get('role', UserRole.WORKER),
        )
        return user

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_old_password(self, value):
        user = self.context['request'].user
        if not user.check_password(value):
            raise serializers.ValidationError("Old password is incorrect")
        return value

    def validate_new_password(self, value):
        password_validation.validate_password(value)
        return value


User = get_user_model()

class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

    def validate_email(self, value):
        if not User.objects.filter(email=value).exists():
            raise serializers.ValidationError("User with this email does not exist.")
        return value

    def save(self, **kwargs):
        email = self.validated_data['email']
        user = User.objects.get(email=email)

        token = default_token_generator.make_token(user)
        uid = urlsafe_base64_encode(force_bytes(user.pk))

        reset_url = f"{settings.FRONTEND_URL}/reset-password/?uid={uid}&token={token}"

        send_mail(
            subject="Reset your password",
            message=f"Click the link to reset your password: {reset_url}",
            from_email="noreply@example.com",
            recipient_list=[email],
            fail_silently=False,
        )

class PasswordResetConfirmSerializer(serializers.Serializer):
    uid = serializers.CharField()
    token = serializers.CharField()
    new_password = serializers.CharField(write_only=True)

    def validate(self, attrs):
        try:
            uid = urlsafe_base64_decode(attrs['uid']).decode()
            self.user = User.objects.get(pk=uid)
        except (User.DoesNotExist, ValueError, TypeError, OverflowError):
            raise serializers.ValidationError("Invalid UID")

        if not default_token_generator.check_token(self.user, attrs['token']):
            raise serializers.ValidationError("Invalid or expired token")

        validate_password(attrs['new_password'], self.user)
        return attrs