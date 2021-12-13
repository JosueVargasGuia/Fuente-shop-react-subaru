package com.ShopAutoPartsServices.Domain;

public class ProductoOnlineCategoriaResponse {
	ProductoOnlineCategoria productoOnlineCategoria=new ProductoOnlineCategoria();
	Response response=new Response();
	public ProductoOnlineCategoria getProductoOnlineCategoria() {
		return productoOnlineCategoria;
	}
	public ProductoOnlineCategoriaResponse setProductoOnlineCategoria(ProductoOnlineCategoria productoOnlineCategoria) {
		this.productoOnlineCategoria = productoOnlineCategoria;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public ProductoOnlineCategoriaResponse setResponse(Response response) {
		this.response = response;
		return this;
	}
	
	
}
