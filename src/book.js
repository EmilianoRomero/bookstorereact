import React from 'react';
import "./book.css";

//Tomamos cosas del state con la info del array y la metemos como argumento de la f,
//deconstruyendo al pasar desde el const Recipe = () y los labels en el div a esto:
//Pull/take things from the state and passing to the single element.
//Ingredients: es un array de objetos, por lo tanto lo voy a desplegar como un listado
//y para hacerlo necesito mapear en el array en cuestión. Llamé al ingrediente

const Book = ({
    title,
    description,
    cover,
    detail
}) => {
    return ( 
        <div className="container">
            <div className="theBookshelf">
                <div className="theBookContainer">
                    <div className="theBook">
                        <div className="theFront" img src={cover} alt=""></div>
                        <div className="theBack">
                            <h2 className="back">{title}</h2>
                            <p className="back">{description}</p>
                            <div id="moreInfo">
                                <button className="buttonMoreInfo" /*onClick={handleEvent}*/>info</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="theModal" img src={detail} alt="">
                    <button className="closeModal" /*onClick={handleEvent}*/>close</button>
                </div>
            </div>
        </div>
    );
}

export default Book;