
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from .models import JobPost, Applicant

class JobPortalTests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.job_post = JobPost.objects.create(
            title="Backend Developer",
            description="Build REST APIs",
            location="Remote",
            posted_by="TechCorp"
        )
        self.apply_url = reverse('apply_job')
        self.job_create_url = reverse('create_job')

    def test_create_job_post(self):
        response = self.client.post(self.job_create_url, {
            "title": "Frontend Developer",
            "description": "React-based UI",
            "location": "Mumbai",
            "posted_by": "InnoSoft"
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_apply_to_job(self):
        data = {
            "name": "Alice",
            "email": "alice@example.com",
            "resume_link": "http://example.com/resume.pdf",
            "applied_job": self.job_post.id
        }
        response = self.client.post(self.apply_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_rate_limit_applications(self):
        email = "bob@example.com"
        for _ in range(3):
            Applicant.objects.create(
                name="Bob",
                email=email,
                resume_link="http://example.com/resume.pdf",
                applied_job=self.job_post
            )
        response = self.client.post(self.apply_url, {
            "name": "Bob",
            "email": email,
            "resume_link": "http://example.com/resume4.pdf",
            "applied_job": self.job_post.id
        }, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn("You can only apply to 3 jobs per day.", str(response.data))
