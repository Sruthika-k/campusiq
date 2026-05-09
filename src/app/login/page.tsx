"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // TODO: Implement actual login logic with NextAuth
      const response = await fetch("/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        router.push("/colleges");
      } else {
        const data = await response.json();
        setError(data.error || "Login failed");
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="mb-2 text-3xl font-bold text-[#111110]">
            Welcome Back
          </h1>
          <p className="text-[#78716c]">
            Sign in to your account to continue
          </p>
        </div>

        {/* Login Form */}
        <div className="rounded-lg border border-[#e7e5e4] bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="mb-2 block text-sm font-medium text-[#111110]">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#e7e5e4] bg-white py-3 pl-10 pr-4 text-[#111110] placeholder-[#78716c] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
                  placeholder="Enter your email"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="mb-2 block text-sm font-medium text-[#111110]">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#e7e5e4] bg-white py-3 pl-10 pr-12 text-[#111110] placeholder-[#78716c] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#111110]"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#0f766e] py-3 text-white transition-colors hover:bg-[#0d635c] disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="flex items-center justify-center">
                  <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Signing in...
                </div>
              ) : (
                "Sign In"
              )}
            </button>
          </form>

          {/* Forgot Password Link */}
          <div className="mt-6 text-center">
            <Link
              href="/forgot-password"
              className="text-sm text-[#0f766e] hover:text-[#0d635c]"
            >
              Forgot your password?
            </Link>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="mt-6 text-center">
          <p className="text-[#78716c]">
            Don't have an account?{" "}
            <Link href="/register" className="font-medium text-[#0f766e] hover:text-[#0d635c]">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
