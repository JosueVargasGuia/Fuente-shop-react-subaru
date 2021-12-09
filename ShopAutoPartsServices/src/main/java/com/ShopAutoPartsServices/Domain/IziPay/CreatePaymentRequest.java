package com.ShopAutoPartsServices.Domain.IziPay;

import com.ShopAutoPartsServices.Enums.MetodoEnvio;
import com.ShopAutoPartsServices.Enums.Moneda;

public class CreatePaymentRequest {
	int numCodigoCotizacionOnline;
	MetodoEnvio metodoEnvio;
	int numCodigoDireccion;
	String vchObservacion;
	Moneda moneda=Moneda.DOLARES;
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}

	public void setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
	}

	public MetodoEnvio getMetodoEnvio() {
		return metodoEnvio;
	}

	public void setMetodoEnvio(MetodoEnvio metodoEnvio) {
		this.metodoEnvio = metodoEnvio;
	}

	public int getNumCodigoDireccion() {
		return numCodigoDireccion;
	}

	public void setNumCodigoDireccion(int numCodigoDireccion) {
		this.numCodigoDireccion = numCodigoDireccion;
	}

	public String getVchObservacion() {
		return vchObservacion;
	}

	public void setVchObservacion(String vchObservacion) {
		this.vchObservacion = vchObservacion;
	}

	public Moneda getMoneda() {
		return moneda;
	}

	public void setMoneda(Moneda moneda) {
		this.moneda = moneda;		 
	}

	@Override
	public String toString() {
		return "CreatePaymentRequest [numCodigoCotizacionOnline=" + numCodigoCotizacionOnline + ", metodoEnvio="
				+ metodoEnvio + ", numCodigoDireccion=" + numCodigoDireccion + ", vchObservacion=" + vchObservacion
				+ ", moneda=" + moneda.toString() + "]";
	}

	 
	 

}
