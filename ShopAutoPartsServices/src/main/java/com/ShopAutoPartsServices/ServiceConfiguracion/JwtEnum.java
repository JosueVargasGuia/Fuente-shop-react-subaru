package com.ShopAutoPartsServices.ServiceConfiguracion;

public enum JwtEnum {
	BEARER("Bearer"),
	SECRET_KEY("$h0p@ut0Part$$3rv1c3sNTUsIk5VTU"),
	NUMCODIGOCLIENTE("numCodigoCliente"),
	AUTHORITIES("authorities"),
	AUTHORIZATION("authorization"),
	ROLE_USER("ROLE_USER"),
	ROLE_ADMIN("ROLE_ADMIN"),
	ROLE_ANONIMO("ROLE_ANONIMO"),
	//HEADER ( "Authorization")
	;
	String contexs;

	private JwtEnum(String contex) {
		this.contexs = contex;
	}

	public String getContex() {
		return contexs;
	}

	public void setContex(String contex) {
		this.contexs = contex;
		 
	}
	
}
