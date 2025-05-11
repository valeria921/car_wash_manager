from django.contrib import admin
from .models import ClientB2B, ClientB2C, ClientB2BServiceCommission, ClientB2CServiceCommission


class ClientB2BAdmin(admin.ModelAdmin):
    list_display = ('company_name', 'company_phone')
    search_fields = ('company_name', 'company_phone')

class ClientB2CAdmin(admin.ModelAdmin):
    list_display = ('client_name', 'client_phone')
    search_fields = ('client_name', 'client_phone')

class ClientB2BServiceCommissionAdmin(admin.ModelAdmin):
    list_display = ('client_b2b', 'service', 'commission_percentage')

class ClientB2CServiceCommissionAdmin(admin.ModelAdmin):
    list_display = ('client_b2c', 'service', 'commission_percentage')


admin.site.register(ClientB2B, ClientB2BAdmin)
admin.site.register(ClientB2C, ClientB2CAdmin)
admin.site.register(ClientB2BServiceCommission, ClientB2BServiceCommissionAdmin)
admin.site.register(ClientB2CServiceCommission, ClientB2CServiceCommissionAdmin)