import Link from "next/link";
import { Navbar } from "../components/layout/Navbar";
import { Button } from "../components/ui/Button";
import { JobCard } from "../components/ui/JobCard";
import { ArrowRight, CheckCircle, Star } from "lucide-react";

export default function Home() {
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

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-16 pb-24 lg:pt-32 lg:pb-40">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="mx-auto max-w-4xl text-center">
            <div className="mb-6 inline-flex items-center rounded-full border border-primary-200 bg-primary-50 px-3 py-1 text-sm font-medium text-primary-700">
              <span className="flex h-2 w-2 rounded-full bg-primary-600 mr-2"></span>
              New: AI-Powered Job Matching
            </div>
            <h1 className="mb-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-7xl">
              Hire the best talent for your
              <span className="text-primary-600 block sm:inline"> next big idea.</span>
            </h1>
            <p className="mx-auto mb-10 max-w-2xl text-lg text-slate-600 sm:text-xl">
              Connect with top-tier freelancers and agencies. Post a job in minutes and start receiving proposals from vetted professionals today.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Link href="/register">
                <Button size="lg" className="min-w-[160px]">Find Talent</Button>
              </Link>
              <Link href="/jobs">
                <Button variant="outline" size="lg" className="min-w-[160px]">Find Work</Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Abstract Background Decoration */}
        <div className="absolute top-0 left-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 opacity-30 bg-gradient-to-tr from-primary-200 to-emerald-200 blur-3xl rounded-full"></div>
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

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-12">
        <div className="container mx-auto px-4 text-center text-slate-500">
          <p>© 2024 FreelanceHub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
