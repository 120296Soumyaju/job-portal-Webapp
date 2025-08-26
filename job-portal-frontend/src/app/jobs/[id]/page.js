"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function JobDetails() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [form, setForm] = useState({ name: "", email: "", resume_link: "" });
  const [message, setMessage] = useState("");
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    if (!API_BASE_URL) {
      console.error("NEXT_PUBLIC_API_URL is not defined");
      return;
    }

    fetch(`${API_BASE_URL}/api/jobs/`)
      .then((res) => res.json())
      .then((data) => {
        const found = data.find((j) => j.id == id);
        if (!found) setMessage("❌ Job not found.");
        setJob(found);
      })
      .catch(() => setMessage("⚠️ Failed to load job details."));
  }, [id, API_BASE_URL]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("⏳ Submitting...");
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

  if (!job) return <p className="p-6 text-gray-500">Loading job details...</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-xl shadow-md border border-gray-200">
      {/* Job Header */}
      <h1 className="text-3xl font-bold text-blue-700 mb-2">{job.title}</h1>
      <p className="text-gray-600 mb-1">{job.location}</p>
      <p className="text-sm text-gray-500 mb-6">
        {job.applicant_count} applicant
        {job.applicant_count !== 1 ? "s" : ""}
      </p>

      {/* Job Description */}
      <p className="mb-6 text-gray-700 leading-relaxed">{job.description}</p>

      {/* Application Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Your Name"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="Your Email"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="url"
          placeholder="Resume Link (Google Drive / LinkedIn / GitHub)"
          required
          className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
          value={form.resume_link}
          onChange={(e) => setForm({ ...form, resume_link: e.target.value })}
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-3 rounded-lg shadow hover:bg-blue-700 transition"
        >
          🚀 Submit Application
        </button>
      </form>

      {/* Feedback Message */}
      {message && (
        <p
          className={`mt-5 p-3 text-center rounded-lg ${
            message.startsWith("✅")
              ? "bg-green-100 text-green-700"
              : message.startsWith("⏳")
              ? "bg-yellow-100 text-yellow-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {message}
        </p>
      )}
    </div>
  );
}
