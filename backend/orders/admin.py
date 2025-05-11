from django.contrib import admin

from orders.models import Order


class OrderAdmin(admin.ModelAdmin):
    list_display = ('client_display', 'order_date')
    def client_display(self, obj):
        if obj.order_client_b2b:
            return f'B2B: {obj.order_client_b2b}'
        elif obj.order_client_b2c:
            return f'B2C: {obj.order_client_b2c}'
        else:
            return 'No client'
    client_display.short_description = 'Client'


admin.site.register(Order, OrderAdmin)
