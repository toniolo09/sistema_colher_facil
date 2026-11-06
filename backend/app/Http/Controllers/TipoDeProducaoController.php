<?php

namespace App\Http\Controllers;

use App\Models\TipoDeProducao;
use Illuminate\Http\Request;

class TipoDeProducaoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tiposDeProducao = TipoDeProducao::all();
        return response()->json($tiposDeProducao);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        if ($request->user()->tipo_usuario !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem criar tipos de produção.'], 403);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        $tipoDeProducao = TipoDeProducao::create($request->all());

        return response()->json($tipoDeProducao, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(TipoDeProducao $tipoDeProducao)
    {
        return response()->json($tipoDeProducao);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, TipoDeProducao $tipoDeProducao)
    {
        if ($request->user()->tipo_usuario !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem atualizar tipos de produção.'], 403);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
        ]);

        $tipoDeProducao->update($request->all());

        return response()->json($tipoDeProducao);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, TipoDeProducao $tipoDeProducao)
    {
        if ($request->user()->tipo_usuario !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem excluir tipos de produção.'], 403);
        }

        $tipoDeProducao->delete();

        return response()->json(null, 204);
    }
}