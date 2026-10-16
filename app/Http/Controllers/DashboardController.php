<?php

namespace App\Http\Controllers;

use App\Models\BusinessCard;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    /**
     * Display the dashboard with statistics.
     */
    public function __invoke(Request $request): Response
    {
        // Get dashboard statistics
        $stats = [
            'total_cards' => BusinessCard::count(),
            'published_cards' => BusinessCard::where('status', 'published')->count(),
            'draft_cards' => BusinessCard::where('status', 'draft')->count(),
            'inactive_cards' => BusinessCard::where('is_active', false)->count(),
            'total_users' => $request->user()->role === 'admin' ? \App\Models\User::count() : null,
        ];

        // Get recently created cards
        $recent_cards = BusinessCard::orderBy('created_at', 'desc')
            ->take(5)
            ->get(['id', 'slug', 'full_name', 'company_name', 'status', 'created_at']);

        return Inertia::render('dashboard', [
            'stats' => $stats,
            'recent_cards' => $recent_cards,
        ]);
    }
}
