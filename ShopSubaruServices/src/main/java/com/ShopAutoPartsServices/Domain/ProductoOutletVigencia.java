package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

public class ProductoOutletVigencia {
	int numProductoVigencia;
	String dteDesde, dteHasta;
	List<ProductoOutlet>listaProductoOutlet=new ArrayList<ProductoOutlet>();
	int numEstado;
	String status;
	Date dteDesdeDate, dteHastaDate;
	public int getNumProductoVigencia() {
		return numProductoVigencia;
	}
	public ProductoOutletVigencia setNumProductoVigencia(int numProductoVigencia) {
		this.numProductoVigencia = numProductoVigencia;
		return this;
	}
	public String getDteDesde() {
		return dteDesde;
	}
	public ProductoOutletVigencia setDteDesde(String dteDesde) {
		this.dteDesde = dteDesde;
		return this;
	}
	public String getDteHasta() {
		return dteHasta;
	}
	public ProductoOutletVigencia setDteHasta(String dteHasta) {
		this.dteHasta = dteHasta;
		return this;
	}
	public int getNumEstado() {
		return numEstado;
	}
	public ProductoOutletVigencia setNumEstado(int numEstado) {
		this.numEstado = numEstado;
		return this;
	}
	
	public Date getDteDesdeDate() {
		return dteDesdeDate;
	}
	public ProductoOutletVigencia setDteDesdeDate(Date dteDesdeDate) {
		this.dteDesdeDate = dteDesdeDate;
		return this;
	}
	public Date getDteHastaDate() {
		return dteHastaDate;
	}
	public ProductoOutletVigencia setDteHastaDate(Date dteHastaDate) {
		this.dteHastaDate = dteHastaDate;
		return this;
	}
	
	public List<ProductoOutlet> getListaProductoOutlet() {
		return listaProductoOutlet;
	}
	public ProductoOutletVigencia setListaProductoOutlet(List<ProductoOutlet> listaProductoOutlet) {
		this.listaProductoOutlet = listaProductoOutlet;
		return this;
	}
	
	
	public String getStatus() {
		return status;
	}
	public ProductoOutletVigencia setStatus(String status) {
		this.status = status;
		return this;
	}
	@Override
	public String toString() {
		return "ProductoOutletVigencia [numProductoVigencia=" + numProductoVigencia + ", dteDesde=" + dteDesde
				+ ", dteHasta=" + dteHasta + ", numEstado=" + numEstado + ", dteDesdeDate=" + dteDesdeDate
				+ ", dteHastaDate=" + dteHastaDate + "]";
	}
 
	
}
