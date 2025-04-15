<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NewsletterEmail extends Model
{
    use HasFactory;
    
     // Spécifiez le nom de la table si elle n'est pas le pluriel du modèle
     protected $table = 'newsletter';

    protected $fillable = ['email'];  // Colonne que vous souhaitez insérer (par exemple)

     // Si vous avez des timestamps dans votre table, Laravel les gère par défaut
     public $timestamps = true;  // Facultatif, sauf si votre table n'a pas les champs `created_at` et `updated_at`
}
