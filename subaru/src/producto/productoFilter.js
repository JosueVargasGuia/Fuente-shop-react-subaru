import { useEffect, useReducer } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import {
  FilterProducto,
  FilterSubFamilia,
  HttpStatus,
  lstMarcas,
  SUCCESS_SERVER,
  filterOrder,
  chrRol,
  localStoreEnum,
  //FilterTypeLista,
} from "../service/ENUM";
import {
  listaMenu,_CodigoGrupo, _IndentificadorMenu
} from "../service/EnumMenu";
import { findProductos } from "../service/producto.service";
import Loading from "../utils/loading";

import ProductosCard from "./productoCard";
const LIMITE = 9;
 



const MENU_Repuestos={
  descripcion: "Repuestos",  
  srcimg:"",  
  identificador:  _IndentificadorMenu.MenuPadreRepuestos,
  subFamilia: [],
  query:[],
  codigoGrupo: _CodigoGrupo.Personalizado,
  display: 1,
  select:0,
  
 
};
const MENU_Accesorios_LifeStyle={
  descripcion: "Accesorios y LifeStyle",  
    srcimg:"",  
    identificador:  _IndentificadorMenu.MenuPadreAccesoriosLifeStyle,
    subFamilia: [],
    query:[],
    codigoGrupo: _CodigoGrupo.Personalizado,
    display: 1,
    select:0,
   
     
  };
 
