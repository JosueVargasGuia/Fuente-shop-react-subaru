
import React, { useEffect, useReducer } from "react";
import { chrRol, HttpStatus, localStoreEnum, LOGGIN, SUCCESS_SERVER } from "../../service/ENUM";
import { obtenerCliente, obtenerListaUsuario, quitarUsuarioAdministrador } from "../../service/loginCliente.service";
import { Link, useHistory } from "react-router-dom";
import ServerException from "../../utils/serverException";
import { Paginacion } from "../../producto/productoFilter";
import { ModalConfirmar } from "../../utils/modal";
const LIMITE = 9;
let actionType = {
    ERROR: "ERROR",
    LSTUSUARIO: "LSTUSUARIO",
    SHOW_MODAL: "SHOW_MODAL",
    SET_REMOVE_ADMIN: "SET_REMOVE_ADMIN"
}
const reducer = (state, action) => {
    switch (action.type) {
        case actionType.LSTUSUARIO:
            return {
                ...state,
                listaUsuario: action.listaUsuario,
                currentPage: action.currentPage,
                totalRegistros: action.totalRegistros
            };
        case actionType.ERROR:
            return {
                ...state,
                server: action.server,
            };
        case actionType.SHOW_MODAL:
            return {
                ...state,
                showModal: action.showModal
            };
        case actionType.SET_REMOVE_ADMIN:
            return {
                ...state,
                numCodigoClienteUsuario: action.numCodigoClienteUsuario,
                numCodigoCliente: action.numCodigoCliente,
                showModal: action.showModal,
            };
        default:
            return state;
    }
}
export default function ListaUsuario(props) {
    let history = useHistory();

    const [state, dispatch] = useReducer(reducer, {
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
        listaUsuario: [],
        totalRegistros: 25,
        currentPage: 1,
        showModal: false,
        title: "Quitar Usuario Admin",
        mensaje: "¿Estas seguro de quitar Usuario Admin?",
        numCodigoClienteUsuario: 0,
        numCodigoCliente: 0,

    });

    useEffect(() => {
        handleValidarCliente(props.numCodigoCliente);
        HandleEventobtenerListaUsuario(1);
        console.log("useEffect[ListaUsuario]");
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

    async function HandleEventobtenerListaUsuario(_currentPage) {
        let _listaUsuario = [];
        let _totalRegistros = 0;
        const rpt = await obtenerListaUsuario({ page: _currentPage, limit: LIMITE });
        console.log("HandleEventobtenerListaUsuario");
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            console.log(json);
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                for (let index = 0; index < json.lista.length; index++) {
                    const usuario = json.lista[index];
                    <td style={{ 'textAlign': 'center' }}>{usuario.numCodigoCliente}</td>
                    _totalRegistros = usuario.totalRegistros;
                    _listaUsuario.push(
                        <tr key={index}>
                            <td style={{ 'textAlign': 'center' }}>{usuario.numCodigoCliente}</td>
                            <td style={{ 'textAlign': 'center' }}>{usuario.numCodigoClienteUsuario}</td>
                            <td>{usuario.chrEmail}</td>
                            <td style={{ 'textAlign': 'center' }}>{usuario.cliente.vchDocumento}</td>
                            <td>{usuario.cliente.vchApellidoMaterno + ' ' + usuario.cliente.vchApellidoPaterno + ' ' + usuario.cliente.vchNombre}</td>
                            <td style={{ 'textAlign': 'center' }}>{usuario.dteModificacion}</td>
                            <td style={{ 'textAlign': 'center' }}>
                                <Link to={`/usuarioAdmin/${usuario.numCodigoCliente}/${usuario.numCodigoClienteUsuario}`}><i className="fa fa-pencil" aria-hidden="true" title="Editar Usuario"></i></Link>
                                <i className="fa fa-times" aria-hidden="true" title="Quitar Administrador" onClick={(e) =>
                                    dispatch({
                                        type: actionType.SET_REMOVE_ADMIN,
                                        numCodigoCliente: usuario.numCodigoCliente,
                                        numCodigoClienteUsuario: usuario.numCodigoClienteUsuario,
                                        showModal: true,
                                    })} ></i>
                            </td>
                        </tr>
                    );
                }
                dispatch({
                    type: actionType.LSTUSUARIO,
                    listaUsuario: _listaUsuario,
                    currentPage: _currentPage,
                    totalRegistros: _totalRegistros
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
    function handleEventToPage(_currentPage) {
        HandleEventobtenerListaUsuario(_currentPage);
    }

    async function hadleEventRemoverAdmin() {
        const rpt = await quitarUsuarioAdministrador({ numCodigoClienteUsuario: state.numCodigoClienteUsuario, numCodigoCliente: state.numCodigoCliente });
        if (rpt.status === HttpStatus.HttpStatus_OK) {
            const json = await rpt.json();
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
                HandleEventobtenerListaUsuario(1);
                dispatch({
                    type: actionType.SHOW_MODAL,
                    showModal: false
                });
            }
            if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
                dispatch({
                    type: actionType.SHOW_MODAL,
                    showModal: false
                });
                dispatch({
                    type: actionType.ERROR,
                    server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
                });
            }
        } else {
            dispatch({
                type: actionType.SHOW_MODAL,
                showModal: false
            });
            dispatch({
                type: actionType.ERROR,
                server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
            });
        }
    }
    function hadleEventRemoverAdminHidden() {
        dispatch({
            type: actionType.SHOW_MODAL,
            showModal: false
        });
    }
    return (
        <div className="registrar-cliente">
            <div className="link-href">
                <Link to="/dashboardAdmin">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Panel de Control
                </Link>
            </div>
            <h3>Listado de Usuarios</h3>
            <div className="form-body-usuario">
                <div className="div-table-head">
                    <Link to={`/usuarioAdmin/0/0`}>
                        <i className="fa fa-user-plus" aria-hidden="true">&nbsp;Agregar</i></Link>
                </div>

                <div className="div-table">
                    <table >
                        <thead>
                            <tr>
                                <td style={{ 'width': '10%' }}>Cod. Cliente</td>
                                <td style={{ 'width': '10%' }}>Cod. Usuario</td>
                                <td style={{ 'width': '20%' }}>Usuario</td>
                                <td style={{ 'width': '10%' }}>Documento</td>
                                <td >Apellido y Nombres</td>
                                <td style={{ 'width': '10%' }}>Fecha Mod.</td>
                                <td style={{ 'width': '10%' }}>Opciones</td>
                            </tr>
                        </thead>
                        <tbody>
                            {state.listaUsuario}
                        </tbody>

                    </table></div>
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
            <div className="link-href">
                <Link to="/dashboardAdmin">
                    <i className="fa fa-home" aria-hidden="true"></i>
                    Panel de Control
                </Link>
            </div>

            {state.showModal === true ? (
                <ModalConfirmar
                    show={state.showModal}
                    title={state.title}
                    mensaje={state.mensaje}
                    handleActionSi={hadleEventRemoverAdmin}
                    handleActionNo={hadleEventRemoverAdminHidden}
                ></ModalConfirmar>
            ) : (
                ""
            )}

            <ServerException server={state.server}></ServerException>
        </div>)
}