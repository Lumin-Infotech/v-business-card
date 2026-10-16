<?php

namespace App\Http\Controllers;

use App\Models\CardAnalytics;
use App\Services\AnalyticsService;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    /**
     * Display the analytics dashboard.
     */
    public function index(Request $request): Response
    {
        // Get aggregated analytics across all cards for the current user
        // For now, we'll show overall statistics
        
        $analytics = [
            'summary' => [
                'total_views' => CardAnalytics::where('event_type', 'view')->count(),
                'qr_scans' => CardAnalytics::where('event_type', 'qr_scan')->count(),
                'contact_downloads' => CardAnalytics::where('event_type', 'vcard_download')->count(),
                'total_interactions' => CardAnalytics::count(),
                'unique_ips' => CardAnalytics::distinct('ip_address')->count('ip_address'),
            ],
            'by_event' => self::getByEventType(),
            'by_date' => self::getByDate(),
            'recent_events' => self::getRecentEvents(),
        ];

        return Inertia::render('admin/analytics', [
            'analytics' => $analytics,
        ]);
    }

    /**
     * Get analytics grouped by event type
     */
    private static function getByEventType(): array
    {
        return CardAnalytics::selectRaw('event_type, COUNT(*) as count')
            ->groupBy('event_type')
            ->get()
            ->mapWithKeys(fn($item) => [$item->event_type => $item->count])
            ->toArray();
    }

    /**
     * Get analytics by date (last 30 days)
     */
    private static function getByDate(): array
    {
        return CardAnalytics::where('created_at', '>=', now()->subDays(30))
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->mapWithKeys(fn($item) => [$item->date => $item->count])
            ->toArray();
    }

    /**
     * Get recent events (last 10)
     */
    private static function getRecentEvents(): array
    {
        return CardAnalytics::latest()
            ->take(10)
            ->get()
            ->map(fn($event) => [
                'event_type' => $event->event_type,
                'ip_address' => self::maskIpAddress($event->ip_address),
                'country' => $event->country,
                'created_at' => $event->created_at->diffForHumans(),
            ])
            ->toArray();
    }

    /**
     * Mask IP address for privacy
     */
    private static function maskIpAddress(?string $ip): ?string
    {
        if (!$ip) {
            return null;
        }

        // For IPv4, mask last octet
        if (str_contains($ip, '.')) {
            $parts = explode('.', $ip);
            $parts[3] = '***';
            return implode('.', $parts);
        }

        // For IPv6, mask last segment
        if (str_contains($ip, ':')) {
            $parts = explode(':', $ip);
            $parts[count($parts) - 1] = '****';
            return implode(':', $parts);
        }

        return $ip;
    }
}
