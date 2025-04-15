import axios from 'axios'
import React, { useEffect, useState } from 'react'
// import casqueaudio from './Images/casqueaudio.jpeg'
// import pcportable from './Images/pcportable.jpeg'
// import smartphone from './Images/smartphone.jpeg'
// import tele from './Images/tele.jpeg'
// import tablette from './Images/tablette.jpeg'

export const Categories = [
"Categorie 1",
"Categorie 2",
"Categorie 3",
"Categorie 4",
"Categorie 5",
"Categorie 6",
];


export const useFackeData = () => {
   const [fackeData, setFackeData] = useState([]);

   useEffect(() => {
       const fetchDataProducts = async () => {
           try {
               const response = await axios.get('http://localhost:8000/api/products');
               setFackeData(response.data);
           } catch (error) {
               console.error('Erreur lors de la récupération des produits:', error);
           }
       };

       fetchDataProducts();
   }, []);
   return fackeData;
};


// export const fackeData = [
//      {
//         id: 1 , 
//         image : casqueaudio ,
//         name: "Product 1 ", 
//         price : 49.99,
//      },
//      {
//         id: 2 , 
//         image : pcportable ,
//         name: "Product 2 ", 
//         price : 1249.99,
//      },
//      {
//         id: 3 , 
//         image : smartphone ,
//         name: "Product 3 ", 
//         price : 499.99,
//      },
//      {
//         id: 4 , 
//         image : tele ,
//         name: "Product 4 ", 
//         price : 299.99,
//      },
//      {
//         id: 5 , 
//         image : tablette ,
//         name: "Product 5 ", 
//         price : 99.99,
//      },
//      {
//         id: 6 , 
//         image : casqueaudio ,
//         name: "Product 6 ", 
//         price : 99.99,
//      },
//      {
//         id: 7 , 
//         image : tele ,
//         name: "Product 7 ", 
//         price : 99.99,
//      },
//      {
//         id: 8 , 
//         image : tablette ,
//         name: "Product 8 ", 
//         price : 99.99,
//      },
//      {
//         id: 9 , 
//         image : smartphone ,
//         name: "Product 9 ", 
//         price : 99.99,
//      },
//      {
//         id: 10 , 
//         image : casqueaudio ,
//         name: "Product 10 ", 
//         price : 99.99,
//      },
// ];