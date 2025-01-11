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
        Schema::create('rentals', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade'); // Relasi ke tabel users
            $table->foreignId('car_id')->constrained('cars')->onDelete('cascade'); // Relasi ke tabel cars
            $table->date('start_date'); // Tanggal mulai sewa
            $table->date('end_date'); // Tanggal selesai sewa
            $table->integer('total_days')->nullable(); // Total hari sewa (dihitung saat pengembalian)
            $table->decimal('total_price', 10, 2)->nullable(); // Total biaya sewa
            $table->timestamps(); // created_at & updated_at
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('rentals');
    }
};
