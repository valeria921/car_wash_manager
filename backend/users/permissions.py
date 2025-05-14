from rest_framework.permissions import BasePermission
from users.models import UserRole


class IsOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == UserRole.OWNER

class IsManagerOrOwner(BasePermission):
    def has_permission(self, request, view):
        return request.user.role in [UserRole.MANAGER, UserRole.OWNER]

class IsSelfOrOwner(BasePermission):
    def has_object_permission(self, request, view, obj):
        return request.user == obj or request.user.role == UserRole.OWNER

class IsWorker(BasePermission):
    def has_permission(self, request, view):
        return request.user.role == UserRole.WORKER

