
from django.urls import path
from .views import JobPostCreateView, JobPostListView, ApplyJobView

urlpatterns = [
    path('jobs/', JobPostListView.as_view(), name='list_jobs'),
    path('jobs/create/', JobPostCreateView.as_view(), name='create_job'),
    path('jobs/apply/', ApplyJobView.as_view(), name='apply_job'),
]
