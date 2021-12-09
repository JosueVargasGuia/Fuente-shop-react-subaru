package com.ShopAutoPartsServices.FE.Beans;

public class BeanEmpresa {
	private int codigo;
	private String nombreComercial;
	private String nombre;
	private String direccion;
	private String ubigeo;
	private String ruc;
	private String rutaImpresora;
	private String detraccion;
	private String cuentaDetraccion;
	private String telefono;
	
	/**
	 * @param codigo
	 * @param nombreComercial
	 * @param nombre
	 * @param direccion
	 * @param ubigeo
	 * @param ruc
	 */
	public BeanEmpresa(int codigo, String nombreComercial, String nombre,
			String direccion, String ubigeo, String ruc, String rutaImpresora, String detraccion,
			String cuentaDetraccion, String telefono) {
		this.codigo = codigo;
		this.nombreComercial = nombreComercial;
		this.nombre = nombre;
		this.direccion = direccion;
		this.ubigeo = ubigeo;
		this.ruc = ruc;
		this.rutaImpresora = rutaImpresora;
		this.detraccion = detraccion;
		this.cuentaDetraccion = cuentaDetraccion;
		this.telefono = telefono;
	}
	
	
	/**
	 * 
	 */
	public BeanEmpresa() {
	}

	public int getCodigo() {
		return codigo;
	}
	public void setCodigo(int codigo) {
		this.codigo = codigo;
	}
	public String getNombreComercial() {
		return nombreComercial;
	}
	public void setNombreComercial(String nombreComercial) {
		this.nombreComercial = nombreComercial;
	}
	public String getNombre() {
		return nombre;
	}
	public void setNombre(String nombre) {
		this.nombre = nombre;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getUbigeo() {
		return ubigeo;
	}
	public void setUbigeo(String ubigeo) {
		this.ubigeo = ubigeo;
	}
	public String getRuc() {
		return ruc;
	}
	public void setRuc(String ruc) {
		this.ruc = ruc;
	}
	public String getRutaImpresora() {
		return rutaImpresora;
	}
	public void setRutaImpresora(String rutaImpresora) {
		this.rutaImpresora = rutaImpresora;
	}
	public String getDetraccion() {
		return detraccion;
	}
	public void setDetraccion(String detraccion) {
		this.detraccion = detraccion;
	}
	public String getCuentaDetraccion() {
		return cuentaDetraccion;
	}
	public void setCuentaDetraccion(String cuentaDetraccion) {
		this.cuentaDetraccion = cuentaDetraccion;
	}


	public String getTelefono() {
		return telefono;
	}


	public void setTelefono(String telefono) {
		this.telefono = telefono;
	}
	
	
	
}
