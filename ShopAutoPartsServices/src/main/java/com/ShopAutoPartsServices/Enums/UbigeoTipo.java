package com.ShopAutoPartsServices.Enums;

public enum UbigeoTipo {
	DEPARTAMENTO(0), PROVINCIA(1), DISTRITO(2);

	int codigo;

	private UbigeoTipo(int codigo) {
		this.codigo = codigo;
	}

	public int getCodigo() {
		return codigo;
	}

	public UbigeoTipo setCodigo(int codigo) {
		this.codigo = codigo;
		return this;
	}
	
}
