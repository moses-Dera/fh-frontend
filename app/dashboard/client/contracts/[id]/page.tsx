"use client";

import { useAPI } from "@/lib/api";
import { useParams } from "next/navigation";
import { PageHeader, StatusBadge } from "@/components/ui/Shared";
import { ArrowLeft, Calendar, DollarSign, CheckCircle, Clock } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { PageLoader } from "@/components/ui/PageLoader";

interface ContractDetails {
    id: number;
    amount: number;
    status: string;
    startDate: string;
    endDate: string;
    job: {
        id: number;
        title: string;
        description: string;
    };
    freelancer: {
        id: string;
        firstName: string;
        lastName: string;
        email: string;
    };
    milestones: any[];
    payments: any[];
}

export default function ContractDetailsPage() {
    const params = useParams();
    const id = params?.id as string;
    const { data: contract, isLoading, error } = useAPI<ContractDetails>(`/api/contracts/${id}`, { autoFetch: true });

    if (isLoading) return <PageLoader message="Loading contract..." />;
    if (error) return <div className="p-8 text-red-500">Error: {error.message}</div>;
    if (!contract) return <div className="p-8">Contract not found</div>;

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-12">
            <Link
                href="/dashboard/client/contracts"
                className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-900 transition-colors"
            >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Contracts
            </Link>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                {/* Header */}
                <div className="p-6 md:p-8 border-b border-slate-100 bg-slate-50/50">
                    <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                        <div>
                            <div className="flex items-center gap-3 mb-2">
                                <h1 className="text-2xl font-bold text-slate-900">Contract #{contract.id}</h1>
                                <StatusBadge status={contract.status} />
                            </div>
                            <p className="text-slate-500">
                                for <span className="font-semibold text-slate-900">{contract.job.title}</span> with <span className="font-semibold text-slate-900">{contract.freelancer.firstName} {contract.freelancer.lastName}</span>
                            </p>
                        </div>
                        <div className="flex gap-3">
                            <Button variant="outline">Message Freelancer</Button>
                            <Button className="bg-red-600 hover:bg-red-700 text-white">End Contract</Button>
                        </div>
                    </div>
                </div>

                {/* Key Details Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100 border-b border-slate-100">
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                            <DollarSign className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider font-semibold">Total Budget</span>
                        </div>
                        <div className="text-xl font-bold text-slate-900">${contract.amount.toLocaleString()}</div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                            <Calendar className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider font-semibold">Start Date</span>
                        </div>
                        <div className="text-xl font-bold text-slate-900">{new Date(contract.startDate).toLocaleDateString()}</div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center gap-2 text-slate-500 mb-1">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs uppercase tracking-wider font-semibold">Deadline</span>
                        </div>
                        <div className="text-xl font-bold text-slate-900">{new Date(contract.endDate).toLocaleDateString()}</div>
                    </div>
                </div>

                {/* Milestones / Description */}
                <div className="p-6 md:p-8 space-y-8">
                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Milestones</h3>
                        {contract.milestones && contract.milestones.length > 0 ? (
                            <div className="space-y-4">
                                {contract.milestones.map((m: any) => (
                                    <div key={m.id} className="flex items-center justify-between p-4 rounded-xl border border-slate-100 hover:border-slate-200 transition-colors">
                                        <div>
                                            <div className="font-medium text-slate-900">{m.title}</div>
                                            <div className="text-sm text-slate-500">Due: {new Date(m.dueDate).toLocaleDateString()}</div>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className="font-bold text-slate-900">${m.amount}</span>
                                            <StatusBadge status={m.status} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-8 text-slate-400 bg-slate-50 rounded-xl border border-dashed border-slate-200">
                                No milestones defined yet.
                            </div>
                        )}
                    </div>

                    <div>
                        <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wide mb-4">Payments</h3>
                        {contract.payments && contract.payments.length > 0 ? (
                            <div>Payment history here...</div>
                        ) : (
                            <div className="text-sm text-slate-500">No payments made yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
