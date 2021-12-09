package com.ShopAutoPartsServices.Domain.IziPay;

import java.math.BigDecimal;

import com.ShopAutoPartsServices.Enums.EstadoCotizacion;

public class ScheduledProceso {
	int numCodigoCotizacionOnline;
	EstadoCotizacion estadoCotizacion;
	String status;
	String statusAction;
	String statusBD;
	String proceso;
	String totalLetras;
	String numFacturas;
	int numCodigoOrigenFactura;
	String chrCodigoOc="";
	String fechaIni;
	String fechaFin;
	String fechaIniHHmm;
	String fechaFinHHmm;
	BigDecimal numTipoCambio;
	String dteTomado;
	BigDecimal icbFec;
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}

	public ScheduledProceso setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
		return this;
	}

	public EstadoCotizacion getEstadoCotizacion() {
		return estadoCotizacion;
	}

	public ScheduledProceso setEstadoCotizacion(EstadoCotizacion estadoCotizacion) {
		this.estadoCotizacion = estadoCotizacion;
		return this;
	}

	public String getStatus() {
		return status;
	}

	public ScheduledProceso setStatus(String status) {
		this.status = status;
		return this;
	}

	public String getStatusAction() {
		return statusAction;
	}

	public ScheduledProceso setStatusAction(String statusAction) {
		this.statusAction = statusAction;
		return this;
	}

	public String getStatusBD() {
		return statusBD;
	}

	public ScheduledProceso setStatusBD(String statusBD) {
		this.statusBD = statusBD;
		return this;
	}

	public String getProceso() {
		return proceso;
	}

	public ScheduledProceso setProceso(String proceso) {
		this.proceso = proceso;
		return this;
	}

	public String getTotalLetras() {
		return totalLetras;
	}

	public ScheduledProceso setTotalLetras(String totalLetras) {
		this.totalLetras = totalLetras;
		return this;
	}

	public String getNumFacturas() {
		return numFacturas;
	}

	public ScheduledProceso setNumFacturas(String numFacturas) {
		this.numFacturas = numFacturas;
		return this;
	}

	public int getNumCodigoOrigenFactura() {
		return numCodigoOrigenFactura;
	}

	public ScheduledProceso setNumCodigoOrigenFactura(int numCodigoOrigenFactura) {
		this.numCodigoOrigenFactura = numCodigoOrigenFactura;
		return this;
	}

	public String getChrCodigoOc() {
		return chrCodigoOc;
	}

	public ScheduledProceso setChrCodigoOc(String chrCodigoOc) {
		this.chrCodigoOc = chrCodigoOc;
		return this;
	}

	public String getFechaIni() {
		return fechaIni;
	}

	public ScheduledProceso setFechaIni(String fechaIni) {
		this.fechaIni = fechaIni;
		return this;
	}

	public String getFechaFin() {
		return fechaFin;
	}

	public ScheduledProceso setFechaFin(String fechaFin) {
		this.fechaFin = fechaFin;
		return this;
	}

	public String getFechaIniHHmm() {
		return fechaIniHHmm;
	}

	public ScheduledProceso setFechaIniHHmm(String fechaIniHHmm) {
		this.fechaIniHHmm = fechaIniHHmm;
		return this;
	}

	public String getFechaFinHHmm() {
		return fechaFinHHmm;
	}

	public ScheduledProceso setFechaFinHHmm(String fechaFinHHmm) {
		this.fechaFinHHmm = fechaFinHHmm;
		return this;
	}

	public BigDecimal getNumTipoCambio() {
		return numTipoCambio;
	}

	public ScheduledProceso setNumTipoCambio(BigDecimal numTipoCambio) {
		this.numTipoCambio = numTipoCambio;
		return this;
	}

	public String getDteTomado() {
		return dteTomado;
	}

	public ScheduledProceso setDteTomado(String dteTomado) {
		this.dteTomado = dteTomado;
		return this;
	}

	public BigDecimal getIcbFec() {
		return icbFec;
	}

	public ScheduledProceso setIcbFec(BigDecimal icbFec) {
		this.icbFec = icbFec;
		return this;
	}

	@Override
	public String toString() {
		return "ScheduledProceso [numCodigoCotizacionOnline=" + numCodigoCotizacionOnline + ", estadoCotizacion="
				+ estadoCotizacion + ", status=" + status + ", statusAction=" + statusAction + ", statusBD=" + statusBD
				+ ", proceso=" + proceso + ", totalLetras=" + totalLetras + ", numFacturas=" + numFacturas
				+ ", numCodigoOrigenFactura=" + numCodigoOrigenFactura + ", chrCodigoOc=" + chrCodigoOc + ", fechaIni="
				+ fechaIni + ", fechaFin=" + fechaFin + ", fechaIniHHmm=" + fechaIniHHmm + ", fechaFinHHmm="
				+ fechaFinHHmm + ", numTipoCambio=" + numTipoCambio + ", dteTomado=" + dteTomado + "]";
	}
 

}
