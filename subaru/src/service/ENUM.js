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
  SUCCES_SERVER_EXPIRE: "SUCCES_SERVER_EXPIRE" /*Validacion de token */,
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
/*una moneda diferente se */
const InfoCondicionCompra = {
  EMISION: (
    <p>
      <i className="fa fa-shield fa-black" aria-hidden="true"></i>Emitimos
      facturas en dólares. Si paga en soles se realizará la conversión a USD
      según el tipo de cambio indicado en la parte superior de la página.
    </p>
  ),
  TRANSPORTE: (
    <p>
      <i className="fa fa-truck fa-black" aria-hidden="true"></i>Envíos en los
      siguientes 5 días; verifica que su calle no se encuentre en las zonas
      peligrosas las cuales se detallan en el siguiente link{" "}
      <a href=" https://chazki.com/zonaspeligrosas" target={"_blank"}>
        https://chazki.com/zonaspeligrosas
      </a>
      .
    </p>
  ),
  DEVOLUCIONES: (
    <p>
      <i className="fa fa-exchange fa-black" aria-hidden="true"></i>No se
      aceptan devoluciones.
    </p>
  ) /* a menos que el producto tenga falla de fábrica */,
  STOCK: (
    <p>
      <i>
        <svg
          aria-hidden="true"
          focusable="false"
          data-prefix="fas"
          data-icon="box-open"
          className="svg-inline--fa fa-box-open fa-w-20 fa-black"
          role="img"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 640 512"
        >
          <path
            fill="currentColor"
            d="M425.7 256c-16.9 0-32.8-9-41.4-23.4L320 126l-64.2 106.6c-8.7 14.5-24.6 23.5-41.5 23.5-4.5 0-9-.6-13.3-1.9L64 215v178c0 14.7 10 27.5 24.2 31l216.2 54.1c10.2 2.5 20.9 2.5 31 0L551.8 424c14.2-3.6 24.2-16.4 24.2-31V215l-137 39.1c-4.3 1.3-8.8 1.9-13.3 1.9zm212.6-112.2L586.8 41c-3.1-6.2-9.8-9.8-16.7-8.9L320 64l91.7 152.1c3.8 6.3 11.4 9.3 18.5 7.3l197.9-56.5c9.9-2.9 14.7-13.9 10.2-23.1zM53.2 41L1.7 143.8c-4.6 9.2.3 20.2 10.1 23l197.9 56.5c7.1 2 14.7-1 18.5-7.3L320 64 69.8 32.1c-6.9-.8-13.5 2.7-16.6 8.9z"
          ></path>
        </svg>
      </i>
    
        Mientras procesamos su pedido y/o compra, es posible que el stock
        publicado en nuestra página se puede agotar, de ser así la operación
        será cancelada. Cuando ocurra esto y la transacción se efectuó, a su
        solicitud nos comprometemos a emitir una Nota de crédito para que Ud.
        pueda utilizarlo en compras futuras o realizar el extorno del dinero a
        su Tarjeta del Banco.
         <br></br>
      
        Si alguno de los productos seleccionados por Ud. está en promoción
        (Outlet) tenga presente que esta Campaña tiene un número muy limitado de
        productos en stock y un tiempo determinado de vigencia.
        <br></br>
      Se da por entendido que reconoce y acepta estar debidamente informado de
      los alcances y limitaciones de las transacciones que realice por nuestro
      portal de comercio electrónico, no existiendo lugar a reclamo si las
      condiciones descritas se presentan durante el procesamiento de su compra.
     
    </p>
  ),
};
/* Secuencia de pago */ /*De ocurrir*/
const PagoMenu = {
  PERSONALES: { index: 1 },
  ENVIO: { index: 2 },
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
    descripcion: "Recojo en Tienda",
    direccion: "Av. Republica de Panama 4259",
    //direccion: "Próximamente habilitada",
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
    codigoMarca: 1,
    decripcion: "Subaru",
    srcImage: "/marcas/bosch.jpg",
    chrcodigofamilia: "110A",
    classMarca: "class-marca-subaru",
    lstCarrucel: [
      { codigoCarrucel: 1, srcImage: "/marcas/subaru/1.png", srcImageMobile: "/marcas/subaru/1-M.png" ,style:{objectFit:'fill'}},
      { codigoCarrucel: 2, srcImage: "/marcas/subaru/2.png", srcImageMobile: "/marcas/subaru/2-M.png"  ,style:{objectFit:'fill'}},
      { codigoCarrucel: 3, srcImage: "/marcas/subaru/3.png", srcImageMobile: "/marcas/subaru/3-M.png" ,style:{objectFit:'cover'} },
      { codigoCarrucel: 4, srcImage: "/marcas/subaru/4.png", srcImageMobile: "/marcas/subaru/4-M.png"  ,style:{objectFit:'cover'}},
    ],
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
  FilterAscPrecio: "FilterAscPrecio",
  FilterConImagen: "FilterConImagen",
  FilterOutlet: "FilterOutlet",
};
//const FilterTypeLista={FilterNormal:"FilterNormal",FilterQuery:"FilterQuery"};
const nav_banner = {
  /* 1:Se visualizara 0:No se mostrara */
  status: 1,
  text: "En Modo de Prueba, Próximamente estará habilitada",
};
const tipoDireccion = {
  DESPACHO: "Dirección de Despacho",
  FACTURACION: "Dirección de Facturación",
};
const homepage = undefined;
const chrRol = {
  ROLE_USER: "ROLE_USER",
  ROLE_ADMIN: "ROLE_ADMIN",
  ROLE_ANONIMO: "ROLE_ANONIMO",
};
const FilterCorreo = {
  FILTER_ALL: "FILTER_ALL",
  FILTER_DESTINO_OC: "FILTER_DESTINO_OC",
  FILTER_TIPO_CAMBIO_REGISTRO: "FILTER_TIPO_CAMBIO_REGISTRO",
  FILTER_TIPO_CAMBIO_TOMADO: "FILTER_TIPO_CAMBIO_TOMADO",
};
const Empresa = {
  ruc: "20601356024",
  razonSocial:
    "CORPORACION DE EMPRESAS AUTOMOTRICES SOCIEDAD ANONIMA CERRADA - EA CORP S.A.C",
  nombreComercial: "Ea Corp. Sac",
  urlTienda: "https://subaruparts.eanet.pe/subaruparts/shop",
  direccion: "Av. Republica de Panama Nro. 4259",
  correo: "repuestos.subaru@eacorp.pe",
  abreviaturaSucursal: "RP4259",
};
const TypePresentacion={
  TypeOferta:"TypeOferta",TypeDestacadoMarca:"TypeDestacadoMarca",TypeDefault:"TypeDefault"
}

const APP_DEV= {
    CONTEXT:"PRODUCCION",//PRODUCCION -- DESARROLLO,DESARROLLODEV,
     
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
  filterOrder,
  nav_banner,
  tipoDireccion,
  homepage,
  chrRol,
  FilterCorreo,
  Empresa,
 
  //FilterTypeLista,
  APP_DEV,
  TypePresentacion
  
};
