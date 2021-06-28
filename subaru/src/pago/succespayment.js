import { useLocation } from "react-router";
import queryString from 'query-string'
import { localStoreEnum } from "../service/ENUM";
export function Succespayment() {
    const { search } = useLocation()
    const values = queryString.parse(search)
    var kranswer = JSON.parse(values['kr-answer']);
    console.log(kranswer)
    console.log(kranswer.orderStatus)
    console.log(kranswer.orderDetails.orderId)
    if (kranswer.orderStatus === 'PAID') {
        localStorage.removeItem(localStoreEnum.COTIZACION);
    }
    return (<>
        <div>
            <div className="shop-success">
                <h4>Muchas gracias por su compra!</h4>
                <p>En breve recibirás un correo electrónico con el detalle de tu compra, también puedes visualizar el estado de tu compra desde aquí.</p>
            </div>
        </div>
    </>)
}