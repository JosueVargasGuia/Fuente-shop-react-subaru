package com.ShopAutoPartsServices.WsServices;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
 
import org.springframework.web.bind.annotation.PostMapping;
 
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
 
import org.springframework.web.bind.annotation.RestController;

import com.ShopAutoPartsServices.Domain.Suscripcion;
import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;
import com.ShopAutoPartsServices.Service.Impl.ClienteServiceImpl;

@RestController
@RequestMapping("service/suscripcion")
public class SuscripcionController {
	Logger logger = LoggerFactory.getLogger(ClienteAuthorizationController.class);
	@Autowired
	ClienteServiceImpl clienteService;

	@PostMapping(value = "/registro", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Suscripcion> registrarSuscripcion(@RequestBody Suscripcion suscripcion) {
		ResponseEntity<Suscripcion> responseEntity = null;
		boolean isValidado = true;
		List<String> error = new ArrayList<String>();
		try {
			 
			if (suscripcion.getVchEmail() == null || suscripcion.getVchEmail().length() <= 4) {
				error.add("El correo es requerido");
				isValidado = false;
			}
			Pattern pattern = Pattern.compile(
					"^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$");
			Matcher matcher = pattern.matcher(suscripcion.getVchEmail());
			if (matcher.find() == false) {
				error.add("El correo no tiene el formato correspondiente");
				isValidado = false;
			}
			 
			if (isValidado) {
				suscripcion = clienteService.registrarSuscripcion(suscripcion);
				suscripcion.getResponse()				 
				.setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK)
				.setError(error);				 
			} else {
				suscripcion.getResponse()				 
				.setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO)
				.setError(error);				
			}
			responseEntity = new ResponseEntity<Suscripcion>(suscripcion, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			suscripcion.getResponse()			 
			.setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
			.setError(error);			
			suscripcion.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<Suscripcion>(suscripcion, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;

	}
}
