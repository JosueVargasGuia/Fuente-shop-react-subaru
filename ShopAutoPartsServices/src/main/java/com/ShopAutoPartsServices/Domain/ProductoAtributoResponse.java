package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class ProductoAtributoResponse {
	List<ProductoCaracteristica> lista = new ArrayList<>();
	Response response = new Response();

	public List<ProductoCaracteristica> getLista() {
		return lista;
	}

	public ProductoAtributoResponse setLista(List<ProductoCaracteristica> lista) {
		this.lista = lista;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public ProductoAtributoResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

}
