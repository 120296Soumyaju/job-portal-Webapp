# 🧑‍💼 Job Portal – Next.js Frontend + Django Backend 

This is a simple job portal frontend built with **Next.js** and **Tailwind CSS**. It allows users to:

- View all available job posts
- See how many applicants applied
- Apply to a job via a form (connected to a Django REST API backend)

---

## 📦 Features

- Built with **Next.js App Router**
- Styled using **Tailwind CSS**
- API-integrated with Django backend (job listings & applications)
- Graceful error handling for rate-limiting
- Clean and minimal UI

---

## 🚀 Getting Started

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd job-portal-frontend
```
### 2. Install dependencies
```
npm install

```

### 3.Run the development server
```
npm run dev
```
- Then visit: http://localhost:3000


### API Configuration

- The frontend fetches jobs and submits applications to:
http://127.0.0.1:8000/api/jobs/
http://127.0.0.1:8000/api/jobs/apply/

Make sure your Django backend is running and has CORS enabled for localhost:3000.

### Pages Overview
Page	                Path	        Description
Home / Job List	        /	            Lists all job posts
Job Details + Apply	    /jobs/[id]	    View job and submit application

### Technologies Used

- Next.js 14
- Tailwind CSS
- React Hooks

### Submission Instructions
This frontend was built as part of a coding round to integrate with a Django job portal API.

To test it end-to-end:

- Run your Django backend

- Start this Next.js app

- Visit http://localhost:3000

### Frontend Project Structure

job-portal-frontend/
├── public/                     # Static assets (favicons, images, etc.)
│   ├── next.svg
│   ├── globe.svg
│   └── ...
│
├── src/
│   └── app/                    # App Router pages
│       ├── layout.js          # Global layout wrapper (navbar, styles)
│       ├── page.js            # Homepage – lists all jobs
│       └── jobs/
│           └── [id]/          # Dynamic route: job detail + apply
│               └── page.js
│
├── styles/
│   └── globals.css            # Global Tailwind/custom CSS (optional)
│
├── .gitignore
├── README.md                  # Project readme 
├── next.config.mjs            # Next.js config
├── postcss.config.mjs         # Tailwind/PostCSS config
├── tailwind.config.js         # Tailwind config
├── package.json               # NPM dependencies & scripts
└── jsconfig.json              # Path aliasing (optional)
