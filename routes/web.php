<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\CarController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\RegisterController;
use App\Http\Controllers\RentalController;

// Route::get('/', function () {
//     return view('welcome');
// });

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::inertia('/tentang-kami', 'Tentang')->middleware('guest');

Route::get('/sewa/{car_id}', [RentalController::class, 'index'])->middleware('auth');
Route::post('/sewa', [RentalController::class, 'store'])->middleware('auth');

Route::get('/kembalikan/{rental_id}', [RentalController::class, 'return'])->middleware('auth');
Route::post('/kembalikan', [RentalController::class, 'handleReturn'])->middleware('auth');

Route::get('/list-sewa', [RentalController::class, 'list'])->middleware('auth')->name('list.sewa');

Route::get('/login', [LoginController::class, 'index'])->middleware('guest');
Route::post('/login', [LoginController::class, 'login'])->middleware('guest');
Route::post('/logout', [LoginController::class, 'logout'])->middleware('auth');
Route::get('/register', [RegisterController::class, 'index'])->middleware('guest');
Route::post('/register', [RegisterController::class, 'register'])->middleware('guest');

// Route::get('/admin', function () {
//     return Inertia::render('Admin');
// })->name('admin');

Route::get('/admin/dashboard/mobil', [CarController::class, 'index'])->middleware('admin.auth')->name('mobil');
Route::put('/api/cars/{car}/toggle', [CarController::class, 'toggleTersedia'])->middleware('admin.auth');

Route::get('/admin/dashboard/mobil/tambah', action: function () {
    return Inertia::render('Admin/Mobil/Tambah');
})->middleware('admin.auth');

Route::get('/admin/dashboard/list-sewa', [RentalController::class, 'listAdmin'])->middleware('admin.auth');

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
