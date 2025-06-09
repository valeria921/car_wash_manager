from django.contrib.auth.base_user import AbstractBaseUser
from django.db import models
from django.contrib.auth.models import PermissionsMixin
from django.utils import timezone
from users.constants import UserRole
from users.managers import UserCustomManager


class UserCustomProfile(AbstractBaseUser, PermissionsMixin):
    email = models.EmailField(unique=True)
    role = models.CharField(max_length=20, choices=UserRole.CHOICES, default=UserRole.WORKER)

    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    objects = UserCustomManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # Only email is required

    def __str__(self):
        return self.email