"use client";

import { X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface ConfirmationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title: string;
    description: string;
    confirmLabel?: string;
    cancelLabel?: string;
    confirmVariant?: "primary" | "outline" | "ghost" | "danger"; // Assuming Button supports these or similar
    isLoading?: boolean;
}

export function ConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmLabel = "Confirm",
    cancelLabel = "Cancel",
    confirmVariant = "danger",
    isLoading = false,
}: ConfirmationModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
                onClick={isLoading ? undefined : onClose}
            />

            {/* Modal */}
            <div className="relative w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all animate-in zoom-in-95 duration-200">
                <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3 text-amber-600">
                        <div className="rounded-full bg-amber-100 p-2">
                            <AlertTriangle size={24} />
                        </div>
                        <h3 className="text-lg font-bold text-slate-900">{title}</h3>
                    </div>
                    <button
                        onClick={onClose}
                        className="text-slate-400 hover:text-slate-600 transition-colors"
                        disabled={isLoading}
                    >
                        <X size={20} />
                    </button>
                </div>

                <p className="mb-8 text-sm text-slate-500 leading-relaxed">
                    {description}
                </p>

                <div className="flex justify-end gap-3">
                    <Button
                        variant="ghost"
                        onClick={onClose}
                        disabled={isLoading}
                    >
                        {cancelLabel}
                    </Button>
                    <Button
                        // Assuming 'danger' might act as 'primary' styled red if not explicitly supported, 
                        // but sticking to standard props or mapping them. 
                        // If Button doesn't support 'danger', we'll use a specific className styling or primary.
                        // I'll assume Button component is flexible or I can wrap it.
                        // Let's safe-guard the variant.
                        variant={(confirmVariant === 'danger' ? 'primary' : confirmVariant) as any}
                        className={confirmVariant === 'danger' ? "bg-red-600 hover:bg-red-700 text-white border-transparent" : ""}
                        onClick={onConfirm}
                        isLoading={isLoading}
                    >
                        {confirmLabel}
                    </Button>
                </div>
            </div>
        </div>
    );
}
