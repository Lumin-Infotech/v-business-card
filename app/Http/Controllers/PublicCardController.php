<?php

namespace App\Http\Controllers;

use App\Models\BusinessCard;
use App\Services\AnalyticsService;
use App\Services\QRCodeService;
use App\Services\VCardService;
use Illuminate\Http\Response as HttpResponse;
use Inertia\Inertia;
use Inertia\Response;

class PublicCardController extends Controller
{
    /**
     * Display a public business card.
     */
    public function show(string $slug): Response|HttpResponse
    {
        // Find the card by slug
        $card = BusinessCard::where('slug', $slug)->first();

        // Return 404 if card not found
        if (!$card) {
            abort(404, 'Business card not found.');
        }

        // Return 404 if card is draft or inactive
        if ($card->status !== 'published' || !$card->is_active) {
            abort(404, 'This business card is not available.');
        }

        // Track the view
        AnalyticsService::trackCardView($card->id);

        // Render the public card page
        return Inertia::render('public/card-display', [
            'card' => $card,
        ]);
    }

    /**
     * Display QR code for the card (inline, not as download)
     */
    public function qr(string $slug): HttpResponse
    {
        $card = BusinessCard::where('slug', $slug)->first();

        if (!$card || $card->status !== 'published' || !$card->is_active) {
            abort(404, 'Business card not found.');
        }

        // Track the QR scan
        AnalyticsService::trackQrScan($card->id);

        $qrPng = QRCodeService::generatePng(url("/{$slug}"));

        // Return as inline image (display in browser) instead of attachment (download)
        return response($qrPng)
            ->header('Content-Type', 'image/png')
            ->header('Cache-Control', 'public, max-age=3600');
    }

    /**
     * Download QR code for the card
     */
    public function downloadQr(string $slug): HttpResponse
    {
        $card = BusinessCard::where('slug', $slug)->first();

        if (!$card || $card->status !== 'published' || !$card->is_active) {
            abort(404, 'Business card not found.');
        }

        // Track the QR download
        AnalyticsService::trackQrScan($card->id);

        $qrPng = QRCodeService::generatePng(url("/{$slug}"));

        // Return as attachment (forces download)
        return response($qrPng)
            ->header('Content-Type', 'image/png')
            ->header('Content-Disposition', "attachment; filename=\"{$slug}-qr.png\"");
    }

    /**
     * Download vCard for the card
     */
    public function downloadContact(string $slug): HttpResponse
    {
        $card = BusinessCard::where('slug', $slug)->first();

        if (!$card || $card->status !== 'published' || !$card->is_active) {
            abort(404, 'Business card not found.');
        }

        // Track the contact download
        AnalyticsService::trackContactDownload($card->id);

        $vcard = VCardService::generate($card, config('app.url'));
        $filename = VCardService::getFilename($card);

        return response($vcard)
            ->header('Content-Type', 'text/vcard')
            ->header('Content-Disposition', "attachment; filename=\"{$filename}\"");
    }
}
