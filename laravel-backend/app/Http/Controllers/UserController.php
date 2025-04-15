<?php

namespace App\Http\Controllers;

use App\Models\User;
use Dotenv\Validator;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Database\Eloquent\Model;


class UserController extends Controller
{
    public function index()
    {
        // Récupérer tous les utilisateurs avec leurs emails
        $users = User::select('id','name','email', 'number')->get();
        return response()->json($users);
    } 

    public function update(Request $request, $id)
    {
        $user = User::find($id);
        if (!$user) {
            return response()->json(['error' => 'Utilisateur non trouvé'], 404);
        }    
       // Valider les données 
       $validatedData = $request->validate([
        'name'=>'nullable|string|max:255',
        'email' => 'nullable|email|unique:users,email,' . $id,
        'number' => 'nullable',
        'password' => 'nullable|string',
        'role' => 'nullable'
       ]);
       // Si un mot de passe est fourni, on le hache avant de le mettre à jour
       if ($request->has('password') && $request->password){
        $validatedData['password'] = Hash::make($request->password);
       }
        // Mise à jour des autres champs
        $user->update($validatedData);
        return response()->json($user, 200);
    }

    public function destroy($id)
    {
        return User::destroy($id);
    }

    // controlleur pour récupérer les données d'un certain user qui est déja authentifié 
    // avec la vérification de son token 
    public function getUser(Request $request) {
        $user = auth()->user(); // Récupérer l'utilisateur authentifié via le token
        if ($user) {
            return response()->json([
                'success' => true,
                'user' => $user
            ]);
        } else {
            return response()->json([
                'success' => false,
                'message' => 'Utilisateur non authentifé'
            ],401);
        }
    }
    // controlleur qui fait le mise a jour du nom 
    // avec vérification du token pour quelle utilisateur exactement 
    
    public function updateName(Request $request)
{
    $user = auth()->user();

    if (!$user) {
        return response()->json([
            'success' => false,
            'message' => 'Utilisateur non authentifié'
        ], 401);
    }

    $validated = $request->validate([
        'name' => 'required|string|min:2|max:255',
    ]);

    $user->update($validated);

    return response()->json([
        'success' => true,
        'message' => 'Nom mis à jour avec succès',
        // 'user' => $user
    ]);
}
     // controlleur qui fait le mise a jour du nom 
    // avec vérification du token pour quelle utilisateur exactement  
    public function updatePassword(Request $request)
     {  
        $user = auth()->user();
        if (!$user){
            return response()->json([
                'success' => false,
            'message' => 'Utilisateur non authentifié'
            ],401);
        }
        $validated = $request->validate([
            'password' => 'required|string|min:8|max:255|regex:/[A-Z]/|regex:/[a-z]/|regex:/[\W_]/',
        ]); 
        $validated['password'] = Hash::make($validated['password']);

        $user->update($validated);
        return response()->json([
                'success' => true,
                 'message' => 'Mot de passe mis à jour avec succès',
        // 'user' => $user
        ]);
     }
     public function updateNumber(Request $request)
     {
        $user = auth()->user();
        if(!$user) {
            return response()->json([
                'success' => false, 
                'message' => 'Utilisateur non authentifié'
            ],401);
        }
        $validated = $request->validate([
            'number' => 'required|min:8|max:12'
        ]);
        $user->update($validated);
        return response()->json([
            'success' => true ,
            'message' => 'Numéro de téléphone mis à jour avec succés',
        ]);
     }
}
