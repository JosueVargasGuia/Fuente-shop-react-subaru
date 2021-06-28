import { useEffect, useReducer } from "react";
import { FilterProducto, HttpStatus, SUCCESS_SERVER } from "../service/ENUM";
import { findProductos } from "../service/producto.service";
import { displayLista } from "../service/ENUM";
import ProductosCard from "./productoCard";
import { Link } from "react-router-dom";
import ServerException from "../utils/serverException";
const LIMITE = 8;
export default function ProductoDestacado(props) {
  const [state, dispatch] = useReducer(reducer, {
    rowProducto: [],
    rowProductoRecomendado: [],
    rowProductoOferta: [],
    rowProductoRemate: [],
    pagina: 1,
    activeIndex: 1,
    displayLista: displayLista.DETALLE,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  useEffect(() => {
    handleServicioBuscarProductos(
      1,
      LIMITE,
      props.marcaSelect.chrcodigofamilia,
      ""
    );

    console.log("useEffect[ProductoDestacado]");
    //eslint-disable-next-line
  }, [props.marcaSelect, props.moneda]);


  //eslint-disable-next-line
  async function handleServicioBuscarProductos(
    _pagina,
    _limit,
    chrCodigoFamilia,
    vchDescripcion
  ) {
    let rowProducto = [];
    let rowProductoRecomendado = [];
    let rowProductoOferta = [];
    let rowProductoRemate = [];
    let _FilterProducto =
      props.marcaSelect.codigoMarca === 0
        ? FilterProducto.FILTER_DESTACADO
        : FilterProducto.FILTER_DESTACADO_MARCA;
    if (FilterProducto.FILTER_DESTACADO === _FilterProducto) {
      rowProductoRecomendado = await handleServicioBuscarProductoFilter(
        _pagina,
        _limit,
        FilterProducto.FILTER_RECOMENDADO
      );
      rowProductoOferta = await handleServicioBuscarProductoFilter(
        _pagina,
        _limit,
        FilterProducto.FILTER_OFERTA
      );
      rowProductoRemate = await handleServicioBuscarProductoFilter(
        _pagina,
        _limit,
        FilterProducto.FILTER_REMATE
      );
    }
    const rpt = await findProductos({
      chrCodigoFamilia: chrCodigoFamilia,
      vchDescripcion: vchDescripcion,
      pagina: _pagina,
      limit: _limit,
      filterProducto: _FilterProducto,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaProductos.length; index++) {
          let e = json.listaProductos[index];
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
            <ProductosCard
              moneda={props.moneda}
              producto={producto}
              key={producto.chrCodigoProducto}
            ></ProductosCard>
          );
        }
        dispatch({
          type: actionType.FIND_PRODUCTOS,
          rowProducto: rowProducto,
          rowProductoRecomendado: rowProductoRecomendado,
          rowProductoOferta: rowProductoOferta,
          rowProductoRemate: rowProductoRemate,
          displayLista:
            props.marcaSelect.codigoMarca === 0
              ? displayLista.RESUMEN
              : displayLista.DETALLE,
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
          rowProductoRecomendado: rowProductoRecomendado,
          rowProductoOferta: rowProductoOferta,
          rowProductoRemate: rowProductoRemate,
          displayLista:
            props.marcaSelect.codigoMarca === 0
              ? displayLista.RESUMEN
              : displayLista.DETALLE,
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
        rowProductoRecomendado: rowProductoRecomendado,
        rowProductoOferta: rowProductoOferta,
        rowProductoRemate: rowProductoRemate,
        displayLista:
          props.marcaSelect.codigoMarca === 0
            ? displayLista.RESUMEN
            : displayLista.DETALLE,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }

  async function handleServicioBuscarProductoFilter(
    _pagina,
    _limit,
    _FilterProducto
  ) {
    let row = [];
    const rpt = await findProductos({
      chrCodigoFamilia: null,
      vchDescripcion: null,
      pagina: _pagina,
      limit: _limit,
      filterProducto: _FilterProducto,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      for (let index = 0; index < json.listaProductos.length; index++) {
        let e = json.listaProductos[index];
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
            numCodigoProductoIimagen: e.imagenDefault.numCodigoProductoIimagen,
            chrCodigoProducto: e.imagenDefault.chrCodigoProducto,
            chrSrcImagen: e.imagenDefault.chrSrcImagen,
            chrNombre: e.imagenDefault.chrNombre,
            chrType: e.imagenDefault.chrType,
          },
          listaProductoImagen: [],
        };
        row.push(
          <ProductosCard
            moneda={props.moneda}
            producto={producto}
            key={producto.chrCodigoProducto}
          ></ProductosCard>
        );
      }
    }
    return row;
  }
  return (
    <>
      <div className="produc-destacado">
        <div className="produc-destacado-title">
          <h4>PRODUCTOS DESTACADOS</h4>
        </div>
        <div className="produc-destacado-wrapper">
          <div className="produc-destacado-item">{state.rowProducto}</div>
          <div className="produc-destacado-item produc-destacado-item-right link-href">
            <Link to={"/shop/" + props.marcaSelect.decripcion + "/filter/all"}>Todos los productos &raquo;</Link>
          </div>
        </div>
      </div>
      {state.displayLista === displayLista.RESUMEN ? (
        <div className="produc-destacado">
          <div className="produc-destacado-title">
            <ul>
              <li
                className={state.activeIndex === 1 ? "active" : ""}
                key="1"
                onClick={() =>
                  dispatch({
                    type: actionType.ACTIVE_INDEX_TAB,
                    activeIndex: 1,
                  })
                }
              >
                <h5>Recomendados</h5>
              </li>
              <li
                className={state.activeIndex === 2 ? "active" : ""}
                key="2"
                onClick={() =>
                  dispatch({
                    type: actionType.ACTIVE_INDEX_TAB,
                    activeIndex: 2,
                  })
                }
              >
                <h5>En Oferta</h5>
              </li>
              <li
                className={state.activeIndex === 3 ? "active" : ""}
                key="3"
                onClick={() =>
                  dispatch({
                    type: actionType.ACTIVE_INDEX_TAB,
                    activeIndex: 3,
                  })
                }
              >
                <h5>Remate</h5>
              </li>
            </ul>
          </div>
          {state.activeIndex === 1 ? (
            <>
              <div className="produc-destacado-wrapper">
                <div className="produc-destacado-item-recomentado">
                  {state.rowProductoRecomendado}
                </div>
                <div className="produc-destacado-item produc-destacado-item-right link-href">
                  <Link to="/shop/recomendado/filter/all">
                    Todos los productos &raquo;
                  </Link>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {state.activeIndex === 2 ? (
            <>
              <div className="produc-destacado-wrapper">
                <div className="produc-destacado-item-recomentado">
                  {state.rowProductoOferta}
                </div>
                <div className="produc-destacado-item produc-destacado-item-right link-href">
                  <Link to="/shop/oferta/filter/all">
                    Todos los productos &raquo;
                  </Link>
                </div>
              </div>
            </>
          ) : (
            ""
          )}
          {state.activeIndex === 3 ? (
            <>    <div className="produc-destacado-wrapper">
              <div className="produc-destacado-item-recomentado">
                {state.rowProductoRemate}
              </div>
              <div className="produc-destacado-item produc-destacado-item-right link-href">
                <Link to="/shop/remate/filter/all">
                  Todos los productos &raquo;
                </Link>
              </div></div>
            </>
          ) : (
            ""
          )}
        </div>
      ) : (
        ""
      )}
      <ServerException server={state.server}></ServerException>

    </>
  );
}

let actionType = {
  FIND_PRODUCTOS: "FIND_PRODUCTOS",
  ACTIVE_INDEX_TAB: "ACTIVE_INDEX_TAB",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.FIND_PRODUCTOS:
      return {
        ...state,
        rowProducto: action.rowProducto,
        rowProductoRecomendado: action.rowProductoRecomendado,
        rowProductoOferta: action.rowProductoOferta,
        rowProductoRemate: action.rowProductoRemate,
        displayLista: action.displayLista,
        server: action.server,
      };
    case actionType.ACTIVE_INDEX_TAB:
      return {
        ...state,
        activeIndex: action.activeIndex,
      };
    default:
      return state;
  }
};
