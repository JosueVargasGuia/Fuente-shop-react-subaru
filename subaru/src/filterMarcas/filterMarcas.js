import "./filterMarcas.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TipoCambio from "../producto/tipoCambio";
import { LOGGIN, Moneda } from "../service/ENUM";
import BottonCarrito from "../utils/bottonCarrito";

export default function FilterMarcas(props) {
  let status = props.marcaSelect.codigoMarca === 0 ? 0 : 1;
  const [srcLogo] = useState(window.location.origin + "/marcas/logo.jpg");
  const [descripcion, setDescripcion] = useState(props.decripcion);
  let rowMarcas = props.lstMarcas.map((objMarcas) =>
    objMarcas.codigoMarca !== 0 ? (
      <li
        className={
          props.marcaSelect !== undefined &&
            objMarcas.codigoMarca === props.marcaSelect.codigoMarca
            ? " nav-marcas-lista marca-select "
            : (status === 0?"nav-marcas-li-ul-li "+ objMarcas.classMarca:" nav-marcas-lista ")
        }
        value={objMarcas.codigoMarca}
        key={objMarcas.codigoMarca}
        onClick={(e) => props.handleSelectMarcaChange(e.currentTarget.value, 'FilterMarcas')}
      >
        <Link to={"/shop?descripcion=" + objMarcas.decripcion}>
          {status === 0 ? (
            <img src={objMarcas.srcImage} alt={objMarcas.decripcion}></img>
          ) : (
            objMarcas.decripcion
          )}
        </Link>
      </li>
    ) : (
      ""
    )
  );

  let rowMarcasList = props.lstMarcas.map((objMarcas) =>
    objMarcas.codigoMarca !== 0 ? (
      <li
        className={
          props.marcaSelect !== undefined &&
            objMarcas.codigoMarca === props.marcaSelect.codigoMarca
            ? "marca-select"
            : ""
        }
        value={objMarcas.codigoMarca}
        key={objMarcas.codigoMarca}
        onClick={(e) => props.handleSelectMarcaChange(e.currentTarget.value, 'FilterMarcas')}
      >
        <Link to={"/shop?descripcion=" + objMarcas.decripcion}>
          {objMarcas.decripcion}
        </Link>
      </li>
    ) : (
      ""
    )
  );

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
                {Moneda.DOLARES.codigoIso4217  }
              </option>
              <option value={Moneda.SOLES.numCodigoMoneda}>
                {Moneda.SOLES.codigoIso4217  }
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

      <div className={`filter-row-1 ${status == !0 ? "isbrand" : ""}`}>
        <div className="outer-header">
         {status === 0 ? (
            ""
          ) : (
            <div className="filter-image">
              <img
                src={
                  props.marcaSelect !== undefined
                    ? props.marcaSelect.srcImage
                    : ""
                }
                alt=""
                onClick={onClickImage}
              ></img>
            </div>
          )}

          
        


          {status !== 0 ?
            <div className="filter-marca-categoria">
              <Link to={"/shop/" + props.marcaSelect.decripcion + "/filter/all"} title="Búsqueda Avanzada">
                <i className="" aria-hidden="true" title="Búsqueda Avanzada"></i>Menú
            </Link>
            </div> : ''}
        </div>
        <div className="inner-header">
        <div className="filter-home">
            <Link onClick={onClickImageShop} to="/shop">
              <img src={srcLogo} alt="/marcas/logo.jpg"></img>
            </Link>
          </div>

          <div className="filter-input">
            <div className="filter-input-search">
              <input
                placeholder="Busqueda en Catálogo"
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
      <div className={`filter-row-2 ${status ===0 ? "filter-row-2-start" : "filter-row-2-center"} `}>
        {status === 0 ? "" : (<span className="filter-row-2-goto">Ir a:</span>)}
        <div className="lista-marca">
          <ul className="nav-marcas">
            <li>
              <ul>{rowMarcas}</ul>
            </li>
          </ul>
        </div>
      </div>

      <div className="filter-row-mobile">
        <ul className="nav-marcas">
          <li>
            <span>
              <i className="fa fa-bars menu-bar" aria-hidden="true"></i>
            </span>
            <ul>
              {rowMarcasList}
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
        {status === 0 ? (
          <>
            <div className="filter-image">
              <img src={srcLogo} alt="" onClick={onClickImage}></img>
            </div></>
        ) : (
          <>
            <div className="filter-marca-categoria">
              <Link to={"/shop/" + props.marcaSelect.decripcion + "/filter/all"} title="Búsqueda Avanzada">
                <i className="fa fa-filter" aria-hidden="true" title="Búsqueda Avanzada" ></i>
              </Link>
            </div>

            <div className="filter-image">
              <img
                src={
                  props.marcaSelect !== undefined
                    ? props.marcaSelect.srcImage
                    : ""
                }
                alt={props.marcaSelect.decripcion}
                onClick={onClickImage}
              ></img>
            </div></>
        )}
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
            placeholder="Busqueda en Catálogo"
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
