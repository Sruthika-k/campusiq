"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, MapPin, DollarSign, BookOpen, Star, ChevronLeft, ChevronRight } from "lucide-react";

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

const mockColleges: College[] = [
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
    id: "2",
    name: "IIT Delhi",
    location: "New Delhi",
    state: "Delhi",
    fees: 200000,
    rating: 4.7,
    courses: ["CS", "EE", "ME", "Physics"],
    placements: 97,
    established: 1961,
    description: "Top-ranked institute with strong alumni network in tech and consulting."
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
    id: "4",
    name: "NIT Trichy",
    location: "Tiruchirappalli",
    state: "Tamil Nadu",
    fees: 150000,
    rating: 4.3,
    courses: ["CS", "EE", "Civil", "Production"],
    placements: 88,
    established: 1964,
    description: "One of the best NITs with excellent placement record."
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
  },
  {
    id: "6",
    name: "Manipal Institute of Technology",
    location: "Manipal",
    state: "Karnataka",
    fees: 250000,
    rating: 3.9,
    courses: ["CS", "ME", "EE", "Civil"],
    placements: 80,
    established: 1957,
    description: "Prominent private tech university with diverse student community."
  }
];

const states = ["All States", "Maharashtra", "Delhi", "Rajasthan", "Tamil Nadu", "Karnataka"];
const feeRanges = ["All Fees", "Under 1L", "1L - 3L", "3L - 5L", "Above 5L"];
const courses = ["All Courses", "CS", "EE", "ME", "CE", "Civil", "Chemical"];

export default function CollegesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedState, setSelectedState] = useState("All States");
  const [selectedFee, setSelectedFee] = useState("All Fees");
  const [selectedCourse, setSelectedCourse] = useState("All Courses");
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredColleges, setFilteredColleges] = useState(mockColleges);

  const collegesPerPage = 6;

  useEffect(() => {
    let filtered = mockColleges.filter(college => {
      const matchesSearch = college.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           college.location.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesState = selectedState === "All States" || college.state === selectedState;
      const matchesCourse = selectedCourse === "All Courses" || college.courses.includes(selectedCourse);
      
      let matchesFee = true;
      if (selectedFee === "Under 1L") matchesFee = college.fees < 100000;
      else if (selectedFee === "1L - 3L") matchesFee = college.fees >= 100000 && college.fees <= 300000;
      else if (selectedFee === "3L - 5L") matchesFee = college.fees > 300000 && college.fees <= 500000;
      else if (selectedFee === "Above 5L") matchesFee = college.fees > 500000;

      return matchesSearch && matchesState && matchesCourse && matchesFee;
    });

    setFilteredColleges(filtered);
    setCurrentPage(1);
  }, [searchTerm, selectedState, selectedFee, selectedCourse]);

  const totalPages = Math.ceil(filteredColleges.length / collegesPerPage);
  const startIndex = (currentPage - 1) * collegesPerPage;
  const paginatedColleges = filteredColleges.slice(startIndex, startIndex + collegesPerPage);

  return (
    <div className="min-h-screen bg-[#fafaf9]">
      <div className="px-4 py-8">
        <div className="mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-[#111110]">
              Explore Colleges
            </h1>
            <p className="text-[#78716c]">
              Find the perfect engineering college for your career goals
            </p>
          </div>

          {/* Search and Filters */}
          <div className="mb-8 space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#78716c]" />
              <input
                type="text"
                placeholder="Search colleges by name or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full rounded-lg border border-[#e7e5e4] bg-white py-3 pl-10 pr-4 text-[#111110] placeholder-[#78716c] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
              />
            </div>

            {/* Filter Dropdowns */}
            <div className="grid gap-4 md:grid-cols-3">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="rounded-lg border border-[#e7e5e4] bg-white px-4 py-3 text-[#111110] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
              >
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>

              <select
                value={selectedFee}
                onChange={(e) => setSelectedFee(e.target.value)}
                className="rounded-lg border border-[#e7e5e4] bg-white px-4 py-3 text-[#111110] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
              >
                {feeRanges.map((range) => (
                  <option key={range} value={range}>
                    {range}
                  </option>
                ))}
              </select>

              <select
                value={selectedCourse}
                onChange={(e) => setSelectedCourse(e.target.value)}
                className="rounded-lg border border-[#e7e5e4] bg-white px-4 py-3 text-[#111110] focus:border-[#0f766e] focus:outline-none focus:ring-1 focus:ring-[#0f766e]"
              >
                {courses.map((course) => (
                  <option key={course} value={course}>
                    {course}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Results Count */}
          <div className="mb-6">
            <p className="text-[#78716c]">
              Showing {paginatedColleges.length} of {filteredColleges.length} colleges
            </p>
          </div>

          {/* College Grid */}
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {paginatedColleges.map((college) => (
              <Link
                key={college.id}
                href={`/colleges/${college.id}`}
                className="group rounded-lg border border-[#e7e5e4] bg-white p-6 shadow-sm transition-all hover:shadow-md"
              >
                <div className="mb-4">
                  <h3 className="mb-2 text-xl font-semibold text-[#111110] group-hover:text-[#0f766e]">
                    {college.name}
                  </h3>
                  <div className="flex items-center gap-2 text-[#78716c]">
                    <MapPin className="h-4 w-4" />
                    <span>{college.location}, {college.state}</span>
                  </div>
                </div>

                <div className="mb-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-[#111110]">{college.rating}</span>
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

                <div className="flex flex-wrap gap-1">
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
              </Link>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex items-center justify-center gap-2">
              <button
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
                className="rounded-lg border border-[#e7e5e4] bg-white p-2 text-[#111110] transition-colors hover:bg-[#fafaf9] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>

              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                      currentPage === page
                        ? "bg-[#0f766e] text-white"
                        : "border border-[#e7e5e4] bg-white text-[#111110] hover:bg-[#fafaf9]"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>

              <button
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
                className="rounded-lg border border-[#e7e5e4] bg-white p-2 text-[#111110] transition-colors hover:bg-[#fafaf9] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
