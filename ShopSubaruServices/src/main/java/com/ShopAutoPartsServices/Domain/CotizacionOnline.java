package com.ShopAutoPartsServices.Domain;

import java.math.BigDecimal;
import java.math.RoundingMode;
import java.util.Date;

import com.ShopAutoPartsServices.Domain.IziPay.StatusAction;

public class CotizacionOnline {
	int numCodigoCotizacionOnline;
	int numCodigoCliente;
	int numCodigoClienteUsuario;
	String chrEstado;
	Date dteCreacion;
	Date dteActualizacion;
	BigDecimal numCodigoCotizacion = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numMetodoEnvio = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numIntervaloEnvio = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	BigDecimal numHorarioEnvio = BigDecimal.ZERO.setScale(2, RoundingMode.HALF_UP);
	String vchObservacion;
	Response response=new Response();
	StatusAction statusAction=StatusAction.ARMANDO_COMPRA;
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}
	public CotizacionOnline setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
		return this;
	}
	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}
	public CotizacionOnline setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}
	public int getNumCodigoClienteUsuario() {
		return numCodigoClienteUsuario;
	}
	public CotizacionOnline setNumCodigoClienteUsuario(int numCodigoClienteUsuario) {
		this.numCodigoClienteUsuario = numCodigoClienteUsuario;
		return this;
	}
	public String getChrEstado() {
		return chrEstado;
	}
	public CotizacionOnline setChrEstado(String chrEstado) {
		this.chrEstado = chrEstado;
		return this;
	}
	public Date getDteCreacion() {
		return dteCreacion;
	}
	public CotizacionOnline setDteCreacion(Date dteCreacion) {
		this.dteCreacion = dteCreacion;
		return this;
	}
	public Date getDteActualizacion() {
		return dteActualizacion;
	}
	public CotizacionOnline setDteActualizacion(Date dteActualizacion) {
		this.dteActualizacion = dteActualizacion;
		return this;
	}
	public BigDecimal getNumCodigoCotizacion() {
		return numCodigoCotizacion;
	}
	public CotizacionOnline setNumCodigoCotizacion(BigDecimal numCodigoCotizacion) {
		this.numCodigoCotizacion = numCodigoCotizacion;
		return this;
	}
	public BigDecimal getNumMetodoEnvio() {
		return numMetodoEnvio;
	}
	public CotizacionOnline setNumMetodoEnvio(BigDecimal numMetodoEnvio) {
		this.numMetodoEnvio = numMetodoEnvio;
		return this;
	}
	public BigDecimal getNumIntervaloEnvio() {
		return numIntervaloEnvio;
	}
	public CotizacionOnline setNumIntervaloEnvio(BigDecimal numIntervaloEnvio) {
		this.numIntervaloEnvio = numIntervaloEnvio;
		return this;
	}
	public BigDecimal getNumHorarioEnvio() {
		return numHorarioEnvio;
	}
	public CotizacionOnline setNumHorarioEnvio(BigDecimal numHorarioEnvio) {
		this.numHorarioEnvio = numHorarioEnvio;
		return this;
	}
	public String getVchObservacion() {
		return vchObservacion;
	}
	public CotizacionOnline setVchObservacion(String vchObservacion) {
		this.vchObservacion = vchObservacion;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public CotizacionOnline setResponse(Response response) {
		this.response = response;
		return this;
	}
	
	public StatusAction getStatusAction() {
		return statusAction;
	}
	public CotizacionOnline setStatusAction(StatusAction statusAction) {
		this.statusAction = statusAction;
		return this;
	}
	@Override
	public String toString() {
		return "CotizacionOnline [numCodigoCotizacionOnline=" + numCodigoCotizacionOnline + ", numCodigoCliente="
				+ numCodigoCliente + ", numCodigoClienteUsuario=" + numCodigoClienteUsuario + ", chrEstado=" + chrEstado
				+ ", dteCreacion=" + dteCreacion + ", dteActualizacion=" + dteActualizacion + ", numCodigoCotizacion="
				+ numCodigoCotizacion + ", numMetodoEnvio=" + numMetodoEnvio + ", numIntervaloEnvio="
				+ numIntervaloEnvio + ", numHorarioEnvio=" + numHorarioEnvio + ", vchObservacion=" + vchObservacion
				+ ", response=" + response + "]";
	}
 
}
