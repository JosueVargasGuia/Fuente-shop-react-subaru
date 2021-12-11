package com.ShopAutoPartsServices.Domain;
  
public class CotizacionOnlineResumen {
	int cantidadDetalleSeleccionado;
	int totalRegistros;
	String numSubTotalDol = "00.00";
	String numTotalDol = "00.00";
	String numIgvDol = "00.00";
	String numEnvioDol = "00.00";
	
	String numSubTotalSol = "00.00";
	String numTotalSol = "00.00";
	String numIgvSol = "00.00";
	String numEnvioSol = "00.00";
	int flgnumCodigoDireccion=0;
	
	Response response = new Response();

	public String getNumSubTotalDol() {
		return numSubTotalDol;
	}

	public CotizacionOnlineResumen setNumSubTotalDol(String numSubTotalDol) {
		this.numSubTotalDol = numSubTotalDol;
		return this;
	}

	public String getNumTotalDol() {
		return numTotalDol;
	}

	public CotizacionOnlineResumen setNumTotalDol(String numTotalDol) {
		this.numTotalDol = numTotalDol;
		return this;
	}

	public String getNumIgvDol() {
		return numIgvDol;
	}

	public CotizacionOnlineResumen setNumIgvDol(String numIgvDol) {
		this.numIgvDol = numIgvDol;
		return this;
	}

	public String getNumEnvioDol() {
		return numEnvioDol;
	}

	public CotizacionOnlineResumen setNumEnvioDol(String numEnvioDol) {
		this.numEnvioDol = numEnvioDol;
		return this;
	}

	public String getNumSubTotalSol() {
		return numSubTotalSol;
	}

	public CotizacionOnlineResumen setNumSubTotalSol(String numSubTotalSol) {
		this.numSubTotalSol = numSubTotalSol;
		return this;
	}

	public String getNumTotalSol() {
		return numTotalSol;
	}

	public CotizacionOnlineResumen setNumTotalSol(String numTotalSol) {
		this.numTotalSol = numTotalSol;
		return this;
	}

	public String getNumIgvSol() {
		return numIgvSol;
	}

	public CotizacionOnlineResumen setNumIgvSol(String numIgvSol) {
		this.numIgvSol = numIgvSol;
		return this;
	}

	public String getNumEnvioSol() {
		return numEnvioSol;
	}

	public CotizacionOnlineResumen setNumEnvioSol(String numEnvioSol) {
		this.numEnvioSol = numEnvioSol;
		return this;
	}

	public CotizacionOnlineResumen setTotalRegistros(int totalRegistros) {
		this.totalRegistros = totalRegistros;
		return this;
	}

	public int getTotalRegistros() {
		return totalRegistros;
	}

	public Response getResponse() {
		return response;
	}

	public CotizacionOnlineResumen setResponse(Response response) {
		this.response = response;
		return this;
	}

	public int getCantidadDetalleSeleccionado() {
		return cantidadDetalleSeleccionado;
	}

	public CotizacionOnlineResumen setCantidadDetalleSeleccionado(int cantidadDetalleSeleccionado) {
		this.cantidadDetalleSeleccionado = cantidadDetalleSeleccionado;
		return this;
	}

	public int getFlgnumCodigoDireccion() {
		return flgnumCodigoDireccion;
	}

	public CotizacionOnlineResumen setFlgnumCodigoDireccion(int flgnumCodigoDireccion) {
		this.flgnumCodigoDireccion = flgnumCodigoDireccion;
		return this;
	}


}
