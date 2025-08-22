from django.db import models

from orders.models import OrderedServiceByClient
from services.models import Service
from workers.models import Worker


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class WorkerSalary(TimeStampedModel):
    worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
    ordered_service = models.ForeignKey(OrderedServiceByClient, on_delete=models.CASCADE)
    salary_amount = models.DecimalField(decimal_places=2, max_digits=10)

    class Meta:
        unique_together = ('worker', 'ordered_service')

    def __str__(self):
        return f"{self.worker} - {self.salary_amount} from {self.ordered_service}"
