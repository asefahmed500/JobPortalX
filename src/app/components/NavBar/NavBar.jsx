"use client";

import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem } from "@nextui-org/react";
import { Briefcase, UserCircle } from "lucide-react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";

const NavBar = () => {
    const { data: session } = useSession();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <Navbar className="bg-gray-950" shouldHideOnScroll>
            {/* Logo and Brand Name */}
            <NavbarBrand>
                <Briefcase className="text-white" />
                <p className="font-bold text-white ml-2">JOB PORTAL X</p>
            </NavbarBrand>

            {/* Navigation Links */}
            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem>
                    <Link href="/" className="text-white hover:text-primary">Home</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/aboutus" className="text-white hover:text-primary">About</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/blogs" className="text-white hover:text-primary">Blogs</Link>
                </NavbarItem>
                <NavbarItem>
                    <Link href="/jobs" className="text-white hover:text-primary">Jobs</Link>
                </NavbarItem>
            </NavbarContent>

            {/* User Section */}
            <NavbarContent justify="end">
                {session ? (
                    <div className="relative">
                        <button
                            onClick={toggleDropdown}
                            className="flex items-center text-white focus:outline-none hover:text-primary"
                        >
                            <UserCircle className="w-6 h-6 mr-2" />
                            <span>Hi, {session.user.name}</span>
                        </button>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-md shadow-lg">
                                <Link href="/manageprofile">
                                    <p className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer">
                                        Manage Profile
                                    </p>
                                </Link>
                                <Link href="/dashboard">
                                    <p className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer">
                                        Dashboard
                                    </p>
                                </Link>
                                <p
                                    onClick={() => signOut()}
                                    className="block px-4 py-2 text-sm text-white hover:bg-gray-700 cursor-pointer"
                                >
                                    Sign Out
                                </p>
                            </div>
                        )}
                    </div>
                ) : (
                    <NavbarItem>
                        {/* Get Started / Sign In */}
                        <Link href="/auth/signup" passHref>
                            <button className="btn btn-outline text-white hover:text-primary">
                                Get Started
                            </button>
                        </Link>
                    </NavbarItem>
                )}
            </NavbarContent>
        </Navbar>
    );
};

export default NavBar;
