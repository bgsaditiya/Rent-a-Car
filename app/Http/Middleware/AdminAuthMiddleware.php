<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Auth;

class AdminAuthMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        // Periksa apakah admin sudah login
        if (!Auth::guard('admin')->check()) {
            // Jika belum login, redirect ke halaman login
            return redirect()->route('admin')->with('error', 'Anda harus login sebagai Admin.');
        }

        // Jika sudah login, lanjutkan ke rute berikutnya
        return $next($request);
    }
}
