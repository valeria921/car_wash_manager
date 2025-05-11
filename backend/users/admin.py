from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from users.models import UserCustomProfile


class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'is_active')
    fieldsets = UserAdmin.fieldsets

admin.site.register(UserCustomProfile, UserProfileAdmin)