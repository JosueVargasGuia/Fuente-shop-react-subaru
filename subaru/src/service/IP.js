const URL = {
  SUSCRIPCION: "/suscripcion/registro",
  LOGIN_CLIENTE: "/authorization/cliente/login",
  LISTA_UBIGEO: "/authorization/cliente/ubigeo",
  REGISTRAR_CLIENTE: "/authorization/cliente/registro",
  PETICION_CAMBIO_PASSWORD:"/authorization/cliente/peticionCambioPassword",
  DATOS_PETICION_PASSWORD:"/authorization/cliente/datosPeticionCambioPassword",
  ACTUALIZAR_PASSWORD:"/authorization/cliente/actualizarPassword",
  OBTENER_CLIENTE: "/authorization/cliente/obtenerUsuario",
  OBTENER_DIRECCIONES: "/direccion/lstdireccion",
  REGISTRAR_DIRECCIONES: "/direccion/registro",
  ELIMINAR_DIRECCIONES: "/direccion/delete",
  OBTENER_PRODUCTOS: "/producto/lista",
  TIPO_CAMBIO:"/authorization/cliente/tipoCambio",
  REGISTRAR_COTIZACION:"/cotizacion/registrarCotizacion",
  OBTENER_COTIZACION_ACTIVA:"/cotizacion/obtenerCotizacionActiva",
  OBTENER_COTIZACION:"/cotizacion/obtenerCotizacion",
  OBTENER_COTIZACION_DETALLE:"/cotizacion/obtenerCotizacionDetalle",
  REGISTRAR_COTIZACION_DETALLE:"/cotizacion/registrarCotizacionDetalle",
  ELIMINAR_COTIZACION_DETALLE:"/cotizacion/eliminarCotizacionDetalle",
  REISTRAR_COTIZACION_METODO_ENVIO:"/cotizacion/registrarCotizacionMetodoEnvio",   
  LISTAR_SUBFAMILIA:"/producto/listaSubfamilia",
  LISTAR_PRODUCTO_IMAGEN:"/productoImagen/listaImangen",
  CRUD_PRODUCTO_IMAGEN:"/productoImagen/subirImagen",
  LISTAR_ATRIBUTO:"/productoImagen/listaAtributo",
  LISTAR_PRODUCTO_REPORTE:"/productoImagen/listaProductoReporte",
  LISTAR_PRODUCTO_ATRIBUTO:"/productoImagen/listaProductoAtributo",
  CRUD_PRODUCTO_ATRIBUTO:"/productoImagen/productoAtributo",
  CRUD_PRODUCTO_CATEGORIA:"/productoImagen/productoCategoria",
  INIT_CREATE_PAYMENT:"/cotizacion/iniciarCreatePayment",
  LISTAR_TUS_COMPRAS:"/cotizacion/obtenerTusCompras",
};

function IP(uri) {
  //return `http://localhost:8084/service${uri}`; 
  return `http://190.81.61.102:8086/ShopAutoPartsServices/service${uri}`;
}
function IziPay() {
  return `https://api.micuentaweb.pe/api-payment/V4/Charge/SDKTest`;
}
export { URL, IP,IziPay };
