package com.ShopAutoPartsServices.Domain;

public class Provincia {
	String vchDescripcion,	chrCodigoUbigeo,chrCodigoProvincia;
	public Provincia() {}
	
	public Provincia(  String chrCodigoProvincia,String vchDescripcion) {
		 
		this.vchDescripcion = vchDescripcion;
		this.chrCodigoProvincia = chrCodigoProvincia;
	}

	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public Provincia setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

	public String getChrCodigoUbigeo() {
		return chrCodigoUbigeo;
	}

	public Provincia setChrCodigoUbigeo(String chrCodigoUbigeo) {
		this.chrCodigoUbigeo = chrCodigoUbigeo;
		return this;
	}

	public String getChrCodigoProvincia() {
		return chrCodigoProvincia;
	}

	public Provincia setChrCodigoProvincia(String chrCodigoProvincia) {
		this.chrCodigoProvincia = chrCodigoProvincia;
		return this;
	}
}
