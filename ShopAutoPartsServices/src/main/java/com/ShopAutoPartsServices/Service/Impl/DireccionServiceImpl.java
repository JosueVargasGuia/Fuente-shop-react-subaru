package com.ShopAutoPartsServices.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Direccion;
import com.ShopAutoPartsServices.Repository.Impl.DireccionServiceRepositoryImpl;
import com.ShopAutoPartsServices.Service.DireccionService;

@Service
public class DireccionServiceImpl implements DireccionService {
	@Autowired
	DireccionServiceRepositoryImpl serviceRepositoryImpl;
	public List<Direccion> obtenerDirecciones(ClienteUsuario clienteUsuario)throws Exception {
		// TODO Auto-generated method stub
		return serviceRepositoryImpl.obtenerDirecciones(clienteUsuario);
	}
	public Direccion registrarDireccion(Direccion direccion)throws Exception  {
		return serviceRepositoryImpl.registrarDireccion(direccion);
		
	}
	public Direccion eliminarDireccion(Direccion direccion)throws Exception {
		return serviceRepositoryImpl.eliminarDireccion(direccion);
		
	}
	public void quitarUsuarioAdmin(ClienteUsuario clienteUsuario)throws Exception {
		  serviceRepositoryImpl.quitarUsuarioAdmin(clienteUsuario);
		
	}

}
