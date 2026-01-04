"use client";

import { Building2, MapPin, ExternalLink, Calendar, DollarSign, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface Internship {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string; // Remote, On-site, Hybrid
    stipend?: string;
    duration?: string;
    postedAt?: string;
    platform: string; // LinkedIn, Indeed, etc.
    applyLink: string;
    logoUrl?: string; // Optional company logo
    tags: string[];
}

interface InternshipCardProps {
    internship: Internship;
}

export function InternshipCard({ internship }: InternshipCardProps) {
    return (
        <div className="group relative flex flex-col justify-between rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition-all hover:border-primary-200 hover:shadow-md">
            <div>
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 dark:border-slate-800">
                            {internship.logoUrl ? (
                                <img src={internship.logoUrl} alt={internship.company} className="h-8 w-8 object-contain" />
                            ) : (
                                <Building2 className="h-6 w-6 text-slate-400" />
                            )}
                        </div>
                        <div>
                            <h3 className="font-bold text-slate-900 line-clamp-1 group-hover:text-primary-600 transition-colors">
                                {internship.title}
                            </h3>
                            <p className="text-sm font-medium text-slate-500">{internship.company}</p>
                        </div>
                    </div>
                    {internship.postedAt && (
                        <span className="text-xs font-medium text-slate-400 whitespace-nowrap">
                            {internship.postedAt}
                        </span>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap gap-3 text-sm text-slate-500">
                    <div className="flex items-center gap-1.5">
                        <MapPin className="h-4 w-4 text-slate-400" />
                        {internship.location}
                    </div>
                    {internship.stipend && (
                        <div className="flex items-center gap-1.5">
                            <DollarSign className="h-4 w-4 text-emerald-500" />
                            <span className="text-emerald-700 font-medium">{internship.stipend}</span>
                        </div>
                    )}
                    {internship.duration && (
                        <div className="flex items-center gap-1.5">
                            <Calendar className="h-4 w-4 text-slate-400" />
                            {internship.duration}
                        </div>
                    )}
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                    {internship.tags.map((tag, i) => (
                        <span key={i} className="inline-flex items-center rounded-full bg-slate-100 px-2.5 py-0.5 text-xs font-medium text-slate-600">
                            {tag}
                        </span>
                    ))}
                </div>
            </div>

            <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
                    <Briefcase className="h-3.5 w-3.5" />
                    Source: {internship.platform}
                </div>
                <Button
                    size="sm"
                    className="gap-2"
                    onClick={() => window.open(internship.applyLink, '_blank')}
                >
                    Apply Now <ExternalLink className="h-3.5 w-3.5" />
                </Button>
            </div>
        </div>
    );
}
