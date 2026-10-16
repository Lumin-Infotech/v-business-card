import { Monitor, Smartphone } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { CardPreview } from './card-preview';

export interface CardPreviewEditorProps {
    fullName: string;
    jobTitle?: string;
    company?: string;
    email?: string;
    phone?: string;
    address?: string;
    city?: string;
    website?: string;
    shortBio?: string;
    profilePhoto?: string | null;
    coverImage?: string | null;
    theme: string;
    primaryColor: string;
    secondaryColor: string;
    accentColor: string;
    backgroundColor?: string;
    fontFamily: string;
}

export function CardPreviewEditor(props: CardPreviewEditorProps) {
    const [isMobileView, setIsMobileView] = useState(false);

    const previewProps = {
        theme: props.theme,
        fullName: props.fullName,
        jobTitle: props.jobTitle,
        company: props.company,
        email: props.email,
        phone: props.phone,
        address: props.address,
        primaryColor: props.primaryColor,
        secondaryColor: props.secondaryColor,
        accentColor: props.accentColor,
        fontFamily: props.fontFamily,
    };

    return (
        <div className="space-y-4">
            {/* Header with toggle buttons */}
            <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    Live Preview
                </h3>
                <div className="flex gap-2">
                    <Button
                        type="button"
                        variant={!isMobileView ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setIsMobileView(false)}
                        className="flex items-center gap-2"
                    >
                        <Monitor className="w-4 h-4" />
                        Desktop
                    </Button>
                    <Button
                        type="button"
                        variant={isMobileView ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setIsMobileView(true)}
                        className="flex items-center gap-2"
                    >
                        <Smartphone className="w-4 h-4" />
                        Mobile
                    </Button>
                </div>
            </div>

            {/* Preview Frame */}
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-slate-900 dark:to-slate-800 rounded-lg border border-gray-200 dark:border-slate-700 p-8 shadow-inner">
                <div
                    className="mx-auto bg-white dark:bg-slate-700 rounded-xl shadow-lg overflow-hidden transition-all duration-300"
                    style={{
                        width: isMobileView ? '375px' : '100%',
                        maxWidth: isMobileView ? '375px' : 'none',
                    }}
                >
                    {/* Device frame bezel for mobile */}
                    {isMobileView && (
                        <div className="bg-black rounded-3xl p-3 shadow-2xl">
                            <div className="bg-white dark:bg-slate-700 rounded-2xl overflow-hidden">
                                <div className="relative">
                                    {/* Notch */}
                                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-6 bg-black rounded-b-3xl z-20" />

                                    {/* Content */}
                                    <div className="pt-8 pb-6 px-0">
                                        <CardPreview {...previewProps} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Desktop view */}
                    {!isMobileView && (
                        <div className="p-8">
                            <CardPreview {...previewProps} />
                        </div>
                    )}
                </div>

                {/* Preview info text */}
                <div className="mt-6 text-center text-sm text-gray-600 dark:text-gray-400">
                    <p>
                        {isMobileView ? 'Mobile Preview' : 'Desktop Preview'} • Updates in real-time as you fill
                        the form
                    </p>
                </div>
            </div>

            {/* Info box showing what's displayed */}
            <div className="bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <p className="text-sm text-blue-900 dark:text-blue-100">
                    <span className="font-semibold">Preview Status:</span> Displaying{' '}
                    {props.fullName ? 'your information' : 'placeholder content'} with the{' '}
                    <span className="font-semibold capitalize">{props.theme}</span> theme.
                </p>
            </div>
        </div>
    );
}
