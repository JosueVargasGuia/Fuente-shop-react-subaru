import "./filterMarcas.css";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import TipoCambio from "../producto/tipoCambio";
import { homepage,  LOGGIN, lstMarcas, Moneda } from "../service/ENUM";
import {  listaMenu, _CodigoGrupo, _IndentificadorMenu} from "../service/EnumMenu";
import BottonCarrito from "../utils/bottonCarrito";
import { } from "../service/ENUM";
export default function
  FilterMarcas(props) {
  //let status = props.marcaSelect.codigoMarca === 0 ? 0 : 1;



  const [srcLogo] = useState(window.location.origin + (homepage === undefined ? "" : "/" + homepage) + "/marcas/logo.png");
  const [descripcion, setDescripcion] = useState(props.decripcion);

  let rowRepuesto =[];/* listaRepuesto.map((rowRepu) =>
  <li key={rowRepu.identificador}>
    <Link to={"/shop/" + rowRepu.identificador + "/filter/all"} target={"_parent"}>&nbsp;&nbsp;<span>{rowRepu.descripcion}</span></Link>
  </li>);*/
  let rowAccesorio =[];
  
  /*listaAcesorios.map((rowAcce) => <li key={rowAcce.identificador}>
    <Link to={"/shop/" + rowAcce.identificador + "/filter/all"} target={"_parent"}>&nbsp;&nbsp;<span>{rowAcce.descripcion}</span></Link>
  </li>);*/
for (let index = 0; index < listaMenu.length; index++) {
    const menu = listaMenu[index];
    if(menu.codigoGrupo===_CodigoGrupo.Repuesto){
       
      rowRepuesto.push(
        <li key={menu.identificador}>
          <Link to={"/shop/" + menu.identificador + "/filter/all"} target={"_parent"}>&nbsp;&nbsp;<span>{menu.descripcion}</span></Link>
        </li>);
    }
    if(menu.codigoGrupo===_CodigoGrupo.Accesorio_LyfeStyle){
    
      rowAccesorio.push(
      <li key={menu.identificador}>
        <Link to={"/shop/" + menu.identificador + "/filter/all"} target={"_parent"}>&nbsp;&nbsp;<span>{menu.descripcion}</span></Link>
      </li>);
    }
  
}

  let history = useHistory();
  const onClickImage = () => {    
    //props.handleSelectMarcaChange(props.marcaSelect.codigoMarca, 'FilterMarcas');
    props.handleSelectMarcaChange(lstMarcas[0].codigoMarca, 'FilterMarcas');
    history.push("/shop");
  };
  /* const onClickImageShop = () => {
     props.handleSelectMarcaChange(0, 'FilterMarcas');
   };*/
  async function handleClickBuscarProductos() {
   
    props.handleInputChangeDescripcion({target:{value:descripcion}});
    //history.push("/shop/search/filter/" + descripcion);
    handleInputChangeDescripcion({target:{value:''}});
    history.push("/shop/"+_IndentificadorMenu.Busqueda+"/filter/search");
   
    
    
  }
  function handleInputChangeDescripcion(e) {
    setDescripcion(e.target.value);
    
    //props.handleInputChangeDescripcion(e);
  }
function handleOnKeyDown(e){   
  if(e.key==='Enter'){   
    handleClickBuscarProductos();
  }
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
            <span className="tip-cambio-moneda">Moneda</span>
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
            <ul className="nav-span">
              <li>
                <Link className="filter-home-concecionario" to={'/shop'}> <span className="filter-home-emp-nombre">EA Corp</span>&nbsp;<span className="filter-home-emp-sociedad">SAC&nbsp;</span>
                </Link>
                <ul className="nav-span-filter-home">
                   <li><a href='https://subaru.eanet.pe/misubaru/' target="_parent">&nbsp;&nbsp;&nbsp;Ir a suite MiSubaru</a></li>
                   <li><a href='https://subaru.eanet.pe/misubaru/loguin_site/1' target="_parent">&nbsp;&nbsp;&nbsp;Agendar Servicio</a></li>
                </ul>
                </li>
            </ul>

          </div>
          <i className="fa fa-peru" aria-hidden="true"></i>
          <div className="filter-input">
            <div className="filter-input-search">
              <input
                placeholder="Búscar por descripción"
                value={descripcion}
                onChange={(e) => handleInputChangeDescripcion(e)}
                onKeyDown={(e)=>handleOnKeyDown(e)}
              ></input>
               <button className="btn btn-primary btn-search" onClick={handleClickBuscarProductos}>
                <i className="fa fa-search "></i> 
              </button>
             
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
                      {Moneda.DOLARES.codigoIso4217}
                    </option>
                    <option value={Moneda.SOLES.numCodigoMoneda}>
                      {Moneda.SOLES.codigoIso4217}
                    </option>
                  </select>
                  
                </div>
              </li>
              <li> Tip.cambio:
                 
                <TipoCambio></TipoCambio>
                
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
        <br />

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
          <div className="inner-header">
            <div className="filter-home">
              <ul className="nav-span">
                <li>
                  <Link className="filter-home-concecionario" to={'/shop'}> <span className="filter-home-emp-nombre">EA Corp</span>&nbsp;<span className="filter-home-emp-sociedad">SAC&nbsp;</span>
                  </Link>
                  <ul className="nav-span-filter-home">
                    <li><a href='https://subaru.eanet.pe/misubaru/' target="_parent">&nbsp;&nbsp;&nbsp;Ir a suite MiSubaru</a></li>
                    <li><a href='https://subaru.eanet.pe/service/turno-atencion.do?p_accion_back=5' target="_parent">&nbsp;&nbsp;&nbsp;Agendar Servicio</a></li>
                  </ul>
                  </li>
              </ul>
            </div>
            <i className="fa fa-peru" aria-hidden="true"></i>
          </div>
        </div>
       
        <div className="filter-input-search">

        <input
                placeholder="Búscar por descripción"
                value={descripcion}
                onChange={(e) => handleInputChangeDescripcion(e)}
                onKeyDown={(e)=>handleOnKeyDown(e)}
              ></input>
          <button className="btn btn-primary btn-search" onClick={handleClickBuscarProductos}>
                <i className="fa fa-search "></i> 
          </button>
        </div>
      </div>
    </div></>
  );
}
