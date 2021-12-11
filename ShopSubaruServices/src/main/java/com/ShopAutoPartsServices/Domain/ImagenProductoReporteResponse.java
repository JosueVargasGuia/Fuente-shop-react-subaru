package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class ImagenProductoReporteResponse {
	List<ImagenProductoReporte>lista=new ArrayList<>();
	Response response=new Response();
	public List<ImagenProductoReporte> getLista() {
		return lista;
	}
	public ImagenProductoReporteResponse setLista(List<ImagenProductoReporte> lista) {
		this.lista = lista;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public ImagenProductoReporteResponse setResponse(Response response) {
		this.response = response;
		return this;
	}
	
}
