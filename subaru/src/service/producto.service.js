import { fetchService, tokenFetchService, METHOD } from "../matchService/fetchService";
import { IP, URL } from "./IP";

async function findProductos(body) {  
  const response = await fetchService(
    IP(URL.OBTENER_PRODUCTOS),
    body,
    METHOD.POST
  );
  return response;
}
async function findProductosFilterInput(body) {  
  const response = await fetchService(
    IP(URL.OBTENER_PRODUCTOS_FILTER),
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
  const response = await tokenFetchService(
    IP(URL.LISTAR_PRODUCTO_IMAGEN),
    body,
    METHOD.POST
  );
  return response;
}
async function crudProductoImagen(body) {

  const response = await tokenFetchService(
    IP(URL.CRUD_PRODUCTO_IMAGEN),
    body,
    METHOD.POST
  );
  return response;
}
async function listaAtributo(body) {
  const response = await tokenFetchService(
    IP(URL.LISTAR_ATRIBUTO),
    body,
    METHOD.POST
  );
  return response;
}

async function listaProductoReporte(body) {   
  const response = await tokenFetchService(
    IP(URL.LISTAR_PRODUCTO_REPORTE),
    body,
    METHOD.POST
  );
  return response;
}

async function listaProductoAtributo(body) {

  const response = await tokenFetchService(
    IP(URL.LISTAR_PRODUCTO_ATRIBUTO),
    body,
    METHOD.POST
  );
  return response;
}
async function crudProductoAtributo(body) {
  console.log(body)
  const response = await tokenFetchService(
    IP(URL.CRUD_PRODUCTO_ATRIBUTO),
    body,
    METHOD.POST
  );
  return response;
}
async function crudProductoCategoria(body) {
  const response = await tokenFetchService(
    IP(URL.CRUD_PRODUCTO_CATEGORIA),
    body,
    METHOD.POST
  );
  return response;
}
async function listaProductoStock(body) {
  const response = await tokenFetchService(
    IP(URL.LISTAR_PRODUCTO_IMAGEN_STOCK),
    body,
    METHOD.POST
  );
  return response;
}
async function actualizarProductosStock(body) {
  const response = await tokenFetchService(
    IP(URL.ACTUALIZAR_PRODUCTO_STOCK),
    body,
    METHOD.POST
  );
  return response;
}
async function listaReporteCotizacion(body) {
  const response = await tokenFetchService(
    IP(URL.REPORTE_COTIZACION),
    body,
    METHOD.POST
  );
  return response;
}
async function obtenerReporteToPdf(body) {
  const response = await tokenFetchService(
    IP(URL.OBTENER_REPORTE_TO_PDF),
    body,
    METHOD.POST
  );
  return response;
}
async function asociarOcToCotizacion(body) { 
  const response = await tokenFetchService(
    IP(URL.ASOCIAR_OC_TO_COTIZACION),
    body,
    METHOD.POST
  );
  return response;
}
async function listarProductoOutletVigencia(body) {
  const response = await tokenFetchService(
    IP(URL.LISTA_PRODUCTO_OUTLET_VIGENCIA),
    body,
    METHOD.POST
  );
  return response;
}
async function saveProductoOutletVigencia(body) {
  const response = await tokenFetchService(
    IP(URL.REGISTRAR_PROD_OUTLET_VIGENCIA),
    body,
    METHOD.POST
  );
  return response;
}
async function listarProductoOutlet(body) {  
  const response = await tokenFetchService(
    IP(URL.LISTA_PRODUCTO_OUTLET),
    body,
    METHOD.POST
  );
  return response;
}
async function saveUpdateProductoOutlet(body) {  
  const response = await tokenFetchService(
    IP(URL.SAVE_UPDATE_PRODUCTO_OUTLET),
    body,
    METHOD.POST
  );
  return response;
}
async function updateProductoOutletRow(body) {     
  const response = await tokenFetchService(
    IP(URL.UPDATE_PRODUCTO_OUTLET),
    body,
    METHOD.POST
  );
  return response;
}
async function listaProductoFindCodByDesc(body) {     
  const response = await tokenFetchService(
    IP(URL.LST_PRODUCTO_FIND),
    body,
    METHOD.POST
  );
  return response;
}
async function saveUpdateMenu(body) {     
  const response = await tokenFetchService(
    IP(URL.UPDATE_SAVE_MENU),
    body,
    METHOD.POST
  );
  return response;
}

async function obtenerMenus(body) {
  const response = await tokenFetchService(
    IP(URL.OBTENER_MENU),
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
  crudProductoCategoria,
  listaProductoReporte,
  listaProductoStock,
  actualizarProductosStock,
  listaReporteCotizacion,
  obtenerReporteToPdf,
  asociarOcToCotizacion,
  listarProductoOutletVigencia,
  saveProductoOutletVigencia,
  listarProductoOutlet,
  saveUpdateProductoOutlet,
  updateProductoOutletRow,
  listaProductoFindCodByDesc,
  findProductosFilterInput,
  saveUpdateMenu,
  obtenerMenus
};
