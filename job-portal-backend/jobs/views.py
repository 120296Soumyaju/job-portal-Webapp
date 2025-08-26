
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from .models import JobPost, Applicant
from .serializers import JobPostSerializer, ApplicantSerializer
from django.db.models import Count
from django.http import JsonResponse

def home(_request):
    return JsonResponse({
        "message": "🎯 Job Portal API is running!",
        "endpoints": {
            "Admin Dashboard": "/admin/",
            "Swagger Docs": "/swagger/",
            "List Jobs": "/api/jobs/",
            "Create Job": "/api/jobs/create/",
            "Apply Job": "/api/jobs/apply/",
        }
    })

from django.http import JsonResponse

def health_check(request):
    return JsonResponse({"status": "ok", "message": "Job Portal Backend is healthy"})


class JobPostCreateView(generics.CreateAPIView):
    queryset = JobPost.objects.all()
    serializer_class = JobPostSerializer

class JobPostListView(generics.ListAPIView):
    serializer_class = JobPostSerializer

    def get_queryset(self):
        return JobPost.objects.annotate(applicant_count=Count('applicants')).order_by('-applicant_count')

class ApplyJobView(generics.CreateAPIView):
    queryset = Applicant.objects.all()
    serializer_class = ApplicantSerializer

    '''def perform_create(self, serializer):
        email = serializer.validated_data['email']
        today = timezone.now().date()
        count = Applicant.objects.filter(email=email, applied_at__date=today).count()
        if count >= 3:
            raise ValidationError("You can only apply to 3 jobs per day.")
        serializer.save()'''
