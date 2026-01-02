"use client";

import {
    Search,
    MapPin,
    Clock,
    DollarSign,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/ui/JobCard";
import { useState } from "react";

export default function BrowseJobsPage() {
    const [activeTab, setActiveTab] = useState("Best Match");

    const jobs = [
        {
            id: "1",
            title: "Senior UX/UI Designer for Fintech App",
            company: "Stripe",
            budget: "$60-80/hr",
            type: "Hourly",
            skills: ["Figma", "Prototyping", "Mobile Design"],
            postedTime: "2 hours ago",
            description: "We are looking for an experienced product designer to help us redesign our core mobile application. You will work directly with our product team to create intuitive and beautiful user experiences.",
        },
        {
            id: "2",
            title: "React Native Developer",
            company: "Coinbase",
            budget: "$50-65/hr",
            type: "Hourly",
            skills: ["React Native", "iOS", "Android"],
            postedTime: "1 day ago",
            description: "Looking for a React Native expert to help us ship new features for our crypto trading app. Must have experience with native modules.",
        },
        {
            id: "3",
            title: "Full Stack Developer (Next.js)",
            company: "Vercel",
            budget: "$5k-8k",
            type: "Fixed-Price",
            skills: ["Next.js", "TypeScript", "PostgreSQL"],
            postedTime: "4 hours ago",
            description: "Need a developer to build a new marketing site with a headless CMS integration. Must be proficient in Next.js 14 and Server Components.",
        },
        {
            id: "4",
            title: "Technical Writer for API Documentation",
            company: "Twilio",
            budget: "$40/hr",
            type: "Hourly",
            skills: ["Technical Writing", "API", "Markdown"],
            postedTime: "2 days ago",
            description: "We need a technical writer to help us update our API documentation. You will work closely with our engineering team to ensure accuracy.",
        },
        {
            id: "4",
            title: "Technical Writer for API Documentation",
            company: "Twilio",
            budget: "$40/hr",
            type: "Hourly",
            skills: ["Technical Writing", "API", "Markdown"],
            postedTime: "2 days ago",
            description: "We need a technical writer to help us update our API documentation. You will work closely with our engineering team to ensure accuracy.",
        }

    ] as const;

    return (
        <div className="space-y-6">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-slate-900">Browse Jobs</h1>

                {/* Search Bar */}
                <div className="flex gap-2">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Search for jobs..."
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
                    <Button variant="outline" className="hidden sm:inline-flex">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                    <Button>
                        Search
                    </Button>
                </div>
            </div>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex gap-6 overflow-x-auto">
                    {["Best Match", "Most Recent", "Saved Jobs"].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`whitespace-nowrap border-b-2 px-1 py-4 text-sm font-medium transition-colors ${activeTab === tab
                                    ? "border-primary-600 text-primary-600"
                                    : "border-transparent text-slate-500 hover:border-slate-300 hover:text-slate-700"
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </nav>
            </div>

            <div className="grid gap-4">
                {jobs.map((job) => (
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
    );
}
