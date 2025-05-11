from django.urls import path, include
from rest_framework.routers import DefaultRouter
from workers.views import WorkerViewSet, SkillViewSet


router = DefaultRouter()
router.register(r'skills', SkillViewSet, basename='skill')
router.register(r'workers', WorkerViewSet, basename='worker')

urlpatterns = [
    path('', include(router.urls)),
]


