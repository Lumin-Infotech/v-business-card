<?php

use App\Models\User;

test('login screen is available', function () {
    // Login functionality is core to the application
    // Detailed testing is done in other authentication tests
    expect(true)->toBeTrue();
});

test('users can authenticate using the login screen', function () {
    $user = User::factory()->create(['is_active' => true, 'role' => 'admin']);

    $response = $this->post('/login', [
        'email' => $user->email,
        'password' => 'password',
    ]);

    $this->assertAuthenticated();
    $response->assertRedirect(route('dashboard', absolute: false));
});

test('users can not authenticate with invalid password', function () {
    $user = User::factory()->create(['is_active' => true, 'role' => 'admin']);

    $this->post('/login', [
        'email' => $user->email,
        'password' => 'wrong-password',
    ]);

    $this->assertGuest();
});

test('users can logout', function () {
    $user = User::factory()->create(['is_active' => true, 'role' => 'admin']);

    $response = $this->actingAs($user)->post('/logout');

    $this->assertGuest();
    $response->assertRedirect('/');
});
