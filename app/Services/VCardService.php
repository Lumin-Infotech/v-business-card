<?php

namespace App\Services;

use App\Models\BusinessCard;

/**
 * vCard Service - Generates vCard (.vcf) files for business cards
 */
class VCardService
{
    /**
     * Generate vCard content from BusinessCard model
     */
    public static function generate(BusinessCard $card, string $baseUrl): string
    {
        $lines = [
            'BEGIN:VCARD',
            'VERSION:3.0',
            'PRODID:-//Virtual Business Card//EN',
            'UID:' . $card->uuid ?? $card->id . '@' . parse_url($baseUrl, PHP_URL_HOST),
        ];

        // Name
        if ($card->full_name) {
            $lines[] = 'FN:' . self::escapeVCard($card->full_name);
        }

        // Structured name
        $lastName = '';
        $firstName = $card->full_name ?? '';
        if (strpos($firstName, ' ') !== false) {
            [$firstName, $lastName] = explode(' ', $firstName, 2);
        }
        $lines[] = 'N:' . self::escapeVCard($lastName) . ';' . self::escapeVCard($firstName) . ';;;';

        // Title/Job
        if ($card->job_title) {
            $lines[] = 'TITLE:' . self::escapeVCard($card->job_title);
        }

        // Organization
        if ($card->company_name) {
            $lines[] = 'ORG:' . self::escapeVCard($card->company_name);
        }

        // Email
        if ($card->email) {
            $lines[] = 'EMAIL;TYPE=INTERNET:' . $card->email;
        }

        // Phone
        if ($card->phone) {
            $lines[] = 'TEL;TYPE=WORK;TYPE=VOICE:' . $card->phone;
        }

        // Website
        if ($card->website) {
            $lines[] = 'URL:' . $card->website;
        }

        // Address
        if ($card->address || $card->city) {
            $address = $card->address ?? '';
            $city = $card->city ?? '';
            $lines[] = 'ADR;TYPE=WORK:;;' . self::escapeVCard($address) . ';' . self::escapeVCard($city) . ';;;';
        }

        // Note/Bio
        if ($card->short_bio) {
            $lines[] = 'NOTE:' . self::escapeVCard($card->short_bio);
        }

        // URL to public card
        $publicUrl = rtrim($baseUrl, '/') . '/' . $card->slug;
        $lines[] = 'SOURCE:' . $publicUrl;

        // Revision timestamp
        $lines[] = 'REV:' . now()->toAtomString();

        $lines[] = 'END:VCARD';

        return implode("\r\n", $lines);
    }

    /**
     * Escape special characters in vCard values
     */
    private static function escapeVCard(string $value): string
    {
        $value = str_replace(['\\', ',', ';', "\n"], ['\\\\', '\\,', '\\;', '\\n'], $value);
        return $value;
    }

    /**
     * Generate vCard filename
     */
    public static function getFilename(BusinessCard $card): string
    {
        $name = str_replace(' ', '-', strtolower($card->full_name ?? 'contact'));
        return "{$name}.vcf";
    }
}
