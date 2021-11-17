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
import { listaReporteCotizacion } from "../../service/producto.service";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker, { registerLocale } from "react-datepicker";
import es from "date-fns/locale/es";
registerLocale("es", es);
let actionType = {
  LISTDATA: "LISTDATA",
  SET_DTEINICIO: "SET_DTEINICIO",
  SET_DTEFINAL: "SET_DTEFINAL",
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
    default:
      return state;
  }
};
export default function ReporteCotizacion(props) {
  const [state, dispatch] = useReducer(reducer, {
    listData: [],
    loading: false,

    dteInicio: new Date(),
    dteFinal: new Date(),
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
    const rpt = await listaReporteCotizacion({dteInicio:state.dteInicio,dteFinal:state.dteFinal});
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        const lista = json.lista;
        console.log(lista);;
        console.log(lista.length);
        for (let i = 0; i < lista.length; i++) {
          const rpt = lista[i];
          _listData.push(
            <tr key={i}>
              <td>{rpt.numCodigoCotizacionOnline}</td>
              <td style={{ minWidth: "380px" }}>{rpt.descripcion}</td>
              <td   
                style={{ width: "12%", minWidth: "120px", textAlign: "center" ,color:"#4992ff"}}
              >
                {rpt.numFacturas}
              </td>
              <td
                style={{ width: "12%", minWidth: "120px", textAlign: "center", color:"#4992ff" }}
              >
                {rpt.chrCodigoCotizacion}
              </td>
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
                style={{ width: "8%", minWidth: "120px", textAlign: "center" , color:"#4992ff" }}
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
  return (
    <>
      <div className="registrar-stock">
        <div className="link-href">
          <Link to="/dashboardAdmin">
            <i className="fa fa-home" aria-hidden="true"></i>
            Panel de Control
          </Link>
        </div>
        <h3>Reporte de Cotizaciones Online</h3>

        <div className="form-body-reporte">
          <div className="form-accion">
            <label>Fecha Inicial&nbsp;:&nbsp;</label>
            <div className="div-datepicker">
              <DatePicker
                selected={state.dteInicio}
                maxDate={new Date()}
                dateFormat="dd/MM/yyyy"
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
                  <td style={{ minWidth: "380px" }}>Descripción</td>
                  <td
                    style={{
                      width: "12%",
                      minWidth: "120px",
                      textAlign: "center",
                    }}
                    title="Ref.Documento"
                  >
                    Ref.Documento
                  </td>
                  <td
                 
                    style={{
                      width: "12%",
                      minWidth: "120px",
                      textAlign: "center",                     
                    }}
                    title="Ref.Cotizacion"
                  >
                    Ref.Cotización
                  </td>
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
                    <td colSpan="8">
                      <LoadingClassic></LoadingClassic>
                    </td>
                  </tr>
                ) : (
                  ""
                )}
                {state.listData}
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
    </>
  );
}