"use client";
import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react"; // Import useSession from next-auth

const Page = () => {
  const { data: session } = useSession(); // Get session data to access user's email
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!session?.user?.email) {
      setError("User is not logged in.");
      setLoading(false);
      return;
    }

    const fetchAppliedJobs = async () => {
      try {
        const res = await fetch(`/api/appliedjob?email=${session.user.email}`);
        if (!res.ok) {
          throw new Error("Failed to fetch applied jobs");
        }
        const jobs = await res.json();
        setAppliedJobs(jobs);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAppliedJobs();
  }, [session]);

  if (loading) return <p className="text-center text-xl">Loading...</p>;
  if (error) return <p className="text-center text-red-500 text-xl">{error}</p>;

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-4xl">
        <h2 className="text-2xl font-bold mb-4 text-center">Your Applied Jobs</h2>
        {appliedJobs.length === 0 ? (
          <p className="text-center text-lg text-gray-600">You have not applied for any jobs yet.</p>
        ) : (
          <ul className="space-y-4">
            {appliedJobs.map((job) => (
              <li
                key={job._id}
                className="p-6 bg-gray-50 rounded-md shadow-md hover:shadow-xl transition-shadow"
              >
                <h3 className="text-xl font-semibold text-gray-800">{job.jobTitle}</h3>
                <p className="text-gray-600">
                  <strong>Company:</strong> {job.company}
                </p>
                <p className="text-gray-500">
                  <strong>Applied On:</strong> {new Date(job.appliedAt).toLocaleDateString()}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Page;
