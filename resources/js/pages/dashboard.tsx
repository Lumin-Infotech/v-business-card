import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head, usePage, Link } from '@inertiajs/react';
import { FileText, Package, Users, Plus, TrendingUp } from 'lucide-react';

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
            color: 'text-primary',
            bgColor: 'bg-primary/10',
        },
        {
            title: 'Published',
            value: stats.published_cards,
            icon: FileText,
            color: 'text-green-600 dark:text-green-400',
            bgColor: 'bg-green-100/50 dark:bg-green-900/20',
        },
        {
            title: 'Drafts',
            value: stats.draft_cards,
            icon: FileText,
            color: 'text-amber-600 dark:text-amber-400',
            bgColor: 'bg-amber-100/50 dark:bg-amber-900/20',
        },
        ...(stats.total_users !== null
            ? [
                  {
                      title: 'Users',
                      value: stats.total_users,
                      icon: Users,
                      color: 'text-purple-600 dark:text-purple-400',
                      bgColor: 'bg-purple-100/50 dark:bg-purple-900/20',
                  },
              ]
            : []),
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="space-y-8 p-6">
                {/* Header with Quick Actions */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
                        <p className="mt-2 text-sm text-muted-foreground">Welcome back! Here's what's happening with your business cards.</p>
                    </div>
                    <Link href="/admin/cards/create">
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            New Card
                        </Button>
                    </Link>
                </div>

                {/* Statistics Cards Grid */}
                <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {statCards.map((stat) => {
                        const Icon = stat.icon;
                        return (
                            <Card key={stat.title} className="overflow-hidden">
                                <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                                    <CardTitle className="text-sm font-medium text-muted-foreground">{stat.title}</CardTitle>
                                    <div className={`rounded-lg p-2 ${stat.bgColor}`}>
                                        <Icon className={`h-4 w-4 ${stat.color}`} />
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    <div className="text-2xl font-bold text-foreground">{stat.value}</div>
                                    <p className="text-xs text-muted-foreground mt-1 flex items-center gap-1">
                                        <TrendingUp className="h-3 w-3" /> Updated today
                                    </p>
                                </CardContent>
                            </Card>
                        );
                    })}
                </div>

                {/* Recently Created Cards Section */}
                {recent_cards.length > 0 && (
                    <Card>
                        <CardHeader className="border-b">
                            <div className="flex items-center justify-between">
                                <CardTitle className="text-lg">Recently Created Cards</CardTitle>
                                <Link href="/admin/cards">
                                    <Button variant="outline" size="sm">
                                        View All
                                    </Button>
                                </Link>
                            </div>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="space-y-4">
                                {recent_cards.map((card) => (
                                    <div
                                        key={card.id}
                                        className="flex items-center justify-between gap-4 p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                                    >
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-foreground truncate">{card.full_name}</p>
                                            <p className="text-sm text-muted-foreground mt-1">
                                                {card.company_name || 'No company assigned'}
                                            </p>
                                        </div>
                                        <div className="flex items-center gap-3 flex-shrink-0">
                                            <span
                                                className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${
                                                    card.status === 'published'
                                                        ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300'
                                                        : 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-300'
                                                }`}
                                            >
                                                {card.status === 'published' ? '✓ Published' : '◯ Draft'}
                                            </span>
                                            <Link href={`/admin/cards/${card.id}/edit`}>
                                                <Button variant="ghost" size="sm">
                                                    Edit
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {recent_cards.length === 0 && (
                    <Card className="text-center py-12">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <div className="rounded-full bg-primary/10 p-4">
                                    <Package className="h-8 w-8 text-primary" />
                                </div>
                            </div>
                            <CardTitle className="text-foreground">No Business Cards Yet</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p className="text-muted-foreground mb-6">Get started by creating your first business card.</p>
                            <Link href="/admin/cards/create">
                                <Button>
                                    <Plus className="mr-2 h-4 w-4" />
                                    Create Your First Card
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
