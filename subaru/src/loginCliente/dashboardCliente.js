import React, { useEffect, useReducer } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  HttpStatus,
  localStoreEnum,
  LOGGIN, 
} from "../service/ENUM";
import { obtenerCliente } from "../service/loginCliente.service";

let actionType = { ROL: "ROL" };
/*Funcion reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ROL:
      return {
        ...state,
        rol: action.rol,
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
    rol: "ROLE_USER",
  });
  useEffect(() => {
    handleObtenerCliente(props.numCodigoCliente);
    console.log("useEffect[DashboardCliente]");
  }, [props.numCodigoCliente]);

  async function handleObtenerCliente(_numCodigoCliente) {
    let _rol = "ROLE_USER";
    const rpt = await obtenerCliente({ numCodigoCliente: _numCodigoCliente });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      _rol = json.rol;
    }
    dispatch({ type: actionType.ROL, rol: _rol });
  }

  if (localStorage.getItem(localStoreEnum.ISLOGIN) !== LOGGIN.LOGGIN) {
    /*Verificando que el cliente este logeado */
    history.push("/loginCliente");
    return <div className="dashboard"></div>;
  }
  console.log(state);
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
            <span>TUS COMPRAS</span>
          </div>
        </Link>
        <Link
          to={"/facturaAbono/" + state.numCodigoCliente}
          className="dashboard-card"
        >
          <div>
            <i
              className="fa fa-sticky-note dashboard-info"
              aria-hidden="true"
            ></i>
            <span>FACTURAS POR ABONO</span>
          </div>
        </Link>
        {state.rol === "ROLE_ADMIN" ? (
          <Link
            to={"/productoimagen"}
            className="dashboard-card"
          >
            <div>
              <i
                className="fa fa-opencart dashboard-info"
                aria-hidden="true"
              ></i>
              <span>PRODUCTOS</span>
            </div>
          </Link>
        ) : (
          ""
        )}
      </div>
    </div>
  );
}
