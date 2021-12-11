package com.ShopAutoPartsServices.Enums;

public enum CRUD {
	INSERT(1, "CREATE", "GUARDAR", "GUARDANDO..."), UPDATE(2, "UPDATE", "ACTUALIZAR", "ACTUALINZANDO..."),
	DELETE(3, "DELETE", "ELIMINAR", "ELIMINANDO..."), SELECT(4, "READ", "CONSULTAR", "CONSULTANDO...");

	int codigoCrud;
	String descripcion, estado, estadoRequest;

	private CRUD(int codigoCrud, String descripcion, String estado, String estadoRequest) {
		this.codigoCrud = codigoCrud;
		this.descripcion = descripcion;
		this.estado = estado;
		this.estadoRequest = estadoRequest;
	}

	public int getCodigoCrud() {
		return codigoCrud;
	}

	public CRUD setCodigoCrud(int codigoCrud) {
		this.codigoCrud = codigoCrud;
		return this;
	}

	public String getDescripcion() {
		return descripcion;
	}

	public CRUD setDescripcion(String descripcion) {
		this.descripcion = descripcion;
		return this;
	}

	public String getEstado() {
		return estado;
	}

	public CRUD setEstado(String estado) {
		this.estado = estado;
		return this;
	}

	public String getEstadoRequest() {
		return estadoRequest;
	}

	public CRUD setEstadoRequest(String estadoRequest) {
		this.estadoRequest = estadoRequest;
		return this;
	}

}
