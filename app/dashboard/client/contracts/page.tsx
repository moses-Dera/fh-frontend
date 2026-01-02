"use client";

import { useEffect, useState } from "react";
import { DataTable } from "@/components/ui/DataTable";
import { apiRequest } from "@/lib/api";
import { PageHeader, StatusBadge } from "@/components/ui/Shared";

interface Contract {
    id: number;
    job: { title: string };
    freelancer: { firstName: string; lastName: string };
    amount: number;
    status: string;
    startDate: string;
}

export default function ClientContractsPage() {
    const [contracts, setContracts] = useState<Contract[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchContracts = async () => {
            try {
                const data = await apiRequest<Contract[]>('/api/contracts');
                setContracts(data);
            } catch (error) {
                console.error("Failed to fetch contracts", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchContracts();
    }, []);

    return (
        <div className="space-y-6">
            <PageHeader title="Contracts" />

            <DataTable
                disableActionColumn={true}
                data={contracts}
                columns={[
                    {
                        header: "Job & Freelancer",
                        accessorKey: "job", // Use job object accessor
                        cell: (item) => (
                            <div>
                                <div className="font-semibold text-slate-900">{item.job?.title}</div>
                                <div className="text-xs text-slate-500">{item.freelancer?.firstName} {item.freelancer?.lastName}</div>
                            </div>
                        ),
                    },
                    {
                        header: "Amount",
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
                        cell: (item) => <StatusBadge status={item.status} />
                    },
                    {
                        header: "Actions",
                        accessorKey: "id", // Using ID for actions column
                        cell: (item) => (
                            <button
                                onClick={() => window.location.href = `/dashboard/client/contracts/${item.id}`}
                                className="text-sm font-medium text-primary-600 hover:text-primary-700"
                            >
                                View Details
                            </button>
                        )
                    }
                ]}
            />
        </div>
    );
}
