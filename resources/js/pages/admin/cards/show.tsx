import { Head, Link, router } from '@inertiajs/react';
import { ArrowLeft, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface BusinessCard {
    id: number;
    name: string;
    full_name: string;
    slug: string;
    theme: string;
    status: 'draft' | 'published';
    is_active: boolean;
    created_at: string;
    updated_at?: string;
}

interface ShowCardProps {
    card: BusinessCard;
    breadcrumbs?: BreadcrumbItem[];
}

export default function ShowCard({ card, breadcrumbs = [] }: ShowCardProps) {
    const handleDelete = () => {
        if (confirm('Are you sure you want to delete this card? This action cannot be undone.')) {
            router.delete(`/admin/cards/${card.id}`);
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
            <Head title={card.name} />

            <div className="max-w-2xl mx-auto">
                <div className="mb-6 flex items-center gap-2">
                    <a
                        href="/admin/cards"
                        className="inline-flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-200"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </a>
                </div>

                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                    <div className="flex items-start justify-between gap-4 mb-6">
                        <div>
                            <h1 className="text-3xl font-bold">{card.name}</h1>
                            <p className="text-gray-600 dark:text-gray-400 mt-1">
                                {card.full_name}
                            </p>
                        </div>
                        <div className="flex items-center gap-2">
                            <Link
                                href={`/admin/cards/${card.slug}/edit`}
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
                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Status</p>
                                <div className="mt-2 flex items-center gap-2">
                                    {card.status === 'published' ? (
                                        <>
                                            <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            <span className="text-green-600 dark:text-green-400 font-medium">Published</span>
                                        </>
                                    ) : (
                                        <>
                                            <Circle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                            <span className="text-yellow-600 dark:text-yellow-400 font-medium">Draft</span>
                                        </>
                                    )}
                                </div>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Theme</p>
                                <p className="mt-2 text-lg font-medium">
                                    <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                        {card.theme.charAt(0).toUpperCase() + card.theme.slice(1)}
                                    </span>
                                </p>
                            </div>

                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">URL Slug</p>
                                <a
                                    href={`/${card.slug}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="mt-2 text-lg font-medium text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    /{card.slug}
                                </a>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Created</p>
                                <p className="mt-2 text-lg">{formatDate(card.created_at)}</p>
                            </div>

                            {card.updated_at && (
                                <div>
                                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Last Updated</p>
                                    <p className="mt-2 text-lg">{formatDate(card.updated_at)}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700">
                        <a
                            href={`/${card.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                        >
                            View Public Card
                        </a>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
