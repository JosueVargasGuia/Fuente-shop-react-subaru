package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class UbigeoResponse {
	List<Ubigeo> listaUbigeo = new ArrayList<Ubigeo>();
	Response response=new Response();

	public List<Ubigeo> getListaUbigeo() {
		return listaUbigeo;
	}

	public UbigeoResponse setListaUbigeo(List<Ubigeo> listaUbigeo) {
		this.listaUbigeo = listaUbigeo;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public UbigeoResponse setResponse(Response response) {
		this.response = response;
		return this;
	}
	

}
