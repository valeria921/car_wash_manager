from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from users.models import UserCustomProfile

class CustomUserAdmin(UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = UserCustomProfile
    list_display = ("email", "role", "is_staff", "is_active")
    ordering = ("email",)

    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Permissions", {"fields": ("is_active", "is_staff", "role", "is_superuser", "groups", "user_permissions")}),
    )
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "password1", "password2", "role", "is_staff", "is_active"),
        }),
    )

admin.site.register(UserCustomProfile, CustomUserAdmin)
#
# class UserProfileAdmin(admin.ModelAdmin):
#     list_display = ('email', 'role', 'is_active')
#     # fieldsets = UserAdmin.fieldsets
#
# admin.site.register(UserCustomProfile, UserProfileAdmin)