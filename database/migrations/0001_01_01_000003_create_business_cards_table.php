<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('business_cards', function (Blueprint $table) {
            $table->id();

            // Identity and publishing
            $table->string('name')->index();
            $table->string('slug')->unique();
            $table->enum('status', ['draft', 'published'])->default('draft');
            $table->boolean('is_active')->default(true);
            $table->timestamp('published_at')->nullable();

            // Personal information
            $table->string('full_name');
            $table->string('job_title')->nullable();
            $table->string('company_name')->nullable();
            $table->string('department')->nullable();
            $table->string('profile_photo')->nullable(); // path in storage
            $table->string('cover_image')->nullable();
            $table->text('short_bio')->nullable();
            $table->text('description')->nullable();

            // Contact information
            $table->string('email')->nullable();
            $table->string('phone')->nullable();
            $table->string('alternate_phone')->nullable();
            $table->string('whatsapp_number')->nullable();
            $table->string('website')->nullable();
            $table->text('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('postal_code')->nullable();

            // Social media URLs
            $table->string('linkedin_url')->nullable();
            $table->string('facebook_url')->nullable();
            $table->string('instagram_url')->nullable();
            $table->string('x_url')->nullable();
            $table->string('youtube_url')->nullable();
            $table->string('github_url')->nullable();

            // Design configuration
            $table->string('theme')->default('corporate');
            $table->string('primary_color')->default('#4F46E5');
            $table->string('secondary_color')->default('#7C3AED');
            $table->string('accent_color')->default('#06B6D4');
            $table->string('background_color')->nullable();
            $table->string('font_family')->default('sans');
            $table->json('custom_settings')->nullable();

            // Ownership and timestamps
            $table->foreignId('created_by')->constrained('users')->onDelete('restrict');
            $table->foreignId('updated_by')->nullable()->constrained('users')->onDelete('set null');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('business_cards');
    }
};
