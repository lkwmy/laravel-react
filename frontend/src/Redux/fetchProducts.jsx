import axios from 'axios'
import React, { useEffect, useState } from 'react'


function XXX() {

    const [products, setProducts] = useState([]);
    useEffect(() => {
        const fetchDataProducts = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/products');
                setProducts(response.data) ;
            } catch(error) {
                console.error('Erreur lors de la récupération des produits:', error);
            }
        };

        fetchDataProducts();
    }, []); 


      // Styles en ligne
  const containerStyle = {
    position:'relative',
    width: '100%',
    maxHeight: '200px',
    overflow: 'hidden',  // Cette propriété cache tout ce qui dépasse du conteneur
    position: 'relative',
    backgroundColor: '#f4f4f4',
    display: 'flex',  // Utilise flexbox pour afficher les produits horizontalement
    flexWrap: 'wrap',  // Permet aux produits de passer à la ligne si nécessaire
    gap: '20px',  // Ajoute de l'espace entre les produits
  };

  const imagesContainerStyle = {
    display: 'flex',
    animation: 'scroll-left 10s linear infinite',
  };

  

  // Définition de l'animation @keyframes
  const animationKeyframes = `
    @keyframes scroll-left {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(-100%);
      }
    }
  `;

  // Injecter l'animation dans le head de la page
  React.useEffect(() => {
    const styleSheet = document.styleSheets[0];
    styleSheet.insertRule(animationKeyframes, styleSheet.cssRules.length);
  }, []);
    return (
 <div style={containerStyle}>
{products.length > 0 ? (
         products.map((product) => (
   <div key={product.id} style={imagesContainerStyle} >
      <img 
        src={`http://localhost:8000/storage/${product.img1}`}
        alt={`${product.name} image 1`}
        className="w-full h-48 object-contain mb-4"
      />
      <div style={{
      position: 'absolute',
      top: '10px',    // Décalage du texte vers le bas (vous pouvez ajuster cette valeur)
      left: '10px',   // Décalage du texte vers la gauche (vous pouvez ajuster cette valeur)
      backgroundColor: 'rgb(255, 255, 255)',  // Fond semi-transparent
      color: '#7dd3fc',  // Couleur du texte
      padding: '5px',  // Espacement autour du texte
      borderRadius: '5px',  // Arrondir les coins du fond
    }}> 
{product.name}
      </div>
      <h3 className="text-lg font-semibold"></h3>
    </div>
         ))
              ) : (
                <p>Aucun produit disponible</p>
            )}
    </div> 
    
  );
};

export default XXX




