package com.ShopAutoPartsServices.Domain;

public class Familia {
	String chrCodigoFamilia, vchDescripcion;

	public Familia() {

	}

	public Familia(String chrCodigoFamilia) {
		super();
		this.chrCodigoFamilia = chrCodigoFamilia;
	}

	public Familia(String chrCodigoFamilia, String vchDescripcion) {
		super();
		this.chrCodigoFamilia = chrCodigoFamilia;
		this.vchDescripcion = vchDescripcion;
	}

	public String getChrCodigoFamilia() {
		return chrCodigoFamilia;
	}

	public Familia setChrCodigoFamilia(String chrCodigoFamilia) {
		this.chrCodigoFamilia = chrCodigoFamilia;
		return this;
	}

	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public Familia setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

}
