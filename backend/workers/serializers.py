from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField
from workers.models import Skill, Worker


class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = ['id', 'skill_name']
        read_only_fields = ['created_at', 'updated_at']

#Serializer with read_only skills, for GET
class WorkerReadSerializer(serializers.ModelSerializer):
    skills = SkillSerializer(many=True, read_only=True)

    class Meta:
        model = Worker
        fields = ['id', 'name', 'surname', 'is_active', 'phone', 'start_date', 'skills']
        read_only_fields = ['created_at', 'updated_at']

class WorkerWriteSerializer(serializers.ModelSerializer):
    skills = PrimaryKeyRelatedField(many=True, queryset=Skill.objects.all())

    class Meta:
        model = Worker
        fields = ['id', 'name', 'surname', 'is_active', 'phone', 'start_date', 'skills']
        read_only_fields = ['created_at', 'updated_at']

