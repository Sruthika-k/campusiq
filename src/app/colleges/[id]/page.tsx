"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, MapPin, DollarSign, GraduationCap, Users, Award, Calendar, BookOpen } from "lucide-react";
import SaveButton from "@/components/SaveButton";

interface College {
  id: string;
  name: string;
  location: string;
  state: string;
  fees: number;
  rating: number;
  courses: string[];
  placements: number;
  established: number;
  description: string;
}

const mockCollege: College = {
  id: "1",
  name: "IIT Bombay",
  location: "Mumbai",
  state: "Maharashtra",
  fees: 200000,
  rating: 4.8,
  courses: ["Computer Science", "Electrical Engineering", "Mechanical Engineering", "Civil Engineering", "Chemical Engineering", "Physics"],
  placements: 98,
  established: 1958,
  description: "Premier engineering institute known for research and industry connections. IIT Bombay is consistently ranked as one of the top engineering institutions in India, known for its rigorous academic programs, cutting-edge research, and strong alumni network."
};

export default function CollegeDetailPage() {
  const [isSaved, setIsSaved] = useState(false);

  const handleSaveToggle = (saved: boolean) => {
    setIsSaved(saved);
  };

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-4xl">
          {/* Back Button */}
          <Link
            href="/colleges"
            className="mb-6 inline-flex items-center gap-2 text-[#78716c] hover:text-[#111110]"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Colleges
          </Link>

          {/* Header */}
          <div className="mb-8 rounded-lg border border-[#e7e5e4] bg-white p-8">
            <div className="mb-4 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <div>
                <h1 className="mb-2 text-3xl font-bold text-[#111110]">
                  {mockCollege.name}
                </h1>
                <div className="flex items-center gap-2 text-[#78716c]">
                  <MapPin className="h-4 w-4" />
                  <span>{mockCollege.location}, {mockCollege.state}</span>
                </div>
              </div>
              <SaveButton
                collegeId={mockCollege.id}
                isSaved={isSaved}
                onToggle={handleSaveToggle}
              />
            </div>

            <p className="text-[#78716c] leading-relaxed">
              {mockCollege.description}
            </p>
          </div>

          {/* Stats Grid */}
          <div className="mb-8 grid gap-6 md:grid-cols-4">
            <div className="rounded-lg border border-[#e7e5e4] bg-white p-6 text-center">
              <div className="mb-2 flex justify-center">
                <div className="rounded-lg bg-[#0f766e]/10 p-3">
                  <Award className="h-6 w-6 text-[#0f766e]" />
                </div>
              </div>
              <div className="mb-1 text-2xl font-bold text-[#111110]">{mockCollege.rating}</div>
              <div className="text-sm text-[#78716c]">Rating</div>
            </div>

            <div className="rounded-lg border border-[#e7e5e4] bg-white p-6 text-center">
              <div className="mb-2 flex justify-center">
                <div className="rounded-lg bg-[#0f766e]/10 p-3">
                  <DollarSign className="h-6 w-6 text-[#0f766e]" />
                </div>
              </div>
              <div className="mb-1 text-2xl font-bold text-[#111110]">₹{(mockCollege.fees / 100000).toFixed(1)}L</div>
              <div className="text-sm text-[#78716c]">Annual Fees</div>
            </div>

            <div className="rounded-lg border border-[#e7e5e4] bg-white p-6 text-center">
              <div className="mb-2 flex justify-center">
                <div className="rounded-lg bg-[#0f766e]/10 p-3">
                  <Users className="h-6 w-6 text-[#0f766e]" />
                </div>
              </div>
              <div className="mb-1 text-2xl font-bold text-[#111110]">{mockCollege.placements}%</div>
              <div className="text-sm text-[#78716c]">Placements</div>
            </div>

            <div className="rounded-lg border border-[#e7e5e4] bg-white p-6 text-center">
              <div className="mb-2 flex justify-center">
                <div className="rounded-lg bg-[#0f766e]/10 p-3">
                  <Calendar className="h-6 w-6 text-[#0f766e]" />
                </div>
              </div>
              <div className="mb-1 text-2xl font-bold text-[#111110]">{mockCollege.established}</div>
              <div className="text-sm text-[#78716c]">Established</div>
            </div>
          </div>

          {/* Courses Section */}
          <div className="rounded-lg border border-[#e7e5e4] bg-white p-8">
            <div className="mb-6 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-[#0f766e]" />
              <h2 className="text-xl font-semibold text-[#111110]">Available Courses</h2>
            </div>
            
            <div className="grid gap-3 md:grid-cols-2">
              {mockCollege.courses.map((course) => (
                <div
                  key={course}
                  className="rounded-lg border border-[#e7e5e4] bg-[#fafaf9] p-4 transition-colors hover:bg-white"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0f766e]/10">
                      <GraduationCap className="h-5 w-5 text-[#0f766e]" />
                    </div>
                    <div>
                      <h3 className="font-medium text-[#111110]">{course}</h3>
                      <p className="text-sm text-[#78716c]">4 Year Program</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="mt-8 rounded-lg border border-[#e7e5e4] bg-white p-8 text-center">
            <h2 className="mb-4 text-2xl font-semibold text-[#111110]">
              Ready to Apply?
            </h2>
            <p className="mb-6 text-[#78716c]">
              Take the first step towards your engineering career at {mockCollege.name}
            </p>
            <div className="flex gap-4 justify-center">
              <button className="rounded-lg bg-[#0f766e] px-6 py-3 text-white transition-colors hover:bg-[#0d635c]">
                Visit Official Website
              </button>
              <button className="rounded-lg border border-[#e7e5e4] bg-white px-6 py-3 text-[#111110] transition-colors hover:bg-[#fafaf9]">
                Download Brochure
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
