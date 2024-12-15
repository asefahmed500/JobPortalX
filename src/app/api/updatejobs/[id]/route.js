// src/app/api/updatejobs/[id]/route.js
import connectToDatabase from "@/lib/mongodb/mongodb";
import { ObjectId } from "mongodb";
import { NextResponse } from 'next/server';

export async function GET(req, { params }) {
    const { id } = await params;  // Await the params object

    if (!id) {
        return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    }

    try {
        const db = await connectToDatabase();
        const collection = db.collection("jobs");

        const job = await collection.findOne({ _id: new ObjectId(id) });

        if (!job) {
            return NextResponse.json({ error: "Job not found." }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200 });
    } catch (error) {
        console.error("Error fetching job:", error);
        return NextResponse.json({ error: "Failed to fetch job.", details: error.message }, { status: 500 });
    }
}

export async function PATCH(req, { params }) {
    const { id } = await params;  // Await the params object

    if (!id) {
        return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
    }

    try {
        const { title, company, location, description, requirements, salary, jobType, postedDate } = await req.json();

        const updates = {};
        if (title) updates.title = title;
        if (company) updates.company = company;
        if (location) updates.location = location;
        if (description) updates.description = description;

        // Ensure 'requirements' is a string or handle accordingly
        if (requirements) {
            if (typeof requirements === 'string') {
                updates.requirements = requirements.split("\n").map((req) => req.trim());
            } else if (Array.isArray(requirements)) {
                updates.requirements = requirements.map((req) => req.trim());
            } else {
                console.error('Invalid format for requirements:', requirements);
                return NextResponse.json({ error: "Invalid format for requirements." }, { status: 400 });
            }
        }

        if (salary) updates.salary = salary;
        if (jobType) updates.jobType = jobType;
        if (postedDate) updates.postedDate = new Date(postedDate);

        const db = await connectToDatabase();
        const collection = db.collection("jobs");

        const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: updates });

        if (result.matchedCount === 0) {
            return NextResponse.json({ error: "Job not found." }, { status: 404 });
        }

        return NextResponse.json({ message: "Job updated successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error updating job:", error);
        return NextResponse.json({ error: "Failed to update job.", details: error.message }, { status: 500 });
    }
}
