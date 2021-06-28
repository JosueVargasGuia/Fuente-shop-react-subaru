import { useReducer } from "react";
import { HttpStatus, SUCCESS_SERVER } from "../service/ENUM";
import { recuperarContraseña } from "../service/loginCliente.service";
let actionType = {
  USERNAME: "USERNAME",
  ERROR_USERNAME: "ERROR_USERNAME",
  RESPONSE: "RESPONSE",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.USERNAME:
      return {
        ...state,
        username: action.username,
      };
    case actionType.ERROR_USERNAME:
      return {
        ...state,
        server: action.server,
      };
    case actionType.RESPONSE:
      return {
        ...state,
        server: action.server,
      };
    default:
      return state;
  }
};
export default function RecuperarPasswod() {
  const [state, dispatch] = useReducer(reducer, {
    username: "",
    server: {
      error: "dasd",
      success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT,
    },
  });
  async function handleEventClick() {
    let isValido = true;
    if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.username)) {
      dispatch({
        type: actionType.ERROR_USERNAME,
        server: {
          error:
            "El correo no tiene el formato correcto, Ejemplo: correo@dominio.com.pe",
          success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
        },
      });
      isValido = false;
    }
    
    if (isValido) {
      const rpt = await recuperarContraseña({chrEmail:state.username});
      
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();       
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {          
          dispatch({
            type: actionType.RESPONSE,
            server: {
              error: json.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_OK,
            },
          });
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) { 
          dispatch({
            type: actionType.RESPONSE,
            server: {
              error: json.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            },
          });
        }
      } else {
        dispatch({
          type: actionType.RESPONSE,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }
    }
   
  }
  return (
    <>
      <div className="recuperar-form">
        <h4>¿Olvidó su contraseña?</h4>

        <div className="recuperar-body">
          <div className="recuperar-info">
            Por favor, introduzca la dirección de correo electrónico que utilizó
            para registrarse. Recibirá un enlace temporal para restablecer su
            contraseña.
          </div>
          <div className="recup-label">
            <label htmlFor="username">Dirección de correo electrónico</label>
          </div>
          <div className="recup-input">
            <input
              type="text"
              name="username"
              className="form-control"
              max={255}
              value={state.username}
              autoComplete="false"
              onChange={(e) =>
                dispatch({
                  type: actionType.USERNAME,
                  username: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="recup-button">
            <label htmlFor="username">
              <button className="btn btn-primary" onClick={handleEventClick}>
                {" "}
                Enviar enlace de restablecimiento de contraseña
              </button>
            </label>
          </div>
          <div className="recup-data">
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
            {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_OK ? (
              <div>
                <br />
                <span className="alert alert-success" role="alert">
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
      </div>
    </>
  );
}
