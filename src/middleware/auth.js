// Example of the verifyToken middleware (updated)
import { getSession } from "next-auth/react";
import connectToDatabase from "@/lib/mongodb/mongodb";

export const verifyToken = (roleRequired = null) => async (handler) => {
  return async (req, res) => {
    const session = await getSession({ req }); // Get session from the request

    if (!session) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    try {
      // Connect to the database and fetch user info
      const db = await connectToDatabase();
      const usersCollection = db.collection("users");
      const user = await usersCollection.findOne({ email: session.user.email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Attach user to the request object
      req.user = user;

      // Role check (if a role is required)
      if (roleRequired && user.role !== roleRequired) {
        return res.status(403).json({ message: "Forbidden" });
      }

      // Proceed with the handler if user is authenticated and has the required role
      return handler(req, res);
    } catch (error) {
      console.error("Error verifying token:", error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  };
};
