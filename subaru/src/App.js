import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import "./App.scss";
import FilterMarcas from "./filterMarcas/filterMarcas";
import Carrucel from "./carrucel/carrucel";
import {
  displayLista,
  Empresa,
  homepage,
  HttpStatus,
  localStoreEnum,
  LOGGIN,
  lstMarcas,
  Moneda,
  statusSyncCotizacion,
  SUCCESS_SERVER,
} from "./service/ENUM";

/*Nuestra Empresa */
import EnvioEstatico from "./estaticos/envioEstatico";
import TerminoCondicionEstatico from "./estaticos/terminoCondicionEstatico";
import PagoSeguroEstatico from "./estaticos/pagoSeguroEstatico";
import LugarRecojoEstatico from "./estaticos/lugarRecojoEstatico";
/*Administracion de cuenta requieren login */
import DashboardCliente from "./loginCliente/dashboardCliente";

import TusCompras from "./loginCliente/dashboard/TusCompras";
import DireccionCliente from "./loginCliente/dashboard/direccionCliente";
import RecuperarPassword from "./loginCliente/recuperarPassword";
import CambiarPasswod from "./loginCliente/cambiarPassword";

/*Es publico y privado */
import RegistrarCliente from "./loginCliente/registrarCliente";

/*Enlaces publicos */
import Suscripcion from "./suscripcion/suscripcion";
import LoginCliente from "./loginCliente/loginCliente";

import ProductoDetalle from "./producto/productoDetalle";

import { handleSyncDatosCotizacion } from "./service/general";
import {
  obtenerCotizacionActiva,
  registrarCotizacion,
} from "./service/cotizacion.service";

import { CarritoDetalle } from "./producto/carritoDetalle";
import { CarritoPayment } from "./pago/carritoPayment";

//import querystring from "query-string";
import ProductoMarcaResumen from "./producto/productoMarcaResumen";
import ProductoDestacado from "./producto/productoDestacado";
import ImagenProducto from "./producto/imagenProducto";
import ProductoFilter from "./producto/productoFilter";
import BannerHeader from "./utils/BannerHeader";
import SuccesPayment from "./pago/succespayment";
import SuccesNoPayment from "./pago/succesnopayment";
import LoginAdmin from "./loginAdmin/loginAdmin";
import DashboardAdmin from "./loginAdmin/dashboardAdmin";
import RegistrarUsuario from "./loginAdmin/usuario/registrarUsuario";
import ListaUsuario from "./loginAdmin/usuario/listaUsuario";
import StockProducto from "./loginAdmin/producto/stockProducto";
import ListaCorreoJobs from "./loginAdmin/correojobs/listaCorreoJobs";
import ReporteCotizacion from "./loginAdmin/reporte/reporteCotizacion";
import { ProductoOutlet } from "./producto/productoOutlet";
import OutletCargaProducto  from "./loginAdmin/producto/outletCargaProducto";
import ListadoProductoOutlet  from "./loginAdmin/producto/listadoProductoOutlet";
//import $ from "jquery"; $( "#btn" ).click();
let actionType = {
  SELECT_MARCAS: "SELECT_MARCAS",
  SELECT_MARCAS_FORDETALLE: "SELECT_MARCAS_FORDETALLE",
  INPUT_DESCRIPCION: "INPUT_DESCRIPCION",
  ISLOGING: "ISLOGING",
  CHANGE_MONEDA: "CHANGE_MONEDA",
  findProducByDesc: "findProducByDesc",
  findProducto: "findProducto",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SELECT_MARCAS:
       
      return {
        ...state,
        marca: action.marca,
        findProducto: action.findProducto,
        displayLista: action.displayLista,
        indexCarrucel: 0,
      };
    case actionType.SELECT_MARCAS_FORDETALLE:
       
      return {
        ...state,
        marca: action.marca,
        indexCarrucel: action.indexCarrucel,

        findProducto: false,
      };
    case actionType.INPUT_DESCRIPCION:
      return { ...state, descripcion: action.descripcion, findProducto: false };
    case actionType.ISLOGING:
      return {
        ...state,
        islogin: action.islogin,
        usuario: action.usuario,
        findProducto: false,
      };
    case actionType.CHANGE_MONEDA:
      return { ...state, moneda: action.moneda, findProducto: false };
    case actionType.findProducByDesc:
      return {
        ...state,
        findProducByDesc: action.findProducByDesc,
        findProducto: action.findProducto,
      };
    case actionType.findProducto:
      return {
        ...state,
        findProducto: action.findProducto,
      };
    default:
      return state;
  }
};

