"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { DataTable } from "@/components/ui/DataTable";
import { CreditCard, Plus, Download } from "lucide-react";

export default function ClientPaymentsPage() {
    const [balance] = useState(1250.00);
    const [transactions] = useState([
        { id: "t-1", date: "2024-06-12", description: "Deposit via Credit Card", amount: 2000, type: "credit" },
        { id: "t-2", date: "2024-06-10", description: "Payment to Alex Chen (Contract #c-1)", amount: -500, type: "debit" },
        { id: "t-3", date: "2024-06-01", description: "Deposit via PayPal", amount: 1000, type: "credit" },
        { id: "t-4", date: "2024-05-28", description: "Payment to Sarah Jones (Contract #c-2)", amount: -250, type: "debit" },
    ]);

    return (
        <div className="space-y-8">
            <h1 className="text-2xl font-bold text-slate-900">Financials & Payments</h1>

            {/* Wallet Card */}
            <div className="bg-slate-900 text-white rounded-2xl p-8 shadow-lg max-w-lg">
                <div className="flex items-center gap-3 mb-2 opacity-80">
                    <div className="p-2 bg-white/10 rounded-lg">
                        <CreditCard size={20} />
                    </div>
                    <span className="text-sm font-medium">Available Balance</span>
                </div>
                <div className="text-4xl font-bold mb-8">
                    ${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                </div>
                <div className="flex gap-4">
                    <Button variant="white" onClick={() => alert("Add Funds Feature: Coming soon!")}>
                        <Plus className="mr-2 h-4 w-4" />
                        Add Funds
                    </Button>
                    <Button
                        className="border-2 border-slate-700 text-slate-700 hover:bg-slate-700 hover:text-white transition-colors bg-white"
                        onClick={() => alert("Withdraw Feature: Coming soon!")}
                    >
                        Withdraw
                    </Button>
                </div>
            </div>

            {/* Transactions History */}
            <div>
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-bold text-slate-900">Transaction History</h2>
                    <Button variant="ghost" size="sm">
                        <Download className="mr-2 h-4 w-4" />
                        Download PDF
                    </Button>
                </div>

                <DataTable
                    data={transactions}
                    disableActionColumn={true}
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
                                <span className={`font-semibold ${item.type === 'credit' ? 'text-emerald-600' : 'text-slate-900'}`}>
                                    {item.type === 'credit' ? '+' : ''}
                                    ${Math.abs(item.amount).toLocaleString()}
                                </span>
                            )
                        }
                    ]}
                />
            </div>
        </div>
    );
}
