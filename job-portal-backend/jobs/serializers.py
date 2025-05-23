
from rest_framework import serializers
from rest_framework.exceptions import ValidationError

from .models import JobPost, Applicant
from django.utils import timezone
class JobPostSerializer(serializers.ModelSerializer):
    applicant_count = serializers.IntegerField(source='applicants.count', read_only=True)

    class Meta:
        model = JobPost
        fields = ['id', 'title', 'description', 'location', 'created_at', 'posted_by', 'applicant_count']

class ApplicantSerializer(serializers.ModelSerializer):
    class Meta:
        model = Applicant
        fields = ['id', 'name', 'email', 'resume_link', 'applied_job', 'applied_at']

    def validate(self, data):
        email = data.get('email')
        today = timezone.now().date()
        count = Applicant.objects.filter(email=email, applied_at__date=today).count()
        if count >= 3:
            raise ValidationError("You can only apply to 3 jobs per day.")
        return data