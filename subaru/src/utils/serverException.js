import { useEffect, useReducer } from "react";
import {   HttpStatus, localStoreEnum, SUCCESS_SERVER } from "../service/ENUM";
import { validacionToken } from "../service/loginCliente.service";
import { useHistory } from "react-router-dom";
const actionType = { LOAD: "LOAD" };
/*Funcion reducer */
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD:
      return {
        ...state,
        className: action.className,
        isLoad: action.isLoad,
      };
    default:
      return state;
  }
};
let timeoutID;
export default function ServerException(props) {
  console.log(props.server);

  let { error, success } = props.server;
  const [state, dispatch] = useReducer(reducer, {
    className: "server-exception-ini",
    isLoad: false,
  });

  useEffect(() => {
    if (
      success === SUCCESS_SERVER.SUCCES_SERVER_INFO ||
      success === SUCCESS_SERVER.SUCCES_SERVER_ERROR ||
      success === SUCCESS_SERVER.SUCCES_SERVER_WARRING
    ) {
      dispatch({
        type: actionType.LOAD,
        className: "server-exception",
        isLoad: true,
      });
    }
    // eslint-disable-next-line
  }, [props.server]);
  let history = useHistory();
  async function _validacionToken() {
    let _value = "SHOW_MESSAGE";
    const rpt = await validacionToken({
      token: localStorage.getItem(localStoreEnum.TOKEN),
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_EXPIRE) {
        /*Redireccionando al login */
        _value = "REDIRECT";
      } else {
        /*Visualizando el */
        _value = "SHOW_MESSAGE";
      }
    } else {
      _value = "SHOW_MESSAGE";
    }
    console.log(_value);
    return _value;
  }

  if (state.isLoad === true) {
   
    handleEventValidaExcepcion()
  }
async function handleEventValidaExcepcion(){
  let _status =await _validacionToken();
  console.log(_status);
  if (_status === "REDIRECT") {
    localStorage.removeItem(localStoreEnum.ISLOGIN);
    localStorage.removeItem(localStoreEnum.USUARIO);
    localStorage.removeItem(localStoreEnum.TOKEN);
    localStorage.removeItem(localStoreEnum.COTIZACION);
    /*Redireccionando al login */
    window.location.reload();
    history.push("/loginCliente")
    timeoutID = setTimeout(() => {
      dispatch({
        type: actionType.LOAD,
        className: "server-exception server-exception-opacity",
        isLoad: false,
      });
    }, 10000);
  } else {
    /*Caso de error que la back end no responda */
    timeoutID = setTimeout(() => {
      dispatch({
        type: actionType.LOAD,
        className: "server-exception server-exception-opacity",
        isLoad: false,
      });
    }, 10000);
  }
}

  function handleEventClose() {
    dispatch({
      type: actionType.LOAD,
      className: "server-exception server-exception-opacity",
      isLoad: false,
    });
    clearTimeout(timeoutID);
  }
  return (
    <>
      {success !== SUCCESS_SERVER.SUCCES_SERVER_OK &&
        success !== SUCCESS_SERVER.SUCCES_SERVER_DEFAULT ? (
        <div className={state.className}>
          <div className="server-exception-title">
            Mensaje de eanet auto parts
          </div>
          {success === SUCCESS_SERVER.SUCCES_SERVER_INFO ? (
            <div className="server-exception-body">
              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-exclamation-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z" />
              </svg>

              <span className="alert alert-warning" role="alert">
                {error}
              </span>
            </div>
          ) : (
            ""
          )}
          {success === SUCCESS_SERVER.SUCCES_SERVER_ERROR ? (
            <div className="server-exception-body">
              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-x-circle"
                viewBox="0 0 16 16"
              >
                <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
              </svg>
              <span className="alert alert-danger" role="alert">
                Lo sentimos el recurso no esta disponible, estamos trabajando
                para solucionar el inconveniente.
              </span>
            </div>
          ) : (
            ""
          )}
          {success === SUCCESS_SERVER.SUCCES_SERVER_WARRING ? (
            <div className="server-exception-body">
              <br />
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                class="bi bi-exclamation-triangle"
                viewBox="0 0 16 16"
              >
                <path d="M7.938 2.016A.13.13 0 0 1 8.002 2a.13.13 0 0 1 .063.016.146.146 0 0 1 .054.057l6.857 11.667c.036.06.035.124.002.183a.163.163 0 0 1-.054.06.116.116 0 0 1-.066.017H1.146a.115.115 0 0 1-.066-.017.163.163 0 0 1-.054-.06.176.176 0 0 1 .002-.183L7.884 2.073a.147.147 0 0 1 .054-.057zm1.044-.45a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566z" />
                <path d="M7.002 12a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 5.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995z" />
              </svg>
              <span className="alert alert-warring" role="alert">
                {error}
              </span>
            </div>
          ) : (
            ""
          )}
          <div className="server-exception-action">
            <button
              className="btn btn-primary fa fa-close"
              onClick={handleEventClose}
            >
              Cerrar
            </button>
          </div>
        </div>
      ) : (
        ""
      )}
    </>
  );
}
