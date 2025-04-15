// Importation de la fonction `createSlice` depuis la bibliothèque Redux Toolkit.
// Cette fonction est utilisée pour créer un slice (une tranche) de l'état Redux qui inclut le réducteur et les actions associées.
import { createSlice } from "@reduxjs/toolkit";


// Définition de l'état initial pour ce slice.
// Ici, l'état contient une propriété `products`, initialisée comme un tableau vide.
const initialState = {
    products: [],
    searchTerm:'',
    filteredData:[],
}
// Création du slice nommé `productSlice` en utilisant la fonction `createSlice`.
// Cela génère automatiquement les actions et le réducteur pour ce slice.
const productSlice = createSlice ({
    // Nom donné au slice, qui sera utilisé comme préfixe pour les types d'actions.
    name : 'products',
    // État initial pour ce slice.
    initialState, 
    // Définition des réducteurs pour gérer les actions et modifier l'état.
    reducers : {
         // Réducteur pour définir les produits.
        // Ce réducteur met à jour la propriété `products` de l'état avec les données fournies dans `action.payload`.
        setProducts(state, action ){
            state.products = action.payload
        },
        setSearchTerm(state, action) {
            state.searchTerm = action.payload
            state.filteredData = state.products.filter(product =>
                product.name.toLowerCase().includes(state.searchTerm.toLocaleLowerCase())
            )
        }
    }, 
    
})
// Exportation de l'action `setProducts` générée automatiquement par `createSlice`.
// Cela permet d'utiliser cette action pour envoyer des données au store.
export const {setProducts, setSearchTerm} = productSlice.actions ; 
// Exportation du réducteur généré automatiquement par `createSlice`.
// Cela permet de connecter ce réducteur au store Redux
export default productSlice.reducer