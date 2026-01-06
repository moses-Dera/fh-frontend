import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/Button";

// --- Page Header ---
interface PageHeaderProps {
    title: string;
    description?: string;
    backLink?: string;
    backText?: string;
    action?: {
        label: string;
        href?: string;
        onClick?: () => void;
        icon?: React.ElementType; // Lucide icon
    };
}

export function PageHeader({ title, description, backLink, backText = "Back", action }: PageHeaderProps) {
    return (
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-8">
            <div>
                {backLink && (
                    <Link
                        href={backLink}
                        className="text-sm font-medium text-slate-500 hover:text-slate-900 flex items-center mb-2 transition-colors"
                    >
                        <ArrowLeft className="mr-2 h-4 w-4" />
                        {backText}
                    </Link>
                )}
                <h1 className="text-2xl font-bold text-slate-900">{title}</h1>
                {description && <p className="mt-1 text-slate-500">{description}</p>}
            </div>
            {action && (
                <div>
                    {action.href ? (
                        <Link href={action.href} className="inline-flex items-center justify-center font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500/20 rounded-xl bg-primary-600 text-white hover:bg-primary-700 shadow-sm hover:shadow-md px-5 py-2.5 text-sm">
                            {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                            {action.label}
                        </Link>
                    ) : (
                        <Button onClick={action.onClick}>
                            {action.icon && <action.icon className="mr-2 h-4 w-4" />}
                            {action.label}
                        </Button>
                    )}
                </div>
            )}
        </div>
    );
}

// --- Status Badge ---
interface StatusBadgeProps {
    status: string;
    className?: string; // allow overrides
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
    const getStyles = (s: string) => {
        const lower = s.toLowerCase();
        if (['active', 'open', 'approved', 'completed', 'verified'].includes(lower)) return 'bg-emerald-100 text-emerald-800';
        if (['pending', 'draft', 'review'].includes(lower)) return 'bg-yellow-100 text-yellow-800';
        if (['closed', 'rejected', 'archived', 'cancelled'].includes(lower)) return 'bg-slate-100 text-slate-500';
        if (['disputed', 'failed', 'error'].includes(lower)) return 'bg-red-100 text-red-800';
        return 'bg-blue-100 text-blue-800'; // default
    };

    return (
        <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStyles(status)} ${className}`}>
            {status}
        </span>
    );
}

// --- Action Button ---
// Wrapper around Button for semantic actions like "Edit", "Delete"
interface ActionButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    actionType?: 'primary' | 'secondary' | 'danger';
    icon?: React.ElementType;
    label: string;
}

export function ActionButton({ actionType = 'secondary', icon: Icon, label, className = "", ...props }: ActionButtonProps) {
    const variants = {
        primary: "text-primary-600 hover:text-primary-700 hover:bg-primary-50",
        secondary: "text-slate-600 hover:text-slate-900 hover:bg-slate-50",
        danger: "text-red-600 hover:text-red-700 hover:bg-red-50"
    };

    return (
        <button
            className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${variants[actionType]} ${className}`}
            {...props}
        >
            {Icon && <Icon size={16} />}
            {label}
        </button>
    );
}
