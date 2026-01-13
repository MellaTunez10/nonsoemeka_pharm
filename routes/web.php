<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('page', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
});

Route::get('/category/{slug}', [CategoryController::class, 'show'])->name('category.show');

Route::get('/cart', function () {
    return Inertia::render('Cart');
})->name('cart');

Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// Prescription Flow
Route::get('/prescriptions', function () {
    return Inertia::render('PrescriptionUpload');
})->name('prescriptions');

// Mock Static Pages
$staticPages = ['about', 'contact', 'careers', 'locations', 'rewards', 'consultation', 'delivery', 'privacy', 'terms'];
foreach ($staticPages as $page) {
    Route::get('/' . $page, function () use ($page) {
        return Inertia::render('SimplePage', [
            'title' => ucwords(str_replace('-', ' ', $page)),
            'content' => 'This is a placeholder for the ' . $page . ' page. Content coming soon.'
        ]);
    })->name($page);
}

require __DIR__ . '/settings.php';
