"use client";

import {
    DollarSign,
    FileText,
    Eye,
    Search
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/ui/JobCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import Link from "next/link";

export default function FreelancerOverviewPage() {
    const recommendedJobs = [
        {
            id: "101",
            title: "Senior React Developer for Dashboard Project",
            company: "TechFlow Inc.",
            budget: "$60-80/hr",
            type: "Hourly",
            skills: ["React", "TypeScript", "Tailwind"],
            postedTime: "1 hour ago",
            description: "We are looking for a senior developer to lead the frontend development of our new analytics dashboard. Experience with D3.js or Recharts is a plus.",
        },
        {
            id: "102",
            title: "Figma Designer for Mobile App",
            company: "StartUp Lab",
            budget: "$3k Fixed",
            type: "Fixed-Price",
            skills: ["Figma", "Mobile Design", "Prototyping"],
            postedTime: "3 hours ago",
            description: "Need a complete design overhaul for our iOS application. Looking for clean, modern aesthetics similar to Airbnb and Uber.",
        },
    ] as const;

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Welcome back, Alex</h1>
                    <p className="text-slate-500">You have 2 new invitations to interview.</p>
                </div>
                <Link href="/dashboard/freelancer/jobs">
                    <Button>
                        <Search className="mr-2 h-4 w-4" />
                        Find Work
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                    label="Total Earnings"
                    value="$8,450"
                    trend="+12% this month"
                    trendUp={true}
                    icon={DollarSign}
                    color="green"
                />
                <StatsCard
                    label="Active Proposals"
                    value="5"
                    trend="2 viewed"
                    trendUp={true}
                    icon={FileText}
                    color="blue"
                />
                <StatsCard
                    label="Profile Views"
                    value="128"
                    trend="+24 this week"
                    trendUp={true}
                    icon={Eye}
                    color="purple"
                />
            </div>

            {/* Recommended Jobs */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Recommended for you</h2>
                    <Link href="/dashboard/freelancer/jobs" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        View all matches
                    </Link>
                </div>
                <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                    {recommendedJobs.map((job) => (
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
        </div>
    );
}
