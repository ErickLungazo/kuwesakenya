<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = [
            ['name' => 'Quilts', 'slug' => 'quilts', 'description' => 'Handmade quilts with unique designs.'],
            ['name' => 'Beads & Jewelry', 'slug' => 'beads-jewelry', 'description' => 'Beautiful handcrafted beads and jewelry.'],
            ['name' => 'Bags', 'slug' => 'bags', 'description' => 'Stylish and durable handmade bags.'],
            ['name' => 'Home Decor', 'slug' => 'home-decor', 'description' => 'Unique items to beautify your home.'],
            ['name' => 'Accessories', 'slug' => 'accessories', 'description' => 'Various handmade accessories.'],
            ['name' => 'Other', 'slug' => 'other', 'description' => 'Miscellaneous handcrafted items.'],
        ];

        foreach ($categories as $category) {
            Category::create($category);
        }
    }
}
