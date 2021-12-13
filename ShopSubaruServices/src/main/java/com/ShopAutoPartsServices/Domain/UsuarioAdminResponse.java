package com.ShopAutoPartsServices.Domain;

import java.util.List;

public class UsuarioAdminResponse {
	List<ClienteUsuario> lista;
	Response response = new Response();

	public Response getResponse() {
		return response;
	}

	public UsuarioAdminResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

	public List<ClienteUsuario> getLista() {
		return lista;
	}

	public UsuarioAdminResponse setLista(List<ClienteUsuario> lista) {
		this.lista = lista;
		return this;
	}

}
