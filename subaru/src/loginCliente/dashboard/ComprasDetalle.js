import React, {  useReducer } from 'react';
import {
    obtenerTusComprasDetalle
} from "../../service/cotizacion.service";
import { HttpStatus, SUCCESS_SERVER } from '../../service/ENUM';


let actionType = {
    LOAD: "LOAD",
};
const reducer = (state, action) => {
    switch (action.type) {
        case actionType.LOAD:
            return {
                ...state,
                server: action.server,
                listaDetalle: action.listaDetalle
            };

        default:
            return state;
    }
};
export default function TusCompras(props) {
    const [state, dispatch] = useReducer(reducer, {
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
        listaDetalle: []
    });
    async function handleEnventLoadDetalle() {
        let _listaDetalle = [];


        const rpt = await obtenerTusComprasDetalle({
            numCodigoCotizacionOnline: props.cotizacion.numCodigoCotizacionOnline
        });

        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            console.log(json);
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                _listaDetalle = [];
                for (let k = 0; k < json.listaDetalle.length; k++) {
                    const detelle = json.listaDetalle[k];
                    console.log(detelle);
                    _listaDetalle.push(
                        <tr key={k}>
                            <td style={{ width: '10%' , textAlign: 'center'}}>{k+1}</td>
                            <td style={{ width: '10%' }}>{detelle.producto.chrCodigoProducto}</td>
                            <td style={{ minWidth: '380px' }}>{detelle.producto.vchDescripcion}</td>
                            <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Cantidad">{detelle.numCantidad}</td>
                            <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Precio venta">{detelle.numTotalDisplay}</td>

                        </tr>
                    );
                }
                dispatch({ type: actionType.LOAD, listaDetalle: _listaDetalle, server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT } });
            }
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                dispatch({
                    type: actionType.LOAD, listaDetalle: [],
                    server: {
                        error: json.response.error,
                        success: SUCCESS_SERVER.SUCCES_SERVER_INFO
                    },
                });
            }
        } else {
            dispatch({
                type: actionType.LOAD, listaDetalle: [],
                server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR }
            });
        }
    }
    return (<div className="form-body-detalle">
        <div className="form-body-detalle-header" key={props.cotizacion.numCodigoCotizacionOnline}>
            <button
                className=" btn btn-primary fa fa-cart-plus"
                onClick={handleEnventLoadDetalle}
                disabled={state.upFile}
            >&nbsp;Detalle</button>
        </div>
        {state.listaDetalle.length === 0 ? "" :
            <div className="form-body-detalle-body">
                <div className="div-table">
                    <table style={{ fontSize: '13px' }} >
                        <thead>
                            <tr>
                                <td style={{ width: '10%' }}>Item</td>
                                <td style={{ width: '10%' }}>Código</td>
                                <td style={{ minWidth: '380px' }}>Descripción</td>
                                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Cantidad">Cantidad</td>
                                <td style={{ width: '12%', minWidth: '120px', textAlign: 'center' }} title="Precio venta">Pr.Venta</td>

                            </tr>
                        </thead>
                        <tbody>
                            {state.listaDetalle}
                        </tbody>
                    </table>
                </div>
            </div>
        }


    </div>)
}