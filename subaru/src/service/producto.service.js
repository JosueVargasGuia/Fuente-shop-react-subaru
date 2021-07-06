import { fetchService, METHOD } from "../matchService/fetchService";

import { IP, URL } from "./IP";
async function findProductos(body) {
  const response = await fetchService(
    IP(URL.OBTENER_PRODUCTOS),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerTipoCambio() {
  const response = await fetchService(IP(URL.TIPO_CAMBIO), {}, METHOD.POST);
  return response;
}
async function uploadImagen(body) {
  const response = await fetchService(IP(URL.SUBIR_IMAGEN), body, METHOD.POST);
  return response;
}
async function obtenerSubFamilia(body) {
  const response = await fetchService(
    IP(URL.LISTAR_SUBFAMILIA),
    body,
    METHOD.POST
  );
  return response;
}
async function listaProductoImagen(body) {
  const response = await fetchService(
    IP(URL.LISTAR_PRODUCTO_IMAGEN),
    body,
    METHOD.POST
  );
  return response;
}
async function crudProductoImagen(body) {
  
  const response = await fetchService(
    IP(URL.CRUD_PRODUCTO_IMAGEN),
    body,
    METHOD.POST
  );
  return response;
}
async function listaAtributo(body) {
  
  const response = await fetchService(
    IP(URL.LISTAR_ATRIBUTO),
    body,
    METHOD.POST
  );
  return response;
}
async function listaProductoReporte(body) {  
  console.log(body)
  const response = await fetchService(
    IP(URL.LISTAR_PRODUCTO_REPORTE),
    body,
    METHOD.POST
  );
  return response;
}
async function listaProductoAtributo(body) {
  
  const response = await fetchService(
    IP(URL.LISTAR_PRODUCTO_ATRIBUTO),
    body,
    METHOD.POST
  );
  return response;
}
async function crudProductoAtributo(body) {
  console.log(body)
  const response = await fetchService(
    IP(URL.CRUD_PRODUCTO_ATRIBUTO),
    body,
    METHOD.POST
  );
  return response;
}
async function crudProductoCategoria(body) {
  console.log(body)
  const response = await fetchService(
    IP(URL.CRUD_PRODUCTO_CATEGORIA),
    body,
    METHOD.POST
  );
  return response;
}
export {
  findProductos,
  obtenerTipoCambio,
  uploadImagen,
  obtenerSubFamilia,
  listaProductoImagen,
  crudProductoImagen,
  listaAtributo,
  listaProductoAtributo,
  crudProductoAtributo,
  crudProductoCategoria,listaProductoReporte
};
