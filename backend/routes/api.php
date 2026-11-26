<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProdutoController;
use App\Http\Controllers\CategoriaController;
use App\Http\Controllers\TipoDeProducaoController;
use App\Http\Controllers\PedidoController;

Route::post('/register', [UserController::class, 'store']); 
Route::post('/login', [UserController::class, 'login']);       


Route::get('/produtos', [ProdutoController::class, 'index']);
Route::get('/produtos/{produto}', [ProdutoController::class, 'show']);

Route::get('/categorias', [CategoriaController::class, 'index']);           
Route::get('/categorias/{categoria}', [CategoriaController::class, 'show']); 

Route::get('/tipos-de-producao', [TipoDeProducaoController::class, 'index']);           
Route::get('/tipos-de-producao/{tipoDeProducao}', [TipoDeProducaoController::class, 'show']); 

Route::middleware(['auth:sanctum'])->group(function () {

    Route::post('/logout', [UserController::class, 'logout']); 
    Route::get('/user', function (Request $request) {
        return response()->json($request->user()); 
    });

    
    Route::apiResource('users', UserController::class)->middleware('admin');
    
    
    Route::post('/produtos', [ProdutoController::class, 'store']);
    Route::put('/produtos/{produto}', [ProdutoController::class, 'update']);
    Route::patch('/produtos/{produto}', [ProdutoController::class, 'update']);
    Route::delete('/produtos/{produto}', [ProdutoController::class, 'destroy']);

    
    Route::post('/categorias', [CategoriaController::class, 'store']);
    Route::put('/categorias/{categoria}', [CategoriaController::class, 'update']);
    Route::patch('/categorias/{categoria}', [CategoriaController::class, 'update']);
    Route::delete('/categorias/{categoria}', [CategoriaController::class, 'destroy']);

    
    Route::post('/tipos-de-producao', [TipoDeProducaoController::class, 'store']);
    Route::put('/tipos-de-producao/{tipoDeProducao}', [TipoDeProducaoController::class, 'update']);
    Route::patch('/tipos-de-producao/{tipoDeProducao}', [TipoDeProducaoController::class, 'update']);
    Route::delete('/tipos-de-producao/{tipoDeProducao}', [TipoDeProducaoController::class, 'destroy']);

    
    Route::apiResource('pedidos', PedidoController::class);
});