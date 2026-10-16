<?php

namespace App\Services;

use App\Models\CardAnalytics;

/**
 * Analytics Service - Track card views, QR scans, and downloads
 */
class AnalyticsService
{
    /**
     * Track a card page view
     */
    public static function trackCardView(int $cardId): void
    {
        CardAnalytics::logView($cardId);
    }

    /**
     * Track a QR code scan/download
     */
    public static function trackQrScan(int $cardId): void
    {
        CardAnalytics::logQrScan($cardId);
    }

    /**
     * Track a contact download
     */
    public static function trackContactDownload(int $cardId): void
    {
        CardAnalytics::logContactDownload($cardId);
    }

    /**
     * Get card analytics summary
     */
    public static function getCardSummary(int $cardId): array
    {
        return CardAnalytics::summaryForCard($cardId);
    }

    /**
     * Get card analytics by event type
     */
    public static function getCardByEvent(int $cardId): array
    {
        return CardAnalytics::byEventType($cardId);
    }

    /**
     * Get card analytics by date range
     */
    public static function getCardByDate(int $cardId, int $days = 30): array
    {
        return CardAnalytics::byDate($cardId, $days);
    }

    /**
     * Get detailed analytics for a card
     */
    public static function getCardAnalytics(int $cardId): array
    {
        return [
            'summary' => self::getCardSummary($cardId),
            'by_event' => self::getCardByEvent($cardId),
            'by_date' => self::getCardByDate($cardId),
            'recent_events' => CardAnalytics::where('business_card_id', $cardId)
                ->latest()
                ->take(10)
                ->get()
                ->map(fn($event) => [
                    'event_type' => $event->event_type,
                    'ip_address' => self::maskIpAddress($event->ip_address),
                    'country' => $event->country,
                    'created_at' => $event->created_at->diffForHumans(),
                ])
                ->toArray(),
        ];
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
