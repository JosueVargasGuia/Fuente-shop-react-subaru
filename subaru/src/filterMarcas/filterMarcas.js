import "./filterMarcas.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TipoCambio from "../producto/tipoCambio";
import { homepage, LOGGIN, lstMarcas, Moneda } from "../service/ENUM";
import BottonCarrito from "../utils/bottonCarrito";

const listaRepuesto = [
  { descripcion: "Tren de Transmisión" ,codigo:1},
  { descripcion: "Sistema Eléctrico",codigo:2 },
  { descripcion: "Sistema de enfriamiento",codigo:3 },
  { descripcion: "Repuestos de Mantenimiento",codigo:4 },
  { descripcion: "Sistema de Dirección",codigo:5 },
  { descripcion: "Estilo de Vida Subaru",codigo:6 },
  { descripcion: "Interior" ,codigo:7},
  { descripcion: "Fluidos",codigo:8 },
  { descripcion: "Sistemas de Frenos" ,codigo:9},
  { descripcion: "Puertas y Paneles",codigo:10 },
  { descripcion: "Suspensión",codigo:11 },]

const listaAcesorios = [
  { descripcion: "Audio / Media",codigo:1 },
  { descripcion: "Comodidad y Conveniencia",codigo:2 },
  { descripcion: " Estilo de Vida",codigo:3 },
  { descripcion: "Protección y Seguridad",codigo:4 },
  { descripcion: "Estilo",codigo:5 },
  { descripcion: " Productos STI",codigo:6 },]
