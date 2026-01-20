<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Donation;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class DonationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        return Donation::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'donor_name' => 'required|string|max:255',
                'donor_email' => 'required|string|email|max:255',
                'amount' => 'required|numeric|min:1',
                'message' => 'nullable|string',
                'donation_type' => 'required|string|max:255',
                'anonymous' => 'boolean',
            ]);

            $donation = Donation::create($validatedData);

            return response()->json($donation, 201);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Donation $donation)
    {
        return response()->json($donation);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Donation $donation)
    {
        try {
            $validatedData = $request->validate([
                'donor_name' => 'sometimes|required|string|max:255',
                'donor_email' => 'sometimes|required|string|email|max:255',
                'amount' => 'sometimes|required|numeric|min:1',
                'message' => 'nullable|string',
                'donation_type' => 'sometimes|required|string|max:255',
                'anonymous' => 'boolean',
            ]);

            $donation->update($validatedData);

            return response()->json($donation);
        } catch (ValidationException $e) {
            return response()->json([
                'message' => 'Validation Error',
                'errors' => $e->errors(),
            ], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Donation $donation)
    {
        $donation->delete();

        return response()->json(null, 204);
    }
}
