<?php

namespace App\Http\Controllers;

use App\Models\Categoria;
use Illuminate\Http\Request;

class CategoriaController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categorias = Categoria::all();
        return response()->json($categorias);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if (!in_array($request->user()->tipo_usuario, ['admin', 'produtor'])) {
            return response()->json(['error' => 'Acesso negado.'], 403);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        $categoria = Categoria::create($request->all());

        return response()->json($categoria, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Categoria $categoria)
    {
        return response()->json($categoria);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Categoria $categoria)
    {
        if (!in_array($request->user()->tipo_usuario, ['admin', 'produtor'])) {
            return response()->json(['error' => 'Acesso negado.'], 403);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        $categoria->update($request->all());

        return response()->json($categoria);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Categoria $categoria)
    {
        if ($request->user()->tipo_usuario !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem excluir categorias.'], 403);
        }

        $categoria->delete();

        return response()->json(null, 204);
    }
}