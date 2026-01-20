<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CorsMiddleware
{
    public function handle(Request $request, Closure $next)
    {
        $allowedOrigins = ["http://127.0.0.1:5174", "http://localhost:5174"];

        $origin = $request->headers->get("Origin");
        $headers = [
            "Access-Control-Allow-Methods" =>
                "GET, POST, PUT, PATCH, DELETE, OPTIONS",
            "Access-Control-Allow-Headers" =>
                "Content-Type, Authorization, X-Requested-With, X-XSRF-TOKEN, Accept, Origin",
            "Access-Control-Allow-Credentials" => "true",
        ];

        if (in_array($origin, $allowedOrigins)) {
            $headers["Access-Control-Allow-Origin"] = $origin;
        }

        // 🧩 Preflight OPTIONS requests
        if ($request->getMethod() === "OPTIONS") {
            return response()->noContent(204)->withHeaders($headers);
        }

        $response = $next($request);

        foreach ($headers as $key => $value) {
            $response->headers->set($key, $value);
        }

        return $response;
    }
}
