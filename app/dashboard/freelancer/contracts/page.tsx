"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { apiRequest } from "@/lib/api";
import { BadgeCheck, Clock, AlertCircle } from "lucide-react";

interface Contract {
    id: string;
    jobTitle: string;
    clientName: string;
    amount: number;
    status: 'active' | 'completed' | 'disputed' | 'pending_approval';
    startDate: string;
}

export default function FreelancerContractsPage() {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                // Mock data used until API is confirmed live
                setContracts([
                    {
                        id: "c-1",
                        jobTitle: "Senior React Developer",
                        clientName: "TechFlow Inc.",
                        amount: 2400,
                        status: "active",
                        startDate: "2024-05-15"
                    },
                    {
                        id: "c-4",
                        jobTitle: "Blog Writing 101",
                        clientName: "ContentKing",
                        amount: 150,
                        status: "completed",
                        startDate: "2024-04-20"
                    }
                ]);
            } catch (error) {
                console.error("Failed to fetch contracts", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContracts();
    }, []);

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'active':
                return <span className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"><Clock size={12} /> Active</span>;
            case 'completed':
                return <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800"><BadgeCheck size={12} /> Completed</span>;
            case 'pending_approval':
                return <span className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"><AlertCircle size={12} /> Pending Approval</span>;
            default:
                return <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-800">{status}</span>;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold text-slate-900">My Contracts</h1>
            </div>

            <DataTable
                data={contracts}
                columns={[
                    {
                        header: "Job & Client",
                        accessorKey: "jobTitle",
                        cell: (item) => (
                            <div>
                                <div className="font-semibold text-slate-900">{item.jobTitle}</div>
                                <div className="text-xs text-slate-500">{item.clientName}</div>
                            </div>
                        ),
                    },
                    {
                        header: "Earnings",
                        accessorKey: "amount",
                        cell: (item) => <span className="font-medium">${item.amount.toLocaleString()}</span>
                    },
                    {
                        header: "Start Date",
                        accessorKey: "startDate",
                        cell: (item) => <span className="text-slate-500">{new Date(item.startDate).toLocaleDateString()}</span>
                    },
                    {
                        header: "Status",
                        accessorKey: "status",
                        cell: (item) => getStatusBadge(item.status)
                    },
                    {
                        header: "Actions",
                        accessorKey: "id", // Using ID for actions column
                        cell: (item) => (
                            <button className="text-sm font-medium text-primary-600 hover:text-primary-700">
                                View / Submit Work
                            </button>
                        )
                    }
                ]}
            />
        </div>
    );
}
