"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { Wallet, ArrowDownLeft, Download } from "lucide-react";

export default function FreelancerPaymentsPage() {
    const [availableBalance] = useState(3450.00);
    const [pendingClearance] = useState(800.00);

    const [transactions] = useState([
        { id: "t-1", date: "2024-06-15", description: "Withdrawal to Bank Account (**** 1234)", amount: -1500, status: "completed" },
        { id: "t-2", date: "2024-06-12", description: "Payment from TechFlow Inc. (Contract #c-1)", amount: 2400, status: "completed" },
        { id: "t-3", date: "2024-06-10", description: "Payment from ContentKing (Contract #c-4)", amount: 150, status: "pending" },
    ]);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-900">My Earnings</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Available Balance */}
                <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg">
                    <div className="flex items-center gap-3 mb-2 opacity-80">
                        <div className="p-2 bg-white/10 rounded-lg">
                            <Wallet size={20} />
                        </div>
                        <span className="text-sm font-medium">Available for Withdrawal</span>
                    </div>
                    <div className="text-4xl font-bold mb-8">
                        ${availableBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <Button className="bg-white/10 text-slate-900 hover:bg-slate-100 border-none w-full sm:w-auto">
                        <ArrowDownLeft className="mr-2 h-4 w-4" />
                        Withdraw Funds
                    </Button>
                </div>

                {/* Pending Clearance */}
                <div className="bg-white border border-slate-200 text-slate-900 rounded-2xl p-8 shadow-sm">
                    <div className="flex items-center gap-3 mb-2 text-slate-500">
                        <div className="p-2 bg-slate-100 rounded-lg text-slate-600">
                            <ClockIcon size={20} />
                        </div>
                        <span className="text-sm font-medium">Pending Clearance</span>
                    </div>
                    <div className="text-4xl font-bold mb-8 text-slate-700">
                        ${pendingClearance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                    </div>
                    <p className="text-sm text-slate-500">
                        Funds are available for withdrawal after a 5-day security period.
                    </p>
                </div>
            </div>

            {/* Transactions History */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Transaction History</h2>
                </div>

                <DataTable
                    data={transactions}
                    columns={[
                        { header: "Date", accessorKey: "date" },
                        {
                            header: "Description",
                            accessorKey: "description",
                            cell: (item) => <span className="font-medium text-slate-900">{item.description}</span>
                        },
                        {
                            header: "Amount",
                            accessorKey: "amount",
                            cell: (item) => (
                                <span className={`font-semibold ${item.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                                    {item.amount > 0 ? '+' : ''}
                                    ${Math.abs(item.amount).toLocaleString()}
                                </span>
                            )
                        },
                        {
                            header: "Status",
                            accessorKey: "status",
                            cell: (item) => (
                                <span className={`text-xs font-medium px-2 py-1 rounded-full ${item.status === 'completed' ? 'bg-emerald-100 text-emerald-800' : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {item.status}
                                </span>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
}

function ClockIcon({ size }: { size: number }) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <circle cx="12" cy="12" r="10" />
            <polyline points="12 6 12 12 16 14" />
        </svg>
    );
}
