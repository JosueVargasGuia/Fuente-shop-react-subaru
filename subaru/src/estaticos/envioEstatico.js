import React from 'react';
import './statico.css'
import { Link } from 'react-router-dom';

export default function EnvioEstatico() {
    return (<div className="titulo-div">
        <Link to="/shop">Inicio</Link>{'  '}/{'  '} Envío
        <h3>Envío</h3>

        <div className="titulo-div-contenido">
            <br />
            <p className="titulo">¿CUÁNDO SE APLICAN ESTAS CONDICIONES DE ENTREGA?</p>
            <p className="contenido">Estas Condiciones de Entrega se aplican a todas las ofertas y contratos relacionados con la venta y suministro de productos por parte de eanet auto parts. Cuando usted encargue cualquier producto en nuestro sitio web eanet auto parts (www.eanetautoparts.pe/shop) o en cualquier página web directamente conectada con nuestro sitio web (Sitio Web), o acepte una oferta de eanet auto parts, su aceptación de las Condiciones de Entrega durante el proceso de pedido constituye su aceptación de estas Condiciones de Entrega. Sólo será posible desviarse de estas Condiciones de Entrega si eanet auto parts muestra su conformidad por escrito.</p>
            <p className="titulo">ENTREGA</p>
            <p className="contenido">
                EANET auto parts realizará la entrega en la dirección provista por usted dentro del territorio Peruano. eanet auto parts sólo puede realizar la entrega en un domicilio residencial o de oficina en que haya ocupantes que puedan recibir la mercadería. Las entregas se realizarán en días hábiles, excepto los días festivos. Todas las entregas irán acompañadas de un acuse de recibo.
        </p> 
            <p className="contenido">
                Los periodos de entrega son indicativos y, por consiguiente, no se consideran fechas límite estrictas. El mero hecho de haber excedido un periodo de entrega no le dará ningún derecho de compensación. Para ello, deberá enviarse a eanet auto parts una notificación de incumplimiento.
        </p> 
            <p className="contenido">
                A partir del 1 de febrero del 2019 todos los pedidos cuyo valor monetario sea menor al mínimo establecido por zona (después de descuentos) pagarán un adicional referido al Costo por Envío. Este monto adicional depende de la zona de envío. Los pedidos que superen el monto mínimo, no pagarán este adicional y el envío será gratis. Es caso de generarse una devolución, este cobro no es reembolsable.
        </p> 
            <p className="contenido">
                EANET auto parts entrega únicamente a las ciudades listadas a continuación. Estamos trabajando para añadir más ciudades a nuestra red.
        </p>
            <table>
                <tbody>
                    <tr>
                        <td>ANCON</td>
                        <td>COMAS</td>
                        <td>MAGDALENA</td>
                        <td>SAN LUIS</td>
                    </tr>
                    <tr>
                        <td>ATE</td>
                        <td>EL AGUSTINO</td>
                        <td>MIRAFLORES</td>
                        <td>SAN MARTIN DE PORRES</td>
                    </tr>
                    <tr>
                        <td>BARRANCO</td>
                        <td>INDEPENDENCIA</td>
                        <td>PACHACAMAC</td>
                        <td>SAN MIGUEL</td>
                    </tr>
                    <tr>
                        <td>BREÑA</td>
                        <td>JESUS MARIA</td>
                        <td>PUEBLO LIBRE</td>
                        <td>SANTA ANITA</td>
                    </tr>
                    <tr>
                        <td>CALLAO</td>
                        <td>LA MOLINA</td>
                        <td>PUENTE PIEDRA</td>
                        <td>SANTA ROSA</td>
                    </tr>
                    <tr>
                        <td>CARABAYLLO</td>
                        <td>LA VICTORIA</td>
                        <td>RIMAC</td>
                        <td>SURCO</td>
                    </tr>
                    <tr>
                        <td>CERCADO DE LIMA</td>
                        <td>LINCE</td>
                        <td>SAN BORJA</td>
                        <td>SURQUILLO</td>
                    </tr>
                    <tr>
                        <td>CHACLACAYO</td>
                        <td>LOS OLIVOS</td>
                        <td>SAN ISIDRO</td>
                        <td>VENTANILLA</td>
                    </tr>
                    <tr>
                        <td>CHORRILLOS</td>
                        <td>LURIGANCHO CHOSICA</td>
                        <td>SAN JUAN DE LURIGANCHO</td>
                        <td>VILLA EL SALVADOR</td>
                    </tr>
                    <tr>
                        <td>CIENEGUILLA</td>
                        <td>LURIN</td>
                        <td>SAN JUAN DE MIRAFLORES</td>
                        <td>VILLA MARIA DEL TRIUNFO</td>
                    </tr></tbody>
            </table>

            <p className="contenido">
                El servicio no comprende atención en zonas peligrosas identificadas por nuestro proveedor, las cuales se detallan en el siguiente link: <a className="link" href="https://chazki.com/zonaspeligrosas" target="_blanck">https://chazki.com/zonaspeligrosas</a>.
            </p>
            <p className="titulo">Servicios de Envío</p>
            <p className="titulo">Regular(Servicio Continuo)</p>
            <p className="contenido">Los horarios para entregas de este servicio son:</p>
            <ul>
                <li><p className="contenido">De Lunes a Viernes: Entre 09:00 y 21:00hrs</p></li>
                <li><p className="contenido">Sábados: Entre 09:00 y 18:00hrs</p></li>
            </ul>

            <p className="contenido">Este servicio contempla uno (01) intentos de entrega.</p>
            <p className="titulo">Programado(Servicio Condicional)</p>
            <p className="contenido">Los rangos horarios para entregas de Lunes a Viernes son:</p>
            <ul>
                <li><p className="contenido">Programado 1: Entre 09:00 y 13:00hrs</p></li>
                <li><p className="contenido">Programado 2: Entre 13:00 y 17:00hrs</p></li>
                <li><p className="contenido">Programado 3: Entre 17:00 y 21:00hrs</p></li>
            </ul>
            <p className="contenido">Los días Sábado solo se atenderán pedidos en el rango horario Programado 1.</p>
            <ul>
                <li><p className="contenido">Este servicio un (01) intento de entrega.</p></li>
            </ul>
            <br />
        </div>
    </div>)
}