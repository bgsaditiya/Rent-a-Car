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
        return Inertia::render('User/Sewa', [
            'car' => $car
        ]);
    }

    public function list() {
        // $listSewa = Rental::where('user_id',Auth::id())->get();
        $listSewa = Rental::with('car') // Relasi ke model mobil
        ->where('user_id', Auth::id())
        ->get();

        // dd($listSewa);

        // Mengirim data mobil ke halaman sewa
        return Inertia::render('User/ListSewa', [
            'listSewa' => $listSewa
        ]);
    }

    public function store(Request $request) {

        // dd($request->car_id);
        $validated = $request->validate([
            'start_date' => 'required|date',
            'end_date' => 'required|date',
            'car_id' => 'required',
        ]);

        $carId = $validated['car_id'];
        $startDate = $validated['start_date'];
        $endDate = $validated['end_date'];

        // dd(Car::find($validated['car_id']));

        if ($this->checkAvailability($carId, $startDate, $endDate)) {
            // Mobil tersedia, lanjutkan proses penyewaan
            Rental::create([
                'user_id' => Auth::id(),
                'car_id' => $validated['car_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
            ]);

            $car = Car::find($validated['car_id']);
            // dd('sukses:)');
            return redirect()->back()->with('success', 'Penyewaan berhasil dilakukan.');
            // return Inertia::render('User/Sewa', [
            //     'success' => 'Penyewaan berhasil dilakukan.',
            //     'car' => $car
            // ]);
        } else {
            // Mobil tidak tersedia
            // dd(vars: 'gagal:(');
            return redirect()->back()->with('error', 'Mobil tidak tersedia pada tanggal yang dipilih.');
        }


        // return redirect()->back()->with('success', 'Berhasil menyewa mobil');
    }

    public function checkAvailability($carId, $startDate, $endDate) {

        $overlappingRental = Rental::where('car_id', $carId)
            ->where(function($query) use ($startDate, $endDate) {
                $query->whereBetween('start_date', [$startDate, $endDate])
                    ->orWhereBetween('end_date', [$startDate, $endDate])
                    ->orWhere(function($query) use ($startDate, $endDate) {
                        $query->where('start_date', '<=', $startDate)
                                ->where('end_date', '>=', $endDate);
                    });
            })
            ->exists();

        return !$overlappingRental;
    }
}
