import React, { useState } from "react";
import axios from "axios";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { ShoppingCart, Search, Heart } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/CartContext';
import { useAuth } from '@/AuthContext';

export default function Shop() {
    const { toast } = useToast();
    const [searchQuery, setSearchQuery] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const { addToCart: addItemToCart } = useCart();
    const { user } = useAuth();

    const { data: products, isLoading: isLoadingProducts } = useQuery({
        queryKey: ["products"],
        queryFn: () => axios.get("/api/products").then((res) => res.data),
        initialData: [],
    });

    const { data: categories, isLoading: isLoadingCategories } = useQuery({
        queryKey: ["categories"],
        queryFn: () => axios.get("/api/categories").then((res) => res.data),
        initialData: [],
    });

    const addToCart = async (product) => {
        if (!user) {
            toast({
                title: "Login Required",
                description: "Please log in to add items to your cart.",
                variant: "destructive",
            });
            return;
        }
        try {
            await addItemToCart(product.id, 1); // Add 1 quantity
            toast({
                title: "Added to cart",
                description: `${product.name} has been added to your cart.`,
            });
        } catch (error) {
            toast({
                title: "Error adding to cart",
                description: error.message || "Could not add item to cart.",
                variant: "destructive",
            });
        }
    };

    const filteredProducts = products.filter((product) => {
        const matchesSearch =
            product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
            product.description
                ?.toLowerCase()
                .includes(searchQuery.toLowerCase());
        const matchesCategory =
            categoryFilter === "all" || product.category?.slug === categoryFilter;
        return matchesSearch && matchesCategory;
    });
    const isLoading = isLoadingProducts || isLoadingCategories;

    return (
        <div className="min-h-screen bg-gray-50">
            {/* Header */}
            <section
                className="py-16 px-4"
                style={{
                    background:
                        "linear-gradient(135deg, #2d8659 0%, #f4b932 100%)",
                }}
            >
                <div className="max-w-7xl mx-auto text-center text-white">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">
                        Shop Handcrafted with Love
                    </h1>
                    <p className="text-xl text-white/90 max-w-2xl mx-auto">
                        Every purchase supports HIV-positive widows in Kenya and
                        funds our clean water projects
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-8 px-4 bg-white border-b">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <Input
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select
                            value={categoryFilter}
                            onValueChange={setCategoryFilter}
                        >
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">
                                    All Categories
                                </SelectItem>
                                {categories.map((category) => (
                                    <SelectItem
                                        key={category.id}
                                        value={category.slug}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                </div>
            </section>

            {/* Products Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {isLoading ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {[...Array(8)].map((_, i) => (
                                <Card key={i} className="animate-pulse">
                                    <div className="h-64 bg-gray-200" />
                                    <CardContent className="p-4">
                                        <div className="h-4 bg-gray-200 rounded mb-2" />
                                        <div className="h-3 bg-gray-200 rounded w-2/3" />
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    ) : filteredProducts.length === 0 ? (
                        <div className="text-center py-20">
                            <ShoppingCart className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h3 className="text-xl font-semibold text-gray-600 mb-2">
                                No products found
                            </h3>
                            <p className="text-gray-500">
                                Try adjusting your search or filters
                            </p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {filteredProducts.map((product) => (
                                <Card
                                    key={product.id}
                                    className="group hover:shadow-xl transition-all duration-300"
                                >
                                    <div className="relative overflow-hidden">
                                        <img
                                            src={
                                                product.image_url ||
                                                "https://images.unsplash.com/photo-1588004609009-e3d2e8d2e8d2?w=400"
                                            }
                                            alt={product.name}
                                            className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                                        />
                                        {product.featured && (
                                            <Badge className="absolute top-2 right-2 bg-yellow-400 text-gray-900">
                                                <Heart className="w-3 h-3 mr-1" />
                                                Featured
                                            </Badge>
                                        )}
                                        {product.stock_quantity === 0 && (
                                            <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                                                <Badge
                                                    variant="destructive"
                                                    className="text-lg"
                                                >
                                                    Out of Stock
                                                </Badge>
                                            </div>
                                        )}
                                    </div>
                                    <CardContent className="p-4">
                                        <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
                                            {product.name}
                                        </h3>
                                        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                                            {product.description}
                                        </p>
                                        {product.handmade_by && (
                                            <p className="text-xs text-green-600 mb-2">
                                                Handmade by:{" "}
                                                {product.handmade_by}
                                            </p>
                                        )}
                                        <div className="flex items-center justify-between">
                                            <span className="text-2xl font-bold text-green-700">
                                                ${product.price?.toFixed(2)}
                                            </span>
                                            <Badge
                                                variant="secondary"
                                                className="text-xs"
                                            >
                                                {product.category?.name?.replace(
                                                    /_/g,
                                                    " ",
                                                )}
                                            </Badge>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="p-4 pt-0">
                                        <Button
                                            className="w-full bg-green-600 hover:bg-green-700"
                                            onClick={() => addToCart(product)}
                                            disabled={
                                                product.stock_quantity === 0
                                            }
                                        >
                                            <ShoppingCart className="w-4 h-4 mr-2" />
                                            Add to Cart
                                        </Button>
                                    </CardFooter>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Impact Banner */}
            <section className="py-12 px-4 bg-green-600 text-white">
                <div className="max-w-4xl mx-auto text-center">
                    <h2 className="text-3xl font-bold mb-4">
                        Your Purchase Makes a Difference
                    </h2>
                    <p className="text-lg text-green-100">
                        100% of profits go toward providing clean water
                        solutions and supporting artisan communities in Western
                        Kenya
                    </p>
                </div>
            </section>
        </div>
    );
}
