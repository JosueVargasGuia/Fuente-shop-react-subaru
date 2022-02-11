package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.MetodoEnvio;
import com.ShopAutoPartsServices.Enums.Moneda;

public class TusCompras {
	String estado, condicion;
	String dteCreacion;
	Moneda moneda;
	String chrRegLegacyTransId;
	MetodoEnvio metodoEnvio;
	int numCodigoCotizacionOnline;
	int numCodigoCliente;
	double costoFlete;
	double costoTotal;
	String numFacturas;

	public String getEstado() {
		return estado;
	}

	public TusCompras setEstado(String estado) {
		this.estado = estado;
		return this;
	}

	public String getCondicion() {
		return condicion;
	}

	public TusCompras setCondicion(String condicion) {
		this.condicion = condicion;
		return this;
	}

	public String getDteCreacion() {
		return dteCreacion;
	}

	public TusCompras setDteCreacion(String dteCreacion) {
		this.dteCreacion = dteCreacion;
		return this;
	}

	public Moneda getMoneda() {
		return moneda;
	}

	public TusCompras setMoneda(Moneda moneda) {
		this.moneda = moneda;
		return this;
	}

	public String getChrRegLegacyTransId() {
		return chrRegLegacyTransId;
	}

	public TusCompras setChrRegLegacyTransId(String chrRegLegacyTransId) {
		this.chrRegLegacyTransId = chrRegLegacyTransId;
		return this;
	}

	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}

	public TusCompras setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
		return this;
	}

	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}

	public TusCompras setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}

	public double getCostoFlete() {
		return costoFlete;
	}

	public TusCompras setCostoFlete(double costoFlete) {
		this.costoFlete = costoFlete;
		return this;
	}

	public double getCostoTotal() {
		return costoTotal;
	}

	public TusCompras setCostoTotal(double costoTotal) {
		this.costoTotal = costoTotal;
		return this;
	}

	public MetodoEnvio getMetodoEnvio() {
		return metodoEnvio;
	}

	public TusCompras setMetodoEnvio(MetodoEnvio metodoEnvio) {
		this.metodoEnvio = metodoEnvio;
		return this;
	}

	public String getNumFacturas() {
		return numFacturas;
	}

	public TusCompras setNumFacturas(String numFacturas) {
		this.numFacturas = numFacturas;
		return this;
	}

}
