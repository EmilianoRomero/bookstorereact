import React, { useState } from "react";
import "./book.css";
import "./popup.css";

//Tomamos cosas del state con la info del array y la metemos como argumento de la f,
//deconstruyendo al pasar desde el const Recipe = () y los labels en el div a esto:
//Pull/take things from the state and passing to the single element.
//Ingredients: es un array de objetos, por lo tanto lo voy a desplegar como un listado
//y para hacerlo necesito mapear en el array en cuestión. Llamé al ingrediente

const Book = ({ title, description, cover, detail }) => {
  const [displayModal, setDisplayModal] = useState(false);

  /*
  const openModal = () => {
  setDisplayModal(true);
  console.log("modalOpen");
  }

  const closeModal = () => {
  setDisplayModal(false);
  console.log("modalClosed");
  }
  */

  return (
    <>
    <div className="theBookContainer" id="the BookContainer">
      <div className="theBook" id="theBook">
        <div className="theFront" id="everySingleFront">
          <img className="front" id="cover" src={cover} alt="" />
        </div>
        <div className="theBack" id="everySingleBack">
          <h2 className="back" id="title">{title}</h2>
          <p className="back" id="description">{description}</p>
          <div id="moreInfo">
            <button
              className="buttonMoreInfo" id="buttonMoreInfo"
              onClick={() => setDisplayModal(true)}>info
            </button>
          </div>
        </div>
      </div>
    </div>
    {displayModal && (
    <div className="theModal" id="theModal">
      <img className="imgModal" src={detail} alt="" />
      <button className="closeModal" onClick={() => setDisplayModal(false)}>
        close
      </button>
    </div>
      )}
    </>
  );
}

export default Book;