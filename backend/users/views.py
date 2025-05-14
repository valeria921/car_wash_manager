from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet
from users.models import UserCustomProfile, UserRole
from users.permissions import IsOwner, IsManagerOrOwner, IsWorker, IsSelfOrOwner
from users.serializers import UserCreateSerializer, UserSerializer


class UserListViewSet(ModelViewSet):
    queryset = UserCustomProfile.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        return UserSerializer

    def get_permissions(self):
        if self.action in ['create', 'update', 'partial_update', 'destroy']:
            return [IsAuthenticated(), IsOwner()]
        elif self.action == 'list':
            return [IsAuthenticated(), IsManagerOrOwner()]
        elif self.action == ['retrieve']:
            return [IsAuthenticated(), IsSelfOrOwner]
        return [IsAuthenticated()]

    def get_queryset(self):
        user = self.request.user
        if user.role in [UserRole.OWNER, UserRole.MANAGER]:
            return UserCustomProfile.objects.all()
        return UserCustomProfile.objects.filter(id=user.id)


