package com.ShopAutoPartsServices.Domain;

public class ProductoStock {
	String chrLinea;
	String chrCodigoProducto, vchDescripcion;
	Double numValorVentaPv = 00.00, numValorVentaPvsIgv = 00.00, numValorVentaPvp = 00.00, numValorVentaPvspIgv = 00.00;
	int numStock = 0;
	boolean duplicado = false;
	String observacion;
	public String getChrLinea() {
		return chrLinea;
	}

	public ProductoStock setChrLinea(String chrLinea) {
		this.chrLinea = chrLinea;
		return this;
	}

	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}

	public ProductoStock setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}

	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public ProductoStock setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

	public Double getNumValorVentaPv() {
		return numValorVentaPv;
	}

	public ProductoStock setNumValorVentaPv(Double numValorVentaPv) {
		this.numValorVentaPv = numValorVentaPv;
		return this;
	}

	public Double getNumValorVentaPvsIgv() {
		return numValorVentaPvsIgv;
	}

	public ProductoStock setNumValorVentaPvsIgv(Double numValorVentaPvsIgv) {
		this.numValorVentaPvsIgv = numValorVentaPvsIgv;
		return this;
	}

	public Double getNumValorVentaPvp() {
		return numValorVentaPvp;
	}

	public ProductoStock setNumValorVentaPvp(Double numValorVentaPvp) {
		this.numValorVentaPvp = numValorVentaPvp;
		return this;
	}

	public Double getNumValorVentaPvspIgv() {
		return numValorVentaPvspIgv;
	}

	public ProductoStock setNumValorVentaPvspIgv(Double numValorVentaPvspIgv) {
		this.numValorVentaPvspIgv = numValorVentaPvspIgv;
		return this;
	}

	public int getNumStock() {
		return numStock;
	}

	public ProductoStock setNumStock(int numStock) {
		this.numStock = numStock;
		return this;
	}

 

	public boolean isDuplicado() {
		return duplicado;
	}

	public ProductoStock setDuplicado(boolean duplicado) {
		this.duplicado = duplicado;
		return this;
	}

	public String getObservacion() {
		return observacion;
	}

	public ProductoStock setObservacion(String observacion) {
		this.observacion = observacion;
		return this;
	}

	@Override
	public String toString() {
		return "ProductoStock [chrLinea=" + chrLinea + ", chrCodigoProducto=" + chrCodigoProducto + ", vchDescripcion="
				+ vchDescripcion + ", numValorVentaPv=" + numValorVentaPv + ", numValorVentaPvsIgv="
				+ numValorVentaPvsIgv + ", numValorVentaPvp=" + numValorVentaPvp + ", numValorVentaPvspIgv="
				+ numValorVentaPvspIgv + ", numStock=" + numStock + ", isDuplicado=" + duplicado + ", observacion="
				+ observacion + "]";
	}

}
