package com.ShopAutoPartsServices.Enums;

public enum EstadoCotizacion {
	/*PROFORMA-->Cuando se genera y aun no se asigna el cliente
	 
	ASIGNADO-->Cuando el  cliente se asocia a una cotizacion que se encuentra en proforma
	CONFIRMADO-->La pasarela confirmo/Rechazo el pago del pedido(IPN)

	FACTURADO-->Realizando los documentos de la facturacion (Scheduled) 
	ANULADO-->Anulado Ejemplo:Intento de fraude -->por verificar*/
	PROFORMA,ASIGNADO,CONFIRMADO,FACTURADO,ANULADO
}
