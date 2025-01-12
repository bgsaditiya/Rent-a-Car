<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use App\Models\User;
use Inertia\Inertia;

class LoginController extends Controller
{
    //
    public function index(){
        return Inertia::render('User/Login');
    }

    public function login(Request $request){

        $request->validate([
            'no_telp' => 'required|string',
            'password' => 'required|string',
        ],[
            'no_telp.required' => 'Nomor Telepon wajib diisi!',
            'password.required' => 'Password wajib diisi!',
        ]);

        if (Auth::attempt($request->only('no_telp', 'password'))) {
            $request->session()->regenerate();
            return redirect()->intended('/');
        }

        // Redirect ke halaman admin (home)
        return redirect()->back()->with('error', 'Username atau Password salah!');
    }

    public function logout(Request $request) {
        Auth::logout();

        $request->session()->invalidate();

        $request->session()->regenerateToken();

        return redirect('/');
    }
}
