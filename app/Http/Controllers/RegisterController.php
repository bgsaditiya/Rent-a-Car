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
        return Inertia::render('User/Register');
    }

    public function register(Request $request){
        $validated = $request->validate([
            'nama' => 'required|string|max:255',
            'alamat' => 'required|string|max:255',
            'no_telp' => 'required|string|unique:users',
            'no_sim' => 'required|string',
            'password' => 'required|string|min:8|confirmed',
        ],[
            'nama.required' => 'Nama wajib diisi!',
            'alamat.required' => 'Alamat wajib diisi!',
            'no_telp.required' => 'No Telepon wajib diisi!',
            'no_sim.required' => 'No SIM wajib diisi!',
            'password.required' => 'Password wajib diisi!',
            'password.confirmed' => 'Konfirmasi Password salah',
            'password.min' => 'Password minimal 8 karakter!',
        ]);

        // dd($validated['nama']);

        $user = User::create([
            'nama' => $validated['nama'],
            'alamat' => $validated['alamat'],
            'no_telp' => $validated['no_telp'],
            'no_sim' => $validated['no_sim'],
            'password' => Hash::make($validated['password']),
        ]);

        if ($user) {
            // Jika berhasil
            return redirect()->back()->with('error', 'Akun berhasil dibuat.');
        } else {
            // Jika gagal
            return redirect()->back()->with('error', 'Gagal membuat akun. Coba lagi.');
        }

        // return redirect()->back()->with('success', 'Akun berhasil dibuat');
    }
}
