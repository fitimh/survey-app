<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Survey extends Model
{
    use HasFactory;

    protected $table = 'surveys';
    protected $fillable = [
//        'table_nr', 'tables_id'
    ];
    protected $hidden = [
        'created_at', 'updated_at', 'deleted_at'
    ];
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id');
    }

}

