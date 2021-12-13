package com.ShopAutoPartsServices.Enums;

public enum FilterProducto {
	FILTER_ALL("FILTER_ALL"), FILTER_CODIGO("FILTER_CODIGO"),
	
	FILTER_DESTACADO("FILTER_DESTACADO"), FILTER_DESTACADO_MARCA("FILTER_DESTACADO_MARCA"),
	FILTER_RECOMENDADO("FILTER_RECOMENDADO"), FILTER_OFERTA("FILTER_OFERTA"), 
	FILTER_REMATE("FILTER_REMATE"),FILTER_ALL_FIND("FILTER_ALL_FIND"),
	FILTER_SEARCH("FILTER_SEARCH");
	String contexto;

	private FilterProducto(String contexto) {
		this.contexto = contexto;
	}

	public String getContexto() {
		return contexto;
	}

	public FilterProducto setContexto(String contexto) {
		this.contexto = contexto;
		return this;
	}

}
