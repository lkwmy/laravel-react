<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class product extends Model
{
    use HasFactory;

    

    protected $fillable = [
        'name',
        'brand',
        'quantity',
        'description',
        'price',
        'img1',
        'img2',
        'img3',
        'img4',
        'img5',
        'img6',
        'img7'
    ];
}
