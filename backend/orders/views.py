from rest_framework.viewsets import ModelViewSet
from .models import OrderedServiceByClient
from .serializers import (
    OrderedServiceByClientReadSerializer,
    OrderedServiceByClientWriteSerializer
)
from salaries.services import recalculate_salaries_for_order

class OrderedServiceByClientViewSet(ModelViewSet):
    queryset = OrderedServiceByClient.objects.all()

    def get_serializer_class(self):
        if self.action in ['list', 'retrieve']:
            return OrderedServiceByClientReadSerializer
        return OrderedServiceByClientWriteSerializer

    def perform_create(self, serializer):
        instance = serializer.save()
        recalculate_salaries_for_order(instance.order)

    def perform_update(self, serializer):
        instance = serializer.save()
        recalculate_salaries_for_order(instance.order)

    def perform_destroy(self, instance):
        order = instance.order
        instance.delete()
        recalculate_salaries_for_order(order)
