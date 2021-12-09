package com.ShopAutoPartsServices.Config;

 
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
 
 

@Configuration 
public class CorreoConfiguracion {
	 
	@Value("${shop.mail.smtp.host}")
	private String host;
	
	
	@Value("${shop.mail.smtp.user.servicioalcliente}")
	private String UserServicioAlCliente;
	
	@Value("${shop.mail.smtp.clave.servicioalcliente}")
	private String ClaveServicioAlCliente;
	
	@Value("${shop.mail.smtp.user.confirmacionpedido}")
	private String UserConfirmacionPedido;
	
	@Value("${shop.mail.smtp.clave.confirmacionpedido}")
	private String ClaveConfirmacionPedido;
	
	@Value("${shop.mail.smtp.user.comprobantedepago}")
	private String UserComprobanteDePago;
	
	@Value("${shop.mail.smtp.clave.comprobantedepago}")
	private String ClaveComprobanteDePago;
	
	@Value("${shop.mail.smtp.user.compras}")
	private String UserCompras;
	
	@Value("${shop.mail.smtp.clave.compras}")
	private String ClaveCompras;
	
	@Value("${shop.mail.smtp.SSL.auth}")
	private String authSSL; 
	
	@Value("${shop.mail.smtp.SSL.port}")
	private String portSSL;
	
	@Value("${shop.mail.smtp.SSL.socketFactory.port}")
	private String socketFactoryPort; 
	
	@Value("${shop.mail.smtp.SSL.socketFactory.class}")
	private String socketFactoryClass;
	
 
	@Value("${shop.mail.smtp.No_SSL.auth}")
	private String authNoSSL; 
	
	@Value("${shop.mail.smtp.No_SSL.port}")
	private String portNoSSL;

	public String getHost() {
		return host;
	}

	public CorreoConfiguracion setHost(String host) {
		this.host = host;
		return this;
	}

	

	public String getUserServicioAlCliente() {
		return UserServicioAlCliente;
	}

	public CorreoConfiguracion setUserServicioAlCliente(String userServicioAlCliente) {
		UserServicioAlCliente = userServicioAlCliente;
		return this;
	}

	public String getClaveServicioAlCliente() {
		return ClaveServicioAlCliente;
	}

	public CorreoConfiguracion setClaveServicioAlCliente(String claveServicioAlCliente) {
		ClaveServicioAlCliente = claveServicioAlCliente;
		return this;
	}

	public String getUserConfirmacionPedido() {
		return UserConfirmacionPedido;
	}

	public CorreoConfiguracion setUserConfirmacionPedido(String userConfirmacionPedido) {
		UserConfirmacionPedido = userConfirmacionPedido;
		return this;
	}

	public String getClaveConfirmacionPedido() {
		return ClaveConfirmacionPedido;
	}

	public CorreoConfiguracion setClaveConfirmacionPedido(String claveConfirmacionPedido) {
		ClaveConfirmacionPedido = claveConfirmacionPedido;
		return this;
	}

	public String getUserComprobanteDePago() {
		return UserComprobanteDePago;
	}

	public CorreoConfiguracion setUserComprobanteDePago(String userComprobanteDePago) {
		UserComprobanteDePago = userComprobanteDePago;
		return this;
	}

	public String getClaveComprobanteDePago() {
		return ClaveComprobanteDePago;
	}

	public CorreoConfiguracion setClaveComprobanteDePago(String claveComprobanteDePago) {
		ClaveComprobanteDePago = claveComprobanteDePago;
		return this;
	}

	public String getUserCompras() {
		return UserCompras;
	}

	public CorreoConfiguracion setUserCompras(String userCompras) {
		UserCompras = userCompras;
		return this;
	}

	public String getClaveCompras() {
		return ClaveCompras;
	}

	public CorreoConfiguracion setClaveCompras(String claveCompras) {
		ClaveCompras = claveCompras;
		return this;
	}

	public String getAuthSSL() {
		return authSSL;
	}

	public CorreoConfiguracion setAuthSSL(String authSSL) {
		this.authSSL = authSSL;
		return this;
	}

	public String getPortSSL() {
		return portSSL;
	}

	public CorreoConfiguracion setPortSSL(String portSSL) {
		this.portSSL = portSSL;
		return this;
	}

	public String getSocketFactoryPort() {
		return socketFactoryPort;
	}

	public CorreoConfiguracion setSocketFactoryPort(String socketFactoryPort) {
		this.socketFactoryPort = socketFactoryPort;
		return this;
	}

	public String getSocketFactoryClass() {
		return socketFactoryClass;
	}

	public CorreoConfiguracion setSocketFactoryClass(String socketFactoryClass) {
		this.socketFactoryClass = socketFactoryClass;
		return this;
	}

	public String getAuthNoSSL() {
		return authNoSSL;
	}

	public CorreoConfiguracion setAuthNoSSL(String authNoSSL) {
		this.authNoSSL = authNoSSL;
		return this;
	}

	public String getPortNoSSL() {
		return portNoSSL;
	}

	public CorreoConfiguracion setPortNoSSL(String portNoSSL) {
		this.portNoSSL = portNoSSL;
		return this;
	}
	
}
