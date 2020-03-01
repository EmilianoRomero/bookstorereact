import React from 'react';
//import style from './recipe.module.css';

//Tomamos cosas del state con la info del array y la metemos como argumento de la f,
//deconstruyendo al pasar desde el const Recipe = () y los labels en el div a esto:
//Pull/take things from the state and passing to the single element.
//Ingredients: es un array de objetos, por lo tanto lo voy a desplegar como un listado
//y para hacerlo necesito mapear en el array en cuestión. Llamé al ingrediente
const Book = ({
    title,
    description,
    cover,
    language
}) => {
    return ( 
    <div>
        <h1>{title}</h1> 
        <p>{description}</p>
        <p> {language} </p> 
        <img src = {cover} alt = "" />
        </div>
    )
};

export default Book;