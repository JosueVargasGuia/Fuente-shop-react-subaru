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
    chrCodigoProductoSearch: "",
    vchDescripcionSearch: "",
    titulo:"Productos del outlet",
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
  useEffect(() => {
    handleServicioBuscarProductos(1, LIMITE, "", "");
    console.log("useEffect[ProductoDestacado]");
    //eslint-disable-next-line
  }, [props.marcaSelect, props.moneda]);
  async function handleServicioBuscarProductos(
    _pagina,
    _limit,
    _chrCodigoProducto,
    _vchDescripcion
  ) {
    let rowProducto = [];
    let _FilterProducto = FilterProducto.FILTER_ALL;
    let _totalRegistros = 0;
    const rpt = await findProductos({
      chrCodigoProducto: _chrCodigoProducto,
      vchDescripcion: _vchDescripcion,
      pagina: _pagina,
      limit: _limit,
      filterProducto: _FilterProducto,
      filterOrder: filterOrder.FilterOutlet,
    });
    let _titulo="Productos del outlet";
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      _titulo=(json.vigencia.dteDesde===null 
        && json.vigencia.dteHasta===null?
        "Productos en Outlet":"Productos en Outlet: desde "+ json.vigencia.dteDesdeFormato +" al "+json.vigencia.dteHastaFormato);
       
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
            numValorDesc: e.numValorDesc,
            numValorVentaRefSoles: e.numValorVentaRefSoles,
            numValorVentaRefDolar: e.numValorVentaRefDolar,
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
            <tr key={index}>
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
                <span className="td-precio-valor">
                  {props.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? producto.numValorVentaRefDolar
                    : producto.numValorVentaRefSoles}
                </span>
              </td>
              <td className="td-dsct">
                <div className="td-producto-div-desc">
                  <div className="td-producto-div-desc-porc" style={{width:(producto.numValorDesc)+"%"}}>  
                    &nbsp;                  
                  </div>
                  <div className="td-producto-div-desc-porc-text">{parseFloat(producto.numValorDesc).toFixed(0)}{" %"}</div>
                </div>
              </td>

              <td className="td-precio">
                <span className="td-precio-valor">
                  {props.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? producto.numValorVentaDolar
                    : producto.numValorVentaSoles}
                </span>
              </td>

              <td className="td-stock">
                <span className="td-precio-valor">
                  {producto.numStock}
                </span>
              </td>
            </tr>
          );
        }
        if (json.listaProductos.length === 0) {
          rowProducto.push(
            <tr key={0}>
              <td colSpan="6">Sin registros.</td>
            </tr>
          );
        }
        dispatch({
          type: actionType.FIND_PRODUCTOS,
          rowProducto: rowProducto,
          displayLista: displayLista.DETALLE,
          totalRegistros: _totalRegistros,
          currentPage: _pagina,
          chrCodigoProductoSearch: _chrCodigoProducto,
          vchDescripcionSearch: _vchDescripcion,
          titulo:_titulo,
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
          chrCodigoProductoSearch: _chrCodigoProducto,
          vchDescripcionSearch: _vchDescripcion,
          titulo:_titulo,
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
        chrCodigoProductoSearch: _chrCodigoProducto,
        vchDescripcionSearch: _vchDescripcion,
        titulo:_titulo,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }
  function handleEventToPage(_currentPage) {
    console.log(state);
    handleServicioBuscarProductos(_currentPage, LIMITE,state.chrCodigoProductoSearch, state.vchDescripcionSearch);
  }
  return (
    <div className="producto-outlet">
      <h4>{state.titulo}</h4>
      <table className="table-outlet">
        <thead>
          <tr>
            <td className="td-codigo">
              <div className="td-codigo-div">
                <span>Codigo</span>
                <input
                  type="text"
                  name="chrCodigoProductoSearch"
                  className={"form-control"}
                  autoComplete="false"
                  autoSave="false"
                  value={state.chrCodigoProductoSearch}
                  onChange={(e) =>
                    handleServicioBuscarProductos(
                      1,
                      LIMITE,
                      e.target.value,
                      state.vchDescripcionSearch
                    )
                  }
                ></input>
              </div>
            </td>
            <td className="td-producto">
              <div className="td-producto-div">
                <span>Producto</span>
                <input
                  type="text"
                  name="vchDescripcionSearch"
                  className={"form-control"}
                  autoComplete="false"
                  autoSave="false"
                  value={state.vchDescripcionSearch}
                  onChange={(e) =>
                    handleServicioBuscarProductos(
                      1,
                      LIMITE,
                      state.chrCodigoProductoSearch,
                      e.target.value
                    )
                  }
                ></input>
              </div>
            </td>
            <td className="td-precio">
              <div className="td-producto-div">
                <span>Precio</span>
                <span>Público</span>
                <span className="td-precio-simbolo">
                  {props.moneda.codigoIso4217}{" "}
                </span>
              </div>
            </td>
            <td className="td-dsct">
              <div className="td-producto-div">
                <span>Dsct.%</span> 
              </div>
            </td>
            <td className="td-precio">
              <div className="td-producto-div">
                <span>Precio</span>
                <span>OutLet</span>
                <span className="td-precio-simbolo">
                  {props.moneda.codigoIso4217}{" "}
                </span>
              </div>
            </td>
            <td className="td-stock">
              <div className="td-producto-div">
                <span>Stock</span>              
              </div>
            </td>
          </tr>
        </thead>
        <tbody> 
          <tr colSpan="5" style={{display:"none"}}></tr>
          {state.rowProducto}</tbody>
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

      <div className="div-text-type-nota">
          <span className="div-text-type-nota-resaltado">Notas</span>
          <ul>
            <li>El descuento porcentual ha sido redondeado, su compra podrá contener diferencias de décimas porcentuales. </li>
            <li>Nuestra empresa no se responsabiliza si el precio de algunos ítems difiere por corrupción del sistema, si eso ocurriera agradeceremos consultar al número telefónico: (511) 630 7600.  </li>
            <li>Los stocks exhibidos podrán variar en cualquier momento, en el caso de realizarse la transacción y el stock estuviera agotado, nos comunicaremos con usted para aplicarle la devolución de su dinero o emitir una  nota de crédito para su próxima compra. </li>
          </ul>
          
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
  chrCodigoProductoSearch: "chrCodigoProductoSearch",
  vchDescripcionSearch: "vchDescripcionSearch",
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
        chrCodigoProductoSearch: action.chrCodigoProductoSearch,
        vchDescripcionSearch: action.vchDescripcionSearch,
        server: action.server,
        titulo:action.titulo,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.chrCodigoProductoSearch:
      return {
        ...state,
        chrCodigoProductoSearch: action.chrCodigoProductoSearch,
      };
    case actionType.vchDescripcionSearch:
      return {
        ...state,
        vchDescripcionSearch: action.vchDescripcionSearch,
      };
    default:
      return state;
  }
};
