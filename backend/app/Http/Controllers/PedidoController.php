<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use Illuminate\Http\Request;

class PedidoController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $pedidos = Pedido::all();
        return response()->json($pedidos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'produto_id' => 'required|exists:produtos,id',
            'quantidade' => 'required|integer|min:1',
            'status' => 'required|string|max:255',
        ]);

        $pedido = Pedido::create($request->all());

        return response()->json($pedido, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pedido $pedido)
    {
        return response()->json($pedido);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Pedido $pedido)
    {
        $request->validate([
            'user_id' => 'sometimes|required|exists:users,id',
            'produto_id' => 'sometimes|required|exists:produtos,id',
            'quantidade' => 'sometimes|required|integer|min:1',
            'status' => 'sometimes|required|string|max:255',
        ]);

        $pedido->update($request->all());

        return response()->json($pedido);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pedido $pedido)
    {
        $pedido->delete();

        return response()->json(null, 204);
    }
}
