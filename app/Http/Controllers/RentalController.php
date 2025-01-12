<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Rental;
use App\Models\Car;
use App\Models\Retur;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;

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

        $listReturn = Retur::with(['car','rental']) // Relasi ke model mobil
        ->where('user_id', Auth::id())
        ->get();

        // dd($listSewa);

        // Mengirim data mobil ke halaman sewa
        return Inertia::render('User/ListSewa', [
            'listSewa' => $listSewa,
            'listReturn' => $listReturn,
        ]);
    }
    public function listAdmin() {

        $listSewa = Rental::with(['user', 'car'])->whereNull('total_harga')->get();

        $listReturn = Retur::with(['user', 'car', 'rental'])->get();

        // Mengirim data mobil ke halaman sewa
        return Inertia::render('Admin/Mobil/ListSewa', [
            'listSewa' => $listSewa,
            'listReturn' => $listReturn,
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
            Rental::create([
                'user_id' => Auth::id(),
                'car_id' => $validated['car_id'],
                'start_date' => $validated['start_date'],
                'end_date' => $validated['end_date'],
            ]);

            $car = Car::find($validated['car_id']);
            return redirect()->route('home')->with('error', 'Berhasil menyewa mobil.');
        } else {
            return redirect()->back()->with('error', 'Mobil tidak tersedia pada tanggal yang dipilih.');
        }
    }

    public function checkAvailability($carId, $startDate, $endDate) {

        $overlappingRental = Rental::where('car_id', $carId)->whereNull('total_harga')
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

    public function return($rental_id) {
        // $rent = Rental::find($rental_id);

        $rent = Rental::with('car') // Relasi ke model mobil
        ->where('id', $rental_id)->where('total_harga', null)
        ->first();

        if($rent){
            return Inertia::render('User/Kembalikan', [
                'rental' => $rent
            ]);
        }else{
            return redirect()->route('list.sewa')->with('error', 'Gagal, Mobil sudah dikembalikan.');
        }

        // Mengirim data rental ke halaman

    }

    public function handleReturn(Request $request) {
        // $rent = Rental::find($rental_id);

        $validated = $request->validate([
            'no_plat' => 'required|string',
            'car_id' => 'required',
            'rental_id' => 'required',
        ]);

        $rental = Rental::with('car') // Relasi ke model mobil
        ->where('id', $validated['rental_id'])
        ->first();

        $start = Carbon::parse($rental->start_date);
        $end = Carbon::parse($rental->end_date);

        $totalHari = $start->diffInDays($end);


        $totalHarga = intval($totalHari) * $rental->car->harga;

        // dd(Carbon::now('Asia/Jakarta')->toDateString());

        if ($rental && strtolower($validated['no_plat']) == strtolower($rental->car->no_plat)) {
            $rental->total_hari = intval($totalHari);
            $rental->total_harga = $totalHarga;
            $rental->save();

            Retur::create([
                'user_id' => $rental->user_id,
                'car_id' => $validated['car_id'],
                'rental_id' => $validated['rental_id'],
                'return_date' => Carbon::now('Asia/Jakarta')->toDateString(),
                'total_harga' => $totalHarga,
            ]);

            return redirect()->route('list.sewa')->with('error', 'Berhasil mengembalikan mobil.');
        } else {
            // dd('gagal');
            return redirect()->back()->with('error', 'Gagal, nomor plat salah.');
        }

    }
}
