"use client"; // Ensure this is at the top of the file

import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";
import Link from "next/link";

const FormPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data) => {
    console.log(data); // Log form data to verify structure
    try {
      const response = await axios.post("/api/managejobs", data);
      if (response.status === 200) {
        toast.success("Job successfully added to the database!");
        reset(); // Clear the form
      } else {
        toast.error("Failed to add the job. Please try again.");
      }
    } catch (error) {
      console.error("Error adding job:", error.response || error.message || error);
      toast.error("An error occurred while adding the job.");
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-12 px-6">
      <div className="max-w-2xl w-full bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Add Job
        </h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="company"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="location"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="requirements"
              className="block text-sm font-medium text-gray-700"
            >
              Requirements
            </label>
            <textarea
              id="requirements"
              {...register("requirements", { required: true })}
              placeholder="Enter job requirements (comma-separated)"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 text-gray-900 focus:ring-indigo-500 focus:border-indigo-500"
              rows={4}
            ></textarea>
          </div>
          <div>
            <label
              htmlFor="salary"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="jobType"
              className="block text-sm font-medium text-gray-700"
            >
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
            <label
              htmlFor="postedDate"
              className="block text-sm font-medium text-gray-700"
            >
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
            className="w-full bg-indigo-600 text-white font-semibold py-2 px-4 rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Submit
          </button>
        </form>
        <Toaster position="top-center" />
        <div className="mt-16">
          <Link href="/dashboard" className="bg-black text-white rounded ">  <button className="btn btn-success">Back to Dashboard </button></Link>
        </div>
      </div>

    </div>
  );
};

export default FormPage;
