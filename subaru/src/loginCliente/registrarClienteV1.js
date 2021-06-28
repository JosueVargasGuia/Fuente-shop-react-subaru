import React, { useEffect, useReducer } from "react";
import {
  obtenerCliente,
  obtenerDirecciones,
  registrarCliente,
} from "../service/loginCliente.service";
import {
  SUCCESS_SERVER,
  HttpStatus,
  TipoDocumento,
  LOGGIN,
  CRUD,
  localStoreEnum,
} from "../service/ENUM";
import { Link, useHistory, useParams } from "react-router-dom";
import {
  handleObtenerProvincia,
  handleObtenerDistrito,
  handleObtenerDepartamento,
} from "../service/general";
import ServerException from "../utils/serverException";
import { Modal } from "react-bootstrap";
import { ModalConfirmar } from "../utils/modal";

let actionType = {
  DEPARTAMENTO: "DEPARTAMENTO",
  PROVINCIA: "PROVINCIA",
  DISTRITO: "DISTRITO",
  DEPARTAMENTO_LISTA: "DEPARTAMENTO_LISTA",
  PROVINCIA_LISTA: "PROVINCIA_LISTA",
  DISTRITO_LISTA: "DISTRITO_LISTA",
  chrTratamiento: "chrTratamiento",
  vchNombre: "vchNombre",
  vchApellidoPaterno: "vchApellidoPaterno",
  vchApellidoMaterno: "vchApellidoMaterno",
  chrEmail: "chrEmail",
  numTipoCliente: "numTipoCliente",
  vchDocumento: "vchDocumento",
  vchNombreCompleto: "vchNombreCompleto",
  vchDireccion: "vchDireccion",
  chrCodigoDepartamento: "chrCodigoDepartamento",
  chrCodigoProvincia: "chrCodigoProvincia",
  chrCodigoDistrito: "chrCodigoDistrito",
  chrPassword: "chrPassword",
  flgOfertas: "flgOfertas",
  flgSuscripcion: "flgSuscripcion",
  ERROR: "ERROR",
  REQUETS: "REQUETS",
  LOAD_CLIENTE: "LOAD_CLIENTE",
  MODAL_SHOW_DIRECCION: "MODAL_SHOW_DIRECCION",
  MODAL_SHOW: "MODAL_SHOW",
  DEPARTAMENTO_DIRECCION: "DEPARTAMENTO_DIRECCION",
  PROVINCIA_DIRECCION: "PROVINCIA_DIRECCION",
  DISTRITO_DIRECCION: "DISTRITO_DIRECCION",
  MODAL_SET_DIRECCION: "MODAL_SET_DIRECCION",

  /*****/
  vchDireccion_DIRECCION: "vchDireccion_DIRECCION",
  vchreferencia_DIRECCION: "vchreferencia_DIRECCION",
  vchNombre_DIRECCION: "vchNombre_DIRECCION",
  vchApellido_DIRECCION: "vchApellido_DIRECCION",
  chrCodigoUbigeo_DIRECCION: "chrCodigoUbigeo_DIRECCION",
  vchTelefono_DIRECCION: "vchTelefono_DIRECCION",
  flgPredeterminado_DIRECCION: "flgPredeterminado_DIRECCION",
  vchrAlias_DIRECCION: "vchrAlias_DIRECCION",
  numTipoDocumento_DIRECCION: "numTipoDocumento_DIRECCION",
  vchDocumento_DIRECCION: "vchDocumento_DIRECCION",
  DIRECCION_GUARDAR: "DIRECCION_GUARDAR",
  DIRECCION_ERROR: "DIRECCION_ERROR",

};
/*Funcion reducer */
const reducer = (state, action) => {
  let _direccion = state.direccion;
  switch (action.type) {
    case actionType.DEPARTAMENTO_LISTA:
      return {
        ...state,
        lstDepartamento: action.lstDepartamento,
        lstProvincia: action.lstProvincia,
        lstDistrito: action.lstDistrito,
        isloadingDepartamento: action.isloadingDepartamento,
      };
    case actionType.PROVINCIA_LISTA:
      return {
        ...state,
        lstProvincia: action.lstProvincia,
        lstDistrito: action.lstDistrito,
        isloadingProvincia: action.isloadingProvincia,
      };
    case actionType.DISTRITO_LISTA:
      return {
        ...state,
        lstDistrito: action.lstDistrito,
        isloadingDistrito: action.isloadingDistrito,
      };
    case actionType.DEPARTAMENTO:
      return {
        ...state,
        chrCodigoDepartamento: action.chrCodigoDepartamento,
        chrCodigoProvincia: action.chrCodigoProvincia,
        chrCodigoDistrito: action.chrCodigoDistrito,
        isloadingProvincia: action.isloadingProvincia,
      };
    case actionType.DEPARTAMENTO_DIRECCION:

      _direccion.departamento.chrCodigoDepartamento = action.chrCodigoDepartamento;
      _direccion.departamento.vchDescripcion = action.vchDescripcionDepartamento;
      _direccion.provincia.chrCodigoProvincia = action.chrCodigoProvincia;
      _direccion.distrito.chrCodigoDistrito = action.chrCodigoDistrito;
      return {
        ...state,
        direccion: _direccion,
        lstProvinciaD: action.lstProvinciaD
      };
    case actionType.PROVINCIA_DIRECCION:
      _direccion.provincia.chrCodigoProvincia = action.chrCodigoProvincia;
      _direccion.provincia.vchDescripcion = action.vchDescripcionProvincia;
      _direccion.distrito.chrCodigoDistrito = action.chrCodigoDistrito;
      return {
        ...state,
        direccion: _direccion,
        lstDistritoD: action.lstDistritoD
      };
    case actionType.DISTRITO_DIRECCION:
      _direccion.distrito.chrCodigoDistrito = action.chrCodigoDistrito;
      _direccion.distrito.vchDescripcion = action.vchDescripcionDistrito;
      return {
        ...state,
        direccion: _direccion
      };
    /** */


    case actionType.vchDireccion_DIRECCION:
      _direccion.vchDireccion = action.vchDireccion;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.vchreferencia_DIRECCION:
      _direccion.vchreferencia = action.vchreferencia;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.vchNombre_DIRECCION:
      _direccion.vchNombre = action.vchNombre;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.vchApellido_DIRECCION:
      _direccion.vchApellido = action.vchApellido;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.vchTelefono_DIRECCION:
      _direccion.vchTelefono = action.vchTelefono;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.flgPredeterminado_DIRECCION:
      _direccion.flgPredeterminado = action.flgPredeterminado;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.vchrAlias_DIRECCION:
      _direccion.vchrAlias = action.vchrAlias;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.numTipoDocumento_DIRECCION:
      _direccion.numTipoDocumento = action.numTipoDocumento;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.vchDocumento_DIRECCION:
      _direccion.vchDocumento = action.vchDocumento;
      return {
        ...state,
        direccion: _direccion
      };
    /** */
    case actionType.PROVINCIA:
      return {
        ...state,
        chrCodigoProvincia: action.chrCodigoProvincia,
        chrCodigoDistrito: action.chrCodigoDistrito,
        isloadingDistrito: action.isloadingDistrito,
      };
    case actionType.DISTRITO:
      return {
        ...state,
        chrCodigoDistrito: action.chrCodigoDistrito,
      };

    case actionType.chrTratamiento:
      return {
        ...state,
        chrTratamiento: action.chrTratamiento,
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
    case actionType.chrPassword:
      return {
        ...state,
        chrPassword: action.chrPassword,
      };
    case actionType.flgOfertas:
      return {
        ...state,
        flgOfertas: action.flgOfertas,
      };
    case actionType.flgSuscripcion:
      return {
        ...state,
        flgSuscripcion: action.flgSuscripcion,
      };
    case actionType.ERROR:
      return {
        ...state,
        error: action.error,
        estado: action.estado,
      };
    case actionType.REQUETS:
      return {
        ...state,
        server: action.server,
        estado: action.estado,
      };
    case actionType.LOAD_CLIENTE:
      return {
        ...state,
        chrTratamiento: action.chrTratamiento,
        vchNombre: action.vchNombre,
        vchApellidoPaterno: action.vchApellidoPaterno,
        vchApellidoMaterno: action.vchApellidoMaterno,
        chrEmail: action.chrEmail,
        numTipoCliente: action.numTipoCliente,
        vchDocumento: action.vchDocumento,
        vchNombreCompleto: action.vchNombreCompleto,
        vchDireccion: action.vchDireccion,
        chrCodigoDepartamento: action.chrCodigoDepartamento,
        chrCodigoProvincia: action.chrCodigoProvincia,
        chrCodigoDistrito: action.chrCodigoDistrito,
        chrPassword: action.chrPassword,
        flgOfertas: action.flgOfertas,
        flgSuscripcion: action.flgSuscripcion,
        numCodigoClienteUsuario: action.numCodigoClienteUsuario,
        numCodigoCliente: action.numCodigoCliente,
        lstProvincia: action.lstProvincia,
        lstDistrito: action.lstDistrito,

        lstProvinciaD: action.lstProvinciaD,
        lstDistritoD: action.lstDistritoD,
        lstDireccion: action.lstDireccion,
        lstDireccionData: action.lstDireccionData,
        accion: action.accion,
        estado: action.estado,
      };
    case actionType.MODAL_SHOW_DIRECCION:
      return {
        ...state,
        showDireccion: action.showDireccion,
        direccion: action.direccion,
        lstProvinciaD: action.lstProvinciaD,
        lstDistritoD: action.lstDistritoD,
      };
    case actionType.MODAL_SET_DIRECCION:
      return {
        ...state,
        direccion: action.direccion,
      };
    case actionType.DIRECCION_GUARDAR:
      return {
        ...state,
        showDireccion: action.showDireccion,
        lstDireccion: action.lstDireccion,
        lstDireccionData: action.lstDireccionData,
      };
    case actionType.DIRECCION_ERROR:
      _direccion.error = action.error;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.MODAL_SHOW:
      return {
        ...state,
        showDireccion: action.showDireccion,
      };
    default:
      return state;
  }
};
let actionTypeModal = {
  SHOW_MODAL: "SHOW_MODAL",
  REQUETS: "REQUETS",
};
const reducerModal = (state, action) => {
  switch (action.type) {
    case actionTypeModal.SHOW_MODAL:
      return {
        ...state,
        show: action.show,
        mensaje: action.mensaje,
        title: action.title,
      };

    default:
      return state;
  }
};

export default function RegistrarClienteV1(props) {
  let params = useParams();
  let history = useHistory();
  let isloadingDepartamento = true;

  let usuarioData = {
    chrTratamiento: "1",
    vchNombre: "",
    vchApellidoPaterno: "",
    vchApellidoMaterno: "",
    chrEmail: "",
    numTipoCliente: 0,
    vchDocumento: "",
    vchNombreCompleto: "",
    vchDireccion: "",
    chrCodigoDepartamento: "00",
    chrCodigoProvincia: "00",
    chrCodigoDistrito: "00",
    chrPassword: "",
    flgOfertas: false,
    flgSuscripcion: false,
    numCodigoClienteUsuario: 0,
    numCodigoCliente: 0,
  };

  let _direccion = {
    numCodigoDireccion: 0,
    numCodigoCliente: 0,
    vchDireccion: "",
    vchreferencia: "",
    vchNombre: "",
    vchApellido: "",
    chrCodigoUbigeo: "",
    vchTelefono: "",
    flgRegistro: "",
    flgPredeterminado: "",
    vchrAlias: "",
    numTipoDocumento: "",
    vchDocumento: "",
    departamento: {
      chrCodigoDepartamento: "00",
      vchDescripcion: "",
    },
    provincia: {
      chrCodigoProvincia: "00",
      vchDescripcion: "",
    },
    distrito: {
      chrCodigoDistrito: "00",
      vchDescripcion: "",
    },
    estado: CRUD.UPDATE.estado,
    accion: CRUD.UPDATE,
    error: {
      vchDireccion: { mensaje: "", isValidado: false },
      vchNombre: { mensaje: "", isValidado: false },
      vchApellido: { mensaje: "", isValidado: false },
      vchTelefono: { mensaje: "", isValidado: false },
      chrCodigoDepartamento: { mensaje: "", isValidado: false },
      chrCodigoProvincia: { mensaje: "", isValidado: false },
      chrCodigoDistrito: { mensaje: "", isValidado: false },
      vchDocumento: { mensaje: "", isValidado: false },
      numTipoDocumento: { mensaje: "", isValidado: false },
    },
  };

  const [state, dispatch] = useReducer(reducer, {
    /*variables del registro */
    chrTratamiento: usuarioData.chrTratamiento,
    vchNombre: usuarioData.vchNombre,
    vchApellidoPaterno: usuarioData.vchApellidoPaterno,
    vchApellidoMaterno: usuarioData.vchApellidoMaterno,
    chrEmail: usuarioData.chrEmail,
    numTipoCliente: usuarioData.numTipoCliente,
    vchDocumento: usuarioData.vchDocumento,
    vchNombreCompleto: usuarioData.vchNombreCompleto,
    vchDireccion: usuarioData.vchDireccion,
    chrCodigoDepartamento: usuarioData.chrCodigoDepartamento,
    chrCodigoProvincia: usuarioData.chrCodigoProvincia,
    chrCodigoDistrito: usuarioData.chrCodigoDistrito,
    chrPassword: "",
    flgOfertas: usuarioData.flgOfertas,
    flgSuscripcion: usuarioData.flgSuscripcion,
    numCodigoClienteUsuario: usuarioData.numCodigoClienteUsuario,
    numCodigoCliente: usuarioData.numCodigoCliente,
    /*Varibles de almacenamiento de listas */
    lstDepartamento: [],
    lstProvincia: [],
    lstDistrito: [],


    lstProvinciaD: [],
    lstDistritoD: [],

    lstDireccion: [],
    lstDireccionData: [],
    showDireccion: false,
    direccion: _direccion,
    /*Banderas para indicar cuando cargar los combos de departamento,provincia y distrito*/
    isloadingDepartamento: isloadingDepartamento,
    isloadingProvincia: false,
    isloadingDistrito: false,
    /*Estructura de validacion del formulario */
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
      isValido: true,
    },
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    estado: CRUD.INSERT.estado,
    accion: CRUD.INSERT,
  });

  const [modalConfirmarShow, dispatchModal] = useReducer(reducerModal, {
    show: false,
    mensaje: "",
    title: ""
  });

  useEffect(() => {
    /* usuario que no se encuentra logeado y ingresa por informacion personal se le obliga a realizar el logeo */
    if (
      localStorage.getItem(localStoreEnum.ISLOGIN) === null &&
      props.invocacion === "I"
    ) {
      //eslint-disable-next-line
      isloadingDepartamento = false;
      history.push("/loginCliente");
    }
    /*Usuario logeado y esta intentando registrar una nueva cuenta la cual se obliga a cerrar la cuenta actual */
    if (
      localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN &&
      props.invocacion === "R"
    ) {
      return (
        <div className="registrar-cliente">
          <br />
          <br />
          <h4>
            Usted ya se encuentra logeado,para crear otra cuenta tiene que
            Cerrar sesión
          </h4>
        </div>
      );
    }
    if (state.isloadingDepartamento === true) {
      /*Request de departamentos */
      handleListarDepartamentos();
      console.log("handleListarDepartamentos");
      /*Usuario logeado la cual se le permite actualizar su informacion */
      if (
        localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN &&
        props.invocacion === "I" &&
        params.numCodigoCliente >= 1
      ) {
        const usuarioLogeado = JSON.parse(
          localStorage.getItem(localStoreEnum.USUARIO)
        );
        /*Esto se ejecuta solo una vez cuando se carga el componente */
        handleObtenerCliente(usuarioLogeado.numCodigoCliente);
      }
    }

    if (state.isloadingProvincia === true) {
      /*Request de provincias */
      handleListarProvincia();
    }
    if (state.isloadingDistrito === true) {
      /*Request de distritios */
      handleListarDistrito();
    }
    console.log("useEffect");
  });

  async function handleObtenerCliente(_numCodigoCliente) {
    const rpt = await obtenerCliente({ numCodigoCliente: _numCodigoCliente });
    //let rowDepartamento = await handleObtenerDepartamento();
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        usuarioData.numCodigoClienteUsuario = json.numCodigoClienteUsuario;
        usuarioData.numCodigoCliente = json.numCodigoCliente;
        usuarioData.chrEmail = json.chrEmail;
        usuarioData.chrTratamiento = json.chrTratamiento;
        usuarioData.numTipoCliente = json.cliente.numTipoCliente;
        usuarioData.vchNombre = json.cliente.vchNombre;
        usuarioData.vchApellidoMaterno = json.cliente.vchApellidoMaterno;
        usuarioData.vchApellidoPaterno = json.cliente.vchApellidoPaterno;
        usuarioData.vchDireccion = json.cliente.vchDireccion;
        usuarioData.vchDocumento = json.cliente.vchDocumento;
        usuarioData.vchNombreCompleto = json.cliente.vchNombreCompleto;
        usuarioData.flgOfertas = json.flgOfertas;
        usuarioData.flgSuscripcion = json.flgSuscripcion;
        usuarioData.chrCodigoDepartamento =
          json.cliente.ubigeo.chrCodigoDepartamento;
        usuarioData.chrCodigoProvincia = json.cliente.ubigeo.chrCodigoProvincia;
        usuarioData.chrCodigoDistrito = json.cliente.ubigeo.chrCodigoDistrito;
        let rowDistrito = await handleObtenerDistrito({
          chrCodigoDepartamento: usuarioData.chrCodigoDepartamento,
          chrCodigoProvincia: usuarioData.chrCodigoProvincia,
        });
        let rowProvincia = await handleObtenerProvincia(
          usuarioData.chrCodigoDepartamento
        );

        /*Mis Dirrecciones */

        const rptD = await obtenerDirecciones({
          numCodigoCliente: _numCodigoCliente,
        });

        let rowDireccion = [];
        let rowDireccionData = [];
        if (rptD.status === HttpStatus.HttpStatus_OK) {
          const jsonD = await rptD.json();

          if (jsonD.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {

            rowDireccion = [];
            for (let index = 0; index < jsonD.lista.length; index++) {
              const direccion = jsonD.lista[index];
              let _direccion = {
                indice: index,
                numCodigoDireccion: direccion.numCodigoDireccion,
                numCodigoCliente: _numCodigoCliente,
                vchDireccion: direccion.vchDireccion,
                vchreferencia: direccion.vchreferencia,
                vchNombre: direccion.vchNombre,
                vchApellido: direccion.vchApellido,
                chrCodigoUbigeo: direccion.chrCodigoUbigeo,
                vchTelefono: direccion.vchTelefono,
                flgRegistro: direccion.flgRegistro,
                flgPredeterminado: direccion.flgPredeterminado,
                vchrAlias: direccion.vchrAlias,
                numTipoDocumento: direccion.numTipoDocumento,
                vchDocumento: direccion.vchDocumento,
                departamento: {
                  chrCodigoDepartamento:
                    direccion.departamento.chrCodigoDepartamento,
                  vchDescripcion: direccion.departamento.vchDescripcion,
                },
                provincia: {
                  chrCodigoProvincia: direccion.provincia.chrCodigoProvincia,
                  vchDescripcion: direccion.provincia.vchDescripcion,
                },
                distrito: {
                  chrCodigoDistrito: direccion.distrito.chrCodigoDistrito,
                  vchDescripcion: direccion.distrito.vchDescripcion,
                },
                estado: CRUD.SELECT.estado,
                accion: CRUD.SELECT,
                error: {
                  vchDireccion: { mensaje: "", isValidado: false },
                  vchNombre: { mensaje: "", isValidado: false },
                  vchApellido: { mensaje: "", isValidado: false },
                  vchTelefono: { mensaje: "", isValidado: false },
                  chrCodigoDepartamento: { mensaje: "", isValidado: false },
                  chrCodigoProvincia: { mensaje: "", isValidado: false },
                  chrCodigoDistrito: { mensaje: "", isValidado: false },
                  vchDocumento: { mensaje: "", isValidado: false },
                  numTipoDocumento: { mensaje: "", isValidado: false },
                },
              };
              rowDireccionData.push(_direccion);
              rowDireccion.push(
                <CardDireccion direccion={_direccion} handleEventShow={handleEventShowModalDireccion}></CardDireccion>
              );

            }

          }
        }
        /*Mis Direcciones */


        dispatch({
          type: actionType.LOAD_CLIENTE,
          /*variables del registro */
          chrTratamiento: usuarioData.chrTratamiento,
          vchNombre: usuarioData.vchNombre,
          vchApellidoPaterno: usuarioData.vchApellidoPaterno,
          vchApellidoMaterno: usuarioData.vchApellidoMaterno,
          chrEmail: usuarioData.chrEmail,
          numTipoCliente: usuarioData.numTipoCliente,
          vchDocumento: usuarioData.vchDocumento,
          vchNombreCompleto: usuarioData.vchNombreCompleto,
          vchDireccion: usuarioData.vchDireccion,
          chrCodigoDepartamento: usuarioData.chrCodigoDepartamento,
          chrCodigoProvincia: usuarioData.chrCodigoProvincia,
          chrCodigoDistrito: usuarioData.chrCodigoDistrito,
          chrPassword: "",
          flgOfertas: usuarioData.flgOfertas,
          flgSuscripcion: usuarioData.flgSuscripcion,
          numCodigoClienteUsuario: usuarioData.numCodigoClienteUsuario,
          numCodigoCliente: usuarioData.numCodigoCliente,
          lstProvincia: rowProvincia,
          lstDistrito: rowDistrito,
          lstDireccion: rowDireccion,
          lstDireccionData: rowDireccionData,

          lstProvinciaD: rowProvincia,
          lstDistritoD: rowDistrito,
          accion: CRUD.UPDATE,
          estado: CRUD.UPDATE.estado,
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.REQUETS,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
          estado: CRUD.UPDATE.estado,
        });
      }
    } else {
      dispatch({
        type: actionType.REQUETS,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        estado: CRUD.UPDATE.estado,
      });
    }
  }
  async function handleListarDepartamentos() {
    /*Request de departamentos */
    let rowDepartamento = await handleObtenerDepartamento();

    /* isloadingDepartamento:false para que no incurra en el loop infinito*/
    dispatch({
      type: actionType.DEPARTAMENTO_LISTA,
      lstDepartamento: rowDepartamento,
      lstProvincia: [],
      lstDistrito: [],
      isloadingDepartamento: false,
    });
  }
  async function handleEventChangeDepartamento(e) {
    /* isloadingProvincia:true que cargue los provincias al renderizar en el Hook useEffect*/
    dispatch({
      type: actionType.DEPARTAMENTO,
      chrCodigoDepartamento: e.target.value,
      chrCodigoProvincia: "00",
      chrCodigoDistrito: "00",
      isloadingProvincia: true,
    });
  }

  async function handleEventChangeDepartamentoDirrecion(e) {
    /* isloadingProvincia:true que cargue los provincias al renderizar en el Hook useEffect*/

    /*Request de provincia */
    let _chrCodigoDepartamento = e.target.value;
    let _vchDescripcionDepartamento = "";
    for (let x = 0; x < state.lstDepartamento.length; x++) {
      const element = state.lstDepartamento[x];
      if (element.props.value === _chrCodigoDepartamento) {
        _vchDescripcionDepartamento = element.props.children;
      }
    }
    let rowProvincia = await handleObtenerProvincia(
      _chrCodigoDepartamento
    );
    dispatch({
      type: actionType.DEPARTAMENTO_DIRECCION,
      chrCodigoDepartamento: _chrCodigoDepartamento,
      vchDescripcionDepartamento: _vchDescripcionDepartamento,
      chrCodigoProvincia: "00",
      chrCodigoDistrito: "00",
      lstProvinciaD: rowProvincia
    });
  }

  async function handleListarProvincia() {
    /*Request de provincia */
    let rowProvincia = await handleObtenerProvincia(
      state.chrCodigoDepartamento
    );

    /* isloadingProvincia:false para que no incurra en el loop infinito*/
    dispatch({
      type: actionType.PROVINCIA_LISTA,
      lstProvincia: rowProvincia,
      lstDistrito: [],
      isloadingProvincia: false,
    });
  }

  async function handleEventChangeProvincia(e) {
    /* isloadingDistrito:true que cargue los distritos al renderizar en el Hook useEffect*/
    dispatch({
      type: actionType.PROVINCIA,
      chrCodigoProvincia: e.target.value,
      chrCodigoDistrito: "00",
      isloadingDistrito: true,
    });
  }

  async function handleEventChangeProvinciaDireccion(e) {
    /* isloadingDistrito:true que cargue los distritos al renderizar en el Hook useEffect*/
    let _chrCodigoProvincia = e.target.value
    let _vchDescripcionProvincia = "";
    for (let x = 0; x < state.lstProvinciaD.length; x++) {
      const element = state.lstProvinciaD[x];
      if (element.props.value === _chrCodigoProvincia) {
        _vchDescripcionProvincia = element.props.children;
      }
    }

    /*Request de distrito */
    let rowDistrito = await handleObtenerDistrito({
      chrCodigoDepartamento: state.direccion.departamento.chrCodigoDepartamento,
      chrCodigoProvincia: _chrCodigoProvincia,
    });

    dispatch({
      type: actionType.PROVINCIA_DIRECCION,
      chrCodigoProvincia: _chrCodigoProvincia,
      vchDescripcionProvincia: _vchDescripcionProvincia,
      chrCodigoDistrito: "00",
      lstDistritoD: rowDistrito,
    });
  }

  async function handleListarDistrito() {
    /*Request de distrito */
    let rowDistrito = await handleObtenerDistrito({
      chrCodigoDepartamento: state.chrCodigoDepartamento,
      chrCodigoProvincia: state.chrCodigoProvincia,
    });

    /* isloadingProvincia:false para que no incurra en el loop infinito*/
    dispatch({
      type: actionType.DISTRITO_LISTA,
      lstDistrito: rowDistrito,
      isloadingDistrito: false,
    });
  }

  async function handleEventChangeDistrito(e) {
    dispatch({
      type: actionType.DISTRITO,
      chrCodigoDistrito: e.target.value,
    });
  }
  async function handleEventChangeDistritoDireccion(e) {
    let _vchDescripcionDistrito = "";
    let _chrCodigoDistrito = e.target.value;
    for (let x = 0; x < state.lstDistritoD.length; x++) {
      const element = state.lstDistritoD[x];
      if (element.props.value === _chrCodigoDistrito) {
        _vchDescripcionDistrito = element.props.children;
      }
    }
    dispatch({
      type: actionType.DISTRITO_DIRECCION,
      chrCodigoDistrito: _chrCodigoDistrito,
      vchDescripcionDistrito: _vchDescripcionDistrito
    });
  }

  async function handleEventRegistrar() {
    dispatch({
      type: actionType.REQUETS,
      server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
      estado:
        state.accion === CRUD.INSERT
          ? CRUD.INSERT.estadoRequest
          : CRUD.UPDATE.estadoRequest,
    });

    const valError = await handleValidarForm(state);

    if (valError.isValido) {
      let rowDireccion=[];
      for (let i = 0; i < state.lstDireccionData.length; i++) {
        const element = state.lstDireccionData[i];
        let direccionRequest = {
          clienteDireccion: { numCodigoCliente: element.numCodigoCliente },
          numCodigoDireccion: element.numCodigoDireccion,
          vchrAlias: element.vchrAlias,
          vchDireccion: element.vchDireccion,
          vchreferencia: element.vchreferencia,
          vchNombre: element.vchNombre,
          vchApellido: element.vchApellido,
          vchTelefono: element.vchTelefono,
          flgPredeterminado: element.flgPredeterminado,
          departamento: { chrCodigoDepartamento: element.departamento.chrCodigoDepartamento },
          provincia: { chrCodigoProvincia: element.provincia.chrCodigoProvincia },
          distrito: { chrCodigoDistrito: element.distrito.chrCodigoDistrito },
          vchDocumento: element.vchDocumento,
          numTipoDocumento: element.numTipoDocumento,
          crud:element.accion.descripcion
        };
        rowDireccion.push(direccionRequest);
      }

      let clienteRequets = {
        chrTratamiento: state.chrTratamiento,
        chrEmail: state.chrEmail,
        chrPassword: state.chrPassword,
        flgOfertas: state.flgOfertas,
        flgSuscripcion: state.flgSuscripcion,
        crud: state.accion.descripcion,
        cliente: {
          vchNombre: state.vchNombre,
          vchApellidoPaterno: state.vchApellidoPaterno,
          vchApellidoMaterno: state.vchApellidoMaterno,
          numTipoCliente: state.numTipoCliente,
          vchDireccion: state.vchDireccion,
          vchDocumento: state.vchDocumento,
          vchNombreCompleto: state.vchNombreCompleto,
          ubigeo: {
            chrCodigoDepartamento: state.chrCodigoDepartamento,
            chrCodigoProvincia: state.chrCodigoProvincia,
            chrCodigoDistrito: state.chrCodigoDistrito,
          },
        },
        listaDireccion:rowDireccion
      };
       console.log(rowDireccion);
      const rpt = await registrarCliente(clienteRequets);
      console.log(rpt);
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          if (params.linkNavegacion === "CarritoPayment") {
            history.push("/pedidoCarrito");
          } else if (params.linkNavegacion === "DashboardCliente") {
            history.push("/dashboard");
          } else {
            history.push("/shop");
          }
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

  async function handleEventShowModalDireccion(_direccion, accion) {
    let direccion = {
      indice: _direccion.indice,
      numCodigoDireccion: _direccion.numCodigoDireccion,
      numCodigoCliente: _direccion.numCodigoCliente,
      vchDireccion: _direccion.vchDireccion,
      vchreferencia: _direccion.vchreferencia,
      vchNombre: _direccion.vchNombre,
      vchApellido: _direccion.vchApellido,
      chrCodigoUbigeo: _direccion.chrCodigoUbigeo,
      vchTelefono: _direccion.vchTelefono,
      flgRegistro: _direccion.flgRegistro,
      flgPredeterminado: _direccion.flgPredeterminado,
      vchrAlias: _direccion.vchrAlias,
      numTipoDocumento: _direccion.numTipoDocumento,
      vchDocumento: _direccion.vchDocumento,
      departamento: {
        chrCodigoDepartamento: _direccion.departamento.chrCodigoDepartamento,
        vchDescripcion: _direccion.departamento.vchDescripcion,
      },
      provincia: {
        chrCodigoProvincia: _direccion.provincia.chrCodigoProvincia,
        vchDescripcion: _direccion.provincia.vchDescripcion,
      },
      distrito: {
        chrCodigoDistrito: _direccion.distrito.chrCodigoDistrito,
        vchDescripcion: _direccion.distrito.vchDescripcion,
      },
      estado: CRUD.UPDATE.estado,
      accion: CRUD.UPDATE,
      error: {
        vchDireccion: { mensaje: "", isValidado: false },
        vchNombre: { mensaje: "", isValidado: false },
        vchApellido: { mensaje: "", isValidado: false },
        vchTelefono: { mensaje: "", isValidado: false },
        chrCodigoDepartamento: { mensaje: "", isValidado: false },
        chrCodigoProvincia: { mensaje: "", isValidado: false },
        chrCodigoDistrito: { mensaje: "", isValidado: false },
        vchDocumento: { mensaje: "", isValidado: false },
        numTipoDocumento: { mensaje: "", isValidado: false },
      },
    };
    if (accion === CRUD.UPDATE) {
      /*Request de provincia */
      let _chrCodigoDepartamento = _direccion.departamento.chrCodigoDepartamento;
      let rowProvincia = await handleObtenerProvincia(
        _chrCodigoDepartamento
      );
      /*Request de distrito */
      let _chrCodigoProvincia = _direccion.provincia.chrCodigoProvincia;
      let rowDistrito = await handleObtenerDistrito({
        chrCodigoDepartamento: _chrCodigoDepartamento,
        chrCodigoProvincia: _chrCodigoProvincia,
      });

      dispatch({
        type: actionType.MODAL_SHOW_DIRECCION,
        showDireccion: true,
        direccion: direccion,
        lstProvinciaD: rowProvincia,
        lstDistritoD: rowDistrito
      });
    }
    if (accion === CRUD.DELETE) {
      dispatch({
        type: actionType.MODAL_SET_DIRECCION,
        direccion: direccion,
      });
      dispatchModal({
        type: actionTypeModal.SHOW_MODAL,
        show: true,
        mensaje: "¿Estas seguro de quitar la dirección?",
        title: "Quitar dirección",
      });
    }
  }
  async function handleEventSaveDireccion() {
    const valError = await handleValidarFormDireccion(state.direccion);
    console.log(valError)
    if (valError.isValido) {

      let rowDireccion = [];
      /*Resolver< */
      let rowDireccionData = [];
      let index;
      for (let j = 0; j < state.lstDireccionData.length; j++) {
        const element = state.lstDireccionData[j];
        if (element.indice === state.direccion.indice
          && state.direccion.accion === CRUD.UPDATE) {
          rowDireccionData.push(state.direccion);
          rowDireccion.push(
            <CardDireccion direccion={state.direccion}
              handleEventShow={handleEventShowModalDireccion}></CardDireccion>
          );
        } else {
          console.log(state.direccion.flgPredeterminado)
          if (state.direccion.flgPredeterminado === true) {
            element.flgPredeterminado = false;
          }
          console.log(element);
          rowDireccionData.push(element);
          if (element.accion === CRUD.INSERT || element.accion === CRUD.UPDATE || element.accion === CRUD.SELECT) {
            rowDireccion.push(
              <CardDireccion direccion={element}
                handleEventShow={handleEventShowModalDireccion}></CardDireccion>
            );
          }
        }
        index = j;
      }
      if (state.direccion.accion === CRUD.INSERT) {
        state.direccion.indice = index + 1;
        rowDireccionData.push(state.direccion);
        rowDireccion.push(
          <CardDireccion direccion={state.direccion}
            handleEventShow={handleEventShowModalDireccion}></CardDireccion>
        );
      }
      dispatch({
        type: actionType.DIRECCION_GUARDAR, showDireccion: false,
        lstDireccion: rowDireccion,
        lstDireccionData: rowDireccionData
      });
    } else {
      dispatch({
        type: actionType.DIRECCION_ERROR,
        error: valError
      });
    }
    console.log(state)
  }

  function handleEventShowModalAgregarDireccion() {
    let _tmpdireccion = {
      numCodigoDireccion: 0,
      numCodigoCliente: 0,
      vchDireccion: "",
      vchreferencia: "",
      vchNombre: "",
      vchApellido: "",
      chrCodigoUbigeo: "",
      vchTelefono: "",
      flgRegistro: "",
      flgPredeterminado: "",
      vchrAlias: "",
      numTipoDocumento: "",
      vchDocumento: "",
      departamento: {
        chrCodigoDepartamento: "00",
        vchDescripcion: "",
      },
      provincia: {
        chrCodigoProvincia: "00",
        vchDescripcion: "",
      },
      distrito: {
        chrCodigoDistrito: "00",
        vchDescripcion: "",
      },
      estado: CRUD.INSERT.estado,
      accion: CRUD.INSERT,
      error: {
        vchDireccion: { mensaje: "", isValidado: false },
        vchNombre: { mensaje: "", isValidado: false },
        vchApellido: { mensaje: "", isValidado: false },
        vchTelefono: { mensaje: "", isValidado: false },
        chrCodigoDepartamento: { mensaje: "", isValidado: false },
        chrCodigoProvincia: { mensaje: "", isValidado: false },
        chrCodigoDistrito: { mensaje: "", isValidado: false },
        vchDocumento: { mensaje: "", isValidado: false },
        numTipoDocumento: { mensaje: "", isValidado: false },
      },
    };
    console.log(state);
    dispatch({ type: actionType.MODAL_SHOW_DIRECCION, showDireccion: true, direccion: _tmpdireccion });
  }
  async function handleEventModalConfirmarEliminacion() {
    let rowDireccion = [];
    /*Resolver< */
    let rowDireccionData = [];
    for (let j = 0; j < state.lstDireccionData.length; j++) {
      const element = state.lstDireccionData[j];
      element.indice = j;
      if (element.indice !== state.direccion.indice) {
        if (element.accion === CRUD.INSERT || element.accion === CRUD.UPDATE || element.accion === CRUD.SELECT) {
          rowDireccion.push(
            <CardDireccion direccion={element}
              handleEventShow={handleEventShowModalDireccion}></CardDireccion>
          );
        }

      } else {
        element.accion = CRUD.DELETE;
      }
      rowDireccionData.push(element);
    }
    dispatch({
      type: actionType.DIRECCION_GUARDAR, showDireccion: false,
      lstDireccion: rowDireccion,
      lstDireccionData: rowDireccionData
    });
    dispatchModal({
      type: actionTypeModal.SHOW_MODAL,
      show: false,
      mensaje: "",
      title: "",
    });
  }

  function handleEventModalConfirmarHidden() {
    dispatchModal({
      type: actionTypeModal.SHOW_MODAL,
      show: false,
      mensaje: "",
      title: "",
    });
  }

  return (
    <div className="registrar-cliente">
      <div className="link-href">
        <Link to="/shop">
          <i className="fa fa-home" aria-hidden="true"></i>
          Inicio
        </Link>
        {state.accion === CRUD.UPDATE ? <span>/</span> : ""}
        {state.accion === CRUD.UPDATE ? (
          <Link to="/dashboard">
            <i className="fa fa-user"></i>Su cuenta
          </Link>
        ) : (
          ""
        )}
        {params.linkNavegacion === "CarritoPayment" ? (
          <>
            <span>/</span>
            <Link to="/pedidoCarrito">
              <i className="fa fa-arrow-left"></i>Volver
            </Link>
          </>
        ) : (
          ""
        )}
      </div>

      {state.accion === CRUD.INSERT ? (
        <h3>Crear una cuenta</h3>
      ) : (
        <h3>Actualizar datos personales</h3>
      )}

      <div className="form-body-cliente">
        <br />
        {state.accion === CRUD.INSERT ? (
          <div>
            ¿Ya tiene una cuenta?{" "}
            <span className="link-app">
              <Link aria-hidden="true" to="/loginCliente">
                ¡Inicie sesión!
              </Link>
            </span>
          </div>
        ) : (
          ""
        )}
        <div className="row-body-radio">
          <label htmlFor="chrTratamiento1" className="label1">
            Tratamiento
          </label>

          <label htmlFor="chrTratamiento1" className="label2">
            {"  Sr.   "}
          </label>
          <input
            type="radio"
            id="chrTratamiento1"
            name="chrTratamiento"
            value="1"
            checked={state.chrTratamiento === "1" ? true : false}
            onChange={(e) =>
              dispatch({
                type: actionType.chrTratamiento,
                chrTratamiento: "1",
              })
            }
          />
          <label htmlFor="chrTratamiento2" className="label2">
            {"  Sra.  "}
          </label>

          <input
            type="radio"
            id="chrTratamiento2"
            name="chrTratamiento"
            value="0"
            checked={state.chrTratamiento === "0" ? true : false}
            onChange={(e) =>
              dispatch({
                type: actionType.chrTratamiento,
                chrTratamiento: "0",
              })
            }
          />
        </div>

        <div className="row-body">
          <label htmlFor="vchNombre">Nombre</label>
          <input
            type="text"
            name="vchNombre"
            className="form-control"
            autoComplete="false"
            autoSave="false"
            value={state.vchNombre}
            onChange={(e) =>
              dispatch({
                type: actionType.vchNombre,
                vchNombre: e.target.value,
              })
            }
          ></input>
          {state.error.vchNombre.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.vchNombre.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="vchApellidoPaterno">Apellidos Paterno</label>
          <input
            type="text"
            name="vchApellidoPaterno"
            className="form-control"
            autoComplete="false"
            autoSave="false"
            value={state.vchApellidoPaterno}
            onChange={(e) =>
              dispatch({
                type: actionType.vchApellidoPaterno,
                vchApellidoPaterno: e.target.value,
              })
            }
          ></input>
          {state.error.vchApellidoPaterno.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.vchApellidoPaterno.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="vchApellidoMaterno">Apellidos Materno</label>
          <input
            type="text"
            name="vchApellidoMaterno"
            className="form-control"
            autoComplete="false"
            autoSave="false"
            value={state.vchApellidoMaterno}
            onChange={(e) =>
              dispatch({
                type: actionType.vchApellidoMaterno,
                vchApellidoMaterno: e.target.value,
              })
            }
          ></input>
          {state.error.vchApellidoMaterno.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.vchApellidoMaterno.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="chrEmail">Dirección de correo electrónico</label>
          <input
            type="text"
            name="chrEmail"
            className="form-control"
            autoComplete="false"
            autoSave="false"
            disabled={state.accion === CRUD.UPDATE ? true : false}
            value={state.chrEmail}
            onChange={(e) =>
              dispatch({ type: actionType.chrEmail, chrEmail: e.target.value })
            }
          ></input>
          {state.error.chrEmail.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.chrEmail.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="numTipoCliente">Tipo de Documento</label>
          <select
            className="form-control form-select "
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
          {state.error.numTipoCliente.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.numTipoCliente.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>

        <div className="row-body">
          <label htmlFor="documento">Documento</label>
          <input
            type="text"
            name="vchDocumento"
            className="form-control"
            autoComplete="false"
            autoSave="false"
            disabled={state.accion === CRUD.UPDATE ? true : false}
            value={state.vchDocumento}
            onChange={(e) =>
              dispatch({
                type: actionType.vchDocumento,
                vchDocumento: e.target.value,
              })
            }
          ></input>
          {state.error.vchDocumento.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.vchDocumento.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>

        {parseInt(state.numTipoCliente) === TipoDocumento.RUC.numtipocliente ? (
          <div className="row-body">
            <label htmlFor="vchNombreCompleto">Razón Social</label>
            <input
              type="text"
              name="vchNombreCompleto"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              value={state.vchNombreCompleto}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchNombreCompleto,
                  vchNombreCompleto: e.target.value,
                })
              }
            ></input>
            {state.error.vchNombreCompleto.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.error.vchNombreCompleto.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>
        ) : (
          ""
        )}
        <div className="row-body">
          <label htmlFor="vchDireccion">
            Dirección Facturación (domicilio fiscal)
          </label>
          <input
            type="text"
            name="vchDireccion"
            className="form-control"
            autoComplete="false"
            autoSave="false"
            value={state.vchDireccion}
            onChange={(e) =>
              dispatch({
                type: actionType.vchDireccion,
                vchDireccion: e.target.value,
              })
            }
          ></input>
          {state.error.vchDireccion.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.vchDireccion.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="chrCodigoDepartamento">Departamento</label>
          <select
            className="form-control form-select "
            name="chrCodigoDepartamento"
            value={state.chrCodigoDepartamento}
            onChange={handleEventChangeDepartamento}
          >
            <option value="00">-- por favor, seleccione --</option>
            {state.lstDepartamento}
          </select>
          {state.error.chrCodigoDepartamento.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.chrCodigoDepartamento.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="chrCodigoProvincia">Provincia</label>
          <select
            className="form-control form-select "
            name="chrCodigoProvincia"
            value={state.chrCodigoProvincia}
            onChange={handleEventChangeProvincia}
          >
            <option value="00">-- por favor, seleccione --</option>
            {state.lstProvincia}
          </select>
          {state.error.chrCodigoProvincia.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.chrCodigoProvincia.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="chrCodigoDistrito">Distrito</label>
          <select
            className="form-control form-select "
            name="chrCodigoDistrito"
            value={state.chrCodigoDistrito}
            onChange={handleEventChangeDistrito}
          >
            <option value="00">-- por favor, seleccione --</option>
            {state.lstDistrito}
          </select>
          {state.error.chrCodigoDistrito.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.chrCodigoDistrito.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body">
          <label htmlFor="chrPassword">Contraseña</label>
          <input
            type="password"
            className="form-control"
            name="chrPassword"
            autoComplete="false"
            autoSave="false"
            value={state.chrPassword}
            onChange={(e) =>
              dispatch({
                type: actionType.chrPassword,
                chrPassword: e.target.value,
              })
            }
          ></input>
          {state.error.chrPassword.isValidado ? (
            <span className="alert alert-danger" role="alert">
              {state.error.chrPassword.mensaje}
            </span>
          ) : (
            ""
          )}
        </div>
        <div className="row-body row-body-title">
          <label htmlFor="chrDirecciones">Mis direcciones de entrega</label>
          <button className="btn btn-primary" onClick={handleEventShowModalAgregarDireccion}>
            <i className="fa fa-address-card-o"></i>Agregar
        </button>
        </div>
        <div className="row-body-lista">
          {state.lstDireccion}
        </div>


        <div className="row-body-check">
          <div>{""}</div>
          <span>
            <input
              type="checkbox"
              name="flgOfertas"
              checked={state.flgOfertas}
              onChange={(e) =>
                dispatch({
                  type: actionType.flgOfertas,
                  flgOfertas: e.target.checked,
                })
              }
            ></input>
            <label htmlFor="password">Recibir ofertas de nuestros socios</label>
          </span>
        </div>
        <div className="row-body-check">
          <div>{""}</div>
          <div className="row-body-check-content">
            <input
              type="checkbox"
              name="flgSuscripcion"
              checked={state.flgSuscripcion}
              onChange={(e) =>
                dispatch({
                  type: actionType.flgSuscripcion,
                  flgSuscripcion: e.target.checked,
                })
              }
            ></input>
            Suscribirse a nuestro boletín de noticias, Puede darse de baja en
            cualquier momento. Para ello, consulte nuestra información de
            contacto en el aviso legal.
          </div>
        </div>

        <div className="action">
          <div>{""}</div>
          <button className="btn btn-primary" onClick={handleEventRegistrar}>
            {state.estado}
          </button>{" "}
        </div>
      </div>

      <div className="link-href">
        <Link to="/shop">
          <i className="fa fa-home" aria-hidden="true"></i>
          Inicio
        </Link>
        {state.accion === CRUD.UPDATE ? <span>/</span> : ""}
        {state.accion === CRUD.UPDATE ? (
          <Link to="/dashboard">
            <i className="fa fa-user"></i>Su cuenta
          </Link>
        ) : (
          ""
        )}
        {params.linkNavegacion === "CarritoPayment" ? (
          <>
            <span>/</span>
            <Link to="/pedidoCarrito">
              <i className="fa fa-arrow-left"></i>Volver
            </Link>
          </>
        ) : (
          ""
        )}
      </div>
      <ServerException server={state.server}></ServerException>

      <Modal
        className="modal-direccion"
        show={state.showDireccion}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered

      >
        <Modal.Header closeButton onHide={() => dispatch({ type: actionType.MODAL_SHOW, showDireccion: false })} >
          <Modal.Title id="contained-modal-title-vcenter"  >
            {state.direccion.accion.codigoCrud === CRUD.UPDATE.codigoCrud
              ? "Actualizar dirección"
              : "Registrar dirección"}

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="form-row-direccion">
            <label htmlFor="vchrAlias">Alias</label>
            <input
              type="text"
              name="vchrAlias"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              maxLength={128}
              value={state.direccion.vchrAlias}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchrAlias_DIRECCION,
                  vchrAlias: e.target.value,
                })
              }
            ></input>

          </div>

          <div className="form-row-direccion">
            <label htmlFor="vchDireccion">Dirección</label>
            <input
              type="text"
              name="vchDireccion"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              maxLength={128}
              value={state.direccion.vchDireccion}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchDireccion_DIRECCION,
                  vchDireccion: e.target.value,
                })
              }
            ></input>

            {state.direccion.error.vchDireccion.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.vchDireccion.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="form-row-direccion">
            <label htmlFor="vchreferencia">Dirección de referencia</label>
            <input
              type="text"
              name="vchreferencia"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              maxLength={128}
              value={state.direccion.vchreferencia}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchreferencia_DIRECCION,
                  vchreferencia: e.target.value,
                })
              }
            ></input>
          </div>

          <div className="form-row-direccion">
            <label htmlFor="chrCodigoDepartamento">Departamento</label>
            <select
              className="form-control "
              name="chrCodigoDepartamento"
              value={state.direccion.departamento.chrCodigoDepartamento}
              onChange={handleEventChangeDepartamentoDirrecion}
            >
              <option value="00">-- por favor, seleccione --</option>
              {state.lstDepartamento}
            </select>
            {state.direccion.error.chrCodigoDepartamento.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.chrCodigoDepartamento.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-row-direccion">
            <label htmlFor="chrCodigoProvincia">Provincia</label>
            <select
              className="form-control "
              name="chrCodigoProvincia"
              value={state.direccion.provincia.chrCodigoProvincia}
              onChange={handleEventChangeProvinciaDireccion}
            >
              <option value="00">-- por favor, seleccione --</option>
              {state.lstProvinciaD}
            </select>
            {state.direccion.error.chrCodigoProvincia.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.chrCodigoProvincia.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-row-direccion">
            <label htmlFor="chrCodigoDistrito">Distrito</label>
            <select
              className="form-control"
              name="chrCodigoDistrito"
              value={state.direccion.distrito.chrCodigoDistrito}
              onChange={handleEventChangeDistritoDireccion}
            >
              <option value="00">-- por favor, seleccione --</option>
              {state.lstDistritoD}
            </select>
            {state.direccion.error.chrCodigoDistrito.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.chrCodigoDistrito.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-row-direccion  row-direccion-center">
            <label className="form-row-direccion-title">Nombre de la persona que va a recibir</label>
          </div>
          <div className="form-row-direccion">
            <label htmlFor="numTipoDocumento">Tipo Documento</label>
            <select
              className="form-control form-select "
              name="numTipoCliente"

              value={state.direccion.numTipoDocumento}
              onChange={(e) => {

                dispatch({
                  type: actionType.numTipoDocumento_DIRECCION,
                  numTipoDocumento: e.target.value,
                })
              }
              }
            >
              <option value={TipoDocumento.DEFAULT.numtipocliente}>
                {TipoDocumento.DEFAULT.vchdescripcion}
              </option>
              <option value={TipoDocumento.DNI.numtipocliente}>
                {TipoDocumento.DNI.vchdescripcion}
              </option>

              <option value={TipoDocumento.CARNET_EXT.numtipocliente}>
                {TipoDocumento.CARNET_EXT.vchdescripcion}
              </option>
              <option value={TipoDocumento.PASAPORTE.numtipocliente}>
                {TipoDocumento.PASAPORTE.vchdescripcion}
              </option>
            </select>
            {state.direccion.error.numTipoDocumento.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.numTipoDocumento.mensaje}
              </span>
            ) : (
              ""
            )}

          </div>
          <div className="form-row-direccion">
            <label htmlFor="vchNombre">Documento</label>
            <input
              type="text"
              name="vchDocumento"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              maxLength={128}
              value={state.direccion.vchDocumento}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchDocumento_DIRECCION,
                  vchDocumento: e.target.value,
                })
              }
            ></input>
            {state.direccion.error.vchDocumento.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.vchDocumento.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>

          <div className="form-row-direccion">
            <label htmlFor="vchNombre">Nombre</label>
            <input
              type="text"
              name="vchNombre"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              maxLength={128}
              value={state.direccion.vchNombre}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchNombre_DIRECCION,
                  vchNombre: e.target.value,
                })
              }
            ></input>
            {state.direccion.error.vchNombre.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.vchNombre.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-row-direccion">
            <label htmlFor="vchApellido">Apellidos</label>
            <input
              type="text"
              name="vchApellido"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              maxLength={128}
              value={state.direccion.vchApellido}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchApellido_DIRECCION,
                  vchApellido: e.target.value,
                })
              }
            ></input>
            {state.direccion.error.vchApellido.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.vchApellido.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-row-direccion">
            <label htmlFor="vchTelefono">Telefono</label>
            <input
              type="text"
              name="vchTelefono"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              maxLength={15}
              value={state.direccion.vchTelefono}
              onChange={(e) =>
                dispatch({
                  type: actionType.vchTelefono_DIRECCION,
                  vchTelefono: e.target.value,
                })}
            ></input>
            {state.direccion.error.vchTelefono.isValidado ? (
              <span className="alert alert-danger" role="alert">
                {state.direccion.error.vchTelefono.mensaje}
              </span>
            ) : (
              ""
            )}
          </div>
          <div className="form-row-direccion">
            <label htmlFor="flgPredeterminado">
              Dirección Predeterminada
              </label>
            <input
              type="checkbox"
              name="flgPredeterminado"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              checked={state.direccion.flgPredeterminado}
              onChange={(e) =>
                dispatch({
                  type: actionType.flgPredeterminado_DIRECCION,
                  flgPredeterminado: e.target.checked,
                })
              }
            ></input>
            <br />
            <span>La dirección seleccionada se utilizará tanto como de dirección personal (para la factura) como de dirección de entrega.</span>
          </div>

          <Modal.Footer>
            <button
              onClick={handleEventSaveDireccion}
              className="btn btn-primary" >
              Adicionar
            </button>
            <button onClick={() => dispatch({ type: actionType.MODAL_SHOW, showDireccion: false })} className="btn btn-primary">

              Cerrar
          </button>
          </Modal.Footer>

        </Modal.Body>
      </Modal>

      {modalConfirmarShow ? (
        <ModalConfirmar
          show={modalConfirmarShow.show}
          title={modalConfirmarShow.title}
          mensaje={modalConfirmarShow.mensaje}
          handleActionSi={handleEventModalConfirmarEliminacion}
          handleActionNo={handleEventModalConfirmarHidden}
        ></ModalConfirmar>
      ) : (
        ""
      )}
    </div>
  );
}
function CardDireccion(props) {


  let direccion = {
    indice: props.direccion.indice,
    numCodigoDireccion: props.direccion.numCodigoDireccion,
    numCodigoCliente: props.direccion.numCodigoCliente,
    vchDireccion: props.direccion.vchDireccion,
    vchreferencia: props.direccion.vchreferencia,
    vchNombre: props.direccion.vchNombre,
    vchApellido: props.direccion.vchApellido,
    chrCodigoUbigeo: props.direccion.chrCodigoUbigeo,
    vchTelefono: props.direccion.vchTelefono,
    flgRegistro: props.direccion.flgRegistro,
    flgPredeterminado: props.direccion.flgPredeterminado,
    vchrAlias: props.direccion.vchrAlias,
    numTipoDocumento: props.direccion.numTipoDocumento,
    vchDocumento: props.direccion.vchDocumento,
    departamento: {
      chrCodigoDepartamento: props.direccion.departamento.chrCodigoDepartamento,
      vchDescripcion: props.direccion.departamento.vchDescripcion,
    },
    provincia: {
      chrCodigoProvincia: props.direccion.provincia.chrCodigoProvincia,
      vchDescripcion: props.direccion.provincia.vchDescripcion,
    },
    distrito: {
      chrCodigoDistrito: props.direccion.distrito.chrCodigoDistrito,
      vchDescripcion: props.direccion.distrito.vchDescripcion,
    },
    estado: props.direccion.estado,
    accion: props.direccion.accion,
    error: {
      vchDireccion: { mensaje: "", isValidado: false },
      vchNombre: { mensaje: "", isValidado: false },
      vchApellido: { mensaje: "", isValidado: false },
      vchTelefono: { mensaje: "", isValidado: false },
      chrCodigoDepartamento: { mensaje: "", isValidado: false },
      chrCodigoProvincia: { mensaje: "", isValidado: false },
      chrCodigoDistrito: { mensaje: "", isValidado: false },
      vchDocumento: { mensaje: "", isValidado: false },
      numTipoDocumento: { mensaje: "", isValidado: false },
    },
  };

  return (<>
    <div className="registrar-direccion-card">       
      <div className="card-row-direccion">
        {direccion.flgPredeterminado ? (
          <i className="fa fa-star direccion-fa" aria-hidden="true" title="La dirección seleccionada se utilizará tanto como de dirección personal (para la factura) como de dirección de entrega." ></i>
        ) : (
          ""
        )}
        <span>{direccion.vchrAlias === null ? "-" : direccion.vchrAlias} </span>
      </div>
      <div className="card-row-direccion">
        <span>{direccion.vchDireccion}</span>
      </div>
      <div className="card-row-direccion">
        <span>
          {direccion.vchreferencia === null ? "-" : direccion.vchreferencia}
        </span>
      </div>
      <div className="card-row-direccion">
        <span>
          {direccion.vchDocumento}
        </span>
      </div>
      <div className="card-row-direccion">
        <span>
          {direccion.vchApellido}
          {", "}
          {direccion.vchNombre}
        </span>
      </div>

      <div className="card-row-direccion">
        <span>{direccion.vchTelefono}</span>
      </div>
      <div className="card-row-direccion">
        <span>
          {" "}
          {direccion.departamento.vchDescripcion} /{" "}
          {direccion.provincia.vchDescripcion} /{" "}
          {direccion.distrito.vchDescripcion}
        </span>
      </div>
      <div className="card-row-direccion">
        <button className="btn btn-primary" onClick={(e) => props.handleEventShow(direccion, CRUD.UPDATE)}>
          {" "}
          <i className="fa fa-pencil" aria-hidden="true"></i>Editar
      </button>
      &nbsp;&nbsp;
      <button
          className="btn btn-primary"
          onClick={(e) => props.handleEventShow(direccion, CRUD.DELETE)}
        >
          {" "}
          <i className="fa fa-trash" aria-hidden="true"></i>Quitar
      </button>
      </div>
    </div>
  </>)
}

