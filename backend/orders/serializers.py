from rest_framework import serializers

from clients.serializers import ClientB2CSerializer
from orders.models import Order
from services.serializers import ServiceReadSerializer


class OrderReadSerializer(serializers.ModelSerializer):
    order_client_b2c = ClientB2CSerializer(read_only=True)
    order_client_b2b = ClientB2CSerializer(read_only=True)
    order_services = ServiceReadSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['order_client_b2c', 'order_client_b2b', 'order_services', 'order_date',]
        read_only_fields = ['created_at', 'updated_at']

        def to_representation(self, instance):
            data = super().to_representation(instance)
            if instance.order_client_b2c:
                data.pop('order_client_b2c')
            elif instance.order_client_b2b:
                data.pop('order_client_b2b')
            return data


