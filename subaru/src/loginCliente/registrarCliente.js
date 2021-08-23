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
  tipoDireccion,
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

import zxcvbn from 'zxcvbn';
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
  vchTelefonoMovil: "vchTelefonoMovil",
  vchTelefonoFijo: "vchTelefonoFijo",

  /*****/
  vchDireccion_DIRECCION: "vchDireccion_DIRECCION",
  vchreferencia_DIRECCION: "vchreferencia_DIRECCION",
  vchNombre_DIRECCION: "vchNombre_DIRECCION",
  vchApellido_DIRECCION: "vchApellido_DIRECCION",
  chrCodigoUbigeo_DIRECCION: "chrCodigoUbigeo_DIRECCION",
  vchTelefono_DIRECCION: "vchTelefono_DIRECCION",
  flgPredeterminado_DIRECCION: "flgPredeterminado_DIRECCION",
  flgDespacho_DIRECCION: "flgDespacho_DIRECCION",
  flgMismoRecepciona_DIRECCION: "flgMismoRecepciona_DIRECCION",
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
    case actionType.flgDespacho_DIRECCION:
      _direccion.flgDespacho = action.flgDespacho;
      return {
        ...state,
        direccion: _direccion
      };
    case actionType.flgMismoRecepciona_DIRECCION:
      _direccion.flgMismoRecepciona = action.flgMismoRecepciona;
      _direccion.numTipoDocumento = action.numTipoDocumento;
      _direccion.vchDocumento = action.vchDocumento;
      _direccion.vchNombre = action.vchNombre;
      _direccion.vchApellido = action.vchApellido;
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
    case actionType.vchTelefonoMovil:
      return {
        ...state,
        vchTelefonoMovil: action.vchTelefonoMovil,
      };
    case actionType.vchTelefonoFijo:
      return {
        ...state,
        vchTelefonoFijo: action.vchTelefonoFijo,
      };
    case actionType.chrPassword:
      return {
        ...state,
        chrPassword: action.chrPassword,
        statusPassword:action.statusPassword
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
        vchTelefonoFijo: action.vchTelefonoFijo,
        vchTelefonoMovil: action.vchTelefonoMovil,

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
      state.error.chrCodigoDepartamento.mensaje = action.error.chrCodigoDepartamento.mensaje;
      state.error.chrCodigoDepartamento.isValidado = action.error.chrCodigoDepartamento.isValidado;

      state.error.chrCodigoProvincia.mensaje = action.error.chrCodigoProvincia.mensaje;
      state.error.chrCodigoProvincia.isValidado = action.error.chrCodigoProvincia.isValidado;

      state.error.chrCodigoDistrito.mensaje = action.error.chrCodigoDistrito.mensaje;
      state.error.chrCodigoDistrito.isValidado = action.error.chrCodigoDistrito.isValidado;

      state.error.vchDireccion.mensaje = action.error.vchDireccion.mensaje;
      state.error.vchDireccion.isValidado = action.error.vchDireccion.isValidado;
      return {
        ...state,
        showDireccion: action.showDireccion,
        direccion: action.direccion,
        lstProvinciaD: action.lstProvinciaD,
        lstDistritoD: action.lstDistritoD,
        error: state.error
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

      state.error.chrCodigoDepartamento.mensaje = action.error.chrCodigoDepartamentoCliente.mensaje;
      state.error.chrCodigoDepartamento.isValidado = action.error.chrCodigoDepartamentoCliente.isValidado;

      state.error.chrCodigoProvincia.mensaje = action.error.chrCodigoProvinciaCliente.mensaje;
      state.error.chrCodigoProvincia.isValidado = action.error.chrCodigoProvinciaCliente.isValidado;

      state.error.chrCodigoDistrito.mensaje = action.error.chrCodigoDistritoCliente.mensaje;
      state.error.chrCodigoDistrito.isValidado = action.error.chrCodigoDistritoCliente.isValidado;

      state.error.vchDireccion.mensaje = action.error.vchDireccionCliente.mensaje;
      state.error.vchDireccion.isValidado = action.error.vchDireccionCliente.isValidado;

      _direccion.error = action.error;
      return {
        ...state,
        direccion: _direccion,
        error: state.error
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
    vchTelefonoFijo: "",
    vchTelefonoMovil: "",
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
    flgDespacho: "",
    flgFacturacion: "0",
    flgMismoRecepciona: false,
    nsecuencia: 0,
    vchrAlias: "",
    numTipoDocumento: 0,
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
    statusPassword: -1,
    error: {
      vchDireccion: { mensaje: "", isValidado: false },
      vchNombre: { mensaje: "", isValidado: false },
      vchApellido: { mensaje: "", isValidado: false },
      vchTelefono: { mensaje: "", isValidado: false },
      chrCodigoDepartamento: { mensaje: "", isValidado: false },
      chrCodigoProvincia: { mensaje: "", isValidado: false },
      chrCodigoDistrito: { mensaje: "", isValidado: false },
      vchDocumento: { mensaje: "", isValidado: false },
      vchreferencia: { mensaje: "", isValidado: false },
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
    vchTelefonoFijo: usuarioData.vchTelefonoFijo,
    vchTelefonoMovil: usuarioData.vchTelefonoMovil,
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
      vchTelefonoFijo: { mensaje: "", isValidado: false },
      vchTelefonoMovil: { mensaje: "", isValidado: false },
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
      console.log(json);
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
        usuarioData.vchTelefonoFijo = json.cliente.vchTelefonoFijo;
        usuarioData.vchTelefonoMovil = json.cliente.vchTelefonoMovil;
        /*
        usuarioData.chrCodigoDepartamento =json.cliente.ubigeo.chrCodigoDepartamento;
        usuarioData.chrCodigoProvincia = json.cliente.ubigeo.chrCodigoProvincia;
        usuarioData.chrCodigoDistrito = json.cliente.ubigeo.chrCodigoDistrito;

        let rowDistrito = await handleObtenerDistrito({
          chrCodigoDepartamento: usuarioData.chrCodigoDepartamento,
          chrCodigoProvincia: usuarioData.chrCodigoProvincia,
        });
        let rowProvincia = await handleObtenerProvincia(
          usuarioData.chrCodigoDepartamento
        );*/

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
                flgFacturacion: direccion.flgFacturacion,
                flgMismoRecepciona: direccion.flgMismoRecepciona,
                vchrAlias: direccion.vchrAlias,
                numTipoDocumento: direccion.numTipoDocumento,
                vchDocumento: direccion.vchDocumento,
                nsecuencia: direccion.nsecuencia,
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
                  vchreferencia: { mensaje: "", isValidado: false },
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
          vchTelefonoFijo: usuarioData.vchTelefonoFijo,
          vchTelefonoMovil: usuarioData.vchTelefonoMovil,
          lstProvincia: [],
          lstDistrito: [],
          lstDireccion: rowDireccion,
          lstDireccionData: rowDireccionData,

          lstProvinciaD: [],
          lstDistritoD: [],
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
  }/*
  async function handleEventChangeDepartamento(e) {
    isloadingProvincia:true que cargue los provincias al renderizar en el Hook useEffect 
    dispatch({
      type: actionType.DEPARTAMENTO,
      chrCodigoDepartamento: e.target.value,
      chrCodigoProvincia: "00",
      chrCodigoDistrito: "00",
      isloadingProvincia: true,
    });
  }
*/
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
  /*
    async function handleEventChangeProvincia(e) {
       isloadingDistrito:true que cargue los distritos al renderizar en el Hook useEffect
      dispatch({
        type: actionType.PROVINCIA,
        chrCodigoProvincia: e.target.value,
        chrCodigoDistrito: "00",
        isloadingDistrito: true,
      });
    }
  */
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
  /*
    async function handleEventChangeDistrito(e) {
      dispatch({
        type: actionType.DISTRITO,
        chrCodigoDistrito: e.target.value,
      });
    }*/
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
    console.log(valError.isValido);
    if (valError.isValido) {
      let rowDireccion = [];
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
          //flgPredeterminado: element.flgPredeterminado,
          flgFacturacion: element.flgFacturacion,
          flgMismoRecepciona: element.flgMismoRecepciona,
          nsecuencia: element.nsecuencia,
          departamento: { chrCodigoDepartamento: element.departamento.chrCodigoDepartamento },
          provincia: { chrCodigoProvincia: element.provincia.chrCodigoProvincia },
          distrito: { chrCodigoDistrito: element.distrito.chrCodigoDistrito },
          vchDocumento: element.vchDocumento,
          numTipoDocumento: element.numTipoDocumento,
          crud: element.accion.descripcion
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
          vchTelefonoFijo: state.vchTelefonoFijo,
          vchTelefonoMovil: state.vchTelefonoMovil,
          ubigeo: {
            chrCodigoDepartamento: state.chrCodigoDepartamento,
            chrCodigoProvincia: state.chrCodigoProvincia,
            chrCodigoDistrito: state.chrCodigoDistrito,
          },
        },
        listaDireccion: rowDireccion
      };

      const rpt = await registrarCliente(clienteRequets);

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
      flgDespacho: (parseInt(_direccion.numTipoDocumento, 10) === 0 ? false : true),
      flgFacturacion: _direccion.flgFacturacion,
      flgMismoRecepciona: _direccion.flgMismoRecepciona,
      vchrAlias: _direccion.vchrAlias,
      numTipoDocumento: _direccion.numTipoDocumento,
      vchDocumento: _direccion.vchDocumento,
      nsecuencia: _direccion.nsecuencia,
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
        vchreferencia: { mensaje: "", isValidado: false },
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

      let _error = {
        chrCodigoDepartamento: { mensaje: "", isValidado: false },
        chrCodigoProvincia: { mensaje: "", isValidado: false },
        chrCodigoDistrito: { mensaje: "", isValidado: false },
        vchDireccion: { mensaje: "", isValidado: false }
      };
      console.log(direccion);
      dispatch({
        type: actionType.MODAL_SHOW_DIRECCION,
        showDireccion: true,
        direccion: direccion,
        lstProvinciaD: rowProvincia,
        lstDistritoD: rowDistrito,
        error: _error
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
    const valError = await handleValidarFormDireccion(state);

    if (valError.isValido) {

      let rowDireccion = [];
      let rowDireccionTmp = [];
      let rowDireccionData = [];

      let index = 0;
      let count = 0;
      for (let j = 0; j < state.lstDireccionData.length; j++) {
        const element = state.lstDireccionData[j];
        if (element.accion === CRUD.INSERT || element.accion === CRUD.UPDATE || element.accion === CRUD.SELECT) {
          if (element.vchrAlias === tipoDireccion.FACTURACION) {
            count = count + 1;
          }
        }
      }
      if (state.direccion.accion !== CRUD.UPDATE) {
        if (count === 0) {
          state.direccion.vchrAlias = tipoDireccion.FACTURACION;
          state.direccion.flgFacturacion = '1';
          state.direccion.flgPredeterminado = '1';
        } else {
          state.direccion.vchrAlias = tipoDireccion.DESPACHO;
          state.direccion.flgFacturacion = '0';
        }
      }
      let _direccionTemp;
      let nsecuenciaDespacho = 0;
      let nsecuenciaFacturacion = 0;
      console.log(state.direccion.indice);
      for (let j = 0; j < state.lstDireccionData.length; j++) {
        const element = state.lstDireccionData[j];
        if (element.indice === state.direccion.indice
          && state.direccion.accion === CRUD.UPDATE) {
          _direccionTemp = state.direccion;
          rowDireccionData.push(_direccionTemp);
          rowDireccionTmp.push(_direccionTemp);
          console.log('update');
        } else {
          if (state.direccion.flgPredeterminado === true) {
            element.flgPredeterminado = false;
          }
          rowDireccionData.push(element);
          if (element.accion === CRUD.INSERT || element.accion === CRUD.UPDATE || element.accion === CRUD.SELECT) {
            rowDireccionTmp.push(element);
          }
          console.log('others');
        }
        index = j;
        console.log("Indice:" + index);
      }

      if (state.direccion.accion === CRUD.INSERT) {
        state.direccion.indice = index + 1;
        rowDireccionData.push(state.direccion);
        rowDireccionTmp.push(state.direccion);
      }



      for (let j = 0; j < rowDireccionTmp.length; j++) {
        const _direccion = rowDireccionTmp[j];
        if (_direccion.vchrAlias === tipoDireccion.FACTURACION) {
          nsecuenciaFacturacion = nsecuenciaFacturacion + 1;
          _direccion.nsecuencia = nsecuenciaFacturacion;
        }
        if (_direccion.vchrAlias === tipoDireccion.DESPACHO) {
          nsecuenciaDespacho = nsecuenciaDespacho + 1;
          _direccion.nsecuencia = nsecuenciaDespacho;
        }
        rowDireccion.push(<CardDireccion direccion={_direccion}
          handleEventShow={handleEventShowModalDireccion}></CardDireccion>);
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

  }

  async function handleEventShowModalAgregarDireccion() {
    let _flgDespacho = false;
    for (let j = 0; j < state.lstDireccionData.length; j++) {
      const element = state.lstDireccionData[j];
      if (element.accion === CRUD.INSERT || element.accion === CRUD.UPDATE || element.accion === CRUD.SELECT) {
        if (element.vchrAlias === tipoDireccion.FACTURACION) {
          _flgDespacho = true;
          break;
        }
      }
    }

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
      flgDespacho: _flgDespacho,
      flgMismoRecepciona: false,
      vchrAlias: "",
      numTipoDocumento: 0,
      vchDocumento: "",
      departamento: {
        chrCodigoDepartamento: "15",
        vchDescripcion: "LIMA",
      },
      provincia: {
        chrCodigoProvincia: "01",
        vchDescripcion: "LIMA",
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
        vchreferencia: { mensaje: "", isValidado: false },
      },
    };
    let _error = {
      chrCodigoDepartamento: { mensaje: "", isValidado: false },
      chrCodigoProvincia: { mensaje: "", isValidado: false },
      chrCodigoDistrito: { mensaje: "", isValidado: false },
      vchDireccion: { mensaje: "", isValidado: false }
    };
    let rowProvincia = await handleObtenerProvincia(
      "15"
    );
    let rowDistrito = await handleObtenerDistrito({
      chrCodigoDepartamento: "15",
      chrCodigoProvincia: "01",
    });
    dispatch({
      type: actionType.MODAL_SHOW_DIRECCION, showDireccion: true,
      direccion: _tmpdireccion,
      lstProvinciaD: rowProvincia,
      lstDistritoD: rowDistrito,
      error: _error
    });

  }
  async function handleEventModalConfirmarEliminacion() {
    let rowDireccion = [];
    /*Resolver< */
    let rowDireccionData = [];
    let index = 0;
    let nsecuenciaFacturacion = 0;
    let nsecuenciaDespacho = 0;
    for (let j = 0; j < state.lstDireccionData.length; j++) {
      const element = state.lstDireccionData[j];

      if (element.indice !== state.direccion.indice) {
        if (element.accion === CRUD.INSERT || element.accion === CRUD.UPDATE || element.accion === CRUD.SELECT) {
          index = index + 1;
          element.indice = index;
          if (element.vchrAlias === tipoDireccion.FACTURACION) {
            nsecuenciaFacturacion = nsecuenciaFacturacion + 1;
            element.nsecuencia = nsecuenciaFacturacion;
          }
          if (element.vchrAlias === tipoDireccion.DESPACHO) {
            nsecuenciaDespacho = nsecuenciaDespacho + 1;
            element.nsecuencia = nsecuenciaDespacho;
          }
          rowDireccion.push(
            <CardDireccion direccion={element}
              handleEventShow={handleEventShowModalDireccion}></CardDireccion>
          );
        }

      } else {
        index = index + 1;
        element.indice = index;
        element.accion = CRUD.DELETE;
        element.nsecuencia = 0;
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
  function handleEventMismoRecepciona(value) {
    console.log(state);

    if ((parseInt(state.numTipoCliente, 10) === parseInt(TipoDocumento.DNI.numtipocliente, 10) ||
      parseInt(state.numTipoCliente, 10) === parseInt(TipoDocumento.PASAPORTE.numtipocliente, 10) ||
      parseInt(state.numTipoCliente, 10) === parseInt(TipoDocumento.CARNET_EXT.numtipocliente, 10)) &&
      value === true) {
      console.log('OK');
      dispatch({
        type: actionType.flgMismoRecepciona_DIRECCION,
        flgMismoRecepciona: value,
        numTipoDocumento: state.numTipoCliente,
        vchDocumento: state.vchDocumento,
        vchNombre: state.vchNombre,
        vchApellido: state.vchApellidoPaterno + " " + state.vchApellidoMaterno
      });
    } else {
      console.log('No_OK');
      dispatch({
        type: actionType.flgMismoRecepciona_DIRECCION,
        flgMismoRecepciona: value,
        numTipoDocumento: TipoDocumento.DEFAULT.numtipocliente,
        vchDocumento: "",
        vchNombre: "",
        vchApellido: ""
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

        {state.accion === CRUD.INSERT ? (
          <div className="row-body-registro-row">
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

        <form  accept-charset="UTF-8">
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
              <label htmlFor="chrDirecciones">Mis direcciones</label>
              <div className="action-cliente-button">
                <button className="btn btn-primary" onClick={handleEventShowModalAgregarDireccion}>
                  <i className="fa fa-address-card-o"></i>Agregar
                </button>

                <button className="btn btn-primary" onClick={handleEventRegistrar}>
                  <i className="fa fa-save "></i>{state.estado}
                </button>
              </div>
            </div>
          </div>

          <div className="row-body-lista">
            {state.lstDireccion}
          </div>
        </form>
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
              ? "Actualizar dirección "
              : "Registrar dirección "}<span className="modal-title-span">(Si su domicilio de facturación es igual al domicilio de despacho,no necesita llenar mas datos)</span>

          </Modal.Title>
        </Modal.Header>
        <Modal.Body>

          <div className="form-row-direccion">
            <label htmlFor="vchDireccion">Dirección {state.direccion.flgDespacho ?'Despacho': 'Facturación'}</label>
            <input
              type="text"
              name="vchDireccion"
              className={`form-control imput-registro-width-l ${state.direccion.error.vchDireccion.isValidado ? 'imput-registro-error' : ''}`}
              placeholder={state.direccion.error.vchDireccion.isValidado ? state.direccion.error.vchDireccion.mensaje : ""}
              title={state.direccion.error.vchDireccion.isValidado ? state.direccion.error.vchDireccion.mensaje : ""}
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
          </div>
          <div className="form-row-direccion">
            <label htmlFor="vchreferencia">Punto de Referencia(Cruce con avenida o calle,inglesia,comisaría y etc)</label>
            <input
              type="text"
              name="vchreferencia"
              className={`form-control imput-registro-width-l ${state.direccion.error.vchreferencia.isValidado ? 'imput-registro-error' : ''}`}
              placeholder={state.direccion.error.vchreferencia.isValidado ? state.direccion.error.vchreferencia.mensaje : ""}
              title={state.direccion.error.vchreferencia.isValidado ? state.direccion.error.vchreferencia.mensaje : ""}
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
              className={`form-control imput-registro-width-l ${state.direccion.error.chrCodigoDepartamento.isValidado ? 'imput-registro-error' : ''}`}
              name="chrCodigoDepartamento"
              value={state.direccion.departamento.chrCodigoDepartamento}
              onChange={handleEventChangeDepartamentoDirrecion}
            >
              <option value="00">-- por favor, seleccione --</option>
              {state.lstDepartamento}
            </select>

          </div>
          <div className="form-row-direccion">
            <label htmlFor="chrCodigoProvincia">Provincia</label>
            <select
              className={`form-control imput-registro-width-l ${state.direccion.error.chrCodigoProvincia.isValidado ? 'imput-registro-error' : ''}`}
              name="chrCodigoProvincia"
              value={state.direccion.provincia.chrCodigoProvincia}
              onChange={handleEventChangeProvinciaDireccion}
            >
              <option value="00">-- por favor, seleccione --</option>
              {state.lstProvinciaD}
            </select>

          </div>
          <div className="form-row-direccion">
            <label htmlFor="chrCodigoDistrito">Distrito</label>
            <select
              className={`form-control imput-registro-width-l ${state.direccion.error.chrCodigoDistrito.isValidado ? 'imput-registro-error' : ''}`}
              name="chrCodigoDistrito"
              value={state.direccion.distrito.chrCodigoDistrito}
              onChange={handleEventChangeDistritoDireccion}
            >
              <option value="00">-- por favor, seleccione --</option>
              {state.lstDistritoD}
            </select>

          </div>
          <div className="form-row-direccion">
            <label className="form-row-direccion-title">Dirección de Despacho (diferente a dirección de facturacíon)</label>
            <input
              type="checkbox"
              name="flgDireccionDespacho"
              className="form-control"
              autoComplete="false"
              autoSave="false"
              checked={state.direccion.flgDespacho}
              onChange={(e) =>
                dispatch({
                  type: actionType.flgDespacho_DIRECCION,
                  flgDespacho: e.target.checked,
                })
              }
            ></input>
            {state.direccion.flgDespacho ? <>
              <div className="form-row-option">
                <label className="span-opcion" >¿Yo mismo voy a recepcionar?</label>
                <input
                  type="checkbox"
                  name="flgMismo"
                  className="form-control span-opcion"
                  autoComplete="false"
                  autoSave="false"
                  checked={state.direccion.flgMismoRecepciona}
                  onChange={(e) => handleEventMismoRecepciona(e.target.checked)

                  }
                ></input>
              </div>
            </> : ""}
          </div>
          {state.direccion.flgDespacho ? <>



            <div className="form-row-direccion">
              <label htmlFor="numTipoDocumento">Tipo Documento</label>
              <select
                className={`form-control form-select imput-registro-width-l ${state.direccion.error.numTipoDocumento.isValidado ? 'imput-registro-error' : ''}`}
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
            </div>
            <div className="form-row-direccion">
              <label htmlFor="vchNombre">Documento</label>
              <input
                type="text"
                name="vchDocumento"
                className={`form-control imput-registro-width-l ${state.direccion.error.vchDocumento.isValidado ? 'imput-registro-error' : ''}`}
                placeholder={state.direccion.error.vchDocumento.isValidado ? state.direccion.error.vchDocumento.mensaje : ""}
                title={state.direccion.error.vchDocumento.isValidado ? state.direccion.error.vchDocumento.mensaje : ""}
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

            </div>

            <div className="form-row-direccion">
              <label htmlFor="vchNombre">Nombre</label>
              <input
                type="text"
                name="vchNombre"
                className={`form-control imput-registro-width-l ${state.direccion.error.vchNombre.isValidado ? 'imput-registro-error' : ''}`}
                placeholder={state.direccion.error.vchNombre.isValidado ? state.direccion.error.vchNombre.mensaje : ""}
                title={state.direccion.error.vchNombre.isValidado ? state.direccion.error.vchNombre.mensaje : ""}
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

            </div>
            <div className="form-row-direccion">
              <label htmlFor="vchApellido">Apellidos</label>
              <input
                type="text"
                name="vchApellido"
                className={`form-control imput-registro-width-l ${state.direccion.error.vchApellido.isValidado ? 'imput-registro-error' : ''}`}
                placeholder={state.direccion.error.vchApellido.isValidado ? state.direccion.error.vchApellido.mensaje : ""}
                title={state.direccion.error.vchApellido.isValidado ? state.direccion.error.vchApellido.mensaje : ""}
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

            </div>
            <div className="form-row-direccion">
              <label htmlFor="vchTelefono">Telefono</label>
              <input
                type="text"
                name="vchTelefono"
                className={`form-control imput-registro-width-l ${state.direccion.error.vchTelefono.isValidado ? 'imput-registro-error' : ''}`}
                placeholder={state.direccion.error.vchTelefono.isValidado ? state.direccion.error.vchTelefono.mensaje : ""}
                title={state.direccion.error.vchTelefono.isValidado ? state.direccion.error.vchTelefono.mensaje : ""}
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

            </div>

          </> : <></>}


          <Modal.Footer>
            <button
              onClick={handleEventSaveDireccion}
              className="btn btn-primary" >
              <i className="fa fa-plus"></i>
              {state.direccion.estado}
            </button>
            <button onClick={() => dispatch({ type: actionType.MODAL_SHOW, showDireccion: false })} className="btn btn-primary">

              <i className="fa fa-close"></i> Cerrar
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
    flgFacturacion: props.direccion.flgFacturacion,
    vchrAlias: props.direccion.vchrAlias,
    numTipoDocumento: props.direccion.numTipoDocumento,
    vchDocumento: props.direccion.vchDocumento,
    nsecuencia: props.direccion.nsecuencia,
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
      vchreferencia: { mensaje: "", isValidado: false },
    },
  };

  return (<>
    <div className="registrar-direccion-card">
      <div className="card-row-direccion card-row-flex">
        <span className={direccion.vchrAlias === tipoDireccion.FACTURACION ? 'direcion-tipo' : " direcion-tipo"} >
          {direccion.vchrAlias === tipoDireccion.FACTURACION ? direccion.vchrAlias : direccion.vchrAlias + " " + direccion.nsecuencia}
        </span>
        {direccion.flgPredeterminado ? (
          <div className="fa-direccion-circulo" >
            <div className="fa-direccion-circulo-interno" >&nbsp;</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="card-row-direccion">
        <span>{direccion.vchDireccion}</span>
      </div>
      <div className="card-row-direccion">
        <span>
          {direccion.vchreferencia}
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
          {" "}
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


function handleValidarFormDireccion(state) {

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
    chrCodigoDepartamentoCliente: { mensaje: "", isValidado: false },
    chrCodigoProvinciaCliente: { mensaje: "", isValidado: false },
    chrCodigoDistritoCliente: { mensaje: "", isValidado: false },
    vchDireccionCliente: { mensaje: "", isValidado: false },
    vchDocumento: { mensaje: "", isValidado: false },
    numTipoDocumento: { mensaje: "", isValidado: false },
    vchreferencia: { mensaje: "", isValidado: false },
    isValido: true,
  };
  /*Criterios de validaciones */
  let isValido = true;
  if (state.direccion.flgDespacho === true) {
    if (parseInt(state.direccion.numTipoDocumento, 10) === 0) {
      _error.numTipoDocumento.mensaje = "Seleccione el tipo de documento";
      _error.numTipoDocumento.isValidado = true;
      _error.vchDocumento.mensaje = "N° de documento es requerido";
      _error.vchDocumento.isValidado = true;
      isValido = false;
    }
    if (state.direccion.numTipoDocumento == TipoDocumento.DNI.numtipocliente) {
      if (state.direccion.vchDocumento.length !== TipoDocumento.DNI.longitud) {
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
    if (state.direccion.numTipoDocumento == TipoDocumento.CARNET_EXT.numtipocliente) {
      if (state.direccion.vchDocumento.length != TipoDocumento.CARNET_EXT.longitud) {
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
    if (state.direccion.numTipoDocumento == TipoDocumento.PASAPORTE.numtipocliente) {
      if (state.direccion.vchDocumento.length != TipoDocumento.PASAPORTE.longitud) {
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
    if (!state.direccion.vchNombre) {
      _error.vchNombre.mensaje = "Ingrese su nombre";
      _error.vchNombre.isValidado = true;
      isValido = false;
    }
    if (!state.direccion.vchApellido) {
      _error.vchApellido.mensaje = "Ingrese los apellidos";
      _error.vchApellido.isValidado = true;
      isValido = false;
    }
    if (!state.direccion.vchTelefono) {
      _error.vchTelefono.mensaje = "Ingrese el numero de teléfono";
      _error.vchTelefono.isValidado = true;
      isValido = false;
    }

  }
  if (!state.direccion.vchDireccion) {
    _error.vchDireccion.mensaje = "Ingrese la dirección";
    _error.vchDireccion.isValidado = true;
    isValido = false;
  }

  if (state.direccion.departamento.chrCodigoDepartamento === "00") {
    _error.chrCodigoDepartamento.mensaje = "Seleccione el Departamento";
    _error.chrCodigoDepartamento.isValidado = true;
    isValido = false;
  }
  if (state.direccion.provincia.chrCodigoProvincia === "00") {
    _error.chrCodigoProvincia.mensaje = "Seleccione el Provincia";
    _error.chrCodigoProvincia.isValidado = true;
    isValido = false;
  }
  if (state.direccion.distrito.chrCodigoDistrito === "00") {
    _error.chrCodigoDistrito.mensaje = "Seleccione el Distrito";
    _error.chrCodigoDistrito.isValidado = true;
    isValido = false;
  }

  _error.isValido = isValido;
  /*Registrando los mensajes  */
  /* eslint-enable */
  console.log(_error)
  return _error;
}
