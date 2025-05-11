from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from clients.models import ClientB2C, ClientB2B, ClientB2BServiceCommission, ClientB2CServiceCommission
from services.serializers import ServiceReadSerializer


class ClientB2CSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientB2C
        fields = ['client_name', 'client_phone']
        read_only_fields = ['created_at', 'updated_at']


class ClientB2BSerializer(serializers.ModelSerializer):
    class Meta:
        model = ClientB2B
        fields = ['company_name', 'company_address', 'company_code', 'compony_phone']
        read_only_fields = ['created_at', 'updated_at']


class ClientB2CServiceCommissionReadSerializer(serializers.ModelSerializer):
    client_b2c = ClientB2CSerializer(read_only=True)
    service = ServiceReadSerializer(read_only=True)

    class Meta:
        model = ClientB2CServiceCommission
        fields = ['client_b2c', 'service', 'commission_percentage']
        read_only_fields = ['created_at', 'updated_at']


class ClientB2CServiceCommissionWriteSerializer(serializers.ModelSerializer):
    client_b2c = PrimaryKeyRelatedField(read_only=True)
    service = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ClientB2CServiceCommission
        fields = ['client_b2c', 'service', 'commission_percentage']
        read_only_fields = ['created_at', 'updated_at']


class ClientB2BServiceCommissionReadSerializer (serializers.ModelSerializer):
    client_b2b = ClientB2BSerializer(read_only=True)
    service = ServiceReadSerializer(read_only=True)

    class Meta:
        model = ClientB2BServiceCommission
        fields = ['client_b2b', 'service', 'commission_percentage']
        read_only_fields = ['created_at', 'updated_at']


class ClientB2BServiceCommissionWriteSerializer(serializers.ModelSerializer):
    client_b2b = PrimaryKeyRelatedField(read_only=True)
    service = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = ClientB2BServiceCommission
        fields = ['client_b2b', 'service', 'commission_percentage']
        read_only_fields = ['created_at', 'updated_at']
