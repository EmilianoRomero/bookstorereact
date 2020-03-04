import React, { useEffect, useState } from "react";
import Book from "./book";
import "./book.css";
import logo from "./logo.png";

const App = () => {
  //Con esta función de estado maneja la información devuelta.
  //En vez de console.log la manda a setBooks para poder visualizarla.
  //Conviene hacer un componente Book aparte!
  //Utiliza un array porque va a obtener un array de objetos como resultado.
  const [books, setBooks] = useState([]);

  //Para manejar la información de la búsqueda creo un state para la búsqueda.
  //Como la búsqueda es un string utiliza las comillas.
  //Como el campo está vacío no pone nada entre ellas.
  //En el return final, debajo del formulario, el valor del campo de búsqueda
  //que corresponde al campo en blanco es el que yo acá definí como search y le
  //dije usa el estado '', o sea, campo en blanco.
  const [search, setSearch] = useState("");

  //Creo un estado que me genere un fetch SOLAMENTE cuando hago click en enter.
  //Si no hago esto, lo que pasa es que cada vez que tipeo una letra en el campo
  //de búsqueda hace fetching! No tiene sentido.
  const [query, setQuery] = useState([]);

  //After every single time something changes, this is triggered via useEffect
  //El array vacío [] indica a la función que se aplique el useEffect cuando
  //la página es cargada al cliquear el botón submit. Llama a la función getBooks.
  useEffect(() => {
    getBooks();
    //console.log("hello!") se dispara al dar click a Search
  }, [query]);

  //Obtener la receta: de manera asíncrona. Le digo que la respuesta sea esperada y después fetch,
  // y que con la data que recibe (bajo la forma de response) espere y la transforme en un json
  // vía json method y me imprima la información. En este caso le pido sólo hits que son las recetas.
  //El objeto está compuesto por muchos otros datos, pero las recetas están contenidas en hits.
  const getBooks = async () => {
    const response = await fetch(`https://api.myjson.com/bins/zyv02`);
    const data = await response.json();
    console.log(data.books);
    setBooks(data.books);
  };

  //Ahora ejecuto la acción: cada vez que doy click me envíe el formulario.
  //Al mismo tiempo seteamos el setQuery al valor que sea que tengamos en el campo search.
  //Una vez que me tomó el valor ingresado y que le di click entonces le dijo que me
  //vuelva a dejar el campo en blanco.
  const getSearch = e => {
    //console.log('e', e.target)
    e.preventDefault();
    setQuery([search]);
    //console.log("hola!") Se dispara cuando doy enter a la búsqueda
    setSearch("");
  };

  //Defino la función que me dice que el valor que va a tomar la búsqueda al hacer click
  //Va a ser el valor ingresado en el target
  //Debería conectar con el filter!!!
  const updateSearch = e => {
    console.log(e.target.value);
    //console.log("Hola!") Cada vez que tipeo una letra se dispara esta función
    setSearch(e.target.value);
    //es equivalente a searchHandler(event){this.setState({event.target.value})}???
  };

  const filteredBooks = books.filter(book => {
    return Object.keys(book).some(key =>
      book[key].toLowerCase().includes(search)
    );
  });

  return (
    <>
      <div className="App">
        <div className="container">
          <div className="row" id="banner">
            <img className="img-responsive" id="logo" src={logo} alt="logo" />
            <h1 className="titles">UBIQUM's Bookstore</h1>
            <form onSubmit={getSearch} className="search-form">
              <input
                className="search-bar"
                type="text"
                placeholder={`Type here`}
                value={search}
                required
                onChange={updateSearch}
              />
              {/*<button className="search-button" type="submit">
                Search Book
              </button>*/}
            </form>
          </div>
          <div className="row" id="theBookshelf">
            {/*En el cuerpo le voy a pedir que me despliegue el array de recetas obtenidas, mediante un mapeo. Mediante propiedades y la ruta dentro del objeto despliego la info elegida. Index lo pongo para que React no tire el error con las keys*/}
            {filteredBooks.map((book, index) => (
              <Book
                key={index}
                title={book.title}
                description={book.description}
                cover={book.cover}
                detail={book.detail}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

/*
import React from 'react';
import './App.css';
//FILE: bookstore.js linked to bookstore.html

//ACCESSING JSON ON LINE.
accessingTheOnLineJSON()

function accessingTheOnLineJSON() {
  let url = "https://api.myjson.com/bins/zyv02"
  fetchingDataFromOnLineJSON(url)
}

//FETCHING IT! GETTING THE INFO FROM JSON ON LINE SERVER
function fetchingDataFromOnLineJSON(url) {
  fetch(url, {
      method: "GET",
    })

    .then(response => {
      console.log(response);
      return response.json();
    })

    .then(function (data) {
      //1.Checking the accessibility to the array            
      //1-a.Checking the information from the object
      console.log("Console data" + " ", data)
      console.log("Console data.books" + " ", data.books)

      //1-b.Defining my object to work with
      let books = data.books
      console.log("data.books = books" + " ", books);

      //1-c.Getting the keys for the element [0]
      Object.keys(books[0]).forEach(item => {
        console.log("Console object's keys" + " ", item);
      });

      //2-a.Getting book covers's links and their appended img; creating image in html, embeding img from src

      function fillTheBookshelf() {
        var i
        var booksL = books.length

        //THE BOOKSHELF
        let theBookshelf = document.getElementById("theBookshelf");

        for (i = 0; i < booksL; i++) {
          let coverImg = books[i].cover;
          console.log(coverImg);

          //THE BOOKCONTAINER
          let theBookContainer = document.createElement("DIV");
          theBookContainer.className = "theBookContainer";
          theBookContainer.id = "theBookContainer";

          //THE BOOK
          let theBook = document.createElement("DIV");
          theBook.className = "theBook";
          theBook.id = "everySingleBook"

          //THE FRONT
          let theFront = document.createElement("DIV");
          theFront.className = "theFront";
          theFront.id = "everySingleFront";

          //THE BACK
          let titles = []
          let descriptions = []
          let booksBackCovers = []
          let theBack = document.createElement("DIV");
          theBack.className = "theBack";
          theBack.id = "everySingleBack";

          //COVERS'S CONTENT
          let booksCover = document.createElement("IMG");
          booksCover.className = "front";
          booksCover.id = "cover"
          booksCover.src = coverImg;
          theFront.appendChild(booksCover);
          theBook.appendChild(theFront);

          //BACKCOVERS'S CONTENT
          let bookTitlesAndDescriptions = {}

          let title = books[i].title;
          titles.push(title);

          let description = books[i].description;
          descriptions.push(description);

          bookTitlesAndDescriptions.title = books[i].title;

          bookTitlesAndDescriptions.description = books[i].description;

          booksBackCovers.push(bookTitlesAndDescriptions);

          //TITLE
          let backCoverTitle = document.createElement("H2");
          backCoverTitle.className = "back";
          backCoverTitle.id = "title";
          backCoverTitle.innerHTML = bookTitlesAndDescriptions.title;
          theBack.appendChild(backCoverTitle);

          //DESCRIPTION
          let backCoverDescription = document.createElement("P");
          backCoverDescription.className = "back";
          backCoverDescription.id = "description";
          backCoverDescription.innerHTML = bookTitlesAndDescriptions.description;
          theBack.appendChild(backCoverDescription);

          theBook.appendChild(theBack);

          //COVER (FRONT) AND BACKCOVER (BACK)
          theBookContainer.appendChild(theBook);
          theBookshelf.appendChild(theBookContainer);

          //BUTTON MORE INFO
          let moreInfo = document.createElement("DIV");
          moreInfo.id = "moreInfo";
          let buttonMoreInfo = document.createElement("BUTTON");
          buttonMoreInfo.className = "buttonMoreInfo";
          buttonMoreInfo.id = "buttonMoreInfo";
          buttonMoreInfo.innerHTML = "+ info";
          moreInfo.appendChild(buttonMoreInfo);
          theBack.appendChild(moreInfo);

          //MODAL CONTENT FROM API WITH MORE INFO
          let booksMoreInfo = books[i].detail;

          //MODAL
          let theModal = document.createElement("DIV");
          theModal.className = "theModal";
          theModal.id = "theModal";
          theBookshelf.appendChild(theModal);

          //CREATE ELEMENT MODAL IMAGE
          let imgModal = document.createElement("IMG");
          imgModal.className = "imgModal";
          imgModal.src = booksMoreInfo;
          theModal.appendChild(imgModal);

          //BUTTON CLOSE MORE INFO
          let closeModal = document.createElement("BUTTON");
          closeModal.className = "closeModal";
          closeModal.id = "closeModal";
          closeModal.innerHTML = "close";
          theModal.appendChild(closeModal);

          //FUNCTION DISPLAY - CLOSE MODAL
          buttonMoreInfo.onclick = function () {
            theModal.style.display = "flex";
          }

          closeModal.onclick = function () {
            theModal.style.display = "none";
          }
        }
      }
      fillTheBookshelf(books)


      function createSearchInput() {
        let searchInputDiv = document.createElement("DIV");
        searchInputDiv.className = "searchInputDiv";

        //CREATING THE SEARCH FIELD AND DEFINING TYPE OF INPUT
        let searchBox = document.createElement("INPUT");
        searchBox.id = "searchBox";
        searchBox.name = "searchBox";
        searchBox.setAttribute("type", "search");
        searchInputDiv.appendChild(searchBox);
        banner.appendChild(searchInputDiv);

        let imgSearch = document.createElement("IMG");
        imgSearch.className = "imgSearch";
        imgSearch.id = "imgSearch";
        imgSearch.src = "magnifying-glass-search.svg";
        searchInputDiv.appendChild(imgSearch);

        let searchTip = document.createElement("P");
        searchTip.className = "searchTip";
        searchTip.id = "searchTip";
        searchInputDiv.appendChild(searchTip);

        document.getElementById("searchTip").innerHTML = "Hit enter to search"
        document.getElementById("searchBox").placeholder = "";

        //SEARCH FIELD
        let searchBtn = document.getElementById("imgSearch");
        let search = document.getElementById("searchBox");
        let tip = document.getElementById("searchTip");
        //---


        var i = 0;
        var message = "Type your search here";
        var speed = 100;

        searchBtn.addEventListener("click", () => {
          search.style.width = "18%";
          search.style.paddingLeft = "60px";
          search.style.cursor = "text";
          search.focus();
          typeWriter();
        })

        function typeWriter() {
          if (i < message.length) {
            msg = search.getAttribute("placeholder") + message.charAt(i);
            search.setAttribute("placeholder", msg);
            i++;
            setTimeout(typeWriter, speed);
          }
        }
        search.addEventListener("keydown", () => {
          tip.style.visibility = "visible";
          tip.style.opacity = "1";
        })


      }
      createSearchInput();

      //SEARCH THROUGH JSON AND FILTER





    })

    .catch(function (error) {
      console.log(error);
    });
}

export default App;
*/
