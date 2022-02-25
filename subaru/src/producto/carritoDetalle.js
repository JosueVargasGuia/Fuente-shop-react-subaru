import { useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  eliminarCotizacionDetalle,
  obtenerCotizacion,
  obtenerCotizacionDetalle,
  registrarCotizacionDetalle,
} from "../service/cotizacion.service";
import {
  HttpStatus,
  InfoCondicionCompra,
  Moneda,
  SUCCESS_SERVER,
  tipoActualizacionCotizacionDetalle,
} from "../service/ENUM";
import { handleSyncDatosCotizacion } from "../service/general";
import ServerException from "../utils/serverException";

export function CarritoDetalle(props) {
  let history = useHistory();
  const cotizacionResumen = {
    totalRegistros: 0,
    numSubTotalDol: 0.0,
    numIgvDol: 0.0,
    numEnvioDol: 0.0,
    numTotalDol: 0.0,

    numSubTotalSol: 0.0,
    numIgvSol: 0.0,
    numEnvioSol: 0.0,
    numTotalSol: 0.0,
    cantidadDetalleSeleccionado: 0,
  };

  const [state, dispatch] = useReducer(reducer, {
    cotizacionResumen: cotizacionResumen,
    listaCotizacionDetalle: [],
    mensajeStock: "",
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  useEffect(() => {
    handleEventLoad();
  }, []);

  async function handleEventLoad() {
    let cotizacion = handleSyncDatosCotizacion();
    const _cotizacionResumen = {
      totalRegistros: 0,
      numSubTotalDol: 0.0,
      numIgvDol: 0.0,
      numEnvioDol: 0.0,
      numTotalDol: 0.0,

      numSubTotalSol: 0.0,
      numIgvSol: 0.0,
      numEnvioSol: 0.0,
      numTotalSol: 0.0,
      cantidadDetalleSeleccionado: 0,
      flgnumCodigoDireccion: 0,
      numCodigoCliente: 0,
    };
    /*Obtener detalle subimos para que se ejecute primero,
    Tambien existe el proceso que obtiene la direccion para calcular el valor de envio */
    const rptDetalle = await obtenerCotizacionDetalle({
      numCodigoCotizacionOnline: cotizacion.numCodigoCotizacionOnline,
    });

    const rpt = await obtenerCotizacion({
      numCodigoCotizacionOnline: cotizacion.numCodigoCotizacionOnline,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        _cotizacionResumen.totalRegistros = json.totalRegistros;
        _cotizacionResumen.numSubTotalDol = json.numSubTotalDol;
        _cotizacionResumen.numIgvDol = json.numIgvDol;
        _cotizacionResumen.numEnvioDol = json.numEnvioDol;
        _cotizacionResumen.numTotalDol = json.numTotalDol;
        _cotizacionResumen.numSubTotalSol = json.numSubTotalSol;
        _cotizacionResumen.numIgvSol = json.numIgvSol;
        _cotizacionResumen.numEnvioSol = json.numEnvioSol;
        _cotizacionResumen.numTotalSol = json.numTotalSol;
        _cotizacionResumen.flgnumCodigoDireccion = json.flgnumCodigoDireccion;
        _cotizacionResumen.numCodigoCliente = cotizacion.numCodigoCliente;
        let _cantidadDetalleSeleccionado = 0;

        const jsonDetalle = await rptDetalle.json();

        if (jsonDetalle.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          let _listaCotizacionDetalle = [];
          for (let index = 0; index < jsonDetalle.lista.length; index++) {
            const obj = jsonDetalle.lista[index];
            _cantidadDetalleSeleccionado =
              _cantidadDetalleSeleccionado + obj.numCantidad;
            let _redirect =
              "/detalle/" +
              obj.producto.familia.chrCodigoFamilia +
              "/" +
              obj.producto.familia.vchDescripcion +
              "/" +
              obj.producto.chrCodigoProducto;
            _listaCotizacionDetalle.push({
              numCantidad: obj.numCantidad,
              numCodigoCotizacionOnline: obj.numCodigoCotizacionOnline,
              numPrecioUnitarioDol: obj.numPrecioUnitarioDol,
              numPrecioUnitarioSol: obj.numPrecioUnitarioSol,
              numSubTotalDol: obj.numSubTotalDol,
              numSubTotalSol: obj.numSubTotalSol,
              numcodCotizacionOnlinedet: obj.numcodCotizacionOnlinedet,
              chrSrcImagen: obj.chrSrcImagen,
              chrType: obj.chrType,
              redirect: _redirect,
              producto: {
                chrCodigoProducto: obj.producto.chrCodigoProducto,
                vchDescripcion: obj.producto.vchDescripcion,
                numStock: obj.producto.numStock,
                numOutlet: obj.producto.numOutlet,
                numProductoVigencia:obj.producto.numProductoVigencia
              },
            });
          }
          _cotizacionResumen.cantidadDetalleSeleccionado =
            _cantidadDetalleSeleccionado;
          dispatch({
            type: actionType.LOAD,
            cotizacionResumen: _cotizacionResumen,
            listaCotizacionDetalle: _listaCotizacionDetalle,
            mensajeStock: "",
          });
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: {
              error: jsonDetalle.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            },
          });
        }
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: {
          error: "",
          success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
        },
      });
    }
  }
  async function handleEventClickEliminarDetalle(e, data) {
    console.log("handleEventClickEliminarDetalle");
    let cotizacionDetalleRequest = {
      numCodigoCotizacionOnline: data.numCodigoCotizacionOnline,
      numcodCotizacionOnlinedet: data.numcodCotizacionOnlinedet,
    };
    const rptDetalle = await eliminarCotizacionDetalle(
      cotizacionDetalleRequest
    );
    if (rptDetalle.status === HttpStatus.HttpStatus_OK) {
      const json = await rptDetalle.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        // handleEventLoad();
        window.location.reload();
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: {
          error: "",
          success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
        },
      });
    }
  }
  async function handleEventChangeCantidad(e, data) {
    if (e.target.value <= data.producto.numStock) {
      /*Registro de cotizacion detalle */
      let cotizacionDetalleRequest = {
        numCodigoCotizacionOnline: data.numCodigoCotizacionOnline,
        numcodCotizacionOnlinedet: data.numcodCotizacionOnlinedet,
        producto: {
          chrCodigoProducto: data.producto.chrCodigoProducto,
          numOutlet: data.producto.numOutlet,
          numProductoVigencia:data.producto.numProductoVigencia
        },
        numCantidad: e.target.value,

        tipoActualizacionCotizacionDetalle:
          tipoActualizacionCotizacionDetalle.ACTUALIZAR,
      };
      console.log(cotizacionDetalleRequest);
      const rptDetalle = await registrarCotizacionDetalle(
        cotizacionDetalleRequest
      );
      if (rptDetalle.status === HttpStatus.HttpStatus_OK) {
        const json = await rptDetalle.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          handleEventLoad();
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: {
              error: json.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: {
            error: "",
            success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.CANTIDAD_STOCK,
        mensajeStock:
          "Disculpe las molestias, el stock disponible para este producto es de " +
          data.producto.numStock +
          " unidades.",
      });
    }
  }
  function handleEventGoPagar() {
    history.push("/pedidoCarrito");
  }
  function handleEventGoComprar() {
    history.push("/shop");
  }
  return (
    <>
      <div className="carrito-detalle">
        <div className="carrito-detalle-lista">
          <div className="producto-det-data-item">
            <h3>Carrito</h3>
            <hr />
            {state.listaCotizacionDetalle.length === 0
              ? "No hay más artículos en su carrito"
              : ""}
            {state.mensajeStock === "" ? (
              ""
            ) : (
              <span className="producto-mensaje-stock">
                {state.mensajeStock}
              </span>
            )}
            {state.listaCotizacionDetalle.map((obj) => (
              <>
              <div
                className="producto-det-carrito-row"
                key={obj.numcodCotizacionOnlinedet}
              >
                <div className="producto-det-row-img"> 
                  <Link to={obj.redirect}>
                    <img
                      src={"data:image/png;base64," + obj.chrSrcImagen}
                      alt={obj.producto.vchDescripcion}
                    ></img>
                  </Link>
                  
                </div>
                <div className="producto-det-row-data">
                  <div className="producto-det-row-desc">
                    <span className="item-row-descrip">
                      <Link to={obj.redirect}>
                        {obj.producto.vchDescripcion}
                      </Link>
                    </span>
                    <br />
                    <span className="item-row-simbolo">
                      {props.moneda.numCodigoMoneda ===
                        Moneda.DOLARES.numCodigoMoneda
                        ? Moneda.DOLARES.codigoIso4217
                        : Moneda.SOLES.codigoIso4217}
                    </span>
                    <label className="item-row-precio">
                      {props.moneda.numCodigoMoneda ===
                        Moneda.DOLARES.numCodigoMoneda
                        ? obj.numPrecioUnitarioDol
                        : obj.numPrecioUnitarioSol}
                    </label>
                    <br />
                    {obj.producto.numOutlet === 1 ? <div className="producto-det-row-outlet"> {outlet} <span>Producto Outlet</span></div> : ""} 
                  </div>
                  <div className="producto-det-row-cantidad">
                    <input
                      type="number"
                      className="form-control"
                      value={obj.numCantidad}
                      min={1}
                      onChange={(e) => handleEventChangeCantidad(e, obj)}
                    ></input>
                  </div>
                  <div className="producto-det-row-subtotal">
                    <span className="item-row-simbolo">
                      {props.moneda.numCodigoMoneda ===
                        Moneda.DOLARES.numCodigoMoneda
                        ? Moneda.DOLARES.codigoIso4217
                        : Moneda.SOLES.codigoIso4217}
                    </span>
                    <span className="item-row-precio">
                      {props.moneda.numCodigoMoneda ===
                        Moneda.DOLARES.numCodigoMoneda
                        ? obj.numSubTotalDol
                        : obj.numSubTotalSol}
                    </span>
                  </div>
                  <div className="producto-det-row-accion">
                    <button
                      className="btn btn-light"
                      onClick={(e) => handleEventClickEliminarDetalle(e, obj)}
                    >
                      <i className="fa fa-trash-o"></i>
                    </button>
                  </div>
                </div>
                
                <hr />
              </div>
              
              </>
            ))}
          </div>

          <div className="carrito-detalle-msg">
            {state.cotizacionResumen.flgnumCodigoDireccion === 1 ? (
              <>
                El costo de envio ha sido calculado según la dirección de
                facturación guarda en base de datos del cliente
              </>
            ) : (
              <>
                Registre una dirección{" "}
                <Link
                  to={
                    "/direccion/" +
                    (state.cotizacionResumen.numCodigoCliente === undefined
                      ? 0
                      : state.cotizacionResumen.numCodigoCliente) +
                    "/DashboardCliente"
                  }
                >
                  aquí
                </Link>
                , para calcular el costo de envio.
              </>
            )}
            <hr />
            
          </div>
        </div>
        <div className="carrito-detalle-info">
          <div className="carrito-detalle-item">
            <div className="carrito-detalle-resumen">
              <div className="producto-det-data-item">
                <label className="label-item-total-car">
                  Hay {state.cotizacionResumen.totalRegistros} artículos en su
                  carrito.
                </label>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Subtotal:</label>
                <span className="item-row-simbolo simbolo-color-deft">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}
                </span>
                <label className="label-moneda">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numSubTotalDol
                    : state.cotizacionResumen.numSubTotalSol}
                </label>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Envío:</label>
                <span className="item-row-simbolo simbolo-color-deft">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}
                </span>
                <label className="label-moneda">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numEnvioDol
                    : state.cotizacionResumen.numEnvioSol}
                </label>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Igv:</label>
                <span className="item-row-simbolo simbolo-color-deft">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}
                </span>
                <label className="label-moneda">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numIgvDol
                    : state.cotizacionResumen.numIgvSol}
                </label>
              </div>

              <div className="producto-det-data-item">
                <label className="label-item">Total(impuestos inc.):</label>
                <span className="item-row-simbolo simbolo-color-deft">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}
                </span>
                <label className="label-moneda">
                  {props.moneda.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numTotalDol
                    : state.cotizacionResumen.numTotalSol}
                </label>
              </div>
              <div className="producto-det-data-item accion-caja">
                <button
                  className="btn btn-primary"
                  onClick={handleEventGoComprar}
                >
                  SEGUIR COMPRANDO
                </button>
                <button
                  className="btn btn-primary"
                  disabled={
                    state.listaCotizacionDetalle.length === 0 ? true : false
                  }
                  onClick={handleEventGoPagar}
                >
                  PASAR POR CAJA
                </button>
              </div>
            </div>
          </div>
          <div className="carrito-detalle-item">
            {InfoCondicionCompra.EMISION}
            <hr />
          </div>
          <div className="carrito-detalle-item">
            {InfoCondicionCompra.STOCK}
            <hr />
          </div>
          <div className="carrito-detalle-item">
            {InfoCondicionCompra.TRANSPORTE}
            <hr />
          </div>
          <div className="carrito-detalle-item">
            {InfoCondicionCompra.DEVOLUCIONES}
            <hr />
          </div>
        </div>
      </div>
      <div className="back-shop">
        <ServerException server={state.server}></ServerException>
        {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_INFO ? (
          <div>
            <br />
            <span className="alert alert-warning" role="alert">
              {state.server.error}
            </span>
          </div>
        ) : (
          ""
        )}
        {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_ERROR ? (
          <div>
            <br />
            <span className="alert alert-danger" role="alert">
              Lo sentimos el recurso no esta disponible, estamos trabajando para
              solucionar el inconveniente.
            </span>
          </div>
        ) : (
          ""
        )}
        <Link to="/shop">
          <i className="fa fa-angle-left" aria-hidden="true"></i>Continuar
          comprando
        </Link>
      </div>
    </>
  );
}
let actionType = {
  LOAD: "LOAD",
  ERROR: "ERROR",
  CANTIDAD: "CANTIDAD",
  CANTIDAD_STOCK: "CANTIDAD_STOCK",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD:
      return {
        ...state,
        cotizacionResumen: action.cotizacionResumen,
        listaCotizacionDetalle: action.listaCotizacionDetalle,
        mensajeStock: action.mensajeStock,
      };
    case actionType.CANTIDAD:
      return {
        ...state,
        listaCotizacionDetalle: action.listaCotizacionDetalle,
      };
    case actionType.CANTIDAD_STOCK:
      return {
        ...state,
        mensajeStock: action.mensajeStock,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    default:
      return state;
  }
};


