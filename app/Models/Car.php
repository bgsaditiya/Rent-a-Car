<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Car extends Model
{
    //
    use HasFactory;
    public $timestamps = true;

    protected $table = 'cars';

    protected $primaryKey = 'id';

    protected $fillable = [
        'merk',
        'model',
        'foto',
        'no_plat',
        'harga',
    ];
}
