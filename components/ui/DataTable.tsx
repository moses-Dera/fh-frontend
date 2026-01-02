"use client";

import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/Button";
import React from "react";

interface Column<T> {
    header: string;
    accessorKey: keyof T;
    cell?: (item: T) => React.ReactNode;
}

interface Action<T> {
    label: string;
    onClick: (item: T) => void;
    className?: string;
    icon?: React.ReactNode;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    onRowClick?: (item: T) => void;
    onDelete?: (item: T) => void; // Kept for backward compatibility
    actions?: Action<T>[]; // New: custom actions
    disableActionColumn?: boolean;
}

export function DataTable<T extends { id: string | number }>({
    data,
    columns,
    onRowClick,
    onDelete,
    actions,
    disableActionColumn = false,
}: DataTableProps<T>) {
    const [activeActionRowId, setActiveActionRowId] = React.useState<string | null>(null);
    const ignoreNextClickRef = React.useRef(false);

    // Default actions if none provided (backward compatibility)
    const defaultActions: Action<T>[] = [
        {
            label: "Edit",
            onClick: (item) => {
                window.location.href = `/dashboard/client/jobs/${item.id}/edit`;
            },
            className: "text-slate-700 hover:bg-slate-100"
        },
        ...(onDelete ? [{
            label: "Delete",
            onClick: onDelete,
            className: "text-red-600 hover:bg-red-50"
        }] : [])
    ];

    const actionButtons = actions || defaultActions;

    // Close menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ignoreNextClickRef.current) {
                ignoreNextClickRef.current = false;
                return;
            }
            console.log("Document Clicked (Closing Menu)");
            setActiveActionRowId(null);
        };

        // Use setTimeout to ensure this listener is added AFTER the current click event completes
        const timeoutId = setTimeout(() => {
            document.addEventListener("click", handleClickOutside);
        }, 0);

        return () => {
            clearTimeout(timeoutId);
            document.removeEventListener("click", handleClickOutside);
        };
    }, [activeActionRowId]);

    console.log("DataTable Render. Active/Open ID:", activeActionRowId);

    return (
        <div className="flex flex-col rounded-2xl border border-slate-200 bg-white shadow-sm overflow-visible">
            <div className="overflow-visible">
                <table className="min-w-full divide-y divide-slate-200">
                    <thead>
                        <tr>
                            {columns.map((column) => (
                                <th
                                    key={String(column.accessorKey)}
                                    className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider"
                                >
                                    {column.header}
                                </th>
                            ))}
                            {!disableActionColumn && (
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            )}
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-slate-200">
                        {data.map((item) => (
                            <tr
                                key={String(item.id)}
                                onClick={onRowClick ? (e) => {
                                    console.log("Row clicked:", item.id);
                                    onRowClick(item);
                                } : undefined}
                                className={`${onRowClick ? "cursor-pointer hover:bg-slate-50" : ""} relative`}
                            >
                                {columns.map((column) => (
                                    <td
                                        key={String(column.accessorKey)}
                                        className="px-6 py-4 whitespace-nowrap text-sm text-slate-900"
                                    >
                                        {column.cell ? column.cell(item) : String(item[column.accessorKey])}
                                    </td>
                                ))}
                                {/* Action column */}
                                {!disableActionColumn && (
                                    <td className="px-6 py-4 text-right">
                                        <div className="relative inline-block text-left">
                                            <button
                                                type="button"
                                                className="text-slate-400 hover:text-slate-600 p-2 rounded-full hover:bg-slate-100 transition-colors"
                                                onClick={(e) => {
                                                    e.stopPropagation();
                                                    e.nativeEvent.stopImmediatePropagation();
                                                    console.log("Action button clicked for ID:", item.id);
                                                    console.log("Current Active ID:", activeActionRowId);
                                                    ignoreNextClickRef.current = true;
                                                    setActiveActionRowId(String(activeActionRowId) === String(item.id) ? null : String(item.id));
                                                }}
                                            >
                                                <MoreHorizontal size={20} />
                                            </button>

                                            {/* Click-toggled dropdown */}
                                            {String(activeActionRowId) === String(item.id) && (
                                                <div
                                                    className="absolute right-0 mt-2 w-32 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50"
                                                    style={{ display: 'block' }} // Force display check
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        console.log("Dropdown container clicked");
                                                    }}
                                                >
                                                    <div className="py-1">
                                                        {actionButtons.map((action, index) => (
                                                            <button
                                                                key={index}
                                                                className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 ${action.className || 'text-slate-700 hover:bg-slate-100'}`}
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    console.log(`${action.label} clicked for:`, item.id);
                                                                    setActiveActionRowId(null);
                                                                    action.onClick(item);
                                                                }}
                                                            >
                                                                {action.icon}
                                                                {action.label}
                                                            </button>
                                                        ))}
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                )}
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Pagination Footer */}
            <div className="flex items-center justify-between border-t border-slate-200 px-6 py-4">
                <p className="text-sm text-slate-500">
                    Showing <span className="font-semibold text-slate-900">1-5</span> of{" "}
                    <span className="font-semibold text-slate-900">{data.length}</span> results
                </p>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm" disabled>
                        <ChevronLeft size={16} />
                    </Button>
                    <Button variant="outline" size="sm">
                        <ChevronRight size={16} />
                    </Button>
                </div>
            </div>
        </div>
    );
};
