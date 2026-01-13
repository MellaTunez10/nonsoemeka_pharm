<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    public function index(Request $request): Response
    {
        $categories = ['prescription', 'vitamins-supplements', 'skincare', 'baby-mother', 'sexual-health', 'daily-needs'];
        $productsByCategory = [];

        foreach ($categories as $category) {
            $productsByCategory[$category] = Product::query()
                ->where('category', $category)
                ->when($request->input('search'), function ($query, $search) {
                    $query->where('name', 'like', "%{$search}%");
                })
                ->paginate(6, ['*'], $category . '_page')
                ->withQueryString();
        }

        return Inertia::render('Products', [
            'productsByCategory' => $productsByCategory,
            'filters' => $request->only(['search']),
        ]);
    }
}