<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Pedido extends Model
{
    protected $table = 'pedidos';

    protected $fillable = ['produtor_id', 'consumidor_id', 'status'];

    public function produtos()
    {
        return $this->belongsToMany(Produto::class, 'table_pedidos_produtos', 'pedido_id', 'produto_id')
            ->withPivot('quantidade', 'preco_unitario')
            ->withTimestamps();
    }

    public function consumidor()
    {
        return $this->belongsTo(User::class, 'consumidor_id');
    }

    public function produtor()
    {
        return $this->belongsTo(User::class, 'produtor_id');
    }
}