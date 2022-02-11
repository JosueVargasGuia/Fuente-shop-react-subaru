//eslint-disable-next-line
import { useEffect, useReducer, useState } from "react";
//eslint-disable-next-line
import { Link, useHistory } from "react-router-dom";

import {
  chrRol,
  HttpStatus,
  localStoreEnum,
  LOGGIN,
  SUCCESS_SERVER,
} from "../../service/ENUM";
import { obtenerCliente } from "../../service/loginCliente.service";
import { LoadingClassic } from "../../utils/loading";
import ServerException from "../../utils/serverException";
import {
  listaReporteCotizacion,
  obtenerReporteToPdf,
  asociarOcToCotizacion,
} from "../../service/producto.service";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
import { Modal } from "react-bootstrap";
//import { Document, Page, pdfjs } from "react-pdf";
//pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
registerLocale("es", es);
let actionType = {
  LISTDATA: "LISTDATA",
  SET_DTEINICIO: "SET_DTEINICIO",
  SET_DTEFINAL: "SET_DTEFINAL",
  SHOW_MODAL: "SHOW_MODAL",
  SET_OC_TO_COTIZACION:"SET_OC_TO_COTIZACION",
  SET_chrCodigoOc:"SET_chrCodigoOc",
  ERROR: "ERROR",
};
const reducer = (state, action) => {
  //eslint-disable-next-line
  switch (action.type) {
    case actionType.LISTDATA:
      return {
        ...state,
        listData: action.listData,
        server: action.server,
        loading: action.loading,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.SET_DTEINICIO:
      return {
        ...state,
        dteInicio: action.dteInicio,
      };
    case actionType.SET_DTEFINAL:
      return {
        ...state,
        dteFinal: action.dteFinal,
      };
    case actionType.SHOW_MODAL:
      return {
        ...state,
        modalShow: action.modalShow,
      };
    case actionType.SET_OC_TO_COTIZACION:
      return {
        ...state,
        modalShow: action.modalShow,
        chrCodigoCotizacion: action.chrCodigoCotizacion,
        numCodigoCotizacion: action.numCodigoCotizacion,
        chrCodigoOc: action.chrCodigoOc,
      };
    case actionType.SET_chrCodigoOc:
      return {
        ...state,
        chrCodigoOc: action.chrCodigoOc,
      };
    default:
      return state;
  }
};
export default function ReporteCotizacion(props) {
  const [state, dispatch] = useReducer(reducer, {
    listData: [],
    loading: false,
    modalShow: false,
    dteInicio: new Date(),
    dteFinal: new Date(),
    chrCodigoOc:"",
    chrCodigoCotizacion:"",
    numCodigoCotizacion:0,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  let history = useHistory();
  useEffect(() => {
    handleObtenerCliente(props.numCodigoCliente);
    console.log("useEffect[DashboardAdmin]");
    //eslint-disable-next-line
  }, []);
  async function handleObtenerCliente(_numCodigoCliente) {
    let _rol = chrRol.ROLE_ANONIMO;
    const rpt = await obtenerCliente({ numCodigoCliente: _numCodigoCliente });
    let _server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT };
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      let _usuario = {};
      if (localStorage.getItem(localStoreEnum.USUARIO) !== null) {
        _usuario = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
        if (
          _usuario.chrRol === chrRol.ROLE_ADMIN &&
          json.chrRol === chrRol.ROLE_ADMIN
        ) {
          _rol = json.chrRol;
        } else {
          _rol = chrRol.ROLE_ANONIMO;
        }
      } else {
        _rol = chrRol.ROLE_ANONIMO;
      }
      _server.error = "";
      _server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
    } else {
      _server.error = "";
      _server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR;
    }
    dispatch({ type: actionType.ROL, rol: _rol, server: _server });
    if (JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)) !== null) {
      if (
        !(
          JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)).chrRol ===
            chrRol.ROLE_ADMIN &&
          _rol === chrRol.ROLE_ADMIN &&
          localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN
        )
      ) {
        history.push("/admin");
      }
    } else {
      history.push("/admin");
    }
  }
  async function handleEventBuscarReporte() {
    dispatch({
      type: actionType.LISTDATA,
      listData: [],
      loading: true,
      server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    });
    let _listData = [];
    const server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO };
    const rpt = await listaReporteCotizacion({
      dteInicio: state.dteInicio,
      dteFinal: state.dteFinal,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        const lista = json.lista;
        console.log(lista);
        console.log(lista.length);
        for (let i = 0; i < lista.length; i++) {
          const rpt = lista[i];
          _listData.push(
            <tr key={i}>
              <td>{rpt.numCodigoCotizacionOnline}</td>

              <td
                style={{
                  width: "11%",
                  minWidth: "110px",
                  textAlign: "center",
                }}
              >
                <span
                  className="span-link-pdf"
                  onClick={() =>
                    handleEventBlankPdf({
                      numCodigoCotizacion: rpt.numCodigoCotizacion,
                      typeReporte: "ReporteCotizacion",
                    })
                  }
                >
                  {rpt.chrCodigoCotizacion}
                </span>
              </td>
              <td
                style={{
                  width: "11%",
                  minWidth: "110px",
                  textAlign: "center",
                }}
              >
                <span
                  className="span-link-pdf"
                  onClick={() =>
                    handleEventBlankPdf({
                      numFacturas: rpt.numFacturas,
                      typeReporte: "ReporteFacturaBoleta",
                    })
                  }
                >
                  {rpt.numFacturas}
                </span>
              </td>
              <td
                style={{
                  width: "11%",
                  minWidth: "110px",
                  textAlign: "center",
                }}
              >
                <div style={{ width: "100%", display: "flex" }}>
                  <div style={{ width: "70%" }}>
                 
                    <span
                      className="span-link-pdf"
                      onClick={() =>
                        handleEventBlankPdf({
                          chrCodigoOc: rpt.chrCodigoOc,
                          typeReporte: "ReporteOrdenCompra",
                        })
                      }
                    >
                       
                      {rpt.chrCodigoOc}
                    </span>
                  </div>
                  <div style={{ width: "20%" }}>
                    {rpt.chrCodigoOcOnline !== null ? (
                      <button
                        type="button"
                        title="Asociar Orden de compra a la Cotización"
                        className="btn-primary fa fa-sitemap"
                        onClick={(e)=>handleEventShowAsociar(rpt)}
                      ></button>
                    ) : (
                      ""
                    )}
                  </div>
                </div>
              </td>
              <td
                style={{
                  width: "11%",
                  minWidth: "110px",
                  textAlign: "center",
                }}
              >
                <span
                  className="span-link-pdf"
                  onClick={() =>
                    handleEventBlankPdf({
                      chrCodigoGuia: rpt.chrCodigoGuia,
                      typeReporte: "ReporteGuiaSalida",
                    })
                  }
                >
                  {rpt.chrCodigoGuia}
                </span>
              </td>

              <td
                style={{
                  width: "11%",
                  minWidth: "110px",
                  textAlign: "center",
                }}
              >
                {rpt.ocPendiente === 1 ? (
                  <i
                    title="Orden de compra pendiente"
                    className="fa fa-close"
                    style={{ color: "red" }}
                    aria-hidden="true"
                  >
                    Si
                  </i>
                ) : (
                  ""
                )}
              </td>
              <td
                style={{
                  width: "11%",
                  minWidth: "110px",
                  textAlign: "center",
                }}
              >
                <span
                  className="span-link-pdf"
                  onClick={() =>
                    handleEventBlankPdf({
                      chrCodigoOcOnline: rpt.chrCodigoOcOnline,
                      typeReporte: "ReporteOrdenCompraOnline",
                    })
                  }
                >
                  {rpt.chrCodigoOcOnline}
                </span>
              </td>
              <td style={{ minWidth: "280px" }}>{rpt.descripcion}</td>
              <td
                style={{ width: "12%", minWidth: "120px", textAlign: "center" }}
              >
                {rpt.nombreCliente}
              </td>
              <td
                style={{ width: "12%", minWidth: "120px", textAlign: "center" }}
              >
                {rpt.chrEmail}
              </td>
              <td
                style={{
                  width: "8%",
                  minWidth: "120px",
                  textAlign: "center",
                  color: "#4992ff",
                }}
              >
                {rpt.chrReflegacyTransid}
              </td>
              <td style={{ width: "12%", minWidth: "180px" }}>
                {rpt.dteCreacion}
              </td>
              <td style={{ width: "12%", minWidth: "180px" }}>
                {rpt.dteActualizacion}
              </td>
              <td style={{ width: "12%", minWidth: "180px" }}>
                {rpt.dteEnvio}
              </td>
            </tr>
          );
        }

        server.error = "";
        server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        server.error = json.response.error;
        server.success = SUCCESS_SERVER.SUCCES_SERVER_INFO;
      }
    } else {
      server.error = "";
      server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR;
    }

    dispatch({
      type: actionType.LISTDATA,
      listData: _listData,
      loading: false,
      server: server,
    });
  }

  async function handleEventBlankPdf(_reporteRequets) {
    /*Service */
    const server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO };
    const rpt = await obtenerReporteToPdf({
      numCodigoCotizacion: _reporteRequets.numCodigoCotizacion,
      numFacturas: _reporteRequets.numFacturas,
      chrCodigoOc: _reporteRequets.chrCodigoOc,
      chrCodigoGuia: _reporteRequets.chrCodigoGuia,
      chrCodigoOcOnline: _reporteRequets.chrCodigoOcOnline,
      typeReporte: _reporteRequets.typeReporte,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        const base64str = json.byteEnconderBase64;
        // decode base64 string, remove space for IE compatibility
        var binary = atob(base64str.replace(/\s/g, ""));
        var len = binary.length;
        var buffer = new ArrayBuffer(len);
        var view = new Uint8Array(buffer);
        for (var i = 0; i < len; i++) {
          view[i] = binary.charCodeAt(i);
        }
        // create the blob object with content-type "application/pdf"
        var blob = new Blob([view], { type: "application/pdf" });
        var url = URL.createObjectURL(blob);
        var w = 1000;
        var h = 600;
        var left = Number(window.screen.width / 2 - w / 2);
        var tops = Number(window.screen.height / 2 - h / 2);
        window.open(
          url,
          "MsgWindow",
          "toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no,copyhistory=no, width=" +
            w +
            ",height=" +
            h +
            ", top=" +
            tops +
            ", left=" +
            left
        );

        server.error = "";
        server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        server.error = json.response.error;
        server.success = SUCCESS_SERVER.SUCCES_SERVER_INFO;
      }
    } else {
      server.error = "";
      server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR;
    }
    dispatch({
      type: actionType.ERROR,
      server: server,
    });

    /*Service fin */
  }

  function handleEventShowAsociar(_object){   
    dispatch({ type: actionType.SET_OC_TO_COTIZACION, 
      modalShow:true,
      chrCodigoOc:"",
      chrCodigoCotizacion:_object.chrCodigoCotizacion,
      numCodigoCotizacion:_object.numCodigoCotizacion});
  }
async function handleEventAsociarOcToCotizacion() {
  const server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO };
  const rpt = await asociarOcToCotizacion({
    chrCodigoOc: state.chrCodigoOc,
    chrCodigoCotizacion: state.chrCodigoCotizacion,
    numCodigoCotizacion: state.numCodigoCotizacion,
  });
  if (rpt.status === HttpStatus.HttpStatus_OK) {
    const json = await rpt.json();
    console.log(json);
    if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) { 
      handleEventBuscarReporte();     
      server.error = "";
      server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
    }
    if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
      server.error = json.response.error;
      server.success = SUCCESS_SERVER.SUCCES_SERVER_INFO;
    }
  } else {
    server.error = "";
    server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR;
  }
  dispatch({
    type: actionType.ERROR,
    server: server,
  });
  dispatch({
    type: actionType.SHOW_MODAL,
    modalShow: false,
  });
 
}
  return (
    <>
      <div className="registrar-stock">
        <div className="link-href">
          <Link to="/dashboardAdmin">
            <i className="fa fa-home" aria-hidden="true"></i>
            Panel de Control
          </Link>
        </div>
        <h3>Reporte de Ventas Online</h3>

        <div className="form-body-reporte">
          <div className="form-accion">
            <label>Fecha Inicial&nbsp;:&nbsp;</label>
            <div className="div-datepicker">
              <DatePicker
                selected={state.dteInicio}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                locale="es"
                onChange={(date) =>
                  dispatch({ type: actionType.SET_DTEINICIO, dteInicio: date })
                }
              ></DatePicker>
            </div>
            <label>Fecha Final&nbsp;:&nbsp;</label>
            <div className="div-datepicker">
              <DatePicker
                selected={state.dteFinal}
                minDate={state.dteInicio}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
                className="form-control"
                locale="es"
                onChange={(date) =>
                  dispatch({ type: actionType.SET_DTEFINAL, dteFinal: date })
                }
              ></DatePicker>
            </div>
            <button
              className=" btn btn-primary fa fa-search"
              onClick={handleEventBuscarReporte}
            >
              &nbsp;Buscar
            </button>
          </div>

          <div className="div-table">
            <table style={{ fontSize: "13px" }}>
              <thead>
                <tr>
                  <td style={{ width: "10%" }}>Código</td>

                  <td
                    style={{
                      width: "11%",
                      minWidth: "110px",
                      textAlign: "center",
                    }}
                    title="Ref.Cotizacion"
                  >
                    Ref.Cotización
                  </td>
                  <td
                    style={{
                      width: "11%",
                      minWidth: "110px",
                      textAlign: "center",
                    }}
                    title="Ref.Documento"
                  >
                    Ref.Documento
                  </td>
                  <td
                    style={{
                      width: "11%",
                      minWidth: "110px",
                      textAlign: "center",
                    }}
                    title="Orden Compra"
                  >
                    Ord.Compra
                  </td>
                  <td
                    style={{
                      width: "11%",
                      minWidth: "110px",
                      textAlign: "center",
                    }}
                    title="Guía Salida"
                  >
                    Guía Salida
                  </td>
                  <td
                    style={{
                      width: "11%",
                      minWidth: "110px",
                      textAlign: "center",
                    }}
                    title="Guía Salida"
                  >
                    OC. Pendiente?
                  </td>

                  <td
                    style={{
                      width: "11%",
                      minWidth: "110px",
                      textAlign: "center",
                    }}
                    title="OC.Online"
                  >
                    OC.Online
                  </td>
                  <td style={{ minWidth: "280px" }}>Descripción</td>
                  <td
                    style={{
                      width: "12%",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    title="Usuario"
                  >
                    Usuario
                  </td>
                  <td
                    style={{
                      width: "12%",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    title="Cliente"
                  >
                    Cliente
                  </td>
                  <td
                    style={{
                      width: "8%",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    title="Trans.Id Izipay"
                  >
                    Trans.Id Izipay
                  </td>
                  <td
                    style={{
                      width: "12%",
                      minWidth: "180px",
                      textAlign: "center",
                    }}
                    title="F.Creación"
                  >
                    F.Creación
                  </td>
                  <td
                    style={{
                      width: "12%",
                      minWidth: "180px",
                      textAlign: "center",
                    }}
                    title="F.Actualización"
                  >
                    F.Actualización
                  </td>
                  <td
                    style={{
                      width: "12%",
                      minWidth: "180px",
                      textAlign: "center",
                    }}
                    title="F.Envio"
                  >
                    F.Envio
                  </td>
                </tr>
              </thead>
              <tbody>
                {state.loading ? (
                  <tr>
                    <td colSpan="13">
                      <LoadingClassic></LoadingClassic>
                    </td>
                  </tr>
                ) : (
                  <tr style={{ display: "none" }}>
                    <td colSpan="13"></td>
                  </tr>
                )}
                {state.listData.length === 0 ? (
                  <tr>
                    <td colSpan="13">Sin registros.</td>
                  </tr>
                ) : (
                  state.listData
                )}
              </tbody>
            </table>
          </div>
        </div>

        <ServerException server={state.server}></ServerException>

        <div className="link-href">
          <Link to="/dashboardAdmin">
            <i className="fa fa-home" aria-hidden="true"></i>
            Panel de Control
          </Link>
        </div>
      </div>
      <Modal
        className="modal-direccion"
        show={state.modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onHide={(e) =>
            dispatch({ type: actionType.SHOW_MODAL, modalShow: false })
          }
        >
          <Modal.Title id="contained-modal-title-vcenter">
            Asociar Orden de Compra con la Cotización
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div style={{ display: "flex" }}>
            <span style={{ marginRight: "0.5em" }}> Nro. Orden de Compra</span>
            <input
              type="text"
              className="form-control"
              name="chrCodigoOc"
              value={state.chrCodigoOc}
              autoComplete="false"
              autoSave="false"
              onChange={(e)=> dispatch({ type: actionType.SET_chrCodigoOc,chrCodigoOc:e.target.value,})}
              style={{ width: "20%" }}
            ></input>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button onClick={  handleEventAsociarOcToCotizacion} className="btn btn-primary">
            Asociar OC
          </button>
          <button
            onClick={(e) =>
              dispatch({ type: actionType.SHOW_MODAL, modalShow: false })
            }
            className="btn btn-primary"
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
