import React, {  useReducer } from "react";
//import Carousel from "react-elastic-carousel";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Link } from "react-router-dom";

import "../filterMarcas/filterMarcas.css";
import { homepage } from "../service/ENUM";


let actionType = {
  setCarrucel: "setCarrucel",   
  ERROR: "ERROR",
}
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setCarrucel:
      return {
        ...state,
        rowItem: action.rowItem,
      };    
    default:
      return state;
  }
}

export default function Carrucel(props) {   
 
  let rowItem = props.marca.lstCarrucel.map((objImagen) => (
    <picture>     
      <source srcset={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + objImagen.srcImage} media="((min-width: 803px) and (max-width: 1500px))" />     
      <source srcset={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImageMobile} media="(min-width: 10px) and (max-width: 802px)"/>
      <img
        className="container-Carousel-im22"
        key={objImagen.codigoCarrucel}
        alt={ objImagen.srcImage}
        srcset={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImage}
      ></img>   
    </picture>
  ));
// eslint-disable-next-line 
  const [state, dispatch] = useReducer(reducer, {rowItem:rowItem  }); 
  
  return (
    <div className="container-Carousel-list">    

      <div className="outlet">
        <Link to="/outlet"> 
          <img alt="outlet"   src={window.location.origin +(homepage===undefined?"":"/"+homepage) +"/marcas/outlet.png"} ></img> 
        </Link> 
      </div>


    <div className="container-Carousel-list-root">

      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showThumbs={false}
        interval={4000}
        showStatus={false}
        selectedItem={1}
        autoFocus={true}
        dynamicHeight={true} 
        
      >
        {state.rowItem}
      </Carousel>
      </div>
    </div>
  );
}
