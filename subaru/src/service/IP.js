const URL = {
  SUSCRIPCION: "/suscripcion/registro",
  LOGIN_CLIENTE: "/authorization/cliente/login",
  LISTA_UBIGEO: "/authorization/cliente/ubigeo",
  REGISTRAR_CLIENTE: "/authorization/cliente/registro",
  PETICION_CAMBIO_PASSWORD:"/authorization/cliente/peticionCambioPassword",
  DATOS_PETICION_PASSWORD:"/authorization/cliente/datosPeticionCambioPassword",
  ACTUALIZAR_PASSWORD:"/authorization/cliente/actualizarPassword",
   
  OBTENER_PRODUCTOS: "/producto/lista",
  TIPO_CAMBIO:"/authorization/cliente/tipoCambio",
  REGISTRAR_COTIZACION:"/cotizacion/registrarCotizacion",
  OBTENER_COTIZACION_ACTIVA:"/cotizacion/obtenerCotizacionActiva",
  OBTENER_COTIZACION:"/cotizacion/obtenerCotizacion",
  OBTENER_COTIZACION_DETALLE:"/cotizacion/obtenerCotizacionDetalle",
  REGISTRAR_COTIZACION_DETALLE:"/cotizacion/registrarCotizacionDetalle",
  ELIMINAR_COTIZACION_DETALLE:"/cotizacion/eliminarCotizacionDetalle",  
  LISTAR_SUBFAMILIA:"/producto/listaSubfamilia",
  VALIDATE_TOKEN:"/authorization/cliente/validateToken",
  OBTENER_DIRECCIONES: "/direccion/lstdireccion",/*Privado */
  REGISTRAR_DIRECCIONES: "/direccion/registro",/*Privado */
  ELIMINAR_DIRECCIONES: "/direccion/delete",/*Privado */


  OBTENER_CLIENTE: "/authorization/cliente/obtenerUsuario",/*Privado */  
  REISTRAR_COTIZACION_METODO_ENVIO:"/cotizacion/registrarCotizacionMetodoEnvio",   /*Privado */
  INIT_CREATE_PAYMENT:"/cotizacion/iniciarCreatePayment",/*Privado */
  LISTAR_TUS_COMPRAS:"/cotizacion/obtenerTusCompras",/*Privado */
  LISTAR_TUS_COMPRAS_DETALLE: "/cotizacion/obtenerTusComprasDetalle",/*Privado */
  

  CRUD_PRODUCTO_IMAGEN:"/productoImagen/subirImagen",/*Privado */
  LISTAR_ATRIBUTO:"/productoImagen/listaAtributo",/*Privado */    
  LISTAR_PRODUCTO_REPORTE:"/productoImagen/listaProductoReporte",/*Privado */
  LISTAR_PRODUCTO_ATRIBUTO:"/productoImagen/listaProductoAtributo",
  CRUD_PRODUCTO_ATRIBUTO:"/productoImagen/productoAtributo",/*Privado */
  CRUD_PRODUCTO_CATEGORIA:"/productoImagen/productoCategoria",/*Privado */
  OBTENER_LISTA_USUARIO:"/authorization/cliente/obtLstUsuarioAdmin",/*Privado Administrador */
  QUITAR_USUARIO_ADMIN:"/authorization/cliente/quitarUsuarioAdmin",/*Privado Administrador */
  //OBTENER_LISTA_STOCK:"/productoImagen/cliente/quitarUsuarioAdmin",/*Privado Administrador */
  LISTAR_PRODUCTO_IMAGEN:"/productoImagen/listaImangen",/*Privado Administrador */
  LISTAR_PRODUCTO_IMAGEN_STOCK:"/productoImagen/listaProductosStock",/*Privado Administrador */  
  ACTUALIZAR_PRODUCTO_STOCK:"/productoImagen/actualizarProductosStock",/*Privado Administrador */
  OBTENER_CORREO_JOBS:"/correo/obtenerCorreoJobs",/*Privado Administrador */
  REGISTRAR_CORREO_JOBS:"/correo/registrarCorreoJobs",/*Privado Administrador */
  REPORTE_COTIZACION:"/cotizacion/reporteCotizacion",/*Privado Administrador */
  };

function IP(uri) {
  let _PROTOCOLO='http';
  let _URL_API = 'localhost';//localhost ,bk.subaruparts.eanet.pe
  let _PORT = '8084';//undefined --> sin puerto,'8084'--> con puerto
  let _SERVICE = 'service';//'ShopAutoPartsServices/service' ,'service'-->localhost
  return _PROTOCOLO+'://'+_URL_API+(_PORT===undefined?'':(':'+_PORT))+"/"+_SERVICE+uri 
}
function IziPay() {
  return `https://api.micuentaweb.pe/api-payment/V4/Charge/SDKTest`;
}
export { URL, IP, IziPay };
