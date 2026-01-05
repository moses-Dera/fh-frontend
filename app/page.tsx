"use client";

import Link from "next/link";
import { Navbar } from "../components/layout/Navbar";
import { Button } from "../components/ui/Button";
import { JobCard } from "../components/ui/JobCard";
import { ArrowRight, CheckCircle, Star } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleProtectedNavigation = (e: React.MouseEvent, path: string) => {
    e.preventDefault();
    // Check for token in localStorage
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;

    if (!token) {
      router.push('/login');
    } else {
      router.push(path);
    }
  };

  const recentJobs = [
    {
      id: 1,
      title: "Senior UX/UI Designer for Fintech App",
      company: "Stripe",
      budget: "$60-80/hr",
      type: "Hourly",
      skills: ["Figma", "Prototyping", "Mobile Design"],
      postedTime: "2 hours ago",
      description: "We are looking for an experienced product designer to help us redesign our core mobile application. You will work directly with our product team to create intuitive and beautiful user experiences.",
    },
    {
      id: 2,
      title: "Full Stack Developer (Next.js + Node)",
      company: "Vercel",
      budget: "$5k-8k",
      type: "Fixed-Price",
      skills: ["Next.js", "TypeScript", "PostgreSQL"],
      postedTime: "4 hours ago",
      description: "Need a developer to build a new marketing site with a headless CMS integration. Must be proficient in Next.js 14 and Server Components.",
    },
    {
      id: 3,
      title: "Content Marketing Specialist",
      company: "Spotify",
      budget: "$40-60/hr",
      type: "Hourly",
      skills: ["Copywriting", "SEO", "Social Media"],
      postedTime: "5 hours ago",
      description: "Looking for a creative writer to manage our engineering blog and social media channels. Experience in tech industry is a plus.",
    }
  ] as const;

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <Navbar />

      {/* Hero Section - Split Layout */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-white">
        {/* Subtle Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] bg-[size:20px_20px] opacity-50"></div>

        {/* Soft accent shape */}
        <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-slate-50 to-transparent"></div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* Left Content */}
            <div className="text-center lg:text-left">
              <div className="mb-6 inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-4 py-2 text-sm font-medium text-primary-700">
                <span className="relative flex h-2 w-2 mr-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary-600"></span>
                </span>
                10,000+ Jobs Posted This Month
              </div>

              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight">
                Where
                <span className="relative mx-2">
                  <span className="relative z-10 text-primary-600">talent</span>
                  <span className="absolute bottom-2 left-0 w-full h-3 bg-primary-200 -rotate-1"></span>
                </span>
                meets
                <span className="block mt-2 text-primary-600">opportunity.</span>
              </h1>

              <p className="mt-6 text-lg text-slate-600 max-w-xl mx-auto lg:mx-0">
                The #1 platform connecting world-class freelancers with ambitious companies. From startups to Fortune 500s.
              </p>

              {/* Search Bar Style CTA */}
              <div className="mt-10 flex flex-col sm:flex-row gap-3 max-w-lg mx-auto lg:mx-0">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="What skill are you looking for?"
                    className="w-full h-14 pl-5 pr-4 rounded-xl bg-slate-100 border border-slate-200 text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500"
                  />
                </div>
                <Link href="/register">
                  <Button size="lg" className="h-14 px-8 shadow-lg shadow-primary-500/25">
                    Get Started
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
              </div>

              {/* Quick Stats */}
              <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-8">
                <div>
                  <div className="text-3xl font-bold text-slate-900">2M+</div>
                  <div className="text-sm text-slate-500">Freelancers</div>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">500K+</div>
                  <div className="text-sm text-slate-500">Projects Done</div>
                </div>
                <div className="w-px h-12 bg-slate-200"></div>
                <div>
                  <div className="text-3xl font-bold text-slate-900">98%</div>
                  <div className="text-sm text-slate-500">Satisfaction</div>
                </div>
              </div>
            </div>

            {/* Right Side - Floating Cards */}
            <div className="hidden lg:block relative">
              {/* Main Card */}
              <div className="relative z-20 bg-white rounded-2xl border border-slate-200 p-6 shadow-xl transform hover:scale-105 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 flex items-center justify-center text-white text-xl font-bold">JD</div>
                  <div>
                    <h4 className="font-bold text-slate-900 text-lg">Senior React Developer</h4>
                    <p className="text-slate-500">Remote • $80-120/hr</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700">React</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700">TypeScript</span>
                  <span className="px-3 py-1 rounded-full bg-slate-100 text-sm text-slate-700">Next.js</span>
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                  <span className="text-emerald-600 font-medium">12 proposals</span>
                  <span className="text-slate-400 text-sm">Posted 2h ago</span>
                </div>
              </div>

              {/* Floating Mini Card 1 */}
              <div className="absolute -top-8 -left-8 z-30 bg-white rounded-xl p-4 shadow-xl transform -rotate-6 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-emerald-100 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-emerald-600" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">Payment Received</p>
                    <p className="text-emerald-600 font-bold">+$2,400</p>
                  </div>
                </div>
              </div>

              {/* Floating Mini Card 2 */}
              <div className="absolute -bottom-4 -right-4 z-30 bg-white rounded-xl p-4 shadow-xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-2">
                    <div className="h-8 w-8 rounded-full bg-primary-500 border-2 border-white"></div>
                    <div className="h-8 w-8 rounded-full bg-emerald-500 border-2 border-white"></div>
                    <div className="h-8 w-8 rounded-full bg-violet-500 border-2 border-white"></div>
                  </div>
                  <div>
                    <p className="font-semibold text-slate-900 text-sm">+847 joined today</p>
                  </div>
                </div>
              </div>

              {/* Background Decoration Ring */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-slate-200 rounded-full"></div>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-slate-100 rounded-full"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="border-y border-slate-200 bg-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="mb-8 text-sm font-semibold text-slate-500 uppercase tracking-wider">Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-8 opacity-60 grayscale transition-all hover:grayscale-0 md:gap-16">
            {/* Simple Text Placeholders for Logos */}
            <span className="text-xl font-bold font-serif">Google</span>
            <span className="text-xl font-bold font-sans">Meta</span>
            <span className="text-xl font-bold font-mono">Netflix</span>
            <span className="text-xl font-bold italic">Airbnb</span>
            <span className="text-xl font-bold">Uber</span>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
                A whole world of freelance talent at your fingertips
              </h2>
              <div className="mt-8 space-y-6">
                {[
                  "Proof of quality using our verification system",
                  "Safe and secure payments through our escrow",
                  "No cost until you hire the perfect match",
                  "24/7 support team ready to help"
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-6 w-6 text-emerald-500 shrink-0" />
                    <span className="text-lg text-slate-700">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-10">
                <Button variant="secondary" size="lg">Learn how it works</Button>
              </div>
            </div>
            <div className="relative rounded-2xl bg-slate-100 p-8 lg:p-12">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-50 to-emerald-50 rounded-2xl -z-10"></div>
              {/* Mockup UI Component */}
              <div className="bg-white rounded-xl shadow-xl p-6 max-w-md mx-auto transform rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-12 w-12 rounded-full bg-slate-200"></div>
                  <div>
                    <h4 className="font-bold text-slate-900">Sarah Jenkins</h4>
                    <p className="text-sm text-slate-500">Senior Graphic Designer</p>
                  </div>
                  <div className="ml-auto flex items-center text-emerald-600 text-sm font-bold">
                    <Star className="h-4 w-4 fill-current mr-1" /> 5.0
                  </div>
                </div>
                <p className="text-slate-600 mb-4 text-sm leading-relaxed">
                  "FreelanceHub has completely transformed how I find high-quality clients. The platform is intuitive and the payments are always on time."
                </p>
                <div className="h-2 w-24 bg-slate-100 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Jobs Listings */}
      <section className="py-24 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">Recently Posted Jobs</h2>
            <Link href="/jobs" className="group flex items-center font-semibold text-primary-600 hover:text-primary-700">
              View all jobs
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {recentJobs.map((job) => (
              <JobCard
                key={job.id}
                title={job.title}
                companyName={job.company}
                budget={job.budget}
                type={job.type as any}
                skills={job.skills as any}
                postedTime={job.postedTime}
                description={job.description}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Internships Section */}
      <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <span className="inline-block px-4 py-1 mb-6 text-sm font-medium text-primary-100 bg-white/20 rounded-full">
              New Feature
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Looking for Internships?
            </h2>
            <p className="text-lg text-primary-100 mb-10 max-w-2xl mx-auto">
              Kickstart your career with real-world experience. Browse thousands of internship opportunities
              from top companies worldwide and gain the skills employers are looking for.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/dashboard/freelancer/internships"
                onClick={(e) => handleProtectedNavigation(e, '/dashboard/freelancer/internships')}
                className="inline-block"
              >
                <Button size="lg" className="bg-white/10 text-primary-700 hover:bg-primary-50 border-none shadow-lg w-full sm:w-auto">
                  Browse Internships
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link href="/register">
                <Button size="lg" variant="outline" className="border-white/50 text-white hover:bg-white/10">
                  Post an Internship
                </Button>
              </Link>
            </div>
            <div className="mt-10 flex flex-wrap justify-center gap-8 text-white/80">
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span>Remote & On-site</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span>Paid Opportunities</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-emerald-400" />
                <span>All Experience Levels</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© {new Date().getFullYear()} FreelanceHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
