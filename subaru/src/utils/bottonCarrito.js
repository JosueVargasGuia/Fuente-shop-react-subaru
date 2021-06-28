import { Link } from "react-router-dom";
import { HttpStatus, localStoreEnum, SUCCESS_SERVER } from "../service/ENUM";
import { handleSyncDatosCotizacion } from "../service/general";
import { obtenerCotizacionActiva } from "../service/cotizacion.service";
import { useEffect, useReducer } from "react";
import ServerException from "./serverException";
export default function BottonCarrito(props) {
 

  const [state, dispatch] = useReducer(reducer, {
    cantidad: 0,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  useEffect(() => {
    handleLoadCotizacionActiva();
    console.log("useEffect[BottonCarrito]");
  }, [props.islogin]);
  async function handleLoadCotizacionActiva() {
    let cotizacionActiva = {
      numCodigoCotizacionOnline: 0,
      numCodigoClienteUsuario: 0,
      numCodigoCliente: 0,
      isLogin: 0,
    };
    if (localStorage.getItem(localStoreEnum.ISLOGIN) !== null) {
      let usuario = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
      cotizacionActiva.numCodigoCliente = usuario.numCodigoCliente;
      cotizacionActiva.numCodigoClienteUsuario =
        usuario.numCodigoClienteUsuario;
      cotizacionActiva.isLogin = 1;       
    } else {
      let cotizacion = handleSyncDatosCotizacion();
      cotizacionActiva.numCodigoCotizacionOnline =
        cotizacion.numCodigoCotizacionOnline;
      cotizacionActiva.isLogin = 0;
       
    }
   
    const rpt = await obtenerCotizacionActiva(cotizacionActiva);
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        dispatch({
          type: actionType.CANTIDAD,
          cantidad: json.cantidad,
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: {
          error: "",
          success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
        },
      });
    }
  }
 
  return (
    <>
      <Link className="btn_link shop" aria-hidden="true" to={state.cantidad >= 1 ? "/carrito" : "/shop"} title="Carrito de compras" >
        <div className={`box_shop ${state.cantidad>=1 ? ' div-carrito' : ''}`}>
          <i className="material-icons">shopping_cart</i>
          {state.cantidad === 0 ? (
            <span>Carrito</span>
          ) : (
            <><span>Carrito</span>({state.cantidad})</>
          )}
        </div>
      </Link>
      <ServerException server={state.server}></ServerException>
       
    </>
  );
}

let actionType = {
  ERROR: "ERROR",
  CANTIDAD: "CANTIDAD",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.CANTIDAD:
      return {
        ...state,
        cantidad: action.cantidad,
      };
    default:
      return state;
  }
};
