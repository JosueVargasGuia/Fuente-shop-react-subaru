package com.ShopAutoPartsServices.Domain;

import java.util.Date;

import com.ShopAutoPartsServices.Enums.CRUD;

public class Direccion {
	int numCodigoDireccion;

	String vchrAlias,vchDireccion, vchreferencia, vchNombre, vchApellido, chrCodigoUbigeo, vchTelefono, flgRegistro,vchDocumento ;
	int numTipoDocumento;
	Departamento departamento;
	Provincia provincia;
	Distrito distrito;
	Date dteCreacion, dteModificacion;
	ClienteDireccion clienteDireccion;
	boolean flgPredeterminado;
	Response response=new Response();
	CRUD crud=CRUD.SELECT;
	String flgFacturacion;
	int nsecuencia;
	
	public int getNumCodigoDireccion() {
		return numCodigoDireccion;
	}
	public Direccion setNumCodigoDireccion(int numCodigoDireccion) {
		this.numCodigoDireccion = numCodigoDireccion;
		return this;
	}
	public String getVchDireccion() {
		return vchDireccion;
	}
	public Direccion setVchDireccion(String vchDireccion) {
		this.vchDireccion = vchDireccion;
		return this;
	}
	public String getVchreferencia() {
		return vchreferencia;
	}
	public Direccion setVchreferencia(String vchreferencia) {
		this.vchreferencia = vchreferencia;
		return this;
	}
	public String getVchNombre() {
		return vchNombre;
	}
	public Direccion setVchNombre(String vchNombre) {
		this.vchNombre = vchNombre;
		return this;
	}
	public String getVchApellido() {
		return vchApellido;
	}
	public Direccion setVchApellido(String vchApellido) {
		this.vchApellido = vchApellido;
		return this;
	}
	public String getChrCodigoUbigeo() {
		return chrCodigoUbigeo;
	}
	public Direccion setChrCodigoUbigeo(String chrCodigoUbigeo) {
		this.chrCodigoUbigeo = chrCodigoUbigeo;
		return this;
	}
	public String getVchTelefono() {
		return vchTelefono;
	}
	public Direccion setVchTelefono(String vchTelefono) {
		this.vchTelefono = vchTelefono;
		return this;
	}
	public String getFlgRegistro() {
		return flgRegistro;
	}
	public Direccion setFlgRegistro(String flgRegistro) {
		this.flgRegistro = flgRegistro;
		return this;
	}
	 
	public boolean isFlgPredeterminado() {
		return flgPredeterminado;
	}
	public Direccion setFlgPredeterminado(boolean flgPredeterminado) {
		this.flgPredeterminado = flgPredeterminado;
		return this;
	}
	public String getVchrAlias() {
		return vchrAlias;
	}
	public Direccion setVchrAlias(String vchrAlias) {
		this.vchrAlias = vchrAlias;
		return this;
	}
	 
	public Date getDteCreacion() {
		return dteCreacion;
	}
	public Direccion setDteCreacion(Date dteCreacion) {
		this.dteCreacion = dteCreacion;
		return this;
	}
	public Date getDteModificacion() {
		return dteModificacion;
	}
	public Direccion setDteModificacion(Date dteModificacion) {
		this.dteModificacion = dteModificacion;
		return this;
	}
	public ClienteDireccion getClienteDireccion() {
		return clienteDireccion;
	}
	public Direccion setClienteDireccion(ClienteDireccion clienteDireccion) {
		this.clienteDireccion = clienteDireccion;
		return this;
	}
	public Departamento getDepartamento() {
		return departamento;
	}
	public Direccion setDepartamento(Departamento departamento) {
		this.departamento = departamento;
		return this;
	}
	public Provincia getProvincia() {
		return provincia;
	}
	public Direccion setProvincia(Provincia provincia) {
		this.provincia = provincia;
		return this;
	}
	public Distrito getDistrito() {
		return distrito;
	}
	public Direccion setDistrito(Distrito distrito) {
		this.distrito = distrito;
		return this;
	}
	public Response getResponse() {
		return response;
	}
	public Direccion setResponse(Response response) {
		this.response = response;
		return this;
	}
	public String getVchDocumento() {
		return vchDocumento;
	}
	public Direccion setVchDocumento(String vchDocumento) {
		this.vchDocumento = vchDocumento;
		return this;
	}
	public int getNumTipoDocumento() {
		return numTipoDocumento;
	}
	public Direccion setNumTipoDocumento(int numTipoDocumento) {
		this.numTipoDocumento = numTipoDocumento;
		return this;
	}
	
	public CRUD getCrud() {
		return crud;
	}
	public Direccion setCrud(CRUD crud) {
		this.crud = crud;
		return this;
	}	
	public String getFlgFacturacion() {
		return flgFacturacion;
	}
	public Direccion setFlgFacturacion(String flgFacturacion) {
		this.flgFacturacion = flgFacturacion;
		return this;
	}
	
	
	public int getNsecuencia() {
		return nsecuencia;
	}
	public Direccion setNsecuencia(int nsecuencia) {
		this.nsecuencia = nsecuencia;
		return this;
	}
	@Override
	public String toString() {
		return "Direccion [numCodigoDireccion=" + numCodigoDireccion + ", vchrAlias=" + vchrAlias + ", vchDireccion="
				+ vchDireccion + ", vchreferencia=" + vchreferencia + ", vchNombre=" + vchNombre + ", vchApellido="
				+ vchApellido + ", chrCodigoUbigeo=" + chrCodigoUbigeo + ", vchTelefono=" + vchTelefono
				+ ", flgRegistro=" + flgRegistro + ", vchDocumento=" + vchDocumento + ", numTipoDocumento="
				+ numTipoDocumento + ", departamento=" + departamento + ", provincia=" + provincia + ", distrito="
				+ distrito + ", dteCreacion=" + dteCreacion + ", dteModificacion=" + dteModificacion
				+ ", clienteDireccion=" + clienteDireccion + ", flgPredeterminado=" + flgPredeterminado + ", response="
				+ response + ", crud=" + crud + "]";
	}
 
	
	
}
