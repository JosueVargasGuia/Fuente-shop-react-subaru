package com.ShopAutoPartsServices.FE.Enums;

public enum FePropiedadesAdicionales {
	
	NRO_LIN_DET("NroLinDet"),
	COD_CONTRIB("CodConTrib"),
	NOM_CONTRIB("NomConTrib"),
	VAL_CONTRIB("ValConTrib");
	
	public final String codigo;
	FePropiedadesAdicionales(String codigo) {
        this.codigo = codigo;
    }

}
