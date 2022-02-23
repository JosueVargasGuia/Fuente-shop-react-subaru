import React, { useEffect, useReducer } from "react";
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
  /* <img alt="outlet"  src={window.location.origin +(homepage==undefined?"":"/"+homepage) +"/marcas/outlet.png"}></img> */ 
  let rowItem = props.marca.lstCarrucel.map((objImagen) => (
    <picture>
      {/* Imagen PC */}
      <source srcset={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + objImagen.srcImage} media="(min-width: 800px)" />
      {/* Imagen Mobile */}
      <source srcset={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImageMobile} media="(min-width: 768px)"/>
      <img
        className="container-Carousel-im22"
        key={objImagen.codigoCarrucel}
        alt={ objImagen.srcImage}
        srcset={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImage}
      ></img>   
    </picture>
  ));

  const [state, dispatch] = useReducer(reducer, {rowItem:rowItem  });


  useEffect(()=>{  
    //handleWindowsResize();
    //window.addEventListener('resize',handleWindowsResize);
    //eslint-disable-next-line 
  },[props.marca]);
  
  function handleWindowsResize(){
    if(window.innerWidth<=767){
      let rowItem=[];
      rowItem = props.marca.lstCarrucel.map((objImagen) => (
        <img
          className="container-Carousel-img"
          key={objImagen.codigoCarrucel}
          alt={ objImagen.srcImageMobile}
          src={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImageMobile}
        ></img>
      )); 
      dispatch({ type: actionType.setCarrucel, rowItem: rowItem });     
    } else{
      let rowItem=[];
      rowItem = props.marca.lstCarrucel.map((objImagen) => (
        <picture>
          {/* Imagen PC */}
          <source srcset={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + objImagen.srcImage} media="(min-width: 800px)" />
          {/* Imagen Mobile */}
          <source srcset={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImageMobile} media="(min-width: 768px)"/>
          <img
            className="container-Carousel-img"
            key={objImagen.codigoCarrucel}
            alt={ objImagen.srcImage}
            srcset={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImage}
          ></img>
        </picture>
        // <img
        //   className="container-Carousel-img"
        //   key={objImagen.codigoCarrucel}
        //   alt={ objImagen.srcImage}
        //   src={window.location.origin +(homepage===undefined?"":"/"+homepage) + objImagen.srcImage}
        // ></img>
      )); 
      dispatch({ type: actionType.setCarrucel, rowItem: rowItem });  
    } 
  }
  
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
