import { useEffect, useReducer } from "react";
import {  listaCategoria, listaMenu,  _CodigoGrupo, _IndentificadorMenu } from "../service/EnumMenu";
import { findProductos } from "../service/producto.service";
import { chrRol, displayLista,FilterProducto, homepage, HttpStatus,localStoreEnum,SUCCESS_SERVER } from "../service/ENUM";
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

  let rowSegmentoMantenimiento = [];/*segmentoMantenimiento.map((rowRep) => <div key={rowRep.identificador}>
    <Link to={"shop/"+rowRep.identificador+"/filter/all"} key={rowRep.identificador} >
      <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowRep.srcimg} alt={rowRep.srcimg} loading='lazy'></img>
      <span className="produc-link-title">{rowRep.discripcion}</span>
    </Link>
  </div>);*/
  let rowsegmentoRecambio = [];/*segmentoRecambio.map((rowReca) => 
  <div key={rowReca.identificador}>
    <Link to={"shop/"+rowReca.identificador+"/filter/all"} key={rowReca.identificador} >
      <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowReca.srcimg} alt={rowReca.srcimg} loading='lazy'></img>
      <span className="produc-link-title">{rowReca.discripcion}</span>
    </Link>
  </div>);*/

let rowSegmentoAccesorios = [];/*segmentoAccesorios.map((rowAcce) => 
<div key={rowAcce.identificador}>
  <Link to={"shop/"+rowAcce.identificador+"/filter/all"} key={rowAcce.identificador} >
    <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowAcce.srcimg} alt={rowAcce.srcimg} loading='lazy'></img>
    <span className="produc-link-title">{rowAcce.discripcion}</span>
  </Link>
</div>);*/


let rowSegmentoLifeStyle =[];/* segmentoLifeStyle.map((rowlefSty) => <div key={rowlefSty.identificador}>
<Link to={"shop/"+rowlefSty.identificador+"/filter/all"} key={rowlefSty.identificador} >
  <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + rowlefSty.srcimg} alt={rowlefSty.srcimg} loading='lazy'></img>
  <span className="produc-link-title">{rowlefSty.discripcion}</span>
</Link>
</div>);*/

