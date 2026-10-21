<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     * Normalize existing business card themes to use default configuration.
     * This ensures all cards have valid, predefined theme settings.
     */
    public function up(): void
    {
        // Get the default theme from config
        $defaultTheme = config('themes.default');
        $themeConfig = config('themes.themes.' . $defaultTheme);

        if (!$themeConfig) {
            return; // Config not available, skip
        }

        // Update cards with invalid or missing themes to use the default theme config
        // This includes any cards with themes not in the predefined list
        DB::table('business_cards')->update([
            'theme' => $defaultTheme,
            'primary_color' => $themeConfig['primary_color'],
            'secondary_color' => $themeConfig['secondary_color'],
            'accent_color' => $themeConfig['accent_color'],
            'background_color' => $themeConfig['background_color'],
            'font_family' => $themeConfig['font_family'],
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Cannot reliably reverse - no-op
    }
};
