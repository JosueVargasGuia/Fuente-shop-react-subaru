package com.ShopAutoPartsServices.Domain;

import java.util.Date;
import java.util.List;

public class Cliente {
	int numCodigoCliente;// NUMBER NOT NULL,
	String vchDocumento;// VARCHAR2(20 BYTE),
	String vchNombre;// VARCHAR2(100 BYTE),
	String vchApellidoPaterno;// VARCHAR2(100 BYTE),
	String vchApellidoMaterno;// VARCHAR2(100 BYTE),
	String vchNombreCompleto;// VARCHAR2(100 BYTE),
	int numTipoCliente;// NUMBER,
	String vchDireccion;// VARCHAR2(100 BYTE),
	String chrCodigoUbigeo;// CHAR(6 BYTE),
	String chrCodigoUbigeo2;// CHAR(6 BYTE),
	String chrInfoEntregaDomicilio;// CHAR(1 BYTE),
	String chrFormapago;// CHAR(3 BYTE),
	String chrTarjeta;// CHAR(6 BYTE),
	Date dteCreacion;// DATE
	String vchTelefonoFijo;
	String vchTelefonoMovil;
	List<ClienteDireccion> listaClienteDireccion;
	/* Datos Completacion */
	Ubigeo ubigeo = new Ubigeo();

	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}

	public Cliente setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}

	public String getVchDocumento() {
		return vchDocumento;
	}

	public Cliente setVchDocumento(String vchDocumento) {
		this.vchDocumento = vchDocumento;
		return this;
	}

	public String getVchNombre() {
		return vchNombre;
	}

	public Cliente setVchNombre(String vchNombre) {
		this.vchNombre = vchNombre;
		return this;
	}

	public String getVchApellidoPaterno() {
		return vchApellidoPaterno;
	}

	public Cliente setVchApellidoPaterno(String vchApellidoPaterno) {
		this.vchApellidoPaterno = vchApellidoPaterno;
		return this;
	}

	public String getVchNombreCompleto() {
		return vchNombreCompleto;
	}

	public Cliente setVchNombreCompleto(String vchNombreCompleto) {
		this.vchNombreCompleto = vchNombreCompleto;
		return this;
	}

	public int getNumTipoCliente() {
		return numTipoCliente;
	}

	public Cliente setNumTipoCliente(int numTipoCliente) {
		this.numTipoCliente = numTipoCliente;
		return this;
	}

	public String getVchDireccion() {
		return vchDireccion;
	}

	public Cliente setVchDireccion(String vchDireccion) {
		this.vchDireccion = vchDireccion;
		return this;
	}

	public String getChrCodigoUbigeo() {
		return chrCodigoUbigeo;
	}

	public Cliente setChrCodigoUbigeo(String chrCodigoUbigeo) {
		this.chrCodigoUbigeo = chrCodigoUbigeo;
		return this;
	}

	public String getChrCodigoUbigeo2() {
		return chrCodigoUbigeo2;
	}

	public Cliente setChrCodigoUbigeo2(String chrCodigoUbigeo2) {
		this.chrCodigoUbigeo2 = chrCodigoUbigeo2;
		return this;
	}

	public String getChrInfoEntregaDomicilio() {
		return chrInfoEntregaDomicilio;
	}

	public Cliente setChrInfoEntregaDomicilio(String chrInfoEntregaDomicilio) {
		this.chrInfoEntregaDomicilio = chrInfoEntregaDomicilio;
		return this;
	}

	public String getChrFormapago() {
		return chrFormapago;
	}

	public Cliente setChrFormapago(String chrFormapago) {
		this.chrFormapago = chrFormapago;
		return this;
	}

	public String getChrTarjeta() {
		return chrTarjeta;
	}

	public Cliente setChrTarjeta(String chrTarjeta) {
		this.chrTarjeta = chrTarjeta;
		return this;
	}

	public Date getDteCreacion() {
		return dteCreacion;
	}

	public Cliente setDteCreacion(Date dteCreacion) {
		this.dteCreacion = dteCreacion;
		return this;
	}

	public List<ClienteDireccion> getListaClienteDireccion() {
		return listaClienteDireccion;
	}

	public Cliente setListaClienteDireccion(List<ClienteDireccion> listaClienteDetalle) {
		this.listaClienteDireccion = listaClienteDetalle;
		return this;
	}

	public String getVchApellidoMaterno() {
		return vchApellidoMaterno;
	}

	public Cliente setVchApellidoMaterno(String vchApellidoMaterno) {
		this.vchApellidoMaterno = vchApellidoMaterno;
		return this;
	}

	public Ubigeo getUbigeo() {
		return ubigeo;
	}

	public Cliente setUbigeo(Ubigeo ubigeo) {
		this.ubigeo = ubigeo;
		return this;
	}

	public String getVchTelefonoFijo() {
		return vchTelefonoFijo;
	}

	public Cliente setVchTelefonoFijo(String vchTelefonoFijo) {
		this.vchTelefonoFijo = vchTelefonoFijo;
		return this;
	}

	public String getVchTelefonoMovil() {
		return vchTelefonoMovil;
	}

	public Cliente setVchTelefonoMovil(String vchTelefonoMovil) {
		this.vchTelefonoMovil = vchTelefonoMovil;
		return this;
	}

	@Override
	public String toString() {
		return "Cliente [numCodigoCliente=" + numCodigoCliente + ", vchDocumento=" + vchDocumento + ", vchNombre="
				+ vchNombre + ", vchApellidoPaterno=" + vchApellidoPaterno + ", vchApellidoMaterno="
				+ vchApellidoMaterno + ", vchNombreCompleto=" + vchNombreCompleto + ", numTipoCliente=" + numTipoCliente
				+ ", vchDireccion=" + vchDireccion + ", chrCodigoUbigeo=" + chrCodigoUbigeo + ", chrCodigoUbigeo2="
				+ chrCodigoUbigeo2 + ", chrInfoEntregaDomicilio=" + chrInfoEntregaDomicilio + ", chrFormapago="
				+ chrFormapago + ", chrTarjeta=" + chrTarjeta + ", dteCreacion=" + dteCreacion + ", vchTelefonoFijo="
				+ vchTelefonoFijo + ", vchTelefonoMovil=" + vchTelefonoMovil

				+ ", listaClienteDireccion=" + listaClienteDireccion + ", ubigeo=" + ubigeo + "]";
	}

}
