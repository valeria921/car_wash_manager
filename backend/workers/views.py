from rest_framework.permissions import IsAuthenticated
from rest_framework.viewsets import ModelViewSet

from users.permissions import IsOwner, IsSelfOrOwner, IsManagerOrOwner
from workers.models import Skill, Worker
from workers.serializers import SkillSerializer, WorkerReadSerializer, WorkerWriteSerializer


class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer
    permission_classes = [IsAuthenticated]

class WorkerViewSet(ModelViewSet):
    queryset = Worker.objects.all()
    permission_classes = [IsAuthenticated]

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return WorkerReadSerializer
        return WorkerWriteSerializer

    def get_permissions(self):
        if self.action in ['create', 'destroy']:
            return [IsAuthenticated(), IsOwner()]
        elif self.action in ['list', 'update', 'partial_update']:
            return [IsAuthenticated(), IsManagerOrOwner()]
        elif self.action == ['retrieve']:
            return [IsAuthenticated(), IsSelfOrOwner]
        return [IsAuthenticated()]


# # Skill views
# class SkillListCreateView(generics.ListCreateAPIView):
#     queryset = Skill.objects.all()
#     serializer_class = SkillSerializer
#
# class SkillDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Skill.objects.all()
#     serializer_class = SkillSerializer
#
# # Worker views
# class WorkerListCreateView(generics.ListCreateAPIView):
#     queryset = Worker.objects.all()
#
#     def get_serializer_class_for_worker (self):
#         if self.request.method == 'GET':
#             return WorkerReadSerializer
#         return WorkerWriteSerializer
#
# class WorkerDetailView(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Worker.objects.all()
#
#     def get_serializer_class_for_worker (self):
#         if self.request.method == 'GET':
#             return WorkerReadSerializer
#         return WorkerWriteSerializer

