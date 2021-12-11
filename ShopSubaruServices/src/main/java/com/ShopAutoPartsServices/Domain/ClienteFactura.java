package com.ShopAutoPartsServices.Domain;

import java.util.Date;

import com.ShopAutoPartsServices.Domain.IziPay.StatusIziPay;
import com.ShopAutoPartsServices.Enums.EstadoCotizacion;
import com.ShopAutoPartsServices.Enums.MetodoEnvio;
import com.ShopAutoPartsServices.Enums.Moneda;

public class ClienteFactura {
	int numCodigoCotizacionOnline;
	int numCodigoCliente;
	String chrEmail, chrTratamiento, vchNombre, vchApellido, vchrDireccion, vchNombreCompleto, vchDocumento,
			vchDepartamento, vchProvincia, vchDistrito;
	int numTipoCliente;
	StatusIziPay statusIziPay;	 
	MetodoEnvio metodoEnvio;
	Date fechaCreacion;
	Date fechaEmision;
	Date fechaEstimada;
	String vchNombreDireccion, vchApellidoDireccion, vchrDireccionDireccion,vchDocumentoDireccion;
	Moneda moneda;
	EstadoCotizacion estadoCotizacion;	
	String statusAction;
	
	double total;
	double subTotal;
	double costoEnvio;
	String docReferencia;
	public int getNumCodigoCotizacionOnline() {
		return numCodigoCotizacionOnline;
	}
	public void setNumCodigoCotizacionOnline(int numCodigoCotizacionOnline) {
		this.numCodigoCotizacionOnline = numCodigoCotizacionOnline;
	}
	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}
	public void setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
	}
	public String getChrEmail() {
		return chrEmail;
	}
	public void setChrEmail(String chrEmail) {
		this.chrEmail = chrEmail;
	}
	public String getChrTratamiento() {
		return chrTratamiento;
	}
	public void setChrTratamiento(String chrTratamiento) {
		this.chrTratamiento = chrTratamiento;
	}
	public String getVchNombre() {
		return vchNombre;
	}
	public void setVchNombre(String vchNombre) {
		this.vchNombre = vchNombre;
	}
	public String getVchApellido() {
		return vchApellido;
	}
	public void setVchApellido(String vchApellido) {
		this.vchApellido = vchApellido;
	}
	public String getVchrDireccion() {
		return vchrDireccion;
	}
	public void setVchrDireccion(String vchrDireccion) {
		this.vchrDireccion = vchrDireccion;
	}
	public String getVchNombreCompleto() {
		return vchNombreCompleto;
	}
	public void setVchNombreCompleto(String vchNombreCompleto) {
		this.vchNombreCompleto = vchNombreCompleto;
	}
	public String getVchDocumento() {
		return vchDocumento;
	}
	public void setVchDocumento(String vchDocumento) {
		this.vchDocumento = vchDocumento;
	}
	public String getVchDepartamento() {
		return vchDepartamento;
	}
	public void setVchDepartamento(String vchDepartamento) {
		this.vchDepartamento = vchDepartamento;
	}
	public String getVchProvincia() {
		return vchProvincia;
	}
	public void setVchProvincia(String vchProvincia) {
		this.vchProvincia = vchProvincia;
	}
	public String getVchDistrito() {
		return vchDistrito;
	}
	public void setVchDistrito(String vchDistrito) {
		this.vchDistrito = vchDistrito;
	}
	public int getNumTipoCliente() {
		return numTipoCliente;
	}
	public void setNumTipoCliente(int numTipoCliente) {
		this.numTipoCliente = numTipoCliente;
	}	
	public StatusIziPay getStatusIziPay() {
		return statusIziPay;
	}
	public void setStatusIziPay(StatusIziPay statusIziPay) {
		this.statusIziPay = statusIziPay;
	}
 
	public MetodoEnvio getMetodoEnvio() {
		return metodoEnvio;
	}
	public void setMetodoEnvio(MetodoEnvio metodoEnvio) {
		this.metodoEnvio = metodoEnvio;
	}
	
	public Date getFechaEmision() {
		return fechaEmision;
	}
	public void setFechaEmision(Date fechaEmision) {
		this.fechaEmision = fechaEmision;
	}
	
	public Date getFechaEstimada() {
		return fechaEstimada;
	}
	public void setFechaEstimada(Date fechaEstimada) {
		this.fechaEstimada = fechaEstimada;
	}
	
	
	public Date getFechaCreacion() {
		return fechaCreacion;
	}

	public void setFechaCreacion(Date fechaCreacion) {
		this.fechaCreacion = fechaCreacion;
	}
	public String getVchNombreDireccion() {
		return vchNombreDireccion;
	}
	public void setVchNombreDireccion(String vchNombreDireccion) {
		this.vchNombreDireccion = vchNombreDireccion;
	}
	public String getVchApellidoDireccion() {
		return vchApellidoDireccion;
	}
	public void setVchApellidoDireccion(String vchApellidoDireccion) {
		this.vchApellidoDireccion = vchApellidoDireccion;
	}
	public String getVchrDireccionDireccion() {
		return vchrDireccionDireccion;
	}
	public void setVchrDireccionDireccion(String vchrDireccionDireccion) {
		this.vchrDireccionDireccion = vchrDireccionDireccion;
	}
	
	public double getTotal() {
		return total;
	}
	public void setTotal(double total) {
		this.total = total;
	}
	public double getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(double subTotal) {
		this.subTotal = subTotal;
	}
	public double getCostoEnvio() {
		return costoEnvio;
	}
	public void setCostoEnvio(double costoEnvio) {
		this.costoEnvio = costoEnvio;
	}
	public String getVchDocumentoDireccion() {
		return vchDocumentoDireccion;
	}
	public ClienteFactura setVchDocumentoDireccion(String vchDocumentoDireccion) {
		this.vchDocumentoDireccion = vchDocumentoDireccion;
		return this;
	}
	public EstadoCotizacion getEstadoCotizacion() {
		return estadoCotizacion;
	}
	public ClienteFactura setEstadoCotizacion(EstadoCotizacion estadoCotizacion) {
		this.estadoCotizacion = estadoCotizacion;
		return this;
	}
 
	public String getStatusAction() {
		return statusAction;
	}
	public ClienteFactura setStatusAction(String statusAction) {
		this.statusAction = statusAction;
		return this;
	}
	public String getDocReferencia() {
		return docReferencia;
	}
	public ClienteFactura setDocReferencia(String docReferencia) {
		this.docReferencia = docReferencia;
		return this;
	}
	public Moneda getMoneda() {
		return moneda;
	}
	public ClienteFactura setMoneda(Moneda moneda) {
		this.moneda = moneda;
		return this;
	}
	 
	 
 
	
}
