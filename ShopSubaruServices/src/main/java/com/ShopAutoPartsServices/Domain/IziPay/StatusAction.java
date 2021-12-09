package com.ShopAutoPartsServices.Domain.IziPay;

public enum StatusAction {
FACTURAR/*Proceso que indica que se generaran documentos de facturacion*/,
FACTURADO_EN_ERP/*Proceso que indica se realizo la generacion de documentos en el ERP */,
COTIZACION_CANCELADA/*Proceso que indica se realizo la generacion de documentos en el ERP*/,
FACTURACION_CANCELADA/*No genera facturas el pago a sido cancelado*/,
ARMANDO_COMPRA/*No genera facturas el pago a sido cancelado*/,
PROCESANDO/**/
}

