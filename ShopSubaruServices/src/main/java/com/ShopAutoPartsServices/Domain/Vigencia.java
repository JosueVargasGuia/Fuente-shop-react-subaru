package com.ShopAutoPartsServices.Domain;

public class Vigencia {
	String dteDesde;
	String dteHasta;
	int numProductoVigencia;
	String dteDesdeFormato;
	String dteHastaFormato;
	public String getDteDesde() {
		return dteDesde;
	}
	public Vigencia setDteDesde(String dteDesde) {
		this.dteDesde = dteDesde;
		return this;
	}
	public String getDteHasta() {
		return dteHasta;
	}
	public Vigencia setDteHasta(String dteHasta) {
		this.dteHasta = dteHasta;
		return this;
	}
	public int getNumProductoVigencia() {
		return numProductoVigencia;
	}
	public Vigencia setNumProductoVigencia(int numProductoVigencia) {
		this.numProductoVigencia = numProductoVigencia;
		return this;
	}
	public String getDteDesdeFormato() {
		return dteDesdeFormato;
	}
	public void setDteDesdeFormato(String dteDesdeFormato) {
		this.dteDesdeFormato = dteDesdeFormato;
	}
	public String getDteHastaFormato() {
		return dteHastaFormato;
	}
	public void setDteHastaFormato(String dteHastaFormato) {
		this.dteHastaFormato = dteHastaFormato;
	}
	 
	
}
