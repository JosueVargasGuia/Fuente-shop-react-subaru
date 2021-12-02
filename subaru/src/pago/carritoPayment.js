import React, { useEffect, useReducer, useState } from "react";

import KRGlue from "@lyracom/embedded-form-glue";
import {
  localStoreEnum,
  LOGGIN,
  PagoMenu,
  MetodoEnvio,
  InfoCondicionCompra,
  Moneda,
  SUCCESS_SERVER,
  HttpStatus,
  statusMetodoEnvio,
} from "../service/ENUM";

import { useHistory, Link } from "react-router-dom";
import LogoAlmacen from "../css/icons/almacen.png";
import LogoCamion from "../css/icons/camion.png";
import { Modal } from "react-bootstrap";
import TerminoCondicionEstatico from "../estaticos/terminoCondicionEstatico";
import Loading from "../utils/loading";
import { obtenerDirecciones } from "../service/loginCliente.service";
import { handleSyncDatosCotizacion } from "../service/general";
import {
  obtenerCotizacion,
  registrarMetodoEnvioCotizacion,
  initCreatePayment
} from "../service/cotizacion.service";
import izipay from "../css/izipay.png";
import ServerException from "../utils/serverException";
import Hex from 'crypto-js/enc-hex';
import hmacSHA256 from 'crypto-js/hmac-sha256';
import { validacionToken } from "../service/loginCliente.service";
export function CarritoPayment(props) {
  let history = useHistory();
  const [focusMenu, setFocusMenu] = useState(1);
  const [showModal, setShowModal] = useState(false);

  const cotizacionResumen = {
    totalRegistros: 0,
    numSubTotalDol: 0,
    numIgvDol: 0,
    numEnvioDol: 0,
    numTotalDol: 0,

    numSubTotalSol: 0,
    numIgvSol: 0,
    numEnvioSol: 0,
    numTotalSol: 0,
    cantidadDetalleSeleccionado: 0,
    numCodigoCotizacionOnline: 0,
  };
  const [state, dispatch] = useReducer(reducer, {
    enableButton: true,
    cotizacionResumen: cotizacionResumen,
    listaCotizacionDetalle: [],
    lstDireccion: [],
    MetodoEnvio: MetodoEnvio.EnvioRegular,
    statusMetodoEnvio: { status: statusMetodoEnvio.DEFAULT, mensaje: "" },
    numCodigoDireccion: 0,
    vchObservacion: "",
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  useEffect(() => {

    //eslint-disable-next-line
    handleLoad();
    console.log("useEffect CarritoPayment");
    _validarToken();
    //eslint-disable-next-line
  }, []);




  if (localStorage.getItem(localStoreEnum.ISLOGIN) !== LOGGIN.LOGGIN) {
    /*Verificando que el cliente este logeado  */
    history.push("/loginCliente");
    return <div className="form-pago"></div>;
  }
  async function _validarToken() {
    let _status = await _validacionToken();
    console.log(_status);
    if (_status === "REDIRECT") {
      /*Redireccionando al login */
      localStorage.removeItem(localStoreEnum.ISLOGIN);
      localStorage.removeItem(localStoreEnum.USUARIO);
      localStorage.removeItem(localStoreEnum.TOKEN);
      window.location.reload();
      history.push("/loginCliente");
    }
  }
  async function _validacionToken() {
    let _value = "SHOW_MESSAGE";
    const rpt = await validacionToken({
      token: localStorage.getItem(localStoreEnum.TOKEN),
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_EXPIRE) {
        /*Redireccionando al login */
        _value = "REDIRECT";
      } else {
        /*Visualizando el */
        _value = "SHOW_MESSAGE";
      }
    } else {
      _value = "SHOW_MESSAGE";
    }
    console.log(_value);
    return _value;
  }


  let usuarioLogeado = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));

  async function handleLoad() {
    /*Direcciones del cliente */
    let usuarioLogeado = JSON.parse(
      localStorage.getItem(localStoreEnum.USUARIO)
    );

    //eslint-disable-next-line
    if (usuarioLogeado === null) {
      /*Verificando que el cliente este logeado  */
      //eslint-disable-next-line
      history.push("/loginCliente");
      return <div className="form-pago"></div>;
    }

    let _numCodigoCliente = usuarioLogeado.numCodigoCliente;
    const rpt = await obtenerDirecciones({
      numCodigoCliente: _numCodigoCliente,
    });
    const lstDireccion = [];
    let tmpDireccion = {};
    let numCodigoDireccion = 0;
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      for (let index = 0; index < json.lista.length; index++) {
        const direccion = json.lista[index];
        if (direccion.flgPredeterminado) {
          numCodigoDireccion = direccion.numCodigoDireccion;
          tmpDireccion = {
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
          }
        }
        lstDireccion.push({
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
        });
      }
    }
    /*Resumen de cotizacion*/
    let cotizacion = handleSyncDatosCotizacion();
    const _cotizacionResumen = {
      totalRegistros: 0,
      numSubTotalDol: 0,
      numIgvDol: 0,
      numEnvioDol: 0,
      numTotalDol: 0,

      numSubTotalSol: 0,
      numIgvSol: 0,
      numEnvioSol: 0,
      numTotalSol: 0,
      cantidadDetalleSeleccionado: 0,
      numCodigoCotizacionOnline: 0,
    };
    const rptC = await obtenerCotizacion({
      numCodigoCotizacionOnline: cotizacion.numCodigoCotizacionOnline,
    });
    if (rptC.status === HttpStatus.HttpStatus_OK) {
      const jsonC = await rptC.json();
      //console.log(jsonC)
      _cotizacionResumen.totalRegistros = jsonC.totalRegistros;
      _cotizacionResumen.numSubTotalDol = jsonC.numSubTotalDol;
      _cotizacionResumen.numIgvDol = jsonC.numIgvDol;
      _cotizacionResumen.numEnvioDol = jsonC.numEnvioDol;
      _cotizacionResumen.numTotalDol = jsonC.numTotalDol;
      _cotizacionResumen.numSubTotalSol = jsonC.numSubTotalSol;
      _cotizacionResumen.numIgvSol = jsonC.numIgvSol;
      _cotizacionResumen.numEnvioSol = jsonC.numEnvioSol;
      _cotizacionResumen.numTotalSol = jsonC.numTotalSol;
      _cotizacionResumen.numCodigoCotizacionOnline = cotizacion.numCodigoCotizacionOnline;
      //console.log(_cotizacionResumen);
    }
    //let _metodoEnvio = MetodoEnvio.RecojoAlmacen;
    let _metodoEnvio = MetodoEnvio.EnvioRegular;
    if (_cotizacionResumen.numEnvioDol > 0) {
      _metodoEnvio = MetodoEnvio.EnvioRegular;
    }

    handleEventChangeDirecciones(tmpDireccion);
    dispatch({
      type: actionType.LOAD,
      lstDireccion: lstDireccion,
      cotizacionResumen: _cotizacionResumen,
      numCodigoDireccion: numCodigoDireccion,
      MetodoEnvio: _metodoEnvio,
    });
  }
  async function initCreatePaymentRequets(_numCodigoCotizacionOnline, _metodoEnvioCodigo,
    _numCodigoDireccion, _vchObservacion, _moneda) {

    let _payment = {
      endPoint: "",
      publicKey: "",
      formToken: "",
      hmacSha256Key: ""
    }
    let objectPayment = {
      type: actionType.INIT_PAYMENT, payment: _payment,
      server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT }
    };
    const rpt = await initCreatePayment({
      numCodigoCotizacionOnline: _numCodigoCotizacionOnline,
      metodoEnvio: _metodoEnvioCodigo,
      numCodigoDireccion: _numCodigoDireccion,
      vchObservacion: _vchObservacion,
      moneda: _moneda
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        objectPayment.type = actionType.SET_CREATE_PAYMENT;
        _payment.endPoint = json.endPoint;
        _payment.publicKey = json.publicKey;
        _payment.formToken = json.formToken;
        _payment.hmacSha256Key = json.hmacSha256Key;
        objectPayment.server.error = "";
        objectPayment.server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        objectPayment.type = actionType.ERROR;
        objectPayment.server.error = json.response.error;
        objectPayment.server.success = SUCCESS_SERVER.SUCCES_SERVER_INFO
      }
    } else {
      objectPayment.type = actionType.ERROR;
      objectPayment.server.error = "";
      objectPayment.server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR

    }
    objectPayment.payment = _payment;
    return objectPayment
  }
  //eslint-disable-next-line
  async function loadPago() {

    let builtPayment = await initCreatePaymentRequets(
      state.cotizacionResumen.numCodigoCotizacionOnline,
      state.MetodoEnvio.codigo,
      state.numCodigoDireccion,
      state.vchObservacion,
      (props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda ? 'DOLARES' : 'SOLES'));
    console.log(builtPayment);
    if (builtPayment.server.success === SUCCESS_SERVER.SUCCES_SERVER_OK) {
      const endpoint = builtPayment.payment.endPoint;
      const publicKey = builtPayment.payment.publicKey;
      const formToken = builtPayment.payment.formToken;
      const hmacSha256Key = builtPayment.payment.hmacSha256Key;
      KRGlue.loadLibrary(endpoint, publicKey) /* Load the remote library */
        .then(({ KR }) =>
          KR.setFormConfig({
            /* set the minimal configuration */
            formToken: formToken,
            "kr-language": "es-pe" /* to update initialization parameter */,
            //"kr-get-url-success": "https://eanetautoparts.pe/succespayment",
          })
        )
        .then(({ KR }) => KR.onSubmit(resp => {
          /*https://github.com/lyra/embedded-form-glue/tree/master/examples/react/minimal-example */
          console.log(resp);
          const answer = resp.clientAnswer;
          const hash = resp.hash;
          const answerHash = Hex.stringify(hmacSHA256(JSON.stringify(answer), hmacSha256Key));
          if (hash === answerHash) {
            console.log('hash Valido');
            localStorage.removeItem(localStoreEnum.COTIZACION);
            if (answer.orderStatus === 'PAID') {
              history.push("/succesPayment");
              window.location.reload();
              console.log('Pago Valido');
            } else {
              history.push("/succesNopayment");
              console.log('Pago NO PAID');
            }
          } else {
            console.log('hash no Valido');
          }
          return false
        }))
        .then(({ KR }) =>
          KR.addForm("#myPaymentForm")
        ) /* add a payment form  to myPaymentForm div*/
        .then(({ KR, result }) => {
          console.log(result);
          console.log("show the payment form");
          KR.showForm(result.formId);
        })
        .catch(error =>
          console.log(error + " (see console for more details)")
        );
      ; /* show the payment form */
    } else {
      setFocusMenu(3);
      console.log(builtPayment.server);
      dispatch({ type: actionType.ERROR, server: builtPayment.server });
    }
  }



  function handleEnventControlMenuNext() {
    let tmp = focusMenu + 1;
    handleEnventControlMenu(tmp);
  }
  function handleEnventControlMenu(value) {
    let oldfocusMenu = focusMenu;
    let temp = 0;
    temp = focusMenu + 1;

    if (focusMenu >= 3) {
      temp = 1;
    }
    if (oldfocusMenu === value) {
      temp = oldfocusMenu;
    }
    if (value < oldfocusMenu) {
      temp = value;
    }
    if (temp === PagoMenu.PASARELA.index) {
      loadPago();
    }
    setFocusMenu(temp);
  }


  function handleActionCerrar(value) {
    console.log("closeButton");
    setShowModal(value);
  }
  async function handleEventChangeDirecciones(_direccion) {
    dispatch({
      type: actionType.SET_DIRECCION,
      numCodigoDireccion: _direccion.numCodigoDireccion,
      //MetodoEnvio: MetodoEnvio.RecojoAlmacen,  Reunion Nro1
      MetodoEnvio: MetodoEnvio.EnvioRegular,
      statusMetodoEnvio: { status: statusMetodoEnvio.DEFAULT, mensaje: "" },
    });
    //handleEventChangeModoEnvio(MetodoEnvio.RecojoAlmacen); Reunion Nro1
    handleEventChangeModoEnvio(MetodoEnvio.EnvioRegular, _direccion.numCodigoDireccion, false);
  }
  async function handleEventChangeModoEnvio(_metodoEnvio, _numCodigoDireccion, _flgChange) {
    /*Resumen de cotizacion*/
    let _statusMetodoEnvio = { status: statusMetodoEnvio.DEFAULT, mensaje: "" };
    let cotizacion = handleSyncDatosCotizacion();
    const rptM = await registrarMetodoEnvioCotizacion({
      numCodigoCotizacionOnline: cotizacion.numCodigoCotizacionOnline,
      metodoEnvio: _metodoEnvio.codigo,
      numCodigoDireccion: (_flgChange === false ? _numCodigoDireccion : state.numCodigoDireccion),
    });
    const jsonR = await rptM.json();
    console.log(jsonR);
    if (rptM.status === HttpStatus.HttpStatus_OK) {
      if (jsonR.status === statusMetodoEnvio.ERROR_ZONA_INCONRRECTA) {
        _metodoEnvio = MetodoEnvio.RecojoAlmacen;
        _statusMetodoEnvio.status = statusMetodoEnvio.ERROR_ZONA_INCONRRECTA;
        _statusMetodoEnvio.mensaje = jsonR.mensaje;
      }
      if (jsonR.status === statusMetodoEnvio.ERROR_SUPERA_CARGA) {
        _metodoEnvio = MetodoEnvio.RecojoAlmacen;
        _statusMetodoEnvio.status = statusMetodoEnvio.ERROR_SUPERA_CARGA;
        _statusMetodoEnvio.mensaje = jsonR.mensaje;
      }
      if (jsonR.status === statusMetodoEnvio.ACTUALIZADO) {
        _statusMetodoEnvio.status = statusMetodoEnvio.ACTUALIZADO;
        _statusMetodoEnvio.mensaje = jsonR.mensaje;
      }
    }

    const _cotizacionResumen = {
      totalRegistros: 0,
      numSubTotalDol: 0,
      numIgvDol: 0,
      numEnvioDol: 0,
      numTotalDol: 0,

      numSubTotalSol: 0,
      numIgvSol: 0,
      numEnvioSol: 0,
      numTotalSol: 0,
      cantidadDetalleSeleccionado: 0,
    };
    const rptC = await obtenerCotizacion({
      numCodigoCotizacionOnline: cotizacion.numCodigoCotizacionOnline,
    });
    if (rptC.status === HttpStatus.HttpStatus_OK) {
      const jsonC = await rptC.json();
      _cotizacionResumen.totalRegistros = jsonC.totalRegistros;
      _cotizacionResumen.numSubTotalDol = jsonC.numSubTotalDol;
      _cotizacionResumen.numIgvDol = jsonC.numIgvDol;
      _cotizacionResumen.numEnvioDol = jsonC.numEnvioDol;
      _cotizacionResumen.numTotalDol = jsonC.numTotalDol;
      _cotizacionResumen.numSubTotalSol = jsonC.numSubTotalSol;
      _cotizacionResumen.numIgvSol = jsonC.numIgvSol;
      _cotizacionResumen.numEnvioSol = jsonC.numEnvioSol;
      _cotizacionResumen.numTotalSol = jsonC.numTotalSol;
      _cotizacionResumen.numCodigoCotizacionOnline = cotizacion.numCodigoCotizacionOnline;
      console.log(_cotizacionResumen);
    }

    dispatch({
      type: actionType.SET_MODOENVIO,
      MetodoEnvio: _metodoEnvio,
      cotizacionResumen: _cotizacionResumen,
      statusMetodoEnvio: _statusMetodoEnvio,
    });
  }

  return (
    <div className="form-pago">
      <div className="form-pago-data">
        <div className="form-pago-control">
          <div
            className={
              focusMenu === PagoMenu.PERSONALES.index
                ? "form-pago-item form-pago-item-active"
                : "form-pago-item form-pago-item-inactive"
            }
            onClick={() => handleEnventControlMenu(PagoMenu.PERSONALES.index)}
          >
            <div className="form-pago-menu">
              <span>DATOS PERSONALES</span>
            </div>
            <div
              className={
                focusMenu === PagoMenu.PERSONALES.index
                  ? "arrow_box"
                  : "arrow_box-inactive"
              }
            ></div>
          </div>
          <div
            className={
              focusMenu === PagoMenu.ENVIO.index
                ? "form-pago-item form-pago-item-active"
                : "form-pago-item form-pago-item-inactive"
            }
            onClick={() => handleEnventControlMenu(PagoMenu.ENVIO.index)}
          >
            <div className="form-pago-menu">
              <span className="form-pago-span-left">MÉTODO DE ENVÍO</span>
            </div>
            <div
              className={
                focusMenu === PagoMenu.ENVIO.index
                  ? "arrow_box"
                  : "arrow_box-inactive"
              }
            ></div>
          </div>
          <div
            className={
              focusMenu === PagoMenu.PASARELA.index
                ? "form-pago-item form-pago-item-active no-cursor"
                : "form-pago-item form-pago-item-inactive no-cursor"
            }
          >
            <div className="form-pago-menu">
              <span>PAGO</span>
            </div>
          </div>
        </div>
        <div
          className={
            focusMenu === PagoMenu.PERSONALES.index
              ? "form-pago-card-persona form-pago-card-active"
              : "form-pago-card-persona"
          }
        >

          <p>
            Conectado como:{" "}
            <Link
              to={
                "/informacion/" +
                usuarioLogeado.numCodigoCliente +
                "/CarritoPayment"
              }
            >
              {usuarioLogeado.NombreCompleto}
            </Link>
          </p>


          <span className="form-pago-item-direccion">Dirección de envío</span>
          <div className="direccion-content">
            {state.lstDireccion.map((direccion) => (
              <div
                className={
                  state.numCodigoDireccion === direccion.numCodigoDireccion
                    ? "direccion-card direccion-card-active"
                    : "direccion-card "
                }
                key={direccion.numCodigoDireccion}
              >
                <div className="row-direccion">
                  <input
                    type="radio"
                    name="rdodireccion"
                    defaultChecked={direccion.flgPredeterminado ? true : false}
                    onChange={() => handleEventChangeDirecciones(direccion)}
                  ></input>

                  <span className="class-text-bold">
                    {direccion.vchrAlias === null ? "-" : direccion.vchrAlias}{" "}
                  </span>
                </div>
                <div className="row-direccion">
                  <span>{direccion.vchDireccion}</span>
                </div>
                <div className="row-direccion">
                  <span>
                    {direccion.vchreferencia === null
                      ? "-"
                      : direccion.vchreferencia}
                  </span>
                </div>
                <div className="row-direccion">
                  <span>
                    {direccion.vchDocumento}

                  </span>
                </div>
                <div className="row-direccion">
                  <span>
                    {direccion.vchApellido}
                    {" "}
                    {direccion.vchNombre}
                  </span>
                </div>
                <div className="row-direccion">
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
            ))}
          </div>
          <div className="form-pago-link-direccion">
            <Link
              to={
                "/direccion/" +
                usuarioLogeado.numCodigoCliente +
                "/CarritoPayment"
              }
            >
              <i className="fa fa-pencil" aria-hidden="true"></i>Modificar/Adicionar
              Direcciones
            </Link>
          </div>
          <p>
            La dirección seleccionada se utilizará como direccion de entrega.
          </p>

          <div className="form-pago-botonera">
            <button
              className="btn btn-primary"
              onClick={() => handleEnventControlMenuNext()}
            >
              Continuar
            </button>
          </div>
        </div>

        <div
          className={
            focusMenu === PagoMenu.ENVIO.index
              ? "form-pago-card-envio form-pago-card-active"
              : "form-pago-card-envio"
          }
        >
          <h4>MÉTODO DE ENVÍO</h4>
          <div className="form-pago-radio-me">
            <div className="form-pago-radio-me-item">
              <div className="inputs">
                <input
                  type="radio"
                  name="MetodoEnvio"
                  disabled={true}
                  checked={
                    state.MetodoEnvio.codigo ===
                      MetodoEnvio.RecojoAlmacen.codigo
                      ? true
                      : false
                  }
                  onChange={() =>
                    handleEventChangeModoEnvio(MetodoEnvio.RecojoAlmacen, 0, true)
                  }
                ></input>
                <img
                  src={LogoAlmacen}
                  alt={MetodoEnvio.RecojoAlmacen.descripcion}
                ></img>
              </div>
              <div className="descrip label-disable">
                {MetodoEnvio.RecojoAlmacen.descripcion}
              </div>
              <div className="direcc label-disable">
                {MetodoEnvio.RecojoAlmacen.direccion}
              </div>
              <div className="precio">{MetodoEnvio.RecojoAlmacen.precio}</div>
            </div>
            <div className="form-pago-radio-me-item">
              <div className="inputs">
                <input
                  type="radio"
                  name="MetodoEnvio"
                  checked={
                    state.MetodoEnvio.codigo === MetodoEnvio.EnvioRegular.codigo
                      ? true
                      : false
                  }
                  onChange={() =>
                    handleEventChangeModoEnvio(MetodoEnvio.EnvioRegular, 0, true)
                  }
                ></input>
                <img
                  src={LogoCamion}
                  alt={MetodoEnvio.EnvioRegular.descripcion}
                ></img>
              </div>
              <div className="descrip">
                {MetodoEnvio.EnvioRegular.descripcion}
              </div>
              <div className="direcc">{MetodoEnvio.EnvioRegular.direccion}</div>
              <div className="precio">{MetodoEnvio.EnvioRegular.precio}</div>
            </div>
            <div className="form-pago-info-item">
              {state.statusMetodoEnvio.status ===
                statusMetodoEnvio.ERROR_SUPERA_CARGA ? (
                <div className="alert alert-danger">
                  {state.statusMetodoEnvio.mensaje}
                </div>
              ) : (
                ""
              )}

              {state.statusMetodoEnvio.status ===
                statusMetodoEnvio.ERROR_ZONA_INCONRRECTA ? (
                <div className="alert alert-danger">
                  {state.statusMetodoEnvio.mensaje}
                </div>
              ) : (
                ""
              )}

              {state.statusMetodoEnvio.status ===
                statusMetodoEnvio.ACTUALIZADO ? (
                <div className="alert alert-info">
                  {state.statusMetodoEnvio.mensaje}
                </div>
              ) : (
                ""
              )}
            </div>
          </div>
          <p>
            Si desea dejarnos un comentario acerca de su pedido, por favor,
            escríbalo a continuación.
          </p>
          <div className="form-pago-textarea">
            <textarea value={state.vchObservacion}
              onChange={(e) => dispatch({ type: actionType.OBSERVACION, vchObservacion: e.target.value })}
            ></textarea>
          </div>
          <input
            type="checkbox"
            checked={state.enableButton}
            onChange={(e) =>
              dispatch({
                type: actionType.ENABLEBUTTON,
                enableButton: e.target.checked,
              })
            }
          ></input>
          Estoy de acuerdo con los{" "}
          <span  onClick={() => handleActionCerrar(true)} className="form-pago-link-tc">
            términos del servicio
          </span>{" "}
          y los acepto sin reservas.
          <div className="form-pago-botonera">
            <button
              className="btn btn-primary"
              disabled={!(state.enableButton && (state.statusMetodoEnvio.status === statusMetodoEnvio.DEFAULT || state.statusMetodoEnvio.status === statusMetodoEnvio.ACTUALIZADO))}
              onClick={() => handleEnventControlMenuNext()}
            >
              Continuar
            </button>
          </div>
        </div>
        <div
          className={
            focusMenu === PagoMenu.PASARELA.index
              ? "form-pago-card-pasarela form-pago-card-active"
              : "form-pago-card-pasarela"
          }
        >

          <div className="div-forma-pago-banner">
            <img src={izipay} alt="izipay.png" ></img>

          </div>
          <div className="div-pago">

            <div className="form">
              <div className="container">
                <div id="myPaymentForm">


                  <Loading></Loading>
                </div>

              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="form-pago-resumen">
        <div className="carrito-detalle-item">
          <div className="carrito-detalle-resumen">
            <div className="producto-det-data-item">
              <label className="label-item-total-car">
                Hay {state.cotizacionResumen.totalRegistros} artículos en su
                carrito.
              </label>
            </div>
            <div className="producto-det-data-item">
              <label className="label-item">Subtotal:</label>
              <span className="item-row-simbolo simbolo-color-deft">
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? Moneda.DOLARES.codigoIso4217
                  : Moneda.SOLES.codigoIso4217}
              </span>
              <label className="label-moneda">
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? state.cotizacionResumen.numSubTotalDol
                  : state.cotizacionResumen.numSubTotalSol}
              </label>
            </div>

            <div className="producto-det-data-item">
              <label className="label-item">Envío:</label>
              <span className="item-row-simbolo simbolo-color-deft">
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? Moneda.DOLARES.codigoIso4217
                  : Moneda.SOLES.codigoIso4217}
              </span>
              <label className="label-moneda">
                {" "}
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? state.cotizacionResumen.numEnvioDol
                  : state.cotizacionResumen.numEnvioSol}
              </label>
            </div>
            <div className="producto-det-data-item">
              <label className="label-item">Igv:</label>
              <span className="item-row-simbolo simbolo-color-deft">
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? Moneda.DOLARES.codigoIso4217
                  : Moneda.SOLES.codigoIso4217}
              </span>
              <label className="label-moneda">
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? state.cotizacionResumen.numIgvDol
                  : state.cotizacionResumen.numIgvSol}
              </label>
            </div>
            <div className="producto-det-data-item">
              <label className="label-item">Total (impuestos inc.):</label>
              <span className="item-row-simbolo simbolo-color-deft">
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? Moneda.DOLARES.codigoIso4217
                  : Moneda.SOLES.codigoIso4217}
              </span>
              <label className="label-moneda">
                {props.moneda.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                  ? state.cotizacionResumen.numTotalDol
                  : state.cotizacionResumen.numTotalSol}
              </label>
            </div>
          </div>
        </div>
        <div className="form-pago-resumen-info">
          <div className="carrito-detalle-item">
            <i className="fa fa-shield-p"></i>
            {InfoCondicionCompra.EMISION}
            <hr />
          </div>
          <div className="carrito-detalle-item">
            <i className="fa fa-truck" aria-hidden="true"></i>
            {InfoCondicionCompra.TRANSPORTE}
            <hr />
          </div>
          <div className="carrito-detalle-item">
            <i className="fa fa-exchange" aria-hidden="true"></i>
            {InfoCondicionCompra.DEVOLUCIONES}
            <hr />
          </div>
        </div>
      </div>

      <Modal
        className="modal-pago-terminos"
        show={showModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header onHide={() => handleActionCerrar(false)} closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Términos y condiciones de uso
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <TerminoCondicionEstatico linkNavegacion="CarritoPayment"></TerminoCondicionEstatico>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => handleActionCerrar(false)}
            className="btn btn-primary"
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>

      <ServerException server={state.server}></ServerException>
    </div>
  );
}
let actionType = {
  ENABLEBUTTON: "ENABLEBUTTON",
  SET_MODOENVIO: "SET_MODOENVIO",
  SET_DIRECCION: "SET_DIRECCION",
  LOAD: "LOAD",
  SET_CREATE_PAYMENT: "SET_CREATE_PAYMENT",
  ERROR: "ERROR",
  INIT_PAYMENT: "INIT_PAYMENT",
  OBSERVACION: "OBSERVACION"
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.ENABLEBUTTON:
      return {
        ...state,
        enableButton: action.enableButton,
      };

    case actionType.INIT_PAYMENT:
      return {
        ...state
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.OBSERVACION:
      return {
        ...state,
        vchObservacion: action.vchObservacion,
      };

    case actionType.SET_CREATE_PAYMENT:
      return {
        ...state,
        payment: action.payment,
      };
    case actionType.SET_MODOENVIO:
      return {
        ...state,
        MetodoEnvio: action.MetodoEnvio,
        cotizacionResumen: action.cotizacionResumen,
        statusMetodoEnvio: action.statusMetodoEnvio,
      };
    case actionType.LOAD:
      return {
        ...state,
        lstDireccion: action.lstDireccion,
        numCodigoDireccion: action.numCodigoDireccion,
        cotizacionResumen: action.cotizacionResumen,
        MetodoEnvio: action.MetodoEnvio,
      };
    case actionType.SET_DIRECCION:
      return {
        ...state,
        numCodigoDireccion: action.numCodigoDireccion,
        MetodoEnvio: action.MetodoEnvio,
        statusMetodoEnvio: action.statusMetodoEnvio,
      };
    default:
      return state;
  }
};
