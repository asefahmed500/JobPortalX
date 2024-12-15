import connectToDatabase from "@/lib/mongodb/mongodb";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export async function POST(req, res) {
  const { email, password } = await req.json();

  if (!email || !password) {
    return new Response(JSON.stringify({ message: "All fields are required" }), {
      status: 400,
    });
  }

  try {
    const db = await connectToDatabase();

    // Check if the user exists
    const user = await db.collection("users").findOne({ email });
    if (!user) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 400 }
      );
    }

    // Compare passwords
    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return new Response(
        JSON.stringify({ message: "Invalid email or password" }),
        { status: 400 }
      );
    }

    // Generate a JWT
    const token = jwt.sign(
      { email: user.email, role: user.role },
      process.env.NEXTAUTH_SECRET,
      { expiresIn: "1h" }
    );

    return new Response(
      JSON.stringify({ token }),
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return new Response(
      JSON.stringify({ message: "Internal server error" }),
      { status: 500 }
    );
  }
}
