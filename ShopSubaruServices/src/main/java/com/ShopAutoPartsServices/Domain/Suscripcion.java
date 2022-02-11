package com.ShopAutoPartsServices.Domain;

import java.util.Date;

public class Suscripcion {
	int numCodigoSuscripcion;// NUMBER,
	String vchEmail;// VARCHAR2(255 BYTE),
	String chrEstado;
	Date dteCreaccion;// DATE,
	Date dteModifiacion;// DATE
	Response response=new Response();
	public int getNumCodigoSuscripcion() {
		return numCodigoSuscripcion;
	}
	public Suscripcion setNumCodigoSuscripcion(int numCodigoSuscripcion) {
		this.numCodigoSuscripcion = numCodigoSuscripcion;
		return this;
	}
	public String getVchEmail() {
		return vchEmail;
	}
	public Suscripcion setVchEmail(String vchEmail) {
		this.vchEmail = vchEmail;
		return this;
	}
	public String getChrEstado() {
		return chrEstado;
	}
	public Suscripcion setChrEstado(String chrEstado) {
		this.chrEstado = chrEstado;
		return this;
	}
	public Date getDteCreaccion() {
		return dteCreaccion;
	}
	public Suscripcion setDteCreaccion(Date dteCreaccion) {
		this.dteCreaccion = dteCreaccion;
		return this;
	}
	public Date getDteModifiacion() {
		return dteModifiacion;
	}
	public Suscripcion setDteModifiacion(Date dteModifiacion) {
		this.dteModifiacion = dteModifiacion;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public Suscripcion setResponse(Response response) {
		this.response = response;
		return this;
	}
	
}
