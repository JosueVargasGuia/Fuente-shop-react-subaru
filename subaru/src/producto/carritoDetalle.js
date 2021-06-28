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
  let history = useHistory()
  const cotizacionResumen = {
    totalRegistros: 0,
    numSubTotalDol: 0.00,
    numIgvDol: 0.00,
    numEnvioDol: 0.00,
    numTotalDol: 0.00,

    numSubTotalSol: 0.00,
    numIgvSol: 0.00,
    numEnvioSol: 0.00,
    numTotalSol: 0.00,
    cantidadDetalleSeleccionado: 0,
  };

  const [state, dispatch] = useReducer(reducer, {
    cotizacionResumen: cotizacionResumen,
    listaCotizacionDetalle: [],
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  useEffect(() => {
    handleEventLoad();
  }, []);

  async function handleEventLoad() {
    let cotizacion = handleSyncDatosCotizacion();
    const _cotizacionResumen = {
      totalRegistros: 0,
      numSubTotalDol: 0.00,
      numIgvDol: 0.00,
      numEnvioDol: 0.00,
      numTotalDol: 0.00,

      numSubTotalSol: 0.00,
      numIgvSol: 0.00,
      numEnvioSol: 0.00,
      numTotalSol: 0.00,
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
              },
            });
          }
          _cotizacionResumen.cantidadDetalleSeleccionado = _cantidadDetalleSeleccionado;
          dispatch({
            type: actionType.LOAD,
            cotizacionResumen: _cotizacionResumen,
            listaCotizacionDetalle: _listaCotizacionDetalle,
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
    /*Registro de cotizacion detalle */
    let cotizacionDetalleRequest = {
      numCodigoCotizacionOnline: data.numCodigoCotizacionOnline,
      producto: { chrCodigoProducto: data.producto.chrCodigoProducto },
      numCantidad: e.target.value,
      tipoActualizacionCotizacionDetalle:
        tipoActualizacionCotizacionDetalle.ACTUALIZAR,
    };
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
  }
  function handleEventGoPagar() {
    history.push("/pedidoCarrito");
  }
  return (
    <>
      <div className="carrito-detalle">
        <div className="carrito-detalle-lista">
          <div className="producto-det-data-item">
            <h3>Carrito</h3>
            <hr />
            {state.listaCotizacionDetalle.length === 0 ? "No hay más artículos en su carrito" : ""}
            {state.listaCotizacionDetalle.map((obj) => (
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
              </div>
            ))}

          </div>
          <hr />
          <div className="carrito-detalle-msg">
           
            {state.cotizacionResumen.flgnumCodigoDireccion === 1 ? <>
              El costo de envio ha sido calculado según la dirección de facturación guarda en base de datos del cliente
            </> : <>
              Registre una dirección <Link to={
                "/direccion/" +
                (state.cotizacionResumen.numCodigoCliente === undefined
                  ? 0
                  : state.cotizacionResumen.numCodigoCliente) +
                "/DashboardCliente"
              } >aquí</Link>, para calcular el costo de envio.
            </>}

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
                <label className="label-moneda">{props.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                  ? state.cotizacionResumen.numEnvioDol
                  : state.cotizacionResumen.numEnvioSol}</label>
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
                <label className="label-item">Total (impuestos inc.):</label>
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
                <button className="btn btn-primary" disabled={state.listaCotizacionDetalle.length === 0 ? true : false} onClick={handleEventGoPagar}>PASAR POR CAJA</button>
              </div>
            </div>
          </div>
          <div className="carrito-detalle-item">
            <i className="fa fa-shield-p"></i>
            {InfoCondicionCompra.EMISION}
            <hr />
          </div>
          <div className="carrito-detalle-item">
            <i className="fa fa-truck" aria-hidden="true"></i>
            {InfoCondicionCompra.TRANSPORTE}
            <hr />
          </div>
          <div className="carrito-detalle-item">
            <i className="fa fa-exchange" aria-hidden="true"></i>
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
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD:
      return {
        ...state,
        cotizacionResumen: action.cotizacionResumen,
        listaCotizacionDetalle: action.listaCotizacionDetalle
      };
    case actionType.CANTIDAD:
      return {
        ...state,
        listaCotizacionDetalle: action.listaCotizacionDetalle,
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
