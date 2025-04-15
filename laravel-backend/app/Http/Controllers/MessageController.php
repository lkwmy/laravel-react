<?php

namespace App\Http\Controllers;

use App\Models\Message;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    
    // insérer data 
    public function contact(Request $request)
    {
        // Validation des données
        $request->validate([
            'email' => 'required|email',
            'object' => 'required|string',
            'message' => 'required|string',
        ]);
          // Création du message dans la base de données
          $message = Message::create([
            'email' => $request->email,
            'object' => $request->object,
            'message' => $request->message,
        ]);
         // Retourner la réponse
         return response()->json([
            'success' => true,
            'message' => 'Message envoyé avec succès!',
            'data' => $message
        ], 201);
    }

     // Récupérer tous les messages
     public function index()
     {
         $messages = Message::all(); // Récupère tous les messages de la base de données
         return response()->json($messages); // Renvoie les messages au format JSON
     }
}
