<?php

use App\Models\User;

test('guests are redirected to the login page', function () {
    $this->get('/dashboard')->assertRedirect('/login');
});

test('authenticated users can visit the dashboard', function () {
    // Create an active user with admin role (required for access)
    $this->actingAs($user = User::factory()->create([
        'is_active' => true,
        'role' => 'admin',
    ]));

    $this->get('/dashboard')->assertOk();
});
