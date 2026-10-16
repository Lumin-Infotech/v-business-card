<?php

use App\Http\Controllers\AnalyticsController;
use App\Http\Controllers\BusinessCardController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\PublicCardController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;

// Home route: redirect based on auth status
Route::get('/', function () {
    if (auth()->check()) {
        return redirect()->route('dashboard');
    }
    return redirect()->route('login');
})->name('home');

Route::middleware(['auth', 'active.user'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    // Admin routes
    Route::prefix('admin')->name('admin.')->group(function () {
        // Analytics
        Route::get('analytics', [AnalyticsController::class, 'index'])->name('analytics');

        // Business cards
        Route::resource('cards', BusinessCardController::class)->names([
            'index' => 'cards.index',
            'create' => 'cards.create',
            'store' => 'cards.store',
            'show' => 'cards.show',
            'edit' => 'cards.edit',
            'update' => 'cards.update',
            'destroy' => 'cards.destroy',
        ])->parameter('card', 'card');

        // Users
        Route::resource('users', UserController::class)->names([
            'index' => 'users.index',
            'create' => 'users.create',
            'store' => 'users.store',
            'show' => 'users.show',
            'edit' => 'users.edit',
            'update' => 'users.update',
            'destroy' => 'users.destroy',
        ])->parameter('user', 'user');
    });
});

// Public card routes - must be last to avoid catching admin routes
Route::get('/{slug}', [PublicCardController::class, 'show'])->where('slug', '[a-z0-9\-]+')->name('public.card');
Route::get('/{slug}/qr', [PublicCardController::class, 'qr'])->where('slug', '[a-z0-9\-]+')->name('public.card.qr');
Route::get('/{slug}/contact', [PublicCardController::class, 'downloadContact'])->where('slug', '[a-z0-9\-]+')->name('public.card.contact');

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
