import React from "react";
import { Link } from "react-router-dom";
export default   function SuccesPayment() {     
  
    return (<>
        <div>
            <div className="shop-success">
                <h4>Muchas gracias por su compra!</h4>
                <p>En breve recibirás un correo electrónico con el detalle de tu compra, también puedes visualizar el estado de tu compra desde <Link to="/dashboard">aquí</Link>.</p>
            </div>
        </div>
    </>)
}