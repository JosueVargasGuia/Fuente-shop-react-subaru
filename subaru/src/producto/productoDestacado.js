import { useEffect, useReducer } from "react";
import { FilterProducto, HttpStatus, SUCCESS_SERVER } from "../service/ENUM";
import { findProductos } from "../service/producto.service";
import { displayLista } from "../service/ENUM";
import ProductosCard from "./productoCard";
import { Link } from "react-router-dom";
import ServerException from "../utils/serverException";
const LIMITE = 8;
const listaRepuesto = [
  { discripcion: "Filtros de Aire", srcimg: "/marcas/subaru/repuestos/1.png" },
  { discripcion: "Filtros de Aceite", srcimg: "/marcas/subaru/repuestos/2.png" },
  { discripcion: "Pastillas de Freno", srcimg: "/marcas/subaru/repuestos/3.png" },
  { discripcion: "Discos de Freno", srcimg: "/marcas/subaru/repuestos/4.png" },
  { discripcion: "Alternadores", srcimg: "/marcas/subaru/repuestos/5.png" },
  { discripcion: "Bujías", srcimg: "/marcas/subaru/repuestos/6.png" },
  { discripcion: "Arrancadores", srcimg: "/marcas/subaru/repuestos/7.png" },
  { discripcion: "Fajas, correas y templadores", srcimg: "/marcas/subaru/repuestos/8.png" },
  { discripcion: "Radiadores", srcimg: "/marcas/subaru/repuestos/9.png" },
  { discripcion: "Suspensión", srcimg: "/marcas/subaru/repuestos/10.png" },
  { discripcion: "Limpiaparabrisas", srcimg: "/marcas/subaru/repuestos/11.png" },
  { discripcion: "Todas las categorías", srcimg: "/marcas/subaru/repuestos/12.png" },
];
const listaAccesorios = [
  { discripcion: "Interior", srcimg: "/marcas/subaru/accesorios/1.png" },
  { discripcion: "Carga", srcimg: "/marcas/subaru/accesorios/2.png" },
  { discripcion: "Travesaños de la puerta", srcimg: "/marcas/subaru/accesorios/3.png" },
  { discripcion: "Alfombras de Piso", srcimg: "/marcas/subaru/accesorios/4.png" },
  { discripcion: "Electronics", srcimg: "/marcas/subaru/accesorios/5.png" },
  { discripcion: "Perillas de cambio", srcimg: "/marcas/subaru/accesorios/6.png" },
  { discripcion: "Sombrillas", srcimg: "/marcas/subaru/accesorios/7.png" },
  { discripcion: "Exterior", srcimg: "/marcas/subaru/accesorios/8.png" },
  { discripcion: "Cubiertas de carro", srcimg: "/marcas/subaru/accesorios/9.png" },
  { discripcion: "Bastidores de techo", srcimg: "/marcas/subaru/accesorios/10.png" },
  { discripcion: "Spoilers", srcimg: "/marcas/subaru/accesorios/11.png" },
  { discripcion: "Todos los Accesorios", srcimg: "/marcas/subaru/accesorios/12.png" },
];

export default function ProductoDestacado(props) {
  const [state, dispatch] = useReducer(reducer, {
    rowProducto: [],
    pagina: 1,
    activeIndex: 1,
    displayLista: displayLista.DETALLE,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  let rowRepuesto = listaRepuesto.map((rowRep) => <div>
    <Link>
    <img src={window.location.origin+rowRep.srcimg}></img>
      {rowRep.discripcion}
    </Link>
  </div>);
let rowAccesorios = listaAccesorios.map((rowAcce) => <div>
<Link>
<img src={window.location.origin+rowAcce.srcimg}></img>
  {rowAcce.discripcion}
</Link>
</div>);

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
    //let rowProductoRecomendado = [];
    //let rowProductoOferta = [];
    //let rowProductoRemate = [];
    let _FilterProducto = FilterProducto.FILTER_DESTACADO_MARCA;


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
          displayLista: displayLista.DETALLE,
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
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
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
        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">Piezas de Repuesto</h3>
          <hr />
          <div className="produc-link">
            {rowRepuesto}
          </div>
        </div>
        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">Accesorios Populares</h3>
          <hr />
          <div className="produc-link">
            {rowAccesorios}
          </div>
        </div>
      </div>

      <ServerException server={state.server}></ServerException>

    </>
  );
}

let actionType = {
  FIND_PRODUCTOS: "FIND_PRODUCTOS",

};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.FIND_PRODUCTOS:
      return {
        ...state,
        rowProducto: action.rowProducto,
        displayLista: action.displayLista,
        server: action.server,
      };

    default:
      return state;
  }
};
