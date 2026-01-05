"use client";

import React from "react";
import { MapPin, Clock, DollarSign } from "lucide-react";
import { Button } from "./Button";

interface JobCardProps {
    title: string;
    companyName: string;
    budget: string;
    type: "Hourly" | "Fixed-Price";
    skills: string[];
    postedTime: string;
    description: string;
    onClick?: () => void;
}

export const JobCard = ({
    title,
    companyName,
    budget,
    type,
    skills,
    postedTime,
    description,
    onClick,
}: JobCardProps) => {
    return (
        <div
            onClick={onClick}
            className="group flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 transition-all hover:border-primary-200 hover:shadow-lg hover:shadow-primary-900/5 cursor-pointer"
        >
            <div className="flex items-start justify-between pr-10">
                <div>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                        {title}
                    </h3>
                    <p className="text-sm font-medium text-slate-500 mt-1">{companyName}</p>
                </div>
                <span className="inline-flex items-center rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700 shrink-0">
                    {type}
                </span>
            </div>

            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm text-slate-500">
                <div className="flex items-center gap-1.5">
                    <DollarSign className="h-4 w-4 text-slate-400" />
                    <span className="font-semibold text-slate-900">{budget}</span>
                </div>
                <div className="flex items-center gap-1.5">
                    <Clock className="h-4 w-4 text-slate-400" />
                    <span>{postedTime}</span>
                </div>
            </div>

            <p className="line-clamp-2 text-sm leading-relaxed text-slate-600">
                {description}
            </p>

            <div className="flex flex-wrap gap-2 mt-auto">
                {skills.map((skill) => (
                    <span
                        key={skill}
                        className="inline-flex items-center rounded-md bg-slate-100 px-2.5 py-1 text-xs font-medium text-slate-600"
                    >
                        {skill}
                    </span>
                ))}
            </div>
        </div>
    );
};