export default function 
FilterMarcas(props) {
  //let status = props.marcaSelect.codigoMarca === 0 ? 0 : 1;



  const [srcLogo] = useState(window.location.origin+(homepage==undefined?"":"/"+homepage) + "/marcas/logo.png");
  const [descripcion, setDescripcion] = useState(props.decripcion);
  let rowRepuesto = listaRepuesto.map((rowRepu) => <li key={rowRepu.codigo}>
    <Link to="/shop">{rowRepu.descripcion}</Link>
  </li>);
  let rowAccesorio = listaAcesorios.map((rowAcce) => <li key={rowAcce.codigo}>
    <Link to="/shop">{rowAcce.descripcion}</Link>
  </li>);


  let history = useHistory();
  const onClickImage = () => {
    console.log(props.marcaSelec);
    //props.handleSelectMarcaChange(props.marcaSelect.codigoMarca, 'FilterMarcas');
    props.handleSelectMarcaChange(lstMarcas[0].codigoMarca, 'FilterMarcas');
    history.push("/shop");
  };
  const onClickImageShop = () => {
    props.handleSelectMarcaChange(0, 'FilterMarcas');
  };
  async function handleClickBuscarProductos() {
    console.log(descripcion);
    history.push("/shop/search/filter/" + descripcion);
  }
  function handleInputChangeDescripcion(e) {
    setDescripcion(e.target.value);
    props.handleInputChangeDescripcion(e);
  }


  return (<>
    <div className="filter-marcas">
      <div className="header-nav">
        <div className="header-phone">
          <span className="span-phone">
            Llámenos:{" "}
            <a className="class-telf" href="tel:">
              01 631 5020
            </a>
          </span>
        </div>
        <div className="header-nav__wrapper">
          <div className="header-link-tipcambio">
            Tipo de cambio:
            <span className="tip-cambio">
              <TipoCambio></TipoCambio>
            </span>
            Moneda
            <select
              className="tip-cambio-select "
              name="numTipoMoneda"
              value={props.moneda.numCodigoMoneda}
              onChange={props.handleChangeTipoMoneda}
            >
              <option value={Moneda.DOLARES.numCodigoMoneda}>
                {Moneda.DOLARES.codigoIso4217}
              </option>
              <option value={Moneda.SOLES.numCodigoMoneda}>
                {Moneda.SOLES.codigoIso4217}
              </option>
            </select>
          </div>

          <div className="header-link">
            {props.islogin !== LOGGIN.LOGGIN ? (
              <Link className="btn_link" aria-hidden="true" to="/loginCliente" title="Iniciar sesión">
                <i className="material-icons">perm_identity</i>
                <span>Iniciar Sesion</span>
              </Link>
            ) : (
              <Link aria-hidden="true" onClick={props.handleLogout} to="/shop" title="Cerrar sesión">
                <i className="fa fa-sign-out" title="Cerrar sesión"></i>
                <span>Cerrar Sesion</span>
              </Link>
            )}
            {props.islogin === LOGGIN.LOGGIN ? (
              <Link
                className="link-usuario fa"
                aria-hidden="true"
                to="/dashboard"
                title="Iniciar sesión"
              >
                <i className="fa fa-user-o" title="Iniciar sesión"></i>
                <span> {props.NombreCompleto} </span>
              </Link>
            ) : ("")}
            <BottonCarrito islogin={props.islogin}></BottonCarrito>
          </div>
        </div>
      </div>

      <div className={`filter-row-1 isbrand`}>
        <div className="outer-header">
          <div className="filter-image">
            <img
              src={srcLogo}
              alt=""
              onClick={onClickImage}
            ></img>
          </div>
          <div className="filter-marca-categoria">
            <ul className="nav-span">
              <li>REPUESTOS
                <ul>
                  {rowRepuesto}
                </ul>
              </li>
              <li >ACCESORIOS
                <ul>
                  {rowAccesorio}
                </ul>
              </li>
            </ul>

          </div>
        </div>
        <div className="inner-header">
          <div className="filter-home">
            <Link className="filter-home-concecionario" to={'/shop'}> EA Corp - Concesionario Autorizado
            </Link>
           
          </div>
          <i className="fa fa-peru" aria-hidden="true"></i>
          <div className="filter-input">
            <div className="filter-input-search">
              <input
                placeholder="Búsqueda en Catálogo"
                value={props.decripcion}
                onChange={(e) => handleInputChangeDescripcion(e)}
              ></input>
              <i
                className="search-link fa fa-search"
                aria-hidden="true"
                onClick={handleClickBuscarProductos}
              ></i>
            </div>
          </div>
        </div>

      </div>
      <div className={`filter-row-2 filter-row-2-start`}>

        <div className="lista-marca">

        </div>
      </div>

      <div className="filter-row-mobile">


      
          <div className="filter-image">
            <img src={srcLogo} alt="" onClick={onClickImage}></img>
          </div>
       

        <div className="header-link">
          {props.islogin !== LOGGIN.LOGGIN ? (
            <Link aria-hidden="true" to="/loginCliente" title="Iniciar sesión">
              <i className="material-icons">perm_identity</i>
              <span>Iniciar Sesion</span>
            </Link>
          ) : (
            <Link aria-hidden="true" onClick={props.handleLogout} to="/shop" title="Cerrar sesión">
              <i className="fa fa-sign-out" title="Cerrar sesión"></i>
              <span>Cerrar Sesion</span>
            </Link>
          )}
          {props.islogin === LOGGIN.LOGGIN ? (
            <Link
              className="link-usuario fa"
              aria-hidden="true"
              to="/dashboard"
              title="Iniciar sesión"
            >
              <i className="fa fa-user-o" title="Iniciar sesión"></i>
              <span> {props.NombreCompleto} </span>
            </Link>
          ) : (
            ""
          )}
          <BottonCarrito islogin={props.islogin}></BottonCarrito>
        </div>
        <br/>
        
      </div>
     
      <div className="filter-row-mobile-input">
      <div className="filter-row-mobile-menu">
      <ul className="nav-span">
              <li>REPUESTOS
                <ul>
                  {rowRepuesto}
                </ul>
              </li>
              <li >ACCESORIOS
                <ul>
                  {rowAccesorio}
                </ul>
              </li>
            </ul>
      </div>
        <div className="filter-input-search">
          <input
            placeholder="Búsqueda en Catálogo"
            value={props.decripcion}
            onChange={(e) => props.handleInputChangeDescripcion(e)}
          ></input>
          <i
            className="search-link fa fa-search"
            aria-hidden="true"
            onClick={props.handleFindProducto}
          ></i>
        </div>
      </div>
    </div></>
  );
}
