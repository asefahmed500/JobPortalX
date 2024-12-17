"use client"

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation"; // Import useParams and useRouter
import { useSession } from "next-auth/react"; // Import useSession from next-auth
import toast, { Toaster } from "react-hot-toast";

const JobDetails = () => {
  const { id } = useParams(); // Access the job ID from the route parameters
  const router = useRouter(); // To handle redirect
  const { data: session } = useSession(); // Get session data
  const [job, setJob] = useState(null);

  useEffect(() => {
    if (!id) {
      console.error("Job ID is missing");
      return;
    }

    const fetchJobData = async () => {
      try {
        const res = await fetch(`/api/jobdata?id=${id}`);
        if (!res.ok) {
          throw new Error("Failed to fetch job data");
        }
        const fetchedJob = await res.json();
        setJob(fetchedJob);
      } catch (error) {
        console.error("Error fetching job details:", error);
      }
    };

    fetchJobData();
  }, [id]);

  const handleApply = async () => {
    if (!session?.user) {
      router.push("/auth/signin");
      return;
    }

    try {
      const res = await fetch("/api/appliedjob", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: session.user.email, // Send the user email
          jobId: job._id, // Ensure you're using the correct field
          jobTitle: job.title,
          company: job.company,
        }),
      });

      if (!res.ok) {
        throw new Error("Failed to apply for the job");
      }

      toast.success("Application submitted successfully!");
    } catch (error) {
      console.error("Error submitting application:", error);
      toast.error("Error submitting application");
    }
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
          <strong>Type:</strong> {job.jobType}
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
