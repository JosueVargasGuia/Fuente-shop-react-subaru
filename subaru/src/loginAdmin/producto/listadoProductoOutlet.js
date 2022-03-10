import React, { useEffect, useReducer } from "react";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import { chrRol, CRUD, HttpStatus, localStoreEnum, LOGGIN, SUCCESS_SERVER } from "../../service/ENUM";
import { obtenerCliente } from "../../service/loginCliente.service";
import { listarProductoOutletVigencia, saveProductoOutletVigencia } from "../../service/producto.service";
import ServerException from "../../utils/serverException";
import DatePicker from "react-datepicker";
let actionType = {
  setLstProdOutletVigen: "setLstProdOutletVigen",
  SHOW_MODAL: "SHOW_MODAL",
  setShowEdit: "setShowEdit",
  setDteDesde: "setDteDesde",
  setDteHasta: "setDteHasta",
  setNumProductoVigencia: "setNumProductoVigencia",
  setNumEstado: "setNumEstado",
  ERROR: "ERROR"
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.setLstProdOutletVigen:
      return {
        ...state,
        lstProdOutletVigen: action.lstProdOutletVigen,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.SHOW_MODAL:
      return {
        ...state,
        modalShow: action.modalShow,
      };
    case actionType.setShowEdit:
      console.log(action.productoOutletVigencia);
      return {
        ...state,
        modalShow: action.modalShow,
        dteDesde: Date.parse(action.productoOutletVigencia.dteDesde),
        dteHasta: Date.parse(action.productoOutletVigencia.dteHasta),
        numProductoVigencia: action.productoOutletVigencia.numProductoVigencia,
        numEstado: action.productoOutletVigencia.numEstado,
      };
    case actionType.setDteDesde:
      return {
        ...state,
        dteDesde: action.dteDesde,
      };

    case actionType.setDteHasta:
      return {
        ...state,
        dteHasta: action.dteHasta,
      };

    case actionType.setNumProductoVigencia:
      return {
        ...state,
        numProductoVigencia: action.numProductoVigencia,
      };

    case actionType.setNumEstado:
      return {
        ...state,
        numEstado: action.numEstado,
      };

    default:
      return state;
  }
}
export default function ListadoProductoOutlet(props) {
  let history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    lstProdOutletVigen: [],
    modalShow: false,
    productoOutletVigencia: {
      crud: CRUD.SELECT,
      numProductoVigencia: 0,
      dteDesde: "",
      dteHasta: "",
      numEstado: 0
    },
    dteDesde: "",
    dteHasta: "",
    numProductoVigencia: 0,
    numEstado: 0,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
  });
  useEffect(() => {
    handleObtenerCliente(props.numCodigoCliente);
    console.log("useEffect[ListadoProductoOutlet]");
    //eslint-disable-next-line 
  }, []);

  async function handleObtenerCliente(_numCodigoCliente) {
    let _rol = chrRol.ROLE_ANONIMO;
    const rpt = await obtenerCliente({ numCodigoCliente: _numCodigoCliente });
    let _server = { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT };
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      let _usuario = {};
      if (localStorage.getItem(localStoreEnum.USUARIO) !== null) {
        _usuario = JSON.parse(localStorage.getItem(localStoreEnum.USUARIO));
        if (_usuario.chrRol === chrRol.ROLE_ADMIN && json.chrRol === chrRol.ROLE_ADMIN) {
          _rol = json.chrRol;
        } else {
          _rol = chrRol.ROLE_ANONIMO;
        }
      } else {
        _rol = chrRol.ROLE_ANONIMO;
      }
      _server.error = "";
      _server.success = SUCCESS_SERVER.SUCCES_SERVER_OK;
    } else {
      _server.error = "";
      _server.success = SUCCESS_SERVER.SUCCES_SERVER_ERROR;
    }
    dispatch({ type: actionType.ROL, rol: _rol, server: _server });
    if (JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)) !== null) {
      if (!(JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)).chrRol === chrRol.ROLE_ADMIN
        && _rol === chrRol.ROLE_ADMIN
        && localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN)) {
        history.push("/admin");
      }
      handleEventListaProdOutletVigencia();
    } else {
      history.push("/admin");
    }
  }
  async function handleEventListaProdOutletVigencia() {
    const rpt = await listarProductoOutletVigencia({});
    console.log("handleEventListaProdOutletVigencia");
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        let _lstProdOutletVigen = [];
        for (let index = 0; index < json.lista.length; index++) {
          const _object = json.lista[index];
          _lstProdOutletVigen.push(<tr key={index}>
            <td>{_object.numProductoVigencia}</td>
            <td>{_object.dteDesde}</td>
            <td>{_object.dteHasta}</td>
            <td>{_object.numEstado === 1 ? <div style={{width:"100%",display:"flex",justifyContent:"center"}}><div className="onState"></div></div> : <div style={{width:"100%",display:"flex",justifyContent:"center"}}><div className="offState"></div></div>}</td>
            <td>
              <Link to={"/outletCarga/" + _object.numProductoVigencia + "/update"}>
                <i title="Listado de productos Outlet" className="fa fa-outdent"></i>
              </Link>
            </td>
          </tr>);
        }

        dispatch({
          type: actionType.setLstProdOutletVigen,
          lstProdOutletVigen: _lstProdOutletVigen,
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
        });
      }
    } else {
      console.log('SUCCES_SERVER_ERROR');
      dispatch({
        type: actionType.ERROR,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }
  /* function handleEventEditarVigencia(_object) {
     let _dteDesde = [
       _object.dteDesde.substring(0, 2),
       _object.dteDesde.substring(3, 5),
       _object.dteDesde.substring(6, 10),
       _object.dteDesde.substring(12, 13),
       _object.dteDesde.substring(14, 15)
     ];
 
     let _dteHasta = [_object.dteHasta.substring(0, 2),
       _object.dteHasta.substring(3, 5),
       _object.dteHasta.substring(6, 10),
       _object.dteHasta.substring(12, 13),
       _object.dteHasta.substring(14, 15)];
  
     dispatch({
       type: actionType.setShowEdit,
       modalShow: true,
       productoOutletVigencia: {
         crud: CRUD.UPDATE,
         numProductoVigencia: _object.numProductoVigencia,
         dteDesde: _dteDesde[2] + "/" + _dteDesde[1] + "/" + _dteDesde[0] ,
         dteHasta: _dteHasta[2] + "/" + _dteHasta[1] + "/" + _dteHasta[0],
         numEstado: _object.numEstado
       }
     });
   }*/
  async function handleEventSaveOutletVigencia() {
    const rpt = await saveProductoOutletVigencia({
      numProductoVigencia: state.numProductoVigencia,
      dteDesdeDate: state.dteDesde,
      dteHastaDate: state.dteHasta,
      numEstado: state.numEstado
    });
    console.log("handleEventSaveOutletVigencia");
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        handleEventListaProdOutletVigencia();
        dispatch({
          type: actionType.SHOW_MODAL,
          modalShow: false,
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: { error: json.response.error, success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
        });
      }
    } else {
      console.log('SUCCES_SERVER_ERROR');
      dispatch({
        type: actionType.ERROR,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }
  return (
    <div className="list-Producto-Outlet">
      <div className="link-href">
        <Link to="/dashboardAdmin">
          <i className="fa fa-home" aria-hidden="true"></i>
          Panel de Control
        </Link>
      </div>
      <h3>Productos Outlet</h3>
      <div className="form-body-outlet">
        <div className="form-accion">
          <Link to={"/outletCarga/0/insert"} className="btn btn-primary fa fa-plus">Adicionar</Link>
        </div>
        <div className="div-table">
          <table>
            <thead>
              <tr>
                <td style={{ 'width': '15%' }}>Código</td>
                <td style={{ 'width': '20%', textAlign: "Center" }}>Fecha Desde</td>
                <td style={{ 'width': '20%', textAlign: "Center" }}>Fecha Hasta</td>
                <td style={{ 'width': '20%', textAlign: "Center" }}>Estado</td>
                <td style={{ 'width': '15%' }}>Opciones</td>
              </tr>
            </thead>
            <tbody>
              {state.lstProdOutletVigen}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        className="modal-direccion"
        show={state.modalShow}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton onHide={(e) => dispatch({ type: actionType.SHOW_MODAL, modalShow: false })}>
          <Modal.Title id="contained-modal-title-vcenter">
            Editar Vigencia de Productos Outlet
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <table>
              <tbody>
                <tr>
                  <td style={{ width: "130px" }}>Fecha Desde</td>
                  <td> <DatePicker
                    selected={state.dteDesde}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    maxDate={state.dteHasta}
                    locale="es"
                    onChange={(date) =>
                      dispatch({ type: actionType.setDteDesde, dteDesde: date })
                    }
                  ></DatePicker></td>
                </tr>
                <tr>
                  <td>Fecha Hasta</td>
                  <td> <DatePicker
                    selected={state.dteHasta}
                    minDate={state.dteDesde}
                    dateFormat="dd/MM/yyyy"
                    className="form-control"
                    locale="es"
                    onChange={(date) =>
                      dispatch({ type: actionType.setDteHasta, dteHasta: date })
                    }
                  ></DatePicker></td>
                </tr>
                <tr>
                  <td>Estado</td>
                  <td>
                    <input
                      type="checkbox"
                      name="flgDireccionDespacho"
                      className="form-control"
                      autoComplete="false"
                      autoSave="false"
                      checked={state.numEstado === 1 ? true : false}
                      style={{ width: "20px" }}
                      onChange={(e) =>
                        dispatch({
                          type: actionType.setNumEstado,
                          numEstado: e.target.checked === true ? 1 : 0,
                        })
                      }
                    ></input>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </Modal.Body>
        <Modal.Footer >
          <button
            type="button"
            className="btn btn-primary fa fa-save"
            onClick={handleEventSaveOutletVigencia}
          >
            Actualizar
          </button>
          <button
            onClick={(e) => dispatch({ type: actionType.SHOW_MODAL, modalShow: false })} className="btn btn-primary fa fa-close">
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>


      <ServerException server={state.server}></ServerException>

       
    </div>
  )
}