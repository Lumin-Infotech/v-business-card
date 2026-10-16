<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class AdminUserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * The seeder is idempotent: it checks if an admin exists before creating.
     * Use environment variables to configure the default admin:
     *   - ADMIN_NAME (default: "Administrator")
     *   - ADMIN_EMAIL (default: "admin@example.com")
     *   - ADMIN_PASSWORD (default: "password")
     *
     * In production, provide secure credentials via .env.
     *
     * To seed the admin user:
     *   php artisan db:seed --class=AdminUserSeeder
     */
    public function run(): void
    {
        // Check if an admin user already exists
        $existingAdmin = User::where('role', 'admin')->first();

        if ($existingAdmin) {
            $this->command->info('Admin user already exists. Skipping seeder.');
            return;
        }

        // Get environment variables with sensible defaults for local development
        $name = env('ADMIN_NAME', 'Administrator');
        $email = env('ADMIN_EMAIL', 'admin@example.com');
        $password = env('ADMIN_PASSWORD', 'password');

        // Create the admin user
        User::create([
            'name' => $name,
            'email' => $email,
            'password' => Hash::make($password),
            'role' => 'admin',
            'is_active' => true,
            'email_verified_at' => now(),
        ]);

        $this->command->info("Admin user created successfully!");
        $this->command->info("Email: {$email}");
        $this->command->line("Use the email and password configured in your .env file to log in.");
    }
}
