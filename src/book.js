import React, { useEffect, useState } from "react";
import "./book.css";
import "./popup.css";

//Tomamos cosas del state con la info del array y la metemos como argumento de la f,
//deconstruyendo al pasar desde el const Recipe = () y los labels en el div a esto:
//Pull/take things from the state and passing to the single element.
//Ingredients: es un array de objetos, por lo tanto lo voy a desplegar como un listado
//y para hacerlo necesito mapear en el array en cuestión. Llamé al ingrediente

const Book = ({ title, description, cover, detail }) => {

 const [displayModal, setDisplayModal] = useState(false);

  return (
    <div className="theBookContainer">
      <div className="theBook">
        <div className="theFront">
          <img src={cover} alt="" />
        </div>
        <div className="theBack">
          <h2 className="back">{title}</h2>
          <p className="back">{description}</p>
          <div id="moreInfo">
            <button
              className="buttonMoreInfo"
              onClick={console.log("OpenModal")}
            >
              info
            </button>
          </div>
        </div>
      </div>

      {displayModal && (
        <div className="theModal">
          {" "}
          <img src={detail} alt="" />
          <button className="closeModal" onClick={console.log("CloseModal")}>
            close
          </button>
        </div>
      )}
    </div>
  );
};

export default Book;
