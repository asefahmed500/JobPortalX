import { ObjectId } from 'mongodb'; // Import ObjectId for MongoDB
import connectToDatabase from '@/lib/mongodb/mongodb';
import { NextResponse } from 'next/server';

// GET Route to fetch applied jobs for a specific user by email
export async function GET(req) {
    const email = req.nextUrl.searchParams.get('email'); // Extract email from query parameters

    if (!email) {
        return NextResponse.json(
            { message: "Email is required" },
            { status: 400 }
        );
    }

    try {
        const db = await connectToDatabase();
        const appliedJobsCollection = db.collection("appliedjob");

        // Fetch the applied jobs for the specific email
        const appliedJobs = await appliedJobsCollection.find({ email }).toArray();

        return NextResponse.json(appliedJobs, { status: 200 });
    } catch (error) {
        console.error("Error fetching applied jobs:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
// POST Route to apply for a job with email included
export async function POST(req) {
    const { email, jobId, jobTitle, company } = await req.json();

    // Validate the incoming data
    if (!email || !jobId || !jobTitle || !company) {
        return NextResponse.json(
            { message: "Invalid data" },
            { status: 400 }
        );
    }

    try {
        const db = await connectToDatabase();
        const appliedJobsCollection = db.collection("appliedjob");

        // Insert the job application data into MongoDB
        const result = await appliedJobsCollection.insertOne({
            email, // Store the email with the job application
            jobId,
            jobTitle,
            company,
            appliedAt: new Date(),
        });

        return NextResponse.json(result, { status: 201 });
    } catch (error) {
        console.error("Error applying for job:", error);
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}