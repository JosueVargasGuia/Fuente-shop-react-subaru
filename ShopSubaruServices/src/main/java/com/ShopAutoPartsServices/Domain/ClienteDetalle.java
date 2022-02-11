package com.ShopAutoPartsServices.Domain;

public class ClienteDetalle {
	int numCodigoClienteDetalle;// NUMBER NOT NULL,
	int numCodigoCliente;// NUMBER NOT NULL,
	String vchEmail1;// VARCHAR2(60 BYTE),


	public int getNumCodigoClienteDetalle() {
		return numCodigoClienteDetalle;
	}

	public ClienteDetalle setNumCodigoClienteDetalle(int numCodigoClienteDetalle) {
		this.numCodigoClienteDetalle = numCodigoClienteDetalle;
		return this;
	}

	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}

	public ClienteDetalle setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}

	public String getVchEmail1() {
		return vchEmail1;
	}

	public ClienteDetalle setVchEmail1(String vchEmail1) {
		this.vchEmail1 = vchEmail1;
		return this;
	}
	
}