function App() {
  // const parsed = querystring.parse(window.location.search);
  /* let _marca = lstMarcas.find(
    (marca) => marca.decripcion === parsed.descripcion
  );
  console.log(_marca)*/
  let _marca = lstMarcas[0];
  /**/
  // console.log(params.decripcion)
  let height = window.innerHeight - 25;
  let usuario = {
    NombreCompleto: "",
    numCodigoCliente: 0,
    vchDocumento: "",
    chrEmail: "",
  };

  if (localStorage.getItem(localStoreEnum.USUARIO) !== null) {
    usuario = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
  }
  const [state, dispatch] = useReducer(reducer, {
    marca: _marca === undefined ? lstMarcas[0] : _marca,
    descripcion: "",
    findProducByDesc: "",
    findProducto: false,
    islogin: localStorage.getItem(localStoreEnum.ISLOGIN),
    usuario: usuario,
    numTipoCambio: 0.0,
    moneda: Moneda.DOLARES,
    indexCarrucel: 0,
    displayLista: displayLista.RESUMEN,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  async function handleIsLoggin(e, usuarioLogin) {
    let usuario = {
      NombreCompleto: usuarioLogin.usuario.cliente.vchNombreCompleto,
      numCodigoCliente: usuarioLogin.usuario.cliente.numCodigoCliente,
      vchDocumento: usuarioLogin.usuario.cliente.vchDocumento,
      chrEmail: usuarioLogin.usuario.chrEmail,
      numCodigoClienteUsuario: usuarioLogin.usuario.numCodigoClienteUsuario,
      chrRol: usuarioLogin.usuario.chrRol,
    };

    localStorage.setItem(localStoreEnum.ISLOGIN, LOGGIN.LOGGIN);
    localStorage.setItem(localStoreEnum.USUARIO, JSON.stringify(usuario));
    localStorage.setItem(localStoreEnum.TOKEN, usuarioLogin.usuario.token);

    /*Syncronizacion de cotizacion */
    let cotizacion = handleSyncDatosCotizacion();
    if (cotizacion.status === statusSyncCotizacion.SYNCRONIZA) {
      /*CASO 1 EXISTE COTIZACION EN EL BROWSER: Existe una cotizacion activa en el browser por lo tanto se enlaza al usuario logeado*/
      const rpt = await registrarCotizacion(cotizacion);
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          cotizacion.numCodigoCotizacionOnline = json.numCodigoCotizacionOnline;
          cotizacion.numCodigoCliente = json.numCodigoCliente;
          cotizacion.numCodigoClienteUsuario = json.numCodigoClienteUsuario;
          localStorage.setItem(
            localStoreEnum.COTIZACION,
            JSON.stringify(cotizacion)
          );
        }
      }
    } else {
      /* CASO 21 NO EXISTE COTIZACION EN EL BROWSER:por lo tanto se busca en la bd la cotizacion activa */
      let cotizacionActiva = {
        numCodigoCliente: usuario.numCodigoCliente,
        numCodigoClienteUsuario: usuario.numCodigoClienteUsuario,
        isLogin: 1,
      };
      const rpt = await obtenerCotizacionActiva(cotizacionActiva);
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          if (json.numCodigoCotizacionOnline >= 1) {
            cotizacion.numCodigoCotizacionOnline =
              json.numCodigoCotizacionOnline;
            cotizacion.numCodigoCliente = json.numCodigoCliente;
            cotizacion.numCodigoClienteUsuario = json.numCodigoClienteUsuario;
            localStorage.setItem(
              localStoreEnum.COTIZACION,
              JSON.stringify(cotizacion)
            );
          }
        }
      }
    }
    dispatch({
      type: actionType.ISLOGING,
      islogin: localStorage.getItem(localStoreEnum.ISLOGIN),
      usuario: usuario,
    });
  }
  function handleLogout() {
    localStorage.removeItem(localStoreEnum.ISLOGIN);
    localStorage.removeItem(localStoreEnum.USUARIO);
    localStorage.removeItem(localStoreEnum.TOKEN);
    localStorage.removeItem(localStoreEnum.COTIZACION);
    dispatch({
      type: actionType.ISLOGING,
      islogin: LOGGIN.LOGOUT,
      usuario: "",
    });
  }

  function handleSelectMarcaForDetalleProducto(chrCodigoFamilia) {
    console.log("handleSelectMarcaForDetalleProducto");
    let marca = lstMarcas.find(
      (marca) => marca.chrcodigofamilia === chrCodigoFamilia
    );
    console.log(marca);
    dispatch({
      type: actionType.SELECT_MARCAS_FORDETALLE,
      marca: marca,
      indexCarrucel: 0,
    });
  }

  function handleInputChangeDescripcion(e) {
    console.log("handleInputChangeDescripcion");
    console.log(e);
    dispatch({
      type: actionType.INPUT_DESCRIPCION,
      descripcion: e.target.value,
    });
  }

  /*Al seleccionar la marca del producto */
  async function handleSelectMarcaChange(e, invoke) {
    
    let marca = lstMarcas.find((marca) => marca.codigoMarca === e);
    if(marca===undefined){
      marca=lstMarcas[0];
    }
    dispatch({
      type: actionType.SELECT_MARCAS,
      marca: marca,
      findProducto: true,
      displayLista: displayLista.DETALLE,
    });
  }

  /*Al darle click en el boton buscar 
  async function handleClickBuscarProductos() {
    let _descripcion = state.descripcion;
    console.log("handleClickBuscarProductos:" + _descripcion);
 
     dispatch({
      type: actionType.findProducByDesc,
      findProducByDesc: _descripcion,
      findProducto: true,
    }); 
  }
 */
  function handleChangeTipoMoneda(e) {
    if (Moneda.DOLARES.numCodigoMoneda === e.target.value) {
      dispatch({ type: actionType.CHANGE_MONEDA, moneda: Moneda.DOLARES });
    }
    if (Moneda.SOLES.numCodigoMoneda === e.target.value) {
      dispatch({ type: actionType.CHANGE_MONEDA, moneda: Moneda.SOLES });
    }
  }
  useEffect(() => {
    console.log("App[useEffect INIT]");
    //console.log(state)
    dispatch({ type: actionType.findProducto, findProducto: false });
  }, []);
  useEffect(() => {
    console.log("App[useEffect]");
    //console.log(state)
  });

  return (
    <div className="App" style={{ height: height }}>
      <BrowserRouter  >
        <BannerHeader></BannerHeader>
        <div className="header-top">
          <div className="container">
            <FilterMarcas
              lstMarcas={lstMarcas}
              handleSelectMarcaChange={handleSelectMarcaChange}
              handleInputChangeDescripcion={handleInputChangeDescripcion}
              marcaSelect={state.marca}
              descripcion={state.descripcion}
              //handleFindProducto={handleClickBuscarProductos}
              moneda={state.moneda}
              handleChangeTipoMoneda={handleChangeTipoMoneda}
              islogin={state.islogin}
              NombreCompleto={state.usuario.NombreCompleto}
              handleLogout={handleLogout}
            ></FilterMarcas>
          </div>
        </div>
        <div className="container">
          <Switch>
            <Route path={"/shop"} exact={true}>
              <div className="container-Carousel">
                <Carrucel
                  marca={state.marca}
                  indexCarrucel={state.indexCarrucel}
                ></Carrucel>
                <ProductoMarcaResumen
                  marcaSelect={state.marca}
                ></ProductoMarcaResumen>
                <ProductoDestacado
                  marcaSelect={state.marca}
                  displayLista={state.displayLista}
                  moneda={state.moneda}
                ></ProductoDestacado>
                
              </div>
            </Route>
            <Route path={"/outlet"} exact={true}>
              <ProductoOutlet
                marcaSelect={state.marca}
                displayLista={state.displayLista}
                moneda={state.moneda}
              ></ProductoOutlet>
            </Route>
            <Route path={"/shop/:descripcion/filter/:query"} exact={true}>
              <ProductoFilter
                moneda={state.moneda}
                handleSelectMarcaChange={handleSelectMarcaChange}
              ></ProductoFilter>
            </Route>

            <Route path={"/succesPayment"} exact={true}>
              <SuccesPayment></SuccesPayment>
            </Route>
            <Route path={"/succesNopayment"} exact={true}>
              <SuccesNoPayment></SuccesNoPayment>
            </Route>

            <Route path="/tusCompras/:numCodigoCliente">
              <TusCompras />
            </Route>
            <Route path="/direccion/:numCodigoCliente/:linkNavegacion">
              <DireccionCliente />
            </Route>

            <Route path="/envio">
              <EnvioEstatico />
            </Route>
            <Route path="/lugarRecojo">
              <LugarRecojoEstatico />
            </Route>
            <Route path="/pagoSeguro">
              <PagoSeguroEstatico />
            </Route>

            <Route path="/terminoCondicion">
              <TerminoCondicionEstatico linkNavegacion="App" />
            </Route>
            <Route path="/loginCliente">
              <LoginCliente islogin={handleIsLoggin} />
            </Route>
            <Route
              path={"/Admin/" + Empresa.ruc + "/" + Empresa.abreviaturaSucursal}
            >
              <LoginAdmin islogin={handleIsLoggin} />
            </Route>
            <Route path="/registrarCliente">
              <RegistrarCliente invocacion="R" />
            </Route>
            <Route path="/informacion/:numCodigoCliente/:linkNavegacion">
              <RegistrarCliente invocacion="I" />
            </Route>
            <Route path="/dashboard" exact={true}>
              <DashboardCliente
                numCodigoCliente={state.usuario.numCodigoCliente}
              />
            </Route>
            <Route path="/dashboardAdmin" exact={true}>
              <DashboardAdmin
                numCodigoCliente={state.usuario.numCodigoCliente}
              />
            </Route>
            <Route path="/detalle/:chrCodigoFamilia/:vchDescripcion/:chrCodigoProducto">
              <ProductoDetalle
                eventSelectMarca={handleSelectMarcaForDetalleProducto}
                moneda={state.moneda}
              />
            </Route>
            <Route path="/carrito">
              <CarritoDetalle moneda={state.moneda}></CarritoDetalle>
            </Route>
            <Route path="/pedidoCarrito">
              <CarritoPayment moneda={state.moneda}></CarritoPayment>
            </Route>

            <Route path="/recuperarContraseña">
              <RecuperarPassword></RecuperarPassword>
            </Route>
            <Route path="/cambiarContraseña">
              <CambiarPasswod></CambiarPasswod>
            </Route>
            <Route path="/productoImagen">
              <ImagenProducto />
            </Route>
            <Route path="/listaProductosOutlet">
              <ListadoProductoOutlet numCodigoCliente={state.usuario.numCodigoCliente}></ListadoProductoOutlet>
            </Route>
            <Route path="/outletCarga/:numProductoVigencia/:crud">
              <OutletCargaProducto numCodigoCliente={state.usuario.numCodigoCliente}></OutletCargaProducto>
            </Route>
            <Route path="/stock">
              <StockProducto
                numCodigoCliente={state.usuario.numCodigoCliente}
              />
            </Route>

            <Route path="/usuarioAdmin/:numCodigoCliente/:numCodigoClienteUsuario">
              <RegistrarUsuario
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></RegistrarUsuario>
            </Route>
            <Route path="/listaCorreoJobs">
              <ListaCorreoJobs
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ListaCorreoJobs>
            </Route>
            <Route path="/reporteCotizacion">
              <ReporteCotizacion
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ReporteCotizacion>
            </Route>
            <Route path="/listaUsuarioAdmin">
              <ListaUsuario
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ListaUsuario>
            </Route>
            <Route path="/">
              <Carrucel
                marca={lstMarcas[0]}
                indexCarrucel={state.indexCarrucel}
              ></Carrucel>
              <ProductoMarcaResumen
                marcaSelect={state.marca}
                displayLista={state.displayLista}
                moneda={state.moneda}
              ></ProductoMarcaResumen>
              <ProductoDestacado
                marcaSelect={state.marca}
                displayLista={state.displayLista}
                moneda={state.moneda}
              ></ProductoDestacado>
            </Route>
          </Switch>
          <br />
        </div>
        <div className="suscripcion">
          <Suscripcion></Suscripcion>
        </div>
        <div className="footer">
          <div className="container">
            <ul>
              <li>
                <span>
                  PRODUCTOS
                  <ul>
                    <li>
                      <Link to="/shop/oferta/filter/all">Ofertas</Link>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <span>
                  NUESTRA EMPRESA
                  <ul>
                    <li>
                      <Link to="/envio">Envío</Link>
                    </li>
                    <li>
                      <Link to="/terminoCondicion">Términos y condiciones</Link>
                    </li>
                    <li>
                      <Link to="/pagoSeguro">Pago seguro</Link>
                    </li>
                    <li>
                      <Link to="/lugarRecojo">Lugar de Recojo</Link>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <span>
                  <Link className="fa" aria-hidden="true" to="/dashboard">
                    {"CUENTA CLIENTE"}
                  </Link>
                  <ul>
                    <li>
                      <Link
                        to={
                          "/informacion/" +
                          (state.usuario.numCodigoCliente === undefined
                            ? 0
                            : state.usuario.numCodigoCliente) +
                          "/DashboardCliente"
                        }
                      >
                        Información personal
                      </Link>
                    </li>

                    <li>
                      <Link
                        to={
                          "/tusCompras/" +
                          (state.usuario.numCodigoCliente === undefined
                            ? 0
                            : state.usuario.numCodigoCliente)
                        }
                      >
                        Tus Compras
                      </Link>
                    </li>
                    <li>
                      <Link
                        to={
                          "/direccion/" +
                          (state.usuario.numCodigoCliente === undefined
                            ? 0
                            : state.usuario.numCodigoCliente) +
                          "/DashboardCliente"
                        }
                      >
                        Direcciones de Entrega
                      </Link>
                    </li>
                  </ul>
                </span>
              </li>
              <li>
                <span>
                  INFORMACIÓN DE LA TIENDA
                  <p>
                    Av. Republica de Panama 4259
                    <br />
                    Peru
                    <br />
                    Central de Repuestos:{" "}
                    <a className="class-telf" href="tel:">
                      01 630 7600
                    </a>
                    <br />
                    Envíenos un correo electrónico:
                    <br />
                    <a
                      className="class-telf"
                      href="mailto:repuestos.subaru@eanet.pe"
                    >
                      {" "}
                      <span className="text-break">
                        repuestos.subaru@eanet.pe
                      </span>
                    </a>
                  </p>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
