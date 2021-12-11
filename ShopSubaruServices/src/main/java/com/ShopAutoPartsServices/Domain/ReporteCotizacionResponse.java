package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class ReporteCotizacionResponse {
List<ReporteCotizacion>lista=new ArrayList<ReporteCotizacion>();
Response response=new Response();

public Response getResponse() {
	return response;
}
public ReporteCotizacionResponse setResponse(Response response) {
	this.response = response;
	return this;
}
public List<ReporteCotizacion> getLista() {
	return lista;
}

public ReporteCotizacionResponse setLista(List<ReporteCotizacion> lista) {
	this.lista = lista;
	return this;
}
}
