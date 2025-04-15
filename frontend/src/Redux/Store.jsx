// Importation de la fonction `configureStore` depuis la bibliothèque Redux Toolkit.
// Cette fonction est utilisée pour créer un magasin Redux (store) avec une configuration simplifiée.
import { configureStore } from "@reduxjs/toolkit";
// Importation du slice (tranche de l'état) de gestion du panier (cartSlice) depuis le fichier CartSlice.js.
// Ce slice contient le réducteur (reducer) et potentiellement des actions associées.
import cartSlice from './CartSlice';
// Importation du slice (tranche de l'état) de gestion des produits (productSlice) depuis le fichier ProductSlice.js.
// Ce slice contient également un réducteur et des actions spécifiques aux produits.
import productSlice from './ProductSlice';


// Création du store Redux en utilisant la fonction `configureStore`.
// On passe un objet de configuration avec les réducteurs combinés pour gérer différentes parties de l'état global.
const store = configureStore({
    reducer: {
        // Association de la tranche `cart` au réducteur `cartSlice` pour gérer l'état du panier
        cart:cartSlice, 
         // Association de la tranche `product` au réducteur `productSlice` pour gérer l'état des produits.
        product:productSlice,
    }
})

export default store; 