export { CardDireccion };
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
    emailRegex.test(state.chrEmail.toUpperCase()===false)
  ) {
    _error.chrEmail.mensaje = "El formato el correo no es valido";
    _error.chrEmail.isValidado = true;
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

  if (state.numTipoCliente === 0) {
    _error.numTipoCliente.mensaje = "Seleccione el tipo de documento";
    _error.numTipoCliente.isValidado = true;
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
  }
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


function handleValidarFormDireccion(state) {
  console.log(state);
  /* eslint-disable */
  /*Iniciando la estructura del objeto para el control de mensajes depues de la validacion */
  let _error = {
    vchDireccion: { mensaje: "", isValidado: false },
    vchNombre: { mensaje: "", isValidado: false },
    vchApellido: { mensaje: "", isValidado: false },
    vchTelefono: { mensaje: "", isValidado: false },
    chrCodigoDepartamento: { mensaje: "", isValidado: false },
    chrCodigoProvincia: { mensaje: "", isValidado: false },
    chrCodigoDistrito: { mensaje: "", isValidado: false },
    vchDocumento: { mensaje: "", isValidado: false },
    numTipoDocumento: { mensaje: "", isValidado: false },
    isValido: true,
  };
  /*Criterios de validaciones */
  let isValido = true;

  if (!state.vchDireccion) {
    _error.vchDireccion.mensaje = "Ingrese la dirección";
    _error.vchDireccion.isValidado = true;
    isValido = false;
  }

  if (state.numTipoDocumento === "") {
    _error.numTipoDocumento.mensaje = "Seleccione el tipo de documento";
    _error.numTipoDocumento.isValidado = true;
    isValido = false;
  }

  if (state.numTipoDocumento == TipoDocumento.DNI.numtipocliente) {
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
  if (state.numTipoDocumento == TipoDocumento.CARNET_EXT.numtipocliente) {
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
  if (state.numTipoDocumento == TipoDocumento.PASAPORTE.numtipocliente) {
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



  if (!state.vchNombre) {
    _error.vchNombre.mensaje = "Ingrese su nombre";
    _error.vchNombre.isValidado = true;
    isValido = false;
  }
  if (!state.vchApellido) {
    _error.vchApellido.mensaje = "Ingrese los apellidos";
    _error.vchApellido.isValidado = true;
    isValido = false;
  }
  if (!state.vchTelefono) {
    _error.vchTelefono.mensaje = "Ingrese el numero de teléfono";
    _error.vchTelefono.isValidado = true;
    isValido = false;
  }
  if (state.departamento.chrCodigoDepartamento === "00") {
    _error.chrCodigoDepartamento.mensaje = "Seleccione el Departamento";
    _error.chrCodigoDepartamento.isValidado = true;
    isValido = false;
  }
  if (state.provincia.chrCodigoProvincia === "00") {
    _error.chrCodigoProvincia.mensaje = "Seleccione el Provincia";
    _error.chrCodigoProvincia.isValidado = true;
    isValido = false;
  }
  if (state.distrito.chrCodigoDistrito === "00") {
    _error.chrCodigoDistrito.mensaje = "Seleccione el Distrito";
    _error.chrCodigoDistrito.isValidado = true;
    isValido = false;
  }
  _error.isValido = isValido;
  /*Registrando los mensajes  */
  /* eslint-enable */

  return _error;
}