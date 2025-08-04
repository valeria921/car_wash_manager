from django.contrib import admin

from orders.models import Order
from orders.models import OrderedServiceByClient


class OrderAdmin(admin.ModelAdmin):
    list_display = ('client_display', 'date')
    def client_display(self, obj):
        if obj.order_client_b2b:
            return f'B2B: {obj.order_client_b2b}'
        elif obj.order_client_b2c:
            return f'B2C: {obj.order_client_b2c}'
        else:
            return 'No client'
    client_display.short_description = 'Client'


class OrderedServiceBtClientAdmin(admin.ModelAdmin):
    list_display = ('order', 'service', 'workers_display', 'final_price_display', 'final_commission_display' )

admin.site.register(Order, OrderAdmin)
admin.site.register(OrderedServiceByClient, OrderedServiceBtClientAdmin)
