package com.ShopAutoPartsServices.Domain;

public class Distrito {
	String vchDescripcion, chrCodigoUbigeo, chrCodigoDistrito;
	public Distrito() {}
	public Distrito(  String chrCodigoDistrito,String vchDescripcion) {
		 
		this.vchDescripcion = vchDescripcion;
		this.chrCodigoDistrito = chrCodigoDistrito;
	}
	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public Distrito setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

	public String getChrCodigoUbigeo() {
		return chrCodigoUbigeo;
	}

	public Distrito setChrCodigoUbigeo(String chrCodigoUbigeo) {
		this.chrCodigoUbigeo = chrCodigoUbigeo;
		return this;
	}

	public String getChrCodigoDistrito() {
		return chrCodigoDistrito;
	}

	public Distrito setChrCodigoDistrito(String chrCodigoDistrito) {
		this.chrCodigoDistrito = chrCodigoDistrito;
		return this;
	}

}
