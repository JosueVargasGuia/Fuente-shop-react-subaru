package com.ShopAutoPartsServices.Service;

import java.util.List;

import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Suscripcion;
import com.ShopAutoPartsServices.Domain.TipoCambio;
import com.ShopAutoPartsServices.Domain.Ubigeo;

public interface ClienteService {
	ClienteUsuario loginClienteUsuario(String username) throws Exception;

	ClienteUsuario registrarClienteUsuario(ClienteUsuario clienteUsuario) throws Exception;

	Suscripcion registrarSuscripcion(Suscripcion suscripcion) throws Exception;

	List<Ubigeo> listaUbigeo(Ubigeo ubigeo) throws Exception;

	ClienteUsuario obtenerCliente(ClienteUsuario clienteRequest) throws Exception;

	ClienteUsuario obtenerClienteByCorreo(ClienteUsuario clienteRequest) throws Exception;

	ClienteUsuario actualizarPassword(ClienteUsuario clienteUsuario) throws Exception;

	public TipoCambio obtenerTipoCambio() throws Exception;
}
