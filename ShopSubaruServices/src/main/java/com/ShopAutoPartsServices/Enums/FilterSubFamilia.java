package com.ShopAutoPartsServices.Enums;

public enum FilterSubFamilia {
	FILTER_SUBFAMILIA_ALL("FILTER_SUBFAMILIA_ALL"), FILTER_SUBFAMILIA_LIST("FILTER_SUBFAMILIA_LIST");

	String contexto;

	private FilterSubFamilia(String contexto) {
		this.contexto = contexto;
	}

	public String getContexto() {
		return contexto;
	}

	public FilterSubFamilia setContexto(String contexto) {
		this.contexto = contexto;
		return this;
	}
}
