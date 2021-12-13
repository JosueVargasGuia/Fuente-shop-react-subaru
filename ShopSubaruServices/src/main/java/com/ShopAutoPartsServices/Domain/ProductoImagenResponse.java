package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class ProductoImagenResponse {
	List<ProductoImagen> lista = new ArrayList<ProductoImagen>();
	Response response = new Response();
	Producto producto = new Producto();
	ProductoOnlineCategoria productoOnlineCategoria = new ProductoOnlineCategoria();

	public List<ProductoImagen> getLista() {
		return lista;
	}

	public ProductoImagenResponse setLista(List<ProductoImagen> lista) {
		this.lista = lista;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public ProductoImagenResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

	public Producto getProducto() {
		return producto;
	}

	public void setProducto(Producto producto) {
		this.producto = producto;
	}

	public ProductoOnlineCategoria getProductoOnlineCategoria() {
		return productoOnlineCategoria;
	}

	public ProductoImagenResponse setProductoOnlineCategoria(ProductoOnlineCategoria productoOnlineCategoria) {
		this.productoOnlineCategoria = productoOnlineCategoria;
		return this;
	}

 

}
