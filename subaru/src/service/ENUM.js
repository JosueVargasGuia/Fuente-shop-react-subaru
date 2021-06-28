/* Constantes que nos indica que el endpoints tiene un mensaje */
const SUCCESS_SERVER = {
  SUCCES_SERVER_DEFAULT: "SUCCES_SERVER_DEFAULT" /*valor por defecto  */,
  SUCCES_SERVER_OK:
    "SUCCES_SERVER_OK" /*indica que el endpoints no tiene mensajes */,
  SUCCES_SERVER_INFO:
    "SUCCES_SERVER_INFO" /*indica que el endpoints tiene un mensaje para el usuario ejm:Acceso denegado--> al ingresar una contraseña invalida */,
  SUCCES_SERVER_ERROR:
    "SUCCES_SERVER_ERROR" /*indica que se tiene un error interno, la cual se debe hacer el seguimiento para corregir el error */,
    SUCCES_SERVER_WARRING:
    "SUCCES_SERVER_WARRING" /*indica que se tiene un error interno, la cual se debe hacer el seguimiento para corregir el error */,
};
/*Constante que nos indica que el endpoints   */
const HttpStatus = {
  HttpStatus_OK: 200 /*retorno datos sin ningun mensaje de validacion */,
};
/*Constantes del componente de loginCliente.js y app.js */
const LOGGIN = {
  LOGGIN: "LOGGIN",
  LOGOUT: "LOGOUT",
};
/*Constante de tipo de ubigeo la cual el endpoint responde a estos valores 
para devolver los listados de departamentos,provincias o distritos
 */
const UbigeoTipo = {
  DEPARTAMENTO: 0,
  PROVINCIA: 1,
  DISTRITO: 2,
};
/*Variables para identificar que accion esta realizando */
const CRUD = {
  INSERT: {
    codigoCrud: 1,
    descripcion: "INSERT",
    estado: "Guardar",
    estadoRequest: "REGISTRANDO...",
  },
  UPDATE: {
    codigoCrud: 2,
    descripcion: "UPDATE",
    estado: "Actualizar",
    estadoRequest: "ACTUALINZANDO...",
  },
  DELETE: {
    codigoCrud: 3,
    descripcion: "DELETE",
    estado: "Eliminar",
    estadoRequest: "ELIMINANDO...",
  },
  SELECT: {
    codigoCrud: 4,
    descripcion: "SELECT",
    estado: "Consultar",
    estadoRequest: "CONSULTANDO...",
  },
};
/*Constate para evaluar si el componente esta cargando para ejecutar dispacher sin render infinitos */
const PAGE = {
  LOADING: "LOADING" /*Se esta cargando */,
  RENDERING: "RENDERING" /* Cuando se realizo el renderizado */,
  _INIT: "_INIT" /*Por defecto */,
};

/*Variables para identificar el tipo de moneda */
const Moneda = {
  DOLARES: {
    numCodigoMoneda: "1",
    vchDescripcion: "Dólares",
    vchAbreviatura: "D",
    vchSimbolo: "$",
    codigoIso4217: "USD",
  },
  SOLES: {
    numCodigoMoneda: "2",
    vchDescripcion: "Soles",
    vchAbreviatura: "S",
    vchSimbolo: "S/",
    codigoIso4217: "PEN",
  },
};
/*Variables de localStoreEnum */
const localStoreEnum = {
  COTIZACION: "COTIZACION",
  USUARIO: "USUARIO",
  ISLOGIN: "ISLOGIN",
  TOKEN: "TOKEN",
};
const statusSyncCotizacion = {
  SYNCRONIZA: "SYNCRONIZA",
  UNSYNCHRONIZED: "UNSYNCHRONIZED",
};
/*Tipo de actualizacion que se realiza al detalle de la cotizacion
ADICIONAR=Que al valor registrado en la tabla le aumentamos el valor que estamos pasando[BD=1 Parametro=2--> Cantidad Final=3]
ACTUALIZAR=Que el valor pasado como parametro sera el que se guarda[BD=5 Parametro=2--> Cantidad Final=2]
*/
const tipoActualizacionCotizacionDetalle = {
  ADICIONAR: "ADICIONAR",
  ACTUALIZAR: "ACTUALIZAR",
};
const InfoCondicionCompra = {
  EMISION:
    "Emitimos facturas en dólares. Si paga en una moneda diferente se realizará la conversión a USD,según al tipo de cambio indicado en la parte superior de la página.",
  TRANSPORTE:
    "Envíos en los siguientes 10 días; verifica que tu calle no se encuentre en las zonas peligrosas.",
  DEVOLUCIONES:
    "No se aceptan devoluciones a menos que el producto tenga falla de fábrica.",
};
/* Secuencia de pago */
const PagoMenu = {
  PERSONALES: { index: 1 },  
  ENVIO: { index: 2},
  PASARELA: { index: 3 },
};
/*Para la visualizacion de los productos*/
const displayLista = {
  RESUMEN: "RESUMEN",
  DETALLE: "DETALLE",
};

