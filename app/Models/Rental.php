<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Rental extends Model
{
    //
    use HasFactory;
    public $timestamps = true;

    protected $table = 'rentals';

    protected $primaryKey = 'id';

    protected $fillable = [
        'user_id',
        'car_id',
        'start_date',
        'end_date',
        'total_hari',
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
}
