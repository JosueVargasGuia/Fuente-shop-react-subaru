package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.Enums.CRUD;

public class ProductoCaracteristica {
	int numCodProdCaracteristica;
	String chrCodigoProducto;
 
	Caracteristica caracteristica = new Caracteristica();
	String chrValue;
	CRUD crud=CRUD.SELECT;

	public int getNumCodProdCaracteristica() {
		return numCodProdCaracteristica;
	}

	public ProductoCaracteristica setNumCodProdCaracteristica(int numCodProdCaracteristica) {
		this.numCodProdCaracteristica = numCodProdCaracteristica;
		return this;
	}

	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}

	public ProductoCaracteristica setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}

 

	public Caracteristica getCaracteristica() {
		return caracteristica;
	}

	public ProductoCaracteristica setCaracteristica(Caracteristica caracteristica) {
		this.caracteristica = caracteristica;
		return this;
	}

	public String getChrValue() {
		return chrValue;
	}

	public ProductoCaracteristica setChrValue(String chrValue) {
		this.chrValue = chrValue;
		return this;
	}

	public CRUD getCrud() {
		return crud;
	}

	public ProductoCaracteristica setCrud(CRUD crud) {
		this.crud = crud;
		return this;
	}

	@Override
	public String toString() {
		return "ProductoCaracteristica [numCodProdCaracteristica=" + numCodProdCaracteristica + ", chrCodigoProducto="
				+ chrCodigoProducto + ", caracteristica=" + caracteristica + ", chrValue=" + chrValue + ", crud=" + crud
				+ "]";
	}

}
