"use client";

import {
    Search,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/ui/JobCard";
import { useAPI } from "@/lib/api";
import { useState } from "react";

interface Job {
    id: number;
    title: string;
    description: string;
    category?: string;
    skills?: string[];
    budgetMin: string;
    budgetMax: string;
    deadline: string;
    status: string;
    createdAt: string;
    client?: {
        id: number;
        firstName: string;
        lastName: string;
        email: string;
    };
    _count?: {
        proposal: number;
    };
}

export default function BrowseJobsPage() {
    const [activeTab, setActiveTab] = useState("Best Match");
    const [searchQuery, setSearchQuery] = useState("");

    const { data: jobs, isLoading, error } = useAPI<Job[]>('/api/jobs', { autoFetch: true });

    const handleSearch = () => {
        // TODO: Implement search functionality
        console.log("Searching for:", searchQuery);
    };

    // Calculate time ago from createdAt
    const getTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInMs = now.getTime() - date.getTime();
        const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
        const diffInDays = Math.floor(diffInHours / 24);

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
        if (diffInDays < 7) return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    };

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
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
                    <Button variant="outline" className="hidden sm:inline-flex">
                        <Filter className="mr-2 h-4 w-4" />
                        Filters
                    </Button>
                    <Button onClick={handleSearch}>
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

            {/* Jobs List */}
            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-slate-500">Loading jobs...</div>
                </div>
            ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    <p className="font-medium">Error loading jobs</p>
                    <p className="text-sm">{error.message}</p>
                </div>
            ) : !jobs || jobs.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <p className="text-lg font-medium text-slate-900">No jobs found</p>
                        <p className="text-sm text-slate-500">Check back later for new opportunities</p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <JobCard
                            key={job.id}
                            title={job.title}
                            companyName={job.client ? `${job.client.firstName} ${job.client.lastName}` : "Anonymous Client"}
                            budget={`$${job.budgetMin}-${job.budgetMax}/hr`}
                            type="Hourly"
                            skills={job.skills || []}
                            postedTime={getTimeAgo(job.createdAt)}
                            description={job.description}
                            onClick={() => window.location.href = `/dashboard/freelancer/jobs/${job.id}`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
}
