<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class OrderController extends Controller
{
    /**
     * Display a listing of the user's orders.
     */
    public function index(Request $request)
    {
        $orders = $request->user()->orders()->with('orderItems.product')->get();
        return response()->json($orders);
    }

    /**
     * Store a newly created order in storage (from the cart).
     */
    public function store(Request $request)
    {
        $user = $request->user();
        $cart = $user->cart()->with('cartItems.product')->first();

        if (!$cart || $cart->cartItems->isEmpty()) {
            return response()->json(['message' => 'Your cart is empty.'], 400);
        }

        return DB::transaction(function () use ($user, $cart) {
            $totalAmount = 0;
            foreach ($cart->cartItems as $item) {
                $totalAmount += $item->quantity * $item->product->price;
            }

            $order = $user->orders()->create([
                'total_amount' => $totalAmount,
                'status' => 'pending', // Initial status
            ]);

            foreach ($cart->cartItems as $item) {
                $order->orderItems()->create([
                    'product_id' => $item->product_id,
                    'quantity' => $item->quantity,
                    'price' => $item->product->price, // Price at the time of order
                ]);
            }

            // Clear the cart after placing the order
            $cart->cartItems()->delete();
            $cart->delete(); // Delete the cart itself

            return response()->json($order->load('orderItems.product'), 201);
        });
    }

    /**
     * Display the specified order.
     */
    public function show(Request $request, Order $order)
    {
        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json($order->load('orderItems.product'));
    }

    /**
     * Update the specified order in storage.
     */
    public function update(Request $request, Order $order)
    {
        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $validatedData = $request->validate([
            'status' => 'required|string|in:pending,processing,completed,shipped,cancelled',
        ]);

        $order->update($validatedData);

        return response()->json($order->load('orderItems.product'));
    }

    /**
     * Remove the specified order from storage.
     */
    public function destroy(Request $request, Order $order)
    {
        // Ensure the order belongs to the authenticated user
        if ($order->user_id !== $request->user()->id) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $order->delete();

        return response()->json(null, 204);
    }
}