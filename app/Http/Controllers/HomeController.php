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

        return Inertia::render('Home', [
            'cars' => $cars
          ]);
    }
}
