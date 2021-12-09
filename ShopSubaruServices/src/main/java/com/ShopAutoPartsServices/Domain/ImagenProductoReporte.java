package com.ShopAutoPartsServices.Domain;

public class ImagenProductoReporte {
	String chrCodigoProducto, vchDescripcion, chrDestacado, chrOferta, chrRecomendado, chrRemate, chrDestacadoMarca;
	Familia familia;
	public ImagenProductoReporte() {
	}

	public ImagenProductoReporte(String chrCodigoProducto, String vchDescripcion, String chrDestacado,
			String chrOferta, String chrRecomendado, String chrRemate, String chrDestacadoMarca) {
		this.chrCodigoProducto = chrCodigoProducto;
		this.vchDescripcion = vchDescripcion;
		this.chrDestacado = chrDestacado;
		this.chrOferta = chrOferta;
		this.chrRecomendado = chrRecomendado;
		this.chrRemate = chrRemate;
		this.chrDestacadoMarca = chrDestacadoMarca;
	}

	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}

	public ImagenProductoReporte setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}

	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public ImagenProductoReporte setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

	public String getChrDestacado() {
		return chrDestacado;
	}

	public ImagenProductoReporte setChrDestacado(String chrDestacado) {
		this.chrDestacado = chrDestacado;
		return this;
	}

	public String getChrOferta() {
		return chrOferta;
	}

	public ImagenProductoReporte setChrOferta(String chrOferta) {
		this.chrOferta = chrOferta;
		return this;
	}

	public String getChrRecomendado() {
		return chrRecomendado;
	}

	public ImagenProductoReporte setChrRecomendado(String chrRecomendado) {
		this.chrRecomendado = chrRecomendado;
		return this;
	}

	public String getChrRemate() {
		return chrRemate;
	}

	public ImagenProductoReporte setChrRemate(String chrRemate) {
		this.chrRemate = chrRemate;
		return this;
	}

	public String getChrDestacadoMarca() {
		return chrDestacadoMarca;
	}

	public ImagenProductoReporte setChrDestacadoMarca(String chrDestacadoMarca) {
		this.chrDestacadoMarca = chrDestacadoMarca;
		return this;
	}

	public Familia getFamilia() {
		return familia;
	}

	public ImagenProductoReporte setFamilia(Familia familia) {
		this.familia = familia;
		return this;
	}
 
}
