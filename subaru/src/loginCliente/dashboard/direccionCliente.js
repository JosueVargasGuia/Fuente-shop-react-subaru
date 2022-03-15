import React, { useReducer, useEffect, useState } from "react";
import { useParams, useHistory, Link } from "react-router-dom";
import { LOGGIN, SUCCESS_SERVER, HttpStatus, CRUD, localStoreEnum, TipoDocumento, tipoDireccion } from "../../service/ENUM";
import {
  obtenerDirecciones,
  registrarDireccion,
  eliminarDireccion,
} from "../../service/loginCliente.service";
import { Modal } from "react-bootstrap";
import {
  handleObtenerProvincia,
  handleObtenerDistrito,
  handleObtenerDepartamento,
  validarNumero,
} from "../../service/general";

import { ModalConfirmar, ModalAlert } from "../../utils/modal";
import ServerException from "../../utils/serverException";

let actionType = {
  REQUETS: "REQUETS",
  LOAD_DIRECCION: "LOAD_DIRECCION",
  LOAD: "LOAD",
  SHOW_MODAL: "SHOW_MODAL",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD_DIRECCION:
      return {
        ...state,
        isloading: action.isloading,
        rowDireccion: action.rowDireccion,
        flgIsDespacho:action.flgIsDespacho,
        cliente:action.cliente,
      };
    case actionType.REQUETS:
      return {
        ...state,
        server: action.server,
        isloading: action.isloading,
      };
    case actionType.LOAD:
      return {
        ...state,
        isloading: action.isloading,
        rowDireccion: action.rowDireccion,
      };

    case actionType.SHOW_MODAL:
      return {
        ...state,
        modalShow: action.modalShow,
      };
    default:
      return state;
  }
};
export default function DireccionCliente() {
  let params = useParams();
  let history = useHistory();
  const [modalShow, setModalShow] = useState(false);
  let direccion = {
    numCodigoDireccion: 0,
    numCodigoCliente: 0,
    vchDireccion: "",
    vchreferencia: "",
    vchNombre: "",
    vchApellido: "",
    chrCodigoUbigeo: "",
    vchTelefono: "",
    flgRegistro: false,
    flgPredeterminado: false,
    vchrAlias: "",
    numTipoDocumento: 0,
    vchDocumento: "",
    flgFacturacion:0,

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
    rowDepartamento: [],
    cliente: {
      numTipoCliente: 0,
      vchDocumento: "",
      vchNombre: "",
      vchApellidoPaterno: "",
      vchApellidoMaterno: "",
      vchTelefonoMovil:""
    },
  };
  const [registroNuevo, setRegistroNuevo] = useState(direccion);
  const [state, dispatch] = useReducer(reducer, {
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    isloading: true,
    rowDireccion: [],
    flgIsDespacho: false,
    cliente: {
      numTipoCliente: 0,
      vchDocumento: "",
      vchNombre: "",
      vchApellidoPaterno: "",
      vchApellidoMaterno: "",
      vchTelefonoMovil:""
    },
  });

  useEffect(() => {
    // eslint-disable-next-line
    if (
      localStorage.getItem(localStoreEnum.ISLOGIN) !== LOGGIN.LOGGIN ||
      params.numCodigoCliente === undefined ||
      parseInt(params.numCodigoCliente) < 0
    ) {
      history.push("/loginCliente");
      return <div className="direccion"></div>;
    }
    // eslint-disable-next-line
    if (state.isloading) {
      cargarDirecciones();
    }

    console.log("useEffect DireccionCliente");
  });

  async function cargarDirecciones() {
    console.log("cargarDirecciones");
    let usuarioLogeado = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
    let _numCodigoCliente = usuarioLogeado.numCodigoCliente;
    const rpt = await obtenerDirecciones({
      numCodigoCliente: _numCodigoCliente,
    });

    let rowDireccion = [];
    let _flgIsDespacho=false;
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        let rowDepartamento = await handleObtenerDepartamento();
        rowDireccion = [];
        let _cliente= {
          numTipoCliente: json.clienteUsuario.cliente.numTipoCliente,
          vchDocumento: json.clienteUsuario.cliente.vchDocumento,
          vchNombre: json.clienteUsuario.cliente.vchNombre,
          vchApellidoPaterno: json.clienteUsuario.cliente.vchApellidoPaterno,
          vchApellidoMaterno: json.clienteUsuario.cliente.vchApellidoMaterno,
          vchTelefonoMovil:json.clienteUsuario.cliente.vchTelefonoMovil
        }
         
        for (let index = 0; index < json.lista.length; index++) {
          const direccion = json.lista[index];
          let _direccion = {
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
            flgFacturacion: direccion.flgFacturacion,
            nsecuencia: direccion.nsecuencia,
            cliente:_cliente,
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
            estado: CRUD.UPDATE.estado,
            accion: CRUD.UPDATE,
            rowDepartamento: rowDepartamento,
          };
          if(_direccion.flgFacturacion==='1'){
            _flgIsDespacho=true;
          }
          rowDireccion.push(
            <DireccionCard
              key={_direccion.numCodigoDireccion}
              direccion={_direccion}
              handleSuccesModal={handleSuccesModal}
              handleHiddenModal={handleHiddenModal}
            ></DireccionCard>
          );
        }
         
        dispatch({
          type: actionType.LOAD_DIRECCION,
          isloading: false,
          rowDireccion: rowDireccion,
          flgIsDespacho:_flgIsDespacho,
          cliente:_cliente
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.REQUETS,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            isloading: false,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.REQUETS,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        isloading: false,
      });
    }
  }

  async function handleEventNuevaDireccion() {
    
    let usuarioLogeado = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
    let _numCodigoCliente = usuarioLogeado.numCodigoCliente;
    direccion.chrCodigoDepartamento="15";
    direccion.departamento.chrCodigoDepartamento="15";
    direccion.chrCodigoProvincia="01";    
    direccion.provincia.chrCodigoProvincia="01";
    direccion.numCodigoCliente = _numCodigoCliente;    
    direccion.flgFacturacion=(state.flgIsDespacho===true?'0':'1');
    direccion.cliente=state.cliente;
    setModalShow(true);
    setRegistroNuevo(direccion);
  }
  function handleHiddenModal() {
    setModalShow(false);
  }
  function handleSuccesModal() {
    setModalShow(false);
    dispatch({ type: actionType.LOAD, isloading: true, rowDireccion: [] });
  }
  return (
    <div className="direccion">
      <div className="link-href">
        <Link to="/shop">
          <i className="fa fa-home" aria-hidden="true"></i>
          Inicio
        </Link>
        <span>/</span>
        <Link to="/dashboard">
          <i className="fa fa-user"></i>Su cuenta
        </Link>
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

      <h4>Sus direcciones </h4>
      <div className="direccion-content">{state.rowDireccion}</div>
      <div className="direccion-footer">
        <button className="btn btn-primary" onClick={handleEventNuevaDireccion}>
          <i className="fa fa-address-book-o" aria-hidden="true"></i>Agregar
          Dirección
        </button>
      </div>
      {modalShow ? (
        <DireccionCardModal
          direccion={registroNuevo}
          modalShow={modalShow}
          handleSuccesModal={handleSuccesModal}
          handleHiddenModal={handleHiddenModal}
        ></DireccionCardModal>
      ) : (
        ""
      )}

      <ServerException server={state.server}></ServerException>
    
    </div>
  );
}

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
let actionTypeServer = {
  REQUETS: "REQUETS",
  CLOSE: "CLOSE",
};
const reducerModalServer = (state, action) => {
  switch (action.type) {
    case actionTypeServer.REQUETS:
      return {
        ...state,
        show: action.show,
        mensaje: action.mensaje,
        title: action.title,
      };
    case actionTypeServer.CLOSE:
      return {
        ...state,
        show: action.show,
      };
    default:
      return state;
  }
};
function DireccionCard(props) {
  let props_direccion = props.direccion;
  const [direccion, setDireccion] = useState(props_direccion);
  const [modalShow, setModalShow] = useState(false);
  const [modalConfirmarShow, dispatchModal] = useReducer(reducerModal, {
    show: false,
    mensaje: "",
    title: "",
    numCodigoDireccion: props.direccion.numCodigoDireccion,
  });
  const [modalServer, dispatchModalServer] = useReducer(reducerModalServer, {
    show: false,
    mensaje: "",
    title: "",
  });

  let _direccion = {
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
    flgFacturacion: props.direccion.flgFacturacion,
    nsecuencia: props.direccion.nsecuencia,
    cliente:props.direccion.cliente,
    departamento: {
      chrCodigoDepartamento: direccion.departamento.chrCodigoDepartamento,
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
    estado: props.direccion.estado,
    accion: props.direccion.accion,
  };
 
  function handleEventShowModal() {
    
    setDireccion(_direccion);
    setModalShow(true);
  }
  function handleEventModalConfirmarShow() {
    dispatchModal({
      type: actionTypeModal.SHOW_MODAL,
      show: true,
      mensaje: "¿Estas seguro de eliminar la dirección?",
      title: "Eliminar dirección",
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
  async function hadleEventEliminarDireccionCliente() {
    const rpt = await eliminarDireccion({
      numCodigoDireccion: modalConfirmarShow.numCodigoDireccion,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        dispatchModal({
          type: actionTypeModal.SHOW_MODAL,
          show: false,
          mensaje: "",
          title: "",
        });
        props.handleSuccesModal();
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatchModalServer({
          type: actionTypeServer.REQUETS,
          show: true,
          mensaje: json.response.error,
          title: "Resultado de la acción",
          success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
        });
      }
    } else {
      dispatchModalServer({
        type: actionTypeServer.REQUETS,
        show: true,
        mensaje:
          "Lo sentimos el recurso no esta disponible, estamos trabajando para solucionar el inconveniente.",
        title: "Resultado de la acción",
        success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
      });
    }
  }

  function handleSuccesModal() {
    setModalShow(false);
    props.handleSuccesModal();
  }
  function handleHiddenModal() {
    setModalShow(false);
    props.handleHiddenModal();
  }
  function hadleEventCerrarModalServer() {
    dispatchModal({
      type: actionTypeModal.SHOW_MODAL,
      show: false,
      mensaje: "",
      title: "",
    });
    dispatchModalServer({ type: actionTypeServer.CLOSE, show: false });
  }
  return (
    <div className="direccion-card">
    <div className="row-direccion-row-1">
      <div className="row-direccion card-row-flex">

        <span className={direccion.vchrAlias === tipoDireccion.FACTURACION ? 'direcion-tipo' : " direcion-tipo"} >
          {direccion.vchrAlias === tipoDireccion.FACTURACION ?direccion.vchrAlias:direccion.vchrAlias + " " + direccion.nsecuencia}</span>

        {direccion.flgPredeterminado ? (
          <div className="fa-direccion-circulo" >
            <div className="fa-direccion-circulo-interno" >&nbsp;</div>
          </div>
        ) : (
          ""
        )}
      </div>
      <div className="row-direccion">
      <div className="row-direccion-etiqueta">Dirección</div>:&nbsp;
        <span>{direccion.vchDireccion}</span>
      </div>
      <div className="row-direccion">
      <div className="row-direccion-etiqueta">Referencia</div>:&nbsp;
        <span>
          {direccion.vchreferencia === null ? "-" : direccion.vchreferencia}
        </span>
      </div>
      <div className="row-direccion">
      <div className="row-direccion-etiqueta">Documento</div>:&nbsp;
        <span>
          {direccion.vchDocumento}
        </span>
      </div>
      <div className="row-direccion">
      <div className="row-direccion-etiqueta">Nombre</div>:&nbsp;
        <span>          
          {direccion.vchNombre}
        </span>
      </div>

      <div className="row-direccion">
      <div className="row-direccion-etiqueta">Teléfono</div>:&nbsp;
        <span>{direccion.vchTelefono}</span>
      </div>
      <div className="row-direccion">
        <span>
          {" "}
          {direccion.departamento.vchDescripcion} /{" "}
          {direccion.provincia.vchDescripcion} /{" "}
          {direccion.distrito.vchDescripcion}
        </span>
      </div>
      </div>
      <hr />
      <div className="row-direccion">
      <button className="btn btn-primary row-direccion-button" onClick={handleEventShowModal}>
        {" "}
        <i className="fa fa-pencil" aria-hidden="true"></i>Editar
      </button>
    
      {direccion.flgPredeterminado ? (
        ""
        ) : (
          <button
        className="btn btn-primary row-direccion-button"
        onClick={handleEventModalConfirmarShow}
      >
        {" "}
        <i className="fa fa-trash" aria-hidden="true"></i>Eliminar
      </button>
        )}
     
      </div>
      {modalConfirmarShow ? (
        <ModalConfirmar
          show={modalConfirmarShow.show}
          title={modalConfirmarShow.title}
          mensaje={modalConfirmarShow.mensaje}
          handleActionSi={hadleEventEliminarDireccionCliente}
          handleActionNo={handleEventModalConfirmarHidden}
        ></ModalConfirmar>
      ) : (
        ""
      )}

      {modalShow ? (
        <DireccionCardModal
          direccion={direccion}
          modalShow={modalShow}
          handleSuccesModal={handleSuccesModal}
          handleHiddenModal={handleHiddenModal}
        ></DireccionCardModal>
      ) : (
        ""
      )}

      {modalServer ? (
        <ModalAlert
          show={modalServer.show}
          title={modalServer.title}
          mensaje={modalServer.mensaje}
          handleActionCerrar={hadleEventCerrarModalServer}
        ></ModalAlert>
      ) : (
        ""
      )}
    </div>
  );
}

const reducerCard = (state, action) => {
  switch (action.type) {
    case actionTypeCard.DISPLAY_MODAL:
      return {
        ...state,
        modalShow: action.modalShow,
      };
    case actionTypeCard.LOADING_MODAL:
      return {
        ...state,
        modalShow: action.modalShow,
        vchrAlias: action.vchrAlias,
        vchDireccion: action.vchDireccion,
        vchreferencia: action.vchreferencia,
        vchNombre: action.vchNombre,
        vchApellido: action.vchApellido,
        chrCodigoUbigeo: action.chrCodigoUbigeo,
        vchTelefono: action.vchTelefono,
        chrCodigoDepartamento: action.chrCodigoDepartamento,
        chrCodigoProvincia: action.chrCodigoProvincia,
        chrCodigoDistrito: action.chrCodigoDistrito,
        flgPredeterminado: action.flgPredeterminado,
        lstDepartamento: action.lstDepartamento,
        lstProvincia: action.lstProvincia,
        lstDistrito: action.lstDistrito,
        server: action.server,
        estado: action.estado,
        accion: action.accion,
        error: action.error,
      };
    case actionTypeCard.LISTA_DEPARTAMENTO:
      return {
        ...state,
        lstDepartamento: action.lstDepartamento,
      };
    case actionTypeCard.LISTA_PROVINCIA:
      return {
        ...state,
        lstProvincia: action.lstProvincia,
        lstDistrito: action.lstDistrito,
        isloadingProvincia: action.isloadingProvincia,
      };

    case actionTypeCard.LISTA_DISTRITO:
      return {
        ...state,
        lstDistrito: action.lstDistrito,
        isloadingDistrito: action.isloadingDistrito,
      };
    case actionTypeCard.LISTA_UPDATE:
      return {
        ...state,
        lstProvincia: action.lstProvincia,
        lstDistrito: action.lstDistrito,
      };
    case actionTypeCard.vchrAlias:
      return {
        ...state,
        vchrAlias: action.vchrAlias,
      };
    case actionTypeCard.vchDireccion:
      return {
        ...state,
        vchDireccion: action.vchDireccion,
      };
    case actionTypeCard.vchreferencia:
      return {
        ...state,
        vchreferencia: action.vchreferencia,
      };
    case actionTypeCard.vchNombre:
      return {
        ...state,
        vchNombre: action.vchNombre,
      };
    case actionTypeCard.vchApellido:
      return {
        ...state,
        vchApellido: action.vchApellido,
      };
    case actionTypeCard.vchTelefono:
      return {
        ...state,
        vchTelefono: action.vchTelefono,
      };
    case actionTypeCard.chrCodigoDepartamento:
      return {
        ...state,
        chrCodigoDepartamento: action.chrCodigoDepartamento,
      };
    case actionTypeCard.chrCodigoProvincia:
      return {
        ...state,
        chrCodigoProvincia: action.chrCodigoProvincia,
      };
    case actionTypeCard.chrCodigoDistrito:
      return {
        ...state,
        chrCodigoDistrito: action.chrCodigoDistrito,
      };
    case actionTypeCard.flgPredeterminado:
      return {
        ...state,
        flgPredeterminado: action.flgPredeterminado,
      };
    case actionTypeCard.vchDocumento:
      return {
        ...state,
        vchDocumento: action.vchDocumento,
      };
    case actionTypeCard.numTipoDocumento:
      return {
        ...state,
        numTipoDocumento: action.numTipoDocumento,
      };
    case actionTypeCard.flgFacturacion:
      return {
        ...state,
        flgFacturacion: action.flgFacturacion,
      };

    case actionTypeCard.flgDespacho:
      return {
        ...state,
        flgDespacho: action.flgDespacho,
      };
    case actionTypeCard.DEPARTAMENTO:
      return {
        ...state,
        chrCodigoDepartamento: action.chrCodigoDepartamento,
        chrCodigoProvincia: action.chrCodigoProvincia,
        chrCodigoDistrito: action.chrCodigoDistrito,
        isloadingProvincia: action.isloadingProvincia,
        isloadingDistrito: action.isloadingDistrito,
      };
    case actionTypeCard.PROVINCIA:
      return {
        ...state,
        chrCodigoProvincia: action.chrCodigoProvincia,
        chrCodigoDistrito: action.chrCodigoDistrito,
        isloadingDistrito: action.isloadingDistrito,
      };
    case actionTypeCard.DISTRITO:
      return {
        ...state,
        chrCodigoDistrito: action.chrCodigoDistrito,
      };
    case actionTypeCard.REQUETS:
      return {
        ...state,
        server: action.server,
        estado: action.estado,
      };

    case actionTypeCard.flgMismoRecepciona_DIRECCION:
      return {
        ...state,        
        numTipoDocumento: action.numTipoDocumento,
        vchDocumento: action.vchDocumento,
        vchNombre: action.vchNombre,
        vchApellido: action.vchApellido,
        vchTelefono: action.vchTelefono,
        flgMismoRecepciona:action.flgMismoRecepciona
      };
    case actionTypeCard.ERROR:
      return {
        ...state,
        error: action.error,
        estado: action.estado,
      };
    default:
      return state;
  }
};
let actionTypeCard = {
  DISPLAY_MODAL: "DISPLAY_MODAL",
  LOADING_MODAL: "LOADING_MODAL",
  LISTA_UPDATE: "LISTA_UPDATE",
  LISTA_DEPARTAMENTO: "LISTA_DEPARTAMENTO",
  LISTA_PROVINCIA: "LISTA_PROVINCIA",
  LISTA_DISTRITO: "LISTA_DISTRITO",
  vchrAlias: "vchrAlias",
  vchDireccion: "vchDireccion",
  vchreferencia: "vchreferencia",
  vchNombre: "vchNombre",
  vchApellido: "vchApellido",
  chrCodigoUbigeo: "chrCodigoUbigeo",
  vchTelefono: "vchTelefono",
  chrCodigoDepartamento: "chrCodigoDepartamento",
  chrCodigoProvincia: "chrCodigoProvincia",
  chrCodigoDistrito: "chrCodigoDistrito",
  flgPredeterminado: "flgPredeterminado",
  vchDocumento: "vchDocumento",
  numTipoDocumento: "numTipoDocumento",
  DEPARTAMENTO: "DEPARTAMENTO",
  PROVINCIA: "PROVINCIA",
  DISTRITO: "DISTRITO",
  ERROR: "ERROR",
  REQUETS: "REQUETS",
  flgFacturacion: "flgFacturacion",
  flgDespacho: "flgDespacho",
  flgMismoRecepciona_DIRECCION:"flgMismoRecepciona_DIRECCION"
};
function DireccionCardModal(props) {
  let direccion = props.direccion;
  
  const [state, dispatch] = useReducer(reducerCard, {
    numCodigoDireccion: direccion.numCodigoDireccion,
    numCodigoCliente: direccion.numCodigoCliente,
    vchrAlias: direccion.vchrAlias,
    vchDireccion: direccion.vchDireccion,
    vchreferencia: direccion.vchreferencia,
    vchNombre: direccion.vchNombre,
    vchApellido: direccion.vchApellido,
    chrCodigoUbigeo: direccion.chrCodigoUbigeo,
    vchTelefono: direccion.vchTelefono,
    chrCodigoDepartamento: direccion.departamento.chrCodigoDepartamento,
    chrCodigoProvincia: direccion.provincia.chrCodigoProvincia,
    chrCodigoDistrito: direccion.distrito.chrCodigoDistrito,
    flgPredeterminado: direccion.flgPredeterminado,
    vchDocumento: direccion.vchDocumento,
    numTipoDocumento: direccion.numTipoDocumento,
    flgFacturacion: direccion.flgFacturacion,
    flgDespacho: (direccion.vchNombre!==null && direccion.vchNombre!==undefined?(direccion.vchNombre.length>=1?true:false):false),
    cliente:direccion.cliente,
    //flgDespacho:direccion.flgDespacho,
    nsecuencia: direccion.nsecuencia,
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
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    estado: direccion.estado,
    accion: direccion.accion,
    lstDepartamento: [],
    lstProvincia: [],
    lstDistrito: [],
    isloadingProvincia: false,
    isloadingDistrito: false,
    flgMismoRecepciona:false,
  });
  console.log(props);
  //eslint-disable-next-line
  useEffect(() => {
    console.log("useEffect _Init");
    if (state.lstDepartamento.length === 0) {
      handleListarDeparteamento();
      console.log("useEffect _Init Departamento");
    }
    if (
      (state.accion === CRUD.UPDATE || state.accion===CRUD.INSERT) &&
      state.lstProvincia.length === 0 &&
      state.lstDistrito.length === 0
    ) {

      handleLoadDistritoProvincia();
      console.log("useEffect _Init Provincia");
    }
    //eslint-disable-next-line
  }, []);

  useEffect(() => {
    console.log("useEffect");
    if (state.isloadingProvincia === true) {
      /*Request de provincias */
      handleListarProvincia();
    }
    if (state.isloadingDistrito === true) {
      /*Request de distritios */
      handleListarDistrito();
    }
  });
  async function handleLoadDistritoProvincia() {
    /*Request de provincia */
    let rowProvincia = await handleObtenerProvincia(
      state.chrCodigoDepartamento
    );
    let rowDistrito = await handleObtenerDistrito({
      chrCodigoDepartamento: state.chrCodigoDepartamento,
      chrCodigoProvincia: state.chrCodigoProvincia,
    });
    dispatch({
      type: actionTypeCard.LISTA_UPDATE,
      lstProvincia: rowProvincia,
      lstDistrito: rowDistrito,
    });
  }
  async function handleRegistrarDireccion() {
    dispatch({
      type: actionTypeCard.REQUETS,
      server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
      estado:
        state.accion === CRUD.INSERT
          ? CRUD.INSERT.estadoRequest
          : CRUD.UPDATE.estadoRequest,
    });

    const valError = await handleValidarForm(state);
    if (valError.isValido) {
      let direccionRequest = {
        clienteDireccion: { numCodigoCliente: direccion.numCodigoCliente },
        numCodigoDireccion: state.numCodigoDireccion,
        vchrAlias: '',
        vchDireccion: state.vchDireccion,
        vchreferencia: state.vchreferencia,
        vchNombre: state.vchNombre,
        vchApellido: state.vchApellido,
        vchTelefono: state.vchTelefono,
        //flgPredeterminado: state.flgPredeterminado,
        flgFacturacion:false,
        departamento: { chrCodigoDepartamento: state.chrCodigoDepartamento },
        provincia: { chrCodigoProvincia: state.chrCodigoProvincia },
        distrito: { chrCodigoDistrito: state.chrCodigoDistrito },
        vchDocumento: state.vchDocumento,
        numTipoDocumento: state.numTipoDocumento
      };
      const rpt = await registrarDireccion(direccionRequest);
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          props.handleSuccesModal();
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionTypeCard.REQUETS,
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
          type: actionTypeCard.REQUETS,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
          estado:
            state.accion === CRUD.INSERT
              ? CRUD.INSERT.estado
              : CRUD.UPDATE.estado,
        });
      }
    } else {
      dispatch({
        type: actionTypeCard.ERROR,
        error: valError,
        estado:
          state.accion === CRUD.INSERT
            ? CRUD.INSERT.estado
            : CRUD.UPDATE.estado,
      });
    }
  }

  async function handleEventChangeDepartamento(e) {
    /* isloadingProvincia:true que cargue los provincias al renderizar en el Hook useEffect*/
    dispatch({
      type: actionTypeCard.DEPARTAMENTO,
      chrCodigoDepartamento: e.target.value,
      chrCodigoProvincia: "00",
      chrCodigoDistrito: "00",
      isloadingProvincia: true,
      isloadingDistrito: false,
    });
  }
  async function handleListarDeparteamento() {
    /*Request de provincia */
    let rowDepartamento = await handleObtenerDepartamento();
    /* isloadingProvincia:false para que no incurra en el loop infinito*/
    dispatch({
      type: actionTypeCard.LISTA_DEPARTAMENTO,
      lstDepartamento: rowDepartamento,
    });
  }

  async function handleListarProvincia() {
    /*Request de provincia */
    let rowProvincia = await handleObtenerProvincia(
      state.chrCodigoDepartamento
    );

    /* isloadingProvincia:false para que no incurra en el loop infinito*/
    dispatch({
      type: actionTypeCard.LISTA_PROVINCIA,
      lstDepartamento: state.lstDepartamento,
      lstProvincia: rowProvincia,
      lstDistrito: [],
      isloadingProvincia: false,
    });
  }

  async function handleEventChangeProvincia(e) {
    /* isloadingDistrito:true que cargue los distritos al renderizar en el Hook useEffect*/
    dispatch({
      type: actionTypeCard.PROVINCIA,
      chrCodigoProvincia: e.target.value,
      chrCodigoDistrito: "00",
      isloadingDistrito: true,
    });
    console.log("handleEventChangeProvincia");
  }
  async function handleListarDistrito() {
    /*Request de distrito */
    let rowDistrito = await handleObtenerDistrito({
      chrCodigoDepartamento: state.chrCodigoDepartamento,
      chrCodigoProvincia: state.chrCodigoProvincia,
    });
    /* isloadingProvincia:false para que no incurra en el loop infinito*/
    dispatch({
      type: actionTypeCard.LISTA_DISTRITO,
      lstDistrito: rowDistrito,
      isloadingDistrito: false,
    });
  }

  async function handleEventChangeDistrito(e) {
    dispatch({
      type: actionTypeCard.DISTRITO,
      chrCodigoDistrito: e.target.value,
    });
  }
  function handleEnventOnChangeTelefono(e) {
    if (validarNumero(e)) {
      dispatch({
        type: actionTypeCard.vchTelefono,
        vchTelefono: e.target.value,
      });
    }
  }

  function handleEventMismoRecepciona(value) {
    console.log(state);

    if (value === true && state.cliente!==undefined ) {
     
      dispatch({
        type: actionTypeCard.flgMismoRecepciona_DIRECCION,
        flgMismoRecepciona: value,
        //numTipoDocumento: state.cliente.numTipoCliente,
        vchDocumento: state.cliente.vchDocumento,
        vchNombre: state.cliente.vchApellidoPaterno + " " + state.cliente.vchApellidoMaterno+" "+ state.cliente.vchNombre,
        //vchApellido: state.cliente.vchApellidoPaterno + " " + state.cliente.vchApellidoMaterno,
        vchTelefono:state.cliente.vchTelefonoMovil
      });
    } else {
     
      dispatch({
        type: actionTypeCard.flgMismoRecepciona_DIRECCION,
        flgMismoRecepciona: value,
        //numTipoDocumento: TipoDocumento.DEFAULT.numtipocliente,
        vchDocumento: "",
        vchNombre: "",
        vchApellido: "",
        vchTelefono:""
      });
    }
  }
function handleEnventFlagDespacho(value){
  dispatch({
    type: actionTypeCard.flgDespacho,
    flgDespacho: value,
  });
  dispatch({
    type: actionTypeCard.flgMismoRecepciona_DIRECCION,
    flgMismoRecepciona: false,
    numTipoDocumento: TipoDocumento.DEFAULT.numtipocliente,
    vchDocumento: "",
    vchNombre: "",
    vchApellido: "",
    vchTelefono:""
  });
}
function handleOnKeyDownNumeros(e) {
  if (e.keyCode === 8) {
    console.log(e.keyCode);
  } else {
    if (e.keyCode < "48" || e.keyCode > "57") {
      e.preventDefault();
    }
  }
}
  return (
    <>
      <Modal
        className="modal-direccion"
        show={props.modalShow}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {direccion.accion.codigoCrud === CRUD.UPDATE.codigoCrud
              ? "Actualizar dirección de "
              : "Registrar dirección  de "}{state.flgFacturacion==='1'?"facturación":"despacho"}<span className="modal-title-span"> (Si su domicilio de facturación es igual al domicilio de despacho,no necesita llenar mas datos)</span>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-body-direccion">
        


            <div className="form-row-direccion">
              <label htmlFor="vchDireccion">{state.flgFacturacion==='1'?tipoDireccion.FACTURACION:tipoDireccion.DESPACHO} </label>
              <input
                type="text"
                name="vchDireccion"
                className={`form-control ${state.error.vchDireccion.isValidado ? 'imput-registro-error' : ''}`}
                autoComplete="false"
                autoSave="false"
                maxLength={128}
                value={state.vchDireccion}
                placeholder={state.error.vchDireccion.isValidado ? state.error.vchDireccion.mensaje : ""}
                title={state.error.vchDireccion.isValidado ? state.error.vchDireccion.mensaje : ""}
                onChange={(e) =>
                  dispatch({
                    type: actionTypeCard.vchDireccion,
                    vchDireccion: e.target.value,
                  })
                }
              ></input>


            </div>

            <div className="form-row-direccion">
              <label htmlFor="vchreferencia">Punto de Referencia&nbsp;(Cruce con Av. o calle,Iglesia y etc)</label>
              <input
                type="text"
                name="vchreferencia"
                className={`form-control`}
                autoComplete="false"
                autoSave="false"
                maxLength={128}
                value={state.vchreferencia}
                onChange={(e) =>
                  dispatch({
                    type: actionTypeCard.vchreferencia,
                    vchreferencia: e.target.value,
                  })
                }
              ></input>
            </div>
            
            <div className="form-row-direccion">
              <label htmlFor="chrCodigoDepartamento">Departamento</label>
              <select
                className={`form-control ${state.error.chrCodigoDepartamento.isValidado ? 'imput-registro-error' : ''}`}
                name="chrCodigoDepartamento"
                value={state.chrCodigoDepartamento}
                onChange={handleEventChangeDepartamento}
              >
                <option value="00">-- -- Seleccione ----</option>
                {state.lstDepartamento}
              </select>

            </div>
            <div className="form-row-direccion">
              <label htmlFor="chrCodigoProvincia">Provincia</label>
              <select
                className={`form-control ${state.error.chrCodigoProvincia.isValidado ? 'imput-registro-error' : ''}`}
                name="chrCodigoProvincia"
                value={state.chrCodigoProvincia}
                onChange={handleEventChangeProvincia}
              >
                <option value="00">-- -- Seleccione ----</option>
                {state.lstProvincia}
              </select>

            </div>
            <div className="form-row-direccion">
              <label htmlFor="chrCodigoDistrito">Distrito</label>
              <select
                className={`form-control ${state.error.chrCodigoDistrito.isValidado ? 'imput-registro-error' : ''}`}
                name="chrCodigoDistrito"
                value={state.chrCodigoDistrito}
                onChange={handleEventChangeDistrito}
              >
                <option value="00">-- -- Seleccione ----</option>
                {state.lstDistrito}
              </select>

            </div>
            <div className="form-row-direccion  row-direccion-center">
              <label className="form-row-direccion-title">¿Datos de la persona que recepciona?</label>
              <input
                type="checkbox"
                name="flgDespacho"
                className="form-control"
                autoComplete="false"
                autoSave="false"
                checked={state.flgDespacho}
                onChange={(e) =>handleEnventFlagDespacho(e.target.checked)
                 
                }
              ></input>
              {state.flgDespacho ? <>
              <div className="form-row-option">
                <label className="span-opcion" >¿Yo mismo voy a recepcionar?</label>
                <input
                  type="checkbox"
                  name="flgMismo"
                  className="form-control span-opcion"
                  autoComplete="false"
                  autoSave="false"
                  checked={state.flgMismoRecepciona}
                  onChange={(e) =>  handleEventMismoRecepciona(e.target.checked)}
                ></input>
              </div>
            </> : ""}


            </div>
            {state.flgDespacho ? <>
               {/*
              <div className="form-row-direccion">
                <label htmlFor="numTipoDocumento">Tipo Documento</label>
                <select

                  className={`form-control form-select  ${state.error.numTipoDocumento.isValidado ? 'imput-registro-error' : ''}`}
                  name="numTipoCliente"
                  placeholder={state.error.numTipoDocumento.isValidado ? state.error.vchDireccion.mensaje : ""}
                  title={state.error.numTipoDocumento.isValidado ? state.error.vchDireccion.mensaje : ""}
                  value={state.numTipoDocumento}
                  onChange={(e) => {
                    console.log(e.target.value)
                    dispatch({
                      type: actionTypeCard.numTipoDocumento,
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
                <label htmlFor="vchApellido">Apellidos</label>
                <input
                  type="text"
                  name="vchApellido"
                  className={`form-control ${state.error.vchApellido.isValidado ? 'imput-registro-error' : ''}`}
                  placeholder={state.error.vchApellido.isValidado ? state.error.vchApellido.mensaje : ""}
                  title={state.error.vchApellido.isValidado ? state.error.vchApellido.mensaje : ""}
                  autoComplete="false"
                  autoSave="false"
                  maxLength={128}
                  value={state.vchApellido}
                  onChange={(e) =>
                    dispatch({
                      type: actionTypeCard.vchApellido,
                      vchApellido: e.target.value,
                    })
                  }
                ></input>

              </div>
              */}
              
             
              <div className="form-row-direccion">
                <label htmlFor="vchNombre">Documento de quien recepciona</label>
                <input
                  type="text"
                  name="vchDocumento"
                  className={`form-control ${state.error.vchDocumento.isValidado ? 'imput-registro-error' : ''}`}
                  placeholder={state.error.vchDocumento.isValidado ? state.error.vchDocumento.mensaje : ""}
                  title={state.error.vchDocumento.isValidado ? state.error.vchDocumento.mensaje : ""}
                  autoComplete="false"
                  autoSave="false"
                  maxLength={30}
                  value={state.vchDocumento}
                  onKeyDown={handleOnKeyDownNumeros}
                  onChange={(e) =>
                    dispatch({
                      type: actionTypeCard.vchDocumento,
                      vchDocumento: e.target.value,
                    })
                  }
                ></input>

              </div>

              <div className="form-row-direccion">
                <label htmlFor="vchNombre">Nombres y Apellidos de quien recepciona</label>
                <input
                  type="text"
                  name="vchNombre"
                  className={`form-control ${state.error.vchNombre.isValidado ? 'imput-registro-error' : ''}`}
                  placeholder={state.error.vchNombre.isValidado ? state.error.vchNombre.mensaje : ""}
                  title={state.error.vchNombre.isValidado ? state.error.vchNombre.mensaje : ""}
                  autoComplete="false"
                  autoSave="false"
                  maxLength={128}
                  value={state.vchNombre}
                  onChange={(e) =>
                    dispatch({
                      type: actionTypeCard.vchNombre,
                      vchNombre: e.target.value,
                    })
                  }
                ></input>

              </div>
             
              <div className="form-row-direccion">
                <label htmlFor="vchTelefono">Teléfono  de quien recepciona<span>&nbsp;(No es obligatorio)</span></label>
                <input
                  type="text"
                  name="vchTelefono"
                  className={`form-control ${state.error.vchTelefono.isValidado ? 'imput-registro-error' : ''}`}
                  placeholder={state.error.vchTelefono.isValidado ? state.error.vchTelefono.mensaje : ""}
                  title={state.error.vchTelefono.isValidado ? state.error.vchTelefono.mensaje : ""}
                  autoComplete="false"
                  autoSave="false"
                  maxLength={15}
                  value={state.vchTelefono}
                  onChange={handleEnventOnChangeTelefono}
                ></input>
              </div>
            </> : ""}

         
            <div className="form-row-direccion">

            </div>
            <ServerException server={state.server}></ServerException>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={handleRegistrarDireccion}
            className="btn btn-primary"
          >
            {state.estado}
          </button>
          <button onClick={props.handleHiddenModal} className="btn btn-primary">
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function handleValidarForm(state) {
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
  if (state.flgDespacho === true) {

    /*if (state.numTipoDocumento === 0) {
      _error.numTipoDocumento.mensaje = "Seleccione el tipo de documento";
      _error.numTipoDocumento.isValidado = true;
      _error.vchDocumento.mensaje = "N° de documento es requerido"
      _error.vchDocumento.isValidado = true;
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
*/



    if (!state.vchNombre) {
      _error.vchNombre.mensaje = "Ingrese su nombre y apellidos";
      _error.vchNombre.isValidado = true;
      isValido = false;
    }
    /*if (!state.vchApellido) {
      _error.vchApellido.mensaje = "Ingrese los apellidos";
      _error.vchApellido.isValidado = true;
      isValido = false;
    }
    if (!state.vchTelefono) {
      _error.vchTelefono.mensaje = "Ingrese el numero de teléfono";
      _error.vchTelefono.isValidado = true;
      isValido = false;
    }
*/

  }



  _error.isValido = isValido;
  /*Registrando los mensajes  */
  /* eslint-enable */

  return _error;
}
export { DireccionCard, DireccionCliente };
