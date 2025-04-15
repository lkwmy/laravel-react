<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class UserAdmin extends Model
{
    
    use HasApiTokens, HasFactory, Notifiable;
    protected $table = 'useradmin'; // Nom de la table

    protected $fillable = [
        'name', 'email', 'password',
    ];

    protected $hidden = [
        'password', 
    ];
}
