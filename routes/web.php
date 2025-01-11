<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [HomeController::class, 'index']);
Route::inertia('/tentang-kami', 'Tentang');
Route::inertia('/sewa', 'Sewa');

Route::get('/login', [LoginController::class, 'index'])->middleware('guest');
Route::post('/login', [LoginController::class, 'login'])->middleware('guest');
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');
Route::get('/daftar', [RegisterController::class, 'index'])->middleware('guest');
Route::post('/daftar', [RegisterController::class, 'register'])->middleware('guest');

// Route::get('/admin', function () {
//     return Inertia::render('Admin');
// })->name('admin');

Route::get('/admin/dashboard/mobil', [CarController::class, 'index'])->middleware('admin.auth')->name('mobil');

Route::get('/admin/dashboard/mobil/tambah', action: function () {
    return Inertia::render('Admin/Mobil/Tambah');
})->middleware('admin.auth');

Route::post('/admin/dashboard/mobil/tambah', [CarController::class, 'store'])->middleware('admin.auth');
Route::delete('/admin/dashboard/mobil/hapus/{id}', [CarController::class, 'delete'])->middleware('admin.auth');

Route::get('/admin/dashboard', function () {
    return Inertia::render('Admin/Dashboard');
})->middleware('admin.auth')->name('dashboard');

Route::get('/admin', [AdminController::class, 'index'])->name('admin');
Route::post('/admin/login', [AdminController::class, 'login']);
Route::post('/admin/logout', [AdminController::class, 'logout'])->name('admin.logout');
// Route::post('/admin-match', [AdminController::class, 'match']);
// Route::resource('admin', AdminController::class);
