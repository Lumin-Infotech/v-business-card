import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface BusinessCard {
    id: number;
    name: string;
    full_name: string;
    slug: string;
    theme: string;
    status: 'draft' | 'published';
}

interface EditCardForm {
    name: string;
    full_name: string;
    slug: string;
    theme: string;
    status: 'draft' | 'published';
}

interface EditCardProps {
    card: BusinessCard;
    breadcrumbs?: BreadcrumbItem[];
}

export default function EditCard({ card, breadcrumbs = [] }: EditCardProps) {
    const { data, setData, put, processing, errors } = useForm<EditCardForm>({
        name: card.name,
        full_name: card.full_name,
        slug: card.slug,
        theme: card.theme,
        status: card.status,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/cards/${card.id}`);
    };

    const themes = ['corporate', 'gradient', 'minimal', 'dark', 'bold'];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${card.name}`} />

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
                    <h1 className="text-2xl font-bold mb-6">Edit Business Card: {card.name}</h1>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="name">Card Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., My Business Card"
                                    className="mt-2"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="full_name">Full Name *</Label>
                                <Input
                                    id="full_name"
                                    type="text"
                                    required
                                    value={data.full_name}
                                    onChange={(e) => setData('full_name', e.target.value)}
                                    placeholder="e.g., John Doe"
                                    className="mt-2"
                                />
                                <InputError message={errors.full_name} />
                            </div>

                            <div>
                                <Label htmlFor="slug">URL Slug *</Label>
                                <div className="mt-2 flex items-center gap-2">
                                    <span className="text-sm text-gray-600 dark:text-gray-400">/</span>
                                    <Input
                                        id="slug"
                                        type="text"
                                        required
                                        value={data.slug}
                                        onChange={(e) => setData('slug', e.target.value)}
                                        placeholder="e.g., john-doe"
                                        className="flex-1"
                                    />
                                </div>
                                <InputError message={errors.slug} />
                            </div>

                            <div>
                                <Label htmlFor="theme">Theme *</Label>
                                <Select value={data.theme} onValueChange={(value) => setData('theme', value)}>
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select a theme" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {themes.map((theme) => (
                                            <SelectItem key={theme} value={theme}>
                                                {theme.charAt(0).toUpperCase() + theme.slice(1)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.theme} />
                            </div>

                            <div>
                                <Label htmlFor="status">Status *</Label>
                                <Select value={data.status} onValueChange={(value: any) => setData('status', value)}>
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="draft">Draft</SelectItem>
                                        <SelectItem value="published">Published</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.status} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                                Update Card
                            </Button>
                            <a
                                href="/admin/cards"
                                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                            >
                                Cancel
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </AppLayout>
    );
}
