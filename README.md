# 🧑‍💼 Job Portal – Next.js Frontend + Django Backend

This is a full-stack job portal web application built using **Next.js (Frontend)** and **Django REST Framework (Backend)**.

It allows users to:
- View all available job posts
- See how many applicants applied
- Apply to jobs via a form
- Enforces rate-limiting (max 3 applications/day/email)

---

## 🧩 Project Structure

```
job-portal-Webapp/
├── job_portal_backend(backend)/       # Django API (DRF + PostgreSQL)
└── job-portal-frontend(frontend)/      # Next.js frontend
```

---

## 🚀 Getting Started

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd job-portal-Webapp
```

---

# 🧪 Backend – Django Job Portal API

## 📦 Features

- PostgreSQL database for persistent storage
- API documentation with Swagger UI
- Rate-limiting logic (max 3 job applications per day per email)
- Synthetic data generation with Faker
- Basic unit tests
- `.env` support for environment configs

---

## ⚙️ Backend Setup Instructions

### 1. Go to the backend folder
```bash
cd job_portal_backend
```

### 2. Create a virtual environment and install dependencies
```bash
python -m venv env
source env/bin/activate   # Windows: .\env\Scripts\activate
pip install -r requirements.txt
```

### 3. Configure `.env`
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
```bash
python manage.py makemigrations jobs
python manage.py migrate
python manage.py generate_fake_data
```

### 9. Start the development server
```bash
python manage.py runserver
```

---

## ✅ API Endpoints

| Endpoint              | Method | Description                                |
|-----------------------|--------|--------------------------------------------|
| `/api/jobs/`          | GET    | List all job posts with applicant count    |
| `/api/jobs/create/`   | POST   | Create a new job post                      |
| `/api/jobs/apply/`    | POST   | Apply to a job (max 3/day/email)           |
| `/swagger/`           | GET    | Swagger UI for API documentation           |

---

## 🔬 Running Tests
```bash
python manage.py test jobs
```

---

## 🧰 Tech Stack (Backend)

- Python 3.13
- Django 4.2.21
- Django REST Framework 3.16.0
- PostgreSQL 8.14
- Faker 37.3.0
- drf-yasg (Swagger) 1.21.10
- python-decouple 3.8
- django-cors-headers 4.70

---

# 🌐 Frontend – Next.js Job Portal

## 📦 Features

- Built with **Next.js App Router**
- Styled using **Tailwind CSS**
- Integrated with Django backend APIs
- Handles error gracefully including rate-limiting
- Clean and modern UI with responsive layout

---

## ⚙️ Frontend Setup Instructions

### 1. Go to the frontend folder
```bash
cd ../job-portal-frontend
```

### 2. Install dependencies
```bash
npm install
```

### 3. Start the development server
```bash
npm run dev
```

Then visit:
```
http://localhost:3000
```

---

## 🔗 API Configuration

Make sure your Django backend is running at `http://127.0.0.1:8000`.
Backend Hosted on Render : https://job-portal-webapp-django-backend.onrender.com

If needed, expose your API via ngrok:
```bash
ngrok http 8000
```

Update your frontend fetch URLs accordingly.

---

## 📄 Pages Overview

| Page                  | Path           | Description                           |
|-----------------------|----------------|---------------------------------------|
| Home / Job List       | `/`            | Lists all job posts                   |
| Job Details + Apply   | `/jobs/[id]`   | View job info and submit application  |

---

## 🧰 Tech Stack (Frontend)

- Next.js 14
- Tailwind CSS
- React Hooks

---

## ✅ Final Notes
```python
ALLOWED_HOSTS = [ '127.0.0.1', 'localhost', 'job-portal-webapp-django-backend.onrender.com']
```

- Make sure CORS is enabled in your Django settings:
```python
CORS_ALLOWED_ORIGINS = [
    "http://localhost:3000",
    "http://127.0.0.1:3000"
    "https://job-portal-webapp-iota.vercel.app"
]
```

- This project demonstrates full-stack integration of Django REST APIs with a modern React Next.js based frontend.

---

## 📬 Submission Instructions

To test it end-to-end:
- Run your Django backend first
- Then start this Next.js frontend
- Visit `http://localhost:3000` and apply to jobs

Webapp Live on 
- Visit `https://job-portal-webapp-iota.vercel.app` and apply to jobs
