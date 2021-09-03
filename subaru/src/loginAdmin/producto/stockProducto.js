//eslint-disable-next-line
import { useEffect, useReducer, useState } from "react";
//eslint-disable-next-line
import { Link, useHistory } from "react-router-dom";
import * as XLSX from "xlsx";
import { chrRol, HttpStatus, localStoreEnum, LOGGIN, SUCCESS_SERVER } from "../../service/ENUM";
import { obtenerCliente } from "../../service/loginCliente.service";
import { LoadingClassic } from "../../utils/loading"
import ServerException from "../../utils/serverException";
import { listaProductoStock, actualizarProductosStock } from "../../service/producto.service";
let actionType = {
    LISTDATA: "LISTDATA",
    ERROR: "ERROR"
};
const reducer = (state, action) => {
    //eslint-disable-next-line
    switch (action.type) {
        case actionType.LISTDATA:
            return {
                ...state,
                listData: action.listData,
                listDataJson: action.listDataJson,
                server: action.server,
                loading: action.loading,
                upFile: action.upFile
            };
        case actionType.ERROR:
            return {
                ...state,
                server: action.server,
            };
        default:
            return state;
    }
}
export default function StockProducto(props) {
 
    const [state, dispatch] = useReducer(reducer, {
        listData: [],
        listDataJson: [],
        loading: false,
        upFile: true,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    });
    const [file, setFile] = useState("");
    let history = useHistory();
    useEffect(() => {
        handleObtenerCliente(props.numCodigoCliente);
        console.log("useEffect[DashboardAdmin]");
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
     
        if (JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)) !== null) {
            if (!(JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)).chrRol === chrRol.ROLE_ADMIN
                && _rol === chrRol.ROLE_ADMIN
                && localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN)) {
                 history.push("/admin");
            }
        } else {
            history.push("/admin");
        }

    }


    function handleFileLoad(file) {
        dispatch({
            type: actionType.LISTDATA,
            listData: [],
            listDataJson: [],
            loading: true,
            upFile: true,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT }
        });
        /* Boilerplate to set up FileReader */
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

            let _listDataJson = [];
            let _server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
            let _validaRegistroRpt = false;
            for (let index = 0; index < data.length; index++) {
                const element = data[index];
                let _stock = {
                    chrLinea: element[0],
                    chrCodigoProducto: element[1],
                    vchDescripcion: element[2],
                    //eslint-disable-next-line
                    numValorVentaPv: (new Number(element[3]).toString() === 'NaN' ? '00.00' : parseFloat(element[3]).toFixed(2)),  /*Precio de venta promocional */
                    //eslint-disable-next-line
                    numValorVentaPvsIgv: (new Number(element[4]).toString() === 'NaN' ? '00.00' : parseFloat(element[4]).toFixed(2)), /*Precio de venta sugerido +IGV */
                    //eslint-disable-next-line
                    numValorVentaPvp: (new Number(element[5]).toString() === 'NaN' ? '00.00' : parseFloat(element[5]).toFixed(2)), /*Precio de venta promocional */
                    //eslint-disable-next-line
                    numValorVentaPvspIgv: (new Number(element[6]).toString() === 'NaN' ? '00.00' : parseFloat(element[6]).toFixed(2)), /*Precio de venta Promocional sugerido +IGV */
                    numStock: element[7],
                    duplicado: false,
                    observacion: "",
                };

                if (index >= 1) {
                    /*Validacion de registros */
                    for (let j = 0; j < _listDataJson.length; j++) {
                        const _vstock = _listDataJson[j];
                        if (_vstock.chrCodigoProducto === _stock.chrCodigoProducto) {
                            _validaRegistroRpt = true;
                            _stock.duplicado = true;
                            _listDataJson[j].duplicado = true;
                            break;
                        }
                    }
                    _listDataJson.push(_stock);
                }
                if (_validaRegistroRpt === true) {
                    _server = { error: "existen valores duplicados", success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
                }
            }

            obterListaStockValidacion(_listDataJson, _server);



        };

        if (file.target.files[0] !== undefined) {
            if (rABS) {
                reader.readAsBinaryString(file.target.files[0]);
            } else {
                reader.readAsArrayBuffer(file.target.files[0]);
            }
            setFile("");
        } else {
            setFile("");
            dispatch({
                type: actionType.LISTDATA,
                listData: [],
                listDataJson: [],
                loading: false,
                upFile: false,
                server: { error: "Archivo no cargado", success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
            });
        }


    }
    async function obterListaStockValidacion(_listDataJson, _server) {
        const server = { error: _server.error, success: _server.success };
        let listaStock = [];
        let _listData = [];
        let _upFile = false;
        /*Obtner datos para validaciones */
        const rpt = await listaProductoStock({ listaStock: _listDataJson });
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                const lista = json.listaStock;

                for (let i = 0; i < lista.length; i++) {
                    const e = lista[i];
                    if (e.chrCodigoProducto === '02.0.242.236.528') {
                        console.log(e);
                    }
                    listaStock.push({
                        chrLinea: e.chrLinea,
                        chrCodigoProducto: e.chrCodigoProducto,
                        vchDescripcion: e.vchDescripcion,
                        numValorVentaPv: e.numValorVentaPv,  /*Precio de venta promocional */
                        numValorVentaPvsIgv: e.numValorVentaPvsIgv, /*Precio de venta sugerido +IGV */
                        numValorVentaPvp: e.numValorVentaPvp, /*Precio de venta promocional */
                        numValorVentaPvspIgv: e.v, /*Precio de venta Promocional sugerido +IGV */
                        numStock: e.numStock,
                        duplicado: e.duplicado,
                        observacion: e.observacion,
                    });
                }

                server.error = "";
                server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
            }
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                server.error = json.response.error;
                server.success = SUCCESS_SERVER.SUCCES_SERVER_INFO;
            }
        } else {
            console.log('SUCCES_SERVER_ERROR');
            server.error = "";
            server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR;
        }


        for (let k = 0; k < listaStock.length; k++) {
            const v_stock = listaStock[k];
            if (_upFile === false) {
                if (v_stock.duplicado) {
                    _upFile = true;
                }
                if (v_stock.observacion !== 'OK') {
                    _upFile = true;
                }
            }
            _listData.push(<tr key={k} style={(v_stock.duplicado ? { backgroundColor: '#f63232', color: 'white' } : {})} >
                <td>{v_stock.chrCodigoProducto}</td>
                <td style={{ minWidth: '380px' }}>{v_stock.vchDescripcion}</td>
                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }}>{v_stock.numValorVentaPv}</td>
                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }}>{v_stock.numValorVentaPvsIgv}</td>
                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }}>{v_stock.numValorVentaPvp}</td>
                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }}>{v_stock.numValorVentaPvspIgv}</td>
                <td style={{ width: '8%', minWidth: '120px', textAlign: 'center' }}>{v_stock.numStock}</td>
                <td style={{ width: '12%', minWidth: '180px' }}>{v_stock.observacion}</td>
            </tr>);
        }

        dispatch({
            type: actionType.LISTDATA,
            listData: _listData,
            listDataJson: listaStock,
            loading: false,
            upFile: _upFile,
            server: server
        });



    }
    async function handleEnventUpdatestock() {
        const rpt = await actualizarProductosStock({ listaStock: state.listDataJson });
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                dispatch({
                    type: actionType.LISTDATA,
                    listData: [],
                    listDataJson: [],
                    loading: false,
                    upFile: true,
                    server: { error: "Se actualizo correctamente el stock", success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
                });

            }
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                dispatch({
                    type: actionType.ERROR,
                    server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_INFO }
                });
            }
        } else {
            dispatch({
                type: actionType.ERROR,
                server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
            });
        }

    }
    return (<>
        <div className="registrar-stock">
            <div className="link-href">
                <Link to="/dashboardAdmin">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Panel de Control
                </Link>
            </div>
            <h3>Cargar Stock de Producto</h3>
            <div className="form-body-stock">
                <div className="form-accion">
                    <input className="form-ctrl form-ctrl-lg"
                        type="file"
                        accept=".xlsx"
                        name="stockFile"
                        id="stockFile"
                        value={file}
                        onChange={handleFileLoad}
                        placeholder="Archivo de stock de productos"
                    >
                    </input>
                    <button
                        className=" btn btn-primary fa fa-save"
                        onClick={handleEnventUpdatestock}
                        disabled={state.upFile}
                    >&nbsp;Actualizar</button>
                </div>
                <hr />

                <div className="div-table">
                    <table style={{ fontSize: '13px' }} >
                        <thead>
                            <tr>
                                <td style={{ width: '10%' }}>Código</td>
                                <td style={{ minWidth: '380px' }}>Descripción</td>
                                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Precio venta">Pr.Venta</td>
                                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Precio venta Igv">Pr.Venta Igv</td>
                                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Precio venta Promocional">Pr.Venta Prom.</td>
                                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Precio venta Igv Promocional">Pr.Venta Igv Prom.</td>
                                <td style={{ width: '8%', minWidth: '120px', textAlign: 'center' }} title="">Stock</td>
                                <td style={{ width: '12%', minWidth: '180px', textAlign: 'center' }} title="">Observación</td>
                            </tr>
                        </thead>
                        <tbody>

                            {state.loading ? <tr><td colSpan="8"><LoadingClassic></LoadingClassic></td></tr> : ""}
                            {state.listData}
                        </tbody>
                    </table>
                </div>
            </div>
            <ServerException server={state.server}></ServerException>

            <div className="link-href">
                <Link to="/dashboardAdmin">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Panel de Control
                </Link>
            </div>
        </div>
    </>)
}