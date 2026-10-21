import { Head } from '@inertiajs/react';
import { BarChart3, Eye, QrCode, Download, TrendingUp } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';

interface Analytics {
    summary: {
        total_views: number;
        qr_scans: number;
        contact_downloads: number;
        total_interactions: number;
        unique_ips: number;
    };
    by_event: Record<string, number>;
    by_date: Record<string, number>;
    recent_events: Array<{
        event_type: string;
        ip_address: string;
        country: string | null;
        created_at: string;
    }>;
}

interface Props {
    analytics: Analytics;
}

export default function Analytics({ analytics }: Props) {
    const breadcrumbs: BreadcrumbItem[] = [
        { title: 'Admin', url: '/admin' },
        { title: 'Analytics', url: '/admin/analytics' },
    ];

    return (
        <>
            <Head title="Analytics" />
            <AppLayout breadcrumbs={breadcrumbs}>
            <div className="space-y-8 p-6">
                {/* Header */}
                <div>
                    <h1 className="text-3xl font-bold">Analytics Dashboard</h1>
                    <p className="text-gray-600 dark:text-gray-400">Track your card engagement and performance</p>
                </div>

                {/* Summary Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    <SummaryCard
                        icon={Eye}
                        label="Total Views"
                        value={analytics.summary.total_views}
                        color="blue"
                    />
                    <SummaryCard
                        icon={QrCode}
                        label="QR Scans"
                        value={analytics.summary.qr_scans}
                        color="purple"
                    />
                    <SummaryCard
                        icon={Download}
                        label="Contact Downloads"
                        value={analytics.summary.contact_downloads}
                        color="green"
                    />
                    <SummaryCard
                        icon={TrendingUp}
                        label="Total Interactions"
                        value={analytics.summary.total_interactions}
                        color="orange"
                    />
                    <SummaryCard
                        icon={BarChart3}
                        label="Unique IPs"
                        value={analytics.summary.unique_ips}
                        color="red"
                    />
                </div>

                {/* Charts Section */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* By Event Type */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Interactions by Type</h2>
                        <div className="space-y-4">
                            {Object.entries(analytics.by_event).map(([event, count]) => (
                                <div key={event} className="flex items-center justify-between">
                                    <div className="flex items-center gap-3 flex-1">
                                        <span className="text-sm font-medium capitalize">{event.replace('_', ' ')}</span>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                                            <div
                                                className="bg-blue-600 h-2 rounded-full"
                                                style={{
                                                    width: `${(count / Math.max(...Object.values(analytics.by_event))) * 100}%`,
                                                }}
                                            />
                                        </div>
                                        <span className="font-semibold w-12 text-right">{count}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Recent Activity */}
                    <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                        <h2 className="text-lg font-semibold mb-4">Recent Activity (Last 10)</h2>
                        <div className="space-y-3 max-h-96 overflow-y-auto">
                            {analytics.recent_events.map((event, idx) => (
                                <div key={idx} className="flex items-start gap-3 pb-3 border-b border-gray-200 dark:border-slate-700 last:border-b-0">
                                    <div className="flex-1">
                                        <p className="text-sm font-medium capitalize">
                                            {event.event_type.replace('_', ' ')}
                                        </p>
                                        <p className="text-xs text-gray-600 dark:text-gray-400">
                                            {event.ip_address} {event.country && `• ${event.country}`}
                                        </p>
                                    </div>
                                    <p className="text-xs text-gray-500">{event.created_at}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Daily Stats */}
                <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
                    <h2 className="text-lg font-semibold mb-4">Daily Interactions (Last 30 Days)</h2>
                    <div className="flex items-end gap-1 h-32">
                        {analytics.by_date && Object.entries(analytics.by_date).map(([date, count]) => {
                            const maxCount = Math.max(...Object.values(analytics.by_date));
                            const height = (count / maxCount) * 100;
                            return (
                                <div
                                    key={date}
                                    className="flex-1 bg-blue-600 rounded-t hover:bg-blue-700 cursor-pointer transition-colors"
                                    style={{ height: `${Math.max(height, 5)}%` }}
                                    title={`${date}: ${count}`}
                                />
                            );
                        })}
                    </div>
                    <p className="text-xs text-gray-600 dark:text-gray-400 mt-2">Hover over bars to see values</p>
                </div>
            </div>
            </AppLayout>
        </>
    );
}

interface SummaryCardProps {
    icon: React.ComponentType<{ className: string }>;
    label: string;
    value: number;
    color: 'blue' | 'purple' | 'green' | 'orange' | 'red';
}

function SummaryCard({ icon: Icon, label, value, color }: SummaryCardProps) {
    const colors = {
        blue: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-200',
        purple: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-200',
        green: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-200',
        orange: 'bg-orange-100 text-orange-600 dark:bg-orange-900 dark:text-orange-200',
        red: 'bg-red-100 text-red-600 dark:bg-red-900 dark:text-red-200',
    };

    return (
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow p-6">
            <div className={`w-12 h-12 rounded-lg ${colors[color]} flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6" />
            </div>
            <p className="text-gray-600 dark:text-gray-400 text-sm">{label}</p>
            <p className="text-3xl font-bold mt-1">{value}</p>
        </div>
    );
}
