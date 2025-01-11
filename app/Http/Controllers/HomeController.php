<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Car;
use Inertia\Inertia;

class HomeController extends Controller
{
    //
    public function index (){
        $cars = Car::all();
        // dd($cars);

        // return redirect()->route('mobil', ['cars', 'Bagas']);
        return Inertia::render('Home', [
            'cars' => $cars
          ]);
    }
}
