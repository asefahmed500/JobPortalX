"use client";

import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import { useParams } from "next/navigation"; // Import useParams

const UpdateJob = () => {
  const { id } = useParams(); // Access the param using useParams
  const router = useRouter();

  // Initialize useForm with defaultValues
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      company: "",
      location: "",
      salary: "",
      description: "",
      requirements: "",
      jobType: "",
      postedDate: "",
    },
  });

  useEffect(() => {
    if (id) {
      const fetchJob = async () => {
        try {
          const response = await axios.get(`/api/updatejobs/${id}`);
          if (response.status === 200) {
            const jobData = response.data;
            reset(jobData); // Update the form with fetched job data
          } else {
            toast.error("Failed to fetch job details");
          }
        } catch (error) {
          console.error("Error fetching job details:", error);
          toast.error("An error occurred while fetching job details");
        }
      };

      fetchJob();
    }
  }, [id, reset]); // Ensure reset is only called after id is available

  const onSubmit = async (data) => {
    try {
      const response = await axios.patch(`/api/updatejobs/${id}`, data);
      if (response.status === 200) {
        toast.success("Job successfully updated!");
        router.push("/dashboard");
      } else {
        toast.error("Failed to update job. Please try again.");
      }
    } catch (error) {
      console.error("Error updating job:", error);
      toast.error("An error occurred while updating the job.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <Toaster />
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Update Job</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Form Fields */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              id="title"
              {...register("title", { required: true })}
              placeholder="Enter job title"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">
              Company
            </label>
            <input
              id="company"
              {...register("company", { required: true })}
              placeholder="Enter company name"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="location" className="block text-sm font-medium text-gray-700">
              Location
            </label>
            <input
              id="location"
              {...register("location", { required: true })}
              placeholder="Enter job location"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="salary" className="block text-sm font-medium text-gray-700">
              Salary
            </label>
            <input
              id="salary"
              {...register("salary", { required: true })}
              placeholder="Enter salary range"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              id="description"
              {...register("description", { required: true })}
              placeholder="Enter job description"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label htmlFor="requirements" className="block text-sm font-medium text-gray-700">
              Requirements
            </label>
            <textarea
              id="requirements"
              {...register("requirements", { required: true })}
              placeholder="Enter job requirements"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label htmlFor="jobType" className="block text-sm font-medium text-gray-700">
              Job Type
            </label>
            <select
              id="jobType"
              {...register("jobType", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            >
              <option value="">Select Job Type</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Contract">Contract</option>
              <option value="Freelance">Freelance</option>
            </select>
          </div>
          <div>
            <label htmlFor="postedDate" className="block text-sm font-medium text-gray-700">
              Posted Date
            </label>
            <input
              id="postedDate"
              type="date"
              {...register("postedDate", { required: true })}
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {isSubmitting ? "Updating..." : "Update Job"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateJob;
