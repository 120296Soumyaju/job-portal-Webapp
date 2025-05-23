# 🧪 Django Job Portal API Test

### Tasks
This is a mini job portal API built with Django REST Framework. It allows users to:
- Create job post
- Post jobs
- Get job summary (with applicant count)
- Apply to jobs (limited to 3 applications per day per email)

---

## 📦 Features

- PostgreSQL database for persistent storage
- API documentation with Swagger UI
- Rate-limiting logic (max 3 job applications per day per email)
- Synthetic data generation with Faker
- Basic unit tests
- `.env` support for environment configs

---

## 🚀 Setup Instructions

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd job_portal
```
### 2. Create a virtual environment and install dependencies
```
python -m venv env
source env/bin/activate  # Windows: .\env\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure .env
Create a `.env` file:
```env
DEBUG=True
SECRET_KEY=your_secret_key
DB_NAME=job_portal_db
DB_USER=postgres
DB_PASSWORD=your_password
DB_HOST=localhost
DB_PORT=5432
```

### 4. Install CORS headers :
```
pip install django-cors-headers

```

### 5.Add to INSTALLED_APPS in settings.py
```
INSTALLED_APPS = [
    ...
    'corsheaders',
    ...
]

```

### 6.Add Middleware (at the top of MIDDLEWARE)
```
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    ...
]

```

### 7.Allow localhost frontend origin:
In settings.py, add:
```
CORS_ALLOW_ALL_ORIGINS = True

CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

```

### 8. Run migrations and generate fake data
```
python manage.py makemigrations jobs
python manage.py migrate 
python manage.py generate_fake_data
```
### 9. Start the development server
```
python manage.py runserver

```

### 10.  Running Tests
``` 
python manage.py test jobs

```

### 11. API Endpoints
```
Endpoint	        Method	    Description
/api/jobs/	        GET	        List all job posts with applicant count
/api/jobs/create/	POST	    Create a new job post
/api/jobs/apply/	POST	    Apply to a job (max 3/day/email)
/swagger/	        GET
```

### 12.Tech Stack
```
python 3.13

Django 4.2.21 

Django REST Framework 3.16.0

PostgreSQL Version 8.14

Faker 37.3.0

drf-yasg (Swagger) 1.21.10

python-decouple 3.8

django-cors-headers 4.70
```

### 13. 📁 Project Structure

job_portal_interview/
├── job_portal/
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── jobs/
│   ├── __init__.py
│   ├── models.py
│   ├── views.py
│   ├── serializers.py
│   ├── urls.py
│   ├── tests.py
│   └── management/
│       ├── __init__.py
│       └── commands/
│           ├── __init__.py
│           └── generate_fake_data.py
├── .env
├── manage.py
├── README.md
├── requirements.txt
