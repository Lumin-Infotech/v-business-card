<?php

use App\Models\BusinessCard;
use App\Models\User;

beforeEach(function () {
    $this->admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
        'is_active' => true,
        'email_verified_at' => now(),
    ]);
});

test('admin can create a business card', function () {
    $data = [
        'name' => 'John Doe Card',
        'full_name' => 'John Doe',
        'slug' => 'john-doe',
        'job_title' => 'Software Engineer',
        'company_name' => 'Tech Corp',
        'email' => 'john@example.com',
        'phone' => '+1234567890',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'draft',
        'is_active' => true,
    ];

    $response = $this->actingAs($this->admin)
        ->post('/admin/cards', $data);

    $response->assertRedirect();
    $this->assertDatabaseHas('business_cards', [
        'slug' => 'john-doe',
        'full_name' => 'John Doe',
    ]);
});

test('admin can update a business card', function () {
    $card = BusinessCard::create([
        'name' => 'Original Name',
        'full_name' => 'John Doe',
        'slug' => 'john-doe',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'draft',
        'is_active' => true,
        'created_by' => $this->admin->id,
    ]);

    $response = $this->actingAs($this->admin)
        ->put("/admin/cards/{$card->slug}", [
            'name' => 'Updated Name',
            'full_name' => 'John Doe',
            'slug' => 'john-doe',
            'theme' => 'gradient',
            'primary_color' => '#4F46E5',
            'secondary_color' => '#7C3AED',
            'accent_color' => '#06B6D4',
            'font_family' => 'sans',
            'status' => 'published',
            'is_active' => true,
        ]);

    $response->assertRedirect();
    $card->refresh();
    $this->assertEquals('Updated Name', $card->name);
    $this->assertEquals('published', $card->status);
});

test('admin can delete a business card', function () {
    $card = BusinessCard::create([
        'name' => 'Delete Me',
        'full_name' => 'John Doe',
        'slug' => 'delete-me',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'draft',
        'is_active' => true,
        'created_by' => $this->admin->id,
    ]);

    $response = $this->actingAs($this->admin)
        ->delete("/admin/cards/{$card->slug}");

    $response->assertRedirect();
    $this->assertDatabaseMissing('business_cards', ['id' => $card->id]);
});

test('duplicate slugs are rejected', function () {
    BusinessCard::create([
        'name' => 'First Card',
        'full_name' => 'John Doe',
        'slug' => 'john-doe',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'draft',
        'is_active' => true,
        'created_by' => $this->admin->id,
    ]);

    $response = $this->actingAs($this->admin)
        ->post('/admin/cards', [
            'name' => 'Second Card',
            'full_name' => 'Jane Doe',
            'slug' => 'john-doe',
            'theme' => 'corporate',
            'primary_color' => '#4F46E5',
            'secondary_color' => '#7C3AED',
            'accent_color' => '#06B6D4',
            'font_family' => 'sans',
            'status' => 'draft',
            'is_active' => true,
        ]);

    $response->assertSessionHasErrors('slug');
});

test('reserved slugs cannot be used', function () {
    $response = $this->actingAs($this->admin)
        ->post('/admin/cards', [
            'name' => 'Admin Card',
            'full_name' => 'John Doe',
            'slug' => 'admin',
            'theme' => 'corporate',
            'primary_color' => '#4F46E5',
            'secondary_color' => '#7C3AED',
            'accent_color' => '#06B6D4',
            'font_family' => 'sans',
            'status' => 'draft',
            'is_active' => true,
        ]);

    $response->assertSessionHasErrors('slug');
});
