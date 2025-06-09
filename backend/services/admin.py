from django.contrib import admin
from services.models import Service, ServiceType


class ServiceAdmin(admin.ModelAdmin):
    list_display = ('id','service_name', 'service_type')

class ServiceTypeAdmin(admin.ModelAdmin):
    list_display = ('service_type_name',)

admin.site.register(Service, ServiceAdmin)
admin.site.register(ServiceType, ServiceTypeAdmin)
