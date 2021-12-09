package com.ShopAutoPartsServices.Domain;

public class UsuarioAdminRequest {
	int page, limit, numCodigoClienteUsuario, numCodigoCliente;

	public int getPage() {
		return page;
	}

	public UsuarioAdminRequest setPage(int page) {
		this.page = page;
		return this;
	}

	public int getLimit() {
		return limit;
	}

	public UsuarioAdminRequest setLimit(int limit) {
		this.limit = limit;
		return this;
	}

	public int getNumCodigoClienteUsuario() {
		return numCodigoClienteUsuario;
	}

	public UsuarioAdminRequest setNumCodigoClienteUsuario(int numCodigoClienteUsuario) {
		this.numCodigoClienteUsuario = numCodigoClienteUsuario;
		return this;
	}

	public int getNumCodigoCliente() {
		return numCodigoCliente;
	}

	public UsuarioAdminRequest setNumCodigoCliente(int numCodigoCliente) {
		this.numCodigoCliente = numCodigoCliente;
		return this;
	}

}
