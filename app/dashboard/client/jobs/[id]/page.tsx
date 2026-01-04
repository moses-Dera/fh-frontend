"use client";

import { useAPI } from "@/lib/api";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, DollarSign, Tag, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/Button"; // Assuming Button component exists
import { PageLoader } from "@/components/ui/PageLoader";

export default function JobDetailPage() {
    // In Next 15/16, params might be asynchronous in server components, 
    // but in "use client", `useParams` hook is the standard way.
    const params = useParams();
    const id = params?.id as string;

    const { data: job, isLoading, error } = useAPI<any>(`/api/jobs/${id}`, { autoFetch: true });

    if (isLoading) return <PageLoader message="Loading job details..." />;
    if (error) return <div className="p-8 text-red-500">Error loading job: {error.message}</div>;
    if (!job) return <div className="p-8 text-slate-500">Job not found</div>;

    return (
        <div className="max-w-4xl mx-auto pb-12">
            <Link
                href="/dashboard/client/jobs"
                className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 mb-6 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to My Jobs
            </Link>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header Section */}
                <div className="p-6 md:p-8 border-b border-slate-100">
                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                        <div>
                            <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-sm text-slate-500">
                                <span className="flex items-center gap-1.5">
                                    <Tag className="h-4 w-4" />
                                    {job.category || 'General'}
                                </span>
                                <span className="flex items-center gap-1.5">
                                    <Clock className="h-4 w-4" />
                                    Posted {new Date(job.createdAt).toLocaleDateString()}
                                </span>
                                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${job.status === 'OPEN' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-800'
                                    }`}>
                                    {job.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-3">
                            {/* <Button variant="outline">Edit Job</Button> */}
                            {/* <Button variant="destructive">Close Job</Button> */}
                        </div>
                    </div>
                </div>

                {/* Content Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">

                    {/* Main Content (Left 2/3) */}
                    <div className="md:col-span-2 p-6 md:p-8 space-y-8">
                        <div>
                            <h2 className="text-lg font-semibold text-slate-900 mb-3">Project Description</h2>
                            <div className="prose prose-slate text-slate-600 leading-relaxed whitespace-pre-wrap">
                                {job.description}
                            </div>
                        </div>

                        {job.skills && job.skills.length > 0 && (
                            <div>
                                <h2 className="text-lg font-semibold text-slate-900 mb-3">Required Skills</h2>
                                <div className="flex flex-wrap gap-2">
                                    {job.skills.map((skill: string) => (
                                        <span key={skill} className="px-3 py-1 bg-slate-100 text-slate-700 text-sm font-medium rounded-full">
                                            {skill}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Sidebar Details (Right 1/3) */}
                    <div className="p-6 md:p-8 space-y-6 bg-slate-50/50">
                        <div>
                            <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">
                                Budget & Timeline
                            </h3>

                            <div className="space-y-4">
                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-primary-600">
                                        <DollarSign className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            ${job.budgetMin} - ${job.budgetMax}
                                        </p>
                                        <p className="text-xs text-slate-500">Hourly Rate</p> {/* Dynamic based on budgetType if saved */}
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <div className="p-2 bg-white rounded-lg border border-slate-200 text-primary-600">
                                        <Calendar className="h-5 w-5" />
                                    </div>
                                    <div>
                                        <p className="text-sm font-medium text-slate-900">
                                            {new Date(job.deadline).toLocaleDateString()}
                                        </p>
                                        <p className="text-xs text-slate-500">Deadline</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Proposals Stats could go here */}
                        <div className="pt-6 border-t border-slate-200">
                            <h3 className="text-sm font-semibold text-slate-900 mb-2">Proposals</h3>
                            <div className="text-3xl font-bold text-slate-900">0</div>
                            <p className="text-sm text-slate-500">Active candidates</p>

                            <Button className="w-full mt-4" variant="outline" onClick={() => window.location.href = `/dashboard/client/proposals?jobId=${id}`}>
                                View Proposals
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
