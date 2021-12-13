package com.ShopAutoPartsServices.Domain;

import com.ShopAutoPartsServices.ServiceConfiguracion.JwtEnum;

public class ClienteLoginRequest {
	String username;
	String password;
	JwtEnum chrRol = JwtEnum.ROLE_ANONIMO;

	public String getUsername() {
		return username;
	}

	public ClienteLoginRequest setUsername(String username) {
		this.username = username;
		return this;
	}

	public String getPassword() {
		return password;
	}

	public ClienteLoginRequest setPassword(String password) {
		this.password = password;
		return this;
	}

	public JwtEnum getChrRol() {
		return chrRol;
	}

	public ClienteLoginRequest setChrRol(JwtEnum chrRol) {
		this.chrRol = chrRol;
		return this;
	}

}
