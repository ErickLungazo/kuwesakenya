<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Product;
use App\Models\Category;

class ProductSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categories = Category::all();

        if ($categories->isEmpty()) {
            $this->call(CategorySeeder::class);
            $categories = Category::all();
        }

        $products = [
            [
                'name' => 'Handmade Quilt - Sunset', 
                'slug' => 'handmade-quilt-sunset',
                'description' => 'A beautiful quilt with sunset colors, hand-stitched by local artisans.',
                'price' => 120.00,
                'stock_quantity' => 10,
                'image_url' => '/storage/products/product1.jpg',
                'handmade_by' => 'Mama Zawadi',
                'featured' => true,
                'category_slug' => 'quilts'
            ],
            [
                'name' => 'Beaded Necklace - Maasai Style', 
                'slug' => 'beaded-necklace-maasai',
                'description' => 'Vibrant Maasai-inspired beaded necklace, perfect for any occasion.',
                'price' => 35.50,
                'stock_quantity' => 25,
                'image_url' => '/storage/products/product2.jpg',
                'handmade_by' => 'Asha Juma',
                'featured' => false,
                'category_slug' => 'beads-jewelry'
            ],
            [
                'name' => 'Woven Tote Bag - Natural Fibers', 
                'slug' => 'woven-tote-bag',
                'description' => 'Eco-friendly tote bag woven from natural fibers, spacious and durable.',
                'price' => 55.00,
                'stock_quantity' => 15,
                'image_url' => '/storage/products/product3.jpg',
                'handmade_by' => 'Fatuma Ali',
                'featured' => true,
                'category_slug' => 'bags'
            ],
            [
                'name' => 'Wooden Carving - Elephant', 
                'slug' => 'wooden-carving-elephant',
                'description' => 'Intricately carved wooden elephant figurine, a symbol of strength.',
                'price' => 80.00,
                'stock_quantity' => 5,
                'image_url' => '/storage/products/product4.jpg',
                'handmade_by' => 'Jengo Crafts',
                'featured' => false,
                'category_slug' => 'home-decor'
            ],
            [
                'name' => 'Leather Wallet - Hand-tooled', 
                'slug' => 'leather-wallet-tooled',
                'description' => 'Genuine leather wallet with unique hand-tooled designs.',
                'price' => 45.00,
                'stock_quantity' => 20,
                'image_url' => '/storage/products/product5.jpg',
                'handmade_by' => 'Kiongozi Leather',
                'featured' => false,
                'category_slug' => 'accessories'
            ],
            [
                'name' => 'Ceramic Mug - Tribal Pattern', 
                'slug' => 'ceramic-mug-tribal',
                'description' => 'Hand-painted ceramic mug with traditional tribal patterns.',
                'price' => 20.00,
                'stock_quantity' => 30,
                'image_url' => '/storage/products/product6.jpg',
                'handmade_by' => 'Artisan Pottery',
                'featured' => true,
                'category_slug' => 'other'
            ],
            [
                'name' => 'Out of Stock Item', 
                'slug' => 'out-of-stock-item',
                'description' => 'This item is currently out of stock.',
                'price' => 99.99,
                'stock_quantity' => 0,
                'image_url' => '/storage/products/product7.jpg',
                'handmade_by' => 'Unavailable',
                'featured' => false,
                'category_slug' => 'quilts'
            ],
        ];

        foreach ($products as $productData) {
            $category = $categories->where('slug', $productData['category_slug'])->first();
            if ($category) {
                $productData['category_id'] = $category->id; // Add category_id
                unset($productData['category_slug']); // Remove temporary slug key
                Product::create($productData);
            }
        }
    }
}
