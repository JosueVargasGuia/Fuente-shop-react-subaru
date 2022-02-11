package com.ShopAutoPartsServices.Repository;

import java.util.List;

import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Direccion;

public interface DireccionServiceRepository {
	public List<Direccion> obtenerDirecciones(ClienteUsuario clienteUsuario) throws Exception;
	public Direccion registrarDireccion(Direccion direccion)throws Exception ;
	public Direccion eliminarDireccion(Direccion direccion) throws Exception ;
	void quitarUsuarioAdmin(ClienteUsuario clienteUsuario)throws Exception; 
	
}
