package com.ShopAutoPartsServices.FE.Enums;

//Cat�logo No. 51: C�digo de tipo de factura
public enum FeCatalogo51 {

	VENTA_INTERNA("0101"),
	OPERACION_SUJETA_A_DETRACCION("1001");
	 
	public final String codigo;
	FeCatalogo51( String codigo){
		this.codigo = codigo;
	}
	
}
