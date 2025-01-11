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
        Schema::create('cars', function (Blueprint $table) {
            $table->id(); // Primary Key
            $table->string('merk');
            $table->string('model');
            $table->string('foto')->default('nophoto.jpg');
            $table->string('no_plat')->unique(); // Nomor plat unik
            $table->integer('harga'); // Tarif sewa per hari
            $table->boolean('tersedia')->default(true); // Status ketersediaan
            $table->timestamps(); // created_at & updated_at
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        //
        Schema::dropIfExists('cars');
    }
};
