<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class CarController extends Controller
{
    //
    public function index (){
        $cars = Car::all();

        return Inertia::render('Admin/Mobil/Index', [
            'cars' => $cars
          ]);
    }

    public function store(Request $request){
        $request->validate([
            'merk' => 'required|string|max:255',
            'model' => 'required|string|max:255',
            'foto' => 'nullable|image|mimes:jpg,png,jpeg|max:2048',
            'no_plat' => 'required|string|unique:cars|max:255',
            'harga' => 'required|numeric|min:0',
        ],[
            'merk.required' => 'Merk wajib diisi!',
            'model.required' => 'Model wajib diisi!',
            'no_plat.required' => 'Nomor Plat wajib diisi!',
            'harga.required' => 'Harga wajib diisi!',
        ]);

        if(!empty($request->foto)){
            //maka proses berikut yang dijalankan
            $fileName = 'foto-'.uniqid().'.'.$request->foto->extension();
            //setelah tau fotonya sudah masuk maka tempatkan ke public
            $request->foto->move(public_path('images'), $fileName);
        } else {
            $fileName = 'nophoto.jpg';
        }

        $car = Car::create([
            'merk'=>$request->merk,
            'model'=>$request->model,
            'foto'=>$fileName,
            'no_plat'=>strtoupper($request->no_plat),
            'harga' => $request->harga,
        ]);

        if($car){
            return redirect()->route('mobil')->with('error', 'Mobil berhasil ditambahkan!');
        }else{
            return redirect()->back()->with('error', 'Mobil gagal ditambahkan!');
        }
    }

    public function delete($id) {
        $car = Car::find($id);

        // dd($car->foto);

        if ($car->foto !== 'nophoto.jpg'){
            $filePath = 'images/' . $car->foto;
            if (Storage::disk('public')->exists($filePath)) {
                Storage::disk('public')->delete($filePath);
            }
        }


        if ($car) {
            $car->delete();

            return redirect()->route('mobil')->with('success', 'Car deleted successfully');
        }

        return redirect()->route('mobil')->with('error', 'Car not found');
    }

    public function apiCars(){
        try {
            // Ambil semua data mobil dari database
            $cars = Car::orderBy('id', 'desc')->get();

            // Kembalikan data dalam format JSON
            return response()->json([
                'success' => true,
                'data' => $cars,
            ], 200);
        } catch (\Exception $e) {
            // Tangani error jika ada
            return response()->json([
                'success' => false,
                'message' => 'Gagal mengambil data mobil: ' . $e->getMessage(),
            ], 500);
        }
    }
    public function toggleTersedia(Request $request, Car $car) {
        $validated = $request->validate([
            'tersedia' => 'required|boolean',
        ]);

        $car->tersedia = $validated['tersedia'];
        $car->save();

        return response()->json(['message' => 'Status tersedia berhasil diperbarui.']);
    }

}