export default function ProductoFilter(props) {
  let params = useParams();
  let _marca = lstMarcas[0];

  // eslint-disable-next-line default-case

  const [state, dispatch] = useReducer(reducer, {
    lstSubFamilia: [],
    lstSubFamiliaHtml: [],
    lstProducto: [],
    totalRegistros: 0,
    currentPage: 1,
    filterOrder: filterOrder.FilterAscDescripcion,
    isLoandingProductos: false,
    menu: "", 
    filter: "",
    listaQuery:[],
    listaQuerySubFamilia:[],
    lstMenuVertical: [],
    lstMenuVerticalData: [],
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
  
 
  useEffect(() => {
    if (_marca.codigoMarca >= 0) {
      props.handleSelectMarcaChange(_marca.codigoMarca, "ProductoFilter");
    }
    //handleEventCargarSubFamilia(_marca.chrcodigofamilia);

    console.log("handleInitVariable 1 props.moneda, params.query, params.descripcion");

    handleInitVariable(params.descripcion ).then((_object) => {
     
      handleEventAddSubFamiliaSelect(
        1,
        filterOrder.FilterAscDescripcion,
        _object.menu, 
        _object.listaQuery,
        _object.listaQuerySubFamilia,
        _object.lstMenuVertical,
        _object.lstMenuVerticalData
      );
       
    });

    //eslint-disable-next-line
  }, [props.moneda, params.query, params.descripcion]);
  async function handleValidarCliente(_numCodigoCliente) {
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
  async function handleInitVariable(_identificador,target) {
    let _MENU= {
      descripcion: "Todos los Productos",  
      srcimg:"",  
      identificador:  _IndentificadorMenu.Default,
      subFamilia: [],
      query:[],
      codigoGrupo: _CodigoGrupo.Personalizado,
      display: 0,
      select:0,
      
    };   
    let _lstMenuVertical = [];
    let _lstMenuVerticalState=[];
    let _listaQuery=[];
    let _listaQuerySubFamilia=[];
    for (let index = 0; index < listaMenu.length; index++) {
      const objMenu = listaMenu[index];
      if(objMenu.identificador===_identificador){ 
        _MENU=objMenu;
      }
    }   
      if(_MENU.identificador===_IndentificadorMenu.TodoProducto || _MENU.identificador===_IndentificadorMenu.Default){  
        MENU_Repuestos.select=0; 
        MENU_Accesorios_LifeStyle.select=0;           
        _lstMenuVerticalState.push(MENU_Repuestos);
        for (let index = 0; index < listaMenu.length; index++) {
          const _objMenu = listaMenu[index];
          if(_objMenu.codigoGrupo===_CodigoGrupo.Repuesto){
           
            _objMenu.display=0;
            _lstMenuVerticalState.push(_objMenu);
          }
        }         
        _lstMenuVerticalState.push(MENU_Accesorios_LifeStyle);
        for (let index = 0; index < listaMenu.length; index++) {
          const _objMenu_ = listaMenu[index];
          if(_objMenu_.codigoGrupo===_CodigoGrupo.Accesorio_LyfeStyle){   
            
            _objMenu_.display=0;               
            _lstMenuVerticalState.push(_objMenu_);
          }
        }
     
      }else{   
        if (
          _MENU.codigoGrupo === _CodigoGrupo.Personalizado &&
          (_MENU.identificador === _IndentificadorMenu.TodoRepuesto ||
            _MENU.identificador === _IndentificadorMenu.TodoAccesorioLyfeStyle)
        ) {
          
          if(_MENU.identificador === _IndentificadorMenu.TodoRepuesto){             
            _lstMenuVerticalState.push(MENU_Repuestos);    
            MENU_Repuestos.select===0? MENU_Repuestos.select=1: MENU_Repuestos.select=0;                   
            for (let index = 0; index < listaMenu.length; index++) {
              let _objMenu1 = listaMenu[index];
              if (_objMenu1.codigoGrupo ===_CodigoGrupo.Repuesto) {            
                _objMenu1.display =1;                 
                _lstMenuVerticalState.push(_objMenu1);
              }
            }
          }
          if(_MENU.identificador === _IndentificadorMenu.TodoAccesorioLyfeStyle){            
            _lstMenuVerticalState.push(MENU_Accesorios_LifeStyle);  
            MENU_Accesorios_LifeStyle.select===0? MENU_Accesorios_LifeStyle.select=1: MENU_Accesorios_LifeStyle.select=0;          
            for (let index = 0; index < listaMenu.length; index++) {
              let _objMenu1 = listaMenu[index];
              if (_objMenu1.codigoGrupo === _CodigoGrupo.Accesorio_LyfeStyle) {                 
                _objMenu1.display = 1;                
                _lstMenuVerticalState.push(_objMenu1);
              }
            }
          }
           
        } else {
          for (let index = 0; index < listaMenu.length; index++) {
            let _objMenu1 = listaMenu[index];
            if (_objMenu1.identificador === _MENU.identificador) {             
              _objMenu1.display = 1;
              _lstMenuVerticalState.push(_objMenu1);
            }
          }
        }
      }
      /* */
      _lstMenuVertical=handleBuiltMenu(_lstMenuVerticalState);
      MENU_Accesorios_LifeStyle.isFiltroHistorial=0;
      MENU_Repuestos.isFiltroHistorial=0;
    return { menu: _MENU, lstMenuVertical: _lstMenuVertical,lstMenuVerticalData:_lstMenuVerticalState,listaQuery:_listaQuery,listaQuerySubFamilia:_listaQuerySubFamilia };
  }
 function handleBuiltMenu(_listaMenu){
   let _listaMenuVertical=[];
 
   for (let index = 0; index < _listaMenu.length; index++) {
    const element = _listaMenu[index];
    _listaMenuVertical.push(
      <li
        className={
         element.identificador === _IndentificadorMenu.MenuPadreRepuestos || 
         element.identificador === _IndentificadorMenu.MenuPadreAccesoriosLifeStyle 
            ? "prod-filter-menu-titulo"
            : element.display === 1
            ? "menu-active"
            : "menu-inactive" 
        }
        key={element.identificador}
        onClick={(e) => {
           handleEventChangeMenu(element,_listaMenu);
        }}
      >
        
         {element.descripcion} 
       
      </li>
    );
  }
   return _listaMenuVertical;
 }
  async function handleEventAddSubFamiliaSelect(
    _currentPage,
    _filterOrder,
    _MENU,  
    _listaQuery,
    _listaQuerySubFamilia,
    _lstMenuVertical,
    _lstMenuVerticalData
  ) {  
    
    dispatch({
      type: actionType.LOAD_CHANGE_MENU_LOAD, 
      lstMenuVertical: _lstMenuVertical,
      menu:_MENU
    });
    let _isAdmin=await handleValidarCliente();
    let _totalRegistros = 0;
    let lstSubFamiliaFilter = [];
    /*Listado de Producto */
    let _filterProducto = FilterProducto.FILTER_ALL_FIND;
    let _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_LIST;
    let _vchDescripcion = null;
    if(_MENU.codigoGrupo=== _CodigoGrupo.Personalizado){
    if(_MENU.identificador===_IndentificadorMenu.TodoProducto){
      _filterProducto = FilterProducto.FILTER_ALL;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
    }
    
    if(_MENU.identificador===_IndentificadorMenu.TodoOferta){
      _filterProducto = FilterProducto.FILTER_OFERTA;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
    }

    if(_MENU.identificador===_IndentificadorMenu.TodoDestacado){
      _filterProducto = FilterProducto.FILTER_DESTACADO_MARCA;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
    }

    if(_MENU.identificador===_IndentificadorMenu.Default){
      _filterProducto = FilterProducto.FILTER_ALL;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
    }
    if(_MENU.identificador===_IndentificadorMenu.Busqueda){
      _filterProducto = FilterProducto.FILTER_SEARCH;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL; 
      _vchDescripcion = props.query;   
    }

    if(_MENU.identificador===_IndentificadorMenu.TodoRepuesto){
      _filterProducto = FilterProducto.FILTER_ALL;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_LIST;
      for (let index = 0; index < listaMenu.length; index++) {
        const element = listaMenu[index];
          if(element.codigoGrupo===_CodigoGrupo.Repuesto){            
            for (let x = 0; x < element.subFamilia.length; x++) {
              const elementFamilia = element.subFamilia[x];  
        
              lstSubFamiliaFilter.push({ chrCodigoSubFamilia: elementFamilia});
            }
          }
      }
    }
    if(_MENU.identificador===_IndentificadorMenu.TodoAccesorioLyfeStyle){
      _filterProducto = FilterProducto.FILTER_ALL;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_LIST;
      for (let index = 0; index < listaMenu.length; index++) {
        const element = listaMenu[index];
          if(element.codigoGrupo===_CodigoGrupo.Accesorio_LyfeStyle){
            for (let x = 0; x < element.subFamilia.length; x++) {
              const elementFamilia = element.subFamilia[x];  
              lstSubFamiliaFilter.push({ chrCodigoSubFamilia: elementFamilia});
            }
          }
      }
    }
   
  }else{
    for (let index = 0; index < _MENU.subFamilia.length; index++) {
      const element = _MENU.subFamilia[index];  
      lstSubFamiliaFilter.push({ chrCodigoSubFamilia: element});
    }
    if (
      _MENU.codigoGrupo === _CodigoGrupo.Mantenimiento ||
      _MENU.codigoGrupo === _CodigoGrupo.Recambio ||
      _MENU.codigoGrupo === _CodigoGrupo.Accesorios ||
      _MENU.codigoGrupo === _CodigoGrupo.LifeStyle
    ) {
      for (let index = 0; index < _MENU.query.length; index++) {
        const element = _MENU.query[index];  
        _listaQuery.push(element);
      }
    }
  }
    let lstProducto = [];
    const rpt = await findProductos({
      chrCodigoFamilia: _marca.chrcodigofamilia,
      vchDescripcion: _vchDescripcion, 
      filterProducto: _filterProducto,
      listaSubFamilia: lstSubFamiliaFilter,
      filterSubFamilia: _filterSubFamilia,
      filterOrder: _filterOrder,
      pagina: _currentPage,
      limit: LIMITE,     
      listaQuery:_listaQuery,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaProductos.length; index++) {
          let e = json.listaProductos[index];
          _totalRegistros = e.totalRegistros;
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
            /*Url de la imagen a mostrar en la lista de productos */
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
          lstProducto.push(
            <ProductosCard
              moneda={props.moneda}
              producto={producto}
              key={producto.chrCodigoProducto}
              isAdmin={_isAdmin}
            ></ProductosCard>
          );
        }

      }
    } 
      dispatch({
        type: actionType.LOAD_PRODUCTO,
        lstProducto: lstProducto,
        totalRegistros: _totalRegistros,
        isLoandingProductos: false,
        currentPage: _currentPage,
        lstMenuVertical:_lstMenuVertical,
        lstMenuVerticalData:_lstMenuVerticalData,
        menu:_MENU
      });
 
  }
  function handleEventToPage(_currentPage) {
    handleEventAddSubFamiliaSelect(
      _currentPage,
      state.filterOrder,
      state.menu, 
      state.listaQuery,
      state.lstSubFamilia,
      state.lstMenuVertical,
      state.lstMenuVerticalData,
    );
  }
  function handleEventChangeFilterOrder(e) {
    dispatch({
      type: actionType.CHANGE_FILTER_ORDERBY,
      filterOrder: e.target.value,
    });
    handleEventAddSubFamiliaSelect(
      1,
      e.target.value,
      state.menu, 
      state.listaQuery,
      state.lstSubFamilia,
      state.lstMenuVertical,
      state.lstMenuVerticalData,
    );
/*           1,
            state.filterOrder,
            _object,        
            state.listaQuery,
            state.lstSubFamilia,
            _lstMenuVertical,
            _lstMenuVerticalData */


  }
async  function handleEventChangeMenu(_object,_listaMenu) {
  
 
  let _lstMenuVertical=[]; 
  let _lstMenuVerticalData=[]; 

    if (_object.identificador === _IndentificadorMenu.MenuPadreRepuestos ||
        _object.identificador === _IndentificadorMenu.MenuPadreAccesoriosLifeStyle ) {       
          MENU_Repuestos.select===0? MENU_Repuestos.select=1: MENU_Repuestos.select=0; 
          MENU_Accesorios_LifeStyle.select===0? MENU_Accesorios_LifeStyle.select=1: MENU_Accesorios_LifeStyle.select=0; 
                      
          if(_object.identificador === _IndentificadorMenu.MenuPadreRepuestos){
            _lstMenuVerticalData.push(MENU_Repuestos);  
           for (let index = 0; index < listaMenu.length; index++) {
            let element = listaMenu[index];
              if(element.codigoGrupo===_CodigoGrupo.Repuesto){
                element.display=MENU_Repuestos.select;
                _lstMenuVerticalData.push(element);
              }
            }       
          }else{
            if(params.descripcion ===_IndentificadorMenu.TodoProducto){
              _lstMenuVerticalData.push(MENU_Repuestos); 
            }
          }     
         
          if(_object.identificador === _IndentificadorMenu.MenuPadreAccesoriosLifeStyle){
            _lstMenuVerticalData.push(MENU_Accesorios_LifeStyle); 
            for (let index = 0; index < listaMenu.length; index++) {             
              let element = listaMenu[index];
              if(element.codigoGrupo===_CodigoGrupo.Accesorio_LyfeStyle){
                element.display= MENU_Accesorios_LifeStyle.select;
                _lstMenuVerticalData.push(element);
              }
            }            
          }else{
            if(params.descripcion ===_IndentificadorMenu.TodoProducto){
              _lstMenuVerticalData.push(MENU_Accesorios_LifeStyle); 
            }
          }  
           _lstMenuVertical=handleBuiltMenu(_lstMenuVerticalData)      
        dispatch({
          type: actionType.LOAD_CHANGE_MENU, 
          lstMenuVertical: _lstMenuVertical,
        });    
  
    }else{ 
      let flgChangeDisplay = false;
      for (let index = 0; index < _listaMenu.length; index++) {
        let element = _listaMenu[index];
        if (
          element.identificador === _IndentificadorMenu.MenuPadreRepuestos ||
          element.identificador ===
            _IndentificadorMenu.MenuPadreAccesoriosLifeStyle
        ) {
          flgChangeDisplay = true;
        }
      }

      if (flgChangeDisplay === true) {
        MENU_Repuestos.select === 0
          ? (MENU_Repuestos.select = 1)
          : (MENU_Repuestos.select = 0);
        MENU_Accesorios_LifeStyle.select === 0
          ? (MENU_Accesorios_LifeStyle.select = 1)
          : (MENU_Accesorios_LifeStyle.select = 0);
      }
      for (let index = 0; index < _listaMenu.length; index++) {
        let element = _listaMenu[index];
        if (flgChangeDisplay === true) {
          if (
            element.identificador === _IndentificadorMenu.MenuPadreRepuestos ||
            element.identificador ===
              _IndentificadorMenu.MenuPadreAccesoriosLifeStyle
          ) {
            element.display = 1;
          } else {
            element.display = 0;
          }
        } else {
          element.display = 1;
        }
        _lstMenuVerticalData.push(element);
      }
      _lstMenuVertical=handleBuiltMenu(_lstMenuVerticalData);       
      handleEventAddSubFamiliaSelect(
            1,
            state.filterOrder,
            _object,        
            state.listaQuery,
            state.lstSubFamilia,
            _lstMenuVertical,
            _lstMenuVerticalData
          ); 
    }  
 
  }
  return (
    <div className="prod-filter-form ">
      {state.isLoandingProductos ? <Loading></Loading> : ""}
      <div className="prod-filter-header">
        <div className="link-href-historial">
          <Link to="/shop">
            <i className="fa fa-home"></i>Home
          </Link>
          {state.menu.codigoGrupo === _CodigoGrupo.Repuesto ? (
            <>
              &raquo;
              <Link
                to={"/shop/" + _IndentificadorMenu.TodoRepuesto + "/filter/all"}
                target={"_parent"}
              >
                &nbsp;Repuestos&nbsp;
              </Link>
            </>
          ) : (
            ""
          )}

          {state.menu.codigoGrupo === _CodigoGrupo.Accesorio_LyfeStyle ? (
            <>
              &raquo;
              <Link
                to={
                  "/shop/" +
                  _IndentificadorMenu.TodoAccesorioLyfeStyle +
                  "/filter/all"
                }
                target={"_parent"}
              >
                &nbsp;Accesorios y LifeStyle
              </Link>
            </>
          ) : (
            ""
          )}

          {state.menu.identificador === _IndentificadorMenu.TodoRepuesto ||
          state.menu.identificador ===
            _IndentificadorMenu.TodoAccesorioLyfeStyle ? (
            ""
          ) : (
            <span className="link-href-span">
              &raquo;&nbsp;{state.menu.descripcion}
            </span>
          )}
        </div>
        <div className="prod-filter-page ">
          <span>Ordenar por: &nbsp;&nbsp;</span>
          <select
            className="form-control"
            name="filterOrder"
            value={state.filterOrder}
            onChange={handleEventChangeFilterOrder}
          >
            <option value={filterOrder.FilterAscDescripcion}>
              Nombre, A a Z
            </option>
            <option value={filterOrder.FilterDescDescripcion}>
              Nombre, Z a A
            </option>
            <option value={filterOrder.FilterAscPrecio}>
              Precio: de más bajo a más alto
            </option>
            <option value={filterOrder.FilterDescPrecio}>
              Precio: de más alto a más bajo
            </option>
            <option value={filterOrder.FilterConImagen}>
              Producto con imagenes
            </option>
          </select>
        </div>
      </div>
      <div className="prod-filter-content">
        <div className="prod-filter-column1">
          <ul className="prod-filter-menu">{state.lstMenuVertical}</ul>
        </div>

        <div className="prod-filter-column2 ">
          <div className="produc-destacado">
            <div className={"produc-destacado-wrapper"}>
              <div className="produc-destacado-item">
              {state.lstProducto}
              </div>
            </div>
          </div>
         

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
      </div>
    </div>
  );
}
let actionType = {
  ERROR: "ERROR",
  LOAD_SUBFAMILIA: "LOAD_SUBFAMILIA",
  SUBFAMILIA_CHANGE_SELECT: "SUBFAMILIA_CHANGE_SELECT",
  LOAD_PRODUCTO: "LOAD_PRODUCTO",
  CHANGE_FILTER_ORDERBY: "CHANGE_FILTER_ORDERBY",
  LOAD_MENU: "LOAD_MENU",
  LOAD_CHANGE_MENU:"LOAD_CHANGE_MENU",
  LOAD_CHANGE_MENU_LOAD:"LOAD_CHANGE_MENU_LOAD"
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.LOAD_SUBFAMILIA:
      return {
        ...state,
        lstSubFamilia: action.lstSubFamilia,
        server: action.server,
      };
    case actionType.SUBFAMILIA_CHANGE_SELECT:
      return {
        ...state,
        lstSubFamilia: action.lstSubFamilia,
        isLoandingProductos: action.isLoandingProductos,
      };
    case actionType.LOAD_PRODUCTO:
      return {
        ...state,
        lstProducto: action.lstProducto,
        totalRegistros: action.totalRegistros,
        isLoandingProductos: action.isLoandingProductos,
        currentPage: action.currentPage,
        lstMenuVertical: action.lstMenuVertical,
        lstMenuVerticalData: action.lstMenuVerticalData,
        menu: action.menu,
      };

    case actionType.CHANGE_FILTER_ORDERBY:
      return {
        ...state,
        filterOrder: action.filterOrder,
      };
    case actionType.LOAD_MENU:
      return {
        ...state,
        menu: action.menu,
        filter: action.filter,
        lstMenuVertical: action.lstMenuVertical,
        listaQuery: action.listaQuery,
        listaQuerySubFamilia: action.listaQuerySubFamilia,
      };
    case actionType.LOAD_CHANGE_MENU:
      return {
        ...state,
        lstMenuVertical: action.lstMenuVertical,
      };
    case actionType.LOAD_CHANGE_MENU_LOAD:
      return {
        ...state,
        lstMenuVertical: action.lstMenuVertical,
        menu: action.menu,
      };
    default:
      return state;
  }
};

const LEFT_PAGE = "LEFT";
const RIGHT_PAGE = "RIGHT";
function Paginacion(props) {
  //totalRecords,pageLimit,pageNeighbours,currentPage
  function range(from, to, step = 1) {
    let i = from;
    const range = [];

    while (i <= to) {
      range.push(i);
      i += step;
    }
    return range;
  }
  function fetchPageNumbers(_totalPages, _currentPage, _pageNeighbours) {
    const totalPages = _totalPages;
    const currentPage = _currentPage;
    const pageNeighbours = _pageNeighbours;

    const totalNumbers = _pageNeighbours * 2 + 3;
    const totalBlocks = totalNumbers + 2;

    if (totalPages > totalBlocks) {
      let pages = [];

      const leftBound = currentPage - pageNeighbours;
      const rightBound = currentPage + pageNeighbours;
      const beforeLastPage = totalPages - 1;

      const startPage = leftBound > 2 ? leftBound : 2;
      const endPage = rightBound < beforeLastPage ? rightBound : beforeLastPage;

      pages = range(startPage, endPage);

      const pagesCount = pages.length;
      const singleSpillOffset = totalNumbers - pagesCount - 1;

      const leftSpill = startPage > 2;
      const rightSpill = endPage < beforeLastPage;

      const leftSpillPage = LEFT_PAGE;
      const rightSpillPage = RIGHT_PAGE;

      if (leftSpill && !rightSpill) {
        const extraPages = range(startPage - singleSpillOffset, startPage - 1);
        pages = [leftSpillPage, ...extraPages, ...pages];
      } else if (!leftSpill && rightSpill) {
        const extraPages = range(endPage + 1, endPage + singleSpillOffset);
        pages = [...pages, ...extraPages, rightSpillPage];
      } else if (leftSpill && rightSpill) {
        pages = [leftSpillPage, ...pages, rightSpillPage];
      }

      return [1, ...pages, totalPages];
    }

    return range(1, totalPages);
  }
  if (!props.totalRecords) return null;
  let totalPages = Math.ceil(props.totalRecords / props.pageLimit);

  if (totalPages === 1) return null;
  const pages = fetchPageNumbers(
    totalPages,
    props.currentPage,
    props.pageNeighbours
  );

  return (
    <>
      <nav aria-label="Pagination">
        <ul className="pagination">
          {pages.map((page, index) => {
            if (page === LEFT_PAGE) {
              return (
                <li
                  className="paginacion-item"
                  key={index}
                  onClick={() => props.handleEventToPage(props.currentPage - 1)}
                >
                  &laquo;
                </li>
              );
            }
            if (page === RIGHT_PAGE) {
              return (
                <li
                  className="paginacion-item"
                  key={index}
                  onClick={() => props.handleEventToPage(props.currentPage + 1)}
                >
                  &raquo;
                </li>
              );
            }
            return (
              <li
                className={`${
                  props.currentPage === page
                    ? "paginacion-item-active "
                    : "paginacion-item"
                }`}
                key={index}
                onClick={() => props.handleEventToPage(page)}
              >
                {page}
              </li>
            );
          })}
        </ul>
      </nav>
    </>
  );
}

export { Paginacion };
