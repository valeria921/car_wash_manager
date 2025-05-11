from django.utils import timezone
from django.core.exceptions import ValidationError
from django.db import models
from clients.models import ClientB2C, ClientB2B
from services.models import Service
from workers.models import Worker


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Order(TimeStampedModel):
    order_client_b2c = models.ForeignKey(ClientB2C, on_delete=models.SET_NULL, null=True, blank=True)
    order_client_b2b = models.ForeignKey(ClientB2B, on_delete=models.SET_NULL, null=True, blank=True)
    order_services = models.ManyToManyField(Service, through='OrderedServiceByClient')
    order_date = models.DateField(default=timezone.now)

    def clean(self):
        # Only one of two clients can be set
        if self.order_client_b2c and self.order_client_b2b:
            raise ValidationError("Only one client can be set: B2C or B2B, not both.")
        if not self.order_client_b2c and not self.order_client_b2b:
            raise ValidationError("You must assign either a B2C or a B2B client.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        client = self.order_client_b2b or self.order_client_b2c
        return f"Order for {client} on {self.order_date}"


class OrderedServiceByClient(TimeStampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    workers = models.ManyToManyField(Worker)

    def __str__(self):
        return f"{self.order} - {self.service.name} made by workers: {', '.join([str(worker) for worker in self.workers.all()])}"