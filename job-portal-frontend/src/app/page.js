"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);
  
  //const API_BASE_URL = "https://job-portal-webapp-django-backend.onrender.com";


  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/jobs/`)
      .then((res) => res.json())
      .then(setJobs)
      .catch(() => console.error("Failed to load jobs"));
  }, []);

  

  return (
    <main className="max-w-4xl mx-auto p-6">
      <h1 className="text-4xl font-bold mb-6 text-center">🧑‍💻 Job Listings</h1>
      {jobs.length === 0 ? (
        <p className="text-center">No jobs found.</p>
      ) : (
        <ul className="space-y-4">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-5 border border-gray-300 rounded-lg shadow hover:shadow-md transition"
            >
              <h2 className="text-2xl font-semibold text-blue-600">{job.title}</h2>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-500">
                {job.applicant_count} applicant{job.applicant_count !== 1 ? "s" : ""}
              </p>
              <Link
                href={`/jobs/${job.id}`}
                className="text-blue-500 hover:underline inline-block mt-2"
              >
                View & Apply →
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
