/* eslint-disable jsx-a11y/anchor-has-content */
import { useHistory } from "react-router-dom";
import { FilterProducto, HttpStatus, localStoreEnum, Moneda, SUCCESS_SERVER, tipoActualizacionCotizacionDetalle } from "../service/ENUM";
import { Modal } from "react-bootstrap";
import { useReducer } from "react";
import { findProductos } from "../service/producto.service";
import { Carousel } from "react-responsive-carousel";
import {
  registrarCotizacion,
  registrarCotizacionDetalle,
} from "../service/cotizacion.service";
import { handleSyncDatosCotizacion } from "../service/general";
import ServerException from "../utils/serverException";
export default function ProductosCard(props) {
  let history = useHistory();



  let producto = {
    chrCodigoProducto: props.producto.chrCodigoProducto,
    numValorVentaDolar: props.producto.numValorVentaDolar,
    numValorVentaSoles: props.producto.numValorVentaSoles,
    numCodigoMoneda: props.producto.numCodigoMoneda,
    vchDescripcion: props.producto.vchDescripcion,
    vchDescripcionSmall: props.producto.vchDescripcionSmall,
    numStock: props.producto.numStock,
    moneda: props.moneda,
    familia: {
      chrCodigoFamilia: props.producto.familia.chrCodigoFamilia,
      vchDescripcion: props.producto.familia.vchDescripcion,
    },
    /*Url de la imagen a mostrar en la lista de productos */
    imagenDefault: {
      numCodigoProductoIimagen:
        props.producto.imagenDefault.numCodigoProductoIimagen,
      chrCodigoProducto: props.producto.imagenDefault.chrCodigoProducto,
      chrSrcImagen: props.producto.imagenDefault.chrSrcImagen,
      //chrSrcImagen: window.location.origin + "/marcas/producto.jpg",
      chrNombre: props.producto.imagenDefault.chrNombre,
      chrType: props.producto.imagenDefault.chrType,
    },
    listaProductoImagen: props.producto.listaProductoImagen,
  };
  let shareFacebook='https://www.facebook.com/sharer/sharer.php?u=https://subaruparts.eanet.pe/subaruparts/detalle/'+producto.familia.chrCodigoFamilia+'/'+producto.familia.vchDescripcion+'/'+producto.chrCodigoProducto+'&quote='+producto.vchDescripcion;
  let shareTwitter='https://twitter.com/intent/tweet?url=https://subaruparts.eanet.pe/subaruparts/detalle/'+producto.familia.chrCodigoFamilia+'/'+producto.familia.vchDescripcion+'/'+producto.chrCodigoProducto+'&text='+producto.vchDescripcion;

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
    listaProductoImagen: [],
    producto: producto,
    cotizacionResumen: cotizacionResumen,
    showModal: false,
    showModalResumen: false,
    mensajeStock: '',
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });

  function handleEventShowDetalle() {
    history.push(
      "/detalle/" +
      producto.familia.chrCodigoFamilia +
      "/" +
      producto.familia.vchDescripcion +
      "/" +
      producto.chrCodigoProducto
    );
  }
  async function handleEventModal(_status) {
    dispatch({type: actionType.PRODUCTO,producto:producto});
    let _listaProductoImagen = [];
    const rpt = await findProductos({
      chrCodigoFamilia: null,
      vchDescripcion: null,
      chrCodigoProducto: producto.chrCodigoProducto,
      filterProducto: FilterProducto.FILTER_CODIGO,
      pagina: 1,
      limit: 1,
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaProductos.length; index++) {
          let e = json.listaProductos[index];
          /*Lista de imagenes del producto */
          for (let i = 0; i < e.listaProductoImagen.length; i++) {
            let obj = e.listaProductoImagen[i];
            _listaProductoImagen.push(
              <img className="detalle-img" key={obj.numCodigoProductoImagen}
                src={"data:image/png;base64," + obj.chrSrcImagen}
                alt={obj.chrNombre}
              ></img>
            );
          }
        }
      }
    }
   console.log(state.producto)
    dispatch({ type: actionType.SET_IMAGEN, showModal: _status, listaProductoImagen: _listaProductoImagen });
  }
  async function handleEventClieckregistrarCotizacion() {
   if(state.cantidad <= state.producto.numStock){ 
    let cotizacion = handleSyncDatosCotizacion();
    console.log(cotizacion);
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
              type: actionType.SHOW_RESUMEN,
              showModalResumen: true,
              showModal: false,
              cotizacionResumen: cotizacionResumen,
            });
          }
          if (
            jsonDetalle.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO
          ) {
            
            dispatch({
              type: actionType.SETMENSAJE,
              showModal:false,
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
      type: actionType.CANTIDAD_STOCK,       
      mensajeStock: "Disculpe las molestias, el stock disponible para este producto es de " +  state.producto.numStock + " unidades."
    })
  }
  };
  function handleEventGoCaja() {
    history.push("/carrito");
  }
  async function handleEventCloseModal(_status) {
    dispatch({
      type: actionType.SET_SHOW_RESUMEN,
      showModalResumen:false
    });
    
  }
  return (
    <>
      <div className="producto-card">
        <div className="producto-card-img">
          <img
            src={"data:image/png;base64," + producto.imagenDefault.chrSrcImagen}
            onClick={handleEventShowDetalle}
            alt={producto.vchDescripcion}
          ></img>

          <div
            className="producto-card-vista"
            onClick={() => handleEventModal(true)}
          >
            <i className="fa fa-search" aria-hidden="true"></i>
            <span>Vista Previa</span>
          </div>
        </div>

        <div className="producto-card-text">
          <div
            className="producto-card-nombre"
            onClick={handleEventShowDetalle}
          >
            <span>{props.producto.vchDescripcion}</span>
          </div>
          <div className="producto-card-stock">
            Stock Disponible:&nbsp;{props.producto.numStock}
          </div>
          <div className="producto-card-precio">
            <span>{producto.moneda.codigoIso4217} </span>
            <span>
              {producto.moneda.numCodigoMoneda ===
              Moneda.DOLARES.numCodigoMoneda
                ? producto.numValorVentaDolar
                : producto.numValorVentaSoles}{" "}
            </span>
          </div>
        </div>
      </div>
      <Modal
        className="modal-direccion"
        show={state.showModal}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onHide={() => handleEventModal(false)}
        ></Modal.Header>
        <Modal.Body>
          <div className="producto-card-modal">
            <div className="producto-card-modal-column1">
              <div className="producto-card-carrousel">
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
                  {state.listaProductoImagen}
                </Carousel>
              </div>
            </div>
            <div className="producto-card-modal-column2">
              <span className="producto-card-modal-nombre">
                {producto.vchDescripcion}
              </span>
              <span className="producto-card-modal-precio">
                {" "}
                {producto.moneda.vchSimbolo}{" "}
                {producto.moneda.numCodigoMoneda ===
                Moneda.DOLARES.numCodigoMoneda
                  ? producto.numValorVentaDolar
                  : producto.numValorVentaSoles}{" "}
              </span>
              <span className="producto-card-modal-cantidad">Cantidad</span>
              <div className="producto-card-modal-accion">
                <input
                  type="number"
                  className="form-control"
                  value={state.cantidad}
                  min={1}
                  onChange={(e) =>
                    dispatch({
                      type: actionType.SET_CANTIDAD,
                      cantidad: e.target.value,
                    })
                  }
                ></input>
                <button
                  className="btn btn-primary"
                  onClick={handleEventClieckregistrarCotizacion}
                >
                  <i className="fa fa-shopping-cart"></i>
                  Añadir al Carrito
                </button>
              </div>

              {state.mensajeStock === "" ? (
                ""
              ) : (
                <span className="producto-mensaje-stock">
                  {state.mensajeStock}
                </span>
              )}
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <hr></hr>
          <div>
            <span>Compartir</span>
            <a
              className="btn btn-social fa fa-facebook"
              href={shareFacebook}
              target="noreferrer"
            ></a>
            <a
              className="btn btn-social fa fa-twitter"
              href={shareTwitter}
              target="noreferrer"
            ></a>
          </div>
        </Modal.Footer>
      </Modal>

      <Modal
        className="modal-direccion"
        show={state.showModalResumen}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={() => handleEventCloseModal(false)}>
          <Modal.Title id="contained-modal-title-vcenter">
            <i className="fa fa-check fa-producto-detalle"></i> Producto añadido
            correctamente a su carrito de compra
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-body-modal">
            <div className="producto-det-col1-data">
              <img
                src={
                  "data:image/png;base64," +
                  state.producto.imagenDefault.chrSrcImagen
                }
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
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.vchSimbolo
                    : Moneda.SOLES.vchSimbolo}{" "}
                </span>
                <span>
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? state.producto.numValorVentaDolar
                    : state.producto.numValorVentaSoles}
                </span>
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
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.vchSimbolo
                    : Moneda.SOLES.vchSimbolo}{" "}
                </span>
                <span>
                  {" "}
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numSubTotalDol
                    : state.cotizacionResumen.numSubTotalSol}
                </span>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Igv:</label>
                <span>
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.vchSimbolo
                    : Moneda.SOLES.vchSimbolo}{" "}
                </span>
                <span>
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numIgvDol
                    : state.cotizacionResumen.numIgvSol}
                </span>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Envío:</label>
                <span>
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.vchSimbolo
                    : Moneda.SOLES.vchSimbolo}{" "}
                </span>
                <span>{"00.00"}</span>
              </div>
              <div className="producto-det-data-item">
                <label className="label-item">Total:</label>
                <span>
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? Moneda.DOLARES.vchSimbolo
                    : Moneda.SOLES.vchSimbolo}{" "}
                </span>
                <span>
                  {producto.moneda.numCodigoMoneda ===
                  Moneda.DOLARES.numCodigoMoneda
                    ? state.cotizacionResumen.numTotalDol
                    : state.cotizacionResumen.numTotalSol}
                </span>
              </div>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            className="btn btn-secondary"
            onClick={() => handleEventCloseModal(false)}
          >
            CONTINUAR COMPRANDO
          </button>
          <button className="btn btn-primary" onClick={handleEventGoCaja}>
            <i className="fa fa-check"></i>
            PASAR POR CAJA
          </button>
        </Modal.Footer>
      </Modal>
      <ServerException server={state.server}></ServerException>
    </>
  );
}
let actionType = {

  SET_CANTIDAD: "SET_CANTIDAD",
  ERROR: "ERROR",
  SHOW: "SHOW",
  SET_IMAGEN: "SET_IMAGEN",
  SHOW_RESUMEN:"SHOW_RESUMEN",
  SET_SHOW_RESUMEN:"SET_SHOW_RESUMEN",
  PRODUCTO:"PRODUCTO",
  CANTIDAD_STOCK:'CANTIDAD_STOCK',
  SETMENSAJE:"SETMENSAJE"
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.CANTIDAD_STOCK:
      return {
        ...state,        
        mensajeStock: action.mensajeStock
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
      case actionType.SETMENSAJE:
        return {
          ...state,
          showModal:action.showModal,
          server: action.server,
        };
      
    case actionType.SET_CANTIDAD:
      return {
        ...state,
        cantidad: action.cantidad,
      };
    case actionType.SHOW_RESUMEN:
      return {
        ...state,
        showModal: action.showModal,
        showModalResumen: action.showModalResumen,
        cotizacionResumen: action.cotizacionResumen,
      };
      case actionType.SET_SHOW_RESUMEN:
        return {
          ...state,
          showModalResumen: action.showModalResumen,           
        };
        case actionType.PRODUCTO:
          return {
            ...state,
            producto: action.producto,           
          };  
    case actionType.SET_IMAGEN:
      return {
        ...state,
        listaProductoImagen: action.listaProductoImagen,
        showModal: action.showModal,
      };
    default:
      return state;
  }
};