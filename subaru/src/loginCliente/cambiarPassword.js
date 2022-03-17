import { useEffect, useReducer } from "react";
import { HttpStatus, SUCCESS_SERVER } from "../service/ENUM";
import {
  datosPeticionContraseña,
  actualizarContraseña,
} from "../service/loginCliente.service";
import queryString from "query-string";
import { Link } from "react-router-dom";
let actionType = {
  LOAD: "LOAD",
  REQUETS: "REQUETS",
  PASSWORD: "PASSWORD",
  CONFIRMACION: "CONFIRMACION",
  ERROR: "ERROR",
  OK: "OK",
};
/*Funcion reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD:
      return {
        ...state,
        chrEmail: action.chrEmail,
        token: action.token,
        server: action.server,
      };
    case actionType.REQUETS:
      return {
        ...state,
        server: action.server,
      };
    case actionType.PASSWORD:
      return {
        ...state,
        password: action.password,
      };
    case actionType.CONFIRMACION:
      return {
        ...state,
        confirmacion: action.confirmacion,
      };
    case actionType.ERROR:
      return {
        ...state,
        error: action.error,
      };
    case actionType.OK:
      return {
        ...state,
        server: action.server,
        changeOk: action.changeOk,
        error: action.error,
      };
    default:
      return state;
  }
};
export default function CambiarPasswod() {
  

  const [state, dispatch] = useReducer(reducer, {
    chrEmail: "",
    password: "",
    confirmacion: "",
    token: "",
    error: {
      password: { error: "", isValido: false },
      confirmacion: { error: "", isValido: false },
    },
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    changeOk: false,
  });
// eslint-disable-next-line
  useEffect(() => {
    const params = queryString.parse(window.location.search);
    let token = params.token;
    handleObtenerDatosCliente(token);
    console.log(" useEffect CambiarPasswod ");
  }, []);
  async function handleObtenerDatosCliente(_token) {
    const rpt = await datosPeticionContraseña({ token: _token });
    console.log(rpt);
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        dispatch({
          type: actionType.LOAD,
          chrEmail: json.chrEmail,
          token: _token,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_OK,
          },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.REQUETS,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.REQUETS,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }
  async function handleClickChangePassword() {
    let valida = true;
    let _error = {
      password: { error: "", isValido: false },
      confirmacion: { error: "", isValido: false },
    };
    if (!state.password) {
      _error.password.error = "Por favor, introduce tu nueva contraseña.";
      _error.password.isValido = true;
      valida = false;
    }
    if (!state.confirmacion) {
      _error.confirmacion.error =
        "El campo de confirmación está vacío: por favor, rellena también el campo de confirmación de contraseña";
      _error.confirmacion.isValido = true;
      valida = false;
    }
    if (state.password !== state.confirmacion && valida) {
      _error.password.error = "La contraseña y su confirmación no coinciden.";
      _error.password.isValido = true;
      _error.confirmacion.error =
        "La contraseña y su confirmación no coinciden.";
      _error.confirmacion.isValido = true;
      valida = false;
    }
    if (valida) {
      const rpt = await actualizarContraseña({
        token: state.token,
        chrPassword: state.password,
        chrPasswordCopia: state.confirmacion,
        chrEmail: state.chrEmail,
      });
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          dispatch({
            type: actionType.OK,
            changeOk: true,
            error: _error,
            server: {
              error: json.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_OK,
            },
          });
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.REQUETS,
            server: {
              error: json.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            },
          });
        }
      } else {
        dispatch({
          type: actionType.REQUETS,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        error: _error,
      });
    }
  }
  return (
    <>
      <div className="restabl-password">
        <h4>Restablecer su contraseña</h4>

        <div className="restabl-password-body">
          {state.changeOk === false ? (
            <>
              <div className="restabl-password-label">
                Dirección de correo electrónico : <span>{state.chrEmail}</span>
              </div>
              <div className="restabl-password-inputs">
                <label htmlFor="password">Nueva contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  name="password"
                  value={state.password}
                  autoComplete="false"
                  autoSave="false"
                  maxLength={255}
                  onChange={(e) => {
                    dispatch({
                      type: actionType.PASSWORD,
                      password: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="restabl-password-mesaje">
                {state.error.password.isValido ? (
                  <span className="alert alert-danger" role="alert">
                    {state.error.password.error}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="restabl-password-inputs">
                <label htmlFor="confirmacion">Confirmación</label>
                <input
                  type="password"
                  className="form-control"
                  name="confirmacion"
                  value={state.confirmacion}
                  autoComplete="false"
                  autoSave="false"
                  maxLength={255}
                  onChange={(e) => {
                    dispatch({
                      type: actionType.CONFIRMACION,
                      confirmacion: e.target.value,
                    });
                  }}
                ></input>
              </div>
              <div className="restabl-password-mesaje">
                {state.error.confirmacion.isValido ? (
                  <span className="alert alert-danger" role="alert">
                    {state.error.confirmacion.error}
                  </span>
                ) : (
                  ""
                )}
              </div>
              <div className="restabl-password-accion">
                <button
                  className="btn btn-primary"
                  onClick={handleClickChangePassword}
                >
                  Cambiar Contraseña
                </button>
              </div>
            </>
          ) : (
            ""
          )}
          {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_OK &&
          state.changeOk === true ? (
            <div className="restabl-password-body-message">
              
              <span className="alert alert-success" role="alert">
                {state.server.error}
              </span>
              
              <div className="link-app">
                <Link aria-hidden="true" to="/loginCliente">
                  ¡Inicie sesión aquí!
                </Link>
              </div>
            </div>
          ) : (
            ""
          )}
          {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_INFO ? (
            <div>
              <br />
              <span className="alert alert-danger" role="alert">
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
                Lo sentimos el recurso no esta disponible, estamos trabajando
                para solucionar el inconveniente.
              </span>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </>
  );
}
