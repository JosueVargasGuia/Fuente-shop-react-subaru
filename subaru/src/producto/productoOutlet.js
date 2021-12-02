import { useEffect, useReducer } from "react";
import { Link } from "react-router-dom";
import {
  displayLista,
  filterOrder,
  FilterProducto,
  HttpStatus,
  Moneda,
  SUCCESS_SERVER,
} from "../service/ENUM";
import { findProductos } from "../service/producto.service";
import { Paginacion } from "./productoFilter";
const LIMITE = 10;

export function ProductoOutlet(props) {
  const [state, dispatch] = useReducer(reducer, {
    rowProducto: null,
    pagina: 1,
    currentPage: 1,
    totalRegistros: 0,
    displayLista: displayLista.DETALLE,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
  useEffect(() => {
    handleServicioBuscarProductos(1, LIMITE, "");
    console.log("useEffect[ProductoDestacado]");
    //eslint-disable-next-line
  }, [props.marcaSelect, props.moneda]);
  async function handleServicioBuscarProductos(
    _pagina,
    _limit,

    vchDescripcion
  ) {
    let rowProducto = [];
    let _FilterProducto = FilterProducto.FILTER_ALL;
    let _totalRegistros = 0;
    const rpt = await findProductos({
      vchDescripcion: vchDescripcion,
      pagina: _pagina,
      limit: _limit,
      filterProducto: _FilterProducto,
      filterOrder: filterOrder.FilterOutlet,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaProductos.length; index++) {
          let e = json.listaProductos[index];
          _totalRegistros = e.totalRegistros;
          let producto = {
            chrCodigoProducto: e.chrCodigoProducto,
            numValorVentaDolar: e.numValorVentaDolar,
            numValorVentaSoles: e.numValorVentaSoles,
            numCodigoMoneda: e.numCodigoMoneda,
            vchDescripcion: e.vchDescripcion,
            vchDescripcionSmall: e.vchDescripcionSmall,
            numStock: e.numStock,
            totalRegistros: e.totalRegistros,
            familia: {
              chrCodigoFamilia: e.familia.chrCodigoFamilia,
              vchDescripcion: e.familia.vchDescripcion,
            },
            /*Url de la imagen a mostrar en la lista de productos  */
            imagenDefault: {
              numCodigoProductoIimagen:
                e.imagenDefault.numCodigoProductoIimagen,
              chrCodigoProducto: e.imagenDefault.chrCodigoProducto,
              chrSrcImagen: e.imagenDefault.chrSrcImagen,
              chrNombre: e.imagenDefault.chrNombre,
              chrType: e.imagenDefault.chrType,
            },
            listaProductoImagen: [],
          };
          rowProducto.push(
            <tr>
              <td className="td-codigo">
                <span>
                  <Link
                    to={"/detalle/outl/outlet/" + producto.chrCodigoProducto}
                  >
                    {producto.chrCodigoProducto}
                  </Link>
                </span>
              </td>
              <td className="td-producto">
                <span>{producto.vchDescripcion}</span>
              </td>
              <td className="td-precio">
                <span className="td-precio-simbolo">
                  {props.moneda.codigoIso4217}{" "}
                </span>
                <span className="td-precio-valor">
                  {props.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? producto.numValorVentaDolar
                    : producto.numValorVentaSoles}
                </span>
              </td>
            </tr>
          );
        }
        dispatch({
          type: actionType.FIND_PRODUCTOS,
          rowProducto: rowProducto,
          displayLista: displayLista.DETALLE,
          totalRegistros: _totalRegistros,
          currentPage: _pagina,
          server: {
            error: "",
            success: SUCCESS_SERVER.SUCCES_SERVER_OK,
          },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.FIND_PRODUCTOS,
          rowProducto: rowProducto,
          displayLista: displayLista.DETALLE,
          totalRegistros: _totalRegistros,
          currentPage: _pagina,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.FIND_PRODUCTOS,
        rowProducto: rowProducto,
        displayLista: displayLista.DETALLE,
        currentPage: _pagina,
        totalRegistros: _totalRegistros,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }
  function handleEventToPage(_currentPage) {
    handleServicioBuscarProductos(_currentPage, LIMITE, "");
  }
  return (
    <div className="producto-outlet">
      <h4>Productos Outlet</h4>
      <table className="table-outlet">
        <thead>
          <tr>
            <td className="td-codigo">
              <div className="td-codigo-div">
                <span>Codigo</span>
                <input></input>
              </div>
            </td>
            <td className="td-producto">
            <div className="td-producto-div">
                <span>Producto</span>
                <input></input>
              </div>
            </td>
            <td className="td-precio">Precio</td>
          </tr>
        </thead>
        <tbody>{state.rowProducto}</tbody>
      </table>

      <div className="prod-filter-page">
        <Paginacion
          totalRecords={state.totalRegistros}
          pageLimit={LIMITE}
          pageNeighbours={1}
          currentPage={state.currentPage}
          handleEventToPage={handleEventToPage}
        ></Paginacion>
      </div>
    </div>
  );
}
let actionType = {
  LOAD: "LOAD",
  ERROR: "ERROR",
  CANTIDAD: "CANTIDAD",
  CANTIDAD_STOCK: "CANTIDAD_STOCK",
  FIND_PRODUCTOS: "FIND_PRODUCTOS",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.FIND_PRODUCTOS:
      return {
        ...state,
        rowProducto: action.rowProducto,
        displayLista: action.displayLista,
        totalRegistros: action.totalRegistros,
        currentPage: action.currentPage,
        server: action.server,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    default:
      return state;
  }
};
