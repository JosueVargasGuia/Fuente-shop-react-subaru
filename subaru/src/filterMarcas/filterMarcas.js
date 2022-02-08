import "./filterMarcas.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TipoCambio from "../producto/tipoCambio";
import { homepage, listaAcesorios, listaRepuesto, LOGGIN, lstMarcas, Moneda } from "../service/ENUM";
import BottonCarrito from "../utils/bottonCarrito";
import {  } from "../service/ENUM";
export default function 
FilterMarcas(props) {
  //let status = props.marcaSelect.codigoMarca === 0 ? 0 : 1;



  const [srcLogo] = useState(window.location.origin+(homepage===undefined?"":"/"+homepage) + "/marcas/logo.png");
  const [descripcion, setDescripcion] = useState(props.decripcion);
  let rowRepuesto =listaRepuesto.map((rowRepu) => <li key={rowRepu.codigo}>
    <Link to={"/shop/"+rowRepu.identificador+"/filter/all"}>&nbsp;&nbsp;<span>{rowRepu.descripcion}</span></Link>
  </li>);
  let rowAccesorio = listaAcesorios.map((rowAcce) => <li key={rowAcce.codigo}>
    <Link to={"/shop/"+rowAcce.identificador+"/filter/all"}>&nbsp;&nbsp;<span>{rowAcce.descripcion}</span></Link>
  </li>);


  let history = useHistory();
  const onClickImage = () => {
    console.log(props.marcaSelec);
    //props.handleSelectMarcaChange(props.marcaSelect.codigoMarca, 'FilterMarcas');
    props.handleSelectMarcaChange(lstMarcas[0].codigoMarca, 'FilterMarcas');
    history.push("/shop");
  };
 /* const onClickImageShop = () => {
    props.handleSelectMarcaChange(0, 'FilterMarcas');
  };*/
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
            Central Repuestos:{" "}
            <a className="class-telf" href="tel:">
             (511) 630 7600
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
              <li>Repuestos
                <ul>
                  {rowRepuesto}
                </ul>
              </li>
              <li >Accesorios y LifeStyle
                <ul>
                  {rowAccesorio}
                </ul>
              </li>
            </ul>

          </div>
        </div>
        <div className="inner-header">
          <div className="filter-home">
            <Link className="filter-home-concecionario" to={'/shop'}> <span className="filter-home-emp-nombre">EA Corp</span>&nbsp;<span className="filter-home-emp-sociedad">SAC&nbsp;</span>
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
      <ul className="nav-marcas">
          <li>
            <span>
              <i className="fa fa-bars menu-bar" aria-hidden="true"></i>
            </span>
            <ul>              
              <li>
                <div className="header-link-tipcambio">
                  Moneda
                  <select
                    className="tip-cambio-select "
                    name="numTipoMoneda"
                    value={props.moneda.numCodigoMoneda}
                    onChange={props.handleChangeTipoMoneda}
                  >
                    <option value={Moneda.DOLARES.numCodigoMoneda}>
                      {Moneda.DOLARES.codigoIso4217  }
                    </option>
                    <option value={Moneda.SOLES.numCodigoMoneda}>
                      {Moneda.SOLES.codigoIso4217 }
                    </option>
                  </select>
                </div>
              </li>
            </ul>
          </li>
        </ul>

      
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
              <li>Repuestos
                <ul>
                  {rowRepuesto}
                </ul>
              </li>
              <li >Accesorios y LifeStyle
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
