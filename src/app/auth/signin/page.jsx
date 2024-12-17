
"use client"
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react"; // Import useSession
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Login() {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { data: session, status } = useSession(); // Use session status to handle redirection

  useEffect(() => {
    if (status === "authenticated") {
      // If the session is authenticated, redirect to home page
      router.push("/");
    }
  }, [status, router]); // Re-run when session status changes

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const data = Object.fromEntries(new FormData(e.currentTarget));

    try {
      const response = await signIn("credentials", {
        redirect: false, // Don't automatically redirect
        email: data.email,
        password: data.password,
      });

      if (response?.error) {
        setError("Incorrect email or password. Please try again.");
      } else {
        alert("Login successful!");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await signIn("google", { redirect: false });

      if (response?.error) {
        setError("Failed to sign in with Google. Please try again.");
      }
    } catch (error) {
      console.error("Google Sign-In Error:", error);
      setError("Failed to sign in with Google. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (status === "authenticated") {
      console.log("Google Sign-In successful!"); // Show the alert after the session is authenticated
    }
  }, [status]); // Show alert when session status changes to authenticated

  return (
    <div className="hero bg-black min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse gap-36">
        <div className="text-center lg:text-left space-y-10 text-white">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="font-bold text-2xl">Welcome to JobPortalX</p>
        </div>
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
          <form className="card-body" onSubmit={onSubmit}>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="input input-bordered"
                required
              />
            </div>
            <div className="form-control">
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <input
                type="password"
                name="password"
                placeholder="Enter your password"
                className="input input-bordered"
                required
              />
            </div>
            {error && (
              <div className="text-red-500 mt-2">
                <p>{error}</p>
              </div>
            )}
            <div className="form-control mt-6">
              <button
                type="submit"
                className={`btn btn-primary bg-black ${isLoading ? "loading" : ""}`}
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Login"}
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <button
              onClick={handleGoogleSignIn}
              className={`btn btn-outline btn-accent w-full ${isLoading ? "loading" : ""}`}
              disabled={isLoading}
            >
              Sign in with Google
            </button>
          </div>
          <div className="text-center mt-4">
            <p>
              Don’t have an account?{" "}
              <Link className="text-blue-900 underline font-bold" href="/auth/signup">
                 sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
