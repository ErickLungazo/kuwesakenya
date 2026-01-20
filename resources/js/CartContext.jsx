import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext'; // Assuming AuthContext is in the same directory

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
    const { user, token, loading: authLoading } = useAuth();
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!authLoading) {
            if (user) {
                fetchCart();
            } else {
                // For guest users, cart remains null or can be handled via localStorage if needed
                // For now, we assume cart is backend-managed for authenticated users
                setCart(null);
                setLoading(false);
            }
        }
    }, [user, token, authLoading]);

    const fetchCart = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('/api/cart');
            setCart(response.data);
        } catch (err) {
            console.error('Failed to fetch cart:', err);
            setError(err);
            setCart(null);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            // Handle guest cart logic (e.g., redirect to login or use localStorage)
            // For now, we'll just throw an error or redirect
            throw new Error('User not authenticated. Cannot add to cart.');
        }
        setLoading(true);
        setError(null);
        try {
            await axios.post('/api/cart', { product_id: productId, quantity });
            await fetchCart(); // Refresh cart after adding item
        } catch (err) {
            console.error('Failed to add to cart:', err);
            setError(err);
            throw err;
        }
    };

    const updateCartItem = async (cartItemId, quantity) => {
        if (!user) {
            throw new Error('User not authenticated. Cannot update cart.');
        }
        setLoading(true);
        setError(null);
        try {
            await axios.put(`/api/cart/${cartItemId}`, { quantity });
            await fetchCart(); // Refresh cart after updating item
        } catch (err) {
            console.error('Failed to update cart item:', err);
            setError(err);
            throw err;
        }
    };

    const removeCartItem = async (cartItemId) => {
        if (!user) {
            throw new Error('User not authenticated. Cannot remove from cart.');
        }
        setLoading(true);
        setError(null);
        try {
            await axios.delete(`/api/cart/${cartItemId}`);
            await fetchCart(); // Refresh cart after removing item
        } catch (err) {
            console.error('Failed to remove cart item:', err);
            setError(err);
            throw err;
        }
    };

    const clearCart = async () => {
        if (!user) {
            throw new Error('User not authenticated. Cannot clear cart.');
        }
        setLoading(true);
        setError(null);
        try {
            // Assuming a way to clear all items, or iterate and delete
            // For now, let's assume a separate endpoint or a loop
            if (cart && cart.cart_items) {
                for (const item of cart.cart_items) {
                    await axios.delete(`/api/cart/${item.id}`);
                }
            }
            await fetchCart(); // Refresh cart after clearing
        } catch (err) {
            console.error('Failed to clear cart:', err);
            setError(err);
            throw err;
        }
    };

    const getCartCount = () => {
        return cart?.cart_items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
    };

    const getCartSubtotal = () => {
        return cart?.cart_items?.reduce((sum, item) => sum + item.product.price * item.quantity, 0) || 0;
    };


    return (
        <CartContext.Provider
            value={{
                cart,
                loading,
                error,
                fetchCart,
                addToCart,
                updateCartItem,
                removeCartItem,
                clearCart,
                getCartCount,
                getCartSubtotal,
            }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);