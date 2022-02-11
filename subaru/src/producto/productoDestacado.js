import { useEffect, useReducer } from "react";
import { FilterProducto, homepage, HttpStatus, SUCCESS_SERVER } from "../service/ENUM";
import { findProductos } from "../service/producto.service";
import { displayLista } from "../service/ENUM";
import ProductosCard from "./productoCard";
import { Link } from "react-router-dom";
import ServerException from "../utils/serverException";
import { LoadingClassic } from "../utils/loading"
const LIMITE = 8;
const listaRepuesto = [
  { key: 1, discripcion: "Filtros de Aire", srcimg: "/marcas/subaru/repuestos/1.png", url: "/shop" },
  { key: 2, discripcion: "Filtros de Aceite", srcimg: "/marcas/subaru/repuestos/2.png", url: "/shop" },
  { key: 3, discripcion: "Pastillas de Freno", srcimg: "/marcas/subaru/repuestos/3.png", url: "/shop" },
  { key: 4, discripcion: "Discos de Freno", srcimg: "/marcas/subaru/repuestos/4.png", url: "/shop" },
  { key: 5, discripcion: "Alternadores", srcimg: "/marcas/subaru/repuestos/5.png", url: "/shop" },
  { key: 6, discripcion: "Bujías", srcimg: "/marcas/subaru/repuestos/6.png", url: "/shop" },
  { key: 7, discripcion: "Arrancadores", srcimg: "/marcas/subaru/repuestos/7.png", url: "/shop" },
  { key: 8, discripcion: "Fajas, correas y templadores", srcimg: "/marcas/subaru/repuestos/8.png", url: "/shop" },
  { key: 9, discripcion: "Radiadores", srcimg: "/marcas/subaru/repuestos/9.png", url: "/shop" },
  { key: 10, discripcion: "Suspensión", srcimg: "/marcas/subaru/repuestos/10.png",url: "/shop" },
  { key: 11, discripcion: "Limpiaparabrisas", srcimg: "/marcas/subaru/repuestos/11.png", url: "/shop" },
  { key: 12, discripcion: "Todas las categorías", srcimg: "/marcas/subaru/repuestos/12.png", url: "/shop" },
];
const listaAccesorios = [
  { key: 1, discripcion: "Interior", srcimg: "/marcas/subaru/accesorios/1.png", url: "/shop" },
  { key: 2, discripcion: "Carga", srcimg: "/marcas/subaru/accesorios/2.png", url: "/shop" },
  { key: 3, discripcion: "Travesaños de la puerta", srcimg: "/marcas/subaru/accesorios/3.png", url: "/shop" },
  { key: 4, discripcion: "Alfombras de Piso", srcimg: "/marcas/subaru/accesorios/4.png", url: "/shop" },
  { key: 5, discripcion: "Electronics", srcimg: "/marcas/subaru/accesorios/5.png", url: "/shop" },
  { key: 6, discripcion: "Perillas de cambio", srcimg: "/marcas/subaru/accesorios/6.png", url: "/shop" },
  { key: 7, discripcion: "Sombrillas", srcimg: "/marcas/subaru/accesorios/7.png", url: "/shop" },
  { key: 8, discripcion: "Exterior", srcimg: "/marcas/subaru/accesorios/8.png", url: "/shop" },
  { key: 9, discripcion: "Cubiertas de carro", srcimg: "/marcas/subaru/accesorios/9.png", url: "/shop" },
  { key: 10, discripcion: "Bastidores de techo", srcimg: "/marcas/subaru/accesorios/10.png", url: "/shop" },
  { key: 11, discripcion: "Spoilers", srcimg: "/marcas/subaru/accesorios/11.png", url: "/shop" },
  { key: 12, discripcion: "Todos los Accesorios", srcimg: "/marcas/subaru/accesorios/12.png", url: "/shop" },
];
const listaCategoria = [
  { key: 1, title: "Audio/Media", content: "Donde quiera que la te aventura conduzca, mantente conectado en tu Subaru.", srcimg: "/marcas/subaru/categoria/1.png" },
  { key: 2, title: "Comodidad y conveniencia", content: "Menos dificultad Más disfrute. Todo personalizado para ti y tu Subaru.", srcimg: "/marcas/subaru/categoria/2.png" },
  { key: 3, title: "Estilo de Vida", content: "Estilo Subaru sintonizado precisamente para usted y su Subaru.", srcimg: "/marcas/subaru/categoria/3.png" },
  { key: 4, title: "Protección y seguridad", content: "Ayuda a prevenir lo peor y a disminuir el impacto de lo inevitable en tu Subaru.", srcimg: "/marcas/subaru/categoria/4.png" },
  { key: 5, title: "Marca de STI", content: "Las modificaciones de Subaru que deseas para el poder que anhelas.", srcimg: "/marcas/subaru/categoria/5.png" },
  { key: 6, title: "Estilo", content: "Cuando lo que está afuera de tu Subaru es lo que cuenta.", srcimg: "/marcas/subaru/categoria/6.png" },

];
const whatsAppLink = "https://api.whatsapp.com/send?phone=51989174932&text=";
export default function ProductoDestacado(props) {
  const [state, dispatch] = useReducer(reducer, {
    rowProducto: [],
    rowProductoOferta:[],
    pagina: 1,
    activeIndex: 1,
    displayLista: displayLista.DETALLE,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  let rowRepuesto = listaRepuesto.map((rowRep) => <div key={rowRep.key}>
    <Link to={rowRep.url} key={rowRep.key} >
      <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowRep.srcimg} alt={rowRep.srcimg} loading='lazy'></img>
      {rowRep.discripcion}-to={rowRep.url} 
    </Link>
  </div>);
  let rowAccesorios = listaAccesorios.map((rowAcce) => <div key={rowAcce.key}>
    <Link to={rowAcce.url} key={rowAcce.key} >
      <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowAcce.srcimg} alt={rowAcce.srcimg} loading='lazy'></img>
      {rowAcce.discripcion}-to={rowAcce.url}
    </Link>
  </div>);

  let rowCategoria = listaCategoria.map((rowCate) =>
    <div key={rowCate.key}  className="produc-link-card" style={{ 'backgroundImage': 'url(' + window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowCate.srcimg + ')' }} >
      <div className="produc-link-accesorio-left">
        <div className="title">{rowCate.title}</div>
        <div className="content">{rowCate.content}</div>
      </div>
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
    let rowProductoOferta = [];
    //let rowProductoRemate = [];
    let _FilterProducto = FilterProducto.FILTER_DESTACADO_MARCA;

    rowProductoOferta = await handleServicioBuscarProductoFilter(
      _pagina,
      _limit,
      FilterProducto.FILTER_OFERTA
    );
    const rpt = await findProductos({
      chrCodigoFamilia: chrCodigoFamilia,
      vchDescripcion: vchDescripcion,
      pagina: _pagina,
      limit: _limit,
      filterProducto: _FilterProducto,
    });
    console.log(rowProductoOferta);
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
          rowProductoOferta:rowProductoOferta,
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
    <div key={props.marcaSelect.chrCodigoFamilia}>
      <div className="produc-destacado">
        {state.rowProductoOferta !== undefined ? (
          <>
            {state.rowProductoOferta.length <= 0 ? (
              <></>
            ) : (
              <>
                <div className="produc-destacado-title">
                  <h4>OFERTAS</h4>
                </div>
                <div className="produc-destacado-wrapper">
                  <div className="produc-destacado-item">
                    {state.rowProductoOferta}
                  </div>
                  <div className="produc-destacado-item produc-destacado-item-right link-href">
                    <Link to={"/shop/oferta/filter/all"}>
                      Todos en Oferta &raquo;
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}

        <div className="produc-destacado-title">
          <h4>DESTACADOS</h4>
        </div>
        <div className="produc-destacado-wrapper">
          <div className="produc-destacado-item">
            {state.rowProducto === null ? (
              <LoadingClassic></LoadingClassic>
            ) : (
              state.rowProducto
            )}
          </div>
          <div className="produc-destacado-item produc-destacado-item-right link-href">
            <Link to={"/shop/" + props.marcaSelect.decripcion + "/filter/all"}>
              Todos los productos &raquo;
            </Link>
          </div>
        </div>

        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">Piezas de Repuesto</h3>
          <hr />
          <div className="produc-link">{rowRepuesto}</div>
        </div>
        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">Accesorios Populares</h3>
          <hr />
          <div className="produc-link">{rowAccesorios}</div>
        </div>
        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">
            Accesorios subaru por categoría
          </h3>
          <hr />
          <div className="produc-link-accesorio">{rowCategoria}</div>
        </div>
      </div>

      <ServerException server={state.server}></ServerException>
      <div className="wspclass">
        <a href={whatsAppLink} target="noreferrer">
          <div>
            <i className="fa fa-whatsapp" aria-hidden="true"></i>
            <p>Consulta</p>
          </div>
        </a>
      </div>
    </div>
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
        rowProductoOferta:action.rowProductoOferta,
        displayLista: action.displayLista,
        server: action.server,
      };

    default:
      return state;
  }
};
