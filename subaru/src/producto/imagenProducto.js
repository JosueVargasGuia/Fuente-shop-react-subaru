import { useEffect, useReducer, useRef, useState } from "react";
import {
  CRUD,
  HttpStatus,
  SUCCESS_SERVER,
  FilterProducto,
} from "../service/ENUM";
import {
  listaProductoImagen,
  crudProductoImagen,
  listaAtributo,
  listaProductoAtributo,
  crudProductoAtributo,
  crudProductoCategoria,
  listaProductoReporte,
  listaProductoFindCodByDesc,
} from "../service/producto.service";
import ServerException from "../utils/serverException";
import ReactHTMLTableToExcel from "react-html-table-to-excel";
import { Link } from "react-router-dom";

export default function ImagenProducto() {
  const [chrCodigoProducto, setChrCodigoProducto] = useState("");
  const [file, setFile] = useState("");
  const inputFile = useRef();
  const [state, dispatch] = useReducer(reducer, {
    rowsProductoImage: [],
    rowsProductoImageHtml: [],
    rowsProductoAtributoHtml: [],
    rowsReporte: [],
    productoImangen: {
      numCodigoProductoImagen: 1,
      chrCodigoProducto: "",
      chrSrcImagen: "",
      chrNombre: "",
      chrType: "",
      chrPredeterminado: "",
      crud: CRUD.SELECT,
    },
    producto: {
      chrCodigoProducto: "",
      vchDescripcion: "",
      familia: { chrCodigoFamilia: "", vchDescripcion: "" },
      productoOnlineCategoria: {
        numCodigoProductoCategoria: 0,
        chrCodigoProducto: "",
        chrRecomendado: "",
        chrDestacadoMarca: "",
        chrOferta: "",
        chrRemate: "",
        chrDestacado: "",
      },
    },
    isDestacado: "0",
    isRecomendado: "0",
    isOferta: "0",
    isRemate: "0",
    isDestacadoMarca: "0",
    rowsAtributo: [],
    numCodigoCaracteristica: 0,
    chrValue: "",
    filterReporte: {
      isDestacado: false,
      isRecomendado: false,
      isOferta: false,
      isRemate: false,
      isDestacadoMarca: false,
    },
    server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_DEFAULT },
    listaFilterProducto: [],
    diplayFilter: false,
  });
  useEffect(() => {
    console.log("useEffect [ImagenProducto]");
    handleLoadAtributos();
    handleLoadReporte({
      isDestacado: false,
      isRecomendado: false,
      isOferta: false,
      isRemate: false,
      isDestacadoMarca: false,
    });
    //eslint-disable-next-line
  }, []);
  const [tabsIndex, setTabsIndex] = useState(_TabsIndex.TABS_IMAGEN);
  async function handleEventFilterProducto(_chrCodigoProducto) {
    setChrCodigoProducto(_chrCodigoProducto);
    let _listaFilterProducto = [];    
    if (_chrCodigoProducto.length >= 1) {
      const rpt = await listaProductoFindCodByDesc({
        chrCodigoProducto: _chrCodigoProducto,
      });
      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        console.log(json);
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          for (let i = 0; i < json.listaProductos.length; i++) {
            let objProd = json.listaProductos[i];
            _listaFilterProducto.push(
              <div key={i}  className="prod-img-row" onClick={(e)=>handleEventFindProducto(objProd.chrCodigoProducto,false)} >
                <div className="prod-img-row-codigo" onClick={(e)=>handleEventFindProducto(objProd.chrCodigoProducto,false)} >
                  {objProd.chrCodigoProducto}
                </div>
                <div className="prod-img-row-desc" onClick={(e)=>handleEventFindProducto(objProd.chrCodigoProducto,false)} >
                  &nbsp;{objProd.vchDescripcion}
                </div>
              </div>
            );
          }
        
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }
    }
    let _diplayFilter=_listaFilterProducto.length ===1 ? false : true;
    if(_listaFilterProducto.length===1){
      _diplayFilter=false;
      handleEventFindProducto(_chrCodigoProducto,false)
     
    }

    dispatch({
      type: actionType.SET_FILTER,
      listaFilterProducto: _listaFilterProducto,
      diplayFilter: _diplayFilter,
    });
  }
  async function handleEventFindProducto(_chrCodigoProducto,_diplayFilter) {
     
    if (_chrCodigoProducto.trim().length >= 1) {
      let _rowsProductoImage = [];
      let _producto = {
        chrCodigoProducto: "",
        vchDescripcion: "",
        familia: { chrCodigoFamilia: "", vchDescripcion: "" },
        productoOnlineCategoria: {
          numCodigoProductoCategoria: 0,
          chrCodigoProducto: "",
          chrRecomendado: "",
          chrDestacadoMarca: "",
          chrOferta: "",
          chrRemate: "",
          chrDestacado: "",
        },
      };
      const rpt = await listaProductoImagen({
        chrCodigoProducto: _chrCodigoProducto,
      });

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          for (let i = 0; i < json.lista.length; i++) {
            let obj = json.lista[i];
            _rowsProductoImage.push({
              numCodigoProductoImagen: obj.numCodigoProductoImagen,
              chrCodigoProducto: obj.chrCodigoProducto,
              chrSrcImagen: obj.chrSrcImagen,
              chrNombre: obj.chrNombre,
              chrType: obj.chrType,
              chrPredeterminado: obj.chrPredeterminado,
              crud: CRUD.UPDATE,
            });
          }

          if (json.producto !== null) {
            _producto.chrCodigoProducto = json.producto.chrCodigoProducto;
            _producto.vchDescripcion = json.producto.vchDescripcion;
            if (json.producto.familia !== null) {
              _producto.familia.chrCodigoFamilia =
                json.producto.familia.chrCodigoFamilia;
              _producto.familia.vchDescripcion =
                json.producto.familia.vchDescripcion;
            }
          }

          if (json.producto.productoOnlineCategoria !== null) {
            _producto.productoOnlineCategoria.numCodigoProductoCategoria =
              json.productoOnlineCategoria.numCodigoProductoCategoria;
            _producto.productoOnlineCategoria.chrCodigoProducto =
              json.productoOnlineCategoria.chrCodigoProducto;
            _producto.productoOnlineCategoria.chrRecomendado =
              json.productoOnlineCategoria.chrRecomendado;
            _producto.productoOnlineCategoria.chrDestacadoMarca =
              json.productoOnlineCategoria.chrDestacadoMarca;
            _producto.productoOnlineCategoria.chrOferta =
              json.productoOnlineCategoria.chrOferta;
            _producto.productoOnlineCategoria.chrRemate =
              json.productoOnlineCategoria.chrRemate;
            _producto.productoOnlineCategoria.chrDestacado =
              json.productoOnlineCategoria.chrDestacado;
          }
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }

      handleEventBuiltList(_rowsProductoImage, _producto);
      handleLoadAtributoProducto(_chrCodigoProducto);
    }
    setChrCodigoProducto(_chrCodigoProducto);
    dispatch({
      type: actionType.SET_FILTER,
      listaFilterProducto: [],
      diplayFilter: _diplayFilter,
    });
  }
  function handleEventBuiltList(_rowsProductoImage, _producto) {
    let _rowsProductoImageHtml = [];
    for (let i = 0; i < _rowsProductoImage.length; i++) {
      const element = _rowsProductoImage[i];
      _rowsProductoImageHtml.push(
        <tr
          className="prod-img-search-card"
          key={element.numCodigoProductoImagen}
        >
          <td style={{ width: "5%", textAlign: "center" }}>
            {element.numCodigoProductoImagen}
          </td>
          <td style={{ width: "20%", textAlign: "center" }}>
            <img
              src={"data:image/png;base64," + element.chrSrcImagen}
              alt={element.chrNombre}
            ></img>
          </td>
          <td style={{ width: "20%", textAlign: "center" }}>
            <span onClick={() => handleEventSelectItem(element)}>
              {element.chrNombre}
            </span>
          </td>
          <td style={{ width: "20%", textAlign: "center", fontSize: "35px" }}>
            {element.chrPredeterminado === "1" ? (
              <i className="fa fa-star"></i>
            ) : (
              ""
            )}
          </td>
        </tr>
      );
    }

    dispatch({
      type: actionType.LIST_FORMAT,
      rowsProductoImage: _rowsProductoImage,
      rowsProductoImageHtml: _rowsProductoImageHtml,
      producto: _producto,
      isDestacado: _producto.productoOnlineCategoria.chrDestacado,
      isRecomendado: _producto.productoOnlineCategoria.chrRecomendado,
      isOferta: _producto.productoOnlineCategoria.chrOferta,
      isRemate: _producto.productoOnlineCategoria.chrRemate,
      isDestacadoMarca: _producto.productoOnlineCategoria.chrDestacadoMarca,
    });
  }

  function handleEventBuiltListProductoCaracteristica(_rowsProductoAtributo) {
    let _rowsProductoAtributoHtml = [];
    for (let i = 0; i < _rowsProductoAtributo.length; i++) {
      const element = _rowsProductoAtributo[i];
      _rowsProductoAtributoHtml.push(
        <tr
          className="prod-img-search-card"
          key={element.numCodProdCaracteristica}
        >
          <td style={{ width: "5%", textAlign: "center" }}>
            {element.numCodProdCaracteristica}
          </td>
          <td style={{ width: "20%" }}>
            &nbsp;{element.caracteristica.chrDescripcion}
          </td>
          <td style={{ width: "20%" }}>&nbsp;{element.chrValue}</td>
          <td style={{ width: "5%" }}>
            &nbsp;&nbsp;
            <button
              className="btn btn-primary fa fa-trash"
              title="Eliminar"
              onClick={() =>
                handleEventEliminarAtributoProducto(
                  element.numCodProdCaracteristica
                )
              }
            ></button>
          </td>
        </tr>
      );
    }
    dispatch({
      type: actionType.LIST_PRODUCTO_ATRIBUTO,
      rowsProductoAtributoHtml: _rowsProductoAtributoHtml,
    });
  }
  async function handleEventEliminarAtributoProducto(
    _numCodProdCaracteristica
  ) {
    handleEventGuardarProductoAtributo(
      _numCodProdCaracteristica,
      state.producto.chrCodigoProducto,
      "",
      "",
      CRUD.DELETE
    );
  }
  async function handleEventSelectItem(obj) {
    let _produto = {
      numCodigoProductoImagen: 0,
      chrCodigoProducto: "",
      chrSrcImagen: "",
      chrNombre: "",
      chrType: "",
      chrPredeterminado: "",
      crud: CRUD.UPDATE,
    };
    const rpt = await listaProductoImagen({
      chrCodigoProducto: obj.chrCodigoProducto,
      numCodigoProductoImagen: obj.numCodigoProductoImagen,
      filter: FilterProducto.FILTER_CODIGO,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();

      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let i = 0; i < json.lista.length; i++) {
          let obj = json.lista[i];
          _produto.numCodigoProductoImagen = obj.numCodigoProductoImagen;
          _produto.chrCodigoProducto = obj.chrCodigoProducto;
          _produto.chrSrcImagen = obj.chrSrcImagen.replace(
            /(\r\n|\n|\r)/gm,
            ""
          );
          _produto.chrNombre = obj.chrNombre;
          _produto.chrType = obj.chrType;
          _produto.chrPredeterminado = obj.chrPredeterminado;
          _produto.crud = CRUD.UPDATE;
        }
      }
    }
    dispatch({
      type: actionType.SET_PRODUCTO,
      productoImangen: _produto,
    });
  }
  async function handleEnventReadFile(e) {
    setFile("");
    let _productoImangen = {
      numCodigoProductoImagen: 0,
      chrCodigoProducto: chrCodigoProducto,
      chrSrcImagen: "",
      chrNombre: "",
      chrType: "png",
      chrPredeterminado: "0",
      crud: CRUD.SELECT,
    };
    dispatch({
      type: actionType.SET_PRODUCTO,
      productoImangen: _productoImangen,
    });

    let file = e.target.files[0];
    if (file !== undefined) {
      _productoImangen.chrNombre = file.name
        .replace(".png", "")
        .replace(".PNG", "");

      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = await function () {
        let _replace = "data:image/png;base64,";
        let filetext = reader.result.replace(_replace, "");
        _productoImangen.chrSrcImagen = filetext;
      };
    } else {
      _productoImangen.chrSrcImagen = "";
      _productoImangen.chrNombre = "";
    }

    setTimeout(() => {
      _productoImangen.crud = CRUD.INSERT;
      dispatch({
        type: actionType.SET_PRODUCTO,
        productoImangen: _productoImangen,
      });
    }, 2000);
  }
  function handleEventChangePredeterminado(_productoImangen, value) {
    _productoImangen.chrPredeterminado = value ? "1" : "0";

    dispatch({
      type: actionType.SET_PRODUCTO,
      productoImangen: _productoImangen,
    });
  }

  function handleEventLimpiarProducto() {
    setFile(null);
    let _productoImangen = {
      numCodigoProductoImagen: null,
      chrCodigoProducto: null,
      chrSrcImagen: "",
      chrNombre: "",
      chrType: "",
      chrPredeterminado: "0",
      crud: CRUD.SELECT,
    };
    dispatch({
      type: actionType.SET_PRODUCTO,
      productoImangen: _productoImangen,
    });
  }

  async function handleEventGuardarProducto() {
    if (state.productoImangen.chrCodigoProducto !== "") {
      const rpt = await crudProductoImagen({
        numCodigoProductoImagen: state.productoImangen.numCodigoProductoImagen,
        chrCodigoProducto: state.productoImangen.chrCodigoProducto,
        chrSrcImagen: state.productoImangen.chrSrcImagen,
        chrNombre: state.productoImangen.chrNombre,
        chrType: state.productoImangen.chrType,
        chrPredeterminado: state.productoImangen.chrPredeterminado,
        crud: state.productoImangen.crud.descripcion,
      });

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          handleEventFindProducto(state.productoImangen.chrCodigoProducto,false);
          let _productoImangen = {
            numCodigoProductoImagen: 0,
            chrCodigoProducto: null,
            chrSrcImagen: "",
            chrNombre: "",
            chrType: "",
            chrPredeterminado: "0",
            crud: CRUD.INSERT,
          };
          dispatch({
            type: actionType.SET_PRODUCTO,
            productoImangen: _productoImangen,
          });
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: {
          error: "Es necesario seleccionar un producto.",
          success: SUCCESS_SERVER.SUCCES_SERVER_WARRING,
        },
      });
    }
  }
  async function handleEventGuardarProductoAtributo(
    _numCodProdCaracteristica,
    _chrCodigoProducto,
    _numCodigoCaracteristica,
    _chrValue,
    _crud
  ) {
    let _validate = "1";
    let _menssage = "";

    if (_chrCodigoProducto === "") {
      _menssage = "Es necesario seleccionar un producto. ";
      _validate = "0";
    }
    if (_crud === CRUD.INSERT) {
      if (_numCodigoCaracteristica <= 0) {
        _menssage = "Es necesario seleccionar el atributo. ";
        _validate = "0";
      }
      if (_chrValue === "") {
        _menssage = "Es necesario ingresar el valor del atributo. ";
        _validate = "0";
      }
    }
    if (_validate === "1") {
      const rpt = await crudProductoAtributo({
        numCodProdCaracteristica: _numCodProdCaracteristica,
        chrCodigoProducto: _chrCodigoProducto,
        caracteristica: { numCodigoCaracteristica: _numCodigoCaracteristica },
        chrValue: _chrValue,
        crud: _crud.descripcion,
      });

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          handleLoadAtributoProducto(_chrCodigoProducto);
          dispatch({
            type: actionType.SET_RESET,
            numCodigoCaracteristica: 0,
            chrValue: "",
          });
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: {
          error: _menssage,
          success: SUCCESS_SERVER.SUCCES_SERVER_WARRING,
        },
      });
    }
  }

  async function handleEventEliminarProducto() {
    if (state.productoImangen.chrCodigoProducto !== "") {
      const rpt = await crudProductoImagen({
        numCodigoProductoImagen: state.productoImangen.numCodigoProductoImagen,
        chrCodigoProducto: state.productoImangen.chrCodigoProducto,
        chrSrcImagen: state.productoImangen.chrSrcImagen,
        chrNombre: state.productoImangen.chrNombre,
        chrType: state.productoImangen.chrType,
        chrPredeterminado: state.productoImangen.chrPredeterminado,
        crud: CRUD.DELETE.descripcion,
      });

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          handleEventFindProducto(state.productoImangen.chrCodigoProducto,false);
          let _productoImangen = {
            numCodigoProductoImagen: 0,
            chrCodigoProducto: null,
            chrSrcImagen: "",
            chrNombre: "",
            chrType: "",
            chrPredeterminado: "0",
            crud: CRUD.INSERT,
          };
          dispatch({
            type: actionType.SET_PRODUCTO,
            productoImangen: _productoImangen,
          });
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: {
          error: "Seleccione un producto",
          success: SUCCESS_SERVER.SUCCES_SERVER_INFO,
        },
      });
    }
  }

  async function handleLoadAtributos() {
    let _rowsAtributo = [];
    const rpt = await listaAtributo({});
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let i = 0; i < json.lista.length; i++) {
          let obj = json.lista[i];
          _rowsAtributo.push(
            <option
              value={obj.numCodigoCaracteristica}
              key={obj.numCodigoCaracteristica}
            >
              {obj.chrDescripcion}
            </option>
          );
        }
        dispatch({
          type: actionType.LIST_ATRIBUTO,
          rowsAtributo: _rowsAtributo,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_OK },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }

  async function handleLoadReporte(filter) {
    let _rowsAtributo = [];
    const rpt = await listaProductoReporte({
      chrDestacado: filter.isDestacado === true ? "1" : "0",
      chrRecomendado: filter.isRecomendado === true ? "1" : "0",
      chrOferta: filter.isOferta === true ? "1" : "0",
      chrRemate: filter.isRemate === true ? "1" : "0",
      chrDestacadoMarca: filter.isDestacadoMarca === true ? "1" : "0",
    });
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let i = 0; i < json.lista.length; i++) {
          let obj = json.lista[i];
          _rowsAtributo.push(
            <tr key={i}>
              <td>
                <i
                  className="fa-btn fa fa-check"
                  onClick={() => handleEventFindProducto(obj.chrCodigoProducto,false)}
                ></i>
                {obj.chrCodigoProducto}
              </td>
              <td>{obj.vchDescripcion}</td>
              <td>{obj.familia.vchDescripcion}</td>
              <td style={{ textAlign: "center" }}>
                {obj.chrDestacado === "1" ? (
                  <i className="fa fa-check" aria-hidden="true">
                    Si
                  </i>
                ) : (
                  ""
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {obj.chrOferta === "1" ? (
                  <i className="fa fa-check" aria-hidden="true">
                    Si
                  </i>
                ) : (
                  ""
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {obj.chrRecomendado === "1" ? (
                  <i className="fa fa-check" aria-hidden="true">
                    Si
                  </i>
                ) : (
                  ""
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {obj.chrRemate === "1" ? (
                  <i className="fa fa-check" aria-hidden="true">
                    Si
                  </i>
                ) : (
                  ""
                )}
              </td>
              <td style={{ textAlign: "center" }}>
                {obj.chrDestacadoMarca === "1" ? (
                  <i className="fa fa-check" aria-hidden="true">
                    Si
                  </i>
                ) : (
                  ""
                )}
              </td>
            </tr>
          );
        }
        dispatch({
          type: actionType.LST_REPORTE,
          rowsReporte: _rowsAtributo,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_OK },
        });
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }
  }

  async function handleLoadAtributoProducto(_chrCodigoProducto) {
    let _rowsProductoAtributo = [];
    const rpt = await listaProductoAtributo({
      chrCodigoProducto: _chrCodigoProducto,
    });

    if (rpt.status === HttpStatus.HttpStatus_OK) {
      const json = await rpt.json();
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
        for (let i = 0; i < json.lista.length; i++) {
          let obj = json.lista[i];
          _rowsProductoAtributo.push({
            numCodProdCaracteristica: obj.numCodProdCaracteristica,
            chrCodigoProducto: obj.chrCodigoProducto,
            chrValue: obj.chrValue,
            caracteristica: {
              chrDescripcion: obj.caracteristica.chrDescripcion,
              numCodigoCaracteristica:
                obj.caracteristica.numCodigoCaracteristica,
            },
          });
        }
      }
      if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
      });
    }

    handleEventBuiltListProductoCaracteristica(_rowsProductoAtributo);
  }

  async function handleEventGuardarCategoria() {
    if (state.producto.chrCodigoProducto !== "") {
      const rpt = await crudProductoCategoria({
        chrCodigoProducto: state.producto.chrCodigoProducto,
        chrRecomendado: state.isRecomendado,
        chrDestacadoMarca: state.isDestacadoMarca,
        chrDestacado: state.isDestacado,
        chrOferta: state.isOferta,
        chrRemate: state.isRemate,
        crud: CRUD.UPDATE.descripcion,
      });

      if (rpt.status === HttpStatus.HttpStatus_OK) {
        const json = await rpt.json();
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_OK) {
          handleEventFindProducto(state.producto.chrCodigoProducto,false);
        }
        if (json.response.status === SUCCESS_SERVER.SUCCES_SERVER_INFO) {
          dispatch({
            type: actionType.ERROR,
            server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_INFO },
          });
        }
      } else {
        dispatch({
          type: actionType.ERROR,
          server: { error: "", success: SUCCESS_SERVER.SUCCES_SERVER_ERROR },
        });
      }
    } else {
      dispatch({
        type: actionType.ERROR,
        server: {
          error: "Es necesario seleccionar un producto.",
          success: SUCCESS_SERVER.SUCCES_SERVER_WARRING,
        },
      });
    }
  }

  return (
    <>
      <div className="link-href">
        <Link to="/dashboardAdmin">
          <i className="fa fa-home" aria-hidden="true"></i>
          Panel de Control
        </Link>
      </div>
      <div className="prod-img-upload">
        <div className="prod-img-search">
          <label>Producto&nbsp;&nbsp;:&nbsp;</label>
          <input
            type="text"
            className="form-control"
            value={chrCodigoProducto}
            onChange={(e) => handleEventFilterProducto(e.target.value)}
          ></input>
          <button
            className=" btn btn-primary fa fa-search"
            onClick={() => handleEventFilterProducto(chrCodigoProducto)}
          ></button>
          {state.producto.chrCodigoProducto === "" ? (
            ""
          ) : (
            <>
              &nbsp;&nbsp;&nbsp;&nbsp;{state.producto.familia.vchDescripcion}
              &nbsp;&nbsp;{chrCodigoProducto}&nbsp;&nbsp;
              {state.producto.vchDescripcion}
            </>
          )}
       
          {state.diplayFilter===true?<> <div className="prod-img-search-float">
            {state.listaFilterProducto}
          </div></>:<></>}
         
        </div>
        <div className="prod-img-search-tab">
          <ul className="nav nav-tabs">
            <li
              className="nav-item"
              onClick={() => setTabsIndex(_TabsIndex.TABS_IMAGEN)}
            >
              <span
                className={
                  tabsIndex === _TabsIndex.TABS_IMAGEN
                    ? "nav-link active"
                    : "nav-link"
                }
                aria-current="page"
              >
                Imagen
              </span>
            </li>
            <li
              className="nav-item"
              onClick={() => setTabsIndex(_TabsIndex.TABS_ATRIBUTO)}
            >
              <span
                className={
                  tabsIndex === _TabsIndex.TABS_ATRIBUTO
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Atributo
              </span>
            </li>

            <li
              className="nav-item"
              onClick={() => setTabsIndex(_TabsIndex.TABS_REPORTE)}
            >
              <span
                className={
                  tabsIndex === _TabsIndex.TABS_REPORTE
                    ? "nav-link active"
                    : "nav-link"
                }
              >
                Reporte
              </span>
            </li>
          </ul>
        </div>
        {tabsIndex === _TabsIndex.TABS_IMAGEN ? (
          <div className="prod-img-search-det">
            <div className="prod-img-search-row">
              <table>
                <thead>
                  <tr>
                    <td
                      style={{
                        width: "5%",
                        textAlign: "center",
                        fontWeight: "bold",
                        height: 45,
                      }}
                    >
                      Codigo
                    </td>
                    <td
                      style={{
                        width: "20%",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Imagen
                    </td>
                    <td
                      style={{
                        width: "20%",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Nombre
                    </td>
                    <td
                      style={{
                        width: "20%",
                        textAlign: "center",
                        fontWeight: "bold",
                      }}
                    >
                      Predeterminado
                    </td>
                  </tr>
                </thead>
                <tbody>{state.rowsProductoImageHtml}</tbody>
              </table>
            </div>
            <div className="prod-img-search-row2">
              <div className="producto-card">
                <div className="prod-card-row prod-card-row-center">
                  <input
                    type="file"
                    accept=".png"
                    className="form-ctrl form-ctrl-lg"
                    value={file}
                    onChange={handleEnventReadFile}
                    ref={inputFile}
                  ></input>
                  <button
                    className="btn btn-primary fa fa-upload btn-file"
                    onClick={(e) => {
                      inputFile.current && inputFile.current.click();
                    }}
                  >
                    &nbsp;Seleccionar Imagen
                  </button>
                </div>
                <div className="prod-card-row">
                  <label>Código</label>
                  <div>{state.productoImangen.chrCodigoProducto}</div>

                  <label>Predeterminado</label>
                  <div>
                    <input
                      type="checkbox"
                      checked={
                        state.productoImangen.chrPredeterminado === "1"
                          ? true
                          : false
                      }
                      onChange={(e) =>
                        handleEventChangePredeterminado(
                          state.productoImangen,
                          e.target.checked
                        )
                      }
                    ></input>
                  </div>
                </div>
                <div className="prod-card-row">
                  <label>Tipo</label>
                  <div>{state.productoImangen.chrType}</div>

                  <label>Nombre</label>
                  <div>{state.productoImangen.chrNombre}</div>
                </div>
                <div className="prod-card-row row-img row-center">
                  {state.productoImangen.chrSrcImagen === "" ? (
                    ""
                  ) : (
                    <img
                      src={
                        "data:image/png;base64," +
                        state.productoImangen.chrSrcImagen
                      }
                      alt={state.productoImangen.chrNombre}
                    ></img>
                  )}
                </div>
                <hr />
                <div className="prod-card-row row-center">
                  <button
                    className="btn btn-primary  fa fa-save"
                    title="Editar"
                    onClick={handleEventGuardarProducto}
                    disabled={
                      state.productoImangen.crud.codigoCrud ===
                        CRUD.INSERT.codigoCrud ||
                      state.productoImangen.crud.codigoCrud ===
                        CRUD.UPDATE.codigoCrud
                        ? false
                        : true
                    }
                  >
                    &nbsp;Guardar
                  </button>
                  <button
                    className="btn btn-primary  fa fa-trash"
                    title="Eliminar"
                    onClick={handleEventEliminarProducto}
                    disabled={
                      state.productoImangen.crud.codigoCrud ===
                        CRUD.DELETE.codigoCrud ||
                      state.productoImangen.crud.codigoCrud ===
                        CRUD.UPDATE.codigoCrud
                        ? false
                        : true
                    }
                  >
                    &nbsp;Eliminar
                  </button>
                  <button
                    className="btn btn-primary  fa fa-eraser"
                    title="Limpiar"
                    onClick={handleEventLimpiarProducto}
                  >
                    &nbsp;Limpiar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {tabsIndex === _TabsIndex.TABS_ATRIBUTO ? (
          <div className="prod-img-search-det ">
            <div className="prod-img-search-row tab2">
              <div className="prod-card-row-cat">
                <label>Atributo</label>
                <select
                  className="form-control"
                  name="chrAtributo"
                  value={state.numCodigoCaracteristica}
                  onChange={(e) =>
                    dispatch({
                      type: actionType.SET_CODIGO_CARACTERISTICA,
                      numCodigoCaracteristica: e.target.value,
                    })
                  }
                >
                  <option value="0">-- por favor, seleccione --</option>
                  {state.rowsAtributo}
                </select>
                <label>Valor</label>
                <input
                  type="text"
                  className="form-control"
                  value={state.chrValue}
                  onChange={(e) =>
                    dispatch({
                      type: actionType.SET_VALUE_CARACTERISTICA,
                      chrValue: e.target.value,
                    })
                  }
                ></input>

                <button
                  className="btn btn-primary  fa fa-plus"
                  title="Guardar"
                  onClick={() =>
                    handleEventGuardarProductoAtributo(
                      0,
                      state.producto.chrCodigoProducto,
                      state.numCodigoCaracteristica,
                      state.chrValue,
                      CRUD.INSERT
                    )
                  }
                >
                  &nbsp;Adicionar
                </button>
              </div>
              <hr />
              <div className="prod-img-search-row prod-img-search-table">
                <table>
                  <thead>
                    <tr>
                      <td
                        style={{
                          width: "5%",
                          textAlign: "center",
                          fontWeight: "bold",
                          height: 45,
                        }}
                      >
                        Codigo
                      </td>
                      <td
                        style={{
                          width: "20%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Atributo
                      </td>
                      <td
                        style={{
                          width: "20%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Valor
                      </td>
                      <td
                        style={{
                          width: "5%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Acciones
                      </td>
                    </tr>
                  </thead>
                  <tbody>{state.rowsProductoAtributoHtml}</tbody>
                </table>
              </div>
            </div>
            <div className="prod-img-search-row2">
              <div className="producto-card">
                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Es Destacado?</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.isDestacado === "1" ? true : false}
                      onChange={(e) =>
                        dispatch({
                          type: actionType.SET_DESTACADO,
                          isDestacado: e.target.checked ? "1" : "0",
                        })
                      }
                    ></input>
                  </div>
                  <div className="div-row-1">
                    <label>Es Recomendado?</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.isRecomendado === "1" ? true : false}
                      onChange={(e) =>
                        dispatch({
                          type: actionType.SET_RECOMENDADO,
                          isRecomendado: e.target.checked ? "1" : "0",
                        })
                      }
                    ></input>
                  </div>
                </div>
                <div className="prod-card-row">
                  <div className="div-row-1">
                    {" "}
                    <label>Esta en Oferta?</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.isOferta === "1" ? true : false}
                      onChange={(e) =>
                        dispatch({
                          type: actionType.SET_OFERTA,
                          isOferta: e.target.checked ? "1" : "0",
                        })
                      }
                    ></input>
                  </div>
                  <div className="div-row-1">
                    <label>Esta en Remate?</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.isRemate === "1" ? true : false}
                      onChange={(e) =>
                        dispatch({
                          type: actionType.SET_REMATE,
                          isRemate: e.target.checked ? "1" : "0",
                        })
                      }
                    ></input>
                  </div>
                </div>
                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Es destacado en marca?</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.isDestacadoMarca === "1" ? true : false}
                      onChange={(e) =>
                        dispatch({
                          type: actionType.SET_DESTACADO_MARCA,
                          isDestacadoMarca: e.target.checked ? "1" : "0",
                        })
                      }
                    ></input>
                  </div>
                </div>
                <hr />
                <div className="prod-card-row row-right ">
                  <button
                    className="btn btn-primary  fa fa-save"
                    title="Guardar"
                    onClick={(e) => handleEventGuardarCategoria()}
                  >
                    &nbsp;Guardar
                  </button>
                </div>
              </div>
            </div>
          </div>
        ) : (
          ""
        )}
        {tabsIndex === _TabsIndex.TABS_REPORTE ? (
          <>
            <div className="prod-img-search-row-reporte">
              <div className="prod-img-search-row-reporte-filter">
                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Filtrar solo:</label>
                  </div>
                </div>
                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Destacado:</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.filterReporte.isDestacado}
                      onChange={(e) => {
                        dispatch({
                          type: actionType.SET_DESTACADO_FILTER,
                          isDestacado: e.target.checked,
                        });
                        let _filter = {
                          isDestacado: e.target.checked,
                          isRecomendado: state.filterReporte.isRecomendado,
                          isOferta: state.filterReporte.isOferta,
                          isRemate: state.filterReporte.isRemate,
                          isDestacadoMarca:
                            state.filterReporte.isDestacadoMarca,
                        };
                        handleLoadReporte(_filter);
                      }}
                    ></input>
                  </div>
                </div>

                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Recomendado:</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.filterReporte.isRecomendado}
                      onChange={(e) => {
                        dispatch({
                          type: actionType.SET_RECOMENDADO_FILTER,
                          isRecomendado: e.target.checked,
                        });
                        let _filter = {
                          isDestacado: state.filterReporte.isDestacado,
                          isRecomendado: e.target.checked,
                          isOferta: state.filterReporte.isOferta,
                          isRemate: state.filterReporte.isRemate,
                          isDestacadoMarca:
                            state.filterReporte.isDestacadoMarca,
                        };
                        handleLoadReporte(_filter);
                      }}
                    ></input>
                  </div>
                </div>

                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Oferta:</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.filterReporte.isOferta}
                      onChange={(e) => {
                        dispatch({
                          type: actionType.SET_OFERTA_FILTER,
                          isOferta: e.target.checked,
                        });
                        let _filter = {
                          isDestacado: state.filterReporte.isDestacado,
                          isRecomendado: state.filterReporte.isRecomendado,
                          isOferta: e.target.checked,
                          isRemate: state.filterReporte.isRemate,
                          isDestacadoMarca:
                            state.filterReporte.isDestacadoMarca,
                        };
                        handleLoadReporte(_filter);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Remate:</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.filterReporte.isRemate}
                      onChange={(e) => {
                        dispatch({
                          type: actionType.SET_REMATE_FILTER,
                          isRemate: e.target.checked,
                        });
                        let _filter = {
                          isDestacado: state.filterReporte.isDestacado,
                          isRecomendado: state.filterReporte.isRecomendado,
                          isOferta: state.filterReporte.isOferta,
                          isRemate: e.target.checked,
                          isDestacadoMarca:
                            state.filterReporte.isDestacadoMarca,
                        };
                        handleLoadReporte(_filter);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="prod-card-row">
                  <div className="div-row-1">
                    <label>Destacado en marca:</label>
                  </div>
                  <div className="div-row-2">
                    <input
                      type="checkbox"
                      checked={state.filterReporte.isDestacadoMarca}
                      onChange={(e) => {
                        dispatch({
                          type: actionType.SET_DESTACADO_MARCA_FILTER,
                          isDestacadoMarca: e.target.checked,
                        });
                        let _filter = {
                          isDestacado: state.filterReporte.isDestacado,
                          isRecomendado: state.filterReporte.isRecomendado,
                          isOferta: state.filterReporte.isOferta,
                          isRemate: state.filterReporte.isRemate,
                          isDestacadoMarca: e.target.checked,
                        };
                        handleLoadReporte(_filter);
                      }}
                    ></input>
                  </div>
                </div>
                <div className="prod-card-row">
                  <div className="div-row-1">
                    <ReactHTMLTableToExcel
                      id="table-xls1"
                      className="btn btn-primary"
                      table="table-xls"
                      filename="Reporte"
                      sheet="Reporte"
                      buttonText="Exportar"
                    ></ReactHTMLTableToExcel>
                  </div>
                </div>
              </div>
              <hr />
              <div className="tbl-rpt-display">
                <table id="table-xls">
                  <thead>
                    <tr>
                      <td
                        style={{
                          width: "13%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Codigo
                      </td>

                      <td
                        style={{
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Descripcion
                      </td>
                      <td
                        style={{
                          width: "8%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Marca
                      </td>
                      <td
                        style={{
                          width: "8%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Destacado
                      </td>
                      <td
                        style={{
                          width: "8%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Oferta
                      </td>

                      <td
                        style={{
                          width: "8%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Recomendado
                      </td>
                      <td
                        style={{
                          width: "8%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Remate
                      </td>
                      <td
                        style={{
                          width: "12%",
                          textAlign: "center",
                          fontWeight: "bold",
                        }}
                      >
                        Destacado en Marca
                      </td>
                    </tr>
                  </thead>
                  <tbody>{state.rowsReporte}</tbody>
                </table>
              </div>{" "}
            </div>
          </>
        ) : (
          ""
        )}
      </div>

      <ServerException server={state.server}></ServerException>
    </>
  );
}
const _TabsIndex = {
  TABS_IMAGEN: 0,
  TABS_ATRIBUTO: 1,
  TABS_REPORTE: 2,
};
let actionType = {
  chrCodigoProducto: "chrCodigoProducto",
  LIST_FORMAT: "LIST_FORMAT",
  SET_PRODUCTO: "SET_PRODUCTO",
  ERROR: "ERROR",
  SET_DESTACADO: "SET_DESTACADO",
  SET_RECOMENDADO: "SET_RECOMENDADO",
  SET_OFERTA: "SET_OFERTA",
  SET_REMATE: "SET_REMATE",
  LIST_ATRIBUTO: "LIST_ATRIBUTO",
  LIST_PRODUCTO_ATRIBUTO: "LIST_PRODUCTO_ATRIBUTO",
  SET_DESTACADO_MARCA: "SET_DESTACADO_MARCA",
  SET_CODIGO_CARACTERISTICA: "SET_CODIGO_CARACTERISTICA",
  SET_VALUE_CARACTERISTICA: "SET_VALUE_CARACTERISTICA",
  SET_RESET: "SET_RESET",
  LST_REPORTE: "LST_REPORTE",

  SET_DESTACADO_FILTER: "SET_DESTACADO_FILTER",
  SET_RECOMENDADO_FILTER: "SET_RECOMENDADO_FILTER",
  SET_OFERTA_FILTER: "SET_OFERTA_FILTER",
  SET_REMATE_FILTER: "SET_REMATE_FILTER",
  SET_DESTACADO_MARCA_FILTER: "SET_DESTACADO_MARCA_FILTER",
  SET_FILTER: "SET_FILTER",
};
const reducer = (state, action) => {
  let _filterReporte = state.filterReporte;
  switch (action.type) {
    case actionType.chrCodigoProducto:
      return {
        ...state,
        chrCodigoProducto: action.chrCodigoProducto,
      };
    case actionType.LIST_FORMAT:
      return {
        ...state,
        rowsProductoImage: action.rowsProductoImage,
        rowsProductoImageHtml: action.rowsProductoImageHtml,
        producto: action.producto,
        isDestacado: action.isDestacado,
        isRecomendado: action.isRecomendado,
        isOferta: action.isOferta,
        isRemate: action.isRemate,
        isDestacadoMarca: action.isDestacadoMarca,
      };
    case actionType.SET_PRODUCTO:
      return {
        ...state,
        productoImangen: action.productoImangen,
      };
    case actionType.ERROR:
      return {
        ...state,
        server: action.server,
      };
    case actionType.SET_REMATE:
      return {
        ...state,
        isRemate: action.isRemate,
      };
    case actionType.SET_DESTACADO:
      return {
        ...state,
        isDestacado: action.isDestacado,
      };
    case actionType.SET_OFERTA:
      return {
        ...state,
        isOferta: action.isOferta,
      };

    case actionType.SET_RECOMENDADO:
      return {
        ...state,
        isRecomendado: action.isRecomendado,
      };
    case actionType.SET_DESTACADO_MARCA:
      return {
        ...state,
        isDestacadoMarca: action.isDestacadoMarca,
      };
    case actionType.LIST_ATRIBUTO:
      return {
        ...state,
        rowsAtributo: action.rowsAtributo,
      };
    case actionType.LST_REPORTE:
      return {
        ...state,
        rowsReporte: action.rowsReporte,
      };

    case actionType.LIST_PRODUCTO_ATRIBUTO:
      return {
        ...state,
        rowsProductoAtributoHtml: action.rowsProductoAtributoHtml,
      };
    case actionType.SET_CODIGO_CARACTERISTICA:
      return {
        ...state,
        numCodigoCaracteristica: action.numCodigoCaracteristica,
      };
    case actionType.SET_VALUE_CARACTERISTICA:
      return {
        ...state,
        chrValue: action.chrValue,
      };
    case actionType.SET_RESET:
      return {
        ...state,
        chrValue: action.chrValue,
        numCodigoCaracteristica: action.numCodigoCaracteristica,
      };
    case actionType.SET_DESTACADO_FILTER:
      _filterReporte.isDestacado = action.isDestacado;
      return { ...state, filterReporte: _filterReporte };

    case actionType.SET_OFERTA_FILTER:
      _filterReporte.isOferta = action.isOferta;
      return { ...state, filterReporte: _filterReporte };

    case actionType.SET_REMATE_FILTER:
      _filterReporte.isRemate = action.isRemate;
      return { ...state, filterReporte: _filterReporte };

    case actionType.SET_RECOMENDADO_FILTER:
      _filterReporte.isRecomendado = action.isRecomendado;
      return { ...state, filterReporte: _filterReporte };

    case actionType.SET_DESTACADO_MARCA_FILTER:
      _filterReporte.isDestacadoMarca = action.isDestacadoMarca;
      return { ...state, filterReporte: _filterReporte };
    case actionType.SET_FILTER:
      return {
        ...state,
        listaFilterProducto: action.listaFilterProducto,
        diplayFilter: action.diplayFilter,
      };
    default:
      return state;
  }
};
