<?php

use App\Models\BusinessCard;
use App\Models\User;

beforeEach(function () {
    $admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
        'is_active' => true,
        'email_verified_at' => now(),
    ]);
});

test('published active cards are publicly accessible', function () {
    $card = BusinessCard::create([
        'name' => 'Published Card',
        'full_name' => 'John Doe',
        'slug' => 'john-doe',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'published',
        'is_active' => true,
        'created_by' => User::first()->id,
    ]);

    $response = $this->get("/john-doe");

    $response->assertOk();
    $response->assertInertia(fn($page) => $page
        ->component('public/card-display')
        ->has('card')
    );
});

test('draft cards are not publicly accessible', function () {
    $card = BusinessCard::create([
        'name' => 'Draft Card',
        'full_name' => 'Jane Doe',
        'slug' => 'jane-doe',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'draft',
        'is_active' => true,
        'created_by' => User::first()->id,
    ]);

    $response = $this->get("/jane-doe");

    $response->assertNotFound();
});

test('inactive cards are not publicly accessible', function () {
    $card = BusinessCard::create([
        'name' => 'Inactive Card',
        'full_name' => 'Bob Smith',
        'slug' => 'bob-smith',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'published',
        'is_active' => false,
        'created_by' => User::first()->id,
    ]);

    $response = $this->get("/bob-smith");

    $response->assertNotFound();
});

test('unknown slugs return 404', function () {
    $response = $this->get("/non-existent-card");

    $response->assertNotFound();
});
