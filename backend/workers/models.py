from django.db import models
from backend import settings


class TimeStampedModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True


class Skill(TimeStampedModel):
    skill_name = models.CharField(max_length=100, unique=True)

    def __str__(self):
        return self.skill_name


class Worker(TimeStampedModel):
    user = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.SET_NULL,
        related_name='worker_profile',
        null=True,
        blank=True)
    name = models.CharField(max_length=100)
    surname = models.CharField(max_length=100)
    is_active = models.BooleanField(default=True)
    phone = models.CharField(max_length=100, blank=True)
    start_date = models.DateField(blank=True, null=True)
    skills = models.ManyToManyField(Skill)


    def __str__(self):
        return f'{self.name} {self.surname}'


# class WorkerType(TimeStampedModel):
#     worker_type = models.CharField(max_length=100, unique=True)
#     notes = models.TextField(blank=True)
#
#     def __str__(self):
#         return self.worker_type

# class Attendance(TimeStampedModel):
#     worker = models.ForeignKey(Worker, on_delete=models.CASCADE)
#     date = models.DateField(default=now)  # Stores the date of attendance
#     is_present = models.BooleanField(default=False)  # If the worker was present that day
#
#     class Meta:
#         unique_together = ('worker', 'date')  # Prevents duplicate attendance for the same worker on the same day
#
#     def __str__(self):
#         return f"{self.worker.name} - {self.date} - {'Present' if self.is_present else 'Absent'}"
