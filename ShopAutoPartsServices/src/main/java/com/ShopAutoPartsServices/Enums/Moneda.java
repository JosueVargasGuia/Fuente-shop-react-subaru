package com.ShopAutoPartsServices.Enums;

public enum Moneda {
	DOLARES("1", "Dólares", "D", "$","USD","DOLARES AMERICANOS"), SOLES("2", "Soles", "S", "S/","PEN","SOLES.");

	String numCodigoMoneda, vchDescripcion, vchAbreviatura, vchSimbolo,codigoIso4217,vchAbreviaturaLetras;

	private Moneda(String numCodigoMoneda, String vchDescripcion, String vchAbreviatura, String vchSimbolo,String codigoIso4217,String vchAbreviaturaLetras) {
		this.numCodigoMoneda = numCodigoMoneda;
		this.vchDescripcion = vchDescripcion;
		this.vchAbreviatura = vchAbreviatura;
		this.vchSimbolo = vchSimbolo;
		this.codigoIso4217=codigoIso4217;
		this.vchAbreviaturaLetras=vchAbreviaturaLetras;
	}

	public String getNumCodigoMoneda() {
		return numCodigoMoneda;
	}

	public Moneda setNumCodigoMoneda(String numCodigoMoneda) {
		this.numCodigoMoneda = numCodigoMoneda;
		return this;
	}

	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public Moneda setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

	public String getVchAbreviatura() {
		return vchAbreviatura;
	}

	public Moneda setVchAbreviatura(String vchAbreviatura) {
		this.vchAbreviatura = vchAbreviatura;
		return this;
	}

	public String getVchSimbolo() {
		return vchSimbolo;
	}

	public Moneda setVchSimbolo(String vchSimbolo) {
		this.vchSimbolo = vchSimbolo;
		return this;
	}

	public String getCodigoIso4217() {
		return codigoIso4217;
	}

	public Moneda setCodigoIso4217(String codigoIso4217) {
		this.codigoIso4217 = codigoIso4217;
		return this;
	}

	public String getVchAbreviaturaLetras() {
		return vchAbreviaturaLetras;
	}

	public Moneda setVchAbreviaturaLetras(String vchAbreviaturaLetras) {
		this.vchAbreviaturaLetras = vchAbreviaturaLetras;
		return this;
	}

}
