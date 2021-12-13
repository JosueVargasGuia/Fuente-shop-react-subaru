package com.ShopAutoPartsServices.Domain;

public class Caracteristica {
	String chrDescripcion;
	int numPosicion,numCodigoCaracteristica;
	public String getChrDescripcion() {
		return chrDescripcion;
	}
	public Caracteristica setChrDescripcion(String chrDescripcion) {
		this.chrDescripcion = chrDescripcion;
		return this;
	}
	public int getNumPosicion() {
		return numPosicion;
	}
	public Caracteristica setNumPosicion(int numPosicion) {
		this.numPosicion = numPosicion;
		return this;
	}
	public int getNumCodigoCaracteristica() {
		return numCodigoCaracteristica;
	}
	public Caracteristica setNumCodigoCaracteristica(int numCodigoCaracteristica) {
		this.numCodigoCaracteristica = numCodigoCaracteristica;
		return this;
	}

}
