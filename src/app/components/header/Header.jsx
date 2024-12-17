"use client";
import React, { useState } from "react";
import Link from "next/link";

const Header = () => {
  const featuredJobs = [
    {
      id: "1",
      title: "Software Engineer",
      company: "Dhaka Tech Solutions",
      location: "Dhaka, Bangladesh",
      salary: "1,200,000 - 1,500,000 TK",
      postedDate: "2024-06-01",
      jobType: "Full-time",
      description: "Develop and maintain scalable software applications.",
    },
    {
      id: "2",
      title: "Product Manager",
      company: "Chittagong Market Leaders Ltd.",
      location: "Chittagong, Bangladesh",
      salary: "1,100,000 - 1,400,000 TK",
      postedDate: "2024-06-02",
      jobType: "Full-time",
      description: "Lead cross-functional teams to build market-ready products.",
    },
    {
      id: "3",
      title: "Data Analyst",
      company: "Data Insights BD",
      location: "Sylhet, Bangladesh",
      salary: "800,000 - 1,000,000 TK",
      postedDate: "2024-06-03",
      jobType: "Full-time",
      description: "Analyze business data to generate actionable insights.",
    },
    {
      id: "4",
      title: "UX Designer",
      company: "Creative Minds Ltd.",
      location: "Khulna, Bangladesh",
      salary: "900,000 - 1,100,000 TK",
      postedDate: "2024-06-04",
      jobType: "Full-time",
      description: "Design user-centered interfaces and experiences.",
    },
    {
      id: "5",
      title: "Cloud Architect",
      company: "CloudTech BD",
      location: "Remote, Bangladesh",
      salary: "1,500,000 - 1,800,000 TK",
      postedDate: "2024-06-05",
      jobType: "Contract",
      description: "Architect scalable and secure cloud-based solutions.",
    },
    {
      id: "6",
      title: "Marketing Specialist",
      company: "Digital Boost BD",
      location: "Rajshahi, Bangladesh",
      salary: "700,000 - 900,000 TK",
      postedDate: "2024-06-06",
      jobType: "Full-time",
      description: "Plan and execute digital marketing campaigns.",
    },
    {
      id: "7",
      title: "HR Manager",
      company: "PeopleFirst Consultancy",
      location: "Dhaka, Bangladesh",
      salary: "1,000,000 - 1,200,000 TK",
      postedDate: "2024-06-07",
      jobType: "Full-time",
      description: "Manage HR operations and oversee recruitment strategies.",
    },
    {
      id: "8",
      title: "Sales Representative",
      company: "Global Sales BD",
      location: "Barisal, Bangladesh",
      salary: "600,000 - 800,000 TK plus commission",
      postedDate: "2024-06-08",
      jobType: "Full-time",
      description: "Achieve sales targets and maintain client relationships.",
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchLocation, setSearchLocation] = useState("");
  const [filteredJobs, setFilteredJobs] = useState(featuredJobs);
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 3;

  const handleSearch = () => {
    const filtered = featuredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredJobs(filtered);
    setCurrentPage(1); // Reset to the first page when searching
  };

  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div>
      {/* Header Section */}
      <section className="bg-blue-950 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job</h1>
          <p className="text-xl mb-8">
            Discover opportunities that match your skills and aspirations
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 mb-8">
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Job title or keyword"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                className="w-full pl-10 py-3 rounded-lg text-black"
                spellCheck={false}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                🔍
              </span>
            </div>
            <div className="flex-grow relative">
              <input
                type="text"
                placeholder="Location"
                value={searchLocation}
                onChange={(e) => setSearchLocation(e.target.value)}
                className="w-full pl-10 py-3 rounded-lg text-black"
                spellCheck={false}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📍
              </span>
            </div>
            <button
              onClick={handleSearch}
              className="px-8 py-3 bg-white text-primary rounded-lg"
            >
              Search Jobs
            </button>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Featured Jobs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentJobs.length > 0 ? (
              currentJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white shadow-lg rounded-lg p-6 border"
                >
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-600 mb-2">{job.location}</p>
                  <p className="text-gray-600 mb-2">{job.salary}</p>
                  <p className="text-sm text-gray-500">{job.postedDate}</p>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No jobs match your search criteria.
              </p>
            )}
          </div>
         
          {/* Pagination Section */}
          <div className="mt-8 flex justify-center space-x-2">
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
            >
              Previous
            </button>
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`px-4 py-2 rounded-lg ${currentPage === index + 1
                    ? "bg-blue-950 text-white"
                    : "bg-gray-200 text-gray-700"
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg disabled:bg-gray-200"
            >
              Next
            </button>
          </div>
          <div className="mt-12 text-center">
            <Link href="/jobs">
              <button className="btn btn-success bg-black text-white px-6 py-3 rounded-lg">
                View All Jobs
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
