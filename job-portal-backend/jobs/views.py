
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from django.utils import timezone
from .models import JobPost, Applicant
from .serializers import JobPostSerializer, ApplicantSerializer
from django.db.models import Count
from django.http import JsonResponse, HttpResponse

"""def home(_request):
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
"""

def home(request):
    html = """
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Job Portal API</title>
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                background: linear-gradient(135deg, #74ebd5 0%, #9face6 100%);
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                color: #333;
            }
            .container {
                background: white;
                padding: 2rem 3rem;
                border-radius: 15px;
                box-shadow: 0 8px 20px rgba(0,0,0,0.15);
                max-width: 550px;
                width: 90%;
                text-align: center;
                position: relative;
            }
            h1 {
                color: #0070f3;
                font-size: 2rem;
                margin-bottom: 1rem;
            }
            p {
                margin-bottom: 1.5rem;
                font-size: 1rem;
                color: #555;
            }
            ul {
                list-style: none;
                padding: 0;
            }
            li {
                margin: 0.8rem 0;
            }
            a {
                display: inline-block;
                text-decoration: none;
                padding: 0.6rem 1rem;
                border-radius: 8px;
                background: #0070f3;
                color: white;
                font-weight: bold;
                transition: all 0.3s ease;
            }
            
            footer {
                margin-top: 2rem;
                font-size: 0.9rem;
                color: #444;  /* Keep rest of footer text dark */
            }
        
            footer a {
                color: #ffffff;         /* White text for visibility */
                font-weight: bold;
                text-decoration: none;
                padding: 0.2rem 0.4rem;
                border-radius: 6px;
                background: rgba(0, 112, 243, 0.85);  /* Semi-transparent blue highlight */
                box-shadow: 0 0 10px rgba(0, 112, 243, 0.7);  /* Glow effect */
            }
            
            footer a:hover {
                text-decoration: underline;
                background: #0070f3;  /* Solid blue on hover */
                box-shadow: 0 0 15px rgba(0, 112, 243, 1);
            }
            
        </style>
    </head>
    <body>
        <div class="container">
            <h1>🎯 Job Portal API</h1>
            <p>Welcome! Here are the available endpoints:</p>
            <ul>
                <li><a href="/admin/">🔑 Admin Dashboard</a></li>
                <li><a href="/swagger/">📘 Swagger Docs</a></li>
                <li><a href="/api/jobs/">📋 List Jobs</a></li>
                <li><a href="/api/jobs/create/">➕ Create Job</a></li>
                <li><a href="/api/jobs/apply/">✍ Apply Job</a></li>
            </ul>
            <footer>
                ⚡ Backend API powered by <b>Python🐍 Django DRF</b><br>
                🚀 API & Minimal UI/UX crafted by Full Stack Engineer👨‍💻
                <a href="https://sujit-tadadikar.netlify.app" target="_blank">Sujit Tadadikar</a>
            </footer>
        </div>
    </body>
    </html>
    """
    return HttpResponse(html)



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
