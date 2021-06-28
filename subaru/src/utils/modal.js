 
import { Modal } from "react-bootstrap";
  function ModalConfirmar(props) {
   
  return (
    <>
      <Modal
        className="modal-direccion"
        show={props.show}
        size="sm"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            {props.title}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>{props.mensaje}</div>
        </Modal.Body>
        <Modal.Footer>
        
          <button onClick={props.handleActionSi} className="btn btn-primary">
            Si
          </button>
          <button onClick={props.handleActionNo} className="btn btn-primary">
            No
          </button>
        </Modal.Footer>
      </Modal>
    </>
  );
} 
function ModalAlert(props) {
   
    return (
      <>
        <Modal
          className="modal-direccion"
          show={props.show}
          size="sm"
          aria-labelledby="contained-modal-title-vcenter"
          centered
        >
          <Modal.Header>
            <Modal.Title id="contained-modal-title-vcenter">
              {props.title}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>{props.mensaje}</div>
          </Modal.Body>
          <Modal.Footer>
          
            <button onClick={props.handleActionCerrar} className="btn btn-primary">
              Cerrar
            </button>
            
          </Modal.Footer>
        </Modal>
      </>
    );
  }
export{ModalConfirmar,ModalAlert}
 