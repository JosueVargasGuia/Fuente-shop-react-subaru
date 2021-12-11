package com.ShopAutoPartsServices.Config;

import java.util.ArrayList;

public class UrlAccess {	 
	ArrayList<String> privado = new ArrayList<String>();
	ArrayList<String> administrador = new ArrayList<String>();

	public UrlAccess() {
		 
		 
		/*Privado, url que requieren token y son cliente logeados */ 
		privado.add("/service/authorization/cliente/obtenerUsuario");
		 
		privado.add("/service/iniciarCreatePayment");
		privado.add("/service/cotizacion/obtenerTusCompras");
		privado.add("/service/cotizacion/obtenerTusComprasDetalle");
		
		/*Privado Administrador, url que requieren token y requieren ser usuarios con vistas de administrador */
		administrador.add("/service/productoImagen/subirImagen");
		administrador.add("/service/productoImagen/listaAtributo");
		administrador.add("/service/productoImagen/listaProductoReporte");
		administrador.add("/service/productoImagen/listaProductoAtributo");
		administrador.add("/service/productoImagen/productoAtributo");
		administrador.add("/service/productoImagen/productoCategoria");
		administrador.add("/service/authorization/cliente/obtLstUsuarioAdmin");
		administrador.add("/service/authorization/cliente/quitarUsuarioAdmin");
		administrador.add("/service/productoImagen/listaImangen");
		administrador.add("/service/productoImagen/listaProductosStock");
		administrador.add("/service/productoImagen/actualizarProductosStock");
		//administrador.add("/service/correo/obtenerCorreoJobs");
		administrador.add("/service/correo/registrarCorreoJobs");
		administrador.add("/service/cotizacion/reporteCotizacion");
		administrador.add("/service/cotizacion/obtenerReporteToPdf"); 
		
		
	}

 

	public ArrayList<String> getPrivado() {
		return privado;
	}

	public UrlAccess setPrivado(ArrayList<String> privado) {
		this.privado = privado;
		return this;
	}

	public ArrayList<String> getAdministrador() {
		return administrador;
	}

	public UrlAccess setAdministrador(ArrayList<String> administrador) {
		this.administrador = administrador;
		return this;
	}

}
