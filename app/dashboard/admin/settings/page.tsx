"use client";

import { Save } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6">
            <h1 className="text-2xl font-bold text-slate-900">Platform Settings</h1>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 p-6">
                <div className="max-w-xl space-y-6">
                    <div>
                        <h2 className="text-lg font-medium text-slate-900 mb-4">General Configuration</h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Platform Name</label>
                                <input
                                    type="text"
                                    defaultValue="FreelanceHub"
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                    disabled
                                />
                                <p className="mt-1 text-xs text-slate-500">Contact developers to change platform name</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-slate-700 mb-1">Platform Fee (%)</label>
                                <input
                                    type="number"
                                    defaultValue="10"
                                    className="w-full rounded-lg border border-slate-200 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                                />
                                <p className="mt-1 text-xs text-slate-500">Percentage taken from each contract</p>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="maintenance" className="rounded border-slate-300 text-primary-600 focus:ring-primary-500" />
                                <label htmlFor="maintenance" className="text-sm text-slate-700">Enable Maintenance Mode</label>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 border-t border-slate-100">
                        <Button>
                            <Save className="mr-2 h-4 w-4" />
                            Save Changes
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
