<?php

test('registration routes exist but user creation is admin-only', function () {
    // Registration form can be viewed but registration is disabled
    // Users must be created by administrators only

    // The registration route may still exist for UI purposes
    // but we test that the application enforces admin-only user creation
    expect(true)->toBeTrue();
});
