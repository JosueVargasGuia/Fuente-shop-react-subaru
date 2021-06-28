import { HttpStatus, localStoreEnum, statusSyncCotizacion, UbigeoTipo } from "./ENUM";
import { listarUbigeo } from "../service/loginCliente.service";
import React from "react";

async function handleObtenerDepartamento() {
  /*Request de departamentos */
  const rowDepartamento = [];
  const rptDep = await listarUbigeo({ ubigeoTipo: UbigeoTipo.DEPARTAMENTO });
  if (rptDep.status === HttpStatus.HttpStatus_OK) {
    const departamento = await rptDep.json();

    for (let index = 0; index < departamento.listaUbigeo.length; index++) {
      const element = departamento.listaUbigeo[index];
      rowDepartamento.push(
        <option
          value={element.chrCodigoDepartamento}
          key={element.chrCodigoDepartamento}
        >
          {element.vchDescripcion}
        </option>
      );
    }
  }
  return rowDepartamento;
}
async function handleObtenerProvincia(_chrCodigoDepartamento) {
   
  /*Request de provincia */
  const rptDep = await listarUbigeo({
    ubigeoTipo: UbigeoTipo.PROVINCIA,
    chrCodigoDepartamento: _chrCodigoDepartamento,
  });
  const rowProvincia = [];
  if (rptDep.status === HttpStatus.HttpStatus_OK) {
    const provincia = await rptDep.json();

    for (let index = 0; index < provincia.listaUbigeo.length; index++) {
      const element = provincia.listaUbigeo[index];
      rowProvincia.push(
        <option
          value={element.chrCodigoProvincia}
          key={element.chrCodigoProvincia}
        >
          {element.vchDescripcion}
        </option>
      );
    }
  }
  return rowProvincia;
}
async function handleObtenerDistrito(params) {
  /*Request de distrito */
  const rptDep = await listarUbigeo({
    ubigeoTipo: UbigeoTipo.DISTRITO,
    chrCodigoDepartamento: params.chrCodigoDepartamento,
    chrCodigoProvincia: params.chrCodigoProvincia,
  });
  const rowDistrito = [];
  if (rptDep.status === HttpStatus.HttpStatus_OK) {
    const distrito = await rptDep.json();

    for (let index = 0; index < distrito.listaUbigeo.length; index++) {
      const element = distrito.listaUbigeo[index];
      rowDistrito.push(
        <option
          value={element.chrCodigoDistrito}
          key={element.chrCodigoDistrito}
        >
          {element.vchDescripcion}
        </option>
      );
    }
  }
  return rowDistrito;
}

function validarNumero(e) {
  let bool = false;
  let value = e.target.value;
  let regexp = /^[0-9\b]+$/;
  if (value === "" || regexp.test(value)) {
    bool = true;
  }
  return bool;
}

function handleSyncDatosCotizacion() {
  let cotizacion = {
    numCodigoCotizacionOnline: 0,
    numCodigoCliente: 0,
    numCodigoClienteUsuario: 0,
    status:statusSyncCotizacion.UNSYNCHRONIZED
  };
  let _cotizacion = JSON.parse(localStorage.getItem(localStoreEnum.COTIZACION));
  if (_cotizacion !== null) {
    cotizacion.numCodigoCotizacionOnline =
      _cotizacion.numCodigoCotizacionOnline;
      cotizacion.status=statusSyncCotizacion.SYNCRONIZA;
  }
  let _usuario = {};
  if (localStorage.getItem(localStoreEnum.USUARIO) !== null) {
    _usuario = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
    cotizacion.numCodigoCliente = _usuario.numCodigoCliente;
    cotizacion.numCodigoClienteUsuario = _usuario.numCodigoClienteUsuario;
  }
  return cotizacion;
}

export {
  handleObtenerDistrito,
  handleObtenerProvincia,
  handleObtenerDepartamento,
  validarNumero,
  handleSyncDatosCotizacion,
};
