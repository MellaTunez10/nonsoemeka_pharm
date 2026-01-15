<?php

use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;

uses(RefreshDatabase::class);

it('renders the products catalog page', function () {
    Product::factory()->count(5)->create([
        'category' => 'prescription',
    ]);

    $response = $this->get(route('products.index'));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Products')
                ->has('productsByCategory')
        );
});

it('renders the product detail page', function () {
    $product = Product::factory()->create();

    $response = $this->get(route('product.show', $product->slug));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('ProductShow')
                ->where('product.id', $product->id)
                ->where('product.name', $product->name)
        );
});

it('can search for products', function () {
    Product::factory()->create([
        'name' => 'Searchable Medicine',
        'category' => 'prescription',
    ]);
    Product::factory()->create([
        'name' => 'Other Product',
        'category' => 'skincare',
    ]);

    $response = $this->get(route('products.index', ['search' => 'Searchable']));

    $response->assertStatus(200)
        ->assertInertia(
            fn ($page) => $page
                ->component('Products')
                ->has('productsByCategory.prescription.data', 1)
                ->has('productsByCategory.skincare.data', 0)
        );
});
