'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Search } from 'lucide-react';
import Footer from '../components/Footer/Footer';

const JobsList = () => {
  const [jobs, setJobs] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const jobsPerPage = 3;

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const res = await fetch('/api/jobdata');
        if (!res.ok) {
          throw new Error(`Error ${res.status}: ${res.statusText}`);
        }
        const jobList = await res.json();
        setJobs(jobList);
      } catch (error) {
        console.error('Failed to fetch jobs:', error.message);
      }
    };

    fetchJobs();
  }, []);

  // Filter jobs based on search query
  const filteredJobs = jobs.filter((job) =>
    job.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate pagination details
  const totalJobs = filteredJobs.length;
  const totalPages = Math.ceil(totalJobs / jobsPerPage);
  const startIndex = (currentPage - 1) * jobsPerPage;
  const currentJobs = filteredJobs.slice(startIndex, startIndex + jobsPerPage);

  return (
    <div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6 text-center bg-blue-950 text-white rounded">
          Available Jobs on JOB PORTAL X
        </h1>

        {/* Search Bar */}
        <div className="flex items-center gap-2 mb-6">
          <Search size={20} />
          <input
            type="text"
            placeholder="Search jobs..."
            className="border border-gray-300 rounded-md p-2 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            spellCheck={false} // Ensure consistent spellcheck
          />
        </div>

        {/* Job List */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {currentJobs.map((job) => (
            <div
              key={job._id}
              className="border border-gray-300 rounded-lg p-4 hover:shadow-md"
            >
              <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
              <p className="text-sm text-gray-600">
                <strong>Company:</strong> {job.company}
              </p>
              <p className="text-sm text-gray-600">
                <strong>Location:</strong> {job.location}
              </p>
              <p className="text-sm text-gray-500 mt-2">
                {job.description.slice(0, 100)}...
              </p>
              <Link href={`/jobs/${job._id}`}>
                <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600">
                  View Details
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-6">
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default JobsList;
