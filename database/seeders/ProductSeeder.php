<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = ['prescription', 'vitamins-supplements', 'skincare', 'baby-mother', 'sexual-health', 'daily-needs'];

        foreach ($categories as $category) {
            \App\Models\Product::factory()->count(20)->create([
                'category' => $category,
            ]);
        }
    }
}
