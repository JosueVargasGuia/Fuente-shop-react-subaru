import "./filterMarcas.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TipoCambio from "../producto/tipoCambio";
import { LOGGIN, Moneda } from "../service/ENUM";
import BottonCarrito from "../utils/bottonCarrito";

const listaRepuesto = [
  { descripcion: "Tren de Transmisión" },
  { descripcion: "Sistema Eléctrico" },
  { descripcion: "Sistema de enfriamiento" },
  { descripcion: "Repuestos de Mantenimiento" },
  { descripcion: "Sistema de Dirección" },
  { descripcion: "Estilo de Vida Subaru" },
  { descripcion: "Interior" },
  { descripcion: "Fluidos" },
  { descripcion: "Sistemas de Frenos" },
  { descripcion: "Puertas y Paneles" },
  { descripcion: "Suspensión" },]

const listaAcesorios = [
  { descripcion: "Audio / Media" },
  { descripcion: "Comodidad y Conveniencia" },
  { descripcion: " Estilo de Vida" },
  { descripcion: "Protección y Seguridad" },
  { descripcion: "Estilo" },
  { descripcion: " Productos STI" },]
export default function 
FilterMarcas(props) {
  //let status = props.marcaSelect.codigoMarca === 0 ? 0 : 1;



  const [srcLogo] = useState(window.location.origin + "/marcas/logo.png");
  const [descripcion, setDescripcion] = useState(props.decripcion);
  let rowRepuesto = listaRepuesto.map((rowRepu) => <li>
    <Link>{rowRepu.descripcion}</Link>
  </li>);
  let rowAccesorio = listaAcesorios.map((rowAcce) => <li>
    <Link>{rowAcce.descripcion}</Link>
  </li>);


  let history = useHistory();
  const onClickImage = () => {
    props.handleSelectMarcaChange(props.marcaSelect.codigoMarca, 'FilterMarcas');
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
            <Link className="filter-home-concecionario"> EA Corp - Concesionario Autorizado<i className="fa fa-peru" aria-hidden="true"></i>
            </Link>
            
          </div>

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


        <>
          <div className="filter-image">
            <img src={srcLogo} alt="" onClick={onClickImage}></img>
          </div>
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
          </>

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
      </div>
      <div className="filter-row-mobile-input">
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
