from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from clients.serializers import ClientB2CSerializer, ClientB2BSerializer
from orders.models import Order, OrderedServiceByClient
from services.serializers import ServiceReadSerializer
from workers.models import Worker
from workers.serializers import WorkerReadSerializer


class OrderReadSerializer(serializers.ModelSerializer):
    client = serializers.SerializerMethodField()
    order_services = ServiceReadSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        fields = ['id','client', 'services', 'date',]
        read_only_fields = ['created_at', 'updated_at']

    def get_client(self, obj):
        if obj.client_b2c:
            data = ClientB2CSerializer(obj.client_b2c).data
            data['type'] = 'b2c'
            return data
        elif obj.client_b2b:
            data = ClientB2BSerializer(obj.client_b2b).data
            data['type'] = 'b2b'
            return data
        return None


class OrderedServiceByClientReadSerializer(serializers.ModelSerializer):
    service = ServiceReadSerializer(read_only=True)
    workers = WorkerReadSerializer(many=True, read_only=True)
    final_price = serializers.SerializerMethodField()
    final_commission = serializers.SerializerMethodField()
    workers_display = serializers.SerializerMethodField()

    class Meta:
        model = OrderedServiceByClient
        fields = [
            'id',
            'order',
            'service',
            'workers',
            'custom_price',
            'custom_commission_percentage',
            'final_price',
            'final_commission',
            'workers_display',
            'created_at',
            'updated_at',
        ]
        read_only_fields = ['created_at', 'updated_at']

    def get_workers_display(self, obj):
        return obj.workers_display()

    def get_final_price(self, obj):
        return obj.final_price

    def get_final_commission(self, obj):
        return obj.final_commission

class OrderedServiceByClientWriteSerializer(serializers.ModelSerializer):
    workers = PrimaryKeyRelatedField(
        many=True,
        queryset=Worker.objects.all()
    )

    class Meta:
        model = OrderedServiceByClient
        fields = [
            'order',
            'service',
            'workers',
            'custom_price',
            'custom_commission_percentage',
        ]

    def create(self, validated_data):
        workers = validated_data.pop('workers')
        instance = OrderedServiceByClient.objects.create(**validated_data)
        instance.workers.set(workers)
        return instance

    def update(self, instance, validated_data):
        workers = validated_data.pop('workers', None)
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()
        if workers is not None:
            instance.workers.set(workers)
        return instance