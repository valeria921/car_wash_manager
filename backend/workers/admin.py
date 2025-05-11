from django.contrib import admin
from workers.models import Skill, Worker


class WorkerAdmin(admin.ModelAdmin):
    list_display = ('name', 'surname', 'phone')

class SkillAdmin(admin.ModelAdmin):
    list_display = ('skill_name',)


admin.site.register(Skill, SkillAdmin)
admin.site.register(Worker, WorkerAdmin)
