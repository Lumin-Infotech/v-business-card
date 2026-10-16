<?php

use App\Models\BusinessCard;
use App\Models\CardAnalytics;
use App\Models\User;
use App\Services\AnalyticsService;
use Illuminate\Support\Facades\Request;

beforeEach(function () {
    $admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
        'is_active' => true,
        'email_verified_at' => now(),
    ]);

    $this->card = BusinessCard::create([
        'name' => 'Test Card',
        'full_name' => 'John Doe',
        'slug' => 'john-doe-analytics',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'published',
        'is_active' => true,
        'created_by' => $admin->id,
    ]);
});

test('card view is tracked', function () {
    $response = $this->get('/john-doe-analytics');
    $response->assertOk();

    $analytics = CardAnalytics::where('business_card_id', $this->card->id)
        ->where('event_type', 'view')
        ->first();

    expect($analytics)->not->toBeNull();
    expect($analytics->ip_address)->toBeString();
});

test('qr code scan is tracked', function () {
    $response = $this->get('/john-doe-analytics/qr');
    $response->assertOk();

    $analytics = CardAnalytics::where('business_card_id', $this->card->id)
        ->where('event_type', 'qr_scan')
        ->first();

    expect($analytics)->not->toBeNull();
});

test('contact download is tracked', function () {
    $response = $this->get('/john-doe-analytics/contact');
    $response->assertOk();

    $analytics = CardAnalytics::where('business_card_id', $this->card->id)
        ->where('event_type', 'vcard_download')
        ->first();

    expect($analytics)->not->toBeNull();
});

test('analytics summary is generated correctly', function () {
    // Generate some analytics data
    for ($i = 0; $i < 5; $i++) {
        CardAnalytics::logView($this->card->id);
    }
    for ($i = 0; $i < 3; $i++) {
        CardAnalytics::logQrScan($this->card->id);
    }
    for ($i = 0; $i < 2; $i++) {
        CardAnalytics::logContactDownload($this->card->id);
    }

    $summary = AnalyticsService::getCardSummary($this->card->id);

    expect($summary['total_views'])->toBe(5);
    expect($summary['qr_scans'])->toBe(3);
    expect($summary['contact_downloads'])->toBe(2);
    expect($summary['total_interactions'])->toBe(10);
});

test('analytics by event type is categorized', function () {
    for ($i = 0; $i < 5; $i++) {
        CardAnalytics::logView($this->card->id);
    }
    for ($i = 0; $i < 3; $i++) {
        CardAnalytics::logQrScan($this->card->id);
    }

    $byEvent = AnalyticsService::getCardByEvent($this->card->id);

    expect($byEvent)->toHaveKey('view', 5);
    expect($byEvent)->toHaveKey('qr_scan', 3);
});

test('analytics by date shows daily stats', function () {
    // Create events today
    for ($i = 0; $i < 3; $i++) {
        $this->get('/john-doe-analytics');
    }

    $byDate = AnalyticsService::getCardByDate($this->card->id, 30);

    expect($byDate)->not->toBeEmpty();
    expect($byDate[now()->format('Y-m-d')] ?? 0)->toBeGreaterThan(0);
});

test('detailed analytics includes recent events', function () {
    for ($i = 0; $i < 3; $i++) {
        $this->get('/john-doe-analytics');
    }

    $analytics = AnalyticsService::getCardAnalytics($this->card->id);

    expect($analytics)->toHaveKeys(['summary', 'by_event', 'by_date', 'recent_events']);
    expect($analytics['recent_events'])->not->toBeEmpty();
    expect(count($analytics['recent_events']))->toBeLessThanOrEqual(10);
});

test('ip address is masked in recent events', function () {
    $this->get('/john-doe-analytics');

    $analytics = AnalyticsService::getCardAnalytics($this->card->id);
    $firstEvent = $analytics['recent_events'][0];

    // IP should be masked (contain ***)
    expect($firstEvent['ip_address'])->toContain('***');
});

test('draft cards do not track analytics', function () {
    $this->card->update(['status' => 'draft']);

    $response = $this->get('/john-doe-analytics');
    $response->assertNotFound();

    $analytics = CardAnalytics::where('business_card_id', $this->card->id)->count();
    expect($analytics)->toBe(0);
});

test('inactive cards do not track analytics', function () {
    $this->card->update(['is_active' => false]);

    $response = $this->get('/john-doe-analytics');
    $response->assertNotFound();

    $analytics = CardAnalytics::where('business_card_id', $this->card->id)->count();
    expect($analytics)->toBe(0);
});
