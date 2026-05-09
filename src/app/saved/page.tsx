"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Bookmark, MapPin, DollarSign, BookOpen, Star, ExternalLink } from "lucide-react";
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

const mockSavedColleges: College[] = [
  {
    id: "1",
    name: "IIT Bombay",
    location: "Mumbai",
    state: "Maharashtra",
    fees: 200000,
    rating: 4.8,
    courses: ["CS", "EE", "ME", "CE"],
    placements: 98,
    established: 1958,
    description: "Premier engineering institute known for research and industry connections."
  },
  {
    id: "3",
    name: "BITS Pilani",
    location: "Pilani",
    state: "Rajasthan",
    fees: 500000,
    rating: 4.5,
    courses: ["CS", "EE", "Mechanical", "Chemical"],
    placements: 92,
    established: 1964,
    description: "Known for its dual-degree programs and strong industry ties."
  },
  {
    id: "5",
    name: "VIT Vellore",
    location: "Vellore",
    state: "Tamil Nadu",
    fees: 180000,
    rating: 4.0,
    courses: ["CS", "EE", "ME", "Biotech"],
    placements: 82,
    established: 1984,
    description: "Large private university with wide industry connections."
  }
];

export default function SavedCollegesPage() {
  const [savedColleges, setSavedColleges] = useState(mockSavedColleges);

  const handleSaveToggle = (collegeId: string, saved: boolean) => {
    if (!saved) {
      setSavedColleges(prev => prev.filter(college => college.id !== collegeId));
    }
  };

  return (
    <div className="min-h-screen bg-[#fafaf9] page-transition">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-6xl">
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f766e]/10">
                <Bookmark className="h-6 w-6 text-[#0f766e]" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-[#111110]">
                  Saved Colleges
                </h1>
                <p className="text-[#78716c]">
                  Your shortlisted engineering colleges
                </p>
              </div>
            </div>
          </div>

          {savedColleges.length === 0 ? (
            // Empty State
            <div className="rounded-lg border border-[#e7e5e4] bg-white p-16 text-center">
              <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-lg bg-[#0f766e]/10">
                <Bookmark className="h-8 w-8 text-[#0f766e]" />
              </div>
              <h2 className="mb-2 text-xl font-semibold text-[#111110]">
                No saved colleges yet
              </h2>
              <p className="mb-6 text-[#78716c]">
                Start exploring and save colleges that interest you to compare them later.
              </p>
              <Link
                href="/colleges"
                className="inline-flex items-center gap-2 rounded-lg btn-accent px-6 py-3 text-white"
              >
                Explore Colleges
              </Link>
            </div>
          ) : (
            <>
              {/* Results Count */}
              <div className="mb-6">
                <p className="text-[#78716c]">
                  You have {savedColleges.length} saved {savedColleges.length === 1 ? 'college' : 'colleges'}
                </p>
              </div>

              {/* Saved Colleges Grid */}
              <div className="grid gap-6 lg:grid-cols-2">
                {savedColleges.map((college, index) => (
                  <div
                    key={college.id}
                    className={`college-card rounded-lg border border-[#e7e5e4] bg-white p-6 shadow-sm card-animate`}
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className="mb-4">
                      <div className="flex items-start justify-between mb-2">
                        <h3 className="text-xl font-semibold text-[#111110]">
                          {college.name}
                        </h3>
                        <SaveButton
                          collegeId={college.id}
                          isSaved={true}
                          onToggle={(saved) => handleSaveToggle(college.id, saved)}
                        />
                      </div>
                      <div className="flex items-center gap-2 text-[#78716c]">
                        <MapPin className="h-4 w-4" />
                        <span>{college.location}, {college.state}</span>
                      </div>
                    </div>

                    <div className="mb-4 space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="rating-badge">
                          <Star className="h-3 w-3 fill-white" />
                          <span>{college.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4 text-[#78716c]" />
                          <span className="text-sm text-[#78716c]">₹{(college.fees / 100000).toFixed(1)}L</span>
                        </div>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4 text-[#78716c]" />
                        <span className="text-sm text-[#78716c]">{college.placements}% Placements</span>
                      </div>
                    </div>

                    <div className="mb-4">
                      <p className="text-sm text-[#78716c] line-clamp-2">
                        {college.description}
                      </p>
                    </div>

                    <div className="flex flex-wrap gap-1 mb-4">
                      {college.courses.slice(0, 3).map((course) => (
                        <span
                          key={course}
                          className="rounded bg-[#0f766e]/10 px-2 py-1 text-xs font-medium text-[#0f766e]"
                        >
                          {course}
                        </span>
                      ))}
                      {college.courses.length > 3 && (
                        <span className="rounded bg-[#e7e5e4] px-2 py-1 text-xs font-medium text-[#78716c]">
                          +{college.courses.length - 3}
                        </span>
                      )}
                    </div>

                    <div className="flex gap-3">
                      <Link
                        href={`/colleges/${college.id}`}
                        className="flex-1 rounded-lg border border-[#e7e5e4] bg-white px-4 py-2 text-center text-sm font-medium text-[#111110] transition-colors hover:bg-[#fafaf9]"
                      >
                        View Details
                      </Link>
                      <button className="rounded-lg border border-[#e7e5e4] bg-white px-4 py-2 text-sm font-medium text-[#111110] transition-colors hover:bg-[#fafaf9]">
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Compare Section */}
              <div className="mt-8 rounded-lg border border-[#e7e5e4] bg-white p-8">
                <h2 className="mb-4 text-xl font-semibold text-[#111110]">
                  Compare Your Saved Colleges
                </h2>
                <p className="mb-6 text-[#78716c]">
                  Compare your shortlisted colleges side by side to make the best decision.
                </p>
                <button className="rounded-lg btn-accent px-6 py-3 text-white">
                  Compare Colleges
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
