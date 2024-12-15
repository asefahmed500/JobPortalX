import connectToDatabase from "@/lib/mongodb/mongodb";
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const authOptions = {
  providers: [
    // Credentials Provider for Email and Password Login
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;

        if (!email || !password) {
          throw new Error("All fields are required");
        }

        try {
          const db = await connectToDatabase();
          const user = await db.collection("users").findOne({ email });
          if (!user) {
            throw new Error("Invalid email or password");
          }

          const isValid = await bcrypt.compare(password, user.password);
          if (!isValid) {
            throw new Error("Invalid email or password");
          }

          // Generate JWT token
          const token = jwt.sign(
            { email: user.email, role: user.role, name: user.name },
            process.env.NEXTAUTH_SECRET,
            { expiresIn: "1h" }
          );

          return { email: user.email, name: user.name, role: user.role, token };
        } catch (error) {
          console.error("Login error:", error);
          throw new Error(error.message || "An unexpected error occurred.");
        }
      },
    }),

    // Google OAuth Provider
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  callbacks: {
    async jwt({ token, user, account, profile }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
        token.name = user.name;
        token.token = user.token;
      }

      // Handle Google Sign-In
      if (account && profile) {
        const db = await connectToDatabase();
        const existingUser = await db.collection("users").findOne({ email: profile.email });

        if (!existingUser) {
          // Insert new user into the database
          await db.collection("users").insertOne({
            name: profile.name,
            email: profile.email,
            role: "user",
            createdAt: new Date(),
          });
        }

        token.email = profile.email;
        token.name = profile.name;
        token.role = existingUser?.role || "user";
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user = {
          email: token.email,
          role: token.role,
          name: token.name,
          token: token.token,
        };
      }
      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
};

export const GET = (req, res) => NextAuth(req, res, authOptions);
export const POST = (req, res) => NextAuth(req, res, authOptions);
