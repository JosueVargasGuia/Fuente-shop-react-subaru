import {
  fetchService,
  METHOD,
  tokenFetchService,
} from "../matchService/fetchService";

import { IP, URL } from "./IP";
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
  const response = await fetchService(
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
  eliminarDireccion 
};
