"use client";

import { DataTable } from "@/components/ui/DataTable";

export default function MyProposalsPage() {
    const proposals = [
        {
            id: "P-101",
            jobTitle: "Senior React Developer",
            company: "TechFlow Inc.",
            submitted: "Oct 24, 2024",
            amount: "$75.00/hr",
            status: "Active",
        },
        {
            id: "P-102",
            jobTitle: "E-commerce UI Design",
            company: "Shopify Store",
            submitted: "Oct 22, 2024",
            amount: "$1,200 Fixed",
            status: "Viewed",
        },
        {
            id: "P-103",
            jobTitle: "Python Script for Data Scraping",
            company: "DataCorp",
            submitted: "Oct 20, 2024",
            amount: "$300 Fixed",
            status: "Declined",
        },
        {
            id: "P-104",
            jobTitle: "Blog Content Writer",
            company: "MediaHouse",
            submitted: "Oct 18, 2024",
            amount: "$45.00/hr",
            status: "Withdrawn",
        },
    ];

    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">My Proposals</h1>

            {/* Tabs */}
            <div className="border-b border-slate-200">
                <nav className="-mb-px flex gap-6">
                    <button className="border-b-2 border-primary-600 px-1 py-4 text-sm font-medium text-primary-600">
                        Active
                    </button>
                    <button className="border-b-2 border-transparent px-1 py-4 text-sm font-medium text-slate-500 hover:border-slate-300 hover:text-slate-700">
                        Archived
                    </button>
                </nav>
            </div>

            <DataTable
                data={proposals}
                columns={[
                    {
                        header: "Proposal For",
                        accessorKey: "jobTitle",
                        cell: (item) => (
                            <div>
                                <div className="font-semibold text-primary-600 hover:underline cursor-pointer">{item.jobTitle}</div>
                                <div className="text-xs text-slate-500">{item.company}</div>
                            </div>
                        ),
                    },
                    { header: "Submitted", accessorKey: "submitted" },
                    { header: "Amount", accessorKey: "amount" },
                    {
                        header: "Status",
                        accessorKey: "status",
                        cell: (item) => (
                            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${item.status === 'Active' ? 'bg-emerald-100 text-emerald-800' :
                                    item.status === 'Viewed' ? 'bg-blue-100 text-blue-800' :
                                        item.status === 'Declined' ? 'bg-red-100 text-red-800' :
                                            'bg-slate-100 text-slate-500'
                                }`}>
                                {item.status}
                            </span>
                        )
                    },
                ]}
            />
        </div>
    );
}
