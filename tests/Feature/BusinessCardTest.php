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

test('can update card without changing any fields', function () {
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

    // Update with all the same values - should succeed
    $response = $this->actingAs($this->admin)
        ->put("/admin/cards/{$card->slug}", [
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
        ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
    $card->refresh();
    $this->assertEquals('Original Name', $card->name);
});

test('can update only card name and preserve other values', function () {
    $card = BusinessCard::create([
        'name' => 'Original Name',
        'full_name' => 'John Doe',
        'slug' => 'john-doe',
        'job_title' => 'Engineer',
        'company_name' => 'Tech Corp',
        'theme' => 'gradient',
        'primary_color' => '#FF5733',
        'secondary_color' => '#33FF57',
        'accent_color' => '#3357FF',
        'font_family' => 'serif',
        'status' => 'published',
        'is_active' => true,
        'created_by' => $this->admin->id,
    ]);

    $response = $this->actingAs($this->admin)
        ->put("/admin/cards/{$card->slug}", [
            'name' => 'Updated Name',
            'full_name' => 'John Doe',
            'slug' => 'john-doe',
            'job_title' => 'Engineer',
            'company_name' => 'Tech Corp',
            'theme' => 'gradient',
            'primary_color' => '#FF5733',
            'secondary_color' => '#33FF57',
            'accent_color' => '#3357FF',
            'font_family' => 'serif',
            'status' => 'published',
            'is_active' => true,
        ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
    $card->refresh();
    $this->assertEquals('Updated Name', $card->name);
    $this->assertEquals('gradient', $card->theme);
    $this->assertEquals('serif', $card->font_family);
    $this->assertEquals('published', $card->status);
});

test('can update theme, font family and colors', function () {
    $card = BusinessCard::create([
        'name' => 'Test Card',
        'full_name' => 'John Doe',
        'slug' => 'test-card',
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
            'name' => 'Test Card',
            'full_name' => 'John Doe',
            'slug' => 'test-card',
            'theme' => 'bold',
            'primary_color' => '#FF1493',
            'secondary_color' => '#00CED1',
            'accent_color' => '#FFD700',
            'font_family' => 'mono',
            'status' => 'draft',
            'is_active' => true,
        ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
    $card->refresh();
    $this->assertEquals('bold', $card->theme);
    $this->assertEquals('#FF1493', $card->primary_color);
    $this->assertEquals('#00CED1', $card->secondary_color);
    $this->assertEquals('#FFD700', $card->accent_color);
    $this->assertEquals('mono', $card->font_family);
});

test('can update slug and status', function () {
    $card = BusinessCard::create([
        'name' => 'Test Card',
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
            'name' => 'Test Card',
            'full_name' => 'John Doe',
            'slug' => 'john-doe-updated',
            'theme' => 'corporate',
            'primary_color' => '#4F46E5',
            'secondary_color' => '#7C3AED',
            'accent_color' => '#06B6D4',
            'font_family' => 'sans',
            'status' => 'published',
            'is_active' => true,
        ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
    $this->assertDatabaseHas('business_cards', [
        'slug' => 'john-doe-updated',
        'status' => 'published',
    ]);
});

test('validation errors appear for genuinely missing required fields', function () {
    $card = BusinessCard::create([
        'name' => 'Test Card',
        'full_name' => 'John Doe',
        'slug' => 'test-card',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'draft',
        'is_active' => true,
        'created_by' => $this->admin->id,
    ]);

    // Submit with missing required field
    $response = $this->actingAs($this->admin)
        ->put("/admin/cards/{$card->slug}", [
            'name' => '', // Empty required field
            'full_name' => 'John Doe',
            'slug' => 'test-card',
            'theme' => 'corporate',
            'primary_color' => '#4F46E5',
            'secondary_color' => '#7C3AED',
            'accent_color' => '#06B6D4',
            'font_family' => 'sans',
            'status' => 'draft',
            'is_active' => true,
        ]);

    $response->assertSessionHasErrors('name');
});
