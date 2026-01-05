"use client";

import { useState, useEffect } from "react";
import {
    Briefcase,
    DollarSign,
    FileText,
    Plus,
    Users,
    Clock,
    CheckCircle,
    TrendingUp
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import Link from "next/link";
import { apiRequest } from "@/lib/api";

type Job = {
    id: string;
    title: string;
    status: string;
    budget: number;
    type: string;
    createdAt: string;
    _count?: { proposals: number };
};

type UserProfile = {
    firstName: string;
    lastName: string;
    companyName?: string;
    walletBalance: number;
};

type Proposal = {
    id: string;
    status: string;
    job: { title: string };
    user: { firstName: string; lastName: string };
    createdAt: string;
};

type Contract = {
    id: string;
    status: string;
};

export default function ClientOverviewPage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [jobs, setJobs] = useState<Job[]>([]);
    const [proposals, setProposals] = useState<Proposal[]>([]);
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch user profile
                const profileData = await apiRequest<UserProfile>('/api/users/profile');
                setProfile(profileData);

                // Fetch my posted jobs
                const jobsData = await apiRequest<Job[]>('/api/jobs/my-jobs');
                setJobs(Array.isArray(jobsData) ? jobsData : []);

                // Fetch all proposals for my jobs
                const proposalsData = await apiRequest<Proposal[]>('/api/proposals');
                setProposals(Array.isArray(proposalsData) ? proposalsData : []);

                // Fetch contracts
                const contractsData = await apiRequest<Contract[]>('/api/contracts');
                setContracts(Array.isArray(contractsData) ? contractsData : []);
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
        if (diffHours < 24) return `${diffHours}h ago`;
        if (diffDays < 7) return `${diffDays}d ago`;
        return date.toLocaleDateString();
    };

    const activeJobs = jobs.filter(j => j.status === 'OPEN' || j.status === 'ACTIVE');
    const pendingProposals = proposals.filter(p => p.status === 'PENDING' || p.status === 'SUBMITTED');
    const activeContracts = contracts.filter(c => c.status === 'ACTIVE' || c.status === 'IN_PROGRESS');

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
                        Welcome back, {profile?.companyName || profile?.firstName || 'Client'}! 👋
                    </h1>
                    <p className="text-slate-500">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}
                    </p>
                </div>
                <Link href="/dashboard/client/jobs/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Post a New Job
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <StatsCard
                    label="Active Jobs"
                    value={activeJobs.length.toString()}
                    trend={`${jobs.length} total posted`}
                    trendUp={activeJobs.length > 0}
                    icon={Briefcase}
                    color="blue"
                />
                <StatsCard
                    label="Wallet Balance"
                    value={`$${(profile?.walletBalance || 0).toLocaleString()}`}
                    trend="Available funds"
                    trendUp={true}
                    icon={DollarSign}
                    color="green"
                />
                <StatsCard
                    label="New Proposals"
                    value={pendingProposals.length.toString()}
                    trend={`${proposals.length} total received`}
                    trendUp={pendingProposals.length > 0}
                    icon={FileText}
                    color="purple"
                />
                <StatsCard
                    label="Active Contracts"
                    value={activeContracts.length.toString()}
                    trend={`${contracts.length} total`}
                    trendUp={activeContracts.length > 0}
                    icon={Users}
                    color="orange"
                />
            </div>

            {/* Quick Actions */}
            <div className="grid gap-4 sm:grid-cols-3">
                <Link href="/dashboard/client/jobs" className="group">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-blue-100 rounded-lg group-hover:bg-blue-200 transition-colors">
                                <Briefcase className="h-5 w-5 text-blue-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">My Jobs</p>
                                <p className="text-sm text-slate-500">{jobs.length} posted</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/client/proposals" className="group">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-purple-100 rounded-lg group-hover:bg-purple-200 transition-colors">
                                <FileText className="h-5 w-5 text-purple-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Review Proposals</p>
                                <p className="text-sm text-slate-500">{pendingProposals.length} pending</p>
                            </div>
                        </div>
                    </div>
                </Link>
                <Link href="/dashboard/client/contracts" className="group">
                    <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-green-100 rounded-lg group-hover:bg-green-200 transition-colors">
                                <CheckCircle className="h-5 w-5 text-green-600" />
                            </div>
                            <div>
                                <p className="font-medium text-slate-900">Contracts</p>
                                <p className="text-sm text-slate-500">{activeContracts.length} active</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>

            {/* Recent Proposals */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Recent Proposals</h2>
                    <Link href="/dashboard/client/proposals" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        View all →
                    </Link>
                </div>
                {proposals.length > 0 ? (
                    <div className="bg-white rounded-xl border border-slate-200 divide-y divide-slate-100">
                        {proposals.slice(0, 5).map((proposal) => (
                            <div key={proposal.id} className="p-4 flex items-center justify-between hover:bg-slate-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-primary-400 to-primary-600 flex items-center justify-center text-white font-medium">
                                        {proposal.user?.firstName?.charAt(0) || 'F'}
                                    </div>
                                    <div>
                                        <p className="font-medium text-slate-900">
                                            {proposal.user?.firstName || 'Freelancer'} {proposal.user?.lastName || ''}
                                        </p>
                                        <p className="text-sm text-slate-500">
                                            Applied for: {proposal.job?.title || 'Job'}
                                        </p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${proposal.status === 'ACCEPTED' ? 'bg-green-100 text-green-700' :
                                            proposal.status === 'REJECTED' ? 'bg-red-100 text-red-700' :
                                                'bg-amber-100 text-amber-700'
                                        }`}>
                                        {proposal.status}
                                    </span>
                                    <span className="text-sm text-slate-400">
                                        {formatTimeAgo(proposal.createdAt)}
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-xl">
                        <FileText className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No proposals yet.</p>
                        <p className="text-sm text-slate-400">Post a job to start receiving proposals!</p>
                    </div>
                )}
            </div>

            {/* Recent Jobs */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Your Recent Jobs</h2>
                    <Link href="/dashboard/client/jobs" className="text-sm font-medium text-primary-600 hover:text-primary-700">
                        View all →
                    </Link>
                </div>
                {jobs.length > 0 ? (
                    <div className="grid gap-4 md:grid-cols-2">
                        {jobs.slice(0, 4).map((job) => (
                            <Link key={job.id} href={`/dashboard/client/jobs/${job.id}`}>
                                <div className="p-4 bg-white rounded-xl border border-slate-200 hover:border-primary-300 hover:shadow-md transition-all">
                                    <div className="flex items-start justify-between mb-2">
                                        <h3 className="font-medium text-slate-900 line-clamp-1">{job.title}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${job.status === 'OPEN' ? 'bg-green-100 text-green-700' :
                                                job.status === 'CLOSED' ? 'bg-slate-100 text-slate-600' :
                                                    'bg-blue-100 text-blue-700'
                                            }`}>
                                            {job.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-4 text-sm text-slate-500">
                                        <span className="flex items-center gap-1">
                                            <DollarSign className="h-4 w-4" />
                                            ${job.budget?.toLocaleString() || 'Negotiable'}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {formatTimeAgo(job.createdAt)}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <FileText className="h-4 w-4" />
                                            {job._count?.proposals || 0} proposals
                                        </span>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-12 bg-slate-50 rounded-xl">
                        <Briefcase className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                        <p className="text-slate-500">No jobs posted yet.</p>
                        <Link href="/dashboard/client/jobs/new">
                            <Button variant="outline" className="mt-4">Post Your First Job</Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
