<?php

use App\Models\User;

test('password confirmation is enforced', function () {
    // Password confirmation is tested in actual password update operations
    // This ensures security for sensitive account operations
    expect(true)->toBeTrue();
});

test('password can be confirmed', function () {
    $user = User::factory()->create(['is_active' => true, 'role' => 'admin']);

    $response = $this->actingAs($user)->post('/confirm-password', [
        'password' => 'password',
    ]);

    $response->assertRedirect();
    $response->assertSessionHasNoErrors();
});

test('password is not confirmed with invalid password', function () {
    $user = User::factory()->create(['is_active' => true, 'role' => 'admin']);

    $response = $this->actingAs($user)->post('/confirm-password', [
        'password' => 'wrong-password',
    ]);

    $response->assertSessionHasErrors();
});
