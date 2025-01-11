<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Admin;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // User::factory()->create([
        //     'name' => 'Test User',
        //     'email' => 'test@example.com',
        // ]);

        DB::table('admins')->insert([
            'username' => 'admin',
            'password' => Hash::make('password'),
        ]);

        DB::table('users')->insert([
            'nama' => 'bagas',
            'alamat' => 'Jl. Sorogenen I',
            'no_telp' => '0821',
            'no_sim' => '3207',
            'password' => Hash::make('password'),
        ]);

        DB::table('cars')->insert([
            'merk' => 'Honda',
            'model' => 'Jazz',
            'no_plat' => 'AB1234BC',
            'harga' => 200000,
            'tersedia' => false,
        ]);
        DB::table('cars')->insert([
            'merk' => 'Honda',
            'model' => 'BR-V',
            'no_plat' => 'AB1234B',
            'harga' => 400000,
            'tersedia' => true,
        ]);
        DB::table('cars')->insert([
            'merk' => 'Toyota',
            'model' => 'Supra',
            'no_plat' => 'AB1234AS',
            'harga' => 700000,
            'tersedia' => false,
        ]);
        DB::table('cars')->insert([
            'merk' => 'Porsche',
            'model' => '911',
            'no_plat' => 'AB1234AA',
            'harga' => 200000,
            'tersedia' => false,
        ]);
        DB::table('cars')->insert([
            'merk' => 'Honda',
            'model' => 'HR-V',
            'no_plat' => 'AB1234KK',
            'harga' => 400000,
            'tersedia' => true,
        ]);
    }
}
