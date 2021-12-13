package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

public class ProductoStockResponse {
List<ProductoStock>listaStock=new ArrayList<ProductoStock>();
Response response=new Response();
 
public Response getResponse() {
	return response;
}
public ProductoStockResponse setResponse(Response response) {
	this.response = response;
	return this;
}
public List<ProductoStock> getListaStock() {
	return listaStock;
}

public ProductoStockResponse setListaStock(List<ProductoStock> listaStock) {
	this.listaStock = listaStock;
	return this;
}

}
