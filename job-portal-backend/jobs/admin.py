from django.contrib import admin
from .models import JobPost, Applicant

@admin.register(JobPost)
class JobPostAdmin(admin.ModelAdmin):
    list_display = ('title', 'location', 'posted_by', 'created_at')
    search_fields = ('title', 'location', 'posted_by')

@admin.register(Applicant)
class ApplicantAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'applied_job', 'applied_at')
    search_fields = ('name', 'email')
    list_filter = ('applied_at', 'applied_job')