/*Modos de envio   */
const MetodoEnvio = {
  RecojoAlmacen: {
    numTipoMetodoEnvio: 0,
    codigo: "RecojoAlmacen",
    descripcion: "Recojo en Bodega",
    //direccion: "Calle Libertad 386 - San Miguel",
    direccion: "Próximamente habilitada",
    icons: "almacen.png",
    //precio: "Gratis",
    precio: "",
  },
  EnvioRegular: {
    numTipoMetodoEnvio: 1,
    codigo: "EnvioRegular",
    descripcion: "Envio Regular",
    direccion: "Entrega en los siguientes 10 dias",
    icons: "camion.png",
    precio: "",
  },
};
const statusMetodoEnvio = {
  DEFAULT: "DEFAULT",
  ACTUALIZADO: "ACTUALIZADO",
  ERROR_ZONA_INCONRRECTA: "ERROR_ZONA_INCONRRECTA",
  ERROR_SUPERA_CARGA: "ERROR_SUPERA_CARGA",
};
/*
option value="1">DNI</option>
            <option value="2">RUC</option>
            <option value="3">Carnet de extranjeria</option>
            <option value="4">Pasaporte</option>

*/
const TipoDocumento = {
  DEFAULT: {
    numtipocliente: 0,
    vchdescripcion: "-- Seleccione --",
    longitud: 0,
  },
  DNI: { numtipocliente: 1, vchdescripcion: "DNI", longitud: 8 },
  RUC: { numtipocliente: 2, vchdescripcion: "RUC", longitud: 11 },
  CARNET_EXT: {
    numtipocliente: 3,
    vchdescripcion: "Carnet de extranjeria",
    longitud: 12,
  },
  PASAPORTE: { numtipocliente: 4, vchdescripcion: "Pasaporte", longitud: 12 },
};

