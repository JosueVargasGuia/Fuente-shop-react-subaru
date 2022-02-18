//eslint-disable-next-line
import React, { useEffect, useReducer } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { chrRol, CRUD, HttpStatus, localStoreEnum, LOGGIN, SUCCESS_SERVER } from "../../service/ENUM";
import ServerException from "../../utils/serverException";
import * as XLSX from "xlsx";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { obtenerCliente } from "../../service/loginCliente.service";
import { listarProductoOutlet, saveUpdateProductoOutlet,updateProductoOutletRow } from "../../service/producto.service";
import DatePicker  from "react-datepicker";
let actionType = {
    LISTDATA: "LISTDATA",
    setFile: "setFile",
    setListDataJson: "setListDataJson",
    setListDataJsonLoad: "setListDataJsonLoad",
    setListDataJsonAndVigencia: "setListDataJsonAndVigencia",
    setDteDesde: "setDteDesde",
    setDteHasta: "setDteHasta",
    setNumEstado: "setNumEstado",
    setListaError: "setListaError" ,
    ERROR: "ERROR"
};
const reducer = (state, action) => {
   
    switch (action.type) {
      case actionType.ERROR:
        return {
          ...state,
          server: action.server,
        };
      case actionType.setFile:
        return {
          ...state,
          file: action.file,
        };     
      case actionType.setListDataJson:
        return {
          ...state,
          listDataJson: action.listDataJson,
          listData: action.listData,
          server: action.server,
        };
      case actionType.setListDataJsonLoad:
        return {
          ...state,
          listDataJson: action.listDataJson,
          listData: action.listData,
          filter: action.filter,          
        };
      case actionType.setListDataJsonAndVigencia:
        return {
          ...state,
          listDataJson: action.listDataJson,
          listData: action.listData,
          dteDesde: action.dteDesde,
          dteHasta: action.dteHasta,
          numEstado: action.numEstado,
          crud: action.crud,
          numProductoVigencia: action.numProductoVigencia,
          vigenciaTitulo:action.vigenciaTitulo,
          server: action.server,
        };
      case actionType.setDteDesde:
        return {
          ...state,
          dteDesde: action.dteDesde,
        };

      case actionType.setDteHasta:
        return {
          ...state,
          dteHasta: action.dteHasta,
        };
      case actionType.setNumEstado:
        return {
          ...state,
          numEstado: action.numEstado,
        };
      case actionType.setListaError:
        return {
          ...state,
          listaError: action.listaError,
        };

      default:
        return state;
    }
  
}
const _FILTER={codigoOrderByAsc:'codigoOrderByAsc',
    codigoOrderByDesc:'codigoOrderByDesc',
    descripcionOrderByAsc:'descripcionOrderByAsc',
    descripcionOrderByDesc:'descripcionOrderByDesc',
    numUnspcOrderByAsc:'numUnspcOrderByAsc',
    numUnspcOrderByDesc:'numUnspcOrderByDesc',
    descripcionSearch:'search'};
