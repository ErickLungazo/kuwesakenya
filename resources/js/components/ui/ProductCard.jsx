import React from "react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Heart } from "lucide-react";

/**
 * ProductCard Component
 * Displays a single product with image, details, and add to cart functionality
 *
 * @param {Object} product - Product object with name, description, price, etc.
 * @param {Function} onAddToCart - Callback when add to cart is clicked
 * @param {boolean} showStock - Whether to show stock quantity
 */
export default function ProductCard({
    product,
    onAddToCart,
    showStock = false,
}) {
    const isOutOfStock = product.stock_quantity === 0;

    return (
        <Card className="group hover:shadow-xl transition-all duration-300 h-full flex flex-col">
            <div className="relative overflow-hidden">
                <img
                    src={
                        product.image_url ||
                        "https://images.unsplash.com/photo-1595341595112-6add1c9c19eb?w=400"
                    }
                    alt={product.name}
                    className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />

                {/* Featured Badge */}
                {product.featured && (
                    <Badge className="absolute top-2 right-2 bg-yellow-400 text-gray-900">
                        <Heart className="w-3 h-3 mr-1" />
                        Featured
                    </Badge>
                )}

                {/* Out of Stock Overlay */}
                {isOutOfStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="destructive" className="text-lg">
                            Out of Stock
                        </Badge>
                    </div>
                )}

                {/* Category Badge */}
                {product.category && (
                    <Badge
                        variant="secondary"
                        className="absolute top-2 left-2 text-xs"
                    >
                        {product.category.replace(/_/g, " ")}
                    </Badge>
                )}
            </div>

            <CardContent className="p-4 flex-1 flex flex-col">
                <h3 className="font-semibold text-lg mb-2 text-gray-900 line-clamp-2">
                    {product.name}
                </h3>

                <p className="text-sm text-gray-600 mb-3 line-clamp-2 flex-1">
                    {product.description}
                </p>

                {/* Handmade By */}
                {product.handmade_by && (
                    <p className="text-xs text-green-600 mb-2">
                        Handmade by: {product.handmade_by}
                    </p>
                )}

                {/* Stock Info */}
                {showStock && product.stock_quantity > 0 && (
                    <p className="text-xs text-gray-500 mb-2">
                        {product.stock_quantity} in stock
                    </p>
                )}

                {/* Price */}
                <div className="flex items-center justify-between mt-auto">
                    <span className="text-2xl font-bold text-green-700">
                        ${product.price?.toFixed(2)}
                    </span>
                </div>
            </CardContent>

            <CardFooter className="p-4 pt-0">
                <Button
                    className="w-full bg-green-600 hover:bg-green-700"
                    onClick={() => onAddToCart(product)}
                    disabled={isOutOfStock}
                >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    {isOutOfStock ? "Out of Stock" : "Add to Cart"}
                </Button>
            </CardFooter>
        </Card>
    );
}
