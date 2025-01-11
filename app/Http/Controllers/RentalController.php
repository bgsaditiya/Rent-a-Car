<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rental;
use App\Models\Car;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RentalController extends Controller
{
    //
    public function index($car_id) {
        $car = Car::find($car_id);

        // Mengirim data mobil ke halaman sewa
        return Inertia::render('Sewa', [
            'car' => $car
        ]);
    }

    public function store(Request $request) {

        // dd($request->car_id);
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'car_id' => 'required',
        ]);


        Rental::create([
            'user_id' => Auth::id(),
            'car_id' => $validated['car_id'],
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
        ]);

        return redirect()->back()->with('succes', 'Berhasil menyewa mobil');
    }
}
