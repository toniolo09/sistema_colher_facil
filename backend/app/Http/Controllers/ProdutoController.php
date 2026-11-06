<?php

namespace App\Http\Controllers;

use App\Models\Produto;
use Illuminate\Http\Request;

class ProdutoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produtos = Produto::all();
        return response()->json($produtos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        // Apenas admin ou produtor podem cadastrar produtos
        if (!in_array($request->user()->tipo_usuario, ['admin', 'produtor'])) {
            return response()->json(['error' => 'Acesso negado. Apenas produtores ou administradores podem cadastrar produtos.'], 403);
        }

        $request->validate([
            'nome' => 'required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'required|numeric|min:0',
            'categoria_id' => 'required|exists:categorias,id',
            'tipo_de_producao_id' => 'required|exists:tipos_de_producao,id',
            'imagem' => 'nullable|string',
        ]);

        // Cria o produto associando o user_id do usuário logado[cite: 7]
        $produto = Produto::create([
            'nome' => $request->nome,
            'descricao' => $request->descricao,
            'preco' => $request->preco,
            'categoria_id' => $request->categoria_id,
            'tipo_de_producao_id' => $request->tipo_de_producao_id,
            'imagem' => $request->imagem,
            'user_id' => $request->user()->id,
        ]);

        return response()->json($produto, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Produto $produto)
    {
        return response()->json($produto);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produto $produto)
    {
        // Admin ou o próprio dono do produto podem atualizar
        if ($request->user()->tipo_usuario !== 'admin' && $produto->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Não autorizado a alterar este produto.'], 403);
        }

        $request->validate([
            'nome' => 'sometimes|required|string|max:255',
            'descricao' => 'nullable|string',
            'preco' => 'sometimes|required|numeric|min:0',
            'categoria_id' => 'sometimes|required|exists:categorias,id',
            'tipo_de_producao_id' => 'sometimes|required|exists:tipos_de_producao,id',
            'imagem' => 'nullable|string',
        ]);

        $produto->update($request->all());

        return response()->json($produto);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Request $request, Produto $produto)
    {
        // Admin ou o próprio dono do produto podem excluir
        if ($request->user()->tipo_usuario !== 'admin' && $produto->user_id !== $request->user()->id) {
            return response()->json(['error' => 'Não autorizado a excluir este produto.'], 403);
        }

        $produto->delete();

        return response()->json(null, 204);
    }
}