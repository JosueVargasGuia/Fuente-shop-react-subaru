import React from 'react';
import './statico.css'
import { Link } from 'react-router-dom';
export default function PagoSeguroEstatico() {
    return (<div className="titulo-div">
        <Link to="/shop">Inicio</Link>{'  '}/{'  '} Pago seguro
        <h3>Pago seguro</h3>

        <div className="titulo-div-contenido">
        <br />
        <br />
            <p className="titulo">PAGO EN LÍNEA</p>
            <br />
            <p className="contenido">Usted declara que al utilizar el sistema de pago en línea está autorizado a usar la tarjeta de crédito o débito para el pago de las compras que está realizando. No nos hacemos responsables si el pago es rechazado o negado por el emisor de la tarjeta por cualquier motivo. Si el ente emisor de la tarjeta rechaza el pago nuestra empresa no tiene ninguna obligación de informar sobre este hecho al titular de la tarjeta o al usuario. En ningún caso nuestros proveedores o cualquier otro tercero será responsable (en la medida en que lo permita la legislación) por cualquier pérdida o daño que surja del uso, de la incapacidad de uso, o de las consecuencias del uso de este sistema, de cualquier página web vinculada a esta, o de los materiales o información contenida.</p>
            <br />
        </div>
    </div>)
}