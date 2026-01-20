<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class CartController extends Controller
{
    /**
     * Display the authenticated user's cart.
     */
    public function index(Request $request)
    {
        $cart = $request->user()->cart()->with('cartItems.product')->firstOrCreate([]);
        return response()->json($cart);
    }

    /**
     * Add a product to the cart or update its quantity.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
            ]);

            $cart = $request->user()->cart()->firstOrCreate([]);

            $cartItem = $cart->cartItems()->where('product_id', $validatedData['product_id'])->first();

            if ($cartItem) {
                $cartItem->quantity += $validatedData['quantity'];
                $cartItem->save();
            } else {
                $cartItem = $cart->cartItems()->create($validatedData);
            }

            return response()->json($cartItem->load('product'), 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Update the quantity of a specific cart item.
     */
    public function update(Request $request, CartItem $cartItem)
    {
        $this->authorize('update', $cartItem);

        try {
            $validatedData = $request->validate([
                'quantity' => 'required|integer|min:1',
            ]);

            $cartItem->update($validatedData);

            return response()->json($cartItem->load('product'));
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Remove a specific cart item from the cart.
     */
    public function destroy(Request $request, CartItem $cartItem)
    {
        $this->authorize('delete', $cartItem);

        $cartItem->delete();

        return response()->json(null, 204);
    }
}