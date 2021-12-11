package com.ShopAutoPartsServices.FE.Enums;

public enum FeCargoDescuento {
	NRO_LIN_DET("NroLinDet"),
	IND_CARGO_DESCUENTO("IndCargoDescuento"),
	CODIGO_CARGO_DESCUENTO("CodigoCargoDescuento"),
	FACTOR_CARGO_DESCUENTO("FactorCargoDescuento"),
	MONTO_CARGO_DESCUENTO("MontoCargoDescuento"),
	MBASE_CARGO_DESCUENTO("MBaseCargoDescuento");

	public final String codigo;
    FeCargoDescuento(String codigo) {
        this.codigo = codigo;
    }

	

}
