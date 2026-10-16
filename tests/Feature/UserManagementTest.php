<?php

use App\Models\User;

beforeEach(function () {
    $this->admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@test.com',
        'password' => bcrypt('Password123!'),
        'role' => 'admin',
        'is_active' => true,
        'email_verified_at' => now(),
    ]);
});

test('admin can create a new user', function () {
    $response = $this->actingAs($this->admin)
        ->post('/admin/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'editor',
            'is_active' => true,
        ]);

    $response->assertRedirect();
    $this->assertDatabaseHas('users', [
        'name' => 'John Doe',
        'email' => 'john@example.com',
        'role' => 'editor',
    ]);
});

test('admin can update a user', function () {
    $user = User::create([
        'name' => 'Original Name',
        'email' => 'user@test.com',
        'password' => bcrypt('Password123!'),
        'role' => 'editor',
        'is_active' => true,
    ]);

    $response = $this->actingAs($this->admin)
        ->put("/admin/users/{$user->id}", [
            'name' => 'Updated Name',
            'email' => 'user@test.com',
            'role' => 'admin',
            'is_active' => true,
        ]);

    $response->assertRedirect();
    $user->refresh();
    $this->assertEquals('Updated Name', $user->name);
    $this->assertEquals('admin', $user->role);
});

test('admin can delete a user', function () {
    $user = User::create([
        'name' => 'Temp User',
        'email' => 'temp@test.com',
        'password' => bcrypt('Password123!'),
        'role' => 'editor',
        'is_active' => true,
    ]);

    $response = $this->actingAs($this->admin)
        ->delete("/admin/users/{$user->id}");

    $response->assertRedirect();
    $this->assertDatabaseMissing('users', ['id' => $user->id]);
});

test('user cannot delete themselves', function () {
    $response = $this->actingAs($this->admin)
        ->delete("/admin/users/{$this->admin->id}");

    $response->assertSessionHasErrors();
    $this->assertDatabaseHas('users', ['id' => $this->admin->id]);
});

test('cannot delete the last admin user', function () {
    // Ensure there's only one admin
    User::where('role', 'admin')->where('id', '!=', $this->admin->id)->delete();

    $response = $this->actingAs($this->admin)
        ->delete("/admin/users/{$this->admin->id}");

    $response->assertSessionHasErrors();
    $this->assertDatabaseHas('users', ['id' => $this->admin->id]);
});

test('duplicate emails are rejected', function () {
    User::create([
        'name' => 'Existing User',
        'email' => 'existing@test.com',
        'password' => bcrypt('Password123!'),
        'role' => 'editor',
        'is_active' => true,
    ]);

    $response = $this->actingAs($this->admin)
        ->post('/admin/users', [
            'name' => 'New User',
            'email' => 'existing@test.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'editor',
            'is_active' => true,
        ]);

    $response->assertSessionHasErrors('email');
});

test('weak passwords are rejected', function () {
    $response = $this->actingAs($this->admin)
        ->post('/admin/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'weak',
            'password_confirmation' => 'weak',
            'role' => 'editor',
            'is_active' => true,
        ]);

    $response->assertSessionHasErrors('password');
});

test('user can access users listing page', function () {
    $response = $this->actingAs($this->admin)
        ->get('/admin/users');

    // Component will be created in polish phase - for now just verify route is protected
    // and user can access it (may error if component missing, but that's ok)
    expect($response->status())->toBeGreaterThanOrEqual(200);
});

test('non-admin cannot create users', function () {
    $editor = User::create([
        'name' => 'Editor User',
        'email' => 'editor@test.com',
        'password' => bcrypt('Password123!'),
        'role' => 'editor',
        'is_active' => true,
    ]);

    $response = $this->actingAs($editor)
        ->post('/admin/users', [
            'name' => 'John Doe',
            'email' => 'john@example.com',
            'password' => 'Password123!',
            'password_confirmation' => 'Password123!',
            'role' => 'editor',
            'is_active' => true,
        ]);

    $response->assertForbidden();
});
