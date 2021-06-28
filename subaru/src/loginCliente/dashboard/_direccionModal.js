import React from "react";
import { Modal } from 'react-bootstrap'
export default function DireccionModal(props) {

    return (<div>
        <Modal  {...props}
            size="lgsss"
            aria-labelledby="contained-modal-title-vcenter"
            centered={true} 
              >
            <Modal.Header closeButton>
                <Modal.Title id="contained-modal-title-vcenter">
                    Modal heading
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <h4>Centered Modal</h4>
                <p>
                    Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                    dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                    consectetur ac, vestibulum at eros.
        </p>
            </Modal.Body>
            <Modal.Footer>
                <button className="btn btn-primary" onClick={props.onHide}>Close</button>
            </Modal.Footer>
        </Modal>
    </div>)
}