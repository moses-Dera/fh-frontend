"use client";

import { Navbar } from "@/components/layout/Navbar";
import { SearchBar } from "@/components/ui/Cards";
import { useAPI } from "@/lib/api";
import { MapPin, DollarSign, Filter, Clock } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";

interface Job {
    id: string;
    title: string;
    company: string;
    budget: string;
    posted: string; // Changed from postedTime
    location: string; // Added
    description: string;
    tags: string[]; // Changed from skills
}

export default function JobsPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const { data: jobs, isLoading, error } = useAPI<Job[]>(`/api/jobs${searchQuery ? `?q=${encodeURIComponent(searchQuery)}` : ''}`, { autoFetch: true });

    const handleSearch = (query: string) => {
        setSearchQuery(query);
    };

    // Fallback mock
    const displayJobs = jobs || [
        {
            id: "1",
            title: "Senior UX/UI Designer for Fintech App",
            company: "TechFlow",
            budget: "$60-80/hr",
            posted: "2 hours ago",
            location: "Remote",
            description: "We are looking for an experienced product designer to help us redesign our core mobile application...",
            tags: ["Figma", "Mobile", "Fintech"]
        },
        {
            id: "2",
            title: "Full Stack Developer (React/Node)",
            company: "StartUp Inc",
            budget: "$4000 Fixed",
            posted: "1 day ago",
            location: "Remote",
            description: "Need a developer to build a MVP dashboard...",
            tags: ["React", "Node.js", "PostgreSQL"]
        }
    ];

    return (
        <div className="min-h-screen bg-slate-50 flex flex-col">
            <Navbar />

            <main className="flex-grow container mx-auto px-4 py-8 max-w-5xl">
                <div className="mb-8 text-center space-y-4">
                    <h1 className="text-3xl font-bold text-slate-900">Find Your Next Opportunity</h1>
                    <p className="text-slate-500 max-w-2xl mx-auto">
                        Browse thousands of jobs from top clients and start working today.
                    </p>
                </div>

                <div className="mb-8 flex flex-col gap-4 sm:flex-row">
                    <div className="flex-grow">
                        <SearchBar onSearch={handleSearch} placeholder="Search for skills, roles, or companies..." />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                    {/* Filters Sidebar */}
                    <div className="hidden lg:block space-y-6">
                        <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="flex items-center gap-2 font-bold text-slate-900 mb-4">
                                <Filter size={18} /> Filters
                            </h3>

                            <div className="space-y-4">
                                <div>
                                    <label className="text-sm font-medium text-slate-700 mb-1 block">Job Type</label>
                                    <div className="space-y-2">
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input type="checkbox" className="rounded border-slate-300" /> Fixed Price
                                        </label>
                                        <label className="flex items-center gap-2 text-sm text-slate-600">
                                            <input type="checkbox" className="rounded border-slate-300" /> Hourly
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Job List */}
                    <div className="lg:col-span-3 space-y-4">
                        {isLoading ? (
                            <div>Loading jobs...</div>
                        ) : (
                            <>
                                {displayJobs.map((job) => (
                                    <Link key={job.id} href={`/jobs/${job.id}`}>
                                        <div className="group rounded-xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md cursor-pointer">
                                            <div className="flex justify-between items-start mb-2">
                                                <div>
                                                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                                                        {job.title}
                                                    </h3>
                                                    <div className="text-sm text-slate-500 font-medium">
                                                        {job.company}
                                                    </div>
                                                </div>
                                                <div className="hidden sm:block">
                                                    <span className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                                                        {job.posted}
                                                    </span>
                                                </div>
                                            </div>

                                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500">
                                                <span className="flex items-center gap-1">
                                                    <DollarSign size={16} className="text-slate-400" />
                                                    {job.budget}
                                                </span>
                                                <span className="flex items-center gap-1">
                                                    <MapPin size={16} className="text-slate-400" />
                                                    {job.location}
                                                </span>
                                            </div>

                                            <p className="mt-4 text-sm text-slate-600 line-clamp-2">
                                                {job.description}
                                            </p>

                                            <div className="mt-4 flex flex-wrap gap-2">
                                                {job.tags?.map(tag => (
                                                    <span key={tag} className="rounded bg-slate-100 px-2 py-1 text-xs font-medium text-slate-600">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </>
                        )}
                    </div>
                </div>
            </main>
        </div>
    );
}
