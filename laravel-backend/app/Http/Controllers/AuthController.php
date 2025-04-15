<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Dotenv\Validator;
use Illuminate\Auth\Events\Validated;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    // Inscription de l'utilisateur
    public function register(Request $request)
    {
        
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email|unique:users,email',
            'number' => 'string',
            'password' => 'required|string|confirmed',
        ],
        [
            'email.unique' => "adresse mail existante",

        ] );

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'number' => $request->number,
            'password' => Hash::make($request->password),
        ]);

        // Authentifier l'utilisateur après l'enregistrement
        Auth::login($user);

        // Retourner un token API si nécessaire (par exemple, avec Sanctum)
        return response()->json(['message' => 'Utilisateur inscrit avec succès']);
    }
    public function registerAdmin(Request $request)
        {
            $request->validate([
                'name' => 'required|string',
                'email' => 'required|email|unique:users,email',
                'number' => 'nullable|string',
                'password' => 'required|string',
                'role' => 'nullable'
            ],
            [
                'email.unique' => "adresse mail existante",
    
            ] );
           User::create([
            'name' => $request->name,
            'email' => $request->email,
            'number' => $request->number,
            'password' => Hash::make($request->password),
            'role' => $request->role ?? '0',
           ]);
           // Retourner un token API si nécessaire (par exemple, avec Sanctum)
           return response()->json(['message' => 'Utilisateur inscrit avec succès']);
        }

    // Connexion de l'utilisateur
    public function login(Request $request) 
    {
        $credentials = $request->only('email', 'password');

        // Vérifier si l'utilisateur existe dans la base de données
    $user = User::where('email', $credentials['email'])->first();

    if (!$user) {
        // Si l'utilisateur n'existe pas
        return response()->json([
            'success' => false,
            'message' => 'User not found', // Utilisateur non enregistré
        ], 404);
    }
     // Vérifier si les informations d'identification sont correctes
     if(Auth::attempt($credentials)){
        $user = Auth::user();
        $token = $user->createToken('e-commerce')->plainTextToken;

        // Vérifier le rôle de l'utilisateur
        if($user->role === 'admin'){
            return response()->json([
                'success' => true,
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'message' => 'Login successful as admin', // Message optionnel
            ]);
        } else {
            // Si l'utilisateur n'est pas un admin
            return response()->json([
                'success' => false,
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ],
                'message' => 'Login successful as a client', // Message optionnel
            ]);
        }
     }
      // Si les informations d'identification sont incorrectes
    return response()->json([
        'success' => false,
        'message' => 'Invalid email or password', // Message d'erreur
    ], 401);
    }


public function logout(Request $request)
{
    // Vérifiez si l'utilisateur est authentifié
    if ($request->user()) {
        // Révoquez le token actuel
        $request->user()->currentAccessToken()->delete();

        return response()->json(['success' => true, 'message' => 'Logged out successfully']);
    }

    return response()->json(['success' => false, 'message' => 'User not authenticated'], 401);
}


    // Récupérer les informations de l'utilisateur authentifié
    public function user(Request $request)
    {
        return response()->json($request->user());
    }

 
  
}
