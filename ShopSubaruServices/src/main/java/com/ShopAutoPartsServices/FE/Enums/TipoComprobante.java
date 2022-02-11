package com.ShopAutoPartsServices.FE.Enums;

public enum TipoComprobante {

	FACTURA("A"),
	BOLETA("B"),
	NOTA_CREDITO("N");
	public final String codigo;
	TipoComprobante(String codigo){
		this.codigo = codigo;
	}
}
