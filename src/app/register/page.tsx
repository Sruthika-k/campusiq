"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User } from "lucide-react";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        router.push("/login?message=Registration successful");
      } else {
        const data = await response.json();
        setError(data.error || "Registration failed");
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
            Create Account
          </h1>
          <p className="text-[#78716c]">
            Join CampusIQ to discover your perfect college
          </p>
        </div>

        {/* Register Form */}
        <div className="rounded-lg border border-[#e7e5e4] bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Field */}
            <div>
              <label htmlFor="name" className="mb-2 block text-sm font-medium text-[#111110]">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="w-full rounded-lg border border-[#e7e5e4] bg-white py-3 pl-10 pr-4 text-[#111110] placeholder-[#78716c] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
                  placeholder="Enter your full name"
                />
              </div>
            </div>

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
                  minLength={8}
                  className="w-full rounded-lg border border-[#e7e5e4] bg-white py-3 pl-10 pr-12 text-[#111110] placeholder-[#78716c] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
                  placeholder="Create a password"
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

            {/* Confirm Password Field */}
            <div>
              <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-[#111110]">
                Confirm Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#78716c]" />
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  minLength={8}
                  className="w-full rounded-lg border border-[#e7e5e4] bg-white py-3 pl-10 pr-12 text-[#111110] placeholder-[#78716c] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#78716c] hover:text-[#111110]"
                >
                  {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
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
                  Creating account...
                </div>
              ) : (
                "Create Account"
              )}
            </button>
          </form>
        </div>

        {/* Sign In Link */}
        <div className="mt-6 text-center">
          <p className="text-[#78716c]">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-[#0f766e] hover:text-[#0d635c]">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
