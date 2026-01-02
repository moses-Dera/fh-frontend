"use client";

import {
    Search,
    Filter
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/ui/JobCard";
import { useAPI, apiRequest } from "@/lib/api";
import { useState, useEffect } from "react";
import { useDebounce } from "@/lib/hooks"; // Assuming a useDebounce hook exists or I'll implement a simple one/use timeout

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
    isSaved?: boolean;
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
    const [activeTab, setActiveTab] = useState("Most Recent");
    const [searchQuery, setSearchQuery] = useState("");

    // Simple debounce to prevent API spam
    const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);
    useEffect(() => {
        const timer = setTimeout(() => setDebouncedSearch(searchQuery), 500);
        return () => clearTimeout(timer);
    }, [searchQuery]);

    // Construct API URL with params
    const getEndpoint = () => {
        const params = new URLSearchParams();
        if (debouncedSearch) params.append('search', debouncedSearch);

        if (activeTab === "Saved Jobs") params.append('tab', 'Saved Jobs');
        else if (activeTab === "Best Match") params.append('tab', 'Best Match');

        return `/api/jobs?${params.toString()}`;
    };

    const { data: jobs, isLoading, error, mutate } = useAPI<Job[]>(getEndpoint(), { autoFetch: true });

    const handleSaveJob = async (e: React.MouseEvent, jobId: number) => {
        e.stopPropagation();
        try {
            await apiRequest(`/api/jobs/${jobId}/save`, { method: 'POST' });
            // Optimistic update or refetch
            mutate(); // Refetch to update list
        } catch (err) {
            console.error("Failed to save job", err);
        }
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
                            placeholder="Search by title, skill, or keyword..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-base focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                    </div>
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
                        <p className="text-sm text-slate-500">
                            {activeTab === "Saved Jobs"
                                ? "You haven't saved any jobs yet."
                                : "Try adjusting your search filters."}
                        </p>
                    </div>
                </div>
            ) : (
                <div className="grid gap-4">
                    {jobs.map((job) => (
                        <div key={job.id} className="relative group">
                            <JobCard
                                title={job.title}
                                companyName={job.client ? `${job.client.firstName} ${job.client.lastName}` : "Anonymous Client"}
                                budget={`$${job.budgetMin}-${job.budgetMax}/hr`}
                                type="Hourly"
                                skills={job.skills || []}
                                postedTime={getTimeAgo(job.createdAt)}
                                description={job.description}
                                onClick={() => window.location.href = `/dashboard/freelancer/jobs/${job.id}`}
                            />
                            {/* Save Button Overlay */}
                            <button
                                onClick={(e) => handleSaveJob(e, job.id)}
                                className={`absolute top-6 right-6 p-2 rounded-full transition-colors z-10 ${job.isSaved
                                    ? "text-primary-600 bg-primary-50 hover:bg-primary-100"
                                    : "text-slate-400 hover:text-primary-600 hover:bg-slate-50"
                                    }`}
                                title={job.isSaved ? "Unsave Job" : "Save Job"}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill={job.isSaved ? "currentColor" : "none"}
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className="h-5 w-5"
                                >
                                    <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
                                </svg>
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
