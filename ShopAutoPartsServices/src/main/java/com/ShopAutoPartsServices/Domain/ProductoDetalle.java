package com.ShopAutoPartsServices.Domain;

public class ProductoDetalle {
String titulo,descripcion;
int rowTipo;

public String getTitulo() {
	return titulo;
}

public ProductoDetalle setTitulo(String titulo) {
	this.titulo = titulo;
	return this;
}

public String getDescripcion() {
	return descripcion;
}

public ProductoDetalle setDescripcion(String descripcion) {
	this.descripcion = descripcion;
	return this;
}

public int getRowTipo() {
	return rowTipo;
}

public ProductoDetalle setRowTipo(int rowTipo) {
	this.rowTipo = rowTipo;
	return this;
}

}
