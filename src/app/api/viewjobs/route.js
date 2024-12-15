import { NextResponse } from 'next/server';
import connectToDatabase from "@/lib/mongodb/mongodb";
import { ObjectId } from 'mongodb';

// ** GET** - Fetch all jobs or a specific job by ID
export async function GET(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id');  // Check if an ID query parameter is provided

        const db = await connectToDatabase();
        const collection = db.collection("jobs");

        if (id) {
            // Fetch a single job by ID
            const job = await collection.findOne({ _id: new ObjectId(id) });

            if (!job) {
                return NextResponse.json({ error: "Job not found." }, { status: 404 });
            }

            return NextResponse.json(job, { status: 200 });
        } else {
            // Fetch all jobs
            const jobs = await collection.find({}).toArray();
            return NextResponse.json(jobs, { status: 200 });
        }
    } catch (error) {
        console.error("Error fetching jobs:", error);
        return NextResponse.json({ error: "Failed to fetch jobs.", details: error.message }, { status: 500 });
    }
}


// ** DELETE** - Delete a specific job by ID
export async function DELETE(req) {
    try {
        const url = new URL(req.url);
        const id = url.searchParams.get('id'); // Using URLSearchParams to extract the query parameter

        if (!id) {
            return NextResponse.json({ error: "Job ID is required." }, { status: 400 });
        }

        const db = await connectToDatabase();
        const collection = db.collection("jobs");

        const result = await collection.deleteOne({ _id: new ObjectId(id) });

        if (result.deletedCount === 0) {
            return NextResponse.json({ error: "Job not found or already deleted." }, { status: 404 });
        }

        return NextResponse.json({ message: "Job deleted successfully" }, { status: 200 });
    } catch (error) {
        console.error("Error deleting job:", error);
        return NextResponse.json({ error: "Failed to delete job.", details: error.message }, { status: 500 });
    }
}

