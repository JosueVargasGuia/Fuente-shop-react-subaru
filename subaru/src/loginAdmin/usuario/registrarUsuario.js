
import React, { useEffect, useReducer } from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { chrRol, CRUD, HttpStatus, localStoreEnum, LOGGIN, SUCCESS_SERVER, TipoDocumento } from "../../service/ENUM";
import { obtenerCliente, obtenerListaUsuario, registrarCliente } from "../../service/loginCliente.service";
import ServerException from "../../utils/serverException";
import zxcvbn from 'zxcvbn';

let actionType = {
  ROL: "ROL",
  REQUETS: "REQUETS",
  LOAD_USUARIO: "LOAD_USUARIO",
  vchNombre: "vchNombre",
  vchApellidoPaterno: "vchApellidoPaterno",
  vchApellidoMaterno: "vchApellidoMaterno",
  chrEmail: "chrEmail",
  numTipoCliente: "numTipoCliente",
  vchDocumento: "vchDocumento",
  vchNombreCompleto: "vchNombreCompleto",
  vchDireccion: "vchDireccion",
  vchTelefonoFijo: "vchTelefonoFijo",
  vchTelefonoMovil: "vchTelefonoMovil",
  chrPassword: "chrPassword",
  ERROR: "ERROR",
}
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ROL:
      return {
        ...state,
        rol: action.rol,
      };

    case actionType.vchNombre:
      return {
        ...state,
        vchNombre: action.vchNombre,
      };
    case actionType.vchApellidoPaterno:
      return {
        ...state,
        vchApellidoPaterno: action.vchApellidoPaterno,
      };
    case actionType.vchApellidoMaterno:
      return {
        ...state,
        vchApellidoMaterno: action.vchApellidoMaterno,
      };
    case actionType.chrEmail:
      return {
        ...state,
        chrEmail: action.chrEmail,
      };
    case actionType.numTipoCliente:
      return {
        ...state,
        numTipoCliente: action.numTipoCliente,
      };
    case actionType.vchDocumento:
      return {
        ...state,
        vchDocumento: action.vchDocumento,
      };
    case actionType.vchNombreCompleto:
      return {
        ...state,
        vchNombreCompleto: action.vchNombreCompleto,
      };
    case actionType.vchDireccion:
      return {
        ...state,
        vchDireccion: action.vchDireccion,
      };
    case actionType.vchTelefonoFijo:
      return {
        ...state,
        vchTelefonoFijo: action.vchTelefonoFijo,
      };
    case actionType.vchTelefonoMovil:
      return {
        ...state,
        vchTelefonoMovil: action.vchTelefonoMovil,
      };
    case actionType.chrPassword:
      return {
        ...state,
        chrPassword: action.chrPassword,
        statusPassword: action.statusPassword
      };
    case actionType.REQUETS:
      return {
        ...state,
        server: action.server,
        estado: action.estado
      };
    case actionType.ERROR:
      return {
        ...state,
        error: action.error,
        estado: action.estado,
      };
    case actionType.LOAD_USUARIO:
      return {
        ...state,
        vchNombre: action.vchNombre,
        vchApellidoPaterno: action.vchApellidoPaterno,
        vchApellidoMaterno: action.vchApellidoMaterno,
        chrEmail: action.chrEmail,
        numTipoCliente: action.numTipoCliente,
        vchDocumento: action.vchDocumento,
        vchNombreCompleto: action.vchNombreCompleto,
        vchDireccion: action.vchDireccion,
        vchTelefonoFijo: action.vchTelefonoFijo,
        vchTelefonoMovil: action.vchTelefonoMovil
      };
    default:
      return state;
  }
}
export default function RegistrarUsuario(props) {
  let history = useHistory();
  let params = useParams();
  let _numCodigoCliente = params.numCodigoCliente;
  let _numCodigoClienteUsuario = params.numCodigoClienteUsuario;
  const [state, dispatch] = useReducer(reducer, {
    /*variables del registro */
    vchNombre: "",
    vchApellidoPaterno: "",
    vchApellidoMaterno: "",
    chrEmail: "",
    numTipoCliente: 0,
    vchDocumento: "",
    vchNombreCompleto: "",
    vchDireccion: "",
    chrPassword: "",
    numCodigoClienteUsuario: _numCodigoClienteUsuario,
    numCodigoCliente: _numCodigoCliente,
    vchTelefonoFijo: "",
    vchTelefonoMovil: "",
    statusPassword: -1,
    /*Varibles de almacenamiento de listas */
    rol: "",
    error: {
      vchNombre: { mensaje: "", isValidado: false },
      vchApellidoPaterno: { mensaje: "", isValidado: false },
      vchApellidoMaterno: { mensaje: "", isValidado: false },
      chrEmail: { mensaje: "", isValidado: false },
      numTipoCliente: { mensaje: "", isValidado: false },
      vchDocumento: { mensaje: "", isValidado: false },
      vchNombreCompleto: { mensaje: "", isValidado: false },
      vchDireccion: { mensaje: "", isValidado: false },
      chrCodigoDepartamento: { mensaje: "", isValidado: false },
      chrCodigoProvincia: { mensaje: "", isValidado: false },
      chrCodigoDistrito: { mensaje: "", isValidado: false },
      chrPassword: { mensaje: "", isValidado: false },
      vchTelefonoFijo: { mensaje: "", isValidado: false },
      vchTelefonoMovil: { mensaje: "", isValidado: false },
      isValido: true,
    },
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    estado: (parseInt(_numCodigoClienteUsuario, 10) === 0 && parseInt(_numCodigoCliente, 10) === 0 ? CRUD.INSERT.estado : CRUD.UPDATE.estado),
    accion: (parseInt(_numCodigoClienteUsuario, 10) === 0 && parseInt(_numCodigoCliente, 10) === 0 ? CRUD.INSERT : CRUD.UPDATE),
  });

  useEffect(() => {
    handleValidarCliente(props.numCodigoCliente);
    console.log("useEffect[RegistrarUsuario]");
    if (state.accion === CRUD.UPDATE) {
      HandleEventobtenerListaUsuario(state.numCodigoCliente, state.numCodigoClienteUsuario);
    }
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

  }

  async function HandleEventobtenerListaUsuario(i_numCodigoCliente, i_numCodigoClienteUsuario) {
    console.log(i_numCodigoCliente, i_numCodigoClienteUsuario);

    const rpt = await obtenerListaUsuario({
      page: 1, limit: 10,
      numCodigoCliente: i_numCodigoCliente, numCodigoClienteUsuario: i_numCodigoClienteUsuario
    });
    console.log("HandleEventobtenerListaUsuario");
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        const usuario = json.lista[0];
        console.log(usuario);

        dispatch({
          type: actionType.LOAD_USUARIO,
          vchNombre: usuario.cliente.vchNombre,
          vchApellidoPaterno: usuario.cliente.vchApellidoPaterno,
          vchApellidoMaterno: usuario.cliente.vchApellidoMaterno,
          chrEmail: usuario.chrEmail,
          numTipoCliente: usuario.cliente.numTipoCliente,
          vchDocumento: usuario.cliente.vchDocumento,
          vchNombreCompleto: usuario.cliente.vchNombreCompleto,
          vchDireccion: usuario.cliente.vchDireccion,
          vchTelefonoFijo: usuario.cliente.vchTelefonoFijo,
          vchTelefonoMovil: usuario.cliente.vchTelefonoMovil
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

  function handleEventChangePassword(_value) {
    dispatch({
      type: actionType.chrPassword,
      chrPassword: _value,
      statusPassword: zxcvbn(_value).score
    })
  }

  async function handleEventRegistrar() {
    console.log("handleEventRegistrar");
    dispatch({
      type: actionType.REQUETS,
      server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
      estado:
        state.accion === CRUD.INSERT
          ? CRUD.INSERT.estadoRequest
          : CRUD.UPDATE.estadoRequest,
    });

    const valError = await handleValidarForm(state);
    console.log(valError.isValido);
    if (valError.isValido) {
      let clienteRequets = {      
        chrEmail: state.chrEmail,
        chrPassword: state.chrPassword,    
        crud: state.accion.descripcion,
        flgActualizaRol:1,
        chrRol:chrRol.ROLE_ADMIN,
        cliente: {
          vchNombre: state.vchNombre,
          vchApellidoPaterno: state.vchApellidoPaterno,
          vchApellidoMaterno: state.vchApellidoMaterno,
          numTipoCliente: state.numTipoCliente,
          vchDireccion: state.vchDireccion,
          vchDocumento: state.vchDocumento,
          vchNombreCompleto: state.vchNombreCompleto,
          vchTelefonoFijo: state.vchTelefonoFijo,
          vchTelefonoMovil: state.vchTelefonoMovil,
        }
      };

      const rpt = await registrarCliente(clienteRequets);

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          history.push("/listaUsuarioAdmin");
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.REQUETS,
            server: {
              error: json.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            },
            estado:
              state.accion === CRUD.INSERT
                ? CRUD.INSERT.estado
                : CRUD.UPDATE.estado,
          });
        }
      } else {
        dispatch({
          type: actionType.REQUETS,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
          estado:
            state.accion === CRUD.INSERT
              ? CRUD.INSERT.estado
              : CRUD.UPDATE.estado,
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        error: valError,
        estado:
          state.accion === CRUD.INSERT
            ? CRUD.INSERT.estado
            : CRUD.UPDATE.estado,
      });
    }
  }


  return (
    <div className="registrar-cliente">
      <div className="link-href">
        <Link to="/listaUsuarioAdmin">
          <i className="fa fa-home" aria-hidden="true"></i>
          Volver
        </Link>
      </div>   
      {state.accion === CRUD.INSERT ? (
        <h3>Crear una cuenta de administrador</h3>
      ) : (
        <h3>Actualizar datos de administrador</h3>
      )}
      <div className="form-body-cliente">

        <div className="row-body">
          <div className="row-body-registro-row" >
            <label htmlFor="numTipoCliente" className="label-registro">Documento</label>
            <select
              className={`form-control form-select imput-registro-width ${state.error.numTipoCliente.isValidado ? 'imput-registro-error' : ''}`}
              name="numTipoCliente"
              disabled={state.accion === CRUD.UPDATE ? true : false}
              value={state.numTipoCliente}
              onChange={(e) =>
                dispatch({
                  type: actionType.numTipoCliente,
                  numTipoCliente: e.target.value,
                })
              }
            >
              <option value={TipoDocumento.DEFAULT.numtipocliente}>
                {TipoDocumento.DEFAULT.vchdescripcion}
              </option>
              <option value={TipoDocumento.DNI.numtipocliente}>
                {TipoDocumento.DNI.vchdescripcion}
              </option>
              <option value={TipoDocumento.RUC.numtipocliente}>
                {TipoDocumento.RUC.vchdescripcion}
              </option>
              <option value={TipoDocumento.CARNET_EXT.numtipocliente}>
                {TipoDocumento.CARNET_EXT.vchdescripcion}
              </option>
              <option value={TipoDocumento.PASAPORTE.numtipocliente}>
                {TipoDocumento.PASAPORTE.vchdescripcion}
              </option>
            </select>
          </div>
          <div className="row-body-registro-row" >
            <label htmlFor="numTipoCliente" className="label-registro"></label>
            <input
              type="text"
              name="vchDocumento"
              className={`form-control imput-registro-width ${state.error.vchDocumento.isValidado ? 'imput-registro-error' : ''}`}
              autoComplete="false"
              autoSave="false"
              disabled={state.accion === CRUD.UPDATE ? true : false}
              value={state.vchDocumento}
              placeholder={state.error.vchDocumento.isValidado ? state.error.vchDocumento.mensaje : ""}
              title={state.error.vchDocumento.isValidado ? state.error.vchDocumento.mensaje : ""}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchDocumento,
                  vchDocumento: e.target.value,
                })
              }
            ></input></div>


        </div>
        {parseInt(state.numTipoCliente) === TipoDocumento.RUC.numtipocliente ? (
          <div className="row-body">
            <div className="row-body-registro-row" >
              <label htmlFor="vchNombreCompleto" className="label-registro">Razón Social</label>
              <input
                type="text"
                name="vchNombreCompleto"
                className={`form-control imput-registro-width ${state.error.vchNombreCompleto.isValidado ? 'imput-registro-error' : ''}`}
                autoComplete="false"
                autoSave="false"
                value={state.vchNombreCompleto}
                placeholder={state.error.vchNombreCompleto.isValidado ? state.error.vchNombreCompleto.mensaje : ""}
                title={state.error.vchNombreCompleto.isValidado ? state.error.vchNombreCompleto.mensaje : ""}
                onChange={(e) =>
                  dispatch({
                    type: actionType.vchNombreCompleto,
                    vchNombreCompleto: e.target.value,
                  })
                }
              ></input></div>
          </div>
        ) : (
          ""
        )}
        <div className="row-body">
          <div className="row-body-registro-row" >
            <label htmlFor="vchNombre" className="label-registro">Nombres</label>
            <input
              type="text"
              name="vchNombre"
              className={`form-control imput-registro-width ${state.error.vchNombre.isValidado ? 'imput-registro-error' : ''}`}
              autoComplete="false"
              autoSave="false"
              value={state.vchNombre}
              placeholder={state.error.vchNombre.isValidado ? state.error.vchNombre.mensaje : ""}
              title={state.error.vchNombre.isValidado ? state.error.vchNombre.mensaje : ""}

              onChange={(e) =>

                dispatch({
                  type: actionType.vchNombre,
                  vchNombre: e.target.value,
                })

              }
            ></input></div>
          <div className="row-body-registro-row" ></div>
        </div>
        <div className="row-body">
          <div className="row-body-registro-row" >
            <label htmlFor="vchApellidoPaterno" className="label-registro label-flex">
              <label className="row-label-flex row-label-flex-left">Apellidos:</label>
              <label className="row-label-flex row-label-flex-right">Paterno&nbsp;&nbsp;</label>
            </label>
            <input
              type="text"
              name="vchApellidoPaterno"
              className={`form-control imput-registro-width ${state.error.vchApellidoPaterno.isValidado ? 'imput-registro-error' : ''}`}
              autoComplete="false"
              autoSave="false"
              value={state.vchApellidoPaterno}
              placeholder={state.error.vchApellidoPaterno.isValidado ? state.error.vchApellidoPaterno.mensaje : ""}
              title={state.error.vchApellidoPaterno.isValidado ? state.error.vchApellidoPaterno.mensaje : ""}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchApellidoPaterno,
                  vchApellidoPaterno: e.target.value,
                })
              }
            ></input></div>
          <div className="row-body-registro-row" >
            <label htmlFor="vchApellidoPaterno" className="label-registro row-label-flex-center">
              Materno
            </label>
            <input
              type="text"
              name="vchApellidoMaterno"
              className={`form-control imput-registro-width ${state.error.vchApellidoMaterno.isValidado ? 'imput-registro-error' : ''}`}
              autoComplete="false"
              autoSave="false"
              value={state.vchApellidoMaterno}
              placeholder={state.error.vchApellidoMaterno.isValidado ? state.error.vchApellidoMaterno.mensaje : ""}
              title={state.error.vchApellidoMaterno.isValidado ? state.error.vchApellidoMaterno.mensaje : ""}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchApellidoMaterno,
                  vchApellidoMaterno: e.target.value,
                })
              }
            ></input>

          </div>
        </div>
        <div className="row-body">
          <div className="row-body-registro-row" >

            <label htmlFor="vchApellidoPaterno" className="label-registro label-flex">
              <label className="row-label-flex row-label-flex-left">Telefonos:</label>
              <label className="row-label-flex  ">&nbsp;&nbsp;&nbsp;&nbsp;Movil&nbsp;&nbsp;</label>
            </label>
            <input
              type="text"
              name="vchTelefonoMovil"
              className={`form-control imput-registro-width ${state.error.vchTelefonoMovil.isValidado ? 'imput-registro-error' : ''}`}
              autoComplete="false"
              autoSave="false"
              value={state.vchTelefonoMovil}
              placeholder={state.error.vchTelefonoMovil.isValidado ? state.error.vchTelefonoMovil.mensaje : ""}
              title={state.error.vchTelefonoMovil.isValidado ? state.error.vchTelefonoMovil.mensaje : ""}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchTelefonoMovil,
                  vchTelefonoMovil: e.target.value,
                })
              }
            ></input>
          </div>
          <div className="row-body-registro-row" >
            <label htmlFor="vchApellidoPaterno" className="label-registro row-label-flex-center">
              Fijo
            </label>
            <input
              type="text"
              name="vchTelefonoFijo"
              className={`form-control imput-registro-width ${state.error.vchTelefonoFijo.isValidado ? 'imput-registro-error' : ''}`}
              autoComplete="false"
              autoSave="false"
              value={state.vchTelefonoFijo}
              placeholder={state.error.vchTelefonoFijo.isValidado ? state.error.vchTelefonoFijo.mensaje : ""}
              title={state.error.vchTelefonoFijo.isValidado ? state.error.vchTelefonoFijo.mensaje : ""}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchTelefonoFijo,
                  vchTelefonoFijo: e.target.value,
                })
              }
            ></input>
          </div>

        </div>
        <div className="row-body">
          <div className="row-body-registro-row" >
            <label htmlFor="chrEmail" className="label-registro">Correo electrónico</label>
            <input
              type="text"
              name="chrEmail"
              className={`form-control imput-registro-width ${state.error.chrEmail.isValidado ? 'imput-registro-error' : ''}`}
              autoComplete="false"
              autoSave="false"
              disabled={state.accion === CRUD.UPDATE ? true : false}
              value={state.chrEmail}
              placeholder={state.error.chrEmail.isValidado ? state.error.chrEmail.mensaje : ""}
              title={state.error.chrEmail.isValidado ? state.error.chrEmail.mensaje : ""}
              onChange={(e) =>
                dispatch({ type: actionType.chrEmail, chrEmail: e.target.value })
              }
            ></input>
          </div>
        </div>

        <div className="row-body">
          <div className="row-body-registro-row" >
            <label htmlFor="chrPassword" className="label-registro">Contraseña</label>
            <div className="progres-container">
              <input
                type="password"
                className={`form-control imput-registro-width ${state.error.chrPassword.isValidado ? 'imput-registro-error' : ''}`}
                name="chrPassword"
                autoComplete="false"
                autoSave="false"
                value={state.chrPassword}
                placeholder={state.error.chrPassword.isValidado ? state.error.chrPassword.mensaje : ""}
                title={state.error.chrPassword.isValidado ? state.error.chrPassword.mensaje : ""}
                onChange={(e) => handleEventChangePassword(e.target.value)}
              ></input>
              <div className={`progres-ui progres-ui-level${state.statusPassword}`}> </div>

            </div>
          </div>
        </div>
        <div className="action-cliente">
          <div className="action-row" >
            <div className="action-cliente-button row-label-flex-left">

              <button className="btn btn-primary" onClick={handleEventRegistrar}>
                <i className="fa fa-save "></i>{state.estado}
              </button>
            </div>
          </div>
        </div>

      </div>


      
      <ServerException server={state.server}></ServerException>




    </div>
  );


  function handleValidarForm(state) {
    /* eslint-disable */
    /*Iniciando la estructura del objeto para el control de mensajes depues de la validacion */
    let _error = {
      vchNombre: { mensaje: "", isValidado: false },
      vchApellidoPaterno: { mensaje: "", isValidado: false },
      vchApellidoMaterno: { mensaje: "", isValidado: false },
      chrEmail: { mensaje: "", isValidado: false },
      numTipoCliente: { mensaje: "", isValidado: false },
      vchDocumento: { mensaje: "", isValidado: false },
      vchNombreCompleto: { mensaje: "", isValidado: false },
      vchDireccion: { mensaje: "", isValidado: false },
      chrCodigoDepartamento: { mensaje: "", isValidado: false },
      chrCodigoProvincia: { mensaje: "", isValidado: false },
      chrCodigoDistrito: { mensaje: "", isValidado: false },
      chrPassword: { mensaje: "", isValidado: false },
      vchTelefonoFijo: { mensaje: "", isValidado: false },
      vchTelefonoMovil: { mensaje: "", isValidado: false },
      isValido: true,
    };



    let emailRegex = /^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i;
    /*Criterios de validaciones */
    let isValido = true;

    if (!state.chrEmail) {
      _error.chrEmail.mensaje = "El correo es requerido";
      _error.chrEmail.isValidado = true;
      isValido = false;
    } else if (
      emailRegex.test(state.chrEmail.toUpperCase() === false)
    ) {
      _error.chrEmail.mensaje = "El formato el correo no es valido";
      _error.chrEmail.isValidado = true;
      isValido = false;
    }
    if (!state.vchTelefonoMovil) {
      _error.vchTelefonoMovil.mensaje = "Ingrese su telefono movil";
      _error.vchTelefonoMovil.isValidado = true;
      isValido = false;
    }
    if (!state.vchNombre) {
      _error.vchNombre.mensaje = "Ingrese su nombre";
      _error.vchNombre.isValidado = true;
      isValido = false;
    }
    if (!state.vchApellidoPaterno) {
      _error.vchApellidoPaterno.mensaje = "Ingrese su apellido paterno";
      _error.vchApellidoPaterno.isValidado = true;
      isValido = false;
    }
    if (!state.vchApellidoMaterno) {
      _error.vchApellidoMaterno.mensaje = "Ingrese su apellido materno";
      _error.vchApellidoMaterno.isValidado = true;
      isValido = false;
    }

    if (parseInt(state.numTipoCliente, 10) === 0) {
      _error.numTipoCliente.mensaje = "Seleccione el tipo de documento";
      _error.numTipoCliente.isValidado = true;
      _error.vchDocumento.mensaje = "N° de documento es requerido";
      _error.vchDocumento.isValidado = true;
      isValido = false;
    }

    if (state.numTipoCliente == TipoDocumento.DNI.numtipocliente) {
      if (state.vchDocumento.length !== TipoDocumento.DNI.longitud) {
        _error.vchDocumento.mensaje =
          "El " +
          TipoDocumento.DNI.vchdescripcion +
          " debe tener " +
          TipoDocumento.DNI.longitud +
          " dígitos";
        _error.vchDocumento.isValidado = true;
        isValido = false;
      }
    }
    if (state.numTipoCliente == TipoDocumento.CARNET_EXT.numtipocliente) {
      if (state.vchDocumento.length != TipoDocumento.CARNET_EXT.longitud) {
        _error.vchDocumento.mensaje =
          "El " +
          TipoDocumento.CARNET_EXT.vchdescripcion +
          " debe tener " +
          TipoDocumento.CARNET_EXT.longitud +
          " dígitos";
        _error.vchDocumento.isValidado = true;
        isValido = false;
      }
    }
    if (state.numTipoCliente == TipoDocumento.PASAPORTE.numtipocliente) {
      if (state.vchDocumento.length != TipoDocumento.PASAPORTE.longitud) {
        _error.vchDocumento.mensaje =
          "El " +
          TipoDocumento.PASAPORTE.vchdescripcion +
          " debe tener " +
          TipoDocumento.PASAPORTE.longitud +
          " dígitos";
        _error.vchDocumento.isValidado = true;
        isValido = false;
      }
    }
    if (state.numTipoCliente == TipoDocumento.RUC.numtipocliente) {
      if (state.vchDocumento.length != TipoDocumento.RUC.longitud) {
        _error.vchDocumento.mensaje =
          "El " +
          TipoDocumento.RUC.vchdescripcion +
          " debe tener " +
          TipoDocumento.RUC.longitud +
          " dígitos";
        _error.vchDocumento.isValidado = true;
        isValido = false;
      }
      if (!state.vchNombreCompleto) {
        _error.vchNombreCompleto.mensaje = "Ingrese la Razón Social";
        _error.vchNombreCompleto.isValidado = true;
        isValido = false;
      } else if (state.vchNombreCompleto.length <= 3) {
        _error.vchNombreCompleto.mensaje = "Ingrese la Razón Social";
        _error.vchNombreCompleto.isValidado = true;
      }
    }
    /*
    if (!state.vchDireccion) {
      _error.vchDireccion.mensaje =
        "Ingrese dirección facturación (domicilio fiscal)";
      _error.vchDireccion.isValidado = true;
      isValido = false;
    } else if (state.vchDireccion.length <= 5) {
      _error.vchDireccion.mensaje =
        "Ingrese dirección facturación (domicilio fiscal)";
      _error.vchDireccion.isValidado = true;
    }
  
    if (state.chrCodigoDepartamento === "00") {
      _error.chrCodigoDepartamento.mensaje = "Seleccione el Departamento";
      _error.chrCodigoDepartamento.isValidado = true;
      isValido = false;
    }
    if (state.chrCodigoProvincia === "00") {
      _error.chrCodigoProvincia.mensaje = "Seleccione el Provincia";
      _error.chrCodigoProvincia.isValidado = true;
      isValido = false;
    }
    if (state.chrCodigoDistrito === "00") {
      _error.chrCodigoDistrito.mensaje = "Seleccione el Distrito";
      _error.chrCodigoDistrito.isValidado = true;
      isValido = false;
    }*/
    if (state.accion === CRUD.INSERT) {
      if (!state.chrPassword) {
        _error.chrPassword.mensaje = "Ingrese una contraseña";
        _error.chrPassword.isValidado = true;
        isValido = false;
      } else if (state.chrPassword.length <= 4) {
        _error.chrPassword.mensaje = "La contraseña debe tener más de 4 dígitos ";
        _error.chrPassword.isValidado = true;
      }
    }
    _error.isValido = isValido;
    /*Registrando los mensajes  */
    /* eslint-enable */

    return _error;
  }
}
