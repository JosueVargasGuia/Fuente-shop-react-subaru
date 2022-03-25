import { useEffect, useReducer } from "react";
import { Modal } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";
import {
  chrRol,
  CRUD,
  HttpStatus,
  localStoreEnum,
  LOGGIN,
  SUCCESS_SERVER,
} from "../../service/ENUM";
import {
  listaMenu,
  _CodigoGrupo,
  _IndentificadorMenu,
} from "../../service/EnumMenu";
import { obtenerCliente } from "../../service/loginCliente.service";
import { saveUpdateMenu } from "../../service/producto.service";

let actionType = {
  LISTDATA: "LISTDATA",
  ROL: "ROL",
  ERROR: "ERROR",
  SHOW_MODAL: "SHOW_MODAL",
  SHOW_MODAL_CLOSE: "SHOW_MODAL_CLOSE",
  MENU: "MENU",
  ERROR_MENSAJE: "ERROR_MENSAJE",
};
const reducer = (state, action) => {
  //eslint-disable-next-line
  switch (action.type) {
    case actionType.LISTDATA:
      return {
        ...state,
        lstMenu: action.lstMenu,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
      case actionType.ERROR_MENSAJE:
        return {
          ...state,
          msg: action.msg,
        };
      
    case actionType.SHOW_MODAL:
      return {
        ...state,
        showModal: action.showModal,
        crud: action.crud,
        menu: action.menu,
        msg: action.msg,
      };
    case actionType.SHOW_MODAL_CLOSE:
      return {
        ...state,
        showModal: action.showModal,
      };
    case actionType.MENU:
      return {
        ...state,
        menu: action.menu,
      };
    default:
      return state;
  }
};
export default function MenuPersonalizado2(props) {
  let history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    lstMenu: [],
    rol: "",
    showModal: false,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    crud: CRUD.SELECT,
    menu: {
      descripcion: "",
      srcimg: "",
      identificador: _IndentificadorMenu.Default,
      subFamilia: [],
      query: [],
      codigoGrupo: _CodigoGrupo.default,
      display: 0,
      select: 0,
      msg:""
    },
  });
  useEffect(() => {
    handleObtenerCliente(props.numCodigoCliente);
    handleEnventLoadMenu();
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
        if (
          _usuario.chrRol === chrRol.ROLE_ADMIN &&
          json.chrRol === chrRol.ROLE_ADMIN
        ) {
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
      if (
        !(
          JSON.parse(localStorage.getItem(localStoreEnum.USUARIO)).chrRol ===
            chrRol.ROLE_ADMIN &&
          _rol === chrRol.ROLE_ADMIN &&
          localStorage.getItem(localStoreEnum.ISLOGIN) === LOGGIN.LOGGIN
        )
      ) {
        history.push("/admin");
      }
    } else {
      history.push("/admin");
    }
  }
  async function handleEnventLoadMenu() {
    let _lstMenu = [];

    for (let index = 0; index < listaMenu.length; index++) {
      let element = listaMenu[index];
      let textFamilia = appendArrayToLi(element.subFamilia);
      let textQuery = appendArrayToLi(element.query);

      _lstMenu.push(
        <tr key={index}>
          <td style={{}}>{element.descripcion}</td>
          <td style={{}}>
            <div className="flex-div-content">
              <ul>{textFamilia}</ul>
            </div>{" "}
          </td>
          <td style={{}}>
            <div className="flex-div-content">
              <ul>{textQuery}</ul>
            </div>{" "}
          </td>
          <td style={{}}>{element.codigoGrupo}</td>
          <td style={{}}>{element.identificador}</td>
          <td style={{ textAlign: "center" }}>
            <i
              className="  fa  fa-pencil"
              onClick={(e) =>
                dispatch({
                  type: actionType.SHOW_MODAL,
                  showModal: true,
                  crud: CRUD.UPDATE,
                  menu: element,
                })
              }
            ></i>
            <i
              className="  fa  fa-trash"
              onClick={(e) =>
                dispatch({
                  type: actionType.SHOW_MODAL,
                  showModal: true,
                  crud: CRUD.DELETE,
                  menu: element,
                })
              }
            ></i>
          </td>
        </tr>
      );
    }
    dispatch({ type: actionType.LISTDATA, lstMenu: _lstMenu });
  }
  function appendArrayToLi(_array) {
    let append = [];
    if (_array === undefined) {
      return append;
    }
    for (let index = 0; index < _array.length; index++) {
      let element = _array[index];
      append.push(<li key={index}>{element}</li>);
    }
    return append;
  }
  async function handleEventSaveMenu() {
    let _menu = state.menu;
    const rpt = await saveUpdateMenu({
      vchrCodigo: _menu.identificador,
      vchrDescripcion: _menu.descripcion,
      bloSrcImg: "",
      chrTypeImg: "",
      vchrGrupo: _menu.codigoGrupo,
      vchrSubFamilia: _menu.subFamilia,
      vchrPalabraClave: _menu.query,
      crud: state.crud.descripcion,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      console.log(json);
      console.log(json.response.status);
      console.log(json.response.error);
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
         dispatch({type:actionType.ERROR_MENSAJE,msg:json.response.error});
      }
    } else {
        dispatch({type:actionType.ERROR_MENSAJE,msg:"Lo sentimos el recurso no esta disponible, estamos trabajando para solucionar el inconveniente."})
    }
  }
function handleEventAddMenu(){
    let _menu=state.menu;
    _menu.identificador="";
    dispatch({
        type: actionType.SHOW_MODAL,
        showModal: true,
        crud: CRUD.INSERT,
        menu: _menu,
      })
}
  return (
    <div className="form-menu">
      <div className="link-href">
        <Link to="/dashboardAdmin">
          <i className="fa fa-home" aria-hidden="true"></i>
          Panel de Control
        </Link>
      </div>
      <h3>Mantenimiento de Menu</h3>
      <div className="form-menu-content">
        <div className="form-menu-head">
          <i
            className="fa fa-tags"
            onClick={(e) =>handleEventAddMenu()
              
            }
          >
            Adicionar
          </i>
        </div>{" "}
        {state.server.success}
        <div className="div-table">
          <table>
            <thead>
              <tr>
                <td style={{ width: "215px" }}>Descripción</td>
                <td style={{ width: "150px" }}>Subfamilia</td>
                <td style={{ width: "215px" }}>Palabras Claves</td>
                <td style={{ width: "120px" }}>Grupo</td>
                <td style={{ width: "120px" }}>Identificar</td>
                <td style={{ width: "40px " }}>Opciones</td>
              </tr>
            </thead>
            <tbody>{state.lstMenu}</tbody>
          </table>
        </div>
      </div>

      <Modal
        className="modal-direccion"
        show={state.showModal}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header
          closeButton
          onHide={(e) =>
            dispatch({
              type: actionType.SHOW_MODAL_CLOSE,
              showModal: false,
            })
          }
        >
          <Modal.Title id="contained-modal-title-vcenter">
            {state.crud === CRUD.INSERT ? "Agregar Menu" : "Editar Menu"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-menu-form">
            <div className="form-menu-row">
              <div className="form-menu-row-desc">Identificador</div>
            </div>
            <div className="form-menu-row">
              <div className="form-menu-row-label">Grupo</div>
              <div className="form-menu-row-desc">
                <select
                  onChange={(e) => {
                    let _menu = state.menu;
                    _menu.codigoGrupo = e.target.value;
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                  className="form-control"
                  value={state.menu.codigoGrupo}
                >
                <option value={"default"}>--Seleccione--</option>
                  <option value={"Repuesto"}>Repuesto</option>
                  <option value={"Accesorios"}>Accesorios</option>
                  <option value={"Mantenimiento"}>Mantenimiento</option>
                  <option value={"Recambio"}>Recambio</option>
                  <option value={"Accesorio_LyfeStyle"}>
                    Accesorio LyfeStyle
                  </option>
                  <option value={"LifeStyle"}>LifeStyle</option>
                  <option value={"Personalizado"}>Personalizado</option>
                </select>
              </div>
              <div className="form-menu-row-label">Descripcion</div>
              <div className="form-menu-row-desc">
                <input
                  className="form-control"
                  name="chrdescripcion"
                  onChange={(e) => {
                    let _menu = state.menu;
                    _menu.descripcion = e.target.value;
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                  value={state.menu.descripcion}
                ></input>
              </div>
            </div>
            <div className="form-menu-row">
              <div className="form-menu-row-label">Sub-Familia</div>
              <div className="form-menu-row-desc">
                <input
                  className="form-control"
                  onChange={(e) => {
                    let _menu = state.menu;
                    _menu.subFamilia = e.target.value.split(",");
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                  value={state.menu.subFamilia}
                  style={{ minWidth: "380px" }}
                ></input>
              </div>
            </div>
            <div className="form-menu-row">
              <div className="form-menu-row-label">Palabras Clave</div>
              <div className="form-menu-row-desc">
                <input
                  className="form-control"
                  value={state.menu.query}
                  onChange={(e) => {
                    let _menu = state.menu;
                    _menu.query = e.target.value.split(",");
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                  style={{ minWidth: "380px" }}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-menu-row">
              {state.msg}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={(e) => {
              handleEventSaveMenu();
            }}
            className="btn btn-primary"
          >
            Guardar
          </button>
          <button
            onClick={(e) => {
              dispatch({
                type: actionType.SHOW_MODAL,
                showModal: false,
                crud: CRUD.SELECT,
                menu: {
                  descripcion: "",
                  srcimg: "",
                  identificador: _IndentificadorMenu.Default,
                  subFamilia: [],
                  query: [],
                  codigoGrupo: _CodigoGrupo.default,
                  display: 0,
                  select: 0,
                },
              });
            }}
            className="btn btn-primary"
          >
            Cerrar
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
