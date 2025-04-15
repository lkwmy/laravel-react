<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\product;
use Illuminate\Support\Facades\Storage;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return product::all();
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'brand' => 'required',
            'quantity' => 'required',
            'price' => 'required',
            'images' => 'array|max:5', // Maximum de 5 images
            'images.*' => 'image|mimes:jpeg,png,jpg,gif|max:2048', // Validation des fichiers image
        ]);
        $data = $request->all();
       // Vérifiez si des fichiers sont téléchargés
    if ($request->hasFile('images')) {
        $uploadedImages = $request->file('images');
        
        // Limiter à 5 images
        $uploadedImages = array_slice($uploadedImages, 0, 5);

        // Stockez chaque image et assignez-les aux colonnes img1, img2, etc.
        foreach ($uploadedImages as $index => $image) {
            $path = $image->store('products', 'public'); // Stockez dans le dossier storage/app/public/products
            
            $data['img' . ($index + 1)] = $path; // Ajoutez le chemin à la colonne img1, img2, etc.
        }
    }

    // Créez le produit en utilisant les données modifiées
    $product = Product::create($data);

    return response()->json([
        'message' => 'Product added successfully!',
        'product' => $product,
    ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return product::find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $product = product::find($id);
        $product->update($request->all());
        return $product;
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */

        public function destroy($id)
        {
            $product = product::find($id);
            if (!$product) {
                return response()->json(['message' => 'Produit non trouvé'], 404);

                if ($product->img1) {
                    // Générer le chemin complet de l'image
                    $imagePath = 'public/storage/'.$product->img1;
                   
                    if (Storage::exists($imagePath)){
                        
                        Storage::delete($imagePath);
                    }
                }
            }
            $product->delete();
            return response()->json(['message' => 'Produit supprimé avec succès.'], 200);
        }

 
    /**
     * Search for name
     *
     * @param  string  $name
     * @return \Illuminate\Http\Response
     */
    // quand on ajoute 'like' et les deux % dans ce code la il nous affiche tout les names qui commence 
    // par le lettre quand on a mit 
    public function search($name)
    {
        return product::where('name', 'like', '%'.$name.'%')->get();
    }
   
    

}