const outlet =
  <svg
    version="1.0"
    xmlns="http://www.w3.org/2000/svg"
    width="512.000000pt"
    height="512.000000pt"
    viewBox="0 0 512.000000 512.000000"
    preserveAspectRatio="xMidYMid meet"
  >
    <g
      transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)"
      fill="#000000"
      stroke="none"
    >
      <path
        d="M2572 4610 c-107 -28 -202 -83 -306 -176 -50 -45 -544 -536 -1097
-1090 -661 -664 -1019 -1029 -1044 -1068 -145 -224 -163 -510 -48 -741 52
-102 120 -179 480 -536 400 -398 434 -425 590 -476 60 -20 106 -27 200 -31
152 -6 239 12 366 75 l92 45 1094 1092 c793 792 1105 1109 1135 1156 103 158
116 230 116 625 l0 307 72 -41 c128 -70 245 -160 345 -265 199 -206 313 -422
375 -710 32 -146 31 -416 -1 -566 -106 -496 -453 -889 -931 -1058 -108 -38
-211 -59 -353 -72 -257 -25 -576 47 -809 180 -88 50 -102 54 -136 36 -46 -24
-55 -66 -23 -108 22 -28 203 -123 306 -161 290 -108 582 -130 881 -67 533 111
976 504 1158 1027 148 428 97 927 -134 1312 -162 268 -410 494 -683 622 l-67
31 0 51 c-1 224 -145 448 -359 561 -124 65 -136 66 -667 65 -438 0 -485 -2
-552 -19z m1077 -149 c166 -52 307 -210 342 -384 7 -32 9 -60 6 -63 -3 -3 -46
3 -95 15 -49 12 -99 21 -110 21 -15 0 -26 12 -40 43 -46 104 -132 161 -242
161 -147 -1 -262 -117 -259 -263 3 -191 210 -312 380 -223 48 25 109 88 121
124 4 10 18 10 74 0 38 -6 93 -19 122 -28 l52 -16 0 -332 c0 -366 -7 -426 -67
-539 -21 -40 -273 -299 -1102 -1130 -592 -593 -1099 -1094 -1128 -1113 -92
-61 -174 -86 -300 -92 -95 -4 -122 -1 -185 18 -151 45 -172 62 -570 459 -390
389 -427 434 -469 563 -20 61 -24 92 -23 188 1 128 20 198 84 304 23 38 372
393 1114 1134 1149 1148 1105 1108 1246 1153 49 16 102 18 522 18 430 1 471 0
527 -18z m-91 -367 c24 -10 32 -18 22 -21 -64 -20 -87 -58 -64 -111 9 -23 22
-34 44 -38 28 -6 29 -8 13 -20 -10 -7 -38 -14 -61 -14 -37 0 -50 6 -78 34 -38
38 -44 77 -20 125 14 27 66 60 94 61 7 0 29 -7 50 -16z"
      />
      <path
        d="M2672 3617 c-121 -121 -142 -147 -142 -173 0 -38 36 -74 73 -74 18 0
