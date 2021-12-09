package com.ShopAutoPartsServices.Service;

import java.util.List;

import com.ShopAutoPartsServices.Domain.ClienteUsuario;
import com.ShopAutoPartsServices.Domain.Direccion;

public interface DireccionService {
	public List<Direccion> obtenerDirecciones(ClienteUsuario clienteUsuario)throws Exception;
	public Direccion registrarDireccion(Direccion direccion)throws Exception ;
	public Direccion eliminarDireccion(Direccion direccion) throws Exception ;
	public void quitarUsuarioAdmin(ClienteUsuario clienteUsuario)throws Exception;
}
