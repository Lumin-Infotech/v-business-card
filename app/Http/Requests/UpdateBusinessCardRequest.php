<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateBusinessCardRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return auth()->check() && auth()->user()->role === 'admin';
    }

    /**
     * Get the validation rules that apply to the request.
     */
    public function rules(): array
    {
        $cardId = $this->route('card')?->id;

        return [
            'name' => 'required|string|max:255',
            'full_name' => 'required|string|max:255',
            'slug' => [
                'required',
                'string',
                'max:255',
                'lowercase',
                'regex:/^[a-z0-9\-]+$/',
                Rule::unique('business_cards', 'slug')->ignore($cardId),
            ],
            'job_title' => 'nullable|string|max:255',
            'company_name' => 'nullable|string|max:255',
            'department' => 'nullable|string|max:255',
            'short_bio' => 'nullable|string|max:500',
            'description' => 'nullable|string|max:2000',

            // Contact Information
            'email' => 'nullable|email|max:255',
            'phone' => 'nullable|string|max:20',
            'alternate_phone' => 'nullable|string|max:20',
            'whatsapp_number' => 'nullable|string|max:20',
            'website' => 'nullable|url|max:255',

            // Address
            'address' => 'nullable|string|max:500',
            'city' => 'nullable|string|max:100',
            'state' => 'nullable|string|max:100',
            'country' => 'nullable|string|max:100',
            'postal_code' => 'nullable|string|max:20',

            // Social Media
            'linkedin_url' => 'nullable|url|max:255',
            'facebook_url' => 'nullable|url|max:255',
            'instagram_url' => 'nullable|url|max:255',
            'x_url' => 'nullable|url|max:255',
            'youtube_url' => 'nullable|url|max:255',
            'github_url' => 'nullable|url|max:255',

            // Design - Theme CANNOT be changed after creation (immutable)
            // Colors and fonts are locked to each theme and cannot be customized
            // 'theme' => removed - theme is immutable after creation
            // 'primary_color' => removed - locked to theme
            // 'secondary_color' => removed - locked to theme
            // 'accent_color' => removed - locked to theme
            // 'background_color' => removed - locked to theme
            // 'font_family' => removed - locked to theme

            // Publishing
            'status' => 'required|in:draft,published',
            'is_active' => 'required|boolean',

            // Files
            'profile_photo' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
            'cover_image' => 'nullable|image|mimes:jpeg,png,webp|max:5120',
        ];
    }

    /**
     * Get custom validation messages.
     */
    public function messages(): array
    {
        return [
            'slug.unique' => 'This slug is already in use. Please choose a different one.',
            'slug.regex' => 'The slug can only contain lowercase letters, numbers, and hyphens.',
            'profile_photo.max' => 'Profile photo must not exceed 5MB.',
            'cover_image.max' => 'Cover image must not exceed 5MB.',
        ];
    }
}
