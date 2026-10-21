import { Head, useForm } from '@inertiajs/react';
import { ArrowLeft, Loader2, Upload, X } from 'lucide-react';
import { FormEventHandler, useRef, useState } from 'react';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { CardPreviewEditor } from '@/components/card-preview-editor';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface CreateCardForm {
    // Personal Information
    name: string;
    full_name: string;
    job_title: string;
    department: string;
    short_bio: string;
    description: string;
    profile_photo: File | null;
    cover_image: File | null;

    // Company Information
    company_name: string;
    website: string;

    // Contact Information
    email: string;
    phone: string;
    alternate_phone: string;
    whatsapp_number: string;

    // Address
    address: string;
    city: string;
    state: string;
    country: string;
    postal_code: string;

    // Social Media
    linkedin_url: string;
    facebook_url: string;
    instagram_url: string;
    x_url: string;
    youtube_url: string;
    github_url: string;

    // Design & Theme
    theme: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    background_color: string;
    font_family: string;

    // Publishing
    slug: string;
    status: 'draft' | 'published';
    is_active: boolean;
}

interface CreateCardProps {
    breadcrumbs?: BreadcrumbItem[];
}

export default function CreateCard({ breadcrumbs = [] }: CreateCardProps) {
    const { data, setData, post, processing, errors } = useForm<CreateCardForm>({
        name: '',
        full_name: '',
        job_title: '',
        department: '',
        short_bio: '',
        description: '',
        profile_photo: null,
        cover_image: null,
        company_name: '',
        website: '',
        email: '',
        phone: '',
        alternate_phone: '',
        whatsapp_number: '',
        address: '',
        city: '',
        state: '',
        country: '',
        postal_code: '',
        linkedin_url: '',
        facebook_url: '',
        instagram_url: '',
        x_url: '',
        youtube_url: '',
        github_url: '',
        theme: 'corporate',
        primary_color: '#4F46E5',
        secondary_color: '#7C3AED',
        accent_color: '#06B6D4',
        background_color: '',
        font_family: 'sans',
        slug: '',
        status: 'draft',
        is_active: true,
    });

    const [profilePreview, setProfilePreview] = useState<string | null>(null);
    const [coverPreview, setCoverPreview] = useState<string | null>(null);
    const profileInputRef = useRef<HTMLInputElement>(null);
    const coverInputRef = useRef<HTMLInputElement>(null);

    const themes = ['corporate', 'gradient', 'minimal', 'dark', 'bold'];
    const fontFamilies = ['sans', 'serif', 'mono'];

    // Auto-generate slug from full_name
    const generateSlug = (name: string): string => {
        return name
            .toLowerCase()
            .trim()
            .replace(/[^\w\s-]/g, '')
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-');
    };

    // Update slug whenever full_name changes
    const handleFullNameChange = (value: string) => {
        setData('full_name', value);
        const newSlug = generateSlug(value);
        setData('slug', newSlug);
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'profile' | 'cover') => {
        const file = e.target.files?.[0];
        if (file) {
            if (type === 'profile') {
                setData('profile_photo', file);
                const reader = new FileReader();
                reader.onload = (event) => setProfilePreview(event.target?.result as string);
                reader.readAsDataURL(file);
            } else {
                setData('cover_image', file);
                const reader = new FileReader();
                reader.onload = (event) => setCoverPreview(event.target?.result as string);
                reader.readAsDataURL(file);
            }
        }
    };

    const removeImage = (type: 'profile' | 'cover') => {
        if (type === 'profile') {
            setData('profile_photo', null);
            setProfilePreview(null);
            if (profileInputRef.current) profileInputRef.current.value = '';
        } else {
            setData('cover_image', null);
            setCoverPreview(null);
            if (coverInputRef.current) coverInputRef.current.value = '';
        }
    };

    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        // Only use forceFormData if we're actually uploading files
        const hasFiles = data.profile_photo !== null || data.cover_image !== null;
        post('/admin/cards', {
            ...(hasFiles && { forceFormData: true }),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Business Card" />

            <div className="p-6">
                <div className="mb-6 flex items-center gap-2">
                    <a
                        href="/admin/cards"
                        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4" />
                        Back to Cards
                    </a>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Form Section - Takes 2 columns on desktop */}
                    <div className="lg:col-span-2">
                        <div className="bg-card border border-border rounded-lg p-8">
                            <h1 className="text-3xl font-bold mb-8 text-foreground">Create New Business Card</h1>

                            <form onSubmit={submit} className="space-y-8">
                        {/* Personal Information Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Personal Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="name">Card Name *</Label>
                                    <Input
                                        id="name"
                                        type="text"
                                        required
                                        autoFocus
                                        value={data.name}
                                        onChange={(e) => setData('name', e.target.value)}
                                        placeholder="e.g., My Business Card"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                <div>
                                    <Label htmlFor="full_name">Full Name * (auto-generates slug)</Label>
                                    <Input
                                        id="full_name"
                                        type="text"
                                        required
                                        value={data.full_name}
                                        onChange={(e) => handleFullNameChange(e.target.value)}
                                        placeholder="e.g., John Doe"
                                        className="mt-2"
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        URL slug will be automatically generated from this name
                                    </p>
                                    <InputError message={errors.full_name} />
                                </div>

                                <div>
                                    <Label htmlFor="job_title">Job Title</Label>
                                    <Input
                                        id="job_title"
                                        type="text"
                                        value={data.job_title}
                                        onChange={(e) => setData('job_title', e.target.value)}
                                        placeholder="e.g., Senior Designer"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.job_title} />
                                </div>

                                <div>
                                    <Label htmlFor="department">Department</Label>
                                    <Input
                                        id="department"
                                        type="text"
                                        value={data.department}
                                        onChange={(e) => setData('department', e.target.value)}
                                        placeholder="e.g., Design Team"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.department} />
                                </div>

                                <div>
                                    <Label htmlFor="short_bio">Short Bio</Label>
                                    <Textarea
                                        id="short_bio"
                                        value={data.short_bio}
                                        onChange={(e) => setData('short_bio', e.target.value)}
                                        placeholder="Brief description (max 500 characters)"
                                        className="mt-2 resize-none"
                                        rows={3}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {data.short_bio.length}/500
                                    </p>
                                    <InputError message={errors.short_bio} />
                                </div>

                                <div>
                                    <Label htmlFor="description">Description</Label>
                                    <Textarea
                                        id="description"
                                        value={data.description}
                                        onChange={(e) => setData('description', e.target.value)}
                                        placeholder="Detailed description (max 2000 characters)"
                                        className="mt-2 resize-none"
                                        rows={3}
                                    />
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        {data.description.length}/2000
                                    </p>
                                    <InputError message={errors.description} />
                                </div>
                            </div>

                            {/* Image Upload Section */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label>Profile Photo</Label>
                                    <div
                                        className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                                        onClick={() => profileInputRef.current?.click()}
                                    >
                                        {profilePreview ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={profilePreview}
                                                    alt="Profile preview"
                                                    className="h-32 w-32 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage('profile');
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center pointer-events-none">
                                                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">JPEG, PNG, WebP (Max 5MB)</p>
                                            </div>
                                        )}
                                        <input
                                            ref={profileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => handleFileChange(e, 'profile')}
                                            className="hidden"
                                        />
                                    </div>
                                    <InputError message={errors.profile_photo} />
                                </div>

                                <div>
                                    <Label>Cover Image</Label>
                                    <div
                                        className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6 cursor-pointer hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                                        onClick={() => coverInputRef.current?.click()}
                                    >
                                        {coverPreview ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={coverPreview}
                                                    alt="Cover preview"
                                                    className="h-32 w-48 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        removeImage('cover');
                                                    }}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center pointer-events-none">
                                                <Upload className="w-8 h-8 mx-auto text-gray-400 mb-2" />
                                                <p className="text-sm text-gray-600 dark:text-gray-400">Click to upload or drag and drop</p>
                                                <p className="text-xs text-gray-500 dark:text-gray-500">JPEG, PNG, WebP (Max 5MB)</p>
                                            </div>
                                        )}
                                        <input
                                            ref={coverInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => handleFileChange(e, 'cover')}
                                            className="hidden"
                                        />
                                    </div>
                                    <InputError message={errors.cover_image} />
                                </div>
                            </div>
                        </div>

                        {/* Company Information Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Company Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="company_name">Company Name</Label>
                                    <Input
                                        id="company_name"
                                        type="text"
                                        value={data.company_name}
                                        onChange={(e) => setData('company_name', e.target.value)}
                                        placeholder="e.g., Acme Corporation"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.company_name} />
                                </div>

                                <div>
                                    <Label htmlFor="website">Website</Label>
                                    <Input
                                        id="website"
                                        type="url"
                                        value={data.website}
                                        onChange={(e) => setData('website', e.target.value)}
                                        placeholder="https://example.com"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.website} />
                                </div>
                            </div>
                        </div>

                        {/* Contact Information Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Information</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="email">Email</Label>
                                    <Input
                                        id="email"
                                        type="email"
                                        value={data.email}
                                        onChange={(e) => setData('email', e.target.value)}
                                        placeholder="john@example.com"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.email} />
                                </div>

                                <div>
                                    <Label htmlFor="phone">Phone</Label>
                                    <Input
                                        id="phone"
                                        type="tel"
                                        value={data.phone}
                                        onChange={(e) => setData('phone', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.phone} />
                                </div>

                                <div>
                                    <Label htmlFor="alternate_phone">Alternate Phone</Label>
                                    <Input
                                        id="alternate_phone"
                                        type="tel"
                                        value={data.alternate_phone}
                                        onChange={(e) => setData('alternate_phone', e.target.value)}
                                        placeholder="+1 (555) 987-6543"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.alternate_phone} />
                                </div>

                                <div>
                                    <Label htmlFor="whatsapp_number">WhatsApp Number</Label>
                                    <Input
                                        id="whatsapp_number"
                                        type="tel"
                                        value={data.whatsapp_number}
                                        onChange={(e) => setData('whatsapp_number', e.target.value)}
                                        placeholder="+1 (555) 123-4567"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.whatsapp_number} />
                                </div>
                            </div>
                        </div>

                        {/* Address Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Address</h2>
                            </div>

                            <div className="grid grid-cols-1 gap-6">
                                <div>
                                    <Label htmlFor="address">Street Address</Label>
                                    <Input
                                        id="address"
                                        type="text"
                                        value={data.address}
                                        onChange={(e) => setData('address', e.target.value)}
                                        placeholder="123 Main Street"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.address} />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                <div>
                                    <Label htmlFor="city">City</Label>
                                    <Input
                                        id="city"
                                        type="text"
                                        value={data.city}
                                        onChange={(e) => setData('city', e.target.value)}
                                        placeholder="New York"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.city} />
                                </div>

                                <div>
                                    <Label htmlFor="state">State/Province</Label>
                                    <Input
                                        id="state"
                                        type="text"
                                        value={data.state}
                                        onChange={(e) => setData('state', e.target.value)}
                                        placeholder="NY"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.state} />
                                </div>

                                <div>
                                    <Label htmlFor="country">Country</Label>
                                    <Input
                                        id="country"
                                        type="text"
                                        value={data.country}
                                        onChange={(e) => setData('country', e.target.value)}
                                        placeholder="United States"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.country} />
                                </div>

                                <div>
                                    <Label htmlFor="postal_code">Postal Code</Label>
                                    <Input
                                        id="postal_code"
                                        type="text"
                                        value={data.postal_code}
                                        onChange={(e) => setData('postal_code', e.target.value)}
                                        placeholder="10001"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.postal_code} />
                                </div>
                            </div>
                        </div>

                        {/* Social Media Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Social Media</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                                    <Input
                                        id="linkedin_url"
                                        type="url"
                                        value={data.linkedin_url}
                                        onChange={(e) => setData('linkedin_url', e.target.value)}
                                        placeholder="https://linkedin.com/in/username"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.linkedin_url} />
                                </div>

                                <div>
                                    <Label htmlFor="facebook_url">Facebook URL</Label>
                                    <Input
                                        id="facebook_url"
                                        type="url"
                                        value={data.facebook_url}
                                        onChange={(e) => setData('facebook_url', e.target.value)}
                                        placeholder="https://facebook.com/username"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.facebook_url} />
                                </div>

                                <div>
                                    <Label htmlFor="instagram_url">Instagram URL</Label>
                                    <Input
                                        id="instagram_url"
                                        type="url"
                                        value={data.instagram_url}
                                        onChange={(e) => setData('instagram_url', e.target.value)}
                                        placeholder="https://instagram.com/username"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.instagram_url} />
                                </div>

                                <div>
                                    <Label htmlFor="x_url">X (Twitter) URL</Label>
                                    <Input
                                        id="x_url"
                                        type="url"
                                        value={data.x_url}
                                        onChange={(e) => setData('x_url', e.target.value)}
                                        placeholder="https://x.com/username"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.x_url} />
                                </div>

                                <div>
                                    <Label htmlFor="youtube_url">YouTube URL</Label>
                                    <Input
                                        id="youtube_url"
                                        type="url"
                                        value={data.youtube_url}
                                        onChange={(e) => setData('youtube_url', e.target.value)}
                                        placeholder="https://youtube.com/username"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.youtube_url} />
                                </div>

                                <div>
                                    <Label htmlFor="github_url">GitHub URL</Label>
                                    <Input
                                        id="github_url"
                                        type="url"
                                        value={data.github_url}
                                        onChange={(e) => setData('github_url', e.target.value)}
                                        placeholder="https://github.com/username"
                                        className="mt-2"
                                    />
                                    <InputError message={errors.github_url} />
                                </div>
                            </div>
                        </div>

                        {/* Design & Theme Section - System Controlled */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Design & Theme</h2>
                                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                                    Design settings are automatically assigned. All new cards use the default system theme.
                                </p>
                            </div>

                            {/* Read-only Theme Summary */}
                            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
                                <div className="flex items-start justify-between">
                                    <div>
                                        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
                                            Corporate Classic (Default)
                                        </h3>
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                                            Professional and clean design for corporate professionals
                                        </p>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-600 dark:text-gray-400">Primary:</span>
                                                <div
                                                    className="w-6 h-6 rounded border border-gray-300"
                                                    style={{ backgroundColor: '#1F2937' }}
                                                    title="#1F2937"
                                                />
                                                <span className="font-mono text-gray-700 dark:text-gray-300">#1F2937</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-600 dark:text-gray-400">Secondary:</span>
                                                <div
                                                    className="w-6 h-6 rounded border border-gray-300"
                                                    style={{ backgroundColor: '#3B82F6' }}
                                                    title="#3B82F6"
                                                />
                                                <span className="font-mono text-gray-700 dark:text-gray-300">#3B82F6</span>
                                            </div>
                                            <div className="flex items-center gap-3">
                                                <span className="text-gray-600 dark:text-gray-400">Accent:</span>
                                                <div
                                                    className="w-6 h-6 rounded border border-gray-300"
                                                    style={{ backgroundColor: '#10B981' }}
                                                    title="#10B981"
                                                />
                                                <span className="font-mono text-gray-700 dark:text-gray-300">#10B981</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400 mt-2">
                                                <span>Font Family:</span>
                                                <span className="font-semibold">Sans Serif</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded text-xs font-semibold">
                                            System Default
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <p className="text-xs text-gray-500 dark:text-gray-400 italic">
                                Theme and design settings cannot be customized. Contact your administrator if you need a different theme applied to your card.
                            </p>
                        </div>

                        {/* Publishing Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Publishing</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <Label htmlFor="slug">URL Slug (Auto-generated)</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <span className="text-sm text-gray-600 dark:text-gray-400">/</span>
                                        <Input
                                            id="slug"
                                            type="text"
                                            value={data.slug}
                                            disabled
                                            placeholder="Generated from Full Name"
                                            className="flex-1 bg-gray-100 dark:bg-gray-700 cursor-not-allowed"
                                        />
                                    </div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Automatically generated from your full name. Update the full name to change the slug.
                                    </p>
                                    <InputError message={errors.slug} />
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

                            <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-slate-700/50 rounded-lg">
                                <Checkbox
                                    id="is_active"
                                    checked={data.is_active}
                                    onCheckedChange={(checked) => setData('is_active', Boolean(checked))}
                                />
                                <Label htmlFor="is_active" className="cursor-pointer font-normal">
                                    Is Active - Card is available to view publicly
                                </Label>
                            </div>
                        </div>

                        {/* Form Actions */}
                        <div className="flex items-center gap-3 pt-6 border-t border-gray-200 dark:border-gray-700">
                            <Button type="submit" disabled={processing} className="flex items-center gap-2">
                                {processing && <Loader2 className="w-4 h-4 animate-spin" />}
                                Create Card
                            </Button>
                            <a
                                href="/admin/cards"
                                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-md transition-colors"
                            >
                                Cancel
                            </a>
                        </div>
                    </form>
                        </div>
                    </div>

                    {/* Live Preview Sidebar - Hidden on mobile, shows on desktop */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-6">
                            <div className="bg-card border border-border rounded-lg p-6">
                                <h2 className="text-lg font-semibold mb-4 text-foreground">Live Preview</h2>
                                <CardPreviewEditor
                                    fullName={data.full_name}
                                    jobTitle={data.job_title}
                                    company={data.company_name}
                                    email={data.email}
                                    phone={data.phone}
                                    address={data.address}
                                    city={data.city}
                                    website={data.website}
                                    shortBio={data.short_bio}
                                    theme={data.theme}
                                    primaryColor={data.primary_color}
                                    secondaryColor={data.secondary_color}
                                    accentColor={data.accent_color}
                                    backgroundColor={data.background_color}
                                    fontFamily={data.font_family}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
