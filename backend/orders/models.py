from django.utils import timezone
from django.core.exceptions import ValidationError
from django.db import models
from clients.models import ClientB2C, ClientB2B, ClientB2CServiceCommission, ClientB2BServiceCommission
from services.models import Service
from workers.models import Worker


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Order(TimeStampedModel):
    client_b2c = models.ForeignKey(ClientB2C, on_delete=models.SET_NULL, null=True, blank=True)
    client_b2b = models.ForeignKey(ClientB2B, on_delete=models.SET_NULL, null=True, blank=True)
    services = models.ManyToManyField(Service, through='OrderedServiceByClient')
    date = models.DateField(default=timezone.now)

    def clean(self):
        # Only one of two clients can be set
        if self.client_b2c and self.client_b2b:
            raise ValidationError("Only one client can be set: B2C or B2B, not both.")
        if not self.client_b2c and not self.client_b2b:
            raise ValidationError("You must assign either a B2C or a B2B client.")

    def save(self, *args, **kwargs):
        self.clean()
        super().save(*args, **kwargs)

    def __str__(self):
        client = self.client_b2b or self.client_b2c
        return f"Order for {client} on {self.date}"


class OrderedServiceByClient(TimeStampedModel):
    order = models.ForeignKey(Order, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    workers = models.ManyToManyField(Worker)
    custom_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    custom_commission_percentage = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)

    @property
    def final_price(self):
        """Return the custom price if set, else - default service price"""
        return self.custom_price if self.custom_price is not None else self.service.default_price

    @property
    def final_commission(self):
        """Return commission in the correct priority order."""
        if self.custom_commission_percentage is not None:
            return self.custom_commission_percentage

        order = self.order
        client_b2c = order.client_b2c
        client_b2b = order.client_b2b

        if client_b2c:
            # Try to get client-specific commission for B2C
            commission = ClientB2CServiceCommission.objects.filter(
                client_b2c=client_b2c,
                service=self.service
            ).first()
            if commission:
                return commission.commission_percentage

        elif client_b2b:
            # Try to get client-specific commission for B2B
            commission = ClientB2BServiceCommission.objects.filter(
                client_b2b=client_b2b,
                service=self.service
            ).first()
            if commission:
                return commission.commission_percentage

        return self.service.default_commission_percentage

    def workers_display(self):
        return ", ".join([str(worker) for worker in self.workers.all()])

    def final_price_display(self):
        return f"{self.final_price:2f}"

    def final_commission_display(self):
        return f"{self.final_commission:2f} %"

    def __str__(self):
        return f"{self.order} - {self.service.service_name} made by workers: {', '.join([str(worker) for worker in self.workers.all()])}"