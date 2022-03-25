import {
  fetchService,
  METHOD,
  tokenFetchService,
} from "../matchService/fetchService";
import { HttpStatus } from "./ENUM";

import { IP, URL } from "./IP";

async function validacionToken(body) {
  let _response = { status: 200 };
  try {
    const response = await fetchService(
      IP(URL.VALIDATE_TOKEN),
      body,
      METHOD.POST
    );
    if (response.status === HttpStatus.HttpStatus_OK) {
      _response = response;
    } else {
      _response.status = -999;
    }
    return _response;
  } catch (error) {
    _response.status = -999;
  }
}
async function logeoCLiente(body) {
  const response = await fetchService(IP(URL.LOGIN_CLIENTE), body, METHOD.POST);
  return response;
}
async function recuperarContraseña(body) {
  const response = await fetchService(
    IP(URL.PETICION_CAMBIO_PASSWORD),
    body,
    METHOD.POST
  );
  return response;
}
async function datosPeticionContraseña(body) {
  const response = await fetchService(
    IP(URL.DATOS_PETICION_PASSWORD),
    body,
    METHOD.POST
  );
  return response;
}
async function actualizarContraseña(body) {
  const response = await fetchService(
    IP(URL.ACTUALIZAR_PASSWORD),
    body,
    METHOD.POST
  );
  return response;
}
async function listarUbigeo(body) {
  const response = await fetchService(IP(URL.LISTA_UBIGEO), body, METHOD.POST);
  return response;
}

async function registrarCliente(body) {
  const response = await fetchService(
    IP(URL.REGISTRAR_CLIENTE),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerCliente(body) {
  const response = await tokenFetchService(
    IP(URL.OBTENER_CLIENTE),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerDirecciones(body) {
  const response = await tokenFetchService(
    IP(URL.OBTENER_DIRECCIONES),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerListaUsuario(body) {
  const response = await tokenFetchService(
    IP(URL.OBTENER_LISTA_USUARIO),
    body,
    METHOD.POST
  );
  return response;
}

async function registrarDireccion(body) {
  const response = await tokenFetchService(
    IP(URL.REGISTRAR_DIRECCIONES),
    body,
    METHOD.POST
  );
  return response;
}
async function eliminarDireccion(body) {
  const response = await tokenFetchService(
    IP(URL.ELIMINAR_DIRECCIONES),
    body,
    METHOD.POST
  );
  return response;
}
async function quitarUsuarioAdministrador(body) {
  const response = await tokenFetchService(
    IP(URL.QUITAR_USUARIO_ADMIN),
    body,
    METHOD.POST
  );
  return response;
}


export {
  logeoCLiente,
  recuperarContraseña,
  datosPeticionContraseña,
  actualizarContraseña,
  listarUbigeo,
  registrarCliente,
  obtenerCliente,
  obtenerDirecciones,
  registrarDireccion,
  eliminarDireccion,
  validacionToken,
  obtenerListaUsuario,
  quitarUsuarioAdministrador
};
