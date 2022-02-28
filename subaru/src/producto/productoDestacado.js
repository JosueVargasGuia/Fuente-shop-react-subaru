import { useEffect, useReducer } from "react";
import {  listaCategoria, segmentoAccesorios, segmentoLifeStyle, segmentoMantenimiento, segmentoRecambio } from "../service/EnumMenu";
import { findProductos } from "../service/producto.service";
import { displayLista,FilterProducto, homepage, HttpStatus,SUCCESS_SERVER } from "../service/ENUM";
import ProductosCard from "./productoCard";
import { Link } from "react-router-dom";
import ServerException from "../utils/serverException";
import { LoadingClassic } from "../utils/loading"
const LIMITE = 8;


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

  let rowSegmentoMantenimiento = segmentoMantenimiento.map((rowRep) => <div key={rowRep.key}>
    <Link to={rowRep.url+"/"+rowRep.identificador+"/filter/all"} key={rowRep.key} >
      <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowRep.srcimg} alt={rowRep.srcimg} loading='lazy'></img>
      <span className="produc-link-title">{rowRep.discripcion}</span>
    </Link>
  </div>);
  let rowsegmentoRecambio = segmentoRecambio.map((rowReca) => 
  <div key={rowReca.key}>
    <Link to={rowReca.url+"/"+rowReca.identificador+"/filter/all"} key={rowReca.key} >
      <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowReca.srcimg} alt={rowReca.srcimg} loading='lazy'></img>
      <span className="produc-link-title">{rowReca.discripcion}</span>
    </Link>
  </div>);

let rowSegmentoAccesorios = segmentoAccesorios.map((rowAcce) => 
<div key={rowAcce.key}>
  <Link to={rowAcce.url+"/"+rowAcce.identificador+"/filter/all"} key={rowAcce.key} >
    <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowAcce.srcimg} alt={rowAcce.srcimg} loading='lazy'></img>
    <span className="produc-link-title">{rowAcce.discripcion}</span>
  </Link>
</div>);


let rowSegmentoLifeStyle = segmentoLifeStyle.map((rowlefSty) => <div key={rowlefSty.key}>
<Link to={rowlefSty.url+"/"+rowlefSty.identificador+"/filter/all"} key={rowlefSty.key} >
  <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowlefSty.srcimg} alt={rowlefSty.srcimg} loading='lazy'></img>
  <span className="produc-link-title">{rowlefSty.discripcion}</span>
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
          console.log(e);
          let producto = {
            chrCodigoProducto: e.chrCodigoProducto,
            numValorVentaDolar: e.numValorVentaDolar,
            numValorVentaSoles: e.numValorVentaSoles,
            numValorVentaDolarIgv: e.numValorVentaDolarIgv,
            numValorVentaSolesIgv: e.numValorVentaSolesIgv,
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
          numValorVentaDolarIgv: e.numValorVentaDolarIgv,
          numValorVentaSolesIgv: e.numValorVentaSolesIgv,
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
                     Ver todos en Oferta &raquo;
                    </Link>
                  </div>
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
        {state.rowProducto !== undefined ? <>
        {state.rowProducto.length <= 0 ?<></>:<>
        <div className="produc-destacado-title">
          <h4>DESTACADOS</h4>
        </div>
        </>}
        </>:<></>}
        <div className="produc-destacado-wrapper">
          
        {state.rowProducto !== undefined ? <>
        {state.rowProducto.length <= 0 ?<></>:<>
          <div className="produc-destacado-item">
            {state.rowProducto === null ? (
              <LoadingClassic></LoadingClassic>
            ) : (
              state.rowProducto
            )}
          </div></>}
        </>:<></>}
          

          <div className="produc-destacado-item produc-destacado-item-right link-href">
            <Link to={"/shop/" + props.marcaSelect.decripcion + "/filter/all"}>
              Ver todos los productos &raquo;
            </Link>
          </div>
        </div>

        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">Partes de Mantenimiento</h3>
          <hr />
          <div className="produc-link">{rowSegmentoMantenimiento}</div>
        </div>
        
        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">Partes de Recambio</h3>
          <hr />
          <div className="produc-link">{rowsegmentoRecambio}</div>
        </div>

        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">Accesorios</h3>
          <hr />
          <div className="produc-link">{rowSegmentoAccesorios}</div>
        </div>
        
        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">LifeStyle</h3>
          <hr />
          <div className="produc-link">{rowSegmentoLifeStyle}</div>
        </div>
        <div className="div-text-type-nota div-text-type-nota-home">
          <span className="div-text-type-nota-resaltado">Nota:</span>
          &nbsp;Imagen referencial. El producto podrá variar según modelo, versión y año.
        </div>      
        <div className="produc-destacado-links">
          <h3 className="produc-destacado-links-title">
            Accesorios Subaru por modelo
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
