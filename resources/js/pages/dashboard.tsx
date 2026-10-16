import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { FileText, Package, Users } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

interface DashboardStats {
    total_cards: number;
    published_cards: number;
    draft_cards: number;
    inactive_cards: number;
    total_users: number | null;
}

interface RecentCard {
    id: number;
    slug: string;
    full_name: string;
    company_name: string | null;
    status: string;
    created_at: string;
}

export default function Dashboard() {
    const { stats, recent_cards } = usePage().props as {
        stats: DashboardStats;
        recent_cards: RecentCard[];
    };

    const statCards = [
        {
            title: 'Total Cards',
            value: stats.total_cards,
            icon: Package,
            color: 'text-blue-600',
            bgColor: 'bg-blue-50 dark:bg-blue-950',
        },
        {
            title: 'Published Cards',
            value: stats.published_cards,
            icon: FileText,
            color: 'text-green-600',
            bgColor: 'bg-green-50 dark:bg-green-950',
        },
        {
            title: 'Draft Cards',
            value: stats.draft_cards,
            icon: FileText,
            color: 'text-amber-600',
            bgColor: 'bg-amber-50 dark:bg-amber-950',
        },
        ...(stats.total_users !== null
            ? [
                  {
                      title: 'Total Users',
                      value: stats.total_users,
                      icon: Users,
                      color: 'text-purple-600',
                      bgColor: 'bg-purple-50 dark:bg-purple-950',
                  },
              ]
            : []),
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex flex-col gap-6 p-4">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title} className="border border-border bg-card">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                                    <CardTitle className="text-sm font-medium text-muted">{stat.title}</CardTitle>
                                    <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                                        <Icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold">{stat.value}</div>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recent Cards Section */}
                {recent_cards.length > 0 && (
                    <Card className="border border-border bg-card">
                        <CardHeader>
                            <CardTitle>Recently Created Cards</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {recent_cards.map((card) => (
                                    <div key={card.id} className="flex items-center justify-between border-b border-border pb-4 last:border-b-0">
                                        <div className="flex-1">
                                            <p className="font-medium">{card.full_name}</p>
                                            <p className="text-sm text-muted">{card.company_name || 'No company'}</p>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <span
                                                className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                                    card.status === 'published'
                                                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                                                        : 'bg-amber-100 text-amber-800 dark:bg-amber-900 dark:text-amber-200'
                                                }`}
                                            >
                                                {card.status}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {recent_cards.length === 0 && (
                    <Card className="border border-border bg-card">
                        <CardHeader className="text-center">
                            <CardTitle className="text-muted">No Business Cards Yet</CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-sm text-muted">Create your first business card to get started.</p>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
