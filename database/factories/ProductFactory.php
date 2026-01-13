<?php

namespace Database\Factories;

use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Product>
 */
class ProductFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $name = fake()->words(3, true);
        $categories = ['prescription', 'vitamins-supplements', 'skincare', 'baby-mother', 'sexual-health', 'daily-needs'];

        return [
            'name' => ucwords($name),
            'slug' => str($name)->slug(),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 500, 25000),
            'category' => fake()->randomElement($categories),
            'image' => 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&q=80&w=400',
            'stock' => fake()->numberBetween(10, 100),
        ];
    }
}
