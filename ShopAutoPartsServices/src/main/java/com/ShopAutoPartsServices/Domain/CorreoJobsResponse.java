package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class CorreoJobsResponse {
	List<CorreoJobsOnline> lista = new ArrayList<CorreoJobsOnline>();
	Response response = new Response();

	public List<CorreoJobsOnline> getLista() {
		return lista;
	}

	public CorreoJobsResponse setLista(List<CorreoJobsOnline> lista) {
		this.lista = lista;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public CorreoJobsResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

}
