"use client";

import { use, useState, useEffect } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/Button";
import { ProposalModal } from "@/components/proposals/ProposalModal";
import {
    ArrowLeft,
    MapPin,
    Clock,
    DollarSign,
    ShieldCheck,
    Star,
    Share2,
    Flag
} from "lucide-react";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

interface JobDetails {
    id: string;
    title: string;
    company: string;
    budget: string;
    posted: string;
    location: string;
    description: string;
    skills: string[];
    client: {
        name: string;
        rating: number;
        jobsPosted: number;
        totalSpent: string;
        verified: boolean;
    };
}

export default function JobDetailsPage({ params }: { params: Promise<{ id: string }> }) {
    const resolvedParams = use(params);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [job, setJob] = useState<JobDetails | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchJob = async () => {
            try {
                // Fetch job details from API
                const data = await apiRequest<JobDetails>(`/api/jobs/${resolvedParams.id}`);
                setJob(data);
            } catch (err: unknown) {
                console.error("Failed to fetch job:", err);
                // Fallback mock data
                setJob({
                    id: resolvedParams.id,
                    title: "Senior UX/UI Designer for Fintech App",
                    company: "Stripe",
                    budget: "$60-80/hr",
                    posted: "2 hours ago",
                    location: "Remote",
                    description: "We are looking for an experienced product designer to help us redesign our core mobile application. You will work directly with our product team to create intuitive and beautiful user experiences.\n\n## Responsibilities\n- Lead design projects from concept to delivery\n- Create high-fidelity prototypes in Figma\n- Conduct user research and usability testing\n- Collaborate with engineers to ensure high-quality implementation\n\n## Requirements\n- 5+ years of experience in Product Design\n- Strong portfolio showcasing mobile app work\n- Proficiency in Figma and prototyping tools\n- Experience with Fintech is a plus",
                    skills: ["Figma", "Prototyping", "Mobile Design", "User Research", "iOS"],
                    client: {
                        name: "Stripe",
                        rating: 4.9,
                        jobsPosted: 124,
                        totalSpent: "$500k+",
                        verified: true
                    }
                });
            } finally {
                setIsLoading(false);
            }
        };

        fetchJob();
    }, [resolvedParams.id]);

    if (isLoading) {
        return (
            <div className="min-h-screen bg-slate-50 flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-2 border-primary-600 border-t-transparent"></div>
            </div>
        );
    }

    if (!job) {
        return (
            <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold text-slate-900 mb-4">Job not found</h1>
                <Link href="/jobs">
                    <Button variant="outline">Back to Jobs</Button>
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-50">
            <Navbar />

            <main className="container mx-auto px-4 py-8 max-w-5xl">
                <Link
                    href="/jobs"
                    className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6"
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Jobs
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
                            <h1 className="text-2xl font-bold text-slate-900 mb-4">{job.title}</h1>

                            <div className="flex flex-wrap gap-4 text-sm text-slate-500 mb-8 pb-8 border-b border-slate-100">
                                <span className="flex items-center gap-1.5 bg-slate-100 px-3 py-1 rounded-full text-slate-700">
                                    <DollarSign size={16} />
                                    {job.budget}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock size={16} />
                                    {job.posted}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <MapPin size={16} />
                                    {job.location}
                                </span>
                            </div>

                            <div className="prose prose-slate max-w-none">
                                <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                                    {job.description}
                                </p>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-100">
                                <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">
                                    Skills Required
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill) => (
                                        <span
                                            key={skill}
                                            className="inline-flex items-center rounded-lg bg-slate-100 px-3 py-1.5 text-sm font-medium text-slate-700"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Actions Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <Button
                                fullWidth
                                size="lg"
                                className="mb-3"
                                onClick={() => {
                                    const isLoggedIn = document.cookie.includes('auth_token');
                                    if (isLoggedIn) {
                                        setIsModalOpen(true);
                                    } else {
                                        window.location.href = `/login?redirect=/jobs/${job.id}`;
                                    }
                                }}
                            >
                                Apply Now
                            </Button>
                            <Button variant="outline" fullWidth>
                                Save Job
                            </Button>
                            <div className="mt-6 flex items-center justify-center gap-6 text-sm font-medium text-primary-600">
                                <button className="flex items-center gap-2 hover:underline">
                                    <Share2 size={16} />
                                    Share
                                </button>
                                <button className="flex items-center gap-2 hover:underline text-slate-500 hover:text-red-600">
                                    <Flag size={16} />
                                    Report
                                </button>
                            </div>
                        </div>

                        {/* Client Info Card */}
                        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
                            <h3 className="text-lg font-bold text-slate-900 mb-4">About the Client</h3>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2 text-slate-700 font-medium">
                                        <ShieldCheck className="text-emerald-500" size={20} />
                                        Payment Verified
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-900 font-bold">
                                        <Star className="fill-yellow-400 text-yellow-400" size={16} />
                                        {job.client.rating}
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4 py-4 border-y border-slate-100">
                                    <div>
                                        <div className="text-xl font-bold text-slate-900">{job.client.jobsPosted}</div>
                                        <div className="text-xs text-slate-500">Jobs Posted</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-slate-900">{job.client.totalSpent}</div>
                                        <div className="text-xs text-slate-500">Total Spent</div>
                                    </div>
                                </div>

                                <p className="text-xs text-slate-400">
                                    Member since Sep 2018
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </main>

            <ProposalModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                jobTitle={job.title}
                budget={job.budget}
                jobId={job.id}
            />
        </div>
    );
}
