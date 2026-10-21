import { useState } from 'react';
import { Mail, Phone, MessageCircle, Globe, MapPin, Share2, Download, QrCode as QrCodeIcon, Linkedin, Facebook, Instagram, Twitter, Youtube, Github, Copy, Check, X } from 'lucide-react';
import { Head } from '@inertiajs/react';

interface Card {
    id: number;
    slug: string;
    full_name: string;
    job_title: string | null;
    company_name: string | null;
    department: string | null;
    email: string | null;
    phone: string | null;
    whatsapp_number: string | null;
    website: string | null;
    address: string | null;
    city: string | null;
    state: string | null;
    country: string | null;
    postal_code: string | null;
    profile_photo: string | null;
    cover_image: string | null;
    theme: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    short_bio: string | null;
    linkedin_url: string | null;
    facebook_url: string | null;
    instagram_url: string | null;
    x_url: string | null;
    youtube_url: string | null;
    github_url: string | null;
}

export default function CardDisplay({ card }: { card: Card }) {
    const [showQRModal, setShowQRModal] = useState(false);
    const [copied, setCopied] = useState(false);
    const publicUrl = `${window.location.origin}/${card.slug}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    // Get theme colors from config
    const themeColors = {
        primary: card.primary_color,
        secondary: card.secondary_color,
        accent: card.accent_color,
    };

    // Social media links
    const socialLinks = [
        { url: card.linkedin_url, icon: Linkedin, label: 'LinkedIn' },
        { url: card.facebook_url, icon: Facebook, label: 'Facebook' },
        { url: card.instagram_url, icon: Instagram, label: 'Instagram' },
        { url: card.x_url, icon: Twitter, label: 'X (Twitter)' },
        { url: card.youtube_url, icon: Youtube, label: 'YouTube' },
        { url: card.github_url, icon: Github, label: 'GitHub' },
    ].filter(link => link.url);

    return (
        <>
            <Head title={card.full_name} />
            <div className="min-h-screen" style={{ backgroundColor: '#f9fafb' }}>
                <div className="max-w-4xl mx-auto px-4 py-8 md:py-12">
                    {/* Profile Card */}
                    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                        {/* Cover Image */}
                        {card.cover_image ? (
                            <div className="w-full h-48 md:h-64 bg-gray-200 overflow-hidden">
                                <img
                                    src={`/uploads/${card.cover_image}`}
                                    alt="Cover"
                                    className="w-full h-full object-cover"
                                    onError={(e) => {
                                        // Fallback to gradient if image fails to load
                                        const element = e.currentTarget;
                                        const parent = element.parentElement;
                                        if (parent) {
                                            parent.style.background = `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)`;
                                            element.style.display = 'none';
                                        }
                                    }}
                                />
                            </div>
                        ) : (
                            <div
                                className="w-full h-48 md:h-64"
                                style={{ background: `linear-gradient(135deg, ${themeColors.primary} 0%, ${themeColors.secondary} 100%)` }}
                            />
                        )}

                        {/* Profile Content */}
                        <div className="px-6 md:px-8 py-8">
                            {/* Header with Profile Photo and Name */}
                            <div className="flex flex-col md:flex-row gap-6 md:gap-8 mb-8">
                                {/* Profile Photo */}
                                {card.profile_photo ? (
                                    <div className="flex-shrink-0">
                                        <img
                                            src={`/uploads/${card.profile_photo}`}
                                            alt={card.full_name}
                                            className="w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg object-cover"
                                            style={{ borderColor: themeColors.primary }}
                                            onError={(e) => {
                                                // If profile photo fails, hide it - will show default spacing
                                                e.currentTarget.style.display = 'none';
                                            }}
                                        />
                                    </div>
                                ) : (
                                    <div
                                        className="flex-shrink-0 w-24 h-24 md:w-32 md:h-32 rounded-full border-4 border-white shadow-lg flex items-center justify-center"
                                        style={{ borderColor: themeColors.primary, backgroundColor: `${themeColors.primary}20` }}
                                    >
                                        <div className="text-center text-gray-400">
                                            <div className="text-2xl md:text-3xl">👤</div>
                                        </div>
                                    </div>
                                )}

                                {/* Name and Title */}
                                <div className="flex-grow">
                                    <h1
                                        className="text-3xl md:text-4xl font-bold mb-2"
                                        style={{ color: themeColors.primary }}
                                    >
                                        {card.full_name}
                                    </h1>

                                    {card.job_title && (
                                        <p
                                            className="text-lg md:text-xl font-semibold mb-1"
                                            style={{ color: themeColors.secondary }}
                                        >
                                            {card.job_title}
                                        </p>
                                    )}

                                    {card.company_name && (
                                        <p className="text-gray-600 mb-2">
                                            {card.company_name}
                                            {card.department && ` • ${card.department}`}
                                        </p>
                                    )}

                                    {card.short_bio && (
                                        <p className="text-gray-700 mt-3 text-sm md:text-base leading-relaxed max-w-2xl">
                                            {card.short_bio}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* Divider */}
                            <hr className="my-8" />

                            {/* Contact Information */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                                {/* Phone & Email */}
                                <div className="space-y-4">
                                    {card.email && (
                                        <a
                                            href={`mailto:${card.email}`}
                                            className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                            style={{
                                                backgroundColor: `${themeColors.primary}10`,
                                                color: themeColors.primary
                                            }}
                                        >
                                            <Mail className="w-5 h-5 flex-shrink-0" />
                                            <span className="break-all text-sm md:text-base">{card.email}</span>
                                        </a>
                                    )}

                                    {card.phone && (
                                        <a
                                            href={`tel:${card.phone}`}
                                            className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                            style={{
                                                backgroundColor: `${themeColors.accent}10`,
                                                color: themeColors.accent
                                            }}
                                        >
                                            <Phone className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm md:text-base">{card.phone}</span>
                                        </a>
                                    )}

                                    {card.whatsapp_number && (
                                        <a
                                            href={`https://wa.me/${card.whatsapp_number.replace(/\D/g, '')}`}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                            style={{
                                                backgroundColor: '#25d36610',
                                                color: '#25d366'
                                            }}
                                        >
                                            <MessageCircle className="w-5 h-5 flex-shrink-0" />
                                            <span className="text-sm md:text-base">{card.whatsapp_number}</span>
                                        </a>
                                    )}

                                    {card.website && (
                                        <a
                                            href={card.website}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-3 p-3 rounded-lg transition-colors"
                                            style={{
                                                backgroundColor: `${themeColors.secondary}10`,
                                                color: themeColors.secondary
                                            }}
                                        >
                                            <Globe className="w-5 h-5 flex-shrink-0" />
                                            <span className="break-all text-sm md:text-base">{card.website}</span>
                                        </a>
                                    )}
                                </div>

                                {/* Address */}
                                {card.address && (
                                    <div
                                        className="p-4 rounded-lg"
                                        style={{ backgroundColor: `${themeColors.primary}05` }}
                                    >
                                        <div className="flex gap-3">
                                            <MapPin className="w-5 h-5 flex-shrink-0 mt-1" style={{ color: themeColors.primary }} />
                                            <div className="text-sm md:text-base text-gray-700">
                                                <p>{card.address}</p>
                                                {card.city && <p>{card.city}</p>}
                                                {card.state && <p>{card.state}</p>}
                                                {card.country && <p>{card.country}</p>}
                                                {card.postal_code && <p>{card.postal_code}</p>}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Social Links */}
                            {socialLinks.length > 0 && (
                                <>
                                    <hr className="my-8" />
                                    <div className="mb-8">
                                        <h2 className="text-lg font-semibold mb-4" style={{ color: themeColors.primary }}>
                                            Connect With Me
                                        </h2>
                                        <div className="flex flex-wrap gap-3">
                                            {socialLinks.map((social) => {
                                                const Icon = social.icon;
                                                return (
                                                    <a
                                                        key={social.label}
                                                        href={social.url}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        title={social.label}
                                                        className="p-3 rounded-full transition-transform hover:scale-110"
                                                        style={{
                                                            backgroundColor: `${themeColors.primary}15`,
                                                            color: themeColors.primary
                                                        }}
                                                    >
                                                        <Icon className="w-5 h-5" />
                                                    </a>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </>
                            )}

                            {/* Action Buttons */}
                            <hr className="my-8" />
                            <div className="flex flex-col sm:flex-row gap-3">
                                {/* Copy Link Button */}
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-white"
                                    style={{ backgroundColor: themeColors.primary }}
                                >
                                    {copied ? (
                                        <>
                                            <Check className="w-5 h-5" />
                                            <span>Copied!</span>
                                        </>
                                    ) : (
                                        <>
                                            <Copy className="w-5 h-5" />
                                            <span>Copy Link</span>
                                        </>
                                    )}
                                </button>

                                {/* Save Contact Button */}
                                <a
                                    href={`/${card.slug}/contact`}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-white"
                                    style={{ backgroundColor: themeColors.secondary }}
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Save Contact</span>
                                </a>

                                {/* QR Code Button */}
                                <button
                                    onClick={() => setShowQRModal(true)}
                                    className="flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all text-white"
                                    style={{ backgroundColor: themeColors.accent }}
                                >
                                    <QrCodeIcon className="w-5 h-5" />
                                    <span>Show QR Code</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* QR Code Modal */}
            {showQRModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl shadow-2xl p-8 max-w-sm w-full">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold" style={{ color: themeColors.primary }}>
                                Scan QR Code
                            </h2>
                            <button
                                onClick={() => setShowQRModal(false)}
                                className="text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        <div className="mb-6 bg-gray-50 p-6 rounded-lg flex justify-center">
                            <img
                                src={`/${card.slug}/qr`}
                                alt="QR Code for business card"
                                className="w-64 h-64 border-4 border-gray-200 rounded-lg bg-white"
                                loading="eager"
                                onError={(e) => {
                                    console.error('QR code failed to load:', e);
                                    e.currentTarget.alt = 'QR code unavailable';
                                }}
                            />
                        </div>

                        <p className="text-center text-gray-600 text-sm mb-6">
                            Scan with your phone camera to visit this business card
                        </p>

                        <div className="flex gap-3">
                            <a
                                href={`/${card.slug}/qr/download`}
                                download
                                className="flex-1 py-3 rounded-lg font-medium transition-colors text-white text-center"
                                style={{ backgroundColor: themeColors.secondary }}
                            >
                                Download QR
                            </a>
                            <button
                                onClick={() => setShowQRModal(false)}
                                className="flex-1 py-3 rounded-lg font-medium transition-colors text-white"
                                style={{ backgroundColor: themeColors.primary }}
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
