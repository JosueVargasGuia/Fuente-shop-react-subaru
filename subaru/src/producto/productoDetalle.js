import { useEffect, useReducer } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "../filterMarcas/filterMarcas.css";
import { useParams, Link, useHistory } from "react-router-dom";



import {
  HttpStatus,
  localStoreEnum,
  Moneda,
  SUCCESS_SERVER,
  tipoActualizacionCotizacionDetalle,
  InfoCondicionCompra,
  FilterProducto,
} from "../service/ENUM";
import { findProductos } from "../service/producto.service";
import {
  registrarCotizacion,
  registrarCotizacionDetalle,
} from "../service/cotizacion.service";
import { handleSyncDatosCotizacion } from "../service/general";
import { Modal } from "react-bootstrap";

export default function ProductoDetalle(props) {
  let history = useHistory();
  const producto = {
    chrCodigoProducto: "",
    numValorVentaDolar: "",
    numValorVentaSoles: "",
    numCodigoMoneda: props.moneda.numCodigoMoneda,
    vchDescripcion: "",
    vchDescripcionSmall: "",
    numStock: 0,
    familia: {
      chrCodigoFamilia: "",
      vchDescripcion: "",
    },
    /*Url de la imagen a mostrar en la lista de productos */
    imagenDefault: {
      numCodigoProductoIimagen: "",
      chrCodigoProducto: "",
      chrSrcImagen: "",
      chrNombre: "",
      chrType: "",
    },
    listaProductoImagen: [],
    listaProductoDetalle: [],
  };
  const cotizacionResumen = {
    totalRegistros: 0,
    numSubTotalDol: 0,
    numIgvDol: 0,
    numEnvioDol: 0,
    numTotalDol: 0,

    numSubTotalSol: 0,
    numIgvSol: 0,
    numEnvioSol: 0,
    numTotalSol: 0,
    cantidadDetalleSeleccionado: 0,
  };
  const [state, dispatch] = useReducer(reducer, {
    cantidad: 1,
    producto: producto,
    cotizacionResumen: cotizacionResumen,
    showModal: false,
    mensajeStock: '',
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  async function handleServicioBuscarProductos(chrCodigoProducto) {
    const rpt = await findProductos({
      chrCodigoFamilia: null,
      vchDescripcion: null,
      chrCodigoProducto: chrCodigoProducto,
      filterProducto: FilterProducto.FILTER_CODIGO,
      pagina: 1,
      limit: 1,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaProductos.length; index++) {
          let e = json.listaProductos[index];
          let _listaProductoImagen = [];
          /*Lista de imagenes del producto */
          for (let i = 0; i < e.listaProductoImagen.length; i++) {
            let obj = e.listaProductoImagen[i];
            /* {
              numCodigoProductoIimagen: obj.numCodigoProductoIimagen,
              chrCodigoProducto: obj.chrCodigoProducto,
              chrSrcImagen: obj.chrSrcImagen,
              chrNombre: obj.chrNombre,
              chrType: obj.chrType,
            }*/
            _listaProductoImagen.push(
              <img className="detalle-img" key={i}
                src={"data:image/png;base64," + obj.chrSrcImagen}
                alt={obj.chrNombre}
              ></img>

            );
          }
          /*Lista de detalles del producto */
          let _listaProductoDetalle = [];

          for (let i = 0; i < e.listaProductoDetalle.length; i++) {
            let objDet = e.listaProductoDetalle[i];
            if (objDet.rowTipo === 1) {
              _listaProductoDetalle.push(
                <div className="detalle" key={i}>
                  <div className="desc-label">{objDet.titulo}</div>
                  <div className="desc-value">{objDet.descripcion}</div>
                </div>
              );
            };
          }
          /*Ficha Tecnica */
          _listaProductoDetalle.push(
            <div className="detalle" key={'-1'}>
              &nbsp;
            </div>
          );
          _listaProductoDetalle.push(
            <div className="detalle" key={'-2'}>
              <div className="desc-label">Ficha técnica</div>
              <div className="desc-value"> </div>
            </div>
          );
          for (let i = 0; i < e.listaProductoDetalle.length; i++) {
            let objDet = e.listaProductoDetalle[i];
            if (objDet.rowTipo === 0) {
              _listaProductoDetalle.push(
                <div className="detalle" key={i}>
                  <div className="desc-label desc-row-ref">{objDet.titulo}</div>
                  <div className="desc-value desc-row-ref">{objDet.descripcion}</div>
                </div>
              );
            };
          }
          producto.chrCodigoProducto = e.chrCodigoProducto;
          producto.numValorVentaDolar = e.numValorVentaDolar;
          producto.numValorVentaSoles = e.numValorVentaSoles;
          producto.numCodigoMoneda = props.moneda.numCodigoMoneda;
          producto.vchDescripcion = e.vchDescripcion;
          producto.vchDescripcionSmall = e.vchDescripcionSmall;
          producto.numStock = e.numStock;
          producto.familia.chrCodigoFamilia = e.familia.chrCodigoFamilia;
          producto.familia.vchDescripcion = e.familia.vchDescripcion;
          /*Url de la imagen a mostrar en la lista de productos */
          producto.imagenDefault.numCodigoProductoIimagen =
            e.imagenDefault.numCodigoProductoIimagen;
          producto.imagenDefault.chrCodigoProducto =
            e.imagenDefault.chrCodigoProducto;
          producto.imagenDefault.chrSrcImagen =
            "data:image/png;base64," + e.imagenDefault.chrSrcImagen;
          producto.imagenDefault.chrNombre = e.imagenDefault.chrNombre;
          producto.imagenDefault.chrType = e.imagenDefault.chrType;
          producto.listaProductoImagen = _listaProductoImagen;
          producto.listaProductoDetalle = _listaProductoDetalle;
        }
        console.log(producto);
        dispatch({
          type: actionType.LOAD_PRODUCTOS,
          producto: producto,
          server: {
            error: "",
            success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT,
          },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.LOAD_PRODUCTOS,
          producto: producto,
          server: {
            error: json.response.error,
            success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.LOAD_PRODUCTOS,
        producto: producto,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }
  //eslint-disable-next-line
  let params = useParams();
  let _chrCodigoFamilia = params.chrCodigoFamilia;
  let _chrCodigoProducto = params.chrCodigoProducto;
  //eslint-disable-next-line
  useEffect(() => {
    //eslint-disable-next-line
    props.eventSelectMarca(_chrCodigoFamilia);
    //eslint-disable-next-line
    console.log("useEffect[ProductoDetalle] ProductoDetalle");
    //eslint-disable-next-line
  }, []);
  useEffect(() => {
    //eslint-disable-next-line
    handleServicioBuscarProductos(_chrCodigoProducto);
    //eslint-disable-next-line
    console.log("useEffect[ProductoDetalle] handleServicioBuscarProductos");
    //eslint-disable-next-line
  }, [props.moneda.numCodigoMoneda]);

  const handleEventClickregistrarCotizacion = async () => {

    if (state.cantidad <= state.producto.numStock) {



      let cotizacion = handleSyncDatosCotizacion();
      const rpt = await registrarCotizacion(cotizacion);
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          cotizacion.numCodigoCotizacionOnline = json.numCodigoCotizacionOnline;
          cotizacion.numCodigoCliente = json.numCodigoCliente;
          cotizacion.numCodigoClienteUsuario = json.numCodigoClienteUsuario;
          localStorage.setItem(
            localStoreEnum.COTIZACION,
            JSON.stringify(cotizacion)
          );
          /*Registro de cotizacion detalle */
          let cotizacionDetalleRequest = {
            numCodigoCotizacionOnline: cotizacion.numCodigoCotizacionOnline,
            producto: { chrCodigoProducto: state.producto.chrCodigoProducto },
            numCantidad: state.cantidad,
            tipoActualizacionCotizacionDetalle:
              tipoActualizacionCotizacionDetalle.ADICIONAR,
          };
          const rptDetalle = await registrarCotizacionDetalle(
            cotizacionDetalleRequest
          );
          if (rptDetalle.status === HttpStatus.HttpStatus_OK) {
            const jsonDetalle = await rptDetalle.json();
            if (jsonDetalle.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
              console.log(jsonDetalle);
              cotizacionResumen.numSubTotalDol = jsonDetalle.numSubTotalDol;
              cotizacionResumen.numIgvDol = jsonDetalle.numIgvDol;
              cotizacionResumen.numEnvioDol = jsonDetalle.numEnvioDol;
              cotizacionResumen.numTotalDol = jsonDetalle.numTotalDol;
              cotizacionResumen.numSubTotalSol = jsonDetalle.numSubTotalSol;
              cotizacionResumen.numIgvSol = jsonDetalle.numIgvSol;
              cotizacionResumen.numEnvioSol = jsonDetalle.numEnvioSol;
              cotizacionResumen.numTotalSol = jsonDetalle.numTotalSol;
              cotizacionResumen.totalRegistros = jsonDetalle.totalRegistros;
              cotizacionResumen.cantidadDetalleSeleccionado =
                jsonDetalle.cantidadDetalleSeleccionado;
              dispatch({
                type: actionType.SHOW,
                showModal: true,
                cotizacionResumen: cotizacionResumen,
              });
            }
            if (
              jsonDetalle.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO
            ) {
              dispatch({
                type: actionType.ERROR,
                server: {
                  error: jsonDetalle.response.error,
                  success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
                },
              });
            }
          } else {
            dispatch({
              type: actionType.ERROR,
              server: {
                error: "",
                success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
              },
            });
          }
          /*Registro de cotizacion detalle */
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: {
              error: json.response.error,
              success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
            },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: {
            error: "",
            success: SUCCESS_SERVER.SUCCES_SERVER_ERROR,
          },
        });
      }
    } else {
      dispatch({
        type: actionType.SET_CANTIDAD_STOCK,
        cantidad: state.producto.numStock,
        mensajeStock: "Disculpe las molestias, el stock disponible para este producto es de " + state.producto.numStock + " unidades."
      })

    }
  };
  function handleEventCloseModal() {
    dispatch({
      type: actionType.SHOW,
      cotizacionResumen: cotizacionResumen,
      showModal: false,
    });
    window.location.reload();
  }
  function handleEventGoCaja() {
    history.push("/carrito");
  }
  //const tooglesGroupId = 'Toggles';
  //const valuesGroupId = 'Values';

  return (
    <div className="producto-det">
      <div className="producto-det-link">
        <Link to={"/shop?descripcion=" + state.producto.familia.vchDescripcion}>Inicio</Link>
        <span className="producto-det-link-span">/</span>
        <span className="producto-det-link-nombre">
          {state.producto.vchDescripcion}
        </span>
      </div>
      <div className="producto-det-row">
        <div className="producto-det-row1 ">
          <div className="prod-det-carrousel">

            <Carousel
              showArrows={false}
              showStatus={false}
              showIndicators={false}
              showThumbs={true}
              autoPlay={false}
              infiniteLoop={false}
              stopOnHover={true}
              swipeable={true}
              dynamicHeight={false}
              emulateTouch={true}
              autoFocus={true}
              thumbWidth={75}
              selectedItem={0}
            >
              {
                state.producto.listaProductoImagen
              }

            </Carousel>
          </div>
        </div>
        <div className="producto-det-row2">
          <div className="producto-det-row2-nombre">
            <span>{state.producto.vchDescripcion}</span>
          </div>
          <div className="producto-det-row2-precio">
            <span>
              {state.producto.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                ? Moneda.DOLARES.codigoIso4217
                : Moneda.SOLES.codigoIso4217}
            </span>
            <span>
              {state.producto.numCodigoMoneda === Moneda.DOLARES.numCodigoMoneda
                ? state.producto.numValorVentaDolar
                : state.producto.numValorVentaSoles}
            </span>
          </div>
          <div className="producto-det-row2-shop">
            <span>Cantidad {state.producto.numStock}</span>
            <div className="producto-det-row2-shop-div">
              <input
                type="number"
                className="form-control"
                value={state.cantidad}
                min={1}
                max={state.producto.numStock}
                onChange={(e) =>
                  dispatch({
                    type: actionType.SET_CANTIDAD,
                    cantidad: e.target.value,
                  })
                }
              ></input>
              <button
                className="btn btn-primary"
                onClick={handleEventClickregistrarCotizacion}
              >
                <i className="fa fa-shopping-cart"></i>
                Añadir al Carrito
              </button>
            </div>
            {state.mensajeStock===''?'':<span className='producto-mensaje-stock'>{state.mensajeStock}</span>}             
          </div>
          <div className="producto-det-row2-social">Compartir</div>
          <div className="producto-det-row2-info">
            <i className="fa fa-shield-p"></i>
            {InfoCondicionCompra.EMISION}
          </div>
          <div className="producto-det-row2-info">
            <i className="fa fa-truck" aria-hidden="true"></i>
            {InfoCondicionCompra.TRANSPORTE}
          </div>
          <div className="producto-det-row2-info">
            <i className="fa fa-exchange" aria-hidden="true"></i>
            {InfoCondicionCompra.DEVOLUCIONES}
          </div>
          <div className="producto-det-row2-det">
            <div className="titulo"><span>Detalles del producto</span><div></div></div>
            {state.producto.listaProductoDetalle}
          </div>
        </div>
      </div>
      {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_INFO ? (
        <div>
          <br />
          <span className="alert alert-warning" role="alert">
            {state.server.error}
          </span>
        </div>
      ) : (
        ""
      )}
      {state.server.success === SUCCESS_SERVER.SUCCES_SERVER_ERROR ? (
        <div>
          <br />
          <span className="alert alert-danger" role="alert">
            Lo sentimos el recurso no esta disponible, estamos trabajando para
            solucionar el inconveniente.
          </span>
        </div>
      ) : (
        ""
      )}

      <Modal
        className="modal-direccion"
        show={state.showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={handleEventCloseModal}>
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="fa fa-check fa-producto-detalle"></i> Producto añadido
            correctamente a su carrito de compra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-body-modal">
            <div className="producto-det-col1-data">
              <img
                src={state.producto.imagenDefault.chrSrcImagen}
                alt={state.producto.vchDescripcion}
              ></img>
            </div>
            <div className="producto-det-col2-data">
              <div className="producto-det-data-item">
                <span className="label-item-desc">
                  {state.producto.vchDescripcion}
                </span>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Precio:</label>
                <span>
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}{" "}
                </span>
                <label className="label-moneda">
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.producto.numValorVentaDolar
                    : state.producto.numValorVentaSoles}
                </label>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Cantidad:</label>
                <span>
                  {state.cotizacionResumen.cantidadDetalleSeleccionado}
                </span>
              </div>
              <div className="producto-det-data-item">
                <span className="label-item-total">
                  Hay {state.cotizacionResumen.totalRegistros} artículos en su
                  carrito.
                </span>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Subtotal:</label>
                <span>
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}{" "}
                </span>
                <label className="label-moneda">

                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numSubTotalDol
                    : state.cotizacionResumen.numSubTotalSol}
                </label>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Igv:</label>
                <span>
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}{" "}
                </span>
                <label className="label-moneda">
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numIgvDol
                    : state.cotizacionResumen.numIgvSol}
                </label>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Envío:</label>
                <span>
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}{" "}
                </span>
                <label className="label-moneda">{"00.00"}</label>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Total:</label>
                <span>
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.codigoIso4217
                    : Moneda.SOLES.codigoIso4217}{" "}
                </span>
                <label className="label-moneda" >
                  {state.producto.numCodigoMoneda ===
                    Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numTotalDol
                    : state.cotizacionResumen.numTotalSol}
                </label>
              </div>
            </div>
            <div className="producto-det-col3-data"></div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleEventCloseModal}>
            CONTINUAR COMPRANDO
          </button>
          <button className="btn btn-primary" onClick={handleEventGoCaja}>
            <i className="fa fa-check"></i>
            PASAR POR CAJA
          </button>

        </Modal.Footer>
      </Modal>
    </div>
  );
}

let actionType = {
  LOAD_PRODUCTOS: "LOAD_PRODUCTOS",
  SET_CANTIDAD: "SET_CANTIDAD",
  SET_CANTIDAD_STOCK: "SET_CANTIDAD_STOCK",
  ERROR: "ERROR",
  SHOW: "SHOW",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.LOAD_PRODUCTOS:
      return {
        ...state,
        producto: action.producto,
        server: action.server,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.SET_CANTIDAD:
      return {
        ...state,
        cantidad: action.cantidad,
      };
    case actionType.SET_CANTIDAD_STOCK:
      return {
        ...state,
        cantidad: action.cantidad,
        mensajeStock: action.mensajeStock
      };
    case actionType.SHOW:
      return {
        ...state,
        showModal: action.showModal,
        cotizacionResumen: action.cotizacionResumen,
      };
    default:
      return state;
  }
};
