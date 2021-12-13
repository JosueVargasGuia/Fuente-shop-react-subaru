package com.ShopAutoPartsServices.Util;

import java.io.File;
import java.util.Properties;

import javax.activation.DataHandler;
import javax.activation.FileDataSource;
import javax.mail.BodyPart;
import javax.mail.Message;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeBodyPart;
import javax.mail.internet.MimeMessage;
import javax.mail.internet.MimeMultipart;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import com.ShopAutoPartsServices.Config.CorreoConfiguracion;
import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Domain.CorreoRequest;
import com.ShopAutoPartsServices.Enums.AccountsEmail;
import com.ShopAutoPartsServices.WsServices.CotizacionController;

public class BuildEnviaCorreo {
	Logger logger = LoggerFactory.getLogger(CotizacionController.class);
	CorreoConfiguracion correoConfiguracion;

	public BuildEnviaCorreo(CorreoConfiguracion correoConfiguracion) {
		super();
		this.correoConfiguracion = correoConfiguracion;
	}

	public boolean buildCorreoSSL(CorreoRequest correoRequest, String html, String subject, AccountsEmail accountsEmail,
			File adjuntar) {
		boolean envio = false;
		Properties props = new Properties();
		props.put("mail.smtp.host", correoConfiguracion.getHost());
		props.put("mail.smtp.socketFactory.port", correoConfiguracion.getSocketFactoryPort());
		props.put("mail.smtp.socketFactory.class", correoConfiguracion.getSocketFactoryClass());
		props.put("mail.smtp.auth", correoConfiguracion.getAuthSSL());
		props.put("mail.smtp.port", correoConfiguracion.getPortSSL());
		String _USER = "";
		String _CLAVE = "";
		if (accountsEmail == AccountsEmail.Compras) {
			_USER = correoConfiguracion.getUserCompras();
			_CLAVE = correoConfiguracion.getClaveCompras();
		}
		if (accountsEmail == AccountsEmail.ServicioAlCliente) {
			_USER = correoConfiguracion.getUserServicioAlCliente();
			_CLAVE = correoConfiguracion.getClaveServicioAlCliente();
		}
		if (accountsEmail == AccountsEmail.ComprobanteDePago) {
			_USER = correoConfiguracion.getUserComprobanteDePago();
			_CLAVE = correoConfiguracion.getClaveComprobanteDePago();
		}
		if (accountsEmail == AccountsEmail.ConfirmacionPedido) {
			_USER = correoConfiguracion.getUserConfirmacionPedido();
			_CLAVE = correoConfiguracion.getClaveConfirmacionPedido();
		}
		String USER = _USER;
		String CLAVE = _CLAVE;
		Session session = Session.getDefaultInstance(props, new javax.mail.Authenticator() {
			protected PasswordAuthentication getPasswordAuthentication() {
				return new PasswordAuthentication(USER, CLAVE);
			}
		});
		try {
			BodyPart texto = new MimeBodyPart();
			MimeMultipart multiParte = new MimeMultipart();
			texto.setContent(html, "text/html; charset=utf-8");
			multiParte.addBodyPart(texto);
			Message message = new MimeMessage(session);
			message.setFrom(new InternetAddress(USER));
			StringBuilder mails=new StringBuilder();   
			for (CorreoJobsOnline jobsOnline : correoRequest.getListaCorreo()) {
				message.setRecipient(Message.RecipientType.TO, new InternetAddress(jobsOnline.getVchCorreo()));
				mails.append(jobsOnline.getVchCorreo());
				mails.append(" ");				
			}
			message.setSubject(subject);
			message.setContent(multiParte, "UTF-8");
			if (adjuntar != null) {
				BodyPart adjunto = new MimeBodyPart();
				adjunto.setDataHandler(new DataHandler(new FileDataSource(adjuntar.getAbsoluteFile())));
				adjunto.setFileName(adjuntar.getName());
				multiParte.addBodyPart(adjunto);
			}
			Transport.send(message);
			envio = true;
			logger.info("Correo enviado a:" + mails.toString());
		} catch (Exception e) {
			envio = false;
			logger.info(e.getMessage());
			e.printStackTrace();

		}
		return envio;
	}
}
