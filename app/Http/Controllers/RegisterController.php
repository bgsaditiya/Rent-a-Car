<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Inertia\Inertia;

class RegisterController extends Controller
{
    //
    public function index(){
        return Inertia::render('User/Daftar');
    }

    public function register(Request $request){
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string',
            'no_telp' => 'required|numeric|unique:users',
            'no_sim' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ]);

        // dd($validated['nama']);

        User::create([
            'nama' => $validated['nama'],
            'alamat' => $validated['alamat'],
            'no_telp' => $validated['no_telp'],
            'no_sim' => $validated['no_sim'],
            'password' => Hash::make($validated['password']),
        ]);

        return redirect()->back()->with('succes', 'Akun berhasil dibuat');
    }
}
