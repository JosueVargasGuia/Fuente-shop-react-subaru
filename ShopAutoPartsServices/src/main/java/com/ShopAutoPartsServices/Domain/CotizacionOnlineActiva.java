package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.StatusSyncCotizacion;

public class CotizacionOnlineActiva {

	int numCodigoCotizacionOnline, numCodigoClienteUsuario, numCodigoCliente, cantidad;
	StatusSyncCotizacion status;
	String isLogin;
	Response response = new Response();
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}
	public CotizacionOnlineActiva setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
		return this;
	}
	public int getNumCodigoClienteUsuario() {
		return numCodigoClienteUsuario;
	}
	public CotizacionOnlineActiva setNumCodigoClienteUsuario(int numCodigoClienteUsuario) {
		this.numCodigoClienteUsuario = numCodigoClienteUsuario;
		return this;
	}
	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}
	public CotizacionOnlineActiva setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}
	public int getCantidad() {
		return cantidad;
	}
	public CotizacionOnlineActiva setCantidad(int cantidad) {
		this.cantidad = cantidad;
		return this;
	}
	public StatusSyncCotizacion getStatus() {
		return status;
	}
	public CotizacionOnlineActiva setStatus(StatusSyncCotizacion status) {
		this.status = status;
		return this;
	}
	public String getIsLogin() {
		return isLogin;
	}
	public CotizacionOnlineActiva setIsLogin(String isLogin) {
		this.isLogin = isLogin;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public CotizacionOnlineActiva setResponse(Response response) {
		this.response = response;
		return this;
	}
	@Override
	public String toString() {
		return "CotizacionOnlineActiva [numCodigoCotizacionOnline=" + numCodigoCotizacionOnline
				+ ", numCodigoClienteUsuario=" + numCodigoClienteUsuario + ", numCodigoCliente=" + numCodigoCliente
				+ ", cantidad=" + cantidad + ", status=" + status + ", isLogin=" + isLogin + ", response=" + response
				+ "]";
	}
 
}
