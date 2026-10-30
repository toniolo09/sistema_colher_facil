<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TipoDeProducao extends Model
{
    protected $table = 'tipos_de_producao';

    protected $fillable = [
        'nome',
        'descricao',
    ];
}
