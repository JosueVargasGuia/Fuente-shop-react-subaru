import React from 'react';
import './statico.css'
import { Link } from 'react-router-dom';
import { Empresa } from "../service/ENUM";
export default function LugarRecojoEstatico() {
    return (<div className="titulo-div">
    <Link to="/shop">Inicio</Link>{'  '}/{'  '} Lugar de Recojo
    <br/>
    <br/>
    <p className="titulo">Lugar de Recojo</p>

    <div className="titulo-div-contenido">
      
        <br />
        <p className="contenido">En el caso que el cliente prefiera recoger su mercadería de nuestra bodega "no es un local de atención al público habitual", deberá acercase previa coordinación y confirmación a nuestro correo {Empresa.correo} a la siguiente dirección Calle Libertad 386 del distrito de San Miguel - Lima.</p>
        <p className="contenido">Reiteramos que al ser solo una bodega donde se almacenan los productos esta no tiene atención directa al público, por lo que si usted se acerca sin la cordinación previa no será atendido</p>
        <br />
    </div>
</div>)
}