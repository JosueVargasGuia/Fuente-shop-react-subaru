package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class ProductoOutletVigenciaResponse {
	ProductoOutletVigencia productoOutletVigencia=new ProductoOutletVigencia();
	List<ProductoOutletVigencia> lista = new ArrayList<ProductoOutletVigencia>();
	Response response = new Response();
	public List<ProductoOutletVigencia> getLista() {
		return lista;
	}
	public ProductoOutletVigenciaResponse setLista(List<ProductoOutletVigencia> lista) {
		this.lista = lista;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public ProductoOutletVigenciaResponse setResponse(Response response) {
		this.response = response;
		return this;
	}
	public ProductoOutletVigencia getProductoOutletVigencia() {
		return productoOutletVigencia;
	}
	public void setProductoOutletVigencia(ProductoOutletVigencia productoOutletVigencia) {
		this.productoOutletVigencia = productoOutletVigencia;
	}
	 
	
}
