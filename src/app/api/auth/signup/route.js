import connectToDatabase from "@/lib/mongodb/mongodb";
import bcrypt from "bcrypt";

export async function POST(req) {
  const { name, email, password } = await req.json(); // Using req.json() to get the request body

  if (!name || !email || !password) {
    return new Response(JSON.stringify({ message: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    const db = await connectToDatabase();

    // Check if the user already exists
    const existingUser = await db.collection("users").findOne({ email });
    if (existingUser) {
      return new Response(
        JSON.stringify({ message: "User already exists" }),
        { status: 400 }
      );
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save the user
    await db.collection("users").insertOne({
      name,
      email,
      password: hashedPassword,
      role: "user", // Default role
    });

    return new Response(
      JSON.stringify({ message: "User created successfully" }),
      { status: 201 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}

export async function OPTIONS(req) {
  return new Response(JSON.stringify({ message: "Method not allowed" }), {
    status: 405,
  });
}
