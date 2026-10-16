<?php

namespace App\Services;

/**
 * Theme Service - Manages business card themes
 */
class ThemeService
{
    /**
     * Available themes with their configurations
     */
    public static function getThemes(): array
    {
        return [
            'corporate' => [
                'name' => 'Corporate Classic',
                'description' => 'Professional and clean design for corporate professionals',
                'colors' => [
                    'primary' => '#1F2937',
                    'secondary' => '#3B82F6',
                    'accent' => '#10B981',
                ],
            ],
            'gradient' => [
                'name' => 'Modern Gradient',
                'description' => 'Contemporary design with vibrant gradients',
                'colors' => [
                    'primary' => '#3B82F6',
                    'secondary' => '#8B5CF6',
                    'accent' => '#EC4899',
                ],
            ],
            'minimal' => [
                'name' => 'Minimal Light',
                'description' => 'Elegant and minimalist with plenty of whitespace',
                'colors' => [
                    'primary' => '#F3F4F6',
                    'secondary' => '#E5E7EB',
                    'accent' => '#1F2937',
                ],
            ],
            'dark' => [
                'name' => 'Dark Executive',
                'description' => 'Premium dark theme for senior professionals',
                'colors' => [
                    'primary' => '#0F172A',
                    'secondary' => '#1E293B',
                    'accent' => '#F59E0B',
                ],
            ],
            'bold' => [
                'name' => 'Creative Bold',
                'description' => 'Expressive and bold for creative professionals',
                'colors' => [
                    'primary' => '#DC2626',
                    'secondary' => '#F59E0B',
                    'accent' => '#059669',
                ],
            ],
        ];
    }

    /**
     * Get a specific theme configuration
     */
    public static function getTheme(string $slug): ?array
    {
        $themes = self::getThemes();
        return $themes[$slug] ?? null;
    }

    /**
     * Get all available theme names
     */
    public static function getThemeNames(): array
    {
        return array_keys(self::getThemes());
    }

    /**
     * Validate theme slug
     */
    public static function isValidTheme(string $slug): bool
    {
        return in_array($slug, self::getThemeNames());
    }

    /**
     * Get theme list for dropdown/select
     */
    public static function getThemesForSelect(): array
    {
        $themes = self::getThemes();
        return array_map(fn($key, $theme) => [
            'slug' => $key,
            'name' => $theme['name'],
            'description' => $theme['description'],
        ], array_keys($themes), $themes);
    }

    /**
     * Validate color format (basic hex validation)
     */
    public static function isValidColor(string $color): bool
    {
        return preg_match('/^#[0-9A-F]{6}$/i', $color) === 1;
    }

    /**
     * Sanitize custom theme settings
     */
    public static function sanitizeCustomSettings(array $settings): array
    {
        $sanitized = [];

        foreach (['primary_color', 'secondary_color', 'accent_color', 'background_color'] as $key) {
            if (isset($settings[$key]) && self::isValidColor($settings[$key])) {
                $sanitized[$key] = strtoupper($settings[$key]);
            }
        }

        if (isset($settings['font_family']) && in_array($settings['font_family'], ['sans', 'serif', 'mono'])) {
            $sanitized['font_family'] = $settings['font_family'];
        }

        return $sanitized;
    }
}
