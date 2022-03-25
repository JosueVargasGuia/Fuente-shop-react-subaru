import React, { useEffect, useReducer } from "react";
import { BrowserRouter, Route, Switch, Link } from "react-router-dom";

import "./App.scss";
import FilterMarcas from "./filterMarcas/filterMarcas";
import Carrucel from "./carrucel/carrucel";
import {
  displayLista,
  Empresa,
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
import OutletCargaProducto from "./loginAdmin/producto/outletCargaProducto";
import ListadoProductoOutlet from "./loginAdmin/producto/listadoProductoOutlet";
import TestAuto from "./loginAdmin/testAuto";
import MenuPersonalizado from "./loginAdmin/menu/menuPersonalizado";
import MenuPersonalizado2 from "./loginAdmin/menu/menuPersonalizado2";
 
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
    window.location.href = "/shop";
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
    dispatch({
      type: actionType.INPUT_DESCRIPCION,
      descripcion: e.target.value,
    });
    
    
  }

  /*Al seleccionar la marca del producto */
  async function handleSelectMarcaChange(e, invoke) {
    let marca = lstMarcas.find((marca) => marca.codigoMarca === e);
    if (marca === undefined) {
      marca = lstMarcas[0];
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
      <BrowserRouter>
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

        <Switch>
          <Route path={"/shop"} exact={true}>
            <div className="container-Carousel">
              <Carrucel
                marca={state.marca}
                indexCarrucel={state.indexCarrucel}
              ></Carrucel>
              <div className="container">
                <ProductoMarcaResumen
                  marcaSelect={state.marca}
                ></ProductoMarcaResumen>
                <ProductoDestacado
                  marcaSelect={state.marca}
                  displayLista={state.displayLista}
                  moneda={state.moneda}
                  numCodigoCliente={state.usuario.numCodigoCliente}
                ></ProductoDestacado>
              </div>
            </div>
          </Route>
          <Route path={"/outlet"} exact={true}>
            <div className="container">
              <ProductoOutlet
                marcaSelect={state.marca}
                displayLista={state.displayLista}
                moneda={state.moneda}
              ></ProductoOutlet>
            </div>
          </Route>
          <Route path={"/shop/:descripcion/filter/:query"} exact={true}>
            <div className="container"> 
              <ProductoFilter
                moneda={state.moneda}
                handleSelectMarcaChange={handleSelectMarcaChange}
                query={state.descripcion}
                handleInputChangeDescripcion={handleInputChangeDescripcion}
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ProductoFilter>
            </div>
          </Route>

          <Route path={"/succesPayment"} exact={true}>
            <div className="container">
              <SuccesPayment></SuccesPayment>
            </div>
          </Route>
          <Route path={"/succesNopayment"} exact={true}>
            <div className="container">
              <SuccesNoPayment></SuccesNoPayment>
            </div>
          </Route>

          <Route path="/tusCompras/:numCodigoCliente">
            <div className="container">
              <TusCompras />
            </div>
          </Route>
          <Route path="/direccion/:numCodigoCliente/:linkNavegacion">
            <div className="container">
              <DireccionCliente />
            </div>
          </Route>

          <Route path="/envio">
            <div className="container">
              <EnvioEstatico />
            </div>
          </Route>
          <Route path="/lugarRecojo">
            <div className="container">
              <LugarRecojoEstatico />
            </div>
          </Route>
          <Route path="/pagoSeguro">
            <div className="container">
              <PagoSeguroEstatico />
            </div>
          </Route>

          <Route path="/terminoCondicion">
            <div className="container">
              <TerminoCondicionEstatico linkNavegacion="App" />
            </div>
          </Route>
          <Route path="/loginCliente">
            <div className="container">
              <LoginCliente islogin={handleIsLoggin} />
            </div>
          </Route>
          <Route
            path={"/Admin/" + Empresa.ruc + "/" + Empresa.abreviaturaSucursal}
          >
            <div className="container">
              <LoginAdmin islogin={handleIsLoggin} />
            </div>
          </Route>
          <Route path="/registrarCliente">
            <div className="container">
              <RegistrarCliente invocacion="R" />
            </div>
          </Route>
          <Route path="/informacion/:numCodigoCliente/:linkNavegacion">
            <div className="container">
              <RegistrarCliente invocacion="I" />
            </div>
          </Route>
          <Route path="/dashboard" exact={true}>
            <div className="container">
              <DashboardCliente
                numCodigoCliente={state.usuario.numCodigoCliente}
              />
            </div>
          </Route>
          <Route path="/dashboardAdmin" exact={true}>
            <div className="container">
              <DashboardAdmin
                numCodigoCliente={state.usuario.numCodigoCliente}
              />
            </div>
          </Route>
          <Route path="/detalle/:chrCodigoFamilia/:vchDescripcion/:chrCodigoProducto">
            <div className="container">
              <ProductoDetalle
                eventSelectMarca={handleSelectMarcaForDetalleProducto}
                moneda={state.moneda}
              />
            </div>
          </Route>
          <Route path="/carrito">
            <div className="container">
              <CarritoDetalle moneda={state.moneda}></CarritoDetalle>
            </div>
          </Route>
          <Route path="/pedidoCarrito">
            <div className="container">
              <CarritoPayment moneda={state.moneda}></CarritoPayment>
            </div>
          </Route>

          <Route path="/recuperarContraseña">
            <div className="container">
              <RecuperarPassword></RecuperarPassword>
            </div>
          </Route>
          <Route path="/cambiarContraseña">
            <div className="container">
              <CambiarPasswod></CambiarPasswod>
            </div>
          </Route>
          <Route path="/productoImagen">
            <div className="container">
              <ImagenProducto />
            </div>
          </Route>
          <Route path="/listaProductosOutlet">
            <div className="container">
              <ListadoProductoOutlet
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ListadoProductoOutlet>
            </div>
          </Route>
          <Route path="/outletCarga/:numProductoVigencia/:crud">
            <div className="container">
              <OutletCargaProducto
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></OutletCargaProducto>
            </div>
          </Route>
          <Route path="/stock">
            <div className="container">
              <StockProducto
                numCodigoCliente={state.usuario.numCodigoCliente}
              />
            </div>
          </Route>

          <Route path="/usuarioAdmin/:numCodigoCliente/:numCodigoClienteUsuario">
            <div className="container">
              <RegistrarUsuario
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></RegistrarUsuario>
            </div>
          </Route>
          <Route path="/menu">
            <div className="container">
              <MenuPersonalizado
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></MenuPersonalizado>
            </div>
          </Route>
          <Route path="/menu2">
            <div className="container">
              <MenuPersonalizado2
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></MenuPersonalizado2>
            </div>
          </Route>
          <Route path="/listaCorreoJobs">
            <div className="container">
              <ListaCorreoJobs
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ListaCorreoJobs>
            </div>
          </Route>
          <Route path="/reporteCotizacion">
            <div className="container">
              <ReporteCotizacion
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ReporteCotizacion>
            </div>
          </Route>
          <Route path="/listaUsuarioAdmin">
            <div className="container">
              <ListaUsuario
                numCodigoCliente={state.usuario.numCodigoCliente}
              ></ListaUsuario>
            </div>
          </Route>
          <Route path="/test">
            <div className="container">
              <TestAuto></TestAuto>
            </div>
          </Route>
          <Route path="/">
            <div className="container-Carousel">
              <Carrucel
                marca={lstMarcas[0]}
                indexCarrucel={state.indexCarrucel}
              ></Carrucel>
              <div className="container">
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
              </div>
            </div>
          </Route>
          
        </Switch>
        <br />

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
                      (511) 630 7600
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
                        repuestos.subaru@eacorp.pe
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
