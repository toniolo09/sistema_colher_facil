<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    use WithoutModelEvents;

    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        
        User::firstOrCreate(
            ['email' => 'admin@sistemacolherfacil.com'], 
            [
                'nome' => 'Administrador',
                'password' => Hash::make('password123'), 
                'tipo_usuario' => 'admin', 
                'telefone' => '54999999999',
                'nome_propriedade' => 'Matriz',
                'email_verified_at' => now(),
            ]
        );

        
        User::factory(10)->create();
    }
}