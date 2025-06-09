from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from services.models import ServiceType, Service
from workers.models import Skill
from workers.serializers import SkillSerializer


class ServiceTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ServiceType
        fields = ['id','service_type_name']
        read_only_fields = ['created_at', 'updated_at']

#Serializer with read_only service_type, for GET
class ServiceReadSerializer(serializers.ModelSerializer):
    service_type = ServiceTypeSerializer(read_only=True)
    required_skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Service
        fields = ['id','service_name', 'service_type', 'default_commission_percentage', 'required_skills']
        read_only_fields = ['created_at', 'updated_at']


class ServiceWriteSerializer(serializers.ModelSerializer):
    service_type = PrimaryKeyRelatedField(queryset=ServiceType.objects.all())
    required_skills = PrimaryKeyRelatedField(many=True, queryset = Skill.objects.all())

    class Meta:
        model = Service
        fields = ['id', 'service_name', 'service_type', 'default_commission_percentage', 'required_skills']
        read_only_fields = ['created_at', 'updated_at']