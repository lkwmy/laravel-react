// import { createSlice } from "@reduxjs/toolkit";

// // Définition de l'état initial pour ce slice.
// // Ici, l'état contient une propriété `products`, initialisée comme un tableau vide.
// const initialState = {
//     products: [],  // Liste des produits dans le panier
//     totalQuantity: 0, // Quantité totale de produits
//     totalPrice:0, // Prix total du panier
// }
// // Création du slice nommé `cartSlice` en utilisant la fonction `createSlice`.
// // Cela génère automatiquement les actions et le réducteur pour ce slice.
// const cartSlice = createSlice ({
//     // Nom donné au slice, qui sera utilisé comme préfixe pour les types d'actions.
//     name : 'cart',
//      // État initial pour ce slice.
//     initialState, 
//       // Définition des réducteurs pour gérer les actions et modifier l'état.
//     // Ici, aucun réducteur n'est défini pour ce slice.
//     reducers : {
//      // Les réducteurs pourraient être ajoutés ici à l'avenir pour gérer des actions spécifiques  
//      addToCart(state,action){
//         const newItem = action.payload;
//         const itemIndex = state.products.find((item)=> item.id === newItem.id);
//         if(itemIndex){
//             itemIndex.quantity++;
//             itemIndex.totalPrice += newItem.price
//         } else {
//             state.products.push({
//                 id : newItem.id,
//                 name : newItem.name,
//                 price : newItem.price,
//                 quantity : 1, 
//                 totalPrice : newItem.price, 
//                 image : newItem.image
//             })
//         }
//         state.totalPrice += Number(newItem.price) ; 
//         state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
//         state.totalQuantity ++ ;
//      },
//      removeFromCart(state, action) {
//         const id = action.payload;
//         const findItem = state.products.find((item)=> item.id === id); 
//         if (findItem) {
//             state.totalPrice -= findItem.totalPrice
//             state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
//             state.totalQuantity -= findItem.quantity
//             state.products = state.products.filter(item => item.id !== id) 
//         }
//      },
//      increaseQuantity(state, action) {
//         const id = action.payload;
//         const findItem = state.products.find((item)=> item.id === id);
//         if (findItem) {
//             findItem.quantity++;
//             findItem.totalPrice += findItem.price
//             state.totalQuantity++;
//             state.totalPrice+= findItem.price
//         } 
//      },
//      decreaseQuantity(state, action) {
//         const id = action.payload;
//         const findItem = state.products.find((item)=> item.id === id);
//         if(findItem.quantity > 1) {
//         if (findItem) {
//             findItem.quantity--;
//             findItem.totalPrice -= findItem.price
//             state.totalQuantity--;
//             state.totalPrice-= findItem.price
//         } 
//     }
//      },
//     }, 
    
// })

// export const {addToCart, removeFromCart, decreaseQuantity, increaseQuantity} = cartSlice.actions
// export default cartSlice.reducer


import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    products: [],
    totalQuantity: 0,
    totalPrice: 0,
};

const cartSlice = createSlice({
    name: "cart",
    initialState,
    reducers: {

        addToCart(state, action) {
            const newItem = action.payload;
        
            // Vérification que le prix est un nombre valide
            let price = parseFloat(newItem.price);
            
            // Si le prix n'est pas un nombre valide ou inférieur à 0, on retourne avec un message d'erreur
            if (isNaN(price) || price < 0) {
                console.error("Invalid price in addToCart action");
                return;
            }
        
            // Créez une copie de newItem avec le prix validé
            const updatedNewItem = { ...newItem, price };
        
            const existingItem = state.products.find((item) => item.id === updatedNewItem.id);
            if (existingItem) {
                // Créez une copie de existingItem et mettez à jour les propriétés
                const updatedExistingItem = {
                    ...existingItem,
                    quantity: existingItem.quantity + 1,
                    totalPrice: existingItem.totalPrice + updatedNewItem.price,
                };
        
                // Remplacez l'élément existant par la version mise à jour
                state.products = state.products.map((item) =>
                    item.id === updatedExistingItem.id ? updatedExistingItem : item
                );
            } else {
                // Ajoutez le produit à la liste des produits
                state.products.push({
                    id: updatedNewItem.id,
                    name: updatedNewItem.name,
                    price: updatedNewItem.price,
                    quantity: 1,
                    totalPrice: updatedNewItem.price,
                    image: updatedNewItem.image,
                });
            }
        
            // Mise à jour du prix total et de la quantité totale
            state.totalPrice += updatedNewItem.price;
            state.totalPrice = parseFloat(state.totalPrice.toFixed(2)); // Arrondi à 2 décimales
            state.totalQuantity++;
        },
        removeFromCart(state, action) {
            const id = action.payload;
            const findItem = state.products.find((item) => item.id === id);
            if (findItem) {
                state.totalPrice -= Number(findItem.totalPrice);
                state.totalPrice = parseFloat(state.totalPrice.toFixed(2));
                state.totalQuantity -= findItem.quantity;
                state.products = state.products.filter((item) => item.id !== id);
            }
        },
        increaseQuantity(state, action) {
            const id = action.payload;
            const findItem = state.products.find((item) => item.id === id);
            if (findItem) {
                findItem.quantity++;
                findItem.totalPrice += findItem.price;
                state.totalQuantity++;
                state.totalPrice = parseFloat((state.totalPrice + findItem.price).toFixed(2));
            }
        },
        decreaseQuantity(state, action) {
            const id = action.payload;
            const findItem = state.products.find((item) => item.id === id);
            if (findItem && findItem.quantity > 1) {
                findItem.quantity--;
                findItem.totalPrice -= findItem.price;
                state.totalQuantity--;
                state.totalPrice = parseFloat((state.totalPrice - findItem.price).toFixed(2));
            }
        },
    },
});

export const { addToCart, removeFromCart, decreaseQuantity, increaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;
