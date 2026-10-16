<?php

it('returns a redirect response for unauthenticated users', function () {
    $response = $this->get('/');

    // Home route redirects to login for unauthenticated users
    $response->assertStatus(302);
    $response->assertRedirect('/login');
});
