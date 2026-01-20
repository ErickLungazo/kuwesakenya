import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { useCart } from '@/CartContext';
import { useAuth } from '@/AuthContext';

export default function Cart() {
    const navigate = useNavigate();
    const { cart, loading, updateCartItem, removeCartItem, getCartSubtotal } = useCart();
    const { user, loading: authLoading } = useAuth();

    const updateQuantity = async (cartItemId, delta) => {
        const currentItem = cart?.cart_items?.find(item => item.id === cartItemId);
        if (currentItem) {
            const newQuantity = Math.max(1, currentItem.quantity + delta);
            await updateCartItem(cartItemId, newQuantity);
        }
    };

    const removeItem = async (cartItemId) => {
        await removeCartItem(cartItemId);
    };

    const getSubtotal = () => {
        return getCartSubtotal(); // Use the function from CartContext
    };

    const getShipping = () => {
        return cart?.cart_items?.length > 0 ? 15 : 0;
    };

    const getTotal = () => {
        return getSubtotal() + getShipping();
    };

    const handleCheckout = () => {
        if (!user) {
            navigate(createPageUrl("Login"));
            return;
        }
        if (cart?.cart_items?.length === 0) return;
        navigate(createPageUrl("Checkout"));
    };

    if (authLoading || loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <p>Loading cart...</p>
            </div>
        );
    }

    if (!user) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 py-12 px-4">
                <Card className="text-center py-10 px-6">
                    <CardContent>
                        <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                        <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                            Please log in to view your cart
                        </h2>
                        <p className="text-gray-500 mb-6">
                            Your cart is saved to your account.
                        </p>
                        <Link to={createPageUrl("Login")}>
                            <Button className="bg-green-600 hover:bg-green-700">
                                Log In
                            </Button>
                        </Link>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-8">
                    <Link to={createPageUrl("Shop")}>
                        <Button variant="ghost" className="mb-4">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Continue Shopping
                        </Button>
                    </Link>
                    <h1 className="text-4xl font-bold text-gray-900">
                        Shopping Cart
                    </h1>
                </div>

                {cart?.cart_items?.length === 0 ? (
                    <Card className="text-center py-20">
                        <CardContent>
                            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                            <h2 className="text-2xl font-semibold text-gray-600 mb-2">
                                Your cart is empty
                            </h2>
                            <p className="text-gray-500 mb-6">
                                Add some beautiful handcrafted items to get
                                started
                            </p>
                            <Link to={createPageUrl("Shop")}>
                                <Button className="bg-green-600 hover:bg-green-700">
                                    Browse Products
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Cart Items */}
                        <div className="lg:col-span-2 space-y-4">
                            {cart?.cart_items?.map((item) => (
                                <Card key={item.id}>
                                    <CardContent className="p-6">
                                        <div className="flex gap-4">
                                            <img
                                                src={
                                                    item.product.image_url ||
                                                    "https://images.unsplash.com/photo-1595341595112-6add1c9c19eb?w=200"
                                                }
                                                alt={item.product.name}
                                                className="w-24 h-24 object-cover rounded-lg"
                                            />
                                            <div className="flex-1">
                                                <h3 className="font-semibold text-lg mb-1">
                                                    {item.product.name}
                                                </h3>
                                                <p className="text-sm text-gray-600 mb-3">
                                                    {item.product.category?.replace(
                                                        /_/g,
                                                        " ",
                                                    )}
                                                </p>
                                                <div className="flex items-center gap-4">
                                                    <div className="flex items-center gap-2 border rounded-lg">
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    -1,
                                                                )
                                                            }
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </Button>
                                                        <span className="w-8 text-center font-medium">
                                                            {item.quantity}
                                                        </span>
                                                        <Button
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() =>
                                                                updateQuantity(
                                                                    item.id,
                                                                    1,
                                                                )
                                                            }
                                                            className="h-8 w-8 p-0"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                    <span className="text-lg font-bold text-green-700">
                                                        $
                                                        {(
                                                            item.product.price *
                                                            item.quantity
                                                        ).toFixed(2)}
                                                    </span>
                                                </div>
                                            </div>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                onClick={() =>
                                                    removeItem(item.id)
                                                }
                                                className="text-red-500 hover:text-red-700 hover:bg-red-50"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>

                        {/* Order Summary */}
                        <div>
                            <Card className="sticky top-4">
                                <CardHeader>
                                    <CardTitle>Order Summary</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex justify-between text-gray-600">
                                        <span>Subtotal</span>
                                        <span>${getSubtotal().toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-gray-600">
                                        <span>Shipping</span>
                                        <span>${getShipping().toFixed(2)}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between text-lg font-bold">
                                        <span>Total</span>
                                        <span className="text-green-700">
                                            ${getTotal().toFixed(2)}
                                        </span>
                                    </div>

                                    <Button
                                        className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                                        onClick={handleCheckout}
                                    >
                                        Proceed to Checkout
                                    </Button>

                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-4">
                                        <p className="text-sm text-green-800 font-medium">
                                            🌍 Your purchase supports clean
                                            water projects and empowers artisans
                                            in Kenya
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
