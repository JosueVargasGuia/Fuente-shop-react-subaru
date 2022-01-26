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
import Loading from "../utils/loading";
import ServerException from "../utils/serverException";
import { outlet } from "./svgIcon/outLet";

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

export default function DashboardAdmin(props) {
  let history = useHistory();

  // eslint-disable-next-line
  const [state, dispatch] = useReducer(reducer, {
    numCodigoCliente: props.numCodigoCliente,
    rol: chrRol.ROLE_ANONIMO,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
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
    if (JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)) !== null) {
      if (!(JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)).chrRol === chrRol.ROLE_ADMIN
        && _rol === chrRol.ROLE_ADMIN
        && localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN)) {
        history.push("/admin");
      }
    } else {
      history.push("/admin");
    }

  }



  return (
    <div className="dashboard">
      <h3>Panel de Control</h3>{state.rol === chrRol.ROLE_ADMIN ?
        <div className="dashboard-content">
          <Link
            to={"/productoimagen"}
            className="dashboard-card"
          >
            <div>
              <i
                className="fa fa-opencart dashboard-info"
                aria-hidden="true"
              ></i>
              <span>Productos</span>
            </div>
          </Link>

          <Link
            to={"/listaUsuarioAdmin"}
            className="dashboard-card"
          >
            <div>
              <i
                className="fa fa-users dashboard-info"
                aria-hidden="true"
              ></i>
              <span>Usuarios</span>
            </div>
          </Link>

          <Link
            to={"/dashboard"}
            className="dashboard-card"
          >
            <div>
              <i
                className="fa fa-id-card dashboard-info"
                aria-hidden="true"
              ></i>
              <span>Usuario Dashboar</span>
            </div>
          </Link>        

          <Link
            to={"/listaCorreoJobs"}
            className="dashboard-card"
          >
            <div>
              <i
                className="fa fa-share-alt dashboard-info"
                aria-hidden="true"
              ></i>
              <span>Administrador Correos</span>
            </div>
          </Link>
          <Link
            to={"/reporteCotizacion"}
            className="dashboard-card"
          >
            <div>
              <i
                className="fa fa-bar-chart dashboard-info"
                aria-hidden="true"
              ></i>
              <span>Reporte de Ventas</span>
            </div>
          </Link>
          <Link
            to={"/listaProductosOutlet"}
            className="dashboard-card"
          >
            <div>
            {outlet}
              
              <span>Productos OutLet</span>
            </div>
          </Link>
        </div>
        : <>
          <div className="dashboard-content"><div className="dashboard-content">
            <Loading></Loading>
          </div></div>
        </>}
      <ServerException server={state.server}></ServerException>
    </div>
  );
}


