import { useEffect, useReducer } from "react";

 
import { HttpStatus,  SUCCESS_SERVER } from "../service/ENUM";
import { obtenerTipoCambio } from "../service/producto.service";

export default function TipoCambio(props) {
  const [state, dispatch] = useReducer(reducer, {
    tipoCambio: {
      fecha: "",
      tipoCambioCompra: "00.00",
      tipoCambioVenta: "00.00",
    },
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  async function handleServicioBuscarProductos() {
    const rpt = await obtenerTipoCambio();

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        dispatch({
          type: actionType.LOAD,
          tipoCambio: {
            fecha: json.fecha,
            tipoCambioCompra: json.tipoCambioCompra,
            tipoCambioVenta: json.tipoCambioVenta,
          },
          server: {
            error: "",
            success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT,
          },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.LOAD_PRODUCTOS,
          tipoCambio: {
            fecha: "",
            tipoCambioCompra: "00.00",
            tipoCambioVenta: "00.00",
          },
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.LOAD_PRODUCTOS,
        tipoCambio: {
          fecha: "",
          tipoCambioCompra: "00.00",
          tipoCambioVenta: "00.00",
        },
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }

  useEffect(() => {
    handleServicioBuscarProductos()
    console.log("useEffect[TipoCambio]");
  }, []);

  return (
    <span className="tipo-cambio">
      S/{parseFloat(state.tipoCambio.tipoCambioVenta).toFixed(2)}
      {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_INFO ? (
        <div>
          <br />
          <span className="alert alert-warning" role="alert">
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
            Lo sentimos el recurso no esta disponible, estamos trabajando para
            solucionar el inconveniente.
          </span>
        </div>
      ) : (
        ""
      )}
    </span>
  );
}

let actionType = {
  LOAD: "LOAD",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD:
      return {
        ...state,
        tipoCambio: action.tipoCambio,
        server: action.server,
      };
     
    default:
      return state;
  }
};
