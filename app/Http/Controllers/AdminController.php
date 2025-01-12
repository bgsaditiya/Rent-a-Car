<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

use function Termwind\render;

class AdminController extends Controller
{
    //
    public function index(){
        return inertia('Admin/Login');
    }

    public function login(Request $request){

        $request->validate([
            'username' => 'required|string',
            'password' => 'required|string',
        ],[
            'username.required' => 'Username wajib diisi!',
            'password.required' => 'Password wajib diisi!',
        ]);

        // Mencari admin berdasarkan username
        $admin = DB::table('admins')->where('username', $request->username)->first();

        // Cek apakah username ada dan password cocok
        if (!$admin || !Hash::check($request->password, $admin->password)) {
            // Jika gagal, redirect kembali dengan error
            return back()->with('error', 'Username atau password salah!');

        }

        // Jika login berhasil, set session atau login secara manual
        Auth::guard('admin')->loginUsingId($admin->id);

        // Redirect ke halaman admin (home)
        return redirect()->route('dashboard');
    }

    public function logout(Request $request)
    {
        // Logout admin menggunakan guard admin
        Auth::guard('admin')->logout();

        // Hapus sesi saat ini
        $request->session()->invalidate();

        // Regenerasi token sesi
        $request->session()->regenerateToken();

        // Redirect ke halaman login admin
        return redirect()->route('admin')->with('success', 'You have been logged out.');
    }
}
