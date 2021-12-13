package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.CRUD;

public class ProductoOnlineCategoria {
	int numCodigoProductoCategoria;
    String chrCodigoProducto;
    String chrRecomendado;
    String chrDestacadoMarca;
    String chrOferta;
    String chrRemate;
    String chrDestacado;
    CRUD crud=CRUD.SELECT;
	public int getNumCodigoProductoCategoria() {
		return numCodigoProductoCategoria;
	}
	public ProductoOnlineCategoria setNumCodigoProductoCategoria(int numCodigoProductoCategoria) {
		this.numCodigoProductoCategoria = numCodigoProductoCategoria;
		return this;
	}
	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}
	public ProductoOnlineCategoria setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}
	public String getChrRecomendado() {
		return chrRecomendado;
	}
	public ProductoOnlineCategoria setChrRecomendado(String chrRecomendado) {
		this.chrRecomendado = chrRecomendado;
		return this;
	}
	public String getChrDestacadoMarca() {
		return chrDestacadoMarca;
	}
	public ProductoOnlineCategoria setChrDestacadoMarca(String chrDestacadoMarca) {
		this.chrDestacadoMarca = chrDestacadoMarca;
		return this;
	}
	public String getChrOferta() {
		return chrOferta;
	}
	public ProductoOnlineCategoria setChrOferta(String chrOferta) {
		this.chrOferta = chrOferta;
		return this;
	}
	public String getChrRemate() {
		return chrRemate;
	}
	public ProductoOnlineCategoria setChrRemate(String chrRemate) {
		this.chrRemate = chrRemate;
		return this;
	}
	public String getChrDestacado() {
		return chrDestacado;
	}
	public ProductoOnlineCategoria setChrDestacado(String chrDestacado) {
		this.chrDestacado = chrDestacado;
		return this;
	}
	public CRUD getCrud() {
		return crud;
	}
	public ProductoOnlineCategoria setCrud(CRUD crud) {
		this.crud = crud;
		return this;
	}
	@Override
	public String toString() {
		return "ProductoOnlineCategoria [numCodigoProductoCategoria=" + numCodigoProductoCategoria
				+ ", chrCodigoProducto=" + chrCodigoProducto + ", chrRecomendado=" + chrRecomendado
				+ ", chrDestacadoMarca=" + chrDestacadoMarca + ", chrOferta=" + chrOferta + ", chrRemate=" + chrRemate
				+ ", chrDestacado=" + chrDestacado + ", crud=" + crud + "]";
	}
     
}
