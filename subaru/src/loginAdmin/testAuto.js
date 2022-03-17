/*https://webdesign.tutsplus.com/es/tutorials/bring-your-forms-up-to-date-with-css3-and-html5-validation--webdesign-4738 */
import { useReducer } from "react";
import "../styles/others/test.scss";

let actionType = {
  nombre: "nombre",
};
const reducer = (state, action) => {
  switch (action.type) {
    case actionType.nombre:
      return { ...state, nombre: action.nombre };

    default:
      return state;
  }
};
export default function TestAuto() {
  const [state, dispatch] = useReducer(reducer, { nombre: "" });
  function handleEventSumit(e) {
    e.preventDefault();
    if(e.target.checkValidity()){ // use can also use e.target.reportValidity
        // submitForm
      }
     
  }
  return (
    <div className="test-content">
      <form onSubmit={(e)=>handleEventSumit(e)}>
        <div className="test-content-form">
          <div className="form-row">
            <div className="form-row-label">Nombre:</div>
            <div className="form-row-input">
              <input
                type="text"
                name="nombre"
                placeholder="example"
                value={state.nombre}
                onChange={(e) =>{
                  dispatch({ type: actionType.nombre, nombre: e.target.value });
                  e.target.setCustomValidity("");}
                }
                required
                onInvalid={(e) => {
                  e.target.setCustomValidity("Ingrese el Nombreeee"); 
                }}
                 
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-row-label">Correo:</div>
            <div className="form-row-input">
              <input
                type="email"
                name="email"
                placeholder="example@example.com"
                required
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-row-label">WebSite:</div>
            <div className="form-row-input">
              <input
                type="url"
                name="website"
                placeholder="http://example.com/"
                required
              ></input>
            </div>
          </div>
          <div className="form-row">
            <div className="form-row-action">
              <button type="submit">Enviar</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
