package com.ShopAutoPartsServices.FE.Enums;

public enum FeEncabezadoICB {
	
	CODIGO_TRIBUTO_BOLSA_PLASTICA("CodigoTributoBolsaPlastica"),
	MONTO_TRIBUTO_BOLSA_PLASTICA("MontoTributoBolsaPlastica"),
	MONTO_UNITARIO_BOLSA_PLASTICA("MontoUnitarioBolsaPlastica"),
	CANTIDAD_BOLSA_PLASTICA("CantidadBolsaPlastica");
	public final String codigo;
	FeEncabezadoICB(String codigo) {
	this.codigo = codigo;
	}
}
