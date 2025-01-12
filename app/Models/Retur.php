<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Retur extends Model
{
    //
    use HasFactory;
    public $timestamps = true;

    protected $table = 'returns';

    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'car_id',
        'rental_id',
        'return_date',
        'total_harga',
    ];

    public function car()
    {
        return $this->belongsTo(Car::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function rental()
    {
        return $this->belongsTo(Rental::class);
    }
}
