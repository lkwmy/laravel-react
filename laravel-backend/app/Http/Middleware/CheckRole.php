<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;

class CheckRole
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure(\Illuminate\Http\Request): (\Illuminate\Http\Response|\Illuminate\Http\RedirectResponse)  $next
     * @return \Illuminate\Http\Response|\Illuminate\Http\RedirectResponse
     */
    public function handle(Request $request, Closure $next)
    {
        // Vérifie si l'utilisateur authentifié a le rôle requis
        if ($request->user() && $request->user()->role === 'admin') {
            return $next($request);
        }

        // Si l'utilisateur n'est pas admin, retourner une réponse 403 (Forbidden)
        return response()->json(['message' => 'Forbidden'], 403);
    }
}
