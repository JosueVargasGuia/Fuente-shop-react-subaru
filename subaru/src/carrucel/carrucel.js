import React from "react";
//import Carousel from "react-elastic-carousel";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import "../filterMarcas/filterMarcas.css";
import { homepage } from "../service/ENUM";

export default function Carrucel(props) {    
  let rowItem = props.marca.lstCarrucel.map((objImagen) => (
    <img
      className="container-Carousel-img"
      key={objImagen.codigoCarrucel}
      alt={ objImagen.srcImage}
      src={window.location.origin +(homepage==undefined?"":"/"+homepage) + objImagen.srcImage}
    ></img>
  ));

  return (
    <div className="container-Carousel-list">    
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
        {rowItem}
      </Carousel>
      <div className="outlet">
        <img alt="outlet" src={window.location.origin +(homepage==undefined?"":"/"+homepage) +"/marcas/outlet.png"}></img>
      </div>
    </div>
  );
}
