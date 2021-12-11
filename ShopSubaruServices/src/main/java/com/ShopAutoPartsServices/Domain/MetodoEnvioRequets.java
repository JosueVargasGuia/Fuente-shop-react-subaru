package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.MetodoEnvio;
import com.ShopAutoPartsServices.Enums.Status;

public class MetodoEnvioRequets {
	Status status;
	String mensaje;
	int numCodigoCotizacionOnline;
	MetodoEnvio metodoEnvio=MetodoEnvio.RecojoAlmacen;
	int numCodigoDireccion;
	Response response = new Response();

	public Status getStatus() {
		return status;
	}

	public MetodoEnvioRequets setStatus(Status status) {
		this.status = status;
		return this;
	}

	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}

	public MetodoEnvioRequets setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
		return this;
	}

	public MetodoEnvio getMetodoEnvio() {
		return metodoEnvio;
	}

	public MetodoEnvioRequets setMetodoEnvio(MetodoEnvio metodoEnvio) {
		this.metodoEnvio = metodoEnvio;
		return this;
	}

	public int getNumCodigoDireccion() {
		return numCodigoDireccion;
	}

	public MetodoEnvioRequets setNumCodigoDireccion(int numCodigoDireccion) {
		this.numCodigoDireccion = numCodigoDireccion;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public MetodoEnvioRequets setResponse(Response response) {
		this.response = response;
		return this;
	}

	public String getMensaje() {
		return mensaje;
	}

	public MetodoEnvioRequets setMensaje(String mensaje) {
		this.mensaje = mensaje;
		return this;
	}

	@Override
	public String toString() {
		return "MetodoEnvioRequets [status=" + status + ", mensaje=" + mensaje + ", numCodigoCotizacionOnline="
				+ numCodigoCotizacionOnline + ", metodoEnvio=" + metodoEnvio + ", numCodigoDireccion="
				+ numCodigoDireccion + ", response=" + response + "]";
	}

 
	 

}
