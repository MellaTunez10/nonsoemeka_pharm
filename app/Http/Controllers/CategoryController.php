<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;

class CategoryController extends Controller
{
    public function show(string $slug): Response
    {
        $mapping = [
            'prescription' => 'categories/Prescription',
            'vitamins-supplements' => 'categories/Vitamins',
            'skincare' => 'categories/Skincare',
            'baby-mother' => 'categories/BabyAndMother',
            'sexual-health' => 'categories/SexualHealth',
            'daily-needs' => 'categories/DailyNeeds',
        ];

        $component = $mapping[$slug] ?? 'page';

        $products = Product::where('category', $slug)->paginate(12);

        return Inertia::render($component, [
            'slug' => $slug,
            'title' => str_replace('-', ' ', ucwords($slug, '-')),
            'products' => $products,
        ]);
    }
}
