package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class SubFamiliaResponse {
List<SubFamilia>lista=new ArrayList<SubFamilia>();
Response response=new Response();
public List<SubFamilia> getLista() {
	return lista;
}

public SubFamiliaResponse setLista(List<SubFamilia> lista) {
	this.lista = lista;
	return this;
}

public Response getResponse() {
	return response;
}

public SubFamiliaResponse setResponse(Response response) {
	this.response = response;
	return this;
}

}
