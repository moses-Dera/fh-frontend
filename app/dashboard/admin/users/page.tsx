"use client";

import { useEffect, useState } from "react";
import { apiRequest } from "@/lib/api";
import { Trash2, User, Search, Loader2 } from "lucide-react";
import { useToast } from "@/components/ui/Toast";
import { ConfirmationModal } from "@/components/ui/ConfirmationModal";

interface User {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    role: string;
    companyName: string | null;
    createdAt: string;
}

export default function ManageUsersPage() {
    const { addToast } = useToast();
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const data = await apiRequest<User[]>('/api/users');
                console.log("Fetched users:", data);
                if (Array.isArray(data)) {
                    setUsers(data);
                } else {
                    console.error("API did not return an array", data);
                    setUsers([]);
                    addToast("Failed to load users data", "error");
                }
            } catch (error) {
                console.error("Failed to fetch users:", error);
                addToast("Failed to fetch users", "error");
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, [addToast]);

    const confirmDelete = (userId: string) => {
        setUserToDelete(userId);
    };

    const handleDelete = async () => {
        if (!userToDelete) return;

        setIsDeleting(userToDelete);
        try {
            await apiRequest(`/api/users/${userToDelete}`, { method: 'DELETE' });
            setUsers(users.filter(u => u.id !== userToDelete));
            addToast("User deleted successfully", "success");
        } catch (error) {
            console.error("Failed to delete user:", error);
            addToast("Failed to delete user", "error");
        } finally {
            setIsDeleting(null);
            setUserToDelete(null);
        }
    };

    const filteredUsers = users.filter(user =>
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.firstName.toLowerCase().includes(search.toLowerCase()) ||
        user.lastName.toLowerCase().includes(search.toLowerCase())
    );

    if (loading) {
        return <div className="flex justify-center items-center h-64"><Loader2 className="animate-spin text-primary-600" /></div>;
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-slate-900">Manage Users</h1>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-4 w-4" />
                    <input
                        type="text"
                        placeholder="Search users..."
                        className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-slate-100 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">User</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Role</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 uppercase tracking-wider">Joined</th>
                                <th className="px-6 py-3 text-right text-xs font-medium text-slate-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-200">
                            {filteredUsers.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                                        No users found
                                    </td>
                                </tr>
                            ) : (
                                filteredUsers.map((user) => (
                                    <tr key={user.id} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="flex items-center">
                                                <div className="h-10 w-10 flex-shrink-0 bg-primary-100 rounded-full flex items-center justify-center text-primary-600">
                                                    <User className="h-5 w-5" />
                                                </div>
                                                <div className="ml-4">
                                                    <div className="text-sm font-medium text-slate-900">
                                                        {user.firstName} {user.lastName}
                                                    </div>
                                                    <div className="text-sm text-slate-500">{user.email}</div>
                                                    {user.companyName && <div className="text-xs text-slate-400">{user.companyName}</div>}
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'ADMIN' ? 'bg-red-100 text-red-800' :
                                                user.role === 'CLIENT' ? 'bg-blue-100 text-blue-800' :
                                                    'bg-green-100 text-green-800'
                                                }`}>
                                                {user.role}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500">
                                            {new Date(user.createdAt).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => confirmDelete(user.id)}
                                                disabled={isDeleting === user.id}
                                                className="text-red-600 hover:text-red-900 p-2 rounded-full hover:bg-red-50 transition-colors disabled:opacity-50"
                                                title="Delete User"
                                            >
                                                {isDeleting === user.id ? <Loader2 className="h-4 w-4 animate-spin" /> : <Trash2 className="h-4 w-4" />}
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            <ConfirmationModal
                isOpen={!!userToDelete}
                onClose={() => setUserToDelete(null)}
                onConfirm={handleDelete}
                title="Delete User"
                description="Are you sure you want to delete this user? This action cannot be undone and will remove all their data."
                confirmLabel="Delete User"
                confirmVariant="danger"
                isLoading={!!isDeleting}
            />
        </div>
    );
}
