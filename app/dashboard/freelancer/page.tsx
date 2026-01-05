"use client";

import { useState, useEffect } from "react";
import {
    DollarSign,
    FileText,
    Eye,
    Search,
    Briefcase,
    Clock,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { JobCard } from "@/components/ui/JobCard";
import { StatsCard } from "@/components/dashboard/StatsCard";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

type Job = {
    id: string;
    title: string;
    description: string;
    budget: number;
    type: string;
    skills: string[];
    createdAt: string;
    client?: { firstName: string; lastName: string; companyName?: string };
};

type UserProfile = {
    firstName: string;
    lastName: string;
    walletBalance: number;
};

type Proposal = {
    id: string;
    status: string;
};

export default function FreelancerOverviewPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user profile
                const profileData = await apiRequest<UserProfile>('/api/users/profile');
                setProfile(profileData);

                // Fetch available jobs
                const jobsData = await apiRequest<Job[]>('/api/jobs');
                setJobs(Array.isArray(jobsData) ? jobsData.slice(0, 4) : []);

                // Fetch user's proposals
                const proposalsData = await apiRequest<Proposal[]>('/api/proposals/me');
                setProposals(Array.isArray(proposalsData) ? proposalsData : []);
            } catch (error) {
                console.error('Failed to fetch dashboard data:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const formatTimeAgo = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffMs = now.getTime() - date.getTime();
        const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
        const diffDays = Math.floor(diffHours / 24);

        if (diffHours < 1) return "Just now";
        if (diffHours < 24) return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        if (diffDays < 7) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        return date.toLocaleDateString();
    };

    const formatBudget = (budget: number | undefined, type: string) => {
        if (!budget && budget !== 0) return 'Negotiable';
        if (type === 'HOURLY') return `$${budget}/hr`;
        return `$${budget.toLocaleString()}`;
    };

    const activeProposals = proposals.filter(p => p.status === 'PENDING' || p.status === 'SUBMITTED');
    const acceptedProposals = proposals.filter(p => p.status === 'ACCEPTED');

    if (loading) {
        return (
            <div className="space-y-8 animate-pulse">
                <div className="h-12 bg-slate-200 rounded-lg w-1/3"></div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {[1, 2, 3, 4].map(i => (
                        <div key={i} className="h-32 bg-slate-200 rounded-xl"></div>
                    ))}
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">
                        Welcome back, {profile?.firstName || 'Freelancer'}! 👋
                    </h1>
                    <p className="text-slate-500">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <Link href="/dashboard/freelancer/jobs">
                    <Button>
                        <Search className="mr-2 h-4 w-4" />
                        Find Work
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    label="Wallet Balance"
                    value={`$${(profile?.walletBalance || 0).toLocaleString()}`}
                    trend="Available funds"
                    trendUp={true}
                    icon={DollarSign}
                    color="green"
                />
                <StatsCard
                    label="Active Proposals"
                    value={activeProposals.length.toString()}
                    trend={`${acceptedProposals.length} accepted`}
                    trendUp={acceptedProposals.length > 0}
                    icon={FileText}
                    color="blue"
                />
                <StatsCard
                    label="Available Jobs"
                    value={jobs.length.toString()}
                    trend="New opportunities"
                    trendUp={jobs.length > 0}
                    icon={Briefcase}
                    color="purple"
                />
                <StatsCard
                    label="Success Rate"
                    value={proposals.length > 0 ? `${Math.round((acceptedProposals.length / proposals.length) * 100)}%` : "N/A"}
                    trend="Based on proposals"
                    trendUp={true}
                    icon={TrendingUp}
                    color="orange"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Link href="/dashboard/freelancer/proposals" className="group">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <FileText className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">My Proposals</p>
                                <p className="text-sm text-slate-500">{proposals.length} total</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/freelancer/contracts" className="group">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <Briefcase className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Active Contracts</p>
                                <p className="text-sm text-slate-500">View your work</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/freelancer/internships" className="group">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <Clock className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Internships</p>
                                <p className="text-sm text-slate-500">Find opportunities</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Latest Jobs */}
            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-bold text-slate-900">Latest Opportunities</h2>
                    <Link href="/dashboard/freelancer/jobs" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        View all jobs →
                    </Link>
                </div>
                {jobs.length > 0 ? (
                    <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
                        {jobs.map((job) => (
                            <JobCard
                                key={job.id}
                                title={job.title}
                                companyName={job.client?.companyName || `${job.client?.firstName || 'Client'} ${job.client?.lastName || ''}`}
                                budget={formatBudget(job.budget, job.type)}
                                type={job.type === 'HOURLY' ? 'Hourly' : 'Fixed-Price'}
                                skills={job.skills || []}
                                postedTime={formatTimeAgo(job.createdAt)}
                                description={job.description || 'No description provided'}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-xl">
                        <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No jobs available right now.</p>
                        <p className="text-sm text-slate-400">Check back later for new opportunities!</p>
                    </div>
                )}
            </div>
        </div>
    );
}
