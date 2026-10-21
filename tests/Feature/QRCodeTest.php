<?php

use App\Models\BusinessCard;
use App\Models\User;
use App\Services\QRCodeService;
use App\Services\VCardService;

beforeEach(function () {
    $admin = User::create([
        'name' => 'Admin User',
        'email' => 'admin@test.com',
        'password' => bcrypt('password'),
        'role' => 'admin',
        'is_active' => true,
        'email_verified_at' => now(),
    ]);

    $this->card = BusinessCard::create([
        'name' => 'Test Card',
        'full_name' => 'John Doe',
        'slug' => 'john-doe-qr',
        'email' => 'john@example.com',
        'phone' => '+1234567890',
        'job_title' => 'Software Engineer',
        'company_name' => 'Tech Corp',
        'theme' => 'corporate',
        'primary_color' => '#4F46E5',
        'secondary_color' => '#7C3AED',
        'accent_color' => '#06B6D4',
        'font_family' => 'sans',
        'status' => 'published',
        'is_active' => true,
        'created_by' => $admin->id,
    ]);
});

test('qr code can be generated from service', function () {
    $qrPng = QRCodeService::generatePng(url('/john-doe-qr'));
    expect($qrPng)->not->toBeNull();
    expect(strlen($qrPng))->toBeGreaterThan(0);
});

test('qr code endpoint returns png image for display', function () {
    $response = $this->get('/john-doe-qr/qr');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'image/png');
    // QR endpoint displays inline (no attachment header)
    expect($response->headers->get('Content-Disposition'))->toBeNull();
});

test('qr code download endpoint returns png as attachment', function () {
    $response = $this->get('/john-doe-qr/qr/download');

    $response->assertOk();
    $response->assertHeader('Content-Type', 'image/png');
    // Download endpoint forces download
    $response->assertHeader('Content-Disposition', 'attachment; filename="john-doe-qr-qr.png"');
});

test('qr code endpoint not found for draft cards', function () {
    $this->card->update(['status' => 'draft']);

    $response = $this->get('/john-doe-qr/qr');

    $response->assertNotFound();
});

test('qr code endpoint not found for inactive cards', function () {
    $this->card->update(['is_active' => false]);

    $response = $this->get('/john-doe-qr/qr');

    $response->assertNotFound();
});

test('vcard can be generated from service', function () {
    $vcard = VCardService::generate($this->card, config('app.url'));

    expect($vcard)->toContain('BEGIN:VCARD');
    expect($vcard)->toContain('END:VCARD');
    expect($vcard)->toContain('John Doe');
    expect($vcard)->toContain('john@example.com');
    expect($vcard)->toContain('+1234567890');
});

test('vcard endpoint returns vcf file', function () {
    $response = $this->get('/john-doe-qr/contact');

    $response->assertOk();
    expect($response->headers->get('Content-Type'))->toContain('text/vcard');
    expect($response->getContent())->toContain('BEGIN:VCARD');
});

test('vcard endpoint not found for draft cards', function () {
    $this->card->update(['status' => 'draft']);

    $response = $this->get('/john-doe-qr/contact');

    $response->assertNotFound();
});

test('vcard filename generated correctly', function () {
    $filename = VCardService::getFilename($this->card);
    expect($filename)->toBe('john-doe.vcf');
});
