const URL = {
  SUSCRIPCION: "/suscripcion/registro",
  LOGIN_CLIENTE: "/authorization/cliente/login",
  LISTA_UBIGEO: "/authorization/cliente/ubigeo",
  REGISTRAR_CLIENTE: "/authorization/cliente/registro",
  PETICION_CAMBIO_PASSWORD: "/authorization/cliente/peticionCambioPassword",
  DATOS_PETICION_PASSWORD: "/authorization/cliente/datosPeticionCambioPassword",
  ACTUALIZAR_PASSWORD: "/authorization/cliente/actualizarPassword",

  OBTENER_PRODUCTOS: "/producto/lista",
  TIPO_CAMBIO: "/authorization/cliente/tipoCambio",
  REGISTRAR_COTIZACION: "/cotizacion/registrarCotizacion",
  OBTENER_COTIZACION_ACTIVA: "/cotizacion/obtenerCotizacionActiva",
  OBTENER_COTIZACION: "/cotizacion/obtenerCotizacion",
  OBTENER_COTIZACION_DETALLE: "/cotizacion/obtenerCotizacionDetalle",
  REGISTRAR_COTIZACION_DETALLE: "/cotizacion/registrarCotizacionDetalle",
  ELIMINAR_COTIZACION_DETALLE: "/cotizacion/eliminarCotizacionDetalle",
  LISTAR_SUBFAMILIA: "/producto/listaSubfamilia",

  VALIDATE_TOKEN: "/authorization/cliente/validateToken",


  OBTENER_CLIENTE: "/authorization/cliente/obtenerUsuario",/*Privado */
  OBTENER_DIRECCIONES: "/direccion/lstdireccion",/*Privado */
  REGISTRAR_DIRECCIONES: "/direccion/registro",/*Privado */
  ELIMINAR_DIRECCIONES: "/direccion/delete",/*Privado */
  REISTRAR_COTIZACION_METODO_ENVIO: "/cotizacion/registrarCotizacionMetodoEnvio",   /*Privado */
  LISTAR_PRODUCTO_IMAGEN: "/productoImagen/listaImangen",/*Privado */
  CRUD_PRODUCTO_IMAGEN: "/productoImagen/subirImagen",/*Privado */
  LISTAR_ATRIBUTO: "/productoImagen/listaAtributo",/*Privado */
  LISTAR_PRODUCTO_REPORTE: "/productoImagen/listaProductoReporte",/*Privado */
  LISTAR_PRODUCTO_ATRIBUTO: "/productoImagen/listaProductoAtributo",
  CRUD_PRODUCTO_ATRIBUTO: "/productoImagen/productoAtributo",/*Privado */
  CRUD_PRODUCTO_CATEGORIA: "/productoImagen/productoCategoria",/*Privado */
  INIT_CREATE_PAYMENT: "/cotizacion/iniciarCreatePayment",/*Privado */
  LISTAR_TUS_COMPRAS: "/cotizacion/obtenerTusCompras",/*Privado */
  
  OBTENER_LISTA_USUARIO:"/authorization/cliente/obtLstUsuarioAdmin",/*Privado Administrador */
  QUITAR_USUARIO_ADMIN:"/authorization/cliente/quitarUsuarioAdmin"/*Privado Administrador */
};

function IP(uri) {
  let _CONTEXT = 'DESARROLLO_LOCAL';
  let _IP = '';
  let _PORT = '';
  let _API = '';
  if (_CONTEXT === 'DESARROLLO') {
    _IP = '190.81.61.102';
    _PORT = '8085';
    _API = '/ShopAutoPartsServices/service';
  }
  if (_CONTEXT === 'DESARROLLO_LOCAL') {
    _IP = 'localhost';
    _PORT = '8084';
    _API = '/service';
  }
  if (_CONTEXT === 'BETA') {
    _IP = '190.81.61.102';
    _PORT = '8087';
    _API = '/ShopAutoPartsServices/service';
  }
  //let _API='service'; //locla host
  return `http://${_IP}:${_PORT}${_API}${uri}`;
}
function IziPay() {
  return `https://api.micuentaweb.pe/api-payment/V4/Charge/SDKTest`;
}
export { URL, IP, IziPay };
