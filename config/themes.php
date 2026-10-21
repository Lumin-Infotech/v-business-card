<?php

/**
 * Business Card Theme Configuration
 * 
 * Define all available themes with their predefined colors and settings.
 * This is the single source of truth for theme configuration.
 * Users cannot customize these values - they are system-controlled.
 */

return [
    /**
     * Default theme assigned to all new cards
     */
    'default' => 'corporate',

    /**
     * Available themes - system-controlled, non-editable by users
     */
    'themes' => [
        'corporate' => [
            'name' => 'Corporate Classic',
            'description' => 'Professional and clean design for corporate professionals',
            'font_family' => 'sans',
            'primary_color' => '#1F2937',
            'secondary_color' => '#3B82F6',
            'accent_color' => '#10B981',
            'background_color' => '#FFFFFF',
        ],
        'gradient' => [
            'name' => 'Modern Gradient',
            'description' => 'Contemporary design with vibrant gradients',
            'font_family' => 'sans',
            'primary_color' => '#3B82F6',
            'secondary_color' => '#8B5CF6',
            'accent_color' => '#EC4899',
            'background_color' => '#FFFFFF',
        ],
        'minimal' => [
            'name' => 'Minimal Light',
            'description' => 'Elegant and minimalist with plenty of whitespace',
            'font_family' => 'sans',
            'primary_color' => '#1F2937',
            'secondary_color' => '#6B7280',
            'accent_color' => '#9333EA',
            'background_color' => '#F9FAFB',
        ],
        'dark' => [
            'name' => 'Dark Executive',
            'description' => 'Premium dark theme for senior professionals',
            'font_family' => 'sans',
            'primary_color' => '#0F172A',
            'secondary_color' => '#1E293B',
            'accent_color' => '#F59E0B',
            'background_color' => '#0F172A',
        ],
        'bold' => [
            'name' => 'Creative Bold',
            'description' => 'Expressive and bold for creative professionals',
            'font_family' => 'sans',
            'primary_color' => '#DC2626',
            'secondary_color' => '#F59E0B',
            'accent_color' => '#059669',
            'background_color' => '#FFFFFF',
        ],
    ],
];
