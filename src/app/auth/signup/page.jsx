'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
 // Use react-toastify for non-blocking notifications

export default function Signup() {
  const router = useRouter();

  const onSubmit = async (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        // Use toast for success message
        toast.success("Signup successful! Redirecting...");
        router.push("/"); // Redirect immediately
      } else {
        const error = await response.json();
        toast.error(error.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("An unexpected error occurred. Please try again.");
    }
  };

  const handleGoogleSignup = () => {
    signIn("google");
  };

  return (
    <div className="hero bg-black min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-36">
        <div className="text-center lg:text-left space-y-10 text-white">
          <h1 className="text-5xl font-bold">Sign Up now!</h1>
          <p className="font-bold text-2xl">Welcome to JobPortalX</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Name</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your name"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control mt-6">
              <button type="submit" className="btn btn-primary bg-black">
                Sign Up
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <button
              onClick={handleGoogleSignup}
              className="btn btn-outline btn-accent w-full"
            >
              Sign up with Google
            </button>
          </div>
          <div className="text-center mt-4">
            <p>
              Already have an account?{" "}
              <Link className="text-gray-900 font-bold" href="/auth/signin">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
