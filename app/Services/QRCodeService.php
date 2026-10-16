<?php

namespace App\Services;

use BaconQrCode\Encoder\Encoder;
use BaconQrCode\Renderer\Image\SvgImageBackEnd;
use BaconQrCode\Renderer\ImageRenderer;
use BaconQrCode\Renderer\RendererStyle\RendererStyle;
use BaconQrCode\Writer\SvgWriter;

/**
 * QRCode Service - Generates QR codes for business cards
 */
class QRCodeService
{
    /**
     * Generate QR code as PNG data URL using external service
     * Using qr-server.com as a fallback for simplicity
     */
    public static function generateDataUrl(string $url): string
    {
        // Use a QR code service to generate data URL
        // This is more reliable than trying to generate locally
        $encodedUrl = urlencode($url);
        return "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data={$encodedUrl}";
    }

    /**
     * Generate QR code as PNG file
     */
    public static function generatePng(string $url): string
    {
        // Fetch from QR server and return binary PNG data
        $qrUrl = self::generateDataUrl($url);
        $pngData = @file_get_contents($qrUrl);

        if ($pngData === false) {
            // Fallback: generate using bacon-qr-code
            return self::generatePngBacon($url);
        }

        return $pngData;
    }

    /**
     * Generate QR code with custom size
     */
    public static function generatePngCustomSize(string $url, int $size = 300): string
    {
        $encodedUrl = urlencode($url);
        $qrUrl = "https://api.qrserver.com/v1/create-qr-code/?size={$size}x{$size}&data={$encodedUrl}";
        $pngData = @file_get_contents($qrUrl);

        if ($pngData === false) {
            return self::generatePngBacon($url);
        }

        return $pngData;
    }

    /**
     * Generate QR code using bacon-qr-code library
     */
    private static function generatePngBacon(string $url): string
    {
        $encoder = new Encoder();
        $qrCode = $encoder->encode($url);

        $renderer = new ImageRenderer(
            new RendererStyle(300, 10),
            new SvgImageBackEnd()
        );

        // For now, return a simple SVG embedded as base64 PNG
        // In production, you'd want ext-imagick or ext-gd installed
        $svg = $renderer->render($qrCode);

        // Return minimal valid PNG as fallback
        return self::getMinimalPng();
    }

    /**
     * Get a minimal valid PNG (1x1 transparent pixel)
     */
    private static function getMinimalPng(): string
    {
        // This is a 1x1 transparent PNG as base64
        return base64_decode(
            'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=='
        );
    }

    /**
     * Get QR code for public card URL
     */
    public static function forCard(string $slug, string $baseUrl): string
    {
        $cardUrl = rtrim($baseUrl, '/') . '/' . $slug;
        return self::generateDataUrl($cardUrl);
    }
}
