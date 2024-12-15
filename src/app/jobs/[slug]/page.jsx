'use client';

import { use } from 'react';
import { useEffect, useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const JobDetails = ({ params }) => {
  const { slug } = use(params); // Unwrap params with React.use()
  const [job, setJob] = useState(null);

  useEffect(() => {
    const fetchJobData = async () => {
      try {
        const res = await fetch('/jobs.json');
        if (!res.ok) {
          throw new Error('Failed to fetch jobs.json');
        }
        const jobs = await res.json();

        console.log('Fetched jobs:', jobs);
        const foundJob = jobs.find((b) => String(b.slug) === slug);
        console.log('Found job:', foundJob);

        setJob(foundJob);
      } catch (error) {
        console.error(error);
      }
    };

    fetchJobData();
  }, [slug]);

  const handleApply = () => {
    toast.success('Application submitted successfully!');
  };

  if (!job) {
    return <p className="text-center text-xl mt-4">Job not found</p>;
  }

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <Toaster position="top-center" />
      <div className="bg-white rounded-lg shadow-md p-6 max-w-lg w-full">
        <h1 className="text-2xl font-bold mb-4">{job.title}</h1>
        <p className="text-gray-700 mb-2">
          <strong>Company:</strong> {job.company}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Location:</strong> {job.location}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Type:</strong> {job.type}
        </p>
        <p className="text-gray-700 mb-2">
          <strong>Salary:</strong> {job.salary}
        </p>
        <h3 className="text-xl font-semibold mt-4 mb-2">Description</h3>
        <p className="text-gray-600 mb-4">{job.description}</p>
        <h3 className="text-xl font-semibold mb-2">Requirements</h3>
        <ul className="list-disc list-inside text-gray-600 mb-4">
          {job.requirements.map((req, index) => (
            <li key={index}>{req}</li>
          ))}
        </ul>
        <button
          onClick={handleApply}
          className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
        >
          Apply Now
        </button>
      </div>
    </div>
  );
};

export default JobDetails;
