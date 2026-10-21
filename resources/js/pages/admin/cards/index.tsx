import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import { Search, Plus, Eye, Edit2, Trash2, CheckCircle, Circle } from 'lucide-react';
import { useState } from 'react';
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
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginationMeta {
    current_page: number;
    from: number;
    to: number;
    total: number;
    per_page: number;
}

interface Props {
    cards: {
        data: BusinessCard[];
        links: PaginationLink[];
        meta: PaginationMeta;
    };
    filters: {
        search: string;
        status: string;
        theme: string;
    };
}

export default function CardsList({ cards, filters }: Props) {
    const [search, setSearch] = useState(filters.search || '');
    const [status, setStatus] = useState(filters.status || '');
    const [theme, setTheme] = useState(filters.theme || '');

    const handleSearch = () => {
        router.get('/admin/cards', { search, status, theme }, { preserveScroll: true });
    };

    const handleDelete = (cardId: number) => {
        if (confirm('Are you sure you want to delete this card?')) {
            router.delete(`/admin/cards/${cardId}`);
        }
    };

    const themes = ['corporate', 'gradient', 'minimal', 'dark', 'bold'];

    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', url: '/admin' },
        { title: 'Business Cards', url: '/admin/cards' },
    ];

    return (
        <>
            <Head title="Business Cards" />
            <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-8 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold">Business Cards</h1>
                        <p className="text-gray-600 dark:text-gray-400">Manage your virtual business cards</p>
                    </div>
                    <Link
                        href="/admin/cards/create"
                        className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        <Plus className="w-5 h-5" />
                        New Card
                    </Link>
                </div>

                {/* Filters */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6 space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">Search</label>
                            <div className="relative">
                                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Name or slug"
                                    className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Status</label>
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
                            >
                                <option value="">All</option>
                                <option value="draft">Draft</option>
                                <option value="published">Published</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium mb-2">Theme</label>
                            <select
                                value={theme}
                                onChange={(e) => setTheme(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg dark:bg-slate-700"
                            >
                                <option value="">All Themes</option>
                                {themes.map((t) => (
                                    <option key={t} value={t}>
                                        {t.charAt(0).toUpperCase() + t.slice(1)}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={handleSearch}
                                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                            >
                                Filter
                            </button>
                        </div>
                    </div>
                </div>

                {/* Table */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
                            <tr>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Name</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Slug</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Theme</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
                                <th className="px-6 py-4 text-left text-sm font-semibold">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-slate-700">
                            {cards.data.map((card) => (
                                <tr key={card.id} className="hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                                    <td className="px-6 py-4 font-medium">{card.name}</td>
                                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400">/{card.slug}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-3 py-1 rounded-full text-sm bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                                            {card.theme}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            {card.status === 'published' ? (
                                                <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                                            ) : (
                                                <Circle className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />
                                            )}
                                            <span className={card.status === 'published' ? 'text-green-600 dark:text-green-400' : 'text-yellow-600 dark:text-yellow-400'}>
                                                {card.status.charAt(0).toUpperCase() + card.status.slice(1)}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <a
                                                href={`/${card.slug}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="p-2 text-green-600 dark:text-green-400 hover:bg-green-100 dark:hover:bg-green-900 rounded"
                                            >
                                                <Eye className="w-4 h-4" />
                                            </a>
                                            <Link
                                                href={`/admin/cards/${card.slug}/edit`}
                                                className="p-2 text-blue-600 dark:text-blue-400 hover:bg-blue-100 dark:hover:bg-blue-900 rounded"
                                            >
                                                <Edit2 className="w-4 h-4" />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(card.id)}
                                                className="p-2 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900 rounded"
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {cards.data.length === 0 && (
                        <div className="px-6 py-12 text-center">
                            <p className="text-gray-600 dark:text-gray-400">No cards found</p>
                        </div>
                    )}
                </div>
            </div>
            </AppLayout>
        </>
    );
}
