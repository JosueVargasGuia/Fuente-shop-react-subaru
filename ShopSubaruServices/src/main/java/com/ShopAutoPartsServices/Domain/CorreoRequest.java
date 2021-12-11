package com.ShopAutoPartsServices.Domain;

import java.util.List;

import com.ShopAutoPartsServices.Enums.BuildEmail;

public class CorreoRequest {
	/* Cliente */
	ClienteUsuario clienteUsuario;
	List<CorreoJobsOnline> listaCorreo;	
	String tokenCliente;
	
	BuildEmail buildEmail;
	public ClienteUsuario getClienteUsuario() {
		return clienteUsuario;
	}
	public CorreoRequest setClienteUsuario(ClienteUsuario clienteUsuario) {
		this.clienteUsuario = clienteUsuario;
		return this;
	}
	 
	public List<CorreoJobsOnline> getListaCorreo() {
		return listaCorreo;
	}
	public CorreoRequest setListaCorreo(List<CorreoJobsOnline> listaCorreo) {
		this.listaCorreo = listaCorreo;
		return this;
	}
	public String getTokenCliente() {
		return tokenCliente;
	}
	public CorreoRequest setTokenCliente(String tokenCliente) {
		this.tokenCliente = tokenCliente;
		return this;
	}
	public BuildEmail getBuildEmail() {
		return buildEmail;
	}
	public CorreoRequest setBuildEmail(BuildEmail buildEmail) {
		this.buildEmail = buildEmail;
		return this;
	} 
 
 

}
