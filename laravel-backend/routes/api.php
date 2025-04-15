<?php

use App\Http\Controllers\AdminAuthController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Middleware\AdminAuth;
use App\Models\Message;
use App\Models\NewsletterEmail;
use Doctrine\DBAL\Schema\Schema;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Route;
use PharIo\Manifest\Email;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// authentification
Route::post('login', [AuthController::class, 'login']); // Login  
Route::post('register', [AuthController::class, 'register']); // Register 
// vérification de token d'utilisateur
 Route::middleware('auth:sanctum')->get('/verify-token',function(Request $request){
    return response()->json([
        'message' => 'Token valid',
        'user' => $request->user()
    ],200);
 });
// logout
Route::middleware('auth:sanctum')->post('logout', [AuthController::class, 'logout']);
// récupérer tout les users accés que pour les admins et il fait que soit authentifé
// Route::middleware('auth:sanctum','CheckRole')->get('users',[UserController::class, 'index']);
// Route::get('users',[UserController::class,'index']);
// // delete a user by id
// Route::delete('users/{id}', [UserController::class,'destroy']);
// // update user
// Route::put('users/{id}', [UserController::class,'update']);

// Protéger les routes 
Route::middleware(['auth:sanctum','CheckRole'])->group(function(){
    // Protéger les routes 
    Route::get('/protected-route',function(){
        return response()->json(['message' =>'Ceci est une route sécurisée']);
    });
    // update user
    Route::put('users/{id}',[UserController::class,'update']);
    // delete a user by id
    Route::delete('users/{id}', [UserController::class,'destroy']);
    // récupérer tout les users
    Route::get('users', [UserController::class,'index']);
        // add user for only admin (adding admin or client)
    Route::post('register/admin', [AuthController::class, 'registerAdmin']);

    // products 
    
        // create a new product
    Route::post('products', [ProductController::class,'store']);
         // show a single product by id
    Route::get('products/{id}', [ProductController::class,'show']);
         // update a product
    Route::put('products/{id}', [ProductController::class,'update']);
        // delete a product by id
    Route::delete('products/{id}', [ProductController::class,'destroy']);
         // search for a product by he's name
    Route::get('products/search/{name}', [ProductController::class ,'search']); 
});

    // show all products
    Route::get('products', [ProductController::class,'index']);

    // Route pour récupérer un certain user avec son token 
    Route::middleware('auth:sanctum')->get('/user', [UserController::class,'getUser']);

    // show liste of brand 
    Route::get('/products/brand', [ProductController::class, 'getProductsBrand']);

    // show liste of brand 
    Route::get('/products/brands',function() {
        $brands = DB::table('products')->pluck('brand');
        return response()->json(['data' => $brands], 200);
    });

    // Route pour faire une mise a jour pour le name, password, numéro pour l'utilisateur 
    Route::middleware('auth:sanctum')->patch('/update-name', [UserController::class,'updateName']);
    Route::middleware('auth:sanctum')->patch('/update-password', [UserController::class,'updatePassword']);
    Route::middleware('auth:sanctum')->patch('/update-number', [UserController::class,'updateNumber']);


    //newletter 
    Route::post('/store/email', function(Request $request) {
        $request->validate([
            'email' => 'required|email|unique:newsletter,email', // Validation
        ]);
        $newsletter = new NewsletterEmail();
        $newsletter->email = $request->input('email');
        $newsletter->save();

        return response()->json(['success' => true]);
    });

    // Contact 
    Route::post('/message', [MessageController::class, 'contact']);
    // ce route il faut ajouter dans le midleware d'admin
    Route::get('/messages',[MessageController::class,'index']);