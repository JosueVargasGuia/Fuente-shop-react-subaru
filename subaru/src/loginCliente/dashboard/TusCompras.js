import React, { useEffect, useReducer } from 'react';
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { HttpStatus, localStoreEnum, LOGGIN,  Moneda, SUCCESS_SERVER } from '../../service/ENUM';
import {
  obtenerTusCompras
} from "../../service/cotizacion.service";
import ComprasDetalle from "./ComprasDetalle";

let actionType = {
  LOAD: "LOAD",
  ERROR: "ERROR",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD:
      return {
        ...state,
        isloading: action.isloading,
        rowTusCompras: action.rowTusCompras,
      };

    default:
      return state;
  }
};

export default function TusCompras() {
  let params = useParams();
  let history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    isloading: true,
    rowTusCompras: [],
  });
  useEffect(() => {
    // eslint-disable-next-line
    if (
      localStorage.getItem(localStoreEnum.ISLOGIN) !== LOGGIN.LOGGIN ||
      params.numCodigoCliente === undefined ||
      parseInt(params.numCodigoCliente) < 0
    ) {
      history.push("/loginCliente");
      return <div className="direccion"></div>;
    }

    // eslint-disable-next-line
    if (state.isloading) {
      loadTusCompras();
    }
    console.log("useEffect TusCompras");
  });



  async function loadTusCompras() {
    let usuarioLogeado = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
    let _numCodigoCliente = usuarioLogeado.numCodigoCliente;
    let _numCodigoClienteUsuario = usuarioLogeado.numCodigoClienteUsuario;
    const rpt = await obtenerTusCompras({
      numCodigoCliente: _numCodigoCliente,
      numCodigoClienteUsuario: _numCodigoClienteUsuario
    });
    let _rowTusCompras = [];
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        _rowTusCompras = [];
        for (let index = 0; index < json.lista.length; index++) {
          const compras = json.lista[index];
          /*
          {
            numCodigoCotizacionOnline: compras.numCodigoCotizacionOnline,
            numCodigoCliente: compras.numCodigoCliente,
            condicion: compras.condicion,
            costoFlete: compras.costoFlete,
            costoTotal: compras.costoTotal,
            dteCreacion: compras.dteCreacion,
            estado: compras.estado,
            metodoEnvio: (compras.metodoEnvio === 'EnvioRegular' ? MetodoEnvio.EnvioRegular : MetodoEnvio.RecojoAlmacen),
            moneda: (compras.moneda === 'SOLES' ? Moneda.SOLES : Moneda.DOLARES)
          }
          */
          _rowTusCompras.push(<div  className="tuscompras-row-content" key={compras.numCodigoCotizacionOnline}><div className="tuscompras-row">
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title">Fecha de Pedido</label>
              <label className="tuscompras-row-value">{compras.dteCreacion}</label>
            </div>
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title">Costo de Envío</label>
              <label className="tuscompras-row-value">{(compras.moneda === 'SOLES' ? Moneda.SOLES.codigoIso4217 : Moneda.DOLARES.codigoIso4217)}{' ' + compras.costoFlete}</label>
            </div>
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title">Total</label>
              <label className="tuscompras-row-value">{(compras.moneda === 'SOLES' ? Moneda.SOLES.codigoIso4217 : Moneda.DOLARES.codigoIso4217)}{' ' + compras.costoTotal}</label>
            </div>
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title">Nro.Pedido</label>
              <label className="tuscompras-row-value">{compras.numCodigoCotizacionOnline}</label>
            </div>
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title">Estado</label>
              <label className={`tuscompras-row-value ${compras.estado === 'Confirmado' ? "row-confirmado" : compras.estado === 'Cancelado' ? "row-cancelado" : compras.estado === 'Procesando' ? "row-procesando" : "row-pendiente"}`}><div>{compras.estado === 'Confirmado' ?'Compra Realizada':compras.estado}</div></label>
            </div>
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title">Condicion</label>
              <label className="tuscompras-row-value">{compras.condicion}</label>
            </div>
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title" title="Referencia Documento">Ref. Documento</label>
              <label className="tuscompras-row-value">{compras.numFacturas}</label>
            </div>
            <div className="tuscompras-row-g">
              <label className="tuscompras-row-title" title="Referencia Pago">Ref. Pago</label>
              <label className="tuscompras-row-value">{compras.chrRegLegacyTransId}</label>
            </div>
           

          </div>
            <div className="tuscompras-row-detalle" key={compras.numCodigoCotizacionOnline}>
              <ComprasDetalle cotizacion={compras}  ></ComprasDetalle>
            </div>
          </div>);
        }
        dispatch({ type: actionType.LOAD, isloading: false, rowTusCompras: _rowTusCompras });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            isloading: false,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.REQUETS,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        isloading: false,
      });
    }
  }



  return (<div className="tusCompras">
    <div className="link-href">
      <Link to="/shop">
        <i className="fa fa-home" aria-hidden="true"></i>
          Inicio
        </Link>
      <span>/</span>
      <Link to="/dashboard">
        <i className="fa fa-user"></i>Su cuenta
        </Link>
      {params.linkNavegacion === "CarritoPayment" ? (
        <>
          <span>/</span>
          <Link to="/pedidoCarrito">
            <i className="fa fa-arrow-left"></i>Volver
            </Link>
        </>
      ) : (
        ""
      )}
    </div>
    <h4>Tus Movimientos</h4>
    <div className="form-body-compras">
      <div className="form-body-accion">
        <button type="button" onClick={(e)=>loadTusCompras()} className=" btn btn-primary fa fa-refresh" > actualizar</button>
      </div>
      {state.rowTusCompras}
    </div>

    <div className="link-href">
      <Link to="/shop">
        <i className="fa fa-home" aria-hidden="true"></i>
          Inicio
        </Link>
      <span>/</span>
      <Link to="/dashboard">
        <i className="fa fa-user"></i>Su cuenta
        </Link>
    </div>
  </div>)
}