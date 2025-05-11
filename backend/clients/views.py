from rest_framework.viewsets import ModelViewSet

from clients.models import ClientB2C, ClientB2B, ClientB2CServiceCommission, ClientB2BServiceCommission
from clients.serializers import ClientB2CSerializer, ClientB2BSerializer, ClientB2CServiceCommissionReadSerializer, \
    ClientB2CServiceCommissionWriteSerializer, ClientB2BServiceCommissionReadSerializer, \
    ClientB2BServiceCommissionWriteSerializer


class ClientB2CViewSet(ModelViewSet):
    queryset = ClientB2C.objects.all()
    serializer_class = ClientB2CSerializer

class ClientB2BViewSet(ModelViewSet):
    queryset = ClientB2B.objects.all()
    serializer_class = ClientB2BSerializer

class ClientB2CServiceCommissionViewSet(ModelViewSet):
    queryset = ClientB2CServiceCommission.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ClientB2CServiceCommissionReadSerializer
        return ClientB2CServiceCommissionWriteSerializer

class ClientB2BServiceCommissionViewSet(ModelViewSet):
    queryset = ClientB2BServiceCommission.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return ClientB2BServiceCommissionReadSerializer
        return ClientB2BServiceCommissionWriteSerializer

