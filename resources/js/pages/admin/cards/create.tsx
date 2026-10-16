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
        post('/admin/cards', {
            forceFormData: true,
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
                                    <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                                        {profilePreview ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={profilePreview}
                                                    alt="Profile preview"
                                                    className="h-32 w-32 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage('profile')}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
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
                                            onClick={(e) => e.currentTarget.click()}
                                        />
                                        <input
                                            ref={profileInputRef}
                                            type="file"
                                            accept="image/jpeg,image/png,image/webp"
                                            onChange={(e) => handleFileChange(e, 'profile')}
                                            className="absolute inset-0 opacity-0 cursor-pointer"
                                        />
                                    </div>
                                    <InputError message={errors.profile_photo} />
                                </div>

                                <div>
                                    <Label>Cover Image</Label>
                                    <div className="mt-2 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-6">
                                        {coverPreview ? (
                                            <div className="relative inline-block">
                                                <img
                                                    src={coverPreview}
                                                    alt="Cover preview"
                                                    className="h-32 w-48 object-cover rounded-lg"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage('cover')}
                                                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div className="text-center">
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
                                            className="absolute inset-0 opacity-0 cursor-pointer"
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

                        {/* Design & Theme Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Design & Theme</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <Label htmlFor="font_family">Font Family *</Label>
                                    <Select value={data.font_family} onValueChange={(value) => setData('font_family', value)}>
                                        <SelectTrigger className="mt-2">
                                            <SelectValue placeholder="Select a font" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {fontFamilies.map((font) => (
                                                <SelectItem key={font} value={font}>
                                                    {font.charAt(0).toUpperCase() + font.slice(1)}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.font_family} />
                                </div>

                                <div>
                                    <Label htmlFor="primary_color">Primary Color *</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Input
                                            id="primary_color"
                                            type="color"
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            className="h-10 w-20 p-1 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.primary_color}
                                            onChange={(e) => setData('primary_color', e.target.value)}
                                            placeholder="#4F46E5"
                                            className="flex-1"
                                        />
                                    </div>
                                    <InputError message={errors.primary_color} />
                                </div>

                                <div>
                                    <Label htmlFor="secondary_color">Secondary Color *</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Input
                                            id="secondary_color"
                                            type="color"
                                            value={data.secondary_color}
                                            onChange={(e) => setData('secondary_color', e.target.value)}
                                            className="h-10 w-20 p-1 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.secondary_color}
                                            onChange={(e) => setData('secondary_color', e.target.value)}
                                            placeholder="#7C3AED"
                                            className="flex-1"
                                        />
                                    </div>
                                    <InputError message={errors.secondary_color} />
                                </div>

                                <div>
                                    <Label htmlFor="accent_color">Accent Color *</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Input
                                            id="accent_color"
                                            type="color"
                                            value={data.accent_color}
                                            onChange={(e) => setData('accent_color', e.target.value)}
                                            className="h-10 w-20 p-1 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.accent_color}
                                            onChange={(e) => setData('accent_color', e.target.value)}
                                            placeholder="#06B6D4"
                                            className="flex-1"
                                        />
                                    </div>
                                    <InputError message={errors.accent_color} />
                                </div>

                                <div>
                                    <Label htmlFor="background_color">Background Color</Label>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Input
                                            id="background_color"
                                            type="color"
                                            value={data.background_color}
                                            onChange={(e) => setData('background_color', e.target.value)}
                                            className="h-10 w-20 p-1 cursor-pointer"
                                        />
                                        <Input
                                            type="text"
                                            value={data.background_color}
                                            onChange={(e) => setData('background_color', e.target.value)}
                                            placeholder="#FFFFFF (optional)"
                                            className="flex-1"
                                        />
                                    </div>
                                    <InputError message={errors.background_color} />
                                </div>
                            </div>
                        </div>

                        {/* Publishing Section */}
                        <div className="space-y-6">
                            <div className="pb-4 border-b border-gray-200 dark:border-gray-700">
                                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Publishing</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                                        Must contain only lowercase letters, numbers, and hyphens
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
