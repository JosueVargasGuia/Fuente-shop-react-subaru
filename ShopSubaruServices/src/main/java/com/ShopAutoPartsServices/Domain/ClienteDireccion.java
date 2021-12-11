package com.ShopAutoPartsServices.Domain;

public class ClienteDireccion {
	int numCodigoCliente;// NUMBER NOT NULL,
	int numCodigoDireccion;// NUMBER NOT NULL,
	Direccion direccion;
	public ClienteDireccion() {}
	public Direccion getDireccion() {
		return direccion;
	}

	public ClienteDireccion setDireccion(Direccion direccion) {
		this.direccion = direccion;
		return this;
	}

	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}

	public ClienteDireccion setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}

	public int getNumCodigoDireccion() {
		return numCodigoDireccion;
	}

	public ClienteDireccion setNumCodigoDireccion(int numCodigoDireccion) {
		this.numCodigoDireccion = numCodigoDireccion;
		return this;
	}

}
