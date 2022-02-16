package com.ShopAutoPartsServices.Domain;

import java.util.List;

public class ProductoResponse {
	List<Producto> listaProductos;
	Response response=new Response();
	Vigencia vigencia=new Vigencia();
	public List<Producto> getListaProductos() {
		return listaProductos;
	}

	public ProductoResponse setListaProductos(List<Producto> listaProductos) {
		this.listaProductos = listaProductos;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public ProductoResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

	public Vigencia getVigencia() {
		return vigencia;
	}

	public ProductoResponse setVigencia(Vigencia vigencia) {
		this.vigencia = vigencia;
		return this;
	}

}
