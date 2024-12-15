import connectToDatabase from "@/lib/mongodb/mongodb"; // Import MongoDB connection function
import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { title, company, location, description, requirements, salary, jobType, postedDate } = await req.json();

    if (!title || !company || !location || !description || !requirements || !salary || !jobType || !postedDate) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const requirementsArray = typeof requirements === "string" ? requirements.split("\n").map((req) => req.trim()) : [];

    const db = await connectToDatabase();
    const collection = db.collection("jobs");

    const result = await collection.insertOne({
      title,
      company,
      location,
      description,
      requirements: requirementsArray,
      salary,
      jobType,
      postedDate: new Date(postedDate),
      createdAt: new Date(),
    });

    return NextResponse.json({ message: "Job added successfully", jobId: result.insertedId }, { status: 200 });
  } catch (error) {
    console.error("Error inserting job:", error);
    return NextResponse.json({ error: "Failed to add the job.", details: error.message }, { status: 500 });
  }
}
