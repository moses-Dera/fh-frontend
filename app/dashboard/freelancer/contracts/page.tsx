"use client";

import { DataFrame } from "@/components/ui/DataFrame"; // Assuming DataTable was meant, but keeping imports consistent or correcting if needed. Wait, previous code used DataTable. Let's stick to consistent DataTable usage from other pages if possible or use the one available.
import { DataTable } from "@/components/ui/DataTable";
import { useAPI } from "@/lib/api";
import { BadgeCheck, Clock, AlertCircle } from "lucide-react";

interface Contract {
    id: number;
    amount: number;
    status: string;
    startDate: string;
    job: {
        title: string;
    };
    client: {
        firstName: string;
        lastName: string;
    };
}

export default function FreelancerContractsPage() {
    const { data: contracts, isLoading, error } = useAPI<Contract[]>('/api/contracts', { autoFetch: true });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'ACTIVE':
                return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"><Clock size={12} /> Active</span>;
            case 'COMPLETED':
                return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800"><BadgeCheck size={12} /> Completed</span>;
            case 'PENDING':
                return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"><AlertCircle size={12} /> Pending</span>;
            default:
                return <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">My Contracts</h1>
            </div>

            {isLoading ? (
                <div className="text-center py-12 text-slate-500">Loading contracts...</div>
            ) : error ? (
                <div className="text-center py-12 text-red-500">Error loading contracts</div>
            ) : !contracts || contracts.length === 0 ? (
                <div className="text-center py-12 text-slate-500">No contracts found.</div>
            ) : (
                <DataTable
                    data={contracts}
                    columns={[
                        {
                            header: "Job & Client",
                            accessorKey: "job",
                            cell: (item: Contract) => (
                                <div>
                                    <div className="font-semibold text-slate-900">{item.job.title}</div>
                                    <div className="text-xs text-slate-500">{item.client.firstName} {item.client.lastName}</div>
                                </div>
                            ),
                        },
                        {
                            header: "Earnings",
                            accessorKey: "amount",
                            cell: (item: Contract) => <span className="font-medium">${item.amount.toLocaleString()}</span>
                        },
                        {
                            header: "Start Date",
                            accessorKey: "startDate",
                            cell: (item: Contract) => <span className="text-slate-500">{new Date(item.startDate).toLocaleDateString()}</span>
                        },
                        {
                            header: "Status",
                            accessorKey: "status",
                            cell: (item: Contract) => getStatusBadge(item.status)
                        },
                        {
                            header: "Actions",
                            accessorKey: "id",
                            cell: (item: Contract) => (
                                <button
                                    onClick={() => window.location.href = `/dashboard/freelancer/contracts/${item.id}`}
                                    className="text-sm font-medium text-primary-600 hover:text-primary-700"
                                >
                                    View Details
                                </button>
                            )
                        }
                    ]}
                />
            )}
        </div>
    );
}
