from django.db import models
from django.db.models import UniqueConstraint
from services.models import Service


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class ClientB2C(TimeStampedModel):
    client_name = models.CharField(max_length=255, default='client b2c')
    client_phone = models.CharField(max_length=100, blank=True)
    client_commission_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    def __str__(self):
        return self.client_name


class ClientB2B(TimeStampedModel):
    company_name = models.CharField(max_length=255)
    company_code = models.CharField(blank=True,)
    company_phone = models.CharField(blank=True,)
    company_address_1 = models.TextField(null=True, blank=True)
    company_address_2 = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.company_name


class ClientB2BServiceCommission(TimeStampedModel):
    client_b2b  = models.ForeignKey(ClientB2B, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    commission_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        # unique_together = ('client_b2b', 'service')
        constraints = [
            UniqueConstraint(fields=['client_b2b', 'service'], name='unique_client_b2b_service')
        ]
        db_table = 'Commissions for B2B Clients'
        ordering = ['client_b2b']

class ClientB2CServiceCommission(TimeStampedModel):
    client_b2c  = models.ForeignKey(ClientB2C, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.CASCADE)
    commission_percentage = models.DecimalField(max_digits=5, decimal_places=2)

    class Meta:
        # unique_together = ('client_b2b', 'service')
        constraints = [
            UniqueConstraint(fields=['client_b2c', 'service'], name='unique_client_b2c_service')
        ]
        db_table = 'Commissions for B2C Clients'
        ordering = ['client_b2c']

