<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Message extends Model
{
    use HasFactory;
    
    // Définir les colonnes qui peuvent étre massivement assignées 
    protected $fillable = [
        'email',
        'object',
        'message',
    ] ;
}
