import React, { useReducer } from "react";
import { realisarSupcripcion } from "../service/suscripcion.service";
import { SUCCESS_SERVER, HttpStatus } from "../service/ENUM";
 
let actionType = {
  SUSCRIPCION: "SUSCRIPCION",
  SUSCRIBIENDOTE: "SUSCRIBIENDOTE",
  CORREO: "CORREO",
  ERROR: "ERROR",
  SUCCESS: "SUCCESS",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SUSCRIPCION:
      return {
        ...state,
        vchemail: action.vchemail,
        estado: action.estado,
        error: action.error,
        success: action.success,
      };
    case actionType.SUSCRIBIENDOTE:
      return {
        ...state,
        estado: action.estado,
        error: {},
        success: action.success,
      };
    case actionType.CORREO:
      return {
        ...state,
        vchemail: action.vchemail,
        error: {},
        success: action.success,
      };
    case actionType.ERROR:
      return {
        ...state,
        error: action.error,
        success: action.success,
        estado: action.estado,
      };
    case actionType.SUCCESS:
      return {
        ...state,
        vchemail: action.vchemail,
        estado: action.estado,
        error: action.error,
        success: action.success,
      };
    default:
      return state;
  }
};
export default function Suscripcion() {
  const [state, dispatch] = useReducer(reducer, {
    vchemail: "",
    estado: "Suscribirse",
    error: {},
    success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT,
  });

  function validar() {
    let isValido = true;
    if (!state.vchemail) {
      dispatch({
        type: actionType.ERROR,
        error: { email: "Ingrese el correo", isValido: true },
        estado: "Suscribirse",
      });
      isValido = false;
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(state.vchemail)
    ) {
      dispatch({
        type: actionType.ERROR,
        error: { email: "Formato de correo invalido", isValido: true },
        estado: "Suscribirse",
      });
      isValido = false;
    }

    return isValido;
  }
  async function handleClickSuscripcion(e) {
    dispatch({ type: actionType.SUSCRIBIENDOTE, estado: "Suscribiendote..." });
    if (validar()) {
      const rpta = await realisarSupcripcion({ vchEmail: state.vchemail });
      if (rpta.status === HttpStatus.HttpStatus_OK) {
        const json = await rpta.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          dispatch({
            type: actionType.SUCCESS,
            vchemail: "",
            estado: "Suscribirse",
            error: { server: "1" },
            success: SUCCESS_SERVER.SUCCES_SERVER_OK,
          });
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.SUCCESS,
            vchemail: state.vchemail,
            error: { server: json.response.error },
            estado: "Suscribirse",
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          });
        }
      } else {
        dispatch({
          type: actionType.SUCCESS,
          vchemail: "",
          error: {},
          estado: "Suscribirse",
          success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
        });
      }
    }
  }
  function setVchemail(e) {
    dispatch({ type: actionType.CORREO, vchemail: e.target.value });
  }

  return (
    <div className="container">
      <div className="suscripcion-body">
        <div className="suscripcion-input">
          <div>Infórmese de nuestras últimas noticias y ofertas especiales</div>
          <div className="suscripcion-input-in">
            <input
              type="text"
              value={state.vchemail}
              onChange={setVchemail}
              maxLength={128}
              placeholder="Su dirección de correo electrónico"
            ></input>
            <button className="btn btn-primary" onClick={handleClickSuscripcion}>
              {state.estado}
            </button>
            <div className="suscripcion-info">Puede darse de baja en cualquier momento. Para ello, consulte nuestra
              información de contacto en el aviso legal.</div>
          </div>
        </div>
        <div className="suscripcion-message">
          {state.error.isValido ? (
            <div>
              <br />
              <span className="alert alert-danger" role="alert">
                {state.error.email}
              </span>
            </div>
          ) : (
            ""
          )}

          {state.success === SUCCESS_SERVER.SUCCES_SERVER_OK ? (
            <div>
              <br />
              <span className="alert alert-info" role="alert">
                Se ha suscrito correctamente a este boletín de noticias.
              </span>
            </div>
          ) : (
            ""
          )}
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
      </div>
    </div>
  );
}
