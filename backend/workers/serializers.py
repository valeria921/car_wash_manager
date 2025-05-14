from django.contrib.auth import get_user_model
from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from workers.models import Skill, Worker

User = get_user_model()

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill_name']
        read_only_fields = ['created_at', 'updated_at']


class WorkerReadSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Worker
        fields = ['id', 'user', 'name', 'surname', 'is_active', 'phone', 'start_date', 'skills', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']


class WorkerWriteSerializer(serializers.ModelSerializer):
    is_active = serializers.BooleanField(default=True)
    skills = PrimaryKeyRelatedField(many=True, queryset=Skill.objects.all())
    user = PrimaryKeyRelatedField(queryset=User.objects.filter(role='worker'), required=False)

    class Meta:
        model = Worker
        fields = ['id', 'user', 'name', 'surname', 'is_active', 'phone', 'start_date', 'skills', 'created_at', 'updated_at']
        read_only_fields = ['created_at', 'updated_at']
