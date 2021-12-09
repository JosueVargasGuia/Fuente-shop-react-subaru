package com.ShopAutoPartsServices.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Suscripcion;
import com.ShopAutoPartsServices.Domain.TipoCambio;
import com.ShopAutoPartsServices.Domain.Ubigeo;
import com.ShopAutoPartsServices.Domain.UsuarioAdminRequest;
import com.ShopAutoPartsServices.Repository.ClienteServiceRepository;
import com.ShopAutoPartsServices.Service.ClienteService;

@Service
public class ClienteServiceImpl implements ClienteService {
	@Autowired
	private ClienteServiceRepository clienteServiceRepository; 
	@Override
	public  ClienteUsuario loginClienteUsuario(String username) throws Exception {		 
		return clienteServiceRepository.loginClienteUsuario(username);
	}
	 public ClienteUsuario registrarClienteUsuario(ClienteUsuario clienteUsuario)throws Exception{
		  return clienteServiceRepository.registrarClienteUsuario(clienteUsuario);
	  }
	public Suscripcion registrarSuscripcion(Suscripcion suscripcion) throws Exception {
		return clienteServiceRepository.registrarSuscripcion(suscripcion);
		
	}
	public List<Ubigeo> listaUbigeo(Ubigeo ubigeo)throws Exception {
		// TODO Auto-generated method stub
		return clienteServiceRepository.listaUbigeo(ubigeo);
	}
	public ClienteUsuario obtenerCliente(ClienteUsuario clienteRequest)throws Exception {
		// TODO Auto-generated method stub
		return clienteServiceRepository.obtenerCliente(clienteRequest);
	}
	public ClienteUsuario obtenerClienteByCorreo(ClienteUsuario clienteRequest)throws Exception  {
		// TODO Auto-generated method stub
		return clienteServiceRepository.obtenerClienteByCorreo(clienteRequest);
	}
	public ClienteUsuario actualizarPassword(ClienteUsuario clienteUsuario)throws Exception {
		// TODO Auto-generated method stub
		return clienteServiceRepository.actualizarPassword(clienteUsuario);
	}
	public TipoCambio obtenerTipoCambio()throws Exception {
		// TODO Auto-generated method stub
		return clienteServiceRepository.obtenerTipoCambio();
	}
	public List<ClienteUsuario> listaUsuarioAdministradores(UsuarioAdminRequest usuarioAdminRequest) throws Exception {
		// TODO Auto-generated method stub
		return clienteServiceRepository.listaUsuarioAdministradores(usuarioAdminRequest);
	}
	 
}
