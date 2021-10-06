
import React, { useEffect, useReducer } from "react";
import { chrRol, FilterCorreo, HttpStatus, localStoreEnum, LOGGIN, SUCCESS_SERVER, CRUD } from "../../service/ENUM";
import { obtenerCliente } from "../../service/loginCliente.service";
import { obtenerListaCorreo, registrarCorreoJobs } from "../../service/correo.service";
import { Link, useHistory } from "react-router-dom";
import ServerException from "../../utils/serverException";
import { Modal } from "react-bootstrap";
import { ModalConfirmar } from "../../utils/modal";
let actionType = {
    ERROR: "ERROR",
    ERROR_FORM: "ERROR_FORM",
    LSTCORREO: "LSTCORREO",
    SET_CORREO: "SET_CORREO",
    SHOW_MODAL: "SHOW_MODAL",
    SHOW_MODAL_CONFIRMAR: "SHOW_MODAL_CONFIRMAR",
    vchCorreo: "vchCorreo",
    flgTipoCambioRegistrado: "flgTipoCambioRegistrado",
    flgTipoCambioTomado: "flgTipoCambioTomado",
    flgDestinoOc: "flgDestinoOc",

}
const reducer = (state, action) => {
    let _correo = state.correoJobs;
    switch (action.type) {
        case actionType.ERROR:
            return {
                ...state,
                server: action.server,
            };

        case actionType.ERROR_FORM:
            return {
                ...state,
                error: action.error,
            };
        case actionType.SHOW_MODAL:
            return {
                ...state,
                modalShow: action.modalShow
            };
        case actionType.SHOW_MODAL_CONFIRMAR:

            return {
                ...state,
                modalConfirmarShow: action.modalConfirmarShow,
                numCodigoCorreoJobsOnline: action.numCodigoCorreoJobsOnline,
            };
        case actionType.LSTCORREO:
            return {
                ...state,
                listaCorreo: action.listaCorreo,
            };
        case actionType.SET_CORREO:
            _correo.vchCorreo = action.vchCorreo;
            _correo.flgTipoCambioRegistrado = action.flgTipoCambioRegistrado;
            _correo.flgTipoCambioTomado = action.flgTipoCambioTomado;
            _correo.flgDestinoOc = action.flgDestinoOc;
            _correo.numCodigoCorreoJobsOnline = action.numCodigoCorreoJobsOnline;
            _correo.accion = action.accion;
            return {
                ...state,
                correoJobs: _correo,
                modalShow: action.modalShow,
                error: action.error
            };


        case actionType.vchCorreo:
            _correo.vchCorreo = action.vchCorreo;
            return {
                ...state,
                correoJobs: _correo,
            };
        case actionType.flgDestinoOc:
            _correo.flgDestinoOc = action.flgDestinoOc;
            return {
                ...state,
                correoJobs: _correo,
            };
        case actionType.flgTipoCambioRegistrado:
            _correo.flgTipoCambioRegistrado = action.flgTipoCambioRegistrado;
            return {
                ...state,
                correoJobs: _correo,
            };
        case actionType.flgTipoCambioTomado:
            _correo.flgTipoCambioTomado = action.flgTipoCambioTomado;
            return {
                ...state,
                correoJobs: _correo,
            };

        default:
            return state;
    }
}
export default function ListaCorreoJobs(props) {
    let history = useHistory();
    const [state, dispatch] = useReducer(reducer, {
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
        listaCorreo: [],
        modalShow: false,
        modalConfirmarShow: false,
        correoJobs: {
            vchCorreo: "",
            flgTipoCambioRegistrado: 0,
            flgTipoCambioTomado: 0,
            flgDestinoOc: 0,
            numCodigoCorreoJobsOnline: 0,
            accion: CRUD.SELECT
        },
        numCodigoCorreoJobsOnline: 0,
        error: { vchCorreo: { mensaje: "", isValidado: false } }
    });

    useEffect(() => {
        handleValidarCliente(props.numCodigoCliente);
        console.log("useEffect[ListaCorreoJobs]");
        HandleEventobtenerListaCorreo(FilterCorreo.FILTER_ALL);

        //eslint-disable-next-line
    }, []);
    async function handleValidarCliente(_numCodigoCliente) {
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

    async function HandleEventobtenerListaCorreo(_filterCorreo) {
        let _listaCorreo = [];
        const rpt = await obtenerListaCorreo({ filterCorreo: _filterCorreo });
        console.log("HandleEventobtenerListaCorreo");
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            console.log(json);
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                for (let index = 0; index < json.lista.length; index++) {
                    const correoJobs = json.lista[index];
                    _listaCorreo.push(
                        <tr key={index}>
                            <td style={{ 'textAlign': 'start' }}>{correoJobs.vchCorreo}</td>
                            <td style={{ 'textAlign': 'center' }}>{correoJobs.flgDestinoOc === 1 ? 'Si' : ''}</td>
                            <td style={{ 'textAlign': 'center' }}>{correoJobs.flgTipoCambioRegistrado === 1 ? 'Si' : ''}</td>
                            <td style={{ 'textAlign': 'center' }}>{correoJobs.flgTipoCambioTomado === 1 ? 'Si' : ''}</td>

                            <td style={{ 'textAlign': 'center' }}>
                                <i className="fa fa-pencil" aria-hidden="true" title="Modificar Correo"
                                    onClick={(e) => dispatch({
                                        type: actionType.SET_CORREO,
                                        vchCorreo: correoJobs.vchCorreo,
                                        flgTipoCambioRegistrado: (correoJobs.flgTipoCambioRegistrado === 1 ? true : false),
                                        flgTipoCambioTomado: (correoJobs.flgTipoCambioTomado === 1 ? true : false),
                                        flgDestinoOc: (correoJobs.flgDestinoOc === 1 ? true : false),
                                        numCodigoCorreoJobsOnline: correoJobs.numCodigoCorreoJobsOnline,
                                        accion: CRUD.UPDATE,
                                        modalShow: true,
                                        error: { vchCorreo: { mensaje: "", isValidado: false } }
                                    })}></i>
                                <i className="fa fa-times" aria-hidden="true" title="Quitar Correo"
                                    onClick={(e) => dispatch({
                                        type: actionType.SHOW_MODAL_CONFIRMAR,
                                        modalConfirmarShow: true,
                                        numCodigoCorreoJobsOnline: correoJobs.numCodigoCorreoJobsOnline
                                    })}></i>
                            </td>

                        </tr>
                    );
                }
                dispatch({
                    type: actionType.LSTCORREO,
                    listaCorreo: _listaCorreo,
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
    async function HandleEventSaveCorreoJobs() {
         
        const valError = await handleValidarForm(state.correoJobs);
        if (valError.isValido) {
            console.log(state.correoJobs);
            const rpt = await registrarCorreoJobs({
                vchCorreo: state.correoJobs.vchCorreo,
                flgTipoCambioRegistrado: (state.correoJobs.flgTipoCambioRegistrado === true ? 1 : 0),
                flgTipoCambioTomado: (state.correoJobs.flgTipoCambioTomado === true ? 1 : 0),
                flgDestinoOc: (state.correoJobs.flgDestinoOc === true ? 1 : 0),
                numCodigoCorreoJobsOnline: state.correoJobs.numCodigoCorreoJobsOnline,
                crud: state.correoJobs.accion.descripcion
            });
            if (rpt.status === HttpStatus.HttpStatus_OK) {
                const json = await rpt.json();
                if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                    dispatch({ type: actionType.SHOW_MODAL, modalShow: false })
                    HandleEventobtenerListaCorreo(FilterCorreo.FILTER_ALL);
                }
                if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                    dispatch({
                        type: actionType.ERROR,
                        server: {
                            error: json.response.error,
                            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
                        },
                    });
                }
            } else {
                dispatch({
                    type: actionType.ERROR,
                    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },

                });
            }
        } else {
            dispatch({
                type: actionType.ERROR_FORM,
                error: valError,
            });
        }
    }

    async function handleEventModalConfirmarEliminacion() {

        const rpt = await registrarCorreoJobs({
            numCodigoCorreoJobsOnline: state.numCodigoCorreoJobsOnline,
            crud: CRUD.DELETE.descripcion
        });
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                dispatch({
                    type: actionType.SHOW_MODAL_CONFIRMAR,
                    modalConfirmarShow: false,
                    numCodigoCorreoJobsOnline: 0
                });
                HandleEventobtenerListaCorreo(FilterCorreo.FILTER_ALL);
            }
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                dispatch({
                    type: actionType.ERROR,
                    server: {
                        error: json.response.error,
                        success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
                    },
                });
                dispatch({
                    type: actionType.SHOW_MODAL_CONFIRMAR,
                    modalConfirmarShow: false,
                    numCodigoCorreoJobsOnline: 0
                })
            }
        } else {
            dispatch({
                type: actionType.ERROR,
                server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },

            });
            dispatch({
                type: actionType.SHOW_MODAL_CONFIRMAR,
                modalConfirmarShow: false,
                numCodigoCorreoJobsOnline: 0
            })
        }
    }
    return (
        <div className="registrar-correo">
            <div className="link-href">
                <Link to="/dashboardAdmin">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Panel de Control
                </Link>
            </div>
            <h3>Administrador de Correos</h3>
            <div className="form-body-correo">
                <div className="div-table-head">
                    <i className="fa fa-envelope-square "
                        aria-hidden="true"
                        onClick={(e) =>
                            dispatch({
                                type: actionType.SET_CORREO,
                                vchCorreo: "",
                                flgTipoCambioRegistrado: 0,
                                flgTipoCambioTomado: 0,
                                flgDestinoOc: 0,
                                numCodigoCorreoJobsOnline: 0,
                                accion: CRUD.INSERT,
                                modalShow: true,
                                error: { vchCorreo: { mensaje: "", isValidado: false } }
                            })}>&nbsp;Agregar</i>
                </div>

                <div className="div-table">
                    <table >
                        <thead>
                            <tr>
                                <td>Correo</td>
                                <td style={{ 'width': '15%' }}>Destino OC</td>
                                <td style={{ 'width': '20%' }}>Alerta Tip.Cambio Registrado</td>
                                <td style={{ 'width': '20%' }}>Alerta Tip.Cambio Tomado</td>
                                <td style={{ 'width': '15%' }}>Opciones</td>

                            </tr>
                        </thead>
                        <tbody>
                            {state.listaCorreo}
                        </tbody>

                    </table></div>


            </div>
            <div className="link-href">
                <Link to="/dashboardAdmin">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Panel de Control
                </Link>
            </div>

            <Modal
                className="modal-direccion"
                show={state.modalShow}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onHide={(e) => dispatch({ type: actionType.SHOW_MODAL, modalShow: false })}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        {state.correoJobs.accion.codigoCrud === CRUD.UPDATE.codigoCrud
                            ? "Actualizar correo"
                            : "Registrar correo"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="div-form-correo">
                        <div className="div-form-correo-row">
                            <label htmlFor="vchCorreo" className="label-vchCorreo">Correo:</label>
                            <input
                                type="text"
                                name="vchDocumento"
                                className={`form-control imput-registro-width ${state.error.vchCorreo.isValidado ? 'imput-registro-error' : ''}`}
                                autoComplete="false"
                                autoSave="false"
                                value={state.correoJobs.vchCorreo}
                                placeholder={state.error.vchCorreo.isValidado ? state.error.vchCorreo.mensaje : ""}
                                title={state.error.vchCorreo.isValidado ? state.error.vchCorreo.mensaje : ""}
                                onChange={(e) =>
                                    dispatch({
                                        type: actionType.vchCorreo,
                                        vchCorreo: e.target.value,
                                    })
                                }
                            ></input>
                        </div>

                        <div className="div-form-correo-row">
                            <input
                                type="checkbox"
                                name="flgDestinoOc"
                                className="form-control"
                                autoComplete="false"
                                autoSave="false"
                                checked={state.correoJobs.flgDestinoOc}
                                onChange={(e) =>
                                    dispatch({
                                        type: actionType.flgDestinoOc,
                                        flgDestinoOc: e.target.checked,
                                    })
                                }
                            ></input>
                            <label htmlFor="flgDestinoOc" className="label-flgDestinoOc">Envió de correo con la orden de compra al finalizar la venta al tomar stock virtual</label>
                        </div>
                        <div className="div-form-correo-row">
                            <input
                                type="checkbox"
                                name="flgTipoCambioRegistrado"
                                className="form-control"
                                autoComplete="false"
                                autoSave="false"
                                checked={state.correoJobs.flgTipoCambioRegistrado}
                                onChange={(e) =>
                                    dispatch({
                                        type: actionType.flgTipoCambioRegistrado,
                                        flgTipoCambioRegistrado: e.target.checked,
                                    })
                                }
                            ></input>
                            <label htmlFor="flgTipoCambioRegistrado" className="label-flgTipoCambioRegistrado">Alerta para registrar el tipo de cambio</label>
                        </div>

                        <div className="div-form-correo-row">
                            <input
                                type="checkbox"
                                name="flgTipoCambioTomado"
                                className="form-control"
                                autoComplete="false"
                                autoSave="false"
                                checked={state.correoJobs.flgTipoCambioTomado}
                                onChange={(e) =>
                                    dispatch({
                                        type: actionType.flgTipoCambioTomado,
                                        flgTipoCambioTomado: e.target.checked,
                                    })
                                }
                            ></input>
                            <label htmlFor="flgTipoCambioTomado" className="label-flgTipoCambioTomado">Alerta de que se tomo el tipo de cambio del día anterior.</label>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer >
                    <button
                        onClick={HandleEventSaveCorreoJobs}
                        className="btn btn-primary"
                    >
                        {state.correoJobs.accion.estado}
                    </button>
                    <button
                        onClick={(e) => dispatch({ type: actionType.SHOW_MODAL, modalShow: false })} className="btn btn-primary">
                        Cerrar
                    </button>
                </Modal.Footer>
            </Modal>
            <ModalConfirmar
                show={state.modalConfirmarShow}
                title={"Quitar Correo"}
                mensaje={"¿Estas seguro de quitar el correo?"}
                handleActionSi={handleEventModalConfirmarEliminacion}
                handleActionNo={(e) => dispatch({
                    type: actionType.SHOW_MODAL_CONFIRMAR,
                    modalConfirmarShow: false,
                    numCodigoCorreoJobsOnline: 0
                })}
            ></ModalConfirmar>

            <ServerException server={state.server}></ServerException>
        </div>)
}


function handleValidarForm(state) {
    /*Iniciando la estructura del objeto para el control de mensajes depues de la validacion */

    let _error = {
        vchCorreo: { mensaje: "", isValidado: false },
        isValido: true,
    };
    console.log(validar_email(state.vchCorreo));
    /*Criterios de validaciones */
    let isValido = true;
    if (!state.vchCorreo) {
        _error.vchCorreo.mensaje = "El correo es requerido";
        _error.vchCorreo.isValidado = true;
        isValido = false;

    } else if (validar_email(state.vchCorreo) === false) {
        _error.vchCorreo.mensaje = "El formato el correo no es valido";
        _error.vchCorreo.isValidado = true;
        isValido = false;
    }
    _error.isValido = isValido;
    return _error;
}
function validar_email(email) {
    var regex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email) ? true : false;
}