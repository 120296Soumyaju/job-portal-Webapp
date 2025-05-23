
from django.core.management.base import BaseCommand
from django.utils.timezone import make_aware
from faker import Faker
from jobs.models import JobPost, Applicant
import random

fake = Faker()

class Command(BaseCommand):
    help = "Generate fake job posts and applicants"

    def handle(self, *args, **kwargs):
        Applicant.objects.all().delete()
        JobPost.objects.all().delete()

        jobs = []
        for _ in range(10):
            job = JobPost.objects.create(
                title=fake.job(),
                description=fake.text(max_nb_chars=200),
                location=fake.city(),
                posted_by=fake.company(),
            )
            jobs.append(job)

        for _ in range(50):
            Applicant.objects.create(
                name=fake.name(),
                email=fake.email(),
                resume_link=fake.url(),
                applied_job=random.choice(jobs),
                applied_at=make_aware(fake.date_time_this_year()),
            )

        self.stdout.write(self.style.SUCCESS("Successfully generated fake data!"))
