from django.urls import path, include
from rest_framework.routers import DefaultRouter
from clients.views import ClientB2BViewSet, ClientB2CViewSet, ClientB2BServiceCommissionViewSet, \
    ClientB2CServiceCommissionViewSet

router = DefaultRouter()
router.register(r'clientsb2b', ClientB2BViewSet, basename='clients_b2b')
router.register(r'clientsb2c', ClientB2CViewSet, basename='clients_b2c')
router.register(r'clientsb2bcommission', ClientB2BServiceCommissionViewSet, basename='clients_b2b_commission')
router.register(r'clientsb2ccommission', ClientB2CServiceCommissionViewSet, basename='clients_b2c_commission')

urlpatterns = [
    path('', include(router.urls)),
]
