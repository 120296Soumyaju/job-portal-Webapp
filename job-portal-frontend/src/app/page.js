"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function Home() {
  const [jobs, setJobs] = useState([]);

  //const API_BASE_URL = "https://job-portal-webapp-django-backend.onrender.com";
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;
  console.log("API Base URL:", process.env.NEXT_PUBLIC_API_URL);

  useEffect(() => {
    if (!API_BASE_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return;
    }

    fetch(`${API_BASE_URL}/api/jobs/`)
      .then((res) => res.json())
      .then(setJobs)
      .catch(() => console.error("Failed to load jobs"));
  }, [API_BASE_URL]);

  return (
    <main className="max-w-5xl mx-auto p-6">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-extrabold text-blue-600 drop-shadow-sm">
          🧑‍💻 Job Listings
        </h1>
        <p className="text-gray-600 mt-2">
          Explore opportunities and apply for your next role 🚀
        </p>
      </header>

      {/* Jobs List */}
      {jobs.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">
          No jobs available right now. Please check back later ⏳
        </p>
      ) : (
        <ul className="grid md:grid-cols-2 gap-6">
          {jobs.map((job) => (
            <li
              key={job.id}
              className="p-6 border border-gray-200 rounded-xl shadow-sm bg-white hover:shadow-lg hover:border-blue-400 transition"
            >
              <h2 className="text-2xl font-semibold text-gray-800 mb-1">
                {job.title}
              </h2>
              <p className="text-gray-600">{job.location}</p>
              <p className="text-sm text-gray-500 mb-3">
                {job.applicant_count} applicant
                {job.applicant_count !== 1 ? "s" : ""}
              </p>
              <Link
                href={`/jobs/${job.id}`}
                className="inline-block mt-2 px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 transition"
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
