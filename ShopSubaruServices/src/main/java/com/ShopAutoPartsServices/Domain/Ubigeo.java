package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.UbigeoTipo;

public class Ubigeo {
	String chrCodigoDepartamento,chrCodigoProvincia,chrCodigoDistrito,vchDescripcion,vchCodigoPostal;
	UbigeoTipo ubigeoTipo=UbigeoTipo.DEPARTAMENTO;
	public String getChrCodigoDepartamento() {
		return chrCodigoDepartamento;
	}
	public Ubigeo setChrCodigoDepartamento(String chrCodigoDepartamento) {
		this.chrCodigoDepartamento = chrCodigoDepartamento;
		return this;
	}
	public String getChrCodigoProvincia() {
		return chrCodigoProvincia;
	}
	public Ubigeo setChrCodigoProvincia(String chrCodigoProvincia) {
		this.chrCodigoProvincia = chrCodigoProvincia;
		return this;
	}
	public String getChrCodigoDistrito() {
		return chrCodigoDistrito;
	}
	public Ubigeo setChrCodigoDistrito(String chrCodigoDistrito) {
		this.chrCodigoDistrito = chrCodigoDistrito;
		return this;
	}
	public String getVchDescripcion() {
		return vchDescripcion;
	}
	public Ubigeo setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}
	public String getVchCodigoPostal() {
		return vchCodigoPostal;
	}
	public Ubigeo setVchCodigoPostal(String vchCodigoPostal) {
		this.vchCodigoPostal = vchCodigoPostal;
		return this;
	}
	public UbigeoTipo getUbigeoTipo() {
		return ubigeoTipo;
	}
	public Ubigeo setUbigeoTipo(UbigeoTipo ubigeoTipo) {
		this.ubigeoTipo = ubigeoTipo;
		return this;
	}
	@Override
	public String toString() {
		return "Ubigeo [chrCodigoDepartamento=" + chrCodigoDepartamento + ", chrCodigoProvincia=" + chrCodigoProvincia
				+ ", chrCodigoDistrito=" + chrCodigoDistrito + ", vchDescripcion=" + vchDescripcion
				+ ", vchCodigoPostal=" + vchCodigoPostal + ", ubigeoTipo=" + ubigeoTipo + "]";
	}
	
}
