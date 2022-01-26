//eslint-disable-next-line
import React, { useEffect, useReducer } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { chrRol, CRUD, HttpStatus, localStoreEnum, LOGGIN, SUCCESS_SERVER } from "../../service/ENUM";
import ServerException from "../../utils/serverException";
import * as XLSX from "xlsx";
import ReactHTMLTableToExcel from 'react-html-table-to-excel';
import { obtenerCliente } from "../../service/loginCliente.service";
import { listarProductoOutlet, saveUpdateProductoOutlet } from "../../service/producto.service";
import DatePicker  from "react-datepicker";
let actionType = {
    LISTDATA: "LISTDATA",
    setFile: "setFile",
    setListDataJson: "setListDataJson",
    setListDataJsonAndVigencia: "setListDataJsonAndVigencia",
    setDteDesde: "setDteDesde",
    setDteHasta: "setDteHasta",
    setNumEstado: "setNumEstado",
    setListaError: "setListaError",
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
        case actionType.setListDataJsonAndVigencia:
            return {
                ...state,
                listDataJson: action.listDataJson,
                listData: action.listData,
                dteDesde: action.dteDesde,
                dteHasta: action.dteHasta,
                numEstado: action.numEstado,
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
export default function OutletCargaProducto(props) {
    let params = useParams();
    let _numProductoVigencia = params.numProductoVigencia;
    let _crud = params.crud;
    let history = useHistory();
    const [state, dispatch] = useReducer(reducer, {
        file: undefined,
        listDataJson: [],
        listData: [],
        numProductoVigencia: _numProductoVigencia,
        dteDesde: "",
        dteHasta: "",
        numEstado: 1,
        listaError: [],
        crud: (_crud === 'update' ? CRUD.UPDATE : CRUD.INSERT),
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
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
            if (state.crud === CRUD.UPDATE) {
                handleEventListaProdOutlet(state.numProductoVigencia);
            }
        } else {
            history.push("/admin");
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


           // let _server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
            for (let index = 0; index < data.length; index++) {
                if (index >= 1) {
                    const element = data[index];
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
                        numValorDesc: (new Number(element[5]).toString() === 'NaN' ? '00.00' : parseFloat(element[5]).toFixed(2)),
                        //eslint-disable-next-line
                        numStock: (new Number(element[6]).toString() === 'NaN' ? '00.00' : parseFloat(element[6]).toFixed(2)),
                        numUnspc: "",
                        numProductoVigencia: 0,
                        numProductoOutlet: 0,

                    };
                    _listDataJson.push(_stock);
                    _listData.push(<tr key={_stock.index}>
                        <td>{_stock.index}</td>
                        <td>{_stock.chrCodigoProducto}</td>
                        <td>{_stock.vchDescripcion}</td>
                        <td>{_stock.numUnspc}</td>
                        <td className="td_number">{_stock.numValorVenta}</td>
                        <td className="td_number">{_stock.numValorRefVenta}</td>
                        <td className="td_number">{_stock.numValorCompra}</td>
                        <td className="td_number">{_stock.numValorDesc}</td>
                        <td className="td_number">{_stock.numStock}</td>
                        <td></td>
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

    async function handleEventListaProdOutlet(_numProductoVigencia) {
        const rpt = await listarProductoOutlet({ numProductoVigencia: _numProductoVigencia });
        console.log("handleEventListaProdOutlet");
        let _listDataJson = [];
        let _listData = [];
        let _dteDesde = "";
        let _dteHasta = "";
        let _numEstado = 0;
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            _dteDesde = json.productoOutletVigencia.dteDesde;
            _dteHasta = json.productoOutletVigencia.dteHasta;
            _numEstado = json.productoOutletVigencia.numEstado;
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                for (let index = 0; index < json.lista.length; index++) {
                    const _object = json.lista[index];
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

                    };
                    _listDataJson.push(_stock);
                    _listData.push(<tr key={_stock.index}>
                        <td>{_stock.index}</td>
                        <td>{_stock.chrCodigoProducto}</td>
                        <td>{_stock.vchDescripcion}</td>
                        <td>{_stock.numUnspc}</td>
                        <td className="td_number">{_stock.numValorVenta}</td>
                        <td className="td_number">{_stock.numValorRefVenta}</td>
                        <td className="td_number">{_stock.numValorCompra}</td>
                        <td className="td_number">{_stock.numValorDesc}</td>
                        <td className="td_number">{_stock.numStock}</td>
                        <td className="td_number"></td>
                    </tr>);
                }

                dispatch({
                    type: actionType.setListDataJsonAndVigencia,
                    listDataJson: _listDataJson,
                    listData: _listData,
                    dteDesde: Date.parse(_dteDesde),
                    dteHasta: Date.parse(_dteHasta),
                    numEstado: _numEstado,
                    server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_OK },
                })
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
                     history.push("/listaProductosOutlet");
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

    return (<>
        <div className="registrar-stock">
            <div className="link-href">
                <Link to="/listaProductosOutlet">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Volver
                </Link>
            </div>
            <h3>{
                state.crud === CRUD.UPDATE ? "Detalle de Productos del Outlet" : "Cargar Productos del Outlet"}</h3>

            <div className="form-body-stock">
                <div className="form-accion">
                    <table>
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
                    </table>

                </div>
                <hr />

                <div className="div-table">
                    <table style={{ fontSize: '13px' }} >
                        <thead>
                            <tr>
                                <td style={{ width: '3%' }}>Nro</td>
                                <td style={{ width: '80px' }}>Código</td>
                                <td style={{ minWidth: '280px' }}>Descripción</td>
                                <td style={{ width: '8%', minWidth: '60px', textAlign: 'center' }} title="Precio venta">UNSPC</td>
                                <td style={{ width: '8%', minWidth: '120px', textAlign: 'center' }} title="Precio venta">Pr.Venta</td>
                                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Precio venta Igv">Pr.Venta Referencial</td>
                                <td style={{ width: '8%', minWidth: '120px', textAlign: 'center' }} title="Precio venta Promocional">Pr.De Compra</td>
                                <td style={{ width: '8%', minWidth: '120px', textAlign: 'center' }} title="Precio venta Igv Promocional">Descuento</td>
                                <td style={{ width: '8%', minWidth: '120px', textAlign: 'center' }} title="">Stock</td>
                                

                            </tr>
                        </thead>
                        <tbody>
                            {state.listData}
                        </tbody>
                    </table>

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
/*
  {state.loading ? <tr><td colSpan="8"><LoadingClassic></LoadingClassic></td></tr> : ""}
                            {state.listData}
*/