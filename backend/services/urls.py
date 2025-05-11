from django.urls import path, include
from rest_framework.routers import DefaultRouter
from services.views import ServiceTypeViewSet, ServiceViewSet

router = DefaultRouter()
router.register(r'service_types', ServiceTypeViewSet, basename='service_types')
router.register(r'services', ServiceViewSet, basename='services')

urlpatterns = [
    path('', include(router.urls))
]
