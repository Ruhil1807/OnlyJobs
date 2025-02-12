"use client";
import React, { useState } from "react";
import { useDebounce } from "use-debounce";

interface Job {
  title: string;
  company: string;
  location: string;
  postedAt: string;
  description: string;
  status: "Active" | "Expired";
  salary: string;
}

const jobs: Job[] = [
  { title: "Software Engineer", company: "Tech Corp", location: "New York, NY", postedAt: "2024-01-15", description: "Develop and maintain web applications.", status: "Active", salary: "$120,000/year" },
  { title: "Data Scientist", company: "AI Innovations", location: "San Francisco, CA", postedAt: "2024-01-10", description: "Analyze data trends and build predictive models.", status: "Active", salary: "$130,000/year" },
  { title: "Product Manager", company: "Business Inc.", location: "Seattle, WA", postedAt: "2024-01-05", description: "Lead product development and strategy.", status: "Active", salary: "$110,000/year" },
  { title: "UX Designer", company: "Creative Studio", location: "Austin, TX", postedAt: "2023-12-20", description: "Design user-friendly interfaces.", status: "Expired", salary: "$95,000/year" },
  { title: "DevOps Engineer", company: "Cloud Solutions", location: "Remote", postedAt: "2024-01-12", description: "Maintain cloud infrastructure and CI/CD pipelines.", status: "Active", salary: "$125,000/year" },
  { title: "Marketing Specialist", company: "BrandCo", location: "Chicago, IL", postedAt: "2024-01-18", description: "Develop marketing strategies.", status: "Active", salary: "$85,000/year" },
  { title: "Cybersecurity Analyst", company: "SecureNet", location: "Washington, DC", postedAt: "2024-01-14", description: "Ensure security of network infrastructure.", status: "Active", salary: "$115,000/year" },
{ title: "Backend Developer", company: "DataFlow Inc.", location: "San Diego, CA", postedAt: "2024-01-08", description: "Develop backend services and APIs.", status: "Active", salary: "$110,000/year" },
  { title: "AI Engineer", company: "Deep Learning Labs", location: "Boston, MA", postedAt: "2024-01-07", description: "Develop AI models and deep learning solutions.", status: "Active", salary: "$140,000/year" },
  { title: "Game Developer", company: "Pixel Studios", location: "Austin, TX", postedAt: "2024-01-06", description: "Create immersive gaming experiences.", status: "Active", salary: "$100,000/year" },
  { title: "HR Manager", company: "PeopleFirst HR", location: "Denver, CO", postedAt: "2024-01-05", description: "Manage HR operations and employee relations.", status: "Active", salary: "$95,000/year" },
  { title: "Business Analyst", company: "Finance Gurus", location: "New York, NY", postedAt: "2024-01-04", description: "Analyze business data and trends.", status: "Active", salary: "$90,000/year" },
  { title: "Cloud Architect", company: "CloudOps", location: "Seattle, WA", postedAt: "2024-01-03", description: "Design and manage cloud solutions.", status: "Active", salary: "$135,000/year" },
  { title: "IT Support Engineer", company: "TechAssist", location: "Houston, TX", postedAt: "2024-01-02", description: "Provide IT support and troubleshooting.", status: "Active", salary: "$75,000/year" }
];

export default function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedSearchQuery] = useDebounce(searchQuery, 300);

  const filteredJobs = jobs.filter(
    (job) =>
      job.title.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      job.company.toLowerCase().includes(debouncedSearchQuery.toLowerCase()) ||
      job.location.toLowerCase().includes(debouncedSearchQuery.toLowerCase())
  );

  const handleApplyClick = (jobTitle: string) => {
    const applicationUrl = `https://jobapplicationportal.com/apply?position=${encodeURIComponent(jobTitle)}`;
    window.open(applicationUrl, "_blank");
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 px-6 py-6 flex flex-col items-center">
      <h1 className="text-3xl font-extrabold text-center text-gray-800 mt-6">
        Welcome to your dashboard!
      </h1>
      <div className="w-full flex justify-center mt-6">
        <input
          type="text"
          placeholder="Search jobs..."
          className="p-3 w-1/2 border rounded-md"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-6">
        {filteredJobs.map((job, index) => (
          <div
            key={index}
            className="bg-white p-6 shadow-md rounded-lg border border-gray-200 relative transition-transform transform hover:scale-105 duration-200 group"
          >
            <h2 className="text-xl font-semibold text-blue-600">{job.title}</h2>
            <p className="text-gray-600">{job.company} - {job.location}</p>
            <p className="text-gray-500 text-sm">Posted on: {new Date(job.postedAt).toDateString()}</p>
            <p className="text-gray-700 font-semibold">Salary: {job.salary}</p>
            <p className={`mt-2 text-sm font-semibold ${job.status === "Active" ? "text-green-600" : "text-red-600"}`}>
              {job.status === "Active" ? "✅ Active" : "❌ Expired"}
            </p>
            <button
              onClick={() => handleApplyClick(job.title)}
              className="absolute bottom-3 left-1/2 transform -translate-x-1/2 px-4 py-2 bg-blue-500 text-white rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              Apply Now
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
