import Link from "next/link";
import { Search, GraduationCap, MapPin, TrendingUp } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#fafaf9] page-transition">
      {/* Hero Section */}
      <section className="hero-pattern relative px-4 py-32 md:py-40 overflow-hidden">
        <div className="mx-auto max-w-4xl text-center relative z-10">
          <h1 className="mb-6 text-5xl md:text-7xl font-bold text-[#111110] leading-tight" style={{ animation: 'heroFadeInUp 0.4s ease-out both' }}>
            Find Your <span className="highlight-underline">Perfect</span> College
          </h1>
          <p className="mb-8 text-lg text-[#78716c] md:text-xl">
            Discover top engineering colleges across India with detailed insights, 
            rankings, and placement statistics.
          </p>
          
          {/* Stats Row */}
          <div className="mb-10 flex justify-center gap-8 text-sm text-[#78716c]" style={{ animation: 'heroStatsFadeIn 0.1s ease-out 0.3s both' }}>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0f766e]">500+</div>
              <div className="text-xs">Students helped</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0f766e]">15</div>
              <div className="text-xs">Colleges</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-[#0f766e]">8</div>
              <div className="text-xs">States</div>
            </div>
          </div>
          
          <Link 
            href="/colleges"
            className="inline-flex items-center gap-2 rounded-lg btn-accent px-6 py-3 text-white"
            style={{ animation: 'heroButtonFadeIn 0.2s ease-out 0.5s both' }}
          >
            <Search className="h-5 w-5" />
            Explore Colleges
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-bold text-[#111110]">
              Why Choose CampusIQ?
            </h2>
            <p className="text-[#78716c]">
              Comprehensive college discovery platform with powerful features
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="feature-card rounded-lg border border-[#e7e5e4] bg-white p-8" style={{ animation: 'featureCardFadeInUp 0.1s ease-out both' }}>
              <div className="feature-dot"></div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f766e]/10">
                <Search className="h-6 w-6 text-[#0f766e]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#111110]">
                Smart Search
              </h3>
              <p className="text-[#78716c]">
                Filter colleges by location, fees, courses, and more. Find exactly what you're looking for with our advanced search system.
              </p>
            </div>

            {/* Feature Card 2 */}
            <div className="feature-card rounded-lg border border-[#e7e5e4] bg-white p-8" style={{ animation: 'featureCardFadeInUp 0.2s ease-out both' }}>
              <div className="feature-dot"></div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f766e]/10">
                <GraduationCap className="h-6 w-6 text-[#0f766e]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#111110]">
                Detailed Insights
              </h3>
              <p className="text-[#78716c]">
                Access comprehensive information about courses, placements, fees, and campus life for each college.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="feature-card rounded-lg border border-[#e7e5e4] bg-white p-8" style={{ animation: 'featureCardFadeInUp 0.3s ease-out both' }}>
              <div className="feature-dot"></div>
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-[#0f766e]/10">
                <MapPin className="h-6 w-6 text-[#0f766e]" />
              </div>
              <h3 className="mb-3 text-xl font-semibold text-[#111110]">
                Save & Compare
              </h3>
              <p className="text-[#78716c]">
                Save your favorite colleges and compare them side by side to make the best decision for your future.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-6xl">
          <div className="rounded-lg border border-[#e7e5e4] bg-white p-12 text-center">
            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <div className="mb-2 text-4xl font-bold text-[#0f766e]">15+</div>
                <div className="text-[#78716c]">Top Engineering Colleges</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-[#0f766e]">100+</div>
                <div className="text-[#78716c]">Courses Available</div>
              </div>
              <div>
                <div className="mb-2 text-4xl font-bold text-[#0f766e]">95%+</div>
                <div className="text-[#78716c]">Placement Rates</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-16">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="mb-4 text-3xl font-bold text-[#111110]">
            Ready to Find Your Dream College?
          </h2>
          <p className="mb-8 text-lg text-[#78716c]">
            Start exploring thousands of colleges and find the perfect match for your career goals.
          </p>
          <div className="flex gap-4 justify-center">
            <Link 
              href="/colleges"
              className="inline-flex items-center gap-2 rounded-lg btn-accent px-6 py-3 text-white"
            >
              <TrendingUp className="h-5 w-5" />
              Browse Colleges
            </Link>
            <Link 
              href="/register"
              className="inline-flex items-center gap-2 rounded-lg border border-[#e7e5e4] bg-white px-6 py-3 text-[#111110] transition-colors hover:bg-[#fafaf9]"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
