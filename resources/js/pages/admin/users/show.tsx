import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit2, Trash2, CheckCircle, XCircle, Mail, Shield, Clock } from 'lucide-react';

import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor';
    is_active: boolean;
    email_verified_at: string | null;
    created_at: string;
    updated_at?: string;
}

interface ShowUserProps {
    user: User;
    breadcrumbs?: BreadcrumbItem[];
}

export default function ShowUser({ user, breadcrumbs = [] }: ShowUserProps) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
            router.delete(`/admin/users/${user.id}`);
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={user.name} />

            <div className="max-w-2xl mx-auto">
                <div className="mb-6 flex items-center gap-2">
                    <a
                        href="/admin/users"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </a>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">{user.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {user.email}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/users/${user.id}/edit`}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                <Edit2 className="w-4 h-4" />
                                Edit
                            </Link>
                            <button
                                onClick={handleDelete}
                                className="inline-flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                            >
                                <Trash2 className="w-4 h-4" />
                                Delete
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Left Column */}
                        <div className="space-y-6">
                            {/* Status */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <CheckCircle className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                                </div>
                                <div className="flex items-center gap-2">
                                    {user.is_active ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span className="text-green-600 dark:text-green-400 font-medium">Active</span>
                                        </>
                                    ) : (
                                        <>
                                            <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                                            <span className="text-red-600 dark:text-red-400 font-medium">Inactive</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            {/* Role */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Shield className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Role</p>
                                </div>
                                <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                                    user.role === 'admin'
                                        ? 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
                                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                                }`}>
                                    {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                                </span>
                            </div>

                            {/* Email */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Mail className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Email</p>
                                </div>
                                <a
                                    href={`mailto:${user.email}`}
                                    className="text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    {user.email}
                                </a>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-6">
                            {/* Email Verified */}
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-2">Email Verification</p>
                                {user.email_verified_at ? (
                                    <div className="flex items-center gap-2">
                                        <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                        <span className="text-sm text-green-600 dark:text-green-400">
                                            Verified on {formatDate(user.email_verified_at)}
                                        </span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2">
                                        <XCircle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                        <span className="text-sm text-yellow-600 dark:text-yellow-400">Not verified</span>
                                    </div>
                                )}
                            </div>

                            {/* Created Date */}
                            <div>
                                <div className="flex items-center gap-2 mb-2">
                                    <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</p>
                                </div>
                                <p className="text-sm">{formatDate(user.created_at)}</p>
                            </div>

                            {/* Updated Date */}
                            {user.updated_at && (
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <Clock className="w-4 h-4 text-gray-600 dark:text-gray-400" />
                                        <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                                    </div>
                                    <p className="text-sm">{formatDate(user.updated_at)}</p>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
