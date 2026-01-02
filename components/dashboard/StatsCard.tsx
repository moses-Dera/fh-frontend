"use client";

import { createElement } from "react";
import { LucideIcon, ArrowUpRight, ArrowDownRight } from "lucide-react";

interface StatsCardProps {
    label: string;
    value: string;
    trend?: string;
    trendUp?: boolean;
    icon: LucideIcon;
    color?: "blue" | "green" | "purple" | "orange";
}

export const StatsCard = ({
    label,
    value,
    trend,
    trendUp,
    icon,
    color = "blue",
}: StatsCardProps) => {
    const colorStyles = {
        blue: "bg-blue-50 text-blue-600",
        green: "bg-emerald-50 text-emerald-600",
        purple: "bg-purple-50 text-purple-600",
        orange: "bg-orange-50 text-orange-600",
    };

    return (
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
                <div className={`rounded-xl p-3 ${colorStyles[color]}`}>
                    {createElement(icon, { size: 24 })}
                </div>
                {trend && (
                    <div
                        className={`flex items-center gap-1 text-sm font-medium ${trendUp ? "text-emerald-600" : "text-red-500"
                            }`}
                    >
                        {trend}
                        {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                    </div>
                )}
            </div>
            <div className="mt-4">
                <h3 className="text-3xl font-bold text-slate-900">{value}</h3>
                <p className="text-sm font-medium text-slate-500">{label}</p>
            </div>
        </div>
    );
};