for (let index = 0; index < listaMenu.length; index++) {
  const menu = listaMenu[index];
  if(menu.codigoGrupo===_CodigoGrupo.Mantenimiento){
    rowSegmentoMantenimiento.push(
     <div key={menu.identificador}>
        <Link to={"shop/"+menu.identificador+"/filter/all"} key={menu.identificador} >
          <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + menu.srcimg} alt={menu.srcimg} loading='lazy'></img>
          <span className="produc-link-title">{menu.descripcion}</span>
        </Link>
      </div>);
  }
  if(menu.codigoGrupo===_CodigoGrupo.Recambio){
    rowsegmentoRecambio.push(
      <div key={menu.identificador}>
         <Link to={"shop/"+menu.identificador+"/filter/all"} key={menu.identificador} >
           <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + menu.srcimg} alt={menu.srcimg} loading='lazy'></img>
           <span className="produc-link-title">{menu.descripcion}</span>
         </Link>
       </div>);
  }
  if(menu.codigoGrupo===_CodigoGrupo.Accesorios){
    rowSegmentoAccesorios.push(
      <div key={menu.identificador}>
         <Link to={"shop/"+menu.identificador+"/filter/all"} key={menu.identificador} >
           <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + menu.srcimg} alt={menu.srcimg} loading='lazy'></img>
           <span className="produc-link-title">{menu.descripcion}</span>
         </Link>
       </div>);
  }
  if(menu.codigoGrupo===_CodigoGrupo.LifeStyle){
    rowSegmentoLifeStyle.push(
      <div key={menu.identificador}>
         <Link to={"shop/"+menu.identificador+"/filter/all"} key={menu.identificador} >
           <img src={window.location.origin + (homepage === undefined ? "" : "/" + homepage) + menu.srcimg} alt={menu.srcimg} loading='lazy'></img>
           <span className="produc-link-title">{menu.descripcion}</span>
         </Link>
       </div>);
  }
}
  


  
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


  async function handleValidarCliente() {
    if (
      JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)) !== undefined &&
      JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)) !== null
    ) {
      return JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)).chrRol ===
        chrRol.ROLE_ADMIN
        ? "SI"
        : "NO";
    } else {
      return "NO";
    }
  }



  //eslint-disable-next-line
  async function handleServicioBuscarProductos(
    _pagina,
    _limit,
    chrCodigoFamilia,
    vchDescripcion
  ) {
    let _isAdmin=await handleValidarCliente();
    let rowProducto = [];
    //let rowProductoRecomendado = [];
    let rowProductoOferta = [];
    //let rowProductoRemate = [];
    let _FilterProducto = FilterProducto.FILTER_DESTACADO_MARCA;

    rowProductoOferta = await handleServicioBuscarProductoFilter(
      _pagina,
      _limit,
      FilterProducto.FILTER_OFERTA,
      _isAdmin
    );
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
            numValorVentaDolarIgv: e.numValorVentaDolarIgv,
            numValorVentaSolesIgv: e.numValorVentaSolesIgv,
            numCodigoMoneda: e.numCodigoMoneda,
            vchDescripcion: e.vchDescripcion,
            vchDescripcionSmall: e.vchDescripcionSmall,
            numStock: e.numStock,
            totalRegistros: e.totalRegistros,
            displayChrcodigoproducto:e.displayChrcodigoproducto,
            typePresentacion:e.typePresentacion,
            numValorBaseDolar:e.numValorBaseDolar,
            numValorBaseSoles:e.numValorBaseSoles,
            numValorDescBase:e.numValorDescBase,
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
              isAdmin={_isAdmin}
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
    _FilterProducto,
    _isAdmin
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
          displayChrcodigoproducto:e.displayChrcodigoproducto,
          typePresentacion:e.typePresentacion,
          numValorBaseDolar:e.numValorBaseDolar,
          numValorBaseSoles:e.numValorBaseSoles,
          numValorDescBase:e.numValorDescBase,
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
            isAdmin={_isAdmin}
          ></ProductosCard>
        );
      }
    }
    return row;
  }


  return (
    <div key={props.marcaSelect.chrCodigoFamilia}>
      <div className="produc-destacado">
       
      
        
     
      
        {state.rowProducto !== undefined ? <>
        {state.rowProducto.length <= 0 ?<></>:<>
          <div className={("produc-destacado-title produc-destacado-header "+(state.rowProducto !== undefined?(state.rowProducto.length <= 0?"background1":"background2"):"background1"))}>
          <div className="produc-destacado-title-text">
            {(state.rowProducto !== undefined?(state.rowProducto.length <= 0?"":"DESTACADOS"):"")}
          </div>          
          <div className="produc-destacado-item-link link-href ">
            <Link to={"/shop/"+_IndentificadorMenu.TodoDestacado+"/filter/all"}>
              Todos los Destacados &raquo;
            </Link>
          </div>
        </div>
          <div className={ "produc-destacado-wrapper"  }>   
          <div className="produc-destacado-item">
            {state.rowProducto === null ? (
              <LoadingClassic></LoadingClassic>
            ) : (
              state.rowProducto
            )}
          </div> 
        </div></>}
        </>:<></>}         
      


        

        {state.rowProductoOferta !== undefined ? (
          <>
            {state.rowProductoOferta.length <= 0 ? (
              <></>
            ) : (
              <>
              <div className={("produc-destacado-title produc-destacado-header "+(state.rowProductoOferta !== undefined?(state.rowProductoOferta.length <= 0?"background1":"background2"):"background1"))}>
                <div className="produc-destacado-title-text">
                  {(state.rowProductoOferta !== undefined?(state.rowProductoOferta.length <= 0?"":"OFERTAS"):"")}
                </div>  
                {(state.rowProductoOferta !== undefined?(state.rowProductoOferta.length <= 0?<></>: 
                <div className="produc-destacado-item-link link-href ">
                    <Link to={"/shop/"+_IndentificadorMenu.TodoOferta+"/filter/all"}>
                          Todas las Ofertas &raquo;
                    </Link>
                </div>):<></>)} 
              </div>
                <div className="produc-destacado-wrapper">
                  <div className="produc-destacado-item">
                    {state.rowProductoOferta}
                  </div>                 
                </div>
              </>
            )}
          </>
        ) : (
          <></>
        )}
        <div className="produc-destacado-links">
         <div className="produc-destacado-links-header">  
            <div className="produc-destacado-links-title"> </div>
            <div className="produc-destacado-item-link link-href ">
              <Link to={"/shop/"+_IndentificadorMenu.TodoProducto+"/filter/all"}>
                      Todos los productos  &raquo;
                      </Link>
              </div>
          </div> 
        </div>
        <div className="produc-destacado-links">
          
         <div className="produc-destacado-links-header">  
            <div className="produc-destacado-links-title">Partes de Mantenimiento (Preventivo - Correctivo)</div>            
          </div>
          <hr />
          <div className="produc-link">{rowSegmentoMantenimiento}</div>
        </div>
        
        <div className="produc-destacado-links">
          <div className="produc-destacado-links-header">  
            <div className="produc-destacado-links-title">Partes de Recambio</div>            
          </div>
         
          <hr />
          <div className="produc-link">{rowsegmentoRecambio}</div>
        </div>

        <div className="produc-destacado-links">
          <div className="produc-destacado-links-header">  
            <div className="produc-destacado-links-title">Accesorios</div>            
          </div>
       
          <hr />
          <div className="produc-link">{rowSegmentoAccesorios}</div>
        </div>
        
        <div className="produc-destacado-links">
          <div className="produc-destacado-links-header">  
            <div className="produc-destacado-links-title">LifeStyle</div>            
          </div>
         
          <hr />
          <div className="produc-link">{rowSegmentoLifeStyle}</div>
        </div>
        <div className="div-text-type-nota div-text-type-nota-home">
          <span className="div-text-type-nota-resaltado">Nota:</span>
          &nbsp;Imagen referencial. El producto podrá variar según modelo, versión y año.
        </div>      
        <div className="produc-destacado-links">
          <div className="produc-destacado-links-title">
            Accesorios Subaru por modelo
          </div>
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
