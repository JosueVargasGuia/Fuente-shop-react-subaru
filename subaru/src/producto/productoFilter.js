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
  listaRepuesto,
  listaAcesorios,
} from "../service/ENUM";
import {  findProductos } from "../service/producto.service";
import Loading from "../utils/loading";

import ProductosCard from "./productoCard";
const LIMITE = 9;
const RECOMENDADO = "RECOMENDADO";
const OFERTA = "OFERTA";
const REMATE = "REMATE";
const DEFAULT = "DEFAULT";
const SEARCH = "SEARCH";
const MENU = "MENU";
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
    MenuDescripcion:"",
    MenuConext:"",
    filter:"",
    lstMenuVertical:[],
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
  useEffect(() => {
    console.log("handleInitVariable 1");
    handleInitVariable(params.descripcion);
  }, [params.descripcion]);
  useEffect(() => {
    if (_marca.codigoMarca >= 0) {
      props.handleSelectMarcaChange(_marca.codigoMarca, "ProductoFilter");
    } 
    //handleEventCargarSubFamilia(_marca.chrcodigofamilia);
    
    console.log("useEffect 1");
   
    handleInitVariable(params.descripcion).then(_object=> {
      handleEventAddSubFamiliaSelect(     
        1,
        filterOrder.FilterAscDescripcion,params.descripcion,_object.filter
      );
    })

     
    
    //eslint-disable-next-line
  }, [props.moneda, params.query,params.descripcion]);
  /*
    useEffect(()=>{
      console.log("useEffect 2")
      handleEventAddSubFamiliaSelect(
        _marca.chrcodigofamilia,
        1,
        filterOrder.FilterAscDescripcion
      );
  // eslint-disable-next-line
    },[params.query])
    */
  async function handleInitVariable(_var){
    let _INDEN_MENU;
    let _FILTER;
    let _MENU;
    let _lstMenuVertical=[];
    
    // eslint-disable-next-line 
    switch (_var) {
      case "Subaru":
        _MENU = _var;
        _FILTER =MENU;
        _INDEN_MENU="Subaru";
        _lstMenuVertical.push({ descripcion: "Repuestos",codigo:1,identificador:"TITULO",subFamilia:[]});      
        for (let index = 0; index < listaRepuesto.length; index++) {          
          const row = listaRepuesto[index];
          _lstMenuVertical.push(row);      
        }
        _lstMenuVertical.push({ descripcion: "Accesorios y LifeStyle",codigo:2,identificador:"TITULO",subFamilia:[]});      
        for (let index = 0; index < listaAcesorios.length; index++) {
          const row = listaAcesorios[index];
          _lstMenuVertical.push(row);      
        }          
        break;
      case "recomendado":
        _MENU = _var;
        _FILTER = RECOMENDADO;
        _INDEN_MENU="Recomendado";        
        _lstMenuVertical.push({ descripcion: _INDEN_MENU,codigo:0,identificador:_var,subFamilia:[]});      
        break;
        case "remate":
        _MENU = _var;
        _FILTER = REMATE;
        _INDEN_MENU="Remate";      
        _lstMenuVertical.push({ descripcion: _INDEN_MENU,codigo:0,identificador:_var,subFamilia:[]});        
        break;
        case "oferta":
        _MENU = _var;
        _FILTER = OFERTA;
        _INDEN_MENU="Oferta"; 
        _lstMenuVertical.push({ descripcion: _INDEN_MENU,codigo:0,identificador:_var,subFamilia:[]});            
        break;
        case "search":
        _MENU = _var;
        _FILTER = SEARCH;
        _INDEN_MENU="Búsqueda";   
        _lstMenuVertical.push({ descripcion: _INDEN_MENU,codigo:0,identificador:_var,subFamilia:[]});            
        break;
      case "Repuesto-1-1":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-2":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-3":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-4":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-5":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-6":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-7":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-8":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-9":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-10":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-11":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Repuesto-1-12":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Accesorio-2-1":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Accesorio-2-2":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Accesorio-2-3":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
      case "Accesorio-2-4":
        _MENU = _var;
        _FILTER = MENU;
        _INDEN_MENU="Búsqueda";
        break;
    }

if(_MENU!==MENU){
  for (let index = 0; index < listaRepuesto.length; index++) {
    const row = listaRepuesto[index];
      if(row.identificador===_MENU){            
        _lstMenuVertical.push(row);
      }
  }
  for (let index = 0; index < listaAcesorios.length; index++) {
    const row = listaAcesorios[index];
      if(row.identificador===_MENU){            
        _lstMenuVertical.push(row);
      }
  }
}
 console.log(_INDEN_MENU ,_MENU,_FILTER);

    dispatch({
      type: actionType.LOAD_MENU, 
      MenuDescripcion: _INDEN_MENU,
      MenuConext: _MENU,
      filter: _FILTER,
      lstMenuVertical:_lstMenuVertical
    });
    return {MenuDescripcion: _INDEN_MENU,
      MenuConext: _MENU,
      filter: _FILTER,}
  }  

  /*async function handleEventCargarSubFamilia(_chrCodigoFamilia) {
    let lstSubFamilia = [];
    const rpt = await obtenerSubFamilia({
      chrCodigoFamilia: _chrCodigoFamilia,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.lista.length; index++) {
          const element = json.lista[index];
          lstSubFamilia.push({
            chrCodigoSubFamilia: element.chrCodigoSubFamilia,
            vchDescripcion: element.vchDescripcion,
            chrEstado: false,
            chrCodigoFamilia: element.chrCodigoFamilia,
          });
        }
        dispatch({
          type: actionType.LOAD_SUBFAMILIA,
          lstSubFamilia: lstSubFamilia,
          server: {
            error: "",
            success: SUCCESS_SERVER.SUCCES_SERVER_OK,
          },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.LOAD_SUBFAMILIA,
          lstSubFamilia: lstSubFamilia,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.LOAD_SUBFAMILIA,
        lstSubFamilia: lstSubFamilia,
        server: {
          error: "",
          success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
        },
      });
    }
  }*/
  async function handleEventAddSubFamiliaSelect(
    _currentPage,
    _filterOrder,
    __MENU,
    _FILTER
  ) {
    
   
    console.log(_currentPage,
      _filterOrder,
      __MENU,
      _FILTER);
  
    let _totalRegistros = 0;
  
   
    let lstSubFamiliaFilter = [];  
    /*Listado de Producto */
    let _filterProducto = FilterProducto.FILTER_ALL_FIND;
    let _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_LIST;
    let _vchDescripcion = null;
    if (_FILTER === DEFAULT) {
      _filterProducto = FilterProducto.FILTER_ALL_FIND;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_LIST;
    }
    if (_FILTER === RECOMENDADO) {
      _filterProducto = FilterProducto.FILTER_RECOMENDADO;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
    }
    if (_FILTER === REMATE) {
      _filterProducto = FilterProducto.FILTER_REMATE;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
    }
    if (_FILTER === OFERTA) {
      _filterProducto = FilterProducto.FILTER_OFERTA;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
    }
    if (_FILTER === SEARCH) {
      _filterProducto = FilterProducto.FILTER_SEARCH;
      _filterSubFamilia = FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
      _vchDescripcion = params.query;
    }
 
    if(_FILTER === MENU){
      lstSubFamiliaFilter=[];
      // eslint-disable-next-line default-case
      for (let index = 0; index < listaRepuesto.length; index++) {
        const row = listaRepuesto[index];
          if(row.identificador===__MENU){            
            for (let j = 0; j < row.subFamilia.length; j++) {
              const _e = row.subFamilia[j];
              lstSubFamiliaFilter.push({chrCodigoSubFamilia:_e});
            }
          }
      }
      for (let index = 0; index < listaAcesorios.length; index++) {
        const row = listaAcesorios[index];
          if(row.identificador===__MENU){            
            for (let j = 0; j < row.subFamilia.length; j++) {
              const _e = row.subFamilia[j];
              lstSubFamiliaFilter.push({chrCodigoSubFamilia:_e});
            }
          }
      }
    }



    let lstProducto = [];
    const rpt = await findProductos({
      chrCodigoFamilia: _marca.chrcodigofamilia,
      vchDescripcion: _vchDescripcion,
      chrCodigoProducto: null,
      filterProducto: _filterProducto,
      listaSubFamilia: lstSubFamiliaFilter,
      filterSubFamilia: _filterSubFamilia,
      filterOrder: _filterOrder,
      pagina: _currentPage,
      limit: LIMITE,
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
            numCodigoMoneda: e.numCodigoMoneda,
            vchDescripcion: e.vchDescripcion,
            vchDescripcionSmall: e.vchDescripcionSmall,
            numStock: e.numStock,
            totalRegistros: e.totalRegistros,
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
            ></ProductosCard>
          );
        }

        dispatch({
          type: actionType.LOAD_PRODUCTO,
          lstProducto: lstProducto,
          totalRegistros: _totalRegistros,
          isLoandingProductos: false, 
          currentPage: _currentPage,
        });
      }
    }
  }
  function handleEventToPage(_currentPage) {
    handleEventAddSubFamiliaSelect(       
      _currentPage,
      state.filterOrder,state.MenuConext,state.filter
    );
  }
  function handleEventChangeFilterOrder(e) {
    dispatch({
      type: actionType.CHANGE_FILTER_ORDERBY,
      filterOrder: e.target.value,
    });
    handleEventAddSubFamiliaSelect(1, e.target.value,
      state.MenuConext,state.filter);
  }
  function handleEventChangeMenu(_param) {    
    if (_param.identificador !== "TITULO") {
      handleEventAddSubFamiliaSelect(
        1,
        state.filterOrder,
        _param.identificador,
        state.filter
      );
    }
  }

  return (
    <>
      {state.isLoandingProductos ? <Loading></Loading> : ""}

      <div className="prod-filter-content">
        <div className="prod-filter-column1">
          <div className="link-href">
            <Link to="/shop">Inicio</Link> &nbsp;&nbsp;/
             <span className="link-href-span">{_marca.decripcion}</span>
          </div>
          <ul className="prod-filter-menu">              
              {state.lstMenuVertical.map((_objeto) => (
               
               <li  className={(_objeto.identificador==="TITULO"?"prod-filter-menu-titulo":"")} 
               key={_objeto.codigo+_objeto.identificador}>
                  <span onClick={(e) => {
                     handleEventChangeMenu(_objeto) ;
                  }
                  }>
                    {_objeto.descripcion}</span>
                </li>
              ))}
                
            </ul>
               
          
          
        </div>

        <div className="prod-filter-column2">
          <div className="prod-filter-page">
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
          {state.lstProducto}
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
    </>
  );
}
let actionType = {
  ERROR: "ERROR",
  LOAD_SUBFAMILIA: "LOAD_SUBFAMILIA",
  SUBFAMILIA_CHANGE_SELECT: "SUBFAMILIA_CHANGE_SELECT",
  LOAD_PRODUCTO: "LOAD_PRODUCTO",
  CHANGE_FILTER_ORDERBY: "CHANGE_FILTER_ORDERBY",
  LOAD_MENU:"LOAD_MENU"
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
      };
    case actionType.CHANGE_FILTER_ORDERBY:
      return {
        ...state,
        filterOrder: action.filterOrder,
      };
    case actionType.LOAD_MENU:
      return {
        ...state,
        MenuDescripcion: action.MenuDescripcion,
        MenuConext: action.MenuConext,
        filter: action.filter,
        lstMenuVertical:action.lstMenuVertical,
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
