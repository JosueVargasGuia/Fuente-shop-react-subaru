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
/*import {
  listaMenu,
  _CodigoGrupo,
  _IndentificadorMenu,
} from "../../service/EnumMenu";*/
import { obtenerCliente } from "../../service/loginCliente.service";
import { saveUpdateMenu, obtenerMenus, obtenerSubFamilia } from "../../service/producto.service";

let actionType = {
  LISTDATA: "LISTDATA",
  ROL: "ROL",
  ERROR: "ERROR",
  SHOW_MODAL: "SHOW_MODAL",
  SHOW_MODAL_CLOSE: "SHOW_MODAL_CLOSE",
  MENU: "MENU",
  ERROR_MENSAJE: "ERROR_MENSAJE",
  chrCodigoSubFamilia:"chrCodigoSubFamilia"
};
const reducer = (state, action) => {
  //eslint-disable-next-line
  switch (action.type) {
    case actionType.LISTDATA:
      return {
        ...state,
        lstMenu: action.lstMenu,
        lstSubFamilia:action.lstSubFamilia,
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
export default function MenuPersonalizado(props) {
  let history = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    lstMenu: [],
    rol: "",
    showModal: false,
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    crud: CRUD.SELECT,
    menu: {
      vchrCodigo: "",
      vchrDescripcion: "",
      bloSrcImg: "",
      chrTypeImg: "",
      vchrGrupo: "",
      vchrSubFamilia: [],
      vchrPalabraClave: [],
      display: 0,
      select: 0,
    },
    msg: "",
    lstSubFamilia:[],
    chrCodigoSubFamilia:'default'
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
    let _lstSubFamilia=[];
    const rptFamilia=await obtenerSubFamilia({});
    if (rptFamilia.status === HttpStatus.HttpStatus_OK) {
        const jsonF = await rptFamilia.json();
        if (jsonF.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
            for (let index = 0; index < jsonF.lista.length; index++) {
                const element = jsonF.lista[index];
                _lstSubFamilia.push(<option value={element.chrCodigoSubFamilia}>{element.vchDescripcion}</option>);
            }
        }
    }
    const rpt = await obtenerMenus({});

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let index = 0; index < json.listaMenu.length; index++) {
          let element = json.listaMenu[index];
          let textFamilia = appendArrayToLi(element.vchrSubFamilia);
          let textQuery = appendArrayToLi(element.vchrPalabraClave);

          _lstMenu.push(
            <tr key={index}>
              <td style={{}}>{element.vchrDescripcion}</td>
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
              <td style={{}}>{element.vchrGrupo}</td>
              <td style={{}}>{element.vchrCodigo}</td>
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
        dispatch({ type: actionType.LISTDATA, lstMenu: _lstMenu,lstSubFamilia:_lstSubFamilia });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR_MENSAJE,
          msg: "Lo sentimos el recurso no esta disponible, estamos trabajando para solucionar el inconveniente.",
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR_MENSAJE,
        msg: "Lo sentimos el recurso no esta disponible, estamos trabajando para solucionar el inconveniente.",
      });
    }
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
    let _lstMsg = validarFuncion(_menu);
    if (_lstMsg.length === 0) {
      const rpt = await saveUpdateMenu({
        vchrCodigo: _menu.vchrCodigo,
        vchrDescripcion: _menu.vchrDescripcion,
        bloSrcImg: "",
        chrTypeImg: "",
        vchrGrupo: _menu.vchrGrupo,
        vchrSubFamilia: _menu.vchrSubFamilia,
        vchrPalabraClave: _menu.vchrPalabraClave,
        crud: state.crud.descripcion,
      });

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          dispatch({
            type: actionType.SHOW_MODAL_CLOSE,
            showModal: false,
          });
          handleEnventLoadMenu();
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR_MENSAJE,
            msg: json.response.error,
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR_MENSAJE,
          msg: "Lo sentimos el recurso no esta disponible, estamos trabajando para solucionar el inconveniente.",
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR_MENSAJE,
        msg: <ul>{_lstMsg}</ul>,
      });
    }
  }
  function handleEventAddMenu() {
    dispatch({
      type: actionType.SHOW_MODAL,
      showModal: true,
      crud: CRUD.INSERT,
      menu: {
        vchrCodigo: "",
        vchrDescripcion: "",
        bloSrcImg: "",
        chrTypeImg: "",
        vchrGrupo: "default",
        vchrSubFamilia: [],
        vchrPalabraClave: [],
        display: 0,
        select: 0,
      },
    });
  }
  function validarFuncion(_menu) {
    let _msg = [];
    console.log(_menu);

    if (_menu.vchrGrupo === "default" || _menu.vchrGrupo === null) {
      _msg.push(<li key={1}>Seleccione un grupo</li>);
    }
    if (_menu.vchrDescripcion === "") {
      _msg.push(<li key={2}>Ingrese una descripción</li>);
    }
    return _msg;
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
          <i className="fa fa-tags" onClick={(e) => handleEventAddMenu()}>
            Adicionar
          </i>
        </div>
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
            {state.crud === CRUD.INSERT ? (
              <></>
            ) : (
              <div className="form-menu-row">
                <div className="form-menu-row-label">Codigo</div>
                <div className="form-menu-row-desc">
                  {state.menu.vchrCodigo}
                </div>
              </div>
            )}

            <div className="form-menu-row">
              <div className="form-menu-row-label">Grupo</div>
              <div className="form-menu-row-desc">
                <select
                  onChange={(e) => {
                    let _menu = state.menu;
                    _menu.vchrGrupo = e.target.value;
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                  className="form-control"
                  value={state.menu.vchrGrupo}
                  disabled={state.crud === CRUD.INSERT ? false : true}
                  style={{minWidth:"280px"}}
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
            </div>
            <div className="form-menu-row">
              <div className="form-menu-row-label">Descripcion</div>
              <div className="form-menu-row-desc">
                <input
                  className="form-control"
                  name="chrdescripcion"
                  onChange={(e) => {
                    let _menu = state.menu;
                    _menu.vchrDescripcion = e.target.value;
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                  value={state.menu.vchrDescripcion}
                  style={{minWidth:"280px"}}
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
                    _menu.vchrSubFamilia = e.target.value.split(",");
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                  value={state.menu.vchrSubFamilia}
                ></input>

                <select
                  onChange={(e) => {
                   
                    dispatch({ type: actionType.chrCodigoSubFamilia, chrCodigoSubFamilia:e.target.value });
                  }}
                  className="form-control"
                  value={state.chrCodigoSubFamilia}
                
                >
                  <option value={"default"}>--Seleccione--</option>
                  {state.lstSubFamilia}
                </select>
              </div>
            </div>
            <div className="form-menu-row">
              <div className="form-menu-row-label">Palabras Clave</div>
              <div className="form-menu-row-desc">
                <input
                  className="form-control"
                  value={state.menu.vchrPalabraClave}
                  onChange={(e) => {
                    let _menu = state.menu;
                    _menu.vchrPalabraClave = e.target.value.split(",");
                    dispatch({ type: actionType.MENU, menu: _menu });
                  }}
                ></input>
              </div>
            </div>
          </div>
          <div className="form-menu-row">{state.msg}</div>
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
                  vchrCodigo: "",
                  vchrDescripcion: "",
                  bloSrcImg: "",
                  chrTypeImg: "",
                  vchrGrupo: "",
                  vchrSubFamilia: [],
                  vchrPalabraClave: [],
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
