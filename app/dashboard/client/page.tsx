"use client";

import {
    Briefcase,
    DollarSign,
    FileText,
    Plus
} from "lucide-react";
import { Button } from "@/components/ui/Button";
import { StatsCard } from "@/components/dashboard/StatsCard";
import Link from "next/link";

export default function ClientOverviewPage() {
    return (
        <div className="space-y-8">
            {/* Welcome Section */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Good morning, Acme Inc.</h1>
                    <p className="text-slate-500">Here's what's happening with your projects today.</p>
                </div>
                <Link href="/dashboard/client/jobs/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" />
                        Post a New Job
                    </Button>
                </Link>
            </div>

            {/* Stats Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                <StatsCard
                    label="Active Jobs"
                    value="12"
                    trend="+2 this week"
                    trendUp={true}
                    icon={Briefcase}
                    color="blue"
                />
                <StatsCard
                    label="Total Spent"
                    value="$14,250"
                    trend="+15% vs last month"
                    trendUp={true}
                    icon={DollarSign}
                    color="green"
                />
                <StatsCard
                    label="New Proposals"
                    value="48"
                    trend="8 unread"
                    trendUp={true}
                    icon={FileText}
                    color="purple"
                />
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 text-center shadow-sm">
                <div className="mx-auto max-w-md py-8">
                    <h3 className="text-lg font-bold text-slate-900">Complete your company profile</h3>
                    <p className="mt-2 text-slate-500">
                        Adding a verified payment method and company description helps attract top tier freelancers.
                    </p>
                    <Link href="/dashboard/client/settings">
                        <Button variant="outline" className="mt-6">Edit Profile</Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
