package com.ShopAutoPartsServices.FE.Enums;
//Cat�logo 15: C�digos -> Elementos adicionales en la Factura Electr�nica y/o Boleta de Venta
//Electr�nica
public enum FeCatalogo15 {
	
	CODIGO_BB_SS_SUJETOS_DETRACCION("3000"),
	NUMERO_CTA_BN("3001");
	public final String codigo;
	FeCatalogo15(String codigo) {
        this.codigo = codigo;
    }
}
