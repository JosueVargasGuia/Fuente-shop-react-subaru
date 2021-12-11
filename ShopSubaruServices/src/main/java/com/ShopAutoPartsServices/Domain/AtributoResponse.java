package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class AtributoResponse {
List<Caracteristica>lista=new ArrayList<>();
Response response=new Response();

 
public List<Caracteristica> getLista() {
	return lista;
}

public AtributoResponse setLista(List<Caracteristica> lista) {
	this.lista = lista;
	return this;
}

public Response getResponse() {
	return response;
}

public AtributoResponse setResponse(Response response) {
	this.response = response;
	return this;
}

}
