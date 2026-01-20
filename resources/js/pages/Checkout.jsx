import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createPageUrl } from "@/utils";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useCart } from '@/CartContext';
import { useAuth } from '@/AuthContext';
import axios from 'axios';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShoppingBag } from "lucide-react";

export default function Checkout() {
    const navigate = useNavigate();
    const { toast } = useToast();
    const { cart, loading: cartLoading, getCartSubtotal, clearCart, fetchCart } = useCart();
    const { user, loading: authLoading } = useAuth();
    const [isProcessing, setIsProcessing] = useState(false);
    const [formData, setFormData] = useState({
        customer_name: "",
        customer_email: "",
        customer_phone: "",
        street: "",
        city: "",
        state: "",
        zip: "",
        country: "USA",
        notes: "",
    });

    const getSubtotal = () => {
        return getCartSubtotal();
    };

    const getShipping = () => 15;
    const getTotal = () => getSubtotal() + getShipping();

    const handleInputChange = (field, value) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsProcessing(true);

        try {
            const orderNumber = `KW-${Date.now()}`;

            const orderData = {
                order_number: orderNumber,
                customer_name: formData.customer_name,
                customer_email: formData.customer_email,
                customer_phone: formData.customer_phone,
                shipping_address: {
                    street: formData.street,
                    city: formData.city,
                    state: formData.state,
                    zip: formData.zip,
                    country: formData.country,
                },
                items: cart.cart_items.map((item) => ({
                    product_id: item.product.id,
                    product_name: item.product.name,
                    quantity: item.quantity,
                    price: item.product.price,
                    total: item.product.price * item.quantity,
                })),
                subtotal: getSubtotal(),
                shipping: getShipping(),
                total: getTotal(),
                status: "pending",
                payment_status: "pending",
                notes: formData.notes,
            };

            await axios.post("/api/orders", orderData);
            fetchCart();

            clearCart();

            toast({
                title: "Order placed successfully!",
                description: "Check your email for confirmation details.",
            });

            navigate(createPageUrl("OrderSuccess") + `?order=${orderNumber}`);
        } catch (error) {
            toast({
                title: "Error placing order",
                description: "Please try again or contact us directly.",
                variant: "destructive",
            });
        }

        setIsProcessing(false);
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-4">
            <div className="max-w-6xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-900 mb-8">
                    Checkout
                </h1>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Checkout Form */}
                    <div className="lg:col-span-2">
                        <form onSubmit={handleSubmit}>
                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Contact Information</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="name">
                                            Full Name *
                                        </Label>
                                        <Input
                                            id="name"
                                            required
                                            value={formData.customer_name}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "customer_name",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="John Doe"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="email">Email *</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            value={formData.customer_email}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "customer_email",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="john@example.com"
                                        />
                                    </div>
                                    <div>
                                        <Label htmlFor="phone">Phone</Label>
                                        <Input
                                            id="phone"
                                            type="tel"
                                            value={formData.customer_phone}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "customer_phone",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="+1 (555) 123-4567"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="mb-6">
                                <CardHeader>
                                    <CardTitle>Shipping Address</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="street">
                                            Street Address *
                                        </Label>
                                        <Input
                                            id="street"
                                            required
                                            value={formData.street}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "street",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="123 Main St"
                                        />
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="city">City *</Label>
                                            <Input
                                                id="city"
                                                required
                                                value={formData.city}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "city",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="New York"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="state">
                                                State *
                                            </Label>
                                            <Input
                                                id="state"
                                                required
                                                value={formData.state}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "state",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="NY"
                                            />
                                        </div>
                                    </div>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div>
                                            <Label htmlFor="zip">
                                                ZIP Code *
                                            </Label>
                                            <Input
                                                id="zip"
                                                required
                                                value={formData.zip}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "zip",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="10001"
                                            />
                                        </div>
                                        <div>
                                            <Label htmlFor="country">
                                                Country *
                                            </Label>
                                            <Input
                                                id="country"
                                                required
                                                value={formData.country}
                                                onChange={(e) =>
                                                    handleInputChange(
                                                        "country",
                                                        e.target.value,
                                                    )
                                                }
                                                placeholder="USA"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <Label htmlFor="notes">
                                            Order Notes (Optional)
                                        </Label>
                                        <Input
                                            id="notes"
                                            value={formData.notes}
                                            onChange={(e) =>
                                                handleInputChange(
                                                    "notes",
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Any special instructions?"
                                        />
                                    </div>
                                </CardContent>
                            </Card>

                            <Button
                                type="submit"
                                className="w-full bg-green-600 hover:bg-green-700 py-6 text-lg"
                                disabled={isProcessing}
                            >
                                {isProcessing ? "Processing..." : "Place Order"}
                            </Button>
                        </form>
                    </div>

                    {/* Order Summary */}
                    <div>
                        <Card className="sticky top-4">
                            <CardHeader>
                                <CardTitle>Order Summary</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-3">
                                    {cart.cart_items.map((item) => (
                                        <div
                                            key={item.id}
                                            className="flex justify-between text-sm"
                                        >
                                            <span className="text-gray-600">
                                                {item.product.name} × {item.quantity}
                                            </span>
                                            <span className="font-medium">
                                                $
                                                {(
                                                    item.product.price * item.quantity
                                                ).toFixed(2)}
                                            </span>
                                        </div>
                                    ))}
                                </div>
                                <Separator />
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

                                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mt-4">
                                    <p className="text-sm text-yellow-900 font-medium mb-2">
                                        📧 Payment Instructions
                                    </p>
                                    <p className="text-xs text-yellow-800">
                                        We'll send you payment instructions via
                                        email after you place your order.
                                    </p>
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}
