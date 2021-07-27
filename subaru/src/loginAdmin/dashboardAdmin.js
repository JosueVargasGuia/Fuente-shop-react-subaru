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

export default function DashboardAdmin(props) {   
  const [state, dispatch] = useReducer(reducer, {
    numCodigoCliente: props.numCodigoCliente,
    rol: chrRol.ROLE_ANONIMO,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
  return (
    <div className="dashboard">
       ADMIN
      <ServerException server={state.server}></ServerException>
    </div>
  );
}
