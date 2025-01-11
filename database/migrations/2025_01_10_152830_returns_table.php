<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        //
        Schema::create('returns', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Relasi ke tabel users
            $table->foreignId('car_id')->constrained('cars')->onDelete('cascade'); // Relasi ke tabel cars
            $table->foreignId('rental_id')->constrained('rentals')->onDelete('cascade'); // Relasi ke tabel rentals
            $table->date('return_date'); // Tanggal pengembalian
            $table->decimal('total_price', 10, 2); // Total biaya sewa setelah pengembalian
            $table->timestamps(); // created_at & updated_at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('returns');
    }
};
