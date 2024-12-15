"use client";
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { FaEdit, FaTrashAlt } from 'react-icons/fa';

const ViewJobs = () => {
    const [jobs, setJobs] = useState([]);
    const router = useRouter();

    // Fetch all jobs
    useEffect(() => {
        const fetchJobs = async () => {
            try {
                const response = await fetch('/api/viewjobs');
                const data = await response.json();
                if (response.ok) {
                    setJobs(data);
                } else {
                    toast.error('Error fetching jobs');
                }
            } catch (error) {
                console.error("Error fetching jobs:", error);
                toast.error('Error fetching jobs');
            }
        };

        fetchJobs();
    }, []);

    // Delete job
    const handleDelete = async (id) => {
        const confirmDelete = window.confirm('Are you sure you want to delete this job?');
        if (confirmDelete) {
            try {
                const response = await fetch(`/api/viewjobs?id=${id}`, {
                    method: 'DELETE',
                });
                const data = await response.json();
                if (response.ok) {
                    setJobs(jobs.filter((job) => job._id !== id)); // Remove the deleted job
                    toast.success(data.message);
                } else {
                    toast.error(data.error || 'Error deleting job');
                }
            } catch (error) {
                console.error("Error deleting job:", error);
                toast.error('Error deleting job');
            }
        }
    };

    // Update job - Navigate to the update page
    const handleUpdate = (id) => {
        router.push(`/dashboard/updatejob/${id}`); // Navigate to the update job page with the job ID
    };

    return (
        <div className="min-h-screen flex justify-center items-center bg-gray-100 py-10">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-lg p-6">
                <h2 className="text-3xl font-bold text-center mb-6">View Jobs</h2>
                <div className="overflow-x-auto">
                    <table className="min-w-full table-auto text-gray-800">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="px-4 py-2 text-left">Title</th>
                                <th className="px-4 py-2 text-left">Company</th>
                                <th className="px-4 py-2 text-left">Location</th>
                                <th className="px-4 py-2 text-left">Salary</th>
                                <th className="px-4 py-2 text-left">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job._id} className="border-b hover:bg-gray-100">
                                    <td className="px-4 py-2">{job.title}</td>
                                    <td className="px-4 py-2">{job.company}</td>
                                    <td className="px-4 py-2">{job.location}</td>
                                    <td className="px-4 py-2">{job.salary}</td>
                                    <td className="px-4 py-2 flex space-x-2">
                                        <button 
                                            onClick={() => handleUpdate(job._id)} 
                                            className="text-blue-500 hover:text-blue-700">
                                            <FaEdit size={18} />
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(job._id)} 
                                            className="text-red-500 hover:text-red-700">
                                            <FaTrashAlt size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default ViewJobs;