42 14 71 40 24 22 47 40 52 40 4 0 72 -63 149 -140 89 -88 149 -140 162 -140
37 0 73 38 73 77 0 33 -12 49 -140 178 l-140 141 31 30 c49 46 63 80 48 115
-6 17 -20 34 -30 39 -44 24 -62 12 -207 -133z"
      />
      <path
        d="M2332 3277 c-84 -84 -102 -108 -102 -133 0 -25 26 -56 183 -212 133
-132 190 -182 207 -182 28 0 228 192 236 227 7 28 -19 71 -49 82 -33 13 -66
-4 -129 -67 l-58 -56 -25 24 -25 24 34 35 c18 20 39 46 45 58 15 29 4 69 -22
88 -38 26 -74 18 -122 -27 l-46 -41 -24 23 -25 23 65 68 c71 74 79 98 44 143
-14 18 -30 26 -52 26 -28 0 -48 -15 -135 -103z"
      />
      <path
        d="M1941 2884 c-12 -15 -21 -36 -21 -47 0 -13 65 -86 182 -204 157 -158
187 -183 213 -183 25 0 48 17 133 103 86 86 102 107 102 134 0 22 -8 38 -26
52 -45 35 -70 27 -143 -44 l-66 -64 -141 139 c-128 128 -144 140 -177 140 -27
0 -41 -7 -56 -26z"
      />
      <path
        d="M1687 2631 c-138 -138 -149 -151 -143 -178 18 -73 85 -83 152 -21
