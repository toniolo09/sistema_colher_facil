<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';

    protected $fillable = [
        'produtor',
        'consumidor',
        'valor_total',
    ];
    public function produtos()
    {
        return $this->belongsToMany(Produto::class, 'table_pedidos_produtos', 'pedido_id', 'produto_id')
            ->withPivot('quantidade', 'preco_unitario')
            ->withTimestamps();
    }
}