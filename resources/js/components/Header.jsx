import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { createPageUrl } from "@/utils";
import {
    Home,
    ShoppingBag,
    Heart,
    BookOpen,
    Phone,
    Menu,
    ShoppingCart,
    Droplets,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetTrigger,
    SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/AuthContext';
import { useCart } from '@/CartContext';

const navigationItems = [
    { title: "Home", url: createPageUrl("Home"), icon: Home },
    { title: "Our Mission", url: createPageUrl("Mission"), icon: Droplets },
    { title: "Shop", url: createPageUrl("Shop"), icon: ShoppingBag },
    { title: "Donate", url: createPageUrl("Donate"), icon: Heart },
    { title: "Impact Stories", url: createPageUrl("Impact"), icon: BookOpen },
    { title: "Contact", url: createPageUrl("Contact"), icon: Phone },
];

export default function Header() {
    const location = useLocation();
    const { user, logout, loading } = useAuth();
    const { getCartCount } = useCart();

    const cartCount = getCartCount();

    return (
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    {/* Logo */}
                    <Link
                        to={createPageUrl("Home")}
                        className="flex items-center gap-3"
                    >
                        <div
                            className="w-10 h-10 rounded-full flex items-center justify-center"
                            style={{
                                background:
                                    "linear-gradient(135deg, var(--kuwesa-green), var(--kuwesa-gold))",
                            }}
                        >
                            <Droplets className="w-6 h-6 text-white" />
                        </div>
                        <div>
                            <h1
                                className="text-xl font-bold"
                                style={{ color: "var(--kuwesa-green)" }}
                            >
                                Kuwesa
                            </h1>
                            <p className="text-xs text-gray-500">Can do</p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden md:flex items-center gap-6">
                        {navigationItems.map((item) => (
                            <Link
                                key={item.title}
                                to={item.url}
                                className={`text-sm font-medium transition-colors hover:text-green-600 ${
                                    location.pathname === item.url
                                        ? "text-green-600"
                                        : "text-gray-700"
                                }`}
                            >
                                {item.title}
                            </Link>
                        ))}
                        {!loading && (
                            user ? (
                                <> 
                                    <span className="text-sm font-medium text-gray-700">Hi, {user.name}</span>
                                    <Button variant="ghost" onClick={logout} className="text-sm font-medium text-gray-700 hover:text-green-600">
                                        Logout
                                    </Button>
                                </> 
                            ) : (
                                <> 
                                    <Link to={createPageUrl("Login")} className="text-sm font-medium text-gray-700 hover:text-green-600">
                                        Login
                                    </Link>
                                    <Link to={createPageUrl("Register")} className="text-sm font-medium text-gray-700 hover:text-green-600">
                                        Register
                                    </Link>
                                </> 
                            )
                        )}
                        <Link
                            to={createPageUrl("Cart")}
                            className="relative"
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                className="relative"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {cartCount > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600 text-white text-xs">
                                        {cartCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>
                    </nav>

                    {/* Mobile Menu */}
                    <div className="md:hidden flex items-center gap-2">
                        <Link
                            to={createPageUrl("Cart")}
                            className="relative"
                        >
                            <Button
                                variant="outline"
                                size="icon"
                                className="relative"
                            >
                                <ShoppingCart className="w-4 h-4" />
                                {cartCount > 0 && (
                                    <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-green-600 text-white text-xs">
                                        {cartCount}
                                    </Badge>
                                )}
                            </Button>
                        </Link>

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon">
                                    <Menu className="w-5 h-5" />
                                </Button>
                            </SheetTrigger>
                            <SheetContent
                                side="right"
                                className="w-[85vw] sm:max-w-md"
                            >
                                {/* Sheet Header */}
                                <div className="flex items-center justify-between mb-8">
                                    <Link
                                        to={createPageUrl("Home")}
                                        className="flex items-center gap-3"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        <div
                                            className="w-8 h-8 rounded-full flex items-center justify-center"
                                            style={{
                                                background:
                                                    "linear-gradient(135deg, var(--kuwesa-green), var(--kuwesa-gold))",
                                            }}
                                        >
                                            <Droplets className="w-4 h-4 text-white" />
                                        </div>
                                        <div>
                                            <h1
                                                className="text-lg font-bold"
                                                style={{
                                                    color: "var(--kuwesa-green)",
                                                }}
                                            >
                                                Kuwesa
                                            </h1>
                                            <p className="text-xs text-gray-500">
                                                Can do
                                            </p>
                                        </div>
                                    </Link>
                                </div>

                                {/* Navigation Items */}
                                <nav className="flex flex-col gap-2">
                                    {navigationItems.map((item) => (
                                        <SheetClose
                                            asChild
                                            key={item.title}
                                        >
                                            <Link
                                                to={item.url}
                                                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                                                    location.pathname ===
                                                    item.url
                                                        ? "bg-green-50 text-green-600 border-l-4 border-green-600"
                                                        : "text-gray-700 hover:bg-gray-100 border-l-4 border-transparent"
                                                }`}
                                            >
                                                <item.icon className="w-5 h-5" />
                                                <span className="font-medium">
                                                    {item.title}
                                                </span>
                                            </Link>
                                        </SheetClose>
                                    ))}
                                    {!loading && (
                                        user ? (
                                            <> 
                                                <SheetClose asChild>
                                                    <span className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700">Hi, {user.name}</span>
                                                </SheetClose>
                                                <SheetClose asChild>
                                                    <Button variant="ghost" onClick={logout} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 border-l-4 border-transparent w-full justify-start">
                                                        Logout
                                                    </Button>
                                                </SheetClose>
                                            </> 
                                        ) : (
                                            <> 
                                                <SheetClose asChild>
                                                    <Link to={createPageUrl("Login")} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 border-l-4 border-transparent">
                                                        Login
                                                    </Link>
                                                </SheetClose>
                                                <SheetClose asChild>
                                                    <Link to={createPageUrl("Register")} className="flex items-center gap-3 px-4 py-3 rounded-lg text-gray-700 hover:bg-gray-100 border-l-4 border-transparent">
                                                        Register
                                                    </Link>
                                                </SheetClose>
                                            </> 
                                        )
                                    )}
                                </nav>

                                {/* Mobile Cart Summary */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <SheetClose asChild>
                                        <Link
                                            to={createPageUrl("Cart")}
                                            className="flex items-center justify-between px-4 py-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-3">
                                                <ShoppingCart className="w-5 h-5 text-gray-700" />
                                                <span className="font-medium text-gray-700">
                                                    View Cart
                                                </span>
                                            </div>
                                            {cartCount > 0 && (
                                                <Badge
                                                    variant="default"
                                                    className="bg-green-600 text-white"
                                                >
                                                    {cartCount} item
                                                    {cartCount !== 1
                                                        ? "s"
                                                        : ""}
                                                </Badge>
                                            )}
                                        </Link>
                                    </SheetClose>
                                </div>

                                {/* Contact Info in Mobile Menu */}
                                <div className="mt-8 pt-6 border-t border-gray-200">
                                    <div className="px-4">
                                        <h4 className="text-sm font-semibold text-gray-900 mb-3">
                                            Contact Us
                                        </h4>
                                        <div className="space-y-2 text-sm text-gray-600">
                                            <p>
                                                Kenya: 011-254-727 640 569
                                            </p>
                                            <p>
                                                Email: kuwesakenya@gmail.com
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </SheetContent>
                        </Sheet>
                    </div>
                </div>
            </div>
        </header>
    );
}
