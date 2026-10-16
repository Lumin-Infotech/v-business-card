import { CardPreview } from '@/components/card-preview';
import { Mail, Phone, Globe, MapPin, Share2, Download, QrCode as QrCodeIcon } from 'lucide-react';
import { Head } from '@inertiajs/react';

interface Card {
    id: number;
    slug: string;
    full_name: string;
    job_title: string | null;
    company_name: string | null;
    email: string | null;
    phone: string | null;
    website: string | null;
    address: string | null;
    city: string | null;
    theme: string;
    primary_color: string;
    secondary_color: string;
    accent_color: string;
    short_bio: string | null;
}

export default function CardDisplay({ card }: { card: Card }) {
    const publicUrl = `${window.location.origin}/${card.slug}`;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(publicUrl);
        alert('URL copied to clipboard!');
    };

    return (
        <>
            <Head title={card.full_name} />
            <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 py-12 px-4">
                <div className="max-w-3xl mx-auto">
                    {/* Card Preview */}
                    <div className="mb-8">
                        <CardPreview
                            theme={card.theme}
                            fullName={card.full_name}
                            jobTitle={card.job_title}
                            company={card.company_name}
                            email={card.email}
                            phone={card.phone}
                            address={card.address}
                            primaryColor={card.primary_color}
                            secondaryColor={card.secondary_color}
                            accentColor={card.accent_color}
                        />
                    </div>

                    {/* Contact Information */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-8 space-y-6">
                        <div>
                            <h1 className="text-3xl font-bold">{card.full_name}</h1>
                            {card.job_title && <p className="text-lg text-gray-600 dark:text-gray-400 mt-1">{card.job_title}</p>}
                            {card.company_name && <p className="text-gray-600 dark:text-gray-400">{card.company_name}</p>}
                        </div>

                        {card.short_bio && <p className="text-gray-700 dark:text-gray-300">{card.short_bio}</p>}

                        {/* Contact Details */}
                        <div className="space-y-4">
                            {card.email && (
                                <a
                                    href={`mailto:${card.email}`}
                                    className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    <Mail className="w-5 h-5" />
                                    <span>{card.email}</span>
                                </a>
                            )}

                            {card.phone && (
                                <a
                                    href={`tel:${card.phone}`}
                                    className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    <Phone className="w-5 h-5" />
                                    <span>{card.phone}</span>
                                </a>
                            )}

                            {card.website && (
                                <a
                                    href={card.website}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 text-blue-600 dark:text-blue-400 hover:underline"
                                >
                                    <Globe className="w-5 h-5" />
                                    <span>{card.website}</span>
                                </a>
                            )}

                            {card.address && (
                                <div className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
                                    <MapPin className="w-5 h-5 mt-1 flex-shrink-0" />
                                    <div>
                                        <p>{card.address}</p>
                                        {card.city && <p>{card.city}</p>}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Actions */}
                        <div className="pt-4 border-t border-gray-200 dark:border-gray-700 space-y-4">
                            <div className="flex flex-wrap gap-2">
                                <button
                                    onClick={copyToClipboard}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                >
                                    <Share2 className="w-5 h-5" />
                                    <span>Copy Link</span>
                                </button>

                                <a
                                    href={`/${card.slug}/contact`}
                                    className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                                >
                                    <Download className="w-5 h-5" />
                                    <span>Save Contact</span>
                                </a>

                                <a
                                    href={`/${card.slug}/qr`}
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                                >
                                    <QrCodeIcon className="w-5 h-5" />
                                    <span>QR Code</span>
                                </a>
                            </div>

                            {/* QR Code Display */}
                            <div className="pt-4 mt-4 border-t border-gray-200 dark:border-gray-700">
                                <h3 className="text-sm font-semibold mb-3">Scan QR Code</h3>
                                <img
                                    src={`/${card.slug}/qr`}
                                    alt="QR Code"
                                    className="w-48 h-48 border border-gray-300 dark:border-gray-600 rounded-lg p-2 bg-white"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
