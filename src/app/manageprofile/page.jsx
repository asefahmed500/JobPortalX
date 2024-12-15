'use client';

import React, { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import Image from "next/image";

const Page = () => {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);

    const [profile, setProfile] = useState({
        name: "",
        email: "",
        profilePicture: "",
    });

    useEffect(() => {
        if (session) {
            setProfile({
                name: session.user?.name || "Name not available",
                email: session.user?.email || "Email not available",
                profilePicture: session.user?.image || "/default-avatar.png",
            });
        }
    }, [session]);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleSave = () => {
        console.log("Profile updated:", profile);
        setIsEditing(false);
    };

    if (!session) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className="p-4 max-w-xl mx-auto bg-gray-100 rounded-md shadow-md">
                <h1 className="text-2xl font-bold mb-4">Manage Profile</h1>
                <div className="flex items-center gap-4 mb-4">
                    {profile.profilePicture ? (
                        <Image
                            src={profile.profilePicture}
                            alt="Profile"
                            width={80}
                            height={80}
                            className="rounded-full object-cover"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                            No Image
                        </div>
                    )}
                    {isEditing ? (
                        <div>
                            <label className="block text-sm font-medium">
                                Profile Picture URL
                            </label>
                            <input
                                type="text"
                                name="profilePicture"
                                value={profile.profilePicture}
                                onChange={handleInputChange}
                                className="border p-2 rounded-md w-full"
                            />
                        </div>
                    ) : (
                        <p className="text-gray-700">Change your profile picture URL</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Name</label>
                    {isEditing ? (
                        <input
                            type="text"
                            name="name"
                            value={profile.name}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                        />
                    ) : (
                        <p className="text-gray-700">{profile.name}</p>
                    )}
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-medium">Email</label>
                    {isEditing ? (
                        <input
                            type="email"
                            name="email"
                            value={profile.email}
                            onChange={handleInputChange}
                            className="border p-2 rounded-md w-full"
                        />
                    ) : (
                        <p className="text-gray-700">{profile.email}</p>
                    )}
                </div>
                <div className="flex justify-end gap-4">
                    {isEditing ? (
                        <>
                            <button
                                onClick={handleSave}
                                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                            >
                                Save
                            </button>
                            <button
                                onClick={handleEditToggle}
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                        </>
                    ) : (
                        <button
                            onClick={handleEditToggle}
                            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                        >
                            Edit Profile
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Page;
