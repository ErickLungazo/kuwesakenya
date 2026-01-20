<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\DonationController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CartController;

Route::get("/", fn() => view("welcome"));

// ✅ Auth + CSRF routes (MUST use "web" middleware)
Route::middleware(["web"])->group(function () {
    // Explicit Sanctum CSRF endpoint for SPA
    Route::get("/sanctum/csrf-cookie", function () {
        return response()->noContent();
    });

    Route::post("/register", [AuthController::class, "register"]);
    Route::post("/login", [AuthController::class, "login"]);
    Route::post("/logout", [AuthController::class, "logout"]);
});

// ✅ API routes (stateless)
Route::prefix("api")->group(function () {
    Route::get("/test", fn() => response()->json(["message" => "Backend OK"]));
    Route::apiResource("products", ProductController::class);
    Route::apiResource("categories", CategoryController::class);
    Route::apiResource("donations", DonationController::class);

    Route::middleware("auth:sanctum")->group(function () {
        Route::get("/user", [AuthController::class, "user"]);
        Route::apiResource("orders", OrderController::class);
        Route::apiResource("cart", CartController::class);
    });
});

// ✅ React fallback route
Route::get("/{any}", fn() => view("welcome"))->where("any", '^(?!api).*$');

// Temporary route to reset password. Should be removed later.
Route::get('/temp-reset-password', function (Illuminate\Http\Request $request) {
    $user = App\Models\User::where('email', $request->email)->first();
    if ($user) {
        $user->password = Illuminate\Support\Facades\Hash::make($request->password);
        $user->save();
        return 'Password reset successfully for user: ' . $user->email;
    } else {
        return 'User not found.';
    }
});
