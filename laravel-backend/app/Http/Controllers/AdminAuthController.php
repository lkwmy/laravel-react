<?php

namespace App\Http\Controllers;

use App\Models\UserAdmin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AdminAuthController extends Controller
{
    // Gérer le login
    public function login(Request $request)
    {
        // Valider les données de connexion
        $credentials = $request->only('email', 'password');

        // Tenter de se connecter avec les identifiants
        if (Auth::attempt($credentials)) {
            // Récupérer l'utilisateur authentifié
            $user = Auth::user();

            // Créer un token personnel pour cet utilisateur
            $token = $user->createToken('e-commerce')->plainTextToken;

            // Retourner le token ainsi que les informations de l'utilisateur
            return response()->json([
                'token' => $token,
                'user' => [
                    'name' => $user->name,
                    'email' => $user->email,
                ]
            ]);
        }

        // Si l'authentification échoue, retourner une erreur
        return response()->json(['error' => 'Unauthorized'], 401);
       
        // // Validation des données envoyées
        // $request->validate([
        //     'email' => 'required',
        //     'password' => 'required',
        // ]);
        // if (!Auth::attempt($request->only('email', 'password'))) {
        //     return response()->json(['message' => 'Invalid credentials'], 401);
        // }
        // $user = Auth::user();
        // $token = $user->createToken('auth_token')->plainTextToken;

        // return response()->json([
        //     'access_token' => $token,
        //     'token_type' => 'Bearer',
        // ]);
    }

    // Gérer l'enregistrement
    public function register(Request $request)
    {
        // Validation des données envoyées
        $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|unique:useradmin',
            'password' => 'required|string',
        ]);

        // Création de l'utilisateur
        $user = UserAdmin::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json(['message' => 'Admin registered successfully'], 201);
    }

    // Déconnexion
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Logged out successfully']);
    }
}
