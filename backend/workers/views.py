from rest_framework.viewsets import ModelViewSet
from workers.models import Skill, Worker
from workers.serializers import SkillSerializer, WorkerReadSerializer, WorkerWriteSerializer


class SkillViewSet(ModelViewSet):
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

class WorkerViewSet(ModelViewSet):
    queryset = Worker.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return WorkerReadSerializer
        return WorkerWriteSerializer


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