const lstMarcas = [
  {
    codigoMarca: 0,
    decripcion: "All",
    srcImage: "",
    chrcodigofamilia: null,
    classMarca:"class-marca-all",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/banner/SONAX.jpg" },
      { codigoCarrucel: 2, srcImage: "/marcas/banner/HYUNDAI.jpg" },
      { codigoCarrucel: 3, srcImage: "/marcas/banner/BOSCH.jpg" },
      { codigoCarrucel: 4, srcImage: "/marcas/banner/TOKICO.jpg" },
      { codigoCarrucel: 5, srcImage: "/marcas/banner/SPARCO.jpg" },
      { codigoCarrucel: 6, srcImage: "/marcas/banner/SPORTRACK.jpg" },
    ],
    lstBannerPromocion: [
      {
        codigoBanner: 1,
        descripcion: "banner promocion 1",
        srcImage: "/marcas/banner/promocion/1.png",
      },
      {
        codigoBanner: 2,
        descripcion: "banner promocion 2",
        srcImage: "/marcas/banner/promocion/2.png",
      },
      {
        codigoBanner: 3,
        descripcion: "banner promocion 3",
        srcImage: "/marcas/banner/promocion/3.png",
      },
      {
        codigoBanner: 4,
        descripcion: "banner promocion 4",
        srcImage: "/marcas/banner/promocion/4.png",
      },
    ],
  },
  {
    codigoMarca: 1,
    decripcion: "BOSCH",
    srcImage: "/marcas/bosch.jpg",
    chrcodigofamilia: "110C",
    classMarca:"class-marca-bosch",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/bosch/1.jpg" },
      { codigoCarrucel: 2, srcImage: "/marcas/bosch/2.jpg" },
      { codigoCarrucel: 3, srcImage: "/marcas/bosch/3.jpg" },
      { codigoCarrucel: 4, srcImage: "/marcas/bosch/4.jpg" },
      { codigoCarrucel: 5, srcImage: "/marcas/bosch/5.jpg" },
      { codigoCarrucel: 6, srcImage: "/marcas/bosch/6.jpg" },
      { codigoCarrucel: 7, srcImage: "/marcas/bosch/7.jpg" },
      { codigoCarrucel: 8, srcImage: "/marcas/bosch/8.jpg" },
    ],
    lstBannerPromocion: [
      {
        codigoBanner: 1,
        descripcion: "banner promocion 1",
        srcImage: "/marcas/bosch/promocion/1.png",
      },
      {
        codigoBanner: 2,
        descripcion: "banner promocion 2",
        srcImage: "/marcas/bosch/promocion/2.png",
      },
      {
        codigoBanner: 3,
        descripcion: "banner promocion 3",
        srcImage: "/marcas/bosch/promocion/3.png",
      },
      {
        codigoBanner: 4,
        descripcion: "banner promocion 4",
        srcImage: "/marcas/bosch/promocion/4.png",
      },
    ],
  },
  {
    codigoMarca: 6,
    decripcion: "TOKICO",
    srcImage: "/marcas/tokico.jpg",
    chrcodigofamilia: "110H",
    classMarca:"class-marca-tokico",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/tokico/1.jpg" },
      { codigoCarrucel: 2, srcImage: "/marcas/tokico/2.jpg" },
    ],
    lstBannerPromocion: [],
  },
  
  {
    codigoMarca: 3,
    decripcion: "HYUNDAI",
    srcImage: "/marcas/hyundai.jpg",
    chrcodigofamilia: "110G",
    classMarca:"class-marca-hyundai",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/hyundai/1.jpg" },
      { codigoCarrucel: 2, srcImage: "/marcas/hyundai/2.jpg" },
      { codigoCarrucel: 3, srcImage: "/marcas/hyundai/3.jpg" },
    ],
    lstBannerPromocion: [],
  },
  {
    codigoMarca: 4,
    decripcion: "SONAX",
    srcImage: "/marcas/sonax.jpg",
    chrcodigofamilia: "110D",
    classMarca:"class-marca-sonax",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/sonax/1.jpg" },
      { codigoCarrucel: 2, srcImage: "/marcas/sonax/2.jpg" },
      { codigoCarrucel: 3, srcImage: "/marcas/sonax/3.jpg" },
      { codigoCarrucel: 4, srcImage: "/marcas/sonax/4.jpg" },
    ],
    lstBannerPromocion: [
      {
        codigoBanner: 1,
        descripcion: "banner promocion 1",
        srcImage: "/marcas/sonax/promocion/1.png",
      },
      {
        codigoBanner: 2,
        descripcion: "banner promocion 2",
        srcImage: "/marcas/sonax/promocion/2.png",
      },
      {
        codigoBanner: 3,
        descripcion: "banner promocion 3",
        srcImage: "/marcas/sonax/promocion/3.png",
      },
      {
        codigoBanner: 4,
        descripcion: "banner promocion 4",
        srcImage: "/marcas/sonax/promocion/4.png",
      },
    ],
  },
  {
    codigoMarca: 7,
    decripcion: "SPORTRACK",
    srcImage: "/marcas/sportrack.jpg",
    chrcodigofamilia: "110F",
    classMarca:"class-marca-sportrack",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/sportrack/1.jpg" },
      { codigoCarrucel: 2, srcImage: "/marcas/sportrack/2.jpg" },
    ],
    lstBannerPromocion: [
      {
        codigoBanner: 1,
        descripcion: "banner promocion 1",
        srcImage: "/marcas/sportrack/promocion/1.png",
      },
      {
        codigoBanner: 2,
        descripcion: "banner promocion 2",
        srcImage: "/marcas/sportrack/promocion/2.png",
      },
      {
        codigoBanner: 3,
        descripcion: "banner promocion 3",
        srcImage: "/marcas/sportrack/promocion/3.png",
      },
      {
        codigoBanner: 4,
        descripcion: "banner promocion 4",
        srcImage: "/marcas/sportrack/promocion/4.png",
      },
    ],
  },
  {
    codigoMarca: 5,
    decripcion: "SPARCO",
    srcImage: "/marcas/sparco.jpg",
    chrcodigofamilia: "110E",
    classMarca:"class-marca-sparco",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/sparco/1.jpg" },
      { codigoCarrucel: 2, srcImage: "/marcas/sparco/2.jpg" },
      { codigoCarrucel: 3, srcImage: "/marcas/sparco/3.jpg" },
      { codigoCarrucel: 4, srcImage: "/marcas/sparco/4.jpg" },
    ],
    lstBannerPromocion: [
      {
        codigoBanner: 1,
        descripcion: "banner promocion 1",
        srcImage: "/marcas/sparco/promocion/1.png",
      },
      {
        codigoBanner: 2,
        descripcion: "banner promocion 2",
        srcImage: "/marcas/sparco/promocion/2.png",
      },
      {
        codigoBanner: 3,
        descripcion: "banner promocion 3",
        srcImage: "/marcas/sparco/promocion/3.png",
      },
      {
        codigoBanner: 4,
        descripcion: "banner promocion 4",
        srcImage: "/marcas/sparco/promocion/4.png",
      },
    ],
  },
  
 
  {
    codigoMarca: 2,
    decripcion: "ECCO",
    srcImage: "/marcas/ecco.jpg",
    chrcodigofamilia: "110I",
    classMarca:"class-marca-ecco",
    lstCarrucel: [{ codigoCarrucel: 1, srcImage: "/marcas/ecco/1.jpg" }],
    lstBannerPromocion: [],
  },
];

