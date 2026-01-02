"use client";

import { DataTable } from "@/components/ui/DataTable";
import { useAPI } from "@/lib/api";
import { StatusBadge } from "@/components/ui/Shared";

interface Proposal {
    id: string;
    jobId: number;
    coverLetter: string;
    expectedSalary?: number;
    status: string;
    createdAt: string;
    job: {
        id: number;
        title: string;
        status: string;
        budgetMin: string;
        budgetMax: string;
    };
}

export default function MyProposalsPage() {
    const { data: proposals, isLoading, error } = useAPI<Proposal[]>('/api/proposals/me', { autoFetch: true });

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">My Proposals</h1>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex gap-6">
                    <button className="border-b-2 border-primary-600 px-1 py-4 text-sm font-medium text-primary-600">
                        All Proposals
                    </button>
                </nav>
            </div>

            {isLoading ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-slate-500">Loading proposals...</div>
                </div>
            ) : error ? (
                <div className="rounded-lg border border-red-200 bg-red-50 p-4 text-red-700">
                    <p className="font-medium">Error loading proposals</p>
                    <p className="text-sm">{error.message}</p>
                </div>
            ) : !proposals || proposals.length === 0 ? (
                <div className="flex items-center justify-center py-12">
                    <div className="text-center">
                        <p className="text-lg font-medium text-slate-900">No proposals yet</p>
                        <p className="text-sm text-slate-500">Start applying to jobs to see your proposals here</p>
                    </div>
                </div>
            ) : (
                <DataTable
                    data={proposals}
                    columns={[
                        {
                            header: "Proposal For",
                            accessorKey: "job",
                            cell: (item: Proposal) => (
                                <div>
                                    <div className="font-semibold text-primary-600 hover:underline cursor-pointer">
                                        {item.job.title}
                                    </div>
                                    <div className="text-xs text-slate-500">
                                        Budget: ${item.job.budgetMin} - ${item.job.budgetMax}/hr
                                    </div>
                                </div>
                            ),
                        },
                        {
                            header: "Submitted",
                            accessorKey: "createdAt",
                            cell: (item: Proposal) => new Date(item.createdAt).toLocaleDateString()
                        },
                        {
                            header: "Your Rate",
                            accessorKey: "expectedSalary",
                            cell: (item: Proposal) => item.expectedSalary ? `$${item.expectedSalary}/hr` : 'Not specified'
                        },
                        {
                            header: "Status",
                            accessorKey: "status",
                            cell: (item: Proposal) => (
                                <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === 'ACCEPTED' ? 'bg-emerald-100 text-emerald-800' :
                                        item.status === 'PENDING' ? 'bg-blue-100 text-blue-800' :
                                            item.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                                item.status === 'SHORTLISTED' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-slate-100 text-slate-500'
                                    }`}>
                                    {item.status}
                                </span>
                            )
                        },
                    ]}
                    onRowClick={(item) => window.location.href = `/dashboard/freelancer/jobs/${item.jobId}`}
                />
            )}
        </div>
    );
}

