<?php

namespace App\Providers;

use App\Models\User;
use Illuminate\Support\Facades\Gate;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        // Define authorization gates
        Gate::define('is-admin', function (User $user) {
            return $user->role === 'admin' && $user->is_active;
        });

        Gate::define('is-editor', function (User $user) {
            return in_array($user->role, ['admin', 'editor']) && $user->is_active;
        });

        Gate::define('is-active', function (User $user) {
            return $user->is_active;
        });
    }
}
