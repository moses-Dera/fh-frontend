"use client";

import { PageHeader, StatusBadge } from "@/components/ui/Shared";
import { DataTable } from "@/components/ui/DataTable";
import { PageLoader } from "@/components/ui/PageLoader";
import { useToast } from "@/components/ui/Toast";
import { useAPI, apiRequest } from "@/lib/api";
import { Plus, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

interface Job {
    id: string | number;
    title: string;
    budgetMin: string;
    budgetMax: string;
    status: string;
    deadline: string;
    _count?: {
        proposal: number;
    };
    createdAt: string;
}

export default function MyJobsPage() {
    const { data: jobs, isLoading, error, execute } = useAPI<Job[]>('/api/jobs', { autoFetch: true });
    const { addToast } = useToast();
    const [deleteId, setDeleteId] = useState<string | number | null>(null);
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

    // Fallback mock data if API fails or is empty for demo
    const displayJobs = jobs || [
        {
            id: "1",
            title: "Senior UX/UI Designer for Fintech App",
            budgetMin: "60",
            budgetMax: "80",
            status: "Active",
            deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
            _count: { proposal: 12 },
            createdAt: new Date().toISOString(),
        },
        // ...
    ];

    const confirmDelete = async () => {
        if (!deleteId) return;

        try {
            await apiRequest(`/api/jobs/${deleteId}`, { method: 'DELETE' });
            addToast("Job deleted successfully", "success");
            execute(); // Refresh list
        } catch (err) {
            console.error(err);
            addToast("Failed to delete job", "error");
        } finally {
            setIsDeleteModalOpen(false);
            setDeleteId(null);
        }
    };

    const handleDeleteClick = (job: Job) => {
        setDeleteId(job.id);
        setIsDeleteModalOpen(true);
    };

    return (
        <div className="space-y-6">
            <ConfirmationModal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                onConfirm={confirmDelete}
                title="Delete Job Post"
                description="Are you sure you want to delete this job post? This action cannot be undone and all associated proposals will be permanently removed."
                confirmLabel="Delete Job"
                confirmVariant="danger"
            />

            <PageHeader
                title="My Jobs"
                action={{
                    label: "Post a Job",
                    href: "/dashboard/client/jobs/new",
                    icon: Plus
                }}
            />

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex gap-6">
                    <button className="border-b-2 border-primary-600 px-1 py-4 text-sm font-medium text-primary-600">
                        All Jobs
                    </button>
                    <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700">
                        Active
                    </button>
                </nav>
            </div>

            {isLoading ? (
                <PageLoader message="Loading jobs..." />
            ) : (
                <DataTable
                    data={displayJobs}
                    onDelete={handleDeleteClick}
                    columns={[
                        {
                            header: "Job Title",
                            accessorKey: "title",
                            cell: (item: Job) => (
                                <div>
                                    <div className="font-semibold text-slate-900">{item.title}</div>
                                    <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-slate-500">
                                        <div className="flex items-center gap-1.5">
                                            <span className="font-medium text-slate-900">
                                                ${item.budgetMin} - ${item.budgetMax}
                                            </span>
                                            <span>Budget</span>
                                        </div>
                                        <div
                                            className="flex items-center gap-2.5 cursor-pointer hover:text-primary-600"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                window.location.href = `/dashboard/client/jobs/${item.id}/proposals`;
                                            }}
                                        >
                                            <span className="font-medium text-slate-900">
                                                {item._count?.proposal || 0}
                                            </span>
                                            <span>Proposals</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock className="h-4 w-4" />
                                            <span>Due {new Date(item.deadline).toLocaleDateString()}</span>
                                        </div>
                                        <StatusBadge status={item.status} />
                                    </div>
                                </div>
                            ),
                        },
                        {
                            header: "Posted",
                            accessorKey: "createdAt",
                            cell: (item: Job) => new Date(item.createdAt).toLocaleDateString()
                        },
                    ]}
                    onRowClick={(item) => window.location.href = `/dashboard/client/jobs/${item.id}`}
                />
            )}
        </div>
    );
}
