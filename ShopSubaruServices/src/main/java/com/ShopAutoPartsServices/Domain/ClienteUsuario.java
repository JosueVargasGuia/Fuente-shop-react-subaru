package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import com.ShopAutoPartsServices.Enums.CRUD;
import com.ShopAutoPartsServices.ServiceConfiguracion.JwtEnum;

public class ClienteUsuario {
	int numCodigoClienteUsuario;
	int numCodigoCliente;
	String chrEmail;
	String chrPassword;
	String chrPasswordCopia;
	String chrTratamiento;
	String token;
	Date tokenExpire;
	Cliente cliente;
	Response response = new Response();
	boolean flgOfertas;
	boolean flgSuscripcion;
	int flgActualizaRol=0;
	CRUD crud;
	JwtEnum chrRol = JwtEnum.ROLE_ANONIMO;
	List<Direccion> listaDireccion = new ArrayList<>();
	boolean flgDireccionDefault = false;
	String dteModificacion;
	int totalRegistros;
	String status;
	public int getNumCodigoClienteUsuario() {
		return numCodigoClienteUsuario;
	}

	public ClienteUsuario setNumCodigoClienteUsuario(int numCodigoClienteUsuario) {
		this.numCodigoClienteUsuario = numCodigoClienteUsuario;
		return this;
	}

	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}

	public ClienteUsuario setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}

	public String getChrEmail() {
		return chrEmail;
	}

	public ClienteUsuario setChrEmail(String chrEmail) {
		this.chrEmail = chrEmail;
		return this;
	}

	public String getChrPassword() {
		return chrPassword;
	}

	public ClienteUsuario setChrPassword(String chrPassword) {
		this.chrPassword = chrPassword;
		return this;
	}

	public Cliente getCliente() {
		return cliente;
	}

	public ClienteUsuario setCliente(Cliente cliente) {
		this.cliente = cliente;
		return this;
	}

	public String getToken() {
		return token;
	}

	public ClienteUsuario setToken(String token) {
		this.token = token;
		return this;
	}

	public String getChrTratamiento() {
		return chrTratamiento;
	}

	public ClienteUsuario setChrTratamiento(String chrTratamiento) {
		this.chrTratamiento = chrTratamiento;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public ClienteUsuario setResponse(Response response) {
		this.response = response;
		return this;
	}

	public boolean isFlgOfertas() {
		return flgOfertas;
	}

	public ClienteUsuario setFlgOfertas(boolean flgOfertas) {
		this.flgOfertas = flgOfertas;
		return this;
	}

	public boolean isFlgSuscripcion() {
		return flgSuscripcion;
	}

	public ClienteUsuario setFlgSuscripcion(boolean flgSuscripcion) {
		this.flgSuscripcion = flgSuscripcion;
		return this;
	}

	public CRUD getCrud() {
		return crud;
	}

	public ClienteUsuario setCrud(CRUD crud) {
		this.crud = crud;
		return this;
	}

	public Date getTokenExpire() {
		return tokenExpire;
	}

	public ClienteUsuario setTokenExpire(Date tokenExpire) {
		this.tokenExpire = tokenExpire;
		return this;
	}

	public String getChrPasswordCopia() {
		return chrPasswordCopia;
	}

	public ClienteUsuario setChrPasswordCopia(String chrPasswordCopia) {
		this.chrPasswordCopia = chrPasswordCopia;
		return this;
	}

	public JwtEnum getChrRol() {
		return chrRol;
	}

	public ClienteUsuario setChrRol(JwtEnum chrRol) {
		this.chrRol = chrRol;
		return this;
	}

	public List<Direccion> getListaDireccion() {
		return listaDireccion;
	}

	public ClienteUsuario setListaDireccion(List<Direccion> listaDireccion) {
		this.listaDireccion = listaDireccion;
		return this;
	}

	public boolean isFlgDireccionDefault() {
		return flgDireccionDefault;
	}

	public ClienteUsuario setFlgDireccionDefault(boolean flgDireccionDefault) {
		this.flgDireccionDefault = flgDireccionDefault;
		return this;
	}

	public String getDteModificacion() {
		return dteModificacion;
	}

	public ClienteUsuario setDteModificacion(String dteModificacion) {
		this.dteModificacion = dteModificacion;
		return this;
	}

	public int getTotalRegistros() {
		return totalRegistros;
	}

	public ClienteUsuario setTotalRegistros(int totalRegistros) {
		this.totalRegistros = totalRegistros;
		return this;
	}

	public int getFlgActualizaRol() {
		return flgActualizaRol;
	}

	public ClienteUsuario setFlgActualizaRol(int flgActualizaRol) {
		this.flgActualizaRol = flgActualizaRol;
		return this;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	@Override
	public String toString() {
		return "ClienteUsuario [numCodigoClienteUsuario=" + numCodigoClienteUsuario + ", numCodigoCliente="
				+ numCodigoCliente + ", chrEmail=" + chrEmail + ", chrPassword=" + chrPassword + ", chrPasswordCopia="
				+ chrPasswordCopia + ", chrTratamiento=" + chrTratamiento + ", token=" + token + ", tokenExpire="
				+ tokenExpire + ", cliente=" + cliente + ", response=" + response + ", flgOfertas=" + flgOfertas
				+ ", flgSuscripcion=" + flgSuscripcion + ", crud=" + crud + ", chrRol=" + chrRol + ", listaDireccion="
				+ listaDireccion + ", flgDireccionDefault=" + flgDireccionDefault + "]";
	}

}
