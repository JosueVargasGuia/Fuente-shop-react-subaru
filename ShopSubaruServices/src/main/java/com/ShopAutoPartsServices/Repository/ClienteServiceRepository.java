package com.ShopAutoPartsServices.Repository;

import java.util.List;

import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Suscripcion;
import com.ShopAutoPartsServices.Domain.TipoCambio;
import com.ShopAutoPartsServices.Domain.Ubigeo;
import com.ShopAutoPartsServices.Domain.UsuarioAdminRequest;

public interface ClienteServiceRepository {

	 
	ClienteUsuario registrarClienteUsuario(ClienteUsuario clienteUsuario) throws Exception;

	ClienteUsuario loginClienteUsuario(String username) throws Exception;

	Suscripcion registrarSuscripcion(Suscripcion suscripcion)throws Exception;

	List<Ubigeo> listaUbigeo(Ubigeo ubigeo)throws Exception;

	ClienteUsuario obtenerCliente(ClienteUsuario clienteRequest)throws Exception;

	ClienteUsuario obtenerClienteByCorreo(ClienteUsuario clienteRequest)throws Exception;

	ClienteUsuario actualizarPassword(ClienteUsuario clienteUsuario)throws Exception;

	 TipoCambio obtenerTipoCambio()throws Exception;

	List<ClienteUsuario> listaUsuarioAdministradores(UsuarioAdminRequest usuarioAdminRequest)throws Exception ;

}
