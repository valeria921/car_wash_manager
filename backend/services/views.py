from rest_framework.viewsets import ModelViewSet
from services.models import Service, ServiceType
from services.serializers import ServiceTypeSerializer, ServiceReadSerializer, ServiceWriteSerializer


class ServiceTypeViewSet(ModelViewSet):
    queryset = ServiceType.objects.all()
    serializer_class = ServiceTypeSerializer


class ServiceViewSet(ModelViewSet):
    queryset = Service.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ServiceReadSerializer
        return ServiceWriteSerializer
