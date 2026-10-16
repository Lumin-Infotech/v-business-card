<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CardAnalytics extends Model
{
    protected $table = 'card_analytics';

    protected $fillable = [
        'business_card_id',
        'event_type',
        'ip_address',
        'user_agent',
        'referrer',
        'country',
    ];

    /**
     * Get the business card this analytics record belongs to.
     */
    public function businessCard(): BelongsTo
    {
        return $this->belongsTo(BusinessCard::class);
    }

    /**
     * Log a card view
     */
    public static function logView(int $cardId, array $metadata = []): self
    {
        return self::create([
            'business_card_id' => $cardId,
            'event_type' => 'view',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'referrer' => request()->header('referer'),
            'country' => $metadata['country'] ?? null,
        ]);
    }

    /**
     * Log a QR code scan
     */
    public static function logQrScan(int $cardId, array $metadata = []): self
    {
        return self::create([
            'business_card_id' => $cardId,
            'event_type' => 'qr_scan',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'referrer' => request()->header('referer'),
            'country' => $metadata['country'] ?? null,
        ]);
    }

    /**
     * Log a contact download (vCard)
     */
    public static function logContactDownload(int $cardId, array $metadata = []): self
    {
        return self::create([
            'business_card_id' => $cardId,
            'event_type' => 'vcard_download',
            'ip_address' => request()->ip(),
            'user_agent' => request()->userAgent(),
            'referrer' => request()->header('referer'),
            'country' => $metadata['country'] ?? null,
        ]);
    }

    /**
     * Get summary statistics for a card
     */
    public static function summaryForCard(int $cardId): array
    {
        return [
            'total_views' => self::where('business_card_id', $cardId)->where('event_type', 'view')->count(),
            'qr_scans' => self::where('business_card_id', $cardId)->where('event_type', 'qr_scan')->count(),
            'contact_downloads' => self::where('business_card_id', $cardId)->where('event_type', 'vcard_download')->count(),
            'total_interactions' => self::where('business_card_id', $cardId)->count(),
            'unique_ips' => self::where('business_card_id', $cardId)->distinct('ip_address')->count('ip_address'),
        ];
    }

    /**
     * Get analytics grouped by event type
     */
    public static function byEventType(int $cardId): array
    {
        return self::where('business_card_id', $cardId)
            ->groupBy('event_type')
            ->selectRaw('event_type, COUNT(*) as count')
            ->get()
            ->mapWithKeys(fn($item) => [$item->event_type => $item->count])
            ->toArray();
    }

    /**
     * Get analytics by date (last 30 days)
     */
    public static function byDate(int $cardId, int $days = 30): array
    {
        return self::where('business_card_id', $cardId)
            ->where('created_at', '>=', now()->subDays($days))
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupBy('date')
            ->orderBy('date')
            ->get()
            ->mapWithKeys(fn($item) => [$item->date => $item->count])
            ->toArray();
    }
}
