package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

import com.ShopAutoPartsServices.Enums.CRUD;

public class ProductoOutletRequets {
	List<ProductoOutlet> lista = new ArrayList<ProductoOutlet>(); 
	ProductoOutletVigencia productoOutletVigencia=new ProductoOutletVigencia();
	CRUD crud;
	public List<ProductoOutlet> getLista() {
		return lista;
	}
	public ProductoOutletRequets setLista(List<ProductoOutlet> lista) {
		this.lista = lista;
		return this;
	}
	public ProductoOutletVigencia getProductoOutletVigencia() {
		return productoOutletVigencia;
	}
	public ProductoOutletRequets setProductoOutletVigencia(ProductoOutletVigencia productoOutletVigencia) {
		this.productoOutletVigencia = productoOutletVigencia;
		return this;
	}
	public CRUD getCrud() {
		return crud;
	}
	public ProductoOutletRequets setCrud(CRUD crud) {
		this.crud = crud;
		return this;
	}
	@Override
	public String toString() {
		return "ProductoOutletRequets [lista=" + lista + ", productoOutletVigencia=" + productoOutletVigencia.toString()
				+ ", crud=" + crud + "]";
	}
	
}
