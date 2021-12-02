import React, { useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  chrRol,
  HttpStatus,
  localStoreEnum,
  LOGGIN,
  SUCCESS_SERVER,
} from "../service/ENUM";
import { obtenerCliente } from "../service/loginCliente.service";
import ServerException from "../utils/serverException";

let actionType = { ROL: "ROL" };
/*Funcion reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ROL:
      return {
        ...state,
        rol: action.rol,
        server: action.server
      };
    default:
      return state;
  }
};

export default function DashboardCliente(props) {
  let history = useHistory();

  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, {
    numCodigoCliente: props.numCodigoCliente,
    rol: chrRol.ROLE_ANONIMO,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
  useEffect(() => {
    handleObtenerCliente(props.numCodigoCliente);
    console.log("useEffect[DashboardCliente]");
  }, [props.numCodigoCliente]);

  async function handleObtenerCliente(_numCodigoCliente) {
    let _rol = chrRol.ROLE_ANONIMO;
    const rpt = await obtenerCliente({ numCodigoCliente: _numCodigoCliente });

    let _server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT };
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      let _usuario = {};
      if (localStorage.getItem(localStoreEnum.USUARIO) !== null) {
        _usuario = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
        if (_usuario.chrRol === chrRol.ROLE_ADMIN && json.chrRol === chrRol.ROLE_ADMIN) {
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
  }

  if (localStorage.getItem(localStoreEnum.ISLOGIN) !== LOGGIN.LOGGIN) {
    /*Verificando que el cliente este logeado */
    history.push("/loginCliente");
    return <div className="dashboard"></div>;
  }

  return (
    <div className="dashboard">
      <h3>Su Cuenta</h3>
      <div className="dashboard-content">
        <Link
          to={"/informacion/" + state.numCodigoCliente + "/DashboardCliente"}
          className="dashboard-card"
        >
          <div>
            <i
              className="fa fa-user-circle-o dashboard-info"
              aria-hidden="true"
            ></i>
            <span>INFORMACIÓN</span>
          </div>
        </Link>
        <Link
          to={
            "/direccion/" +
            (state.numCodigoCliente === undefined
              ? 0
              : state.numCodigoCliente) +
            "/DashboardCliente"
          }
          className="dashboard-card"
        >
          <div>
            <i
              className="fa fa-map-marker dashboard-info"
              aria-hidden="true"
            ></i>
            <span>DIRECCIONES</span>
          </div>
        </Link>
        <Link
          to={"/tusCompras/" + state.numCodigoCliente}
          className="dashboard-card"
        >
          <div>
            <i className="fa fa-history dashboard-info" aria-hidden="true"></i>
            <span>TUS MOVIMIENTOS</span>
          </div>
        </Link>
      
        {state.rol === chrRol.ROLE_ADMIN ? (
          <Link
            to={"/dashboardAdmin"}
            className="dashboard-card"
          >
            <div>
              <i
                className="fa fa-cogs dashboard-info"
                aria-hidden="true"
              ></i>
              <span>ADMINISTRADOR</span>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
      <ServerException server={state.server}></ServerException>
    </div>
  );
}
