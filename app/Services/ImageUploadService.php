<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class ImageUploadService
{
    private const UPLOAD_DISK = 'uploads';
    private const PROFILE_PHOTO_DIR = 'profile-photos';
    private const COVER_IMAGE_DIR = 'cover-images';

    /**
     * Upload a profile photo for a business card.
     */
    public static function uploadProfilePhoto(UploadedFile $file, string $slug): string
    {
        return self::storeImage($file, $slug, self::PROFILE_PHOTO_DIR);
    }

    /**
     * Upload a cover image for a business card.
     */
    public static function uploadCoverImage(UploadedFile $file, string $slug): string
    {
        return self::storeImage($file, $slug, self::COVER_IMAGE_DIR);
    }

    /**
     * Store an image file and return the relative path.
     */
    private static function storeImage(UploadedFile $file, string $slug, string $directory): string
    {
        $filename = self::generateFilename($slug, $file->getClientOriginalExtension());
        $path = "{$directory}/{$filename}";

        Storage::disk(self::UPLOAD_DISK)->put($path, file_get_contents($file));

        return $path;
    }

    /**
     * Generate a unique filename for the uploaded image.
     */
    private static function generateFilename(string $slug, string $extension): string
    {
        $timestamp = now()->timestamp;
        $random = str()->random(8);

        return "{$slug}-{$timestamp}-{$random}.{$extension}";
    }

    /**
     * Delete an image from storage.
     */
    public static function deleteImage(string $path): void
    {
        if ($path && Storage::disk(self::UPLOAD_DISK)->exists($path)) {
            Storage::disk(self::UPLOAD_DISK)->delete($path);
        }
    }

    /**
     * Get the full URL for an image.
     */
    public static function getImageUrl(?string $path): ?string
    {
        if (!$path) {
            return null;
        }

        return Storage::disk(self::UPLOAD_DISK)->url($path);
    }
}
