"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function JobDetails() {
  const router = useRouter();
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", resume_link: "" });
  const [message, setMessage] = useState("");
 // const API_BASE_URL = "https://job-portal-webapp-django-backend.onrender.com";
 const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${API_BASE_URL}/api/jobs/`)
      .then((res) => res.json())
      .then((data) => setJob(data.find((j) => j.id == id)))
      .catch(() => setMessage("Failed to load job details"));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("Submitting...");
    const res = await fetch(`${API_BASE_URL}/api/jobs/apply/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, applied_job: parseInt(id) }),
    });

    if (res.ok) {
      setMessage("✅ Application submitted successfully!");
      setForm({ name: "", email: "", resume_link: "" });
    } else {
      const data = await res.json();
      setMessage(data?.non_field_errors?.[0] || "❌ Submission failed.");
    }
  };

  if (!job) return <p className="p-4">Loading job details...</p>;

  return (
  <div className="max-w-xl mx-auto p-6">
    <h1 className="text-3xl font-bold text-blue-700 mb-4">{job.title}</h1>
    <p className="mb-6 text-gray-700">{job.description}</p>

    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Your Name"
        required
        className="w-full p-3 border border-gray-300 rounded"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
      />
      <input
        type="email"
        placeholder="Your Email"
        required
        className="w-full p-3 border border-gray-300 rounded"
        value={form.email}
        onChange={(e) => setForm({ ...form, email: e.target.value })}
      />
      <input
        type="url"
        placeholder="Resume Link"
        required
        className="w-full p-3 border border-gray-300 rounded"
        value={form.resume_link}
        onChange={(e) => setForm({ ...form, resume_link: e.target.value })}
      />
      <button
        type="submit"
        className="w-full bg-blue-600 text-white p-3 rounded hover:bg-blue-700 transition"
      >
        Submit Application
      </button>
    </form>

    {message && (
      <p
        className={`mt-4 p-3 text-center rounded ${
          message.startsWith("✅")
            ? "bg-green-100 text-green-800"
            : "bg-red-100 text-red-800"
        }`}
      >
        {message}
      </p>
    )}
  </div>
);
}
