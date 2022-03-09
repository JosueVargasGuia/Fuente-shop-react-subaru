package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class DireccionResponse {
	List<Direccion> lista = new ArrayList<Direccion>();
	Response response=new Response();
	ClienteUsuario clienteUsuario=new ClienteUsuario();
	public List<Direccion> getLista() {
		return lista;
	}

	public DireccionResponse setLista(List<Direccion> lista) {
		this.lista = lista;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public DireccionResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

	public ClienteUsuario getClienteUsuario() {
		return clienteUsuario;
	}

	public void setClienteUsuario(ClienteUsuario clienteUsuario) {
		this.clienteUsuario = clienteUsuario;
	}

	 
}