const _WIDTH_TABLE = {
  chrCodigoProducto: "100px",
  vchDescripcion: "332px",
  numUnspc: "105px",
  numUnspcHead: "107px",
  numValorVenta: "80px",
  numValorRefVenta: "80px",
  numValorCompra: "80px",
  numValorDesc: "40px",  
  vchModelo: "184px",
  numStock: "45px", 
}; 
const _CRUD_UNSPC={
    updateOn:"updateOn",
    updateOff:"updateOff",

}
export default function OutletCargaProducto(props) {
    let params = useParams();
    let _numProductoVigencia = params.numProductoVigencia;
    let _crud = params.crud;
  
    let date = new Date();
    let primerDia = new Date(date.getFullYear(), date.getMonth(), 1);
    let ultimoDia = new Date(date.getFullYear(), date.getMonth() + 1, 0);
   
    let history = useHistory();
    const [state, dispatch] = useReducer(reducer, {
        file: undefined,
        listDataJson: [],
        listData: [],
        numProductoVigencia: _numProductoVigencia,
        vigenciaTitulo:"",
        dteDesde: primerDia,
        dteHasta: ultimoDia,
        numEstado: 1,
        listaError: [], 
        crud: (_crud === 'update' ? CRUD.UPDATE : CRUD.INSERT),
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
        filter:{codigoOrderBy:_FILTER.codigoOrderByAsc,
                descripcionOrderBy:_FILTER.descripcionOrderByAsc,
                descripcionSearch:_FILTER.descripcionSearch,
                numUnspcOrderBy:_FILTER.numUnspcOrderByAsc},
    });
    useEffect(() => {
        handleObtenerCliente(props.numCodigoCliente);
        console.log("useEffect[ListadoProductoOutlet]");
        //eslint-disable-next-line 
    }, []);

    async function handleObtenerCliente(_numCodigoCliente) {
        let _rol = chrRol.ROLE_ANONIMO;
        const rpt = await obtenerCliente({ numCodigoCliente: _numCodigoCliente });
        let _server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT };
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            let _usuario = {};
            if (localStorage.getItem(localStoreEnum.USUARIO) !== null) {
                _usuario = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
                if (_usuario.chrRol === chrRol.ROLE_ADMIN && json.chrRol === chrRol.ROLE_ADMIN) {
                    _rol = json.chrRol;
                } else {
                    _rol = chrRol.ROLE_ANONIMO;
                }
            } else {
                _rol = chrRol.ROLE_ANONIMO;
            }
            _server.error = "";
            _server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
        } else {
            _server.error = "";
            _server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR;
        }
        dispatch({ type: actionType.ROL, rol: _rol, server: _server });
        if (JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)) !== null) {
            if (!(JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)).chrRol === chrRol.ROLE_ADMIN
                && _rol === chrRol.ROLE_ADMIN
                && localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN)) {
                     
                    
                history.push("/admin");
            }
           
        } else {
         
            history.push("/admin");
        }
        if (state.crud === CRUD.UPDATE) {
            console.log("useEffect[ListadoProductoOutlet]-->"+state.numProductoVigencia,state.crud);
            handleEventListaProdOutlet(state.numProductoVigencia,state.crud);
            
        }
       
    }

    function handleEventReadFile(file) {
        /* Boilerplate to set up FileReader */
        let _listDataJson = [];
        let _listData = [];
        const reader = new FileReader();
        const rABS = !!reader.readAsBinaryString;
        reader.onload = e => {
            /* Parse data */
            const bstr = e.target.result;
            const wb = XLSX.read(bstr, { type: rABS ? "binary" : "array" });
            /* Get first worksheet */
            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            /* Convert array of arrays */
            const data = XLSX.utils.sheet_to_json(ws, { header: 1 });
            /* Update state */
            console.log(data.length); 

           // let _server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                
                if (index >= 1) {
                    
                    
                    let _stock = {
                        index: index,
                        chrCodigoProducto: element[0],
                        vchDescripcion: element[1],
                        //eslint-disable-next-line
                        numValorVenta: (new Number(element[2]).toString() === 'NaN' ? '00.00' : parseFloat(element[2]).toFixed(2)),
                        //eslint-disable-next-line
                        numValorRefVenta: (new Number(element[3]).toString() === 'NaN' ? '00.00' : parseFloat(element[3]).toFixed(2)),
                        //eslint-disable-next-line
                        numValorCompra: (new Number(element[4]).toString() === 'NaN' ? '00.00' : parseFloat(element[4]).toFixed(2)),
                        //eslint-disable-next-line
                        numValorDesc: (new Number(element[5]).toString() === 'NaN' ? '00.00' : parseFloat(element[5]).toFixed(0)),
                        //eslint-disable-next-line
                        numStock: (new Number(element[6]).toString() === 'NaN' ? '00.00' : parseFloat(element[6]).toFixed(0)),
                        vchModelo: element[7],
                        numUnspc: element[8],
                        numProductoVigencia: 0,
                        numProductoOutlet: 0,
                        flagEditNumUnspc:_CRUD_UNSPC.updateOff

                    };
                    _listDataJson.push(_stock);
                    _listData.push(<tr key={_stock.index}>                        
                        <td style={{ width: _WIDTH_TABLE.chrCodigoProducto ,maxWidth:"98px" }}>{_stock.chrCodigoProducto}</td>
                        <td style={{ width: _WIDTH_TABLE.vchDescripcion   }}>{_stock.vchDescripcion}</td>
                        <td style={{ width: _WIDTH_TABLE.numUnspc }}>{_stock.numUnspc}</td>
                        <td style={{ width: _WIDTH_TABLE.numValorVenta  }} className="td_number">{_stock.numValorVenta}</td>
                        <td style={{ width: _WIDTH_TABLE.numValorRefVenta }} className="td_number">{_stock.numValorRefVenta}</td>
                        <td style={{ width: _WIDTH_TABLE.numValorCompra }} className="td_number">{_stock.numValorCompra}</td>
                        <td style={{ width: _WIDTH_TABLE.numValorDesc  }} className="td_number">{_stock.numValorDesc}</td>
                        <td style={{ width: _WIDTH_TABLE.vchModelo}} title="Modelo">{_stock.vchModelo}</td>
                        <td style={{ width: _WIDTH_TABLE.numStock,textAlign:"center" }} className="td_number">{_stock.numStock}</td>
                         
                    </tr>);
                }
            }
            dispatch({
                type: actionType.setListDataJson,
                listDataJson: _listDataJson,
                listData: _listData,
                server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_OK }
            });
        };

        if (file.target.files[0] !== undefined) {
            if (rABS) {
                reader.readAsBinaryString(file.target.files[0]);
            } else {
                reader.readAsArrayBuffer(file.target.files[0]);
            }

        } else {
            dispatch({
                type: actionType.LISTDATA,
                server: { error: "Archivo no cargado", success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
            });
        }


    }

    async function handleEventListaProdOutlet(_numProductoVigencia,_crud) {
        const rpt = await listarProductoOutlet({ numProductoVigencia: _numProductoVigencia });
        
        let _listDataJson = [];
        let _listData = [];
        let _dteDesde = "";
        let _dteHasta = "";
        let _numEstado = 0;
        let _vigenciaTitulo="";
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            _dteDesde = json.productoOutletVigencia.dteDesde;
            _dteHasta = json.productoOutletVigencia.dteHasta;
            _numEstado = json.productoOutletVigencia.numEstado;
            _vigenciaTitulo=json.productoOutletVigencia.dteDesdeFormato+" al "+json.productoOutletVigencia.dteHastaFormato;
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                for (let index = 0; index < json.lista.length; index++) {
                    const _object = json.lista[index];
                    let _stock = {
                        index: index,
                        chrCodigoProducto: _object.chrCodigoProducto,
                        vchDescripcion: _object.vchDescripcion,
                        numUnspc: _object.numUnspc,
                        vchModelo:_object.vchModelo,
                        numValorVenta: _object.numValorVenta,
                        numValorRefVenta: _object.numValorRefVenta,
                        numValorCompra: _object.numValorCompra,
                        numValorDesc: _object.numValorDesc,
                        numStock: _object.numStock,
                        numProductoVigencia: _object.numProductoVigencia,
                        numProductoOutlet: _object.numProductoOutlet,
                        flagEditNumUnspc:_CRUD_UNSPC.updateOff

                    };
                    _listDataJson.push(_stock);
                    
                }
                for (let index = 0; index < _listDataJson.length; index++) {
                    const _stock = _listDataJson[index];
                    _listData.push(<tr key={_stock.index}>                        
                        <td style={{ width: _WIDTH_TABLE.chrCodigoProducto }}>{_stock.chrCodigoProducto}</td>
                        <td style={{ width: _WIDTH_TABLE.vchDescripcion }}>{_stock.vchDescripcion}</td>
                        <td style={{ width: _WIDTH_TABLE.numUnspc}}>
                            <div onClick={(e)=>handleEventEditUnspc(_stock,_listDataJson,CRUD.SELECT)} 
                                 style={{minWidth:_WIDTH_TABLE.numUnspc,width:_WIDTH_TABLE.numUnspc}}
                                 className="btn-edit-action">
                            <div>{_stock.numUnspc}</div></div>
                        </td>
                        <td style={{ width: _WIDTH_TABLE.numValorVenta}} className="td_number">{ parseFloat(_stock.numValorVenta).toFixed(2)}</td>
                        <td style={{ width: _WIDTH_TABLE.numValorRefVenta}}className="td_number">{parseFloat(_stock.numValorRefVenta).toFixed(2)}</td>
                        <td style={{ width: _WIDTH_TABLE.numValorCompra}} className="td_number">{parseFloat(_stock.numValorCompra).toFixed(2)}</td>
                        <td style={{ width: _WIDTH_TABLE.numValorDesc}} className="td_number">{parseFloat(_stock.numValorDesc).toFixed(0)}</td>
                        <td style={{ width: _WIDTH_TABLE.vchModelo}} title="Modelo">{_stock.vchModelo}</td>
                        <td style={{ width: _WIDTH_TABLE.numStock,textAlign:"center"}}  className="td_number">{parseFloat(_stock.numStock).toFixed(0)}</td>
                     
                    </tr>);
                }
                dispatch({
                    type: actionType.setListDataJsonAndVigencia,
                    listDataJson: _listDataJson,
                    listData: _listData,
                    dteDesde: Date.parse(_dteDesde),
                    dteHasta: Date.parse(_dteHasta),
                    numEstado: _numEstado,
                    numProductoVigencia:_numProductoVigencia,
                    vigenciaTitulo:_vigenciaTitulo,
                    crud:_crud,
                    server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_OK },
                });
               
            }
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                dispatch({
                    type: actionType.ERROR,
                    server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
                });
            }
        } else {
            console.log('SUCCES_SERVER_ERROR');
            dispatch({
                type: actionType.ERROR,
                server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
            });
        }
       
    }


    async function handleEventSave() {
        let _valida = 0;
        let _listaError = [];

        if (state.dteDesde === "") {
            _listaError.push("Ingrese la fecha inical de vigencia")
            _valida = 1;
        }
        if (state.dteHasta === "") {
            _listaError.push("Ingrese la fecha final de vigencia")
            _valida = 1;
        }

        if (state.listDataJson.length === 0 && state.crud === CRUD.INSERT) {
            _listaError.push("No tiene registros de productos de tipo outlet")
            _valida = 1;
        }
        if (_valida === 0) {
            const rpt = await saveUpdateProductoOutlet({
                productoOutletVigencia: {
                    numProductoVigencia: state.numProductoVigencia,
                    dteDesdeDate: state.dteDesde,
                    dteHastaDate: state.dteHasta,
                    numEstado: state.numEstado
                },
                crud:state.crud.descripcion,
                lista:state.listDataJson
            });
            console.log("handleEventSaveOutletVigencia");
            if (rpt.status === HttpStatus.HttpStatus_OK) {
                const json = await rpt.json();
                if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                    history.push("/outletCarga/"+json.productoOutletVigencia.numProductoVigencia+"/update");
                    handleEventListaProdOutlet(json.productoOutletVigencia.numProductoVigencia,CRUD.UPDATE)
                                        
                }
                if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                    dispatch({
                        type: actionType.ERROR,
                        server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
                    });
                }
            } else {
                console.log('SUCCES_SERVER_ERROR');
                dispatch({
                    type: actionType.ERROR,
                    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
                });
            }
        } else {
            dispatch({
                type: actionType.ERROR,
                server: { error: _listaError, success: SUCCESS_SERVER.SUCCES_SERVER_WARRING },
            });
        }
    }
    async function handleEventHeadFilter(_FILTER_TYPE) {
      let _filter = state.filter;
      let _filterChange = {
        codigoOrderBy: _filter.codigoOrderBy,
        descripcionOrderBy: _filter.descripcionOrderBy,
        descripcionSearch: _filter.descripcionSearch,
        numUnspcOrderBy:_filter.numUnspcOrderBy
      };
      let _listDataJson = state.listDataJson;
      
      if (_FILTER_TYPE === "_FILTER_CODIGO") {
        if (_filter.codigoOrderBy === _FILTER.codigoOrderByAsc) {
          _listDataJson.sort((a, b) => {
            let fa = a.chrCodigoProducto;
            let fb = b.chrCodigoProducto;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
          _filterChange.codigoOrderBy=_FILTER.codigoOrderByDesc;
        }
        if (_filter.codigoOrderBy === _FILTER.codigoOrderByDesc) {
          _listDataJson.sort((a, b) => {
            let fa = a.chrCodigoProducto;
            let fb = b.chrCodigoProducto;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          }).reverse();
          _filterChange.codigoOrderBy=_FILTER.codigoOrderByAsc;
        }
        
       
      }


      if (_FILTER_TYPE === "_FILTER_DESCRIPCION") {
        if (_filter.descripcionOrderBy === _FILTER.descripcionOrderByAsc) {
          _listDataJson.sort((a, b) => {
            let fa = a.vchDescripcion;
            let fb = b.vchDescripcion;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          });
          _filterChange.descripcionOrderBy=_FILTER.descripcionOrderByDesc;
        }
        if (_filter.descripcionOrderBy === _FILTER.descripcionOrderByDesc) {
          _listDataJson.sort((a, b) => {
            let fa = a.vchDescripcion;
            let fb = b.vchDescripcion;
            if (fa < fb) {
              return -1;
            }
            if (fa > fb) {
              return 1;
            }
            return 0;
          }).reverse();
          _filterChange.descripcionOrderBy=_FILTER.descripcionOrderByAsc;
        }        
       
      }
      if (_FILTER_TYPE === "_FILTER_UNSPC") {
        if (_filter.numUnspcOrderBy === _FILTER.numUnspcOrderByAsc) {
            _listDataJson.sort((a, b) => {
              let fa = a.numUnspc;
              let fb = b.numUnspc;
              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            });
            _filterChange.numUnspcOrderBy=_FILTER.numUnspcOrderByDesc;
          }
          if (_filter.numUnspcOrderBy === _FILTER.numUnspcOrderByDesc) {
            _listDataJson.sort((a, b) => {
              let fa = a.numUnspc;
              let fb = b.numUnspc;
              if (fa < fb) {
                return -1;
              }
              if (fa > fb) {
                return 1;
              }
              return 0;
            }).reverse();
            _filterChange.numUnspcOrderBy=_FILTER.numUnspcOrderByAsc;
          }
      }

      handleEventReloadLista(_listDataJson,_filterChange);
    }
    async function  handleEventReloadLista(_lista,_filter){
        let _listDataJson=[];
        let _listData=[];
        for (let index = 0; index < _lista.length; index++) {
            const _object = _lista[index];
            let _stock = {
                index: index,
                chrCodigoProducto: _object.chrCodigoProducto,
                vchDescripcion: _object.vchDescripcion,
                numUnspc: _object.numUnspc,
                numValorVenta: _object.numValorVenta,
                numValorRefVenta: _object.numValorRefVenta,
                numValorCompra: _object.numValorCompra,
                numValorDesc: _object.numValorDesc,
                numStock: _object.numStock,
                numProductoVigencia: _object.numProductoVigencia,
                numProductoOutlet: _object.numProductoOutlet,
                vchModelo:_object.vchModelo,
                flagEditNumUnspc:_object.flagEditNumUnspc

            };
            _listDataJson.push(_stock);
            
        }
        for (let index = 0; index < _listDataJson.length; index++) {
            const _stock = _listDataJson[index];
            _listData.push(<tr key={_stock.index}>                        
                <td style={{ width: _WIDTH_TABLE.chrCodigoProducto }}> {_stock.chrCodigoProducto}</td>
                <td style={{ width: _WIDTH_TABLE.vchDescripcion }}>{_stock.vchDescripcion}</td>
                <td style={{ width: _WIDTH_TABLE.numUnspc}}>
                            {_stock.flagEditNumUnspc===_CRUD_UNSPC.updateOn?
                                
                                <div className="outlet-cell-edit">
                                    <ProductoUnspcCard outlet={_stock} reload={()=>handleEventListaProdOutlet(state.numProductoVigencia,CRUD.UPDATE)}></ProductoUnspcCard>
                                
                                </div>
                             :
                         
                                <div onClick={(e)=>handleEventEditUnspc(_stock,_listDataJson,CRUD.SELECT)} 
                                    style={{minWidth:_WIDTH_TABLE.numUnspc,width:_WIDTH_TABLE.numUnspc}}
                                    className="btn-edit-action">
                                    <div>{_stock.numUnspc}</div>
                                </div> 
                            }
                               
                </td>
                <td style={{ width: _WIDTH_TABLE.numValorVenta }} className="td_number">{ parseFloat(_stock.numValorVenta).toFixed(2)}</td>
                <td style={{ width: _WIDTH_TABLE.numValorRefVenta}}className="td_number">{parseFloat(_stock.numValorRefVenta).toFixed(2)}</td>
                <td style={{ width: _WIDTH_TABLE.numValorCompra}} className="td_number">{parseFloat(_stock.numValorCompra).toFixed(2)}</td>
                <td style={{ width: _WIDTH_TABLE.numValorDesc}} className="td_number">{parseFloat(_stock.numValorDesc).toFixed(0)}</td>
                <td style={{ width: _WIDTH_TABLE.vchModelo}} title="Modelo">{_stock.vchModelo}</td>
                <td style={{ width: _WIDTH_TABLE.numStock,textAlign:"center"}}  className="td_number">{parseFloat(_stock.numStock).toFixed(0)}</td>
                
            </tr>);
        }
        dispatch({
            type: actionType.setListDataJsonLoad,
            listDataJson: _listDataJson,
            listData: _listData,
            filter: _filter 
        });
       
    }

    async function handleEventEditUnspc(_object_param,_listDataJson_param,_CRUD){
      
        let _listDataJson=[];
        
        for (let index = 0; index < _listDataJson_param.length; index++) {
            const _object = _listDataJson_param[index];
            let _stock = {
                index: index,
                chrCodigoProducto: _object.chrCodigoProducto,
                vchDescripcion: _object.vchDescripcion,
                numUnspc: _object.numUnspc,
                numValorVenta: _object.numValorVenta,
                numValorRefVenta: _object.numValorRefVenta,
                numValorCompra: _object.numValorCompra,
                numValorDesc: _object.numValorDesc,
                numStock: _object.numStock,
                numProductoVigencia: _object.numProductoVigencia,
                numProductoOutlet: _object.numProductoOutlet,
                vchModelo:_object.vchModelo,
                flagEditNumUnspc:_object.flagEditNumUnspc

            };
            if ((_CRUD.codigoCrud === CRUD.DELETE.codigoCrud)) {
                _stock.flagEditNumUnspc = _CRUD_UNSPC.updateOff;
       
            } else {
                if (
                    _object_param.numProductoOutlet === _object.numProductoOutlet
                  ) {
                    _stock.flagEditNumUnspc = _CRUD_UNSPC.updateOn;   
                   
                  } else {
                    _stock.flagEditNumUnspc = _CRUD_UNSPC.updateOff;
                    
                  }
             
            }
            _listDataJson.push(_stock);           
        }
       
      
        if (_CRUD.codigoCrud === CRUD.UPDATE.codigoCrud) {
            /*Falta logica de update del registro */
            handleEventListaProdOutlet(_object_param.numProductoVigencia,CRUD.UPDATE);            
        }else{                     
            handleEventReloadLista(_listDataJson,state.filter);             
        }      
       
     
    }
    return (<>
        <div className="registrar-stock">
            <div className="link-href">
                <Link to="/listaProductosOutlet">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Volver
                </Link>
            </div>
            <h3>{
                state.crud === CRUD.UPDATE ? "Detalle de Productos en Outlet desde " +state.vigenciaTitulo : "Cargar Productos en Outlet"}</h3>
  
            <div className="form-body-stock">
                <div className="form-accion">
                    <table>
                        <tbody>
                        <tr>
                            <td>Fecha Desde&nbsp;:</td>
                            <td style={{ width: "120px" }}><DatePicker
                                selected={state.dteDesde}
                                maxDate={state.dteHasta}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"

                                locale="es"
                                onChange={(date) =>
                                    dispatch({ type: actionType.setDteDesde, dteDesde: date })
                                }
                            ></DatePicker></td>
                            <td>Fecha Hasta&nbsp;:</td>
                            <td style={{ width: "120px" }}><DatePicker
                                selected={state.dteHasta}
                                minDate={state.dteDesde}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                locale="es"
                                onChange={(date) =>
                                    dispatch({ type: actionType.setDteHasta, dteHasta: date })
                                }
                            ></DatePicker></td>
                            <td>Estado &nbsp;:</td>
                            <td style={{ width: "120px" }}>
                                <input
                                    type="checkbox"
                                    name="flgDireccionDespacho"
                                    className="form-control"
                                    autoComplete="false"
                                    autoSave="false"
                                    checked={state.numEstado === 1 ? true : false}
                                    style={{ width: "20px" }}
                                    onChange={(e) =>
                                        dispatch({
                                            type: actionType.setNumEstado,
                                            numEstado: e.target.checked === true ? 1 : 0,
                                        })
                                    }
                                ></input>
                            </td>
                            <td>  <button
                                className=" btn btn-primary fa fa-save"
                                onClick={handleEventSave}
                            >&nbsp;{state.crud === CRUD.UPDATE ? "Actualizar" : "Guardar"}</button></td>
                            <td style={{ width: "200px" }}>
                                {state.crud === CRUD.UPDATE ? "" :
                                    <ReactHTMLTableToExcel
                                        id="table-xls"
                                        className="btn btn-primary fa fa-file-excel-o clsbutton"
                                        table="table-xls-formato"
                                        filename="Producto del OutLet"
                                        style={{ marginTop: '0.5em' }}
                                        sheet="Formato-OutLet"
                                        buttonText={"Formato .xls"}
                                    ></ReactHTMLTableToExcel>}
                            </td>

                        </tr>
                        <tr>
                            <td colSpan={5}>      {
                                state.crud === CRUD.INSERT ? <input className="form-ctrl form-ctrl-lg"
                                    type="file"
                                    accept=".xlsx"
                                    name="stockFile"
                                    id="stockFile"
                                    style={{ width: "300px", fontSize: "10px" }}
                                    value={state.file}
                                    onChange={handleEventReadFile}
                                    placeholder="Archivo de stock de productos"
                                >
                                </input> : ""}</td>
                        </tr>
                        </tbody>
                    </table>

                </div>
                <hr />

                <div className="div-table">
                    
                    <table style={{ fontSize: '13px' }} >
                     <thead>
                            <tr>
                            
                                <td style={{ width: _WIDTH_TABLE.chrCodigoProducto }}>Código&nbsp;<i className="fa fa-sort" onClick={(e)=>handleEventHeadFilter('_FILTER_CODIGO')}></i></td>
                                <td style={{ width: _WIDTH_TABLE.vchDescripcion}}><div className="search"><div className="search-title">Descripción&nbsp;<i className="fa fa-sort" onClick={(e)=>handleEventHeadFilter('_FILTER_DESCRIPCION')}></i></div></div></td>
                                <td style={{ width: _WIDTH_TABLE.numUnspcHead,textAlign: 'center' }} title="UNSPC">UNSPC&nbsp;<i className="fa fa-sort" onClick={(e)=>handleEventHeadFilter('_FILTER_UNSPC')}></i></td>
                                <td style={{ width: _WIDTH_TABLE.numValorVenta, textAlign: 'center' }} title="Precio Publico Promocional Unitario">Precio Publico Promocional Unitario</td>
                                <td style={{ width: _WIDTH_TABLE.numValorRefVenta, textAlign: 'center' }} title="Precio Publico Regular Unitario">Precio Publico Regular Unitario</td>
                                <td style={{ width: _WIDTH_TABLE.numValorCompra, textAlign: 'center' }} title="Valor Unitario Promocional Dealer ">Valor Unitario Promocional Dealer </td>
                                <td style={{ width: _WIDTH_TABLE.numValorDesc}} title="Descuento">Dsct.%</td>
                                <td style={{ width: _WIDTH_TABLE.vchModelo}} title="Modelo">Modelo</td>
                                <td style={{ width: _WIDTH_TABLE.numStock}} title="">Stock</td>
                                
                            </tr>
                                
                        </thead>
                
                    </table>
                     
                    <table style={{ fontSize: '13px' }} >
                    <tbody>
                        
                            {state.listData}
                    </tbody>
                     
                    </table>

                </div>
                <div className="div-table-foot">
                    <div className="div-table-foot-text">Total registros:&nbsp;{state.listDataJson.length}</div>
                </div>
            </div>
            <div>


                <table id="table-xls-formato" style={{ display: 'none' }}>
                    <thead>
                        <tr>
                            <td
                                style={{
                                    width: "13%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                chrcodigoproducto
                            </td>
                            <td
                                style={{
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                vchdescripcion
                            </td>
                            <td
                                style={{
                                    width: "8%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                numvalorventa
                            </td>
                            <td
                                style={{
                                    width: "8%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                numvalorrefventa
                            </td>
                            <td
                                style={{
                                    width: "8%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                numvalorcompra
                            </td>

                            <td
                                style={{
                                    width: "8%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                numvalordesc
                            </td>
                            <td
                                style={{
                                    width: "8%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                numstock
                            </td>
                            <td
                                style={{
                                    width: "8%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                Modelo
                            </td>
                            <td
                                style={{
                                    width: "8%",
                                    textAlign: "center",
                                    fontWeight: "bold",
                                }}
                            >
                                Código UNSPC
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <ServerException server={state.server}></ServerException>

            <div className="link-href">
                <Link to="/listaProductosOutlet">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Volver
                </Link>
            </div>
        </div>
    </>)
}
const actionTypeProductoUnspcCard={
    setNumUnspc: "setNumUnspc" ,
    ERROR: "ERROR"
}
const reducerProductoCard = (state, action) => {
    switch (action.type) {
        case actionTypeProductoUnspcCard.ERROR:
          return {
            ...state,
            server: action.server,
          };
        case actionTypeProductoUnspcCard.setNumUnspc:
          return {
            ...state,
            numUnspc: action.numUnspc,
          };    
        default:
          return state;
      }

};
function ProductoUnspcCard(props) {
  const [state, dispatch] = useReducer(reducerProductoCard, {
    outlet: props.outlet,
    numUnspc: (props.outlet.numUnspc===undefined ||props.outlet.numUnspc===null?"":props.outlet.numUnspc ),
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  async function handleEventEditUnspc() {
     //numProductoOutlet
     const rpt = await updateProductoOutletRow({
        
            chrCodigoProducto:state.outlet.chrCodigoProducto,
            numUnspc:state.numUnspc,
            numProductoVigencia:state.outlet.numProductoVigencia,
            numProductoOutlet:state.outlet.numProductoOutlet, 
       
    });
    console.log("handleEventEditUnspc");
    if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
            props.reload();                                
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
            dispatch({
                type: actionTypeProductoUnspcCard.ERROR,
                server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
            });
        }
    } else {
   
        dispatch({
            type: actionTypeProductoUnspcCard.ERROR,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
    }
  }
  function handleEventReload() {
    props.reload();
  }
  return (
    <>
      <input
        key={"_numUnspc" + state.outlet.index}
        type="text"
        value={state.numUnspc}
        onChange={(e) =>
          dispatch({
            type: actionTypeProductoUnspcCard.setNumUnspc,
            numUnspc: e.target.value,
          })
        }
      ></input>
      <i className="fa fa-save" onClick={(e) => handleEventEditUnspc()}></i>
      <i className="fa fa-close" onClick={(e) => handleEventReload()}></i>
      <ServerException server={state.server}></ServerException>

    </>
  );
}
export { ProductoUnspcCard};
/*
  {state.loading ? <tr><td colSpan="8"><LoadingClassic></LoadingClassic></td></tr> : ""}
                            {state.listData}
*/