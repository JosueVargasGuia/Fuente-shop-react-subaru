package com.ShopAutoPartsServices.Enums;

public enum MetodoEnvio {
	RecojoAlmacen(0, "RecojoAlmacen", "Recojo en Almacén", "Calle Libertad 386 - San Miguel", "almacen.png", "Gratis"),
	EnvioRegular(1, "EnvioRegular", "Envio Regular", "Entrega en los siguientes 10 dias", "camion.png", "");

	String codigo, descripcion, direccion, icons, precio;
	int numTipoMetodoEnvio;

	private MetodoEnvio(int numTipoMetodoEnvio, String codigo, String descripcion, String direccion, String icons,
			String precio) {
		this.numTipoMetodoEnvio = numTipoMetodoEnvio;
		this.codigo = codigo;
		this.descripcion = descripcion;
		this.direccion = direccion;
		this.icons = icons;
		this.precio = precio;
	}

	public String getCodigo() {
		return codigo;
	}

	public MetodoEnvio setCodigo(String codigo) {
		this.codigo = codigo;
		return this;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public MetodoEnvio setDescripcion(String descripcion) {
		this.descripcion = descripcion;
		return this;
	}

	public String getDireccion() {
		return direccion;
	}

	public MetodoEnvio setDireccion(String direccion) {
		this.direccion = direccion;
		return this;
	}

	public String getIcons() {
		return icons;
	}

	public MetodoEnvio setIcons(String icons) {
		this.icons = icons;
		return this;
	}

	public String getPrecio() {
		return precio;
	}

	public MetodoEnvio setPrecio(String precio) {
		this.precio = precio;
		return this;
	}

	public int getNumTipoMetodoEnvio() {
		return numTipoMetodoEnvio;
	}

	public MetodoEnvio setNumTipoMetodoEnvio(int numTipoMetodoEnvio) {
		this.numTipoMetodoEnvio = numTipoMetodoEnvio;
		return this;
	}

}
