package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class TusComprasResponse {
	List<TusCompras> lista = new ArrayList<TusCompras>();
	List<CotizacionOnlineDetalle> listaDetalle = new ArrayList<CotizacionOnlineDetalle>();
	Response response = new Response();

	public List<TusCompras> getLista() {
		return lista;
	}

	public TusComprasResponse setLista(List<TusCompras> lista) {
		this.lista = lista;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public TusComprasResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

	public List<CotizacionOnlineDetalle> getListaDetalle() {
		return listaDetalle;
	}

	public TusComprasResponse setListaDetalle(List<CotizacionOnlineDetalle> listaDetalle) {
		this.listaDetalle = listaDetalle;
		return this;
	}

}
