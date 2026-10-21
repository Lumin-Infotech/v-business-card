import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Eye, EyeOff, Loader2 } from 'lucide-react';
import { FormEventHandler, useState } from 'react';

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
    password_confirmation: string;
    role: 'admin' | 'editor';
    is_active: boolean;
}

interface EditUserProps {
    user: User;
    breadcrumbs?: BreadcrumbItem[];
}

export default function EditUser({ user, breadcrumbs = [] }: EditUserProps) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);

    const { data, setData, put, processing, errors, clearErrors } = useForm<EditUserForm>({
        name: user.name,
        email: user.email,
        password: '',
        password_confirmation: '',
        role: user.role,
        is_active: user.is_active,
    });

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        clearErrors();
        put(`/admin/users/${user.id}`);
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`Edit ${user.name}`} />

            <div className="p-6">
                <div className="mb-6 flex items-center gap-2">
                    <a
                        href="/admin/users"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Users
                    </a>
                </div>

                <div className="max-w-2xl">
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow">
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Edit User</h1>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{user.name}</p>
                        </div>

                        <form onSubmit={submit} className="p-6 space-y-6">
                            {/* Personal Information Section */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                            placeholder="john@example.com"
                                            className="mt-2"
                                        />
                                        <InputError message={errors.email} />
                                    </div>
                                </div>
                            </div>

                            {/* Password Section */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Password</h2>
                                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Leave blank to keep current password</p>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <Label htmlFor="password">New Password</Label>
                                        <div className="relative mt-2">
                                            <Input
                                                id="password"
                                                type={showPassword ? 'text' : 'password'}
                                                value={data.password}
                                                onChange={(e) => setData('password', e.target.value)}
                                                placeholder="Leave blank to keep current"
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowPassword(!showPassword)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                            >
                                                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password} />
                                    </div>

                                    <div>
                                        <Label htmlFor="password_confirmation">Confirm Password</Label>
                                        <div className="relative mt-2">
                                            <Input
                                                id="password_confirmation"
                                                type={showConfirm ? 'text' : 'password'}
                                                value={data.password_confirmation}
                                                onChange={(e) => setData('password_confirmation', e.target.value)}
                                                placeholder="Confirm new password"
                                                className="pr-10"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => setShowConfirm(!showConfirm)}
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                                            >
                                                {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                            </button>
                                        </div>
                                        <InputError message={errors.password_confirmation} />
                                    </div>
                                </div>
                            </div>

                            {/* Account Settings Section */}
                            <div className="space-y-6">
                                <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                    <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Account Settings</h2>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                        <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Admin: Full access | Editor: Limited access</p>
                                        <InputError message={errors.role} />
                                    </div>

                                    <div className="flex items-end pb-2">
                                        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg w-full">
                                            <Checkbox
                                                id="is_active"
                                                checked={data.is_active}
                                                onCheckedChange={(checked) => setData('is_active', checked as boolean)}
                                            />
                                            <Label htmlFor="is_active" className="font-normal cursor-pointer mb-0">
                                                Active user
                                            </Label>
                                        </div>
                                    </div>
                                </div>

                                {errors.is_active && <InputError message={errors.is_active} />}
                            </div>

                            {/* Form Actions */}
                            <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                                <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                    {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                                    Update User
                                </Button>
                                <a
                                    href="/admin/users"
                                    className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                                >
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
