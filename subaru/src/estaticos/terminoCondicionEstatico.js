import React, { useState } from 'react';
import './statico.css'
import { Link } from 'react-router-dom';
export default function TerminoCondicionEstatico(props) {
    const [srcLogo] = useState(window.location.origin + '/marcas/logo.jpg');
    return (<div className="titulo-div">
        {props.linkNavegacion==="CarritoPayment"?'':<><Link to="/shop">Inicio</Link>{'  '}/{'  '}Términos y condiciones</>}
        {props.linkNavegacion==="CarritoPayment"?'':<h3>Términos y condiciones</h3>}
        <div className="titulo-div-contenido">
            <br />
            {props.linkNavegacion==="CarritoPayment"?'': <p className="titulo">Términos y condiciones de uso</p>}
            <p className="contenido">Lea detenidamente estas condiciones de entrega antes de realizar pedidos de productos en la tienda online de eanet auto parts.</p>
            <img src={srcLogo} alt=""></img>
            <p className="contenido">El proveedor en EANET GLOBAL SAC, (en adelante eanet auto parts) sociedad legalmente constituida bajo las leyes de la República del Perú, RUC N°  20604770476, AV. república de Panamá Nro. 4275 Urb. Cercado Lima - Lima - Surquillo, Departamento de Lima, Provincia y Distrito,  República del Perú.</p>
            <br />
            <p className="titulo">¿CUÁNDO SE APLICAN ESTAS CONDICIONES DE ENTREGA?</p>

            <p className="contenido">Estas Condiciones de Entrega se aplican a todas las ofertas y contratos relacionados con la venta y suministro de productos por parte de eanet auto parts. Cuando usted encargue cualquier producto en nuestro sitio web eanet auto parts(https://eanetautoparts.pe/shop) o en cualquier página web directamente conectada con nuestro sitio web (Sitio Web), o acepte una oferta de eanet auto parts, su aceptación de las Condiciones de Entrega durante el proceso de pedido constituye su aceptación de estas Condiciones de Entrega. Sólo será posible desviarse de estas Condiciones de Entrega si eanet auto parts muestra su conformidad por escrito.</p>


            <p className="titulo">NUESTRAS OFERTAS Y PRECIOS</p>

            <p className="contenido">Las ofertas publicadas por eanet auto parts en nuestro Sitio Web serán cumplidas por eanet auto parts. Sin Embargo,eanet auto parts no quedará obligada por errores manifiestos de transcripción. Se advierte que es posible que se produzcan variaciones pequeñas de color u otro tipo de variaciones menores en productos, como consecuencia de las diferentes tecnologías de adquisición de imagen y exhibición, o por otras razones técnicas.</p>
            <p className="contenido">Los precios consignados incluyen IGV. Los precios se expresan en nuevos soles y dólares estadounidenses. eanet auto parts se reserva el derecho de hacer cambios en los precios y el producto con anterioridad a un pedido realizado por usted. eanet auto parts se reserva el derecho a cambiar, limitar o dar por terminadas ofertas especiales o promociones en cualquier momento, siempre que así haya sido previamente informado a los consumidores desde su inicio.</p>
            <p className="contenido">Ten en cuenta que tu compra se confirma automáticamente en nuestra página web.</p>

            <p className="titulo">FACTURACIÓN</p>

            <p className="contenido">A partir del 01 de diciembre del 2019, las boletas y facturas se enviarán al cliente de manera electrónica al email que ingresaron en los datos del pedido durante el proceso de la compra . Recibirán un email con un link para poder visualizar y descargar los documentos en mención.</p>

            <p className="contenido">eanet auto parts  solo emite comprobantes de pago en dólares, en caso de realizar pedidos y pagos en soles este se convertirá a dólares con el tipo de cambio (referencial).</p>

            <p className="contenido resaltar">*eanet auto parts se reserva el derecho a modificar el tipo de cambio en cualquier momento.</p>

            <p className="contenido">En caso se quiera validar que la boleta / factura ha sido aceptada por la SUNAT, te recomendamos ingresar aquí <a className="link" href="https://consulta.ose.pe/" target="_blanck">https://consulta.ose.pe/</a>.</p>

            <p className="contenido">Un cliente no podrá solicitar un cambio de documento (de boleta a factura o viceversa) una vez emitido dicho documento. El cliente deberá solicitar correctamente el documento que necesitara como comprobante de compra:</p>

            <p className="contenido">De acuerdo al reglamento de Comprobantes de Pago aprobado por la Resolución de Superintendencia N° 007-99 / SUNAT (RCP) y el Texto Único Ordenado de la Ley del Impuesto General a las Ventas e Impuesto Selectivo al Consumo, aprobado mediante Decreto Supremo N° 055-99-EF y normas modificatorias (TUO del IGV) y conforme al Informe N° 033-2002-SUNAT/K00000 DEL 23/01/2002, se concluye:  “No existe ningún procedimiento vigente que permita el canje de boletas de venta por facturas, más aún las notas de crédito no se encuentran previstas para modificar al adquirente o usuario que figura en el comprobante de pago original”. </p>

            <p className="contenido">Asimismo, un cliente solo podrá solicitar el cambio de información (razón social, nombre, número de identificación, RUC o dirección) dentro de las 72 horas de haberse realizado el envío del documento electrónico.</p>

            <p className="titulo">PAGO EN LÍNEA</p>
            <p className="contenido">Usted garantiza que al utilizar el sistema de pago en línea está autorizado a utilizar la tarjeta de crédito o débito para el pago que está realizando. No nos hacemos responsables si el pago es rechazado o negado por el emisor de la tarjeta por cualquier motivo. Si el emisor de la tarjeta rechaza el pago no tenemos ninguna obligación de informar sobre este hecho al titular de la tarjeta o al usuario. En ningún caso nuestros proveedores o cualquier otro tercero será responsable (en la medida en que lo permita la legislación) por cualquier pérdida o daño que surja del uso, de la incapacidad de uso, o de las consecuencias del uso de este sistema, de cualquier página web vinculada a esta, o de los materiales o información contenida.</p>


            <p className="titulo">ENTREGA</p>
            <p className="contenido">eanet auto parts realizará la entrega en la dirección provista por usted dentro del territorio Peruano. eanet auto parts sólo puede realizar la entrega en un domicilio residencial o de oficina en que haya ocupantes que puedan recibir la mercadería. Las entregas se realizarán en días hábiles, excepto los días festivos. Todas las entregas irán acompañadas de un acuse de recibo.</p>
            <p className="contenido">Los periodos de entrega son indicativos y, por consiguiente, no se consideran fechas límite estrictas. El mero hecho de haber excedido un periodo de entrega no le dará ningún derecho de compensación. Para ello, deberá enviarse a eanet auto parts su notificación de incumplimiento. </p>
            <p className="contenido">A partir del 1 de febrero del 2019 todos los pedidos cuyo valor monetario sea menor al mínimo establecido por zona (después de descuentos) pagarán un adicional referido al Costo por Envío. Este monto adicional depende de la zona de envío. Los pedidos que superen el monto mínimo, no pagarán este adicional y el envío será gratis. Es caso de generarse una devolución, este cobro no es reembolsable.</p>
            <p className="contenido">eanet auto parts entrega únicamente a las ciudades listadas a continuación. Estamos trabajando para añadir más ciudades a nuestra red.</p>
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
            <p className="titulo">Servicios de Envío</p><br />
            <p className="contenido">Los rangos horarios para entregas de Lunes a Viernes son:</p>
          
                <ul>
                    <li><p className="contenido">Programado 1: Entre 09:00 y 13:00hrs</p></li>
                    <li><p className="contenido">Programado 2: Entre 13:00 y 17:00hrs</p></li>
                    <li><p className="contenido">Programado 3: Entre 17:00 y 21:00hrs</p></li>
                </ul>
           
            <p className="contenido">Los días Sábado solo se atenderán pedidos en el rango horario Programado 1.</p>
            <p className="contenido">Este servicio un (01) intento de entrega.</p>

            <p className="titulo">Regular</p>
            <p className="contenido">Los horarios para entregas de este servicio son:</p>
            <ul>
                <li><p className="contenido">De Lunes a Viernes: Entre 09:00 y 21:00hrs</p></li>
                <li><p className="contenido">Sábados: Entre 09:00 y 18:00hrs</p></li>
            </ul> 
            <p className="contenido">Este servicio contempla dos (02) intentos de entrega.</p>
            <br />
        </div>
    </div>)
}