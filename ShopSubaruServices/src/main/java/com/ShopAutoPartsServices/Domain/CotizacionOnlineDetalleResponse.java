package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class CotizacionOnlineDetalleResponse {
	List<CotizacionOnlineDetalle> lista = new ArrayList<CotizacionOnlineDetalle>();
	Response response=new Response();
	public List<CotizacionOnlineDetalle> getLista() {
		return lista;
	}

	public CotizacionOnlineDetalleResponse setLista(List<CotizacionOnlineDetalle> lista) {
		this.lista = lista;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public CotizacionOnlineDetalleResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

}