l45 41 143 -141 c154 -153 169 -161 220 -121 18 14 26 30 26 52 0 27 -19 51
-142 174 l-142 142 42 45 c52 56 57 103 16 135 -15 12 -36 21 -47 21 -14 0
-74 -53 -170 -149z"
      />
      <path
        d="M1432 2377 c-44 -47 -32 -72 88 -192 60 -60 114 -121 121 -137 32
-77 -45 -167 -123 -143 -13 4 -76 59 -140 123 -100 99 -122 115 -149 115 -37
0 -79 -40 -79 -75 0 -30 233 -265 285 -289 97 -44 202 -29 276 38 63 57 83
105 84 193 0 99 -20 132 -168 278 -125 123 -152 135 -195 89z"
      />
      <path
        d="M955 1877 c-70 -33 -141 -115 -161 -185 -43 -146 26 -295 165 -360
46 -21 63 -24 135 -20 92 5 143 28 203 90 104 108 104 298 0 406 -61 64 -111
86 -206 90 -75 3 -93 0 -136 -21z m206 -150 c90 -60 89 -184 -1 -245 -29 -20
-45 -23 -93 -20 -46 4 -63 10 -87 33 -53 50 -63 133 -25 192 42 63 142 83 206
40z"
      />
    </g>
  </svg>

