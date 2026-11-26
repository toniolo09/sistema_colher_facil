<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\Produto;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class PedidoController extends Controller
{
    private const STATUS = ['pendente', 'confirmado', 'enviado', 'entregue', 'cancelado'];

    public function index(Request $request)
    {
        $user = $request->user();
        $query = Pedido::with('produtos');

        if ($user->tipo_usuario === 'consumidor') {
            $query->where('consumidor_id', $user->id);
        } elseif ($user->tipo_usuario === 'produtor') {
            $query->where('produtor_id', $user->id);
        }

        return response()->json($query->latest()->get());
    }

    public function store(Request $request)
    {
        $user = $request->user();

        if ($user->tipo_usuario !== 'consumidor') {
            return response()->json(['error' => 'Apenas consumidores podem fazer pedidos.'], 403);
        }

        $data = $request->validate([
            'produtos' => 'required|array|min:1',
            'produtos.*.produto_id' => 'required|integer|distinct|exists:produtos,id',
            'produtos.*.quantidade' => 'required|integer|min:1',
        ]);

        $produtos = Produto::whereIn('id', collect($data['produtos'])->pluck('produto_id'))->get();
        $produtores = $produtos->pluck('user_id')->unique();

        if ($produtores->count() > 1) {
            return response()->json([
                'error' => 'Todos os produtos de um pedido devem ser do mesmo produtor.',
            ], 422);
        }

        $pedido = DB::transaction(function () use ($data, $user, $produtores) {
            $pedido = Pedido::create([
                'consumidor_id' => $user->id,
                'produtor_id' => $produtores->first(),
                'status' => 'pendente',
            ]);

            $itens = [];
            foreach ($data['produtos'] as $item) {
                $itens[$item['produto_id']] = ['quantidade' => $item['quantidade']];
            }
            $pedido->produtos()->attach($itens);

            return $pedido;
        });

        return response()->json($pedido->load('produtos'), 201);
    }

    public function show(Request $request, Pedido $pedido)
    {
        $this->autorizar($request, $pedido);

        return response()->json($pedido->load('produtos'));
    }

    public function update(Request $request, Pedido $pedido)
    {
        $this->autorizar($request, $pedido);
        $user = $request->user();

        $data = $request->validate([
            'status' => 'required|string|in:' . implode(',', self::STATUS),
        ]);

        // Consumidor só pode cancelar, e apenas enquanto pendente
        if ($user->tipo_usuario === 'consumidor') {
            if ($data['status'] !== 'cancelado' || $pedido->status !== 'pendente') {
                return response()->json(['error' => 'Você só pode cancelar pedidos pendentes.'], 403);
            }
        }

        $pedido->update($data);

        return response()->json($pedido->load('produtos'));
    }

    public function destroy(Request $request, Pedido $pedido)
    {
        if ($request->user()->tipo_usuario !== 'admin') {
            return response()->json(['error' => 'Apenas administradores podem excluir pedidos.'], 403);
        }

        $pedido->delete();

        return response()->json(null, 204);
    }

    private function autorizar(Request $request, Pedido $pedido): void
    {
        $user = $request->user();

        $permitido = $user->tipo_usuario === 'admin'
            || $pedido->consumidor_id === $user->id
            || $pedido->produtor_id === $user->id;

        abort_unless($permitido, 403, 'Você não tem acesso a este pedido.');
    }
}