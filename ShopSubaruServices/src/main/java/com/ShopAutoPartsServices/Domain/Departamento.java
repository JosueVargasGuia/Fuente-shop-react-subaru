package com.ShopAutoPartsServices.Domain;

public class Departamento {
	String vchDescripcion, chrCodigoUbigeo, chrCodigoDepartamento;
	public Departamento() {}
	
	public Departamento(  String chrCodigoDepartamento,String vchDescripcion) {	 
		this.vchDescripcion = vchDescripcion;		 
		this.chrCodigoDepartamento = chrCodigoDepartamento;
	}

	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public Departamento setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

	public String getChrCodigoUbigeo() {
		return chrCodigoUbigeo;
	}

	public Departamento setChrCodigoUbigeo(String chrCodigoUbigeo) {
		this.chrCodigoUbigeo = chrCodigoUbigeo;
		return this;
	}

	public String getChrCodigoDepartamento() {
		return chrCodigoDepartamento;
	}

	public Departamento setChrCodigoDepartamento(String chrCodigoDepartamento) {
		this.chrCodigoDepartamento = chrCodigoDepartamento;
		return this;
	}
}
