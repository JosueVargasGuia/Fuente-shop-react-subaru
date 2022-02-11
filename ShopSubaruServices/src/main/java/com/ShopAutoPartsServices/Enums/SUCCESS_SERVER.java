package com.ShopAutoPartsServices.Enums;

public enum SUCCESS_SERVER {
	SUCCES_SERVER_DEFAULT("SUCCES_SERVER_DEFAULT"), 
	SUCCES_SERVER_OK("SUCCES_SERVER_OK"),
	SUCCES_SERVER_INFO("SUCCES_SERVER_INFO"),
	SUCCES_SERVER_ERROR("SUCCES_SERVER_ERROR"),
	SUCCES_SERVER_EXPIRE("SUCCES_SERVER_EXPIRE"),;

	String value;

	private SUCCESS_SERVER(String value) {
		this.value = value;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}
}
