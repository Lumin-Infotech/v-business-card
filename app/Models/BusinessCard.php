<?php

namespace App\Models;

use App\Services\ImageUploadService;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class BusinessCard extends Model
{
    use HasFactory;

    protected $appends = ['profile_photo_url', 'cover_image_url'];

    protected $fillable = [
        'name',
        'slug',
        'status',
        'is_active',
        'published_at',
        'full_name',
        'job_title',
        'company_name',
        'department',
        'profile_photo',
        'cover_image',
        'short_bio',
        'description',
        'email',
        'phone',
        'alternate_phone',
        'whatsapp_number',
        'website',
        'address',
        'city',
        'state',
        'country',
        'postal_code',
        'linkedin_url',
        'facebook_url',
        'instagram_url',
        'x_url',
        'youtube_url',
        'github_url',
        // Design fields are NOT fillable - they are system-controlled
        // 'theme',
        // 'primary_color',
        // 'secondary_color',
        // 'accent_color',
        // 'background_color',
        // 'font_family',
        'custom_settings',
        'created_by',
        'updated_by',
    ];

    protected function casts(): array
    {
        return [
            'published_at' => 'datetime',
            'is_active' => 'boolean',
            'custom_settings' => 'json',
        ];
    }

    public function createdBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function updatedBy(): BelongsTo
    {
        return $this->belongsTo(User::class, 'updated_by');
    }

    /**
     * Get the profile photo URL.
     */
    public function getProfilePhotoUrlAttribute(): ?string
    {
        return ImageUploadService::getImageUrl($this->profile_photo);
    }

    /**
     * Get the cover image URL.
     */
    public function getCoverImageUrlAttribute(): ?string
    {
        return ImageUploadService::getImageUrl($this->cover_image);
    }

    /**
     * Get the route key for implicit route model binding.
     */
    public function getRouteKeyName(): string
    {
        return 'slug';
    }

    /**
     * Generate a slug from the full name or name field.
     */
    public static function generateSlug(string $name): string
    {
        return str($name)
            ->slug()
            ->toString();
    }

    /**
     * Check if a slug is reserved (matches system routes).
     */
    public static function isSlugReserved(string $slug): bool
    {
        $reserved = [
            'login', 'logout', 'admin', 'dashboard', 'users', 'cards',
            'settings', 'register', 'forgot-password', 'reset-password',
            'verify-email', 'confirm-password', 'api', 'public', 'storage',
            'home', 'app', 'auth', 'profile', 'account',
        ];

        return in_array($slug, $reserved);
    }

    /**
     * Get the theme configuration for this card.
     * Returns the predefined theme settings from config.
     */
    public function getThemeConfig(): ?array
    {
        $themes = config('themes.themes');
        return $themes[$this->theme] ?? null;
    }

    /**
     * Get a specific theme property (e.g., 'primary_color', 'name').
     */
    public function getThemeProperty(string $property): mixed
    {
        $config = $this->getThemeConfig();
        return $config[$property] ?? null;
    }
}
