from django.db import models
from workers.models import Skill


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class ServiceType(TimeStampedModel):
    service_type_name = models.CharField(max_length=255, unique=True)

    def __str__(self):
        return self.service_type_name

class Service(TimeStampedModel):
    service_name = models.CharField(max_length=255, unique=True)
    service_type = models.ForeignKey(ServiceType, on_delete=models.PROTECT)
    default_commission_percentage = models.DecimalField(max_digits=5, decimal_places=2, default=10.0)
    required_skills = models.ManyToManyField(Skill, blank=True, related_name='services')

    def __str__(self):
        return  f' {self.service_name} - {self.service_type}'
