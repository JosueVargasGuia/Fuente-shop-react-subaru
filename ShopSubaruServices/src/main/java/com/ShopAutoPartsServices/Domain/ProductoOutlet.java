package com.ShopAutoPartsServices.Domain;

import java.math.BigDecimal;

public class ProductoOutlet {
	String chrCodigoProducto, vchDescripcion, numUnspc,vchModelo;
	BigDecimal numValorVenta, numValorRefVenta, numValorDesc, numValorCompra;
	int  numProductoVigencia, numProductoOutlet;
	double numStock;
	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}
	public ProductoOutlet setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}
	public String getVchDescripcion() {
		return vchDescripcion;
	}
	public ProductoOutlet setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}
	public String getNumUnspc() {
		return numUnspc;
	}
	public ProductoOutlet setNumUnspc(String numUnspc) {
		this.numUnspc = numUnspc;
		return this;
	}
	public BigDecimal getNumValorVenta() {
		return numValorVenta;
	}
	public ProductoOutlet setNumValorVenta(BigDecimal numValorVenta) {
		this.numValorVenta = numValorVenta;
		return this;
	}
	public BigDecimal getNumValorRefVenta() {
		return numValorRefVenta;
	}
	public ProductoOutlet setNumValorRefVenta(BigDecimal numValorRefVenta) {
		this.numValorRefVenta = numValorRefVenta;
		return this;
	}
	public BigDecimal getNumValorDesc() {
		return numValorDesc;
	}
	public ProductoOutlet setNumValorDesc(BigDecimal numValorDesc) {
		this.numValorDesc = numValorDesc;
		return this;
	}
	public BigDecimal getNumValorCompra() {
		return numValorCompra;
	}
	public ProductoOutlet setNumValorCompra(BigDecimal numValorCompra) {
		this.numValorCompra = numValorCompra;
		return this;
	}
	public double getNumStock() {
		return numStock;
	}
	public ProductoOutlet setNumStock(double numStock) {
		this.numStock = numStock;
		return this;
	}
	public int getNumProductoVigencia() {
		return numProductoVigencia;
	}
	public ProductoOutlet setNumProductoVigencia(int numProductoVigencia) {
		this.numProductoVigencia = numProductoVigencia;
		return this;
	}
	public int getNumProductoOutlet() {
		return numProductoOutlet;
	}
	public ProductoOutlet setNumProductoOutlet(int numProductoOutlet) {
		this.numProductoOutlet = numProductoOutlet;
		return this;
	}
	
	public String getVchModelo() {
		return vchModelo;
	}
	public void setVchModelo(String vchModelo) {
		this.vchModelo = vchModelo;
	}
	@Override
	public String toString() {
		return "ProductoOutlet [chrCodigoProducto=" + chrCodigoProducto + ", vchDescripcion=" + vchDescripcion
				+ ", numUnspc=" + numUnspc + ", numValorVenta=" + numValorVenta + ", numValorRefVenta="
				+ numValorRefVenta + ", numValorDesc=" + numValorDesc + ", numValorCompra=" + numValorCompra
				+ ", numStock=" + numStock + ", numProductoVigencia=" + numProductoVigencia + ", numProductoOutlet="
				+ numProductoOutlet + "]";
	}

}
