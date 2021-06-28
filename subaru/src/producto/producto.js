 
import { HttpStatus, SUCCESS_SERVER } from "../service/ENUM";
import { useEffect, useReducer } from "react";
import { findProductos } from "../service/producto.service";
import Productos from "./productos";
import Loading from "../utils/loading";
const LIMITE = 12;
//import $ from "jquery"; $( "#btn" ).click();
let actionType = {
  SELECT_MARCAS: "SELECT_MARCAS",
  INPUT_DESCRIPCION: "INPUT_DESCRIPCION",
  ISLOGING: "ISLOGING",
  CHANGE_MONEDA: "CHANGE_MONEDA",
  FIND_PRODUCTOS: "FIND_PRODUCTOS",
  SETPAGINA: "SETPAGINA",
  SETTOTAL_REGISTROS: "SETTOTAL_REGISTROS",
  LOADING: "LOADING",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.SETPAGINA:
      return { ...state, pagina: action.pagina };
    case actionType.FIND_PRODUCTOS:
      return {
        ...state,
        lstProducto: action.lstProducto,
        isLoandingProductos: action.isLoandingProductos,
        server: action.server,
      };
    case actionType.LOADING:
      return {
        ...state,
        isLoandingProductos: action.isLoandingProductos,
      };
    case actionType.SETTOTAL_REGISTROS:
      return { ...state, totalRegistros: action.totalRegistros };

    default:
      return state;
  }
};

export default function Producto(props) {
  const search = {
    chrcodigofamilia: props.marca.chrcodigofamilia,
    findProducByDesc: props.findProducByDesc,
  };

  const [state, dispatch] = useReducer(reducer, {
    lstProducto: [],
    isLoandingProductos: false,
    pagina: 1,
    totalRegistros: 0,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
   
  /**/
  useEffect(() => {
    //if (props.findProducto === true) {
      handleServicioBuscarProductos(
        props.marca.chrcodigofamilia,
        props.findProducByDesc,
        1,
        LIMITE
      );
      console.log("Producto[useEffect _INIT findProducto]");
    //eslint-disable-next-line
  }, [props.marca]);

  

  async function handleServicioBuscarProductos(
    chrCodigoFamilia,
    vchDescripcion,
    _pagina,
    _limit
  ) {
  

    dispatch({
      type: actionType.FIND_PRODUCTOS,
      lstProducto: [],
      isLoandingProductos: false,
      server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    });
    let lstProducto = [];

    const rpt = await findProductos({
      chrCodigoFamilia: chrCodigoFamilia,
      vchDescripcion: vchDescripcion,
      pagina: _pagina,
      limit: _limit,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaProductos.length; index++) {
          let e = json.listaProductos[index];

          lstProducto.push({
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
          });
        }
        dispatch({
          type: actionType.FIND_PRODUCTOS,
          lstProducto: lstProducto,
          isLoandingProductos: true,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.FIND_PRODUCTOS,
          lstProducto: lstProducto,
          isLoandingProductos: true,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.FIND_PRODUCTOS,
        lstProducto: lstProducto,
        isLoandingProductos: true,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }
  /*Funcion que es llamado desde la paginacion */
  async function handlePaginacionEvent(_pagina) {
    /* */
    dispatch({
      type: actionType.FIND_PRODUCTOS,
      lstProducto: [],
      isLoandingProductos: true,
      server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    });
    let lstProducto = [];
  
    const rpt = await findProductos({
      chrCodigoFamilia: search.chrcodigofamilia,
      vchDescripcion: search.findProducByDesc,
      pagina: _pagina,
      limit: LIMITE,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
     
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaProductos.length; index++) {
          let e = json.listaProductos[index];
          
          lstProducto.push({
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
          });
        }
      }
      dispatch({
        type: actionType.FIND_PRODUCTOS,
        lstProducto: lstProducto,
        isLoandingProductos: true,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
      });
    }
    /* */
  }

  return (
    <div>
      
      {!state.isLoandingProductos && search.chrcodigofamilia !== "----" ? (
        <Loading></Loading>
      ) : (
        <Productos
          moneda={props.moneda}
          lstProducto={state.lstProducto}
          limite={LIMITE}
          search={search}
          handlePaginacionEvent={handlePaginacionEvent}
        ></Productos>
      )}
    </div>
  );
}

