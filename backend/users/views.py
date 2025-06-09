from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework_simplejwt.views import TokenObtainPairView
from users.models import UserCustomProfile, UserRole
from users.permissions import IsOwner, IsManagerOrOwner, IsWorker, IsSelfOrOwner
from users.serializers import UserCreateSerializer, UserSerializer, MyTokenObtainPairSerializer, \
    PasswordResetRequestSerializer, PasswordResetConfirmSerializer


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


class UserListViewSet(ModelViewSet):
    queryset = UserCustomProfile.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action == 'create':
            return [IsAuthenticated(), IsOwner()]
        elif self.action in ['update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwner()]
        elif self.action == 'list':
            return [IsAuthenticated(), IsManagerOrOwner()]
        elif self.action == 'retrieve':
            return [IsAuthenticated(), IsSelfOrOwner()]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role in [UserRole.OWNER, UserRole.MANAGER]:
            return UserCustomProfile.objects.all()
        return UserCustomProfile.objects.filter(id=user.id)


class PasswordResetRequestView(APIView):
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password reset link sent to your email."}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetConfirmView(APIView):
    def post(self, request):
        serializer = PasswordResetConfirmSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Password has been reset successfully."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

