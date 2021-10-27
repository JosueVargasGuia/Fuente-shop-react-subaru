import {  fetchService, METHOD, tokenFetchService } from "../matchService/fetchService";

import { IP,  URL } from "./IP";
async function registrarCotizacion(body) {
  const response = await fetchService(
    IP(URL.REGISTRAR_COTIZACION),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerCotizacionActiva(body) {
  const response = await fetchService(
    IP(URL.OBTENER_COTIZACION_ACTIVA),
    body,
    METHOD.POST
  );
  return response;
}
async function registrarCotizacionDetalle(body) {
  const response = await fetchService(
    IP(URL.REGISTRAR_COTIZACION_DETALLE),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerCotizacion(body) {
  const response = await fetchService(
    IP(URL.OBTENER_COTIZACION),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerCotizacionDetalle(body) {
  const response = await fetchService(
    IP(URL.OBTENER_COTIZACION_DETALLE),
    body,
    METHOD.POST
  );
  return response;
}
async function eliminarCotizacionDetalle(body) {
  const response = await fetchService(
    IP(URL.ELIMINAR_COTIZACION_DETALLE),
    body,
    METHOD.POST
  );
  return response;
}
/*
async function requetsIziPayAutentificacion(body) {
  const response = await fetchIziPay(
    IziPay(),
    body,
    METHOD.POST
  );
  return response;
}*/

async function registrarMetodoEnvioCotizacion(body) {
  console.log(body)
  const response = await tokenFetchService(
    IP(URL.REISTRAR_COTIZACION_METODO_ENVIO),
    body,
    METHOD.POST
  );
  return response;
}
async function initCreatePayment(body) {  
  const response = await fetchService(
    IP(URL.INIT_CREATE_PAYMENT),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerTusCompras(body) { 
  const response = await tokenFetchService(
    IP(URL.LISTAR_TUS_COMPRAS),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerTusComprasDetalle(body) { 
  const response = await fetchService(
    IP(URL.LISTAR_TUS_COMPRAS_DETALLE),
    body,
    METHOD.POST
  );
  return response;
}
export {
  registrarCotizacion,
  obtenerCotizacionActiva,
  registrarCotizacionDetalle,
  obtenerCotizacion,
  obtenerCotizacionDetalle,
  eliminarCotizacionDetalle,
  
  registrarMetodoEnvioCotizacion,
  initCreatePayment,
  obtenerTusCompras,
  obtenerTusComprasDetalle
};
