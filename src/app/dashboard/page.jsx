"use client";

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";

import { FaBars, FaTimes } from "react-icons/fa";
import Link from "next/link";
import { useRouter } from 'next/navigation'

const Dashboard = () => {
  const { data: session, status } = useSession(); // Getting session status
  const [userData, setUserData] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (session) {
      setUserData(session.user); // Ensure the session user is loaded correctly
    }
  }, [session]);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  // Loading state
  if (status === "loading") {
    return <p>Loading...</p>;
  }

  // Check if session is not available
  if (!session) {
    router.push("/signin"); // Redirect to signin if no session
    return <p>Redirecting to signin...</p>;
  }

  // Ensure userData is available before rendering
  if (!userData) {
    return <p>Loading user data...</p>;
  }

  return (
    <div className="flex h-screen text-white">
      {/* Sidebar */}
      <div
        className={`fixed z-20 top-0 left-0 h-full shadow-lg p-4 transition-transform transform bg-black lg:translate-x-0 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:w-64 w-64`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between mt-10">
          <h2 className="text-xl font-bold">Dashboard JOB PORTAL X</h2>
          <button
            onClick={toggleSidebar}
            className="lg:hidden"
            aria-label="Close Sidebar"
          >
            <FaTimes size={24} />
          </button>
        </div>

        {/* Navigation Links */}
        <ul className="menu mt-8 space-y-4">
          {userData?.role === "admin" ? (
            <>
            
            <li>
              <Link
                href="/dashboard/managejobs"
                className="block py-2 px-4 rounded-md hover:bg-blue-950"
              >
                Manage Jobs
              </Link>
            </li><li>
                <Link
                  href="/dashboard/viewjobs"
                  className="block py-2 px-4 rounded-md hover:bg-blue-950"
                >
                  VIew Jobs
                </Link>
              </li></>
          ) : (
            <li>
              <Link
                href="/dashboard/appliedjobs"
                className="block py-2 px-4 rounded-md hover:bg-blue-950"
              >
                Applied Jobs
              </Link>
            </li>
          )}
        </ul>

        {/* Divider */}
        <div className="divider my-6 border-t border-white"></div>

        {/* Footer Links */}
        <ul className="menu space-y-4">
          <li>
            <Link
              href="/"
              className="block py-2 px-4 rounded-md hover:bg-blue-950"
            >
              Home
            </Link>
          </li>
        </ul>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 p-6 overflow-y-auto">
        <button
          onClick={toggleSidebar}
          className="fixed z-30 top-4 left-4 bg-blue-900 text-white p-2 rounded-md lg:hidden"
          aria-label="Open Sidebar"
        >
          <FaBars size={24} />
        </button>

        {/* Dashboard Content */}
        <div>
          {userData?.role === "admin" ? (
            <p className="text-black text-center">Welcome to the Admin Dashboard!</p>
          ) : (
            <p className="text-black text-center">Welcome to your User Dashboard!</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
