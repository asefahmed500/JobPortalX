import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';
import connectToDatabase from '@/lib/mongodb/mongodb';


// Updated GET API to fetch data from MongoDB
// Updated GET API to fetch data from MongoDB
export async function GET(req) {
    try {
        const { searchParams } = req.nextUrl;
        const id = searchParams.get('id');  // Job ID query parameter

        console.log("Request received. Job ID:", id);

        // Fetch all jobs if no ID is provided
        if (!id) {
            console.log("No Job ID provided. Fetching all jobs...");
            const db = await connectToDatabase();
            const collection = db.collection("jobs");
            const jobs = await collection.find({}).toArray(); // Return all jobs
            return NextResponse.json(jobs, { status: 200 });
        }

        // If ID is provided, validate and fetch job
        if (!ObjectId.isValid(id)) {
            console.log("Invalid Job ID format:", id);
            return NextResponse.json({ error: "Invalid Job ID format." }, { status: 400 });
        }

        const db = await connectToDatabase();
        const collection = db.collection("jobs");
        const job = await collection.findOne({ _id: new ObjectId(id) });

        if (!job) {
            console.log("Job not found for ID:", id);
            return NextResponse.json({ error: "Job not found." }, { status: 404 });
        }

        return NextResponse.json(job, { status: 200 });
    } catch (error) {
        console.error("Error fetching jobs:", error.message);
        return NextResponse.json({ error: "Failed to fetch jobs.", details: error.message }, { status: 500 });
    }
}
