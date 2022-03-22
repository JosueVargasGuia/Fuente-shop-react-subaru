package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.CRUD;
import com.ShopAutoPartsServices.Enums.FilterProducto;

public class ProductoImagen {
	int numCodigoProductoImagen;// NUMBER NOT NULL,
	String chrCodigoProducto;// CHAR(20 BYTE) NOT NULL,
	String chrSrcImagen;// BLOB,
	String chrNombre;// VARCHAR2(255 BYTE),
	String chrType;// CHAR(20 BYTE)
	String chrPredeterminado;
	Response response=new Response();
	CRUD crud=CRUD.SELECT;
	FilterProducto filter=FilterProducto.FILTER_ALL;
	String typeFilter="";
	public int getNumCodigoProductoImagen() {
		return numCodigoProductoImagen;
	}

	public ProductoImagen setNumCodigoProductoImagen(int numCodigoProductoIimagen) {
		this.numCodigoProductoImagen = numCodigoProductoIimagen;
		return this;
	}

	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}

	public ProductoImagen setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}

	public String getChrSrcImagen() {
		return chrSrcImagen;
	}

	public ProductoImagen setChrSrcImagen(String chrSrcImagen) {
		this.chrSrcImagen = chrSrcImagen;
		return this;
	}

	public String getChrNombre() {
		return chrNombre;
	}

	public ProductoImagen setChrNombre(String chrNombre) {
		this.chrNombre = chrNombre;
		return this;
	}

	public String getChrType() {
		return chrType;
	}

	public ProductoImagen setChrType(String chrType) {
		this.chrType = chrType;
		return this;
	}

	 
	public String getChrPredeterminado() {
		return chrPredeterminado;
	}

	public ProductoImagen setChrPredeterminado(String chrPredeterminado) {
		this.chrPredeterminado = chrPredeterminado;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public ProductoImagen setResponse(Response response) {
		this.response = response;
		return this;
	}

	public CRUD getCrud() {
		return crud;
	}

	public ProductoImagen setCrud(CRUD crud) {
		this.crud = crud;
		return this;
	}

	public FilterProducto getFilter() {
		return filter;
	}

	public ProductoImagen setFilter(FilterProducto filter) {
		this.filter = filter;
		return this;
	}

	public String getTypeFilter() {
		return typeFilter;
	}

	public void setTypeFilter(String typeFilter) {
		this.typeFilter = typeFilter;
		 
	}

	@Override
	public String toString() {
		return "ProductoImagen [numCodigoProductoImagen=" + numCodigoProductoImagen + ", chrCodigoProducto="
				+ chrCodigoProducto +  ", chrNombre=" + chrNombre + ", chrType="
				+ chrType + ", chrPredeterminado=" + chrPredeterminado + ", response=" + response + ", crud=" + crud
				+ ", filter=" + filter + "]";
	}
 

}
