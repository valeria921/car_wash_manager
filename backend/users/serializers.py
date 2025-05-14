from rest_framework import serializers
from users.models import UserCustomProfile, UserRole


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserCustomProfile
        fields = ['id','email', 'role', 'is_active', 'is_staff', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']

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

