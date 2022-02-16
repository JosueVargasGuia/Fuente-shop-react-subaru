package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class ProductoOutletResponse {
	List<ProductoOutlet> lista = new ArrayList<ProductoOutlet>();
	Response response = new Response();
	ProductoOutletVigencia productoOutletVigencia=new ProductoOutletVigencia();
	public List<ProductoOutlet> getLista() {
		return lista;
	}
	public ProductoOutletResponse setLista(List<ProductoOutlet> lista) {
		this.lista = lista;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public ProductoOutletResponse setResponse(Response response) {
		this.response = response;
		return this;
	}
	public ProductoOutletVigencia getProductoOutletVigencia() {
		return productoOutletVigencia;
	}
	public ProductoOutletResponse setProductoOutletVigencia(ProductoOutletVigencia productoOutletVigencia) {
		this.productoOutletVigencia = productoOutletVigencia;
		return this;
	}
	
}
