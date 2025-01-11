<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use App\Models\Car;
use Inertia\Inertia;

class CarController extends Controller
{
    //
    public function index (){
        $cars = Car::all();
        // dd($cars);

        // return redirect()->route('mobil', ['cars', 'Bagas']);
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
        ]);

        if(!empty($request->foto)){
            //maka proses berikut yang dijalankan
            $fileName = 'foto-'.uniqid().'.'.$request->foto->extension();
            //setelah tau fotonya sudah masuk maka tempatkan ke public
            $request->foto->move(public_path('images'), $fileName);
        } else {
            $fileName = 'nophoto.jpg';
        }

        DB::table('cars')->insert([
            'merk'=>$request->merk,
            'model'=>$request->model,
            'foto'=>$fileName,
            'no_plat'=>$request->no_plat,
            'harga' => $request->harga,
        ]);

        // dd($fileName);

        return redirect()->back()->with('succes', 'Mobil Berhasil ditambahkan');
    }

    public function delete($id) {
        $car = Car::find($id);

        if ($car) {
            $car->delete();

            return redirect()->route('mobil')->with('message', 'Car deleted successfully');
        }

        return redirect()->route('mobil')->with('message', 'Car not found');
    }
}
