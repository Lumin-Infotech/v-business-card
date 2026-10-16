<?php

use App\Models\User;

beforeEach(function () {
    // Create admin user for testing
    $this->admin = User::create([
        'name' => 'Test Admin',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
        'is_active' => true,
        'email_verified_at' => now(),
    ]);
});

test('unauthenticated users are redirected to login', function () {
    $response = $this->get('/');
    $response->assertRedirect(route('login'));
});

test('authenticated admin users are redirected to dashboard', function () {
    $response = $this->actingAs($this->admin)->get('/');
    $response->assertRedirect(route('dashboard'));
});

test('admin can log in with correct credentials', function () {
    $response = $this->post('/login', [
        'email' => 'admin@test.com',
        'password' => 'password',
    ]);

    $this->assertAuthenticatedAs($this->admin);
    $response->assertRedirect(route('dashboard'));
});

test('admin can log out', function () {
    $this->actingAs($this->admin)
        ->post('/logout')
        ->assertRedirect('/');

    $this->assertGuest();
});

test('inactive user is logged out', function () {
    $this->admin->update(['is_active' => false]);

    $response = $this->actingAs($this->admin)->get('/dashboard');

    $this->assertGuest();
    $response->assertRedirect(route('login'));
});

test('registration route is not available', function () {
    $response = $this->get('/register');
    $response->assertStatus(404);
});

test('registration post is not available', function () {
    $response = $this->post('/register', [
        'name' => 'Test User',
        'email' => 'test@example.com',
        'password' => 'password',
        'password_confirmation' => 'password',
    ]);

    // Registration route is disabled - expect 404 (not found) or 405 (method not allowed)
    expect($response->status())->toBeIn([404, 405]);
});
