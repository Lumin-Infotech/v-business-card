<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreBusinessCardRequest;
use App\Http\Requests\UpdateBusinessCardRequest;
use App\Models\BusinessCard;
use App\Services\ImageUploadService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class BusinessCardController extends Controller
{
    /**
     * Display a listing of business cards.
     */
    public function index(Request $request): Response
    {
        $query = BusinessCard::query();

        // Search
        if ($search = $request->get('search')) {
            $query->where('full_name', 'like', "%{$search}%")
                ->orWhere('company_name', 'like', "%{$search}%")
                ->orWhere('slug', 'like', "%{$search}%");
        }

        // Filter by status
        if ($status = $request->get('status')) {
            $query->where('status', $status);
        }

        // Filter by theme
        if ($theme = $request->get('theme')) {
            $query->where('theme', $theme);
        }

        $cards = $query->orderBy('created_at', 'desc')
            ->paginate(15)
            ->withQueryString();

        return Inertia::render('admin/cards/index', [
            'cards' => $cards,
            'filters' => [
                'search' => $search ?? '',
                'status' => $status ?? '',
                'theme' => $theme ?? '',
            ],
        ]);
    }

    /**
     * Show the form for creating a new business card.
     */
    public function create(): Response
    {
        return Inertia::render('admin/cards/create');
    }

    /**
     * Store a newly created business card in database.
     */
    public function store(StoreBusinessCardRequest $request): RedirectResponse
    {
        $data = $request->validated();
        $data['created_by'] = auth()->id();

        // Generate slug if not provided
        if (empty($data['slug'])) {
            $data['slug'] = BusinessCard::generateSlug($data['full_name']);
        }

        // Check for reserved slugs
        if (BusinessCard::isSlugReserved($data['slug'])) {
            return back()->withInput()->withErrors(['slug' => 'This slug is reserved for system use.']);
        }

        // THEME SELECTION - User selects theme, colors/fonts come from config
        // Theme is validated but colors are NOT user-customizable
        $selectedTheme = $data['theme'] ?? config('themes.default');
        $themeConfig = config('themes.themes.' . $selectedTheme);

        if ($themeConfig) {
            // Keep the selected theme
            $data['theme'] = $selectedTheme;
            // Lock colors and fonts to the selected theme's configuration
            $data['primary_color'] = $themeConfig['primary_color'];
            $data['secondary_color'] = $themeConfig['secondary_color'];
            $data['accent_color'] = $themeConfig['accent_color'];
            $data['background_color'] = $themeConfig['background_color'];
            $data['font_family'] = $themeConfig['font_family'];
        }

        // Handle image uploads
        if ($request->hasFile('profile_photo')) {
            $data['profile_photo'] = ImageUploadService::uploadProfilePhoto(
                $request->file('profile_photo'),
                $data['slug']
            );
        }

        if ($request->hasFile('cover_image')) {
            $data['cover_image'] = ImageUploadService::uploadCoverImage(
                $request->file('cover_image'),
                $data['slug']
            );
        }

        $card = BusinessCard::create($data);

        return redirect()->route('admin.cards.show', $card)
            ->with('success', 'Business card created successfully.');
    }

    /**
     * Display the specified business card.
     */
    public function show(BusinessCard $card): Response
    {
        return Inertia::render('admin/cards/show', [
            'card' => $card->load('createdBy'),
        ]);
    }

    /**
     * Show the form for editing the specified business card.
     */
    public function edit(BusinessCard $card): Response
    {
        return Inertia::render('admin/cards/edit', [
            'card' => $card->load('createdBy'),
        ]);
    }

    /**
     * Update the specified business card in database.
     */
    public function update(UpdateBusinessCardRequest $request, BusinessCard $card): RedirectResponse
    {
        $data = $request->validated();
        $data['updated_by'] = auth()->id();

        // THEME SELECTION - User can change theme on edit
        // Colors and fonts are always locked to the selected theme's configuration
        $selectedTheme = $data['theme'] ?? $card->theme;
        $themeConfig = config('themes.themes.' . $selectedTheme);

        if ($themeConfig) {
            // Allow theme selection to change
            $data['theme'] = $selectedTheme;
            // Lock colors and fonts to the selected theme's configuration
            $data['primary_color'] = $themeConfig['primary_color'];
            $data['secondary_color'] = $themeConfig['secondary_color'];
            $data['accent_color'] = $themeConfig['accent_color'];
            $data['background_color'] = $themeConfig['background_color'];
            $data['font_family'] = $themeConfig['font_family'];
        }

        // Prevent slug changes (immutable after creation)
        unset($data['slug']);
        $card->slug = $card->slug; // Ensure slug is never updated

        // Handle profile photo upload
        if ($request->hasFile('profile_photo')) {
            // Delete old profile photo if it exists
            if ($card->profile_photo) {
                ImageUploadService::deleteImage($card->profile_photo);
            }
            $data['profile_photo'] = ImageUploadService::uploadProfilePhoto(
                $request->file('profile_photo'),
                $data['slug']
            );
        }

        // Handle cover image upload
        if ($request->hasFile('cover_image')) {
            // Delete old cover image if it exists
            if ($card->cover_image) {
                ImageUploadService::deleteImage($card->cover_image);
            }
            $data['cover_image'] = ImageUploadService::uploadCoverImage(
                $request->file('cover_image'),
                $data['slug']
            );
        }

        $card->update($data);

        return redirect()->route('admin.cards.show', $card)
            ->with('success', 'Business card updated successfully.');
    }

    /**
     * Delete the specified business card.
     */
    public function destroy(BusinessCard $card): RedirectResponse
    {
        $cardName = $card->full_name;

        // Delete associated images
        if ($card->profile_photo) {
            ImageUploadService::deleteImage($card->profile_photo);
        }
        if ($card->cover_image) {
            ImageUploadService::deleteImage($card->cover_image);
        }

        $card->delete();

        return redirect()->route('admin.cards.index')
            ->with('success', "Business card '{$cardName}' deleted successfully.");
    }
}
