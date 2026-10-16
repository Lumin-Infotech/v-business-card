import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { FormEventHandler } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface User {
    id: number;
    name: string;
    email: string;
    role: 'admin' | 'editor';
    is_active: boolean;
}

interface EditUserForm {
    name: string;
    email: string;
    password: string;
    role: 'admin' | 'editor';
    is_active: boolean;
}

interface EditUserProps {
    user: User;
    breadcrumbs?: BreadcrumbItem[];
}

export default function EditUser({ user, breadcrumbs = [] }: EditUserProps) {
    const { data, setData, put, processing, errors } = useForm<EditUserForm>({
        name: user.name,
        email: user.email,
        password: '',
        role: user.role,
        is_active: user.is_active,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${user.name}`} />

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
                    <h1 className="text-2xl font-bold mb-6">Edit User: {user.name}</h1>

                    <form onSubmit={submit} className="space-y-6">
                        <div className="grid gap-4">
                            <div>
                                <Label htmlFor="name">Full Name *</Label>
                                <Input
                                    id="name"
                                    type="text"
                                    required
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    placeholder="e.g., John Doe"
                                    className="mt-2"
                                />
                                <InputError message={errors.name} />
                            </div>

                            <div>
                                <Label htmlFor="email">Email Address *</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    placeholder="email@example.com"
                                    className="mt-2"
                                />
                                <InputError message={errors.email} />
                            </div>

                            <div>
                                <Label htmlFor="password">Password (Leave empty to keep current)</Label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    placeholder="Leave blank to keep current password"
                                    className="mt-2"
                                />
                                <InputError message={errors.password} />
                            </div>

                            <div>
                                <Label htmlFor="role">Role *</Label>
                                <Select value={data.role} onValueChange={(value: any) => setData('role', value)}>
                                    <SelectTrigger className="mt-2">
                                        <SelectValue placeholder="Select a role" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="editor">Editor</SelectItem>
                                        <SelectItem value="admin">Admin</SelectItem>
                                    </SelectContent>
                                </Select>
                                <InputError message={errors.role} />
                            </div>

                            <div className="flex items-center gap-3">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                />
                                <Label htmlFor="is_active" className="font-normal cursor-pointer">
                                    Active user
                                </Label>
                                <InputError message={errors.is_active} />
                            </div>
                        </div>

                        <div className="flex items-center gap-2 pt-4">
                            <Button type="submit" disabled={processing}>
                                {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                                Update User
                            </Button>
                            <a
                                href="/admin/users"
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
