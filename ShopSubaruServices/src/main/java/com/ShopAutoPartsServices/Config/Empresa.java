package com.ShopAutoPartsServices.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class Empresa {
	@Value("${shop.empresa.ruc}")
	private String ruc;
	
	@Value("${shop.empresa.razonsocial}")
	private String razonSocial;
	
	@Value("${shop.empresa.alias}")
	private String alias;
	
	@Value("${shop.empresa.link}")
	private String link;
	
	@Value("${shop.empresa.direccion}")
	private String direccion;

	@Value("${shop.empresa.weburl}")
	private String weburl;
/*
	@Value("${shop.empresa.weburlpass}")
	private String webUrlPass;
*/
	@Value("${shop.empresa.logourl}")
	private String logourl;

	@Value("${shop.empresa.logourltext}")
	private String logourlText;
	
	@Value("${shop.empresa.secret}")
	private String secret;
	
	@Value("${shop.empresa.password.encriptacion.expire}")
	private int expire;
	
	@Value("${shop.mail.smtp.to.oc}")
	private String toOrdenCompra;
	
	@Value("${shop.empresa.abreviatura.sucursal}")
	private String abreviaturaSucursal;
	
	
	public String getRuc() {
		return ruc;
	}

	public Empresa setRuc(String ruc) {
		this.ruc = ruc;
		return this;
	}

	public String getRazonSocial() {
		return razonSocial;
	}

	public Empresa setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
		return this;
	}

	public String getAlias() {
		return alias;
	}

	public Empresa setAlias(String alias) {
		this.alias = alias;
		return this;
	}

	public String getDireccion() {
		return direccion;
	}

	public Empresa setDireccion(String direccion) {
		this.direccion = direccion;
		return this;
	}

	public String getWeburl() {
		return weburl;
	}

	public Empresa setWeburl(String weburl) {
		this.weburl = weburl;
		return this;
	}

	public String getLogourl() {
		return logourl;
	}

	public Empresa setLogourl(String logourl) {
		this.logourl = logourl;
		return this;
	}
/*
	public String getWebUrlPass() {
		return webUrlPass;
	}

	public Empresa setWebUrlPass(String webUrlPass) {
		this.webUrlPass = webUrlPass;
		return this;
	}
*/
	public String getSecret() {
		return secret;
	}

	public Empresa setSecret(String secret) {
		this.secret = secret;
		return this;
	}

	public int getExpire() {
		return expire;
	}

	public Empresa setExpire(int expire) {
		this.expire = expire;
		return this;
	}

	public String getToOrdenCompra() {
		return toOrdenCompra;
	}

	public Empresa setToOrdenCompra(String toOrdenCompra) {
		this.toOrdenCompra = toOrdenCompra;
		return this;
	}

	public String getAbreviaturaSucursal() {
		return abreviaturaSucursal;
	}

	public Empresa setAbreviaturaSucursal(String abreviaturaSucursal) {
		this.abreviaturaSucursal = abreviaturaSucursal;
		return this;
	}

	public String getLink() {
		return link;
	}

	public void setLink(String link) {
		this.link = link;
	}

	public String getLogourlText() {
		return logourlText;
	}

	public void setLogourlText(String logourlText) {
		this.logourlText = logourlText;
	}

	@Override
	public String toString() {
		return "Empresa [ruc=" + ruc + ", razonSocial=" + razonSocial + ", alias=" + alias + ", direccion=" + direccion
				+ ", weburl=" + weburl + ", logourl=" + logourl + ", secret=" + secret + ", expire=" + expire
				+ ", toOrdenCompra=" + toOrdenCompra + ", abreviaturaSucursal=" + abreviaturaSucursal + "]";
	}

	 

}