const FilterProducto = {
  FILTER_ALL: "FILTER_ALL",
  FILTER_CODIGO: "FILTER_CODIGO",
  FILTER_DESTACADO: "FILTER_DESTACADO",
  FILTER_DESTACADO_MARCA: "FILTER_DESTACADO_MARCA",
  FILTER_RECOMENDADO: "FILTER_RECOMENDADO",
  FILTER_OFERTA: "FILTER_OFERTA",
  FILTER_REMATE: "FILTER_REMATE",
  FILTER_ALL_FIND: "FILTER_ALL_FIND",
  FILTER_SEARCH: "FILTER_SEARCH",
};
const FilterSubFamilia = {
  FILTER_SUBFAMILIA_ALL: "FILTER_SUBFAMILIA_ALL",
  FILTER_SUBFAMILIA_LIST: "FILTER_SUBFAMILIA_LIST",
};
const filterOrder = {
  FilterDescDescripcion: "FilterDescDescripcion",
  FilterAscDescripcion: "FilterAscDescripcion",
  FilterDescPrecio: "FilterDescPrecio",
  FilterAscPrecio:'FilterAscPrecio',
  FilterConImagen:'FilterConImagen',
};
const nav_banner={
  /* 1:Se visualizara 0:No se mostrara */
  status:1,
  text:"Página en Modo de Prueba. Próximamente estará habilitada al 100%"
}
const tipoDireccion={
  DESPACHO:"Dirección de Despacho",
  FACTURACION:"Dirección de Facturación"
};
export {
  SUCCESS_SERVER,
  HttpStatus,
  LOGGIN,
  UbigeoTipo,
  TipoDocumento,
  CRUD,
  PAGE,
  lstMarcas,
  Moneda,
  localStoreEnum,
  statusSyncCotizacion,
  tipoActualizacionCotizacionDetalle,
  InfoCondicionCompra,
  PagoMenu,
  MetodoEnvio,
  statusMetodoEnvio,
  displayLista,
  FilterProducto,
  FilterSubFamilia,
  filterOrder,nav_banner,
  tipoDireccion
};

