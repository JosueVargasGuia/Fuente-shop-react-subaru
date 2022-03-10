import React, { useReducer } from "react";
import { Link } from "react-router-dom";
import { SUCCESS_SERVER, LOGGIN, HttpStatus } from "../service/ENUM";
import { useHistory } from "react-router-dom";
import { logeoCLiente } from "../service/loginCliente.service";

let actionType = {
  USERNAME: "USERNAME",
  PASSWORD: "PASSWORD",
  ERROR_PASSWORD: "ERROR_PASSWORD",
  ERROR_USERNAME: "ERROR_USERNAME",
  LOGEANDO: "LOGEANDO",
  RESPONSE: "RESPONSE",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.USERNAME:
      return {
        ...state,
        username: action.username,
        success: action.success,
        error: action.error,
      };
    case actionType.PASSWORD:
      return {
        ...state,
        password: action.password,
        success: action.success,
        error: action.error,
      };
    case actionType.ERROR_USERNAME:
      return {
        ...state,
        error_username: action.error_username,
        success: action.success,
        estado: action.estado,
        error: action.error,
      };
    case actionType.ERROR_PASSWORD:
      return {
        ...state,
        error_password: action.error_password,
        success: action.success,
        estado: action.estado,
        error: action.error,
      };
    case actionType.LOGEANDO:
      return {
        ...state,
        error_username: action.error_username,
        error_password: action.error_password,
        success: action.success,
        estado: action.estado,
        error: action.error,
      };
    case actionType.RESPONSE:
      return {
        ...state,
        password: "",
        success: action.success,
        estado: action.estado,
        error: action.error,
      };
    default:
      return state;
  }
};

export default function LoginCliente(props) {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    password: "",
    error_username: { error: "", isValido: false },
    error_password: { error: "", isValido: false },
    success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT,
    estado: "INICIAR SESIÓN",
    error: {},
  });
  let history = useHistory();
  function validarLogin() {
    let isValido = true;

    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.username)) {
      dispatch({
        type: actionType.ERROR_USERNAME,
        error_username: {
          error: "Ingrese el correo de la cuenta",
          isValido: true,
        },
        estado: "INICIAR SESIÓN",
      });
      isValido = false;
    }
    if (!state.password) {
      dispatch({
        type: actionType.ERROR_PASSWORD,
        error_password: { error: "Ingrese la contraseña", isValido: true },
        estado: "INICIAR SESIÓN",
      });
      isValido = false;
    }
    return isValido;
  }

  async function handleClickLogeoCliente(e) {
    dispatch({
      type: actionType.LOGEANDO,
      error_username: { error: "", isValido: false },
      error_password: { error: "", isValido: false },
      estado: "INICIANDO...",
    });
    if (validarLogin()) {
      let loginResponse = {
        username: state.username,
        password: state.password,
      };
      const rpt = await logeoCLiente(loginResponse);

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();   
           
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          props.islogin(e, { isLogin: LOGGIN.LOGGIN, usuario: json });
          history.push("/");
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.RESPONSE,
            error: { server: json.response.error },
            estado: "INICIAR SESIÓN",
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          });
        }
      } else {
        dispatch({
          type: actionType.LOGEANDO,
          error_username: { error: "", isValido: false },
          error_password: { error: "", isValido: false },
          estado: "INICIAR SESIÓN",
          success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
        });
      }
    }
  }
  function handleOnKeyDown(e){
    if(e.key==='Enter'){   
      handleClickLogeoCliente();
    }
  }
  return (<div>
    <div className="login-form">
      <h1>Iniciar sesión con su cuenta</h1>
      <div className="wrapper">
        <div className="login-inputs">
          <label htmlFor="username">Dirección de correo electrónico</label>
          <input
            type="text"
            name="username"
            className="form-control"
            value={state.username}
            autoComplete="false"
            autoSave="false"
            onChange={(e) => {
              dispatch({
                type: actionType.USERNAME,
                username: e.target.value,
                success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT,
              });
            }}
          ></input>
        </div>
        <div className="login-data">
          {state.error_username.isValido ? (
            <span className="alert alert-danger" role="alert">
              {state.error_username.error}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="login-inputs">
          <label htmlFor="password">Contraseña</label>

          <input
            type="password"
            className="form-control"
            name="password"
            value={state.password}
            autoComplete="false"
            autoSave="false"
            onChange={(e) => {
              dispatch({
                type: actionType.PASSWORD,
                password: e.target.value,
                success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT,
              });
            }}
            onKeyDown={(e)=>handleOnKeyDown(e)}
          ></input>
        </div>
        <div className="login-data">
          {state.error_password.isValido ? (
            <span className="alert alert-danger" role="alert">
              {state.error_password.error}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="action">
          <Link to="/recuperarContraseña">¿Olvidó su contraseña?</Link>
          <br />
        </div>
        <div className="action">
          <button className="btn btn-primary" onClick={handleClickLogeoCliente}>
            {state.estado}
          </button>
        </div>
        <div className="login-data">
          {state.success === SUCCESS_SERVER.SUCCES_SERVER_INFO ? (
            <div>
              <br />
              <span className="alert alert-danger" role="alert">
                {state.error.server}
              </span>
            </div>
          ) : (
            ""
          )}
          {state.success === SUCCESS_SERVER.SUCCES_SERVER_ERROR ? (
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
        </div>
        <hr></hr>
        <div className="registro">
          <Link to="/registrarCliente">¿No tiene una cuenta? Cree una aquí</Link>
          <br />
        </div>
      </div>
    </div></div>
  );
}
