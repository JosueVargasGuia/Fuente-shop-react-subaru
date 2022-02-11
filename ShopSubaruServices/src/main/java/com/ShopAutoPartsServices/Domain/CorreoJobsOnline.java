package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.CRUD;
import com.ShopAutoPartsServices.Enums.FilterCorreo;

public class CorreoJobsOnline {
	String vchCorreo;
	int flgTipoCambioRegistrado, flgTipoCambioTomado, flgDestinoOc;
	int numCodigoCorreoJobsOnline;
	FilterCorreo filterCorreo;

	Response response = new Response();
	CRUD crud = CRUD.SELECT;

	public CorreoJobsOnline() {

	}

	public CorreoJobsOnline(String vchCorreo) {
		this.vchCorreo = vchCorreo;
	}

	public int getNumCodigoCorreoJobsOnline() {
		return numCodigoCorreoJobsOnline;
	}

	public CorreoJobsOnline setNumCodigoCorreoJobsOnline(int numCodigoCorreoJobsOnline) {
		this.numCodigoCorreoJobsOnline = numCodigoCorreoJobsOnline;
		return this;
	}

	public String getVchCorreo() {
		return vchCorreo;
	}

	public CorreoJobsOnline setVchCorreo(String vchCorreo) {
		this.vchCorreo = vchCorreo;
		return this;
	}

	public int getFlgTipoCambioRegistrado() {
		return flgTipoCambioRegistrado;
	}

	public CorreoJobsOnline setFlgTipoCambioRegistrado(int flgTipoCambioRegistrado) {
		this.flgTipoCambioRegistrado = flgTipoCambioRegistrado;
		return this;
	}

	public int getFlgTipoCambioTomado() {
		return flgTipoCambioTomado;
	}

	public CorreoJobsOnline setFlgTipoCambioTomado(int flgTipoCambioTomado) {
		this.flgTipoCambioTomado = flgTipoCambioTomado;
		return this;
	}

	public int getFlgDestinoOc() {
		return flgDestinoOc;
	}

	public CorreoJobsOnline setFlgDestinoOc(int flgDestinoOc) {
		this.flgDestinoOc = flgDestinoOc;
		return this;
	}

	public FilterCorreo getFilterCorreo() {
		return filterCorreo;
	}

	public CorreoJobsOnline setFilterCorreo(FilterCorreo filterCorreo) {
		this.filterCorreo = filterCorreo;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public CorreoJobsOnline setResponse(Response response) {
		this.response = response;
		return this;
	}

	public CRUD getCrud() {
		return crud;
	}

	public CorreoJobsOnline setCrud(CRUD crud) {
		this.crud = crud;
		return this;
	}

	@Override
	public String toString() {
		return "CorreoJobsOnline [vchCorreo=" + vchCorreo + ", flgTipoCambioRegistrado=" + flgTipoCambioRegistrado
				+ ", flgTipoCambioTomado=" + flgTipoCambioTomado + ", flgDestinoOc=" + flgDestinoOc
				+ ", numCodigoCorreoJobsOnline=" + numCodigoCorreoJobsOnline + ", filterCorreo=" + filterCorreo
				+ ", response=" + response + ", crud=" + crud + "]";
	}

}
