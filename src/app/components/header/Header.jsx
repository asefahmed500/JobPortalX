"use client"
import React, { useState } from 'react';
import Link from 'next/link';

const Header = () => {
  const featuredJobs = [
    {
      id: '1',
      title: 'Software Engineer',
      company: 'Tech Co',
      location: 'San Francisco, CA',
      salary: '$120,000 - $150,000',
      postedDate: '2024-06-01',
      jobType: 'Full-time',
      description: 'Exciting opportunity for a software engineer...',
    },
    {
      id: '2',
      title: 'Product Manager',
      company: 'Startup Inc',
      location: 'New York, NY',
      salary: '$100,000 - $130,000',
      postedDate: '2024-05-28',
      jobType: 'Full-time',
      description: 'Lead product development in a fast-paced startup...',
    },
    {
      id: '3',
      title: 'Data Scientist',
      company: 'Big Data Corp',
      location: 'Seattle, WA',
      salary: '$130,000 - $160,000',
      postedDate: '2024-05-30',
      jobType: 'Full-time',
      description: 'Apply your expertise in machine learning...',
    },
  ];

  const [searchKeyword, setSearchKeyword] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [filteredJobs, setFilteredJobs] = useState(featuredJobs);

  const handleSearch = () => {
    const filtered = featuredJobs.filter(
      (job) =>
        job.title.toLowerCase().includes(searchKeyword.toLowerCase()) &&
        job.location.toLowerCase().includes(searchLocation.toLowerCase())
    );
    setFilteredJobs(filtered);
  };

  return (
    <div>
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
                className="w-full pl-10 py-3 rounded-lg text-black"
                spellCheck={false}
              />
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">
                📍
              </span>
            </div>
            <button className="px-8 py-3 bg-white text-primary rounded-lg">
              Search Jobs
            </button>
          </div>
        </div>
      </section>


      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">
            Featured Jobs
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredJobs.length > 0 ? (
              filteredJobs.map((job) => (
                <div
                  key={job.id}
                  className="bg-white shadow-lg rounded-lg p-6 border"
                >
                  <h3 className="text-xl font-bold mb-2">{job.title}</h3>
                  <p className="text-gray-600 mb-2">{job.company}</p>
                  <p className="text-gray-600 mb-2">{job.location}</p>
                  <p className="text-gray-600 mb-2">{job.salary}</p>
                  <p className="text-sm text-gray-500">{job.postedDate}</p>
                  <Link
                    href={`/jobs/${job.id}`}
                   
                  >
                    <button  className="text-primary btm-xs font-bold">View Details</button>
                  </Link>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-500">
                No jobs match your search criteria.
              </p>
            )}
          </div>
          <div className="mt-12 text-center">
            <Link href="/jobs" >
              <button className='btn btn-primary bg-black' > View All Jobs</button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Header;
