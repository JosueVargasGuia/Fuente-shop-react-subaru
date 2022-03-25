package com.ShopAutoPartsServices.WsServices;

import java.sql.SQLIntegrityConstraintViolationException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ShopAutoPartsServices.Config.CorreoConfiguracion;
import com.ShopAutoPartsServices.Config.Empresa;
import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Domain.CorreoJobsResponse;
import com.ShopAutoPartsServices.Domain.CorreoRequest;
import com.ShopAutoPartsServices.Domain.Direccion;
import com.ShopAutoPartsServices.Domain.MenuOnline;
import com.ShopAutoPartsServices.Domain.MenuOnlineResponse;
import com.ShopAutoPartsServices.Enums.AccountsEmail;
import com.ShopAutoPartsServices.Enums.FilterCorreo;
import com.ShopAutoPartsServices.Enums.FilterValidacionGenerico;
import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;

import com.ShopAutoPartsServices.Service.UtilService;
import com.ShopAutoPartsServices.ServiceConfiguracion.JwtEnum;
import com.ShopAutoPartsServices.Util.BuildEnviaCorreo;

@SpringBootApplication
@EnableScheduling
@RestController
@RequestMapping("service/correo")
public class CorreoJobsOnlineController {
	Logger logger = LoggerFactory.getLogger(ProductoController.class);
	@Autowired
	UtilService utilService;
	@Autowired
	CorreoConfiguracion correoConfiguracion;
	@Autowired
	Empresa empresa;

	@PostMapping(value = "/obtenerCorreoJobs", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CorreoJobsResponse> obtenerCorreoJobs(@RequestBody CorreoJobsOnline correoJobsOnline) {
		ResponseEntity<CorreoJobsResponse> responseEntity = null;
		CorreoJobsResponse correoJobsResponse = new CorreoJobsResponse();
		List<String> error = new ArrayList<String>();
		try {
			correoJobsResponse.setLista(utilService.obtenerListaCorreoJobs(correoJobsOnline));
			correoJobsResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<CorreoJobsResponse>(correoJobsResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			correoJobsResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			correoJobsResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CorreoJobsResponse>(correoJobsResponse, HttpStatus.BAD_REQUEST);
			logger.info(correoJobsResponse.toString());
		}
		return responseEntity;
	}

	@PostMapping(value = "/registrarCorreoJobs", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CorreoJobsOnline> registrarCorreoJobs(@RequestBody CorreoJobsOnline correoJobsOnline) {
		ResponseEntity<CorreoJobsOnline> responseEntity = null;
		List<String> error = new ArrayList<String>();

		try {
			utilService.registrarCorreo(correoJobsOnline);
			// logger.info(correoJobsOnline.toString());
			correoJobsOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<CorreoJobsOnline>(correoJobsOnline, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			correoJobsOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			correoJobsOnline.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CorreoJobsOnline>(correoJobsOnline, HttpStatus.BAD_REQUEST);
			logger.info(correoJobsOnline.toString());
		}
		return responseEntity;
	}

	@PostMapping(value = "/saveUpdateMenu", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MenuOnlineResponse> saveUpdateMenu(@RequestBody MenuOnline menuOnline) {
		ResponseEntity<MenuOnlineResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		MenuOnlineResponse menuOnlineResponse = new MenuOnlineResponse();

		/*
		 * logger.info(String.join(",", menuOnline.getVchrPalabraClave()));
		 * 
		 * String[] t = (String.join(",", menuOnline.getVchrPalabraClave())).split(",");
		 * for (int i = 0; i < t.length; i++) { logger.info(t[i]); }
		 */
		if (menuOnline.getVchrCodigo() != null) {
			if (menuOnline.getVchrCodigo().lastIndexOf("_") == -1) {
				menuOnline.setNumSecuencia(0);
			} else {
				menuOnline.setNumSecuencia(Integer.parseInt(menuOnline.getVchrCodigo().substring(
						menuOnline.getVchrCodigo().lastIndexOf("_") + 1, menuOnline.getVchrCodigo().length())));
			}
		}
		logger.info(menuOnline.toString());
		try {
			MenuOnline newMenuOnline = utilService.saveUpdateMenu(menuOnline);
			menuOnlineResponse.setMenuOnline(newMenuOnline);
			if (newMenuOnline.getStatus().equalsIgnoreCase("OK")) {
				// logger.info(direccion.toString());
				menuOnlineResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<MenuOnlineResponse>(menuOnlineResponse, HttpStatus.OK);
			} else {
				error.add(newMenuOnline.getStatus());
				menuOnlineResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<MenuOnlineResponse>(menuOnlineResponse, HttpStatus.OK);
			}

		} catch (Exception e) {
			logger.info(e.getMessage());
			menuOnlineResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
			menuOnlineResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<MenuOnlineResponse>(menuOnlineResponse, HttpStatus.OK);
		}
		return responseEntity;
	}

	@PostMapping(value = "/listaMenu", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MenuOnlineResponse> getListaMenu() {
		ResponseEntity<MenuOnlineResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		MenuOnlineResponse menuOnlineResponse = new MenuOnlineResponse();
		try {
			menuOnlineResponse.setListaMenu(utilService.obtenerListaMenu());
			menuOnlineResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<MenuOnlineResponse>(menuOnlineResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			menuOnlineResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
			menuOnlineResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<MenuOnlineResponse>(menuOnlineResponse, HttpStatus.OK);
		}
		return responseEntity;
	}

	@Scheduled(cron = "${shop.mail.smtp.to.registro.scheduled}")
	public void scheduledAvisoRegistroTipoCambio() {
		/*
		 * Jobs para avisar a los usuarios que falta ingresar el tipo de cambio para el
		 * dia de siguiente
		 */
		try {
			boolean _valida = utilService
					.validarScheduledCorrreo(FilterValidacionGenerico.SCHEDULED_ALERTA_TIPO_CAMBIO.toString());
			if (_valida) {

				BuildEnviaCorreo buildEnviaCorreo = new BuildEnviaCorreo(correoConfiguracion, empresa);
				CorreoJobsOnline correoJobs = new CorreoJobsOnline();
				correoJobs.setFilterCorreo(FilterCorreo.FILTER_TIPO_CAMBIO_REGISTRO);
				List<CorreoJobsOnline> lista = utilService.obtenerListaCorreoJobs(correoJobs);
				if (lista.size() >= 1) {
					String asuntoOc = "Alerta de registro del tipo de cambio";
					CorreoRequest correoRequest = new CorreoRequest();
					correoRequest.setListaCorreo(lista);
					boolean correoOcStatus = buildEnviaCorreo.buildCorreoSSL(correoRequest,
							HTML_ALERTA_TIPO_CAMBIO_REGISTRO(), asuntoOc, AccountsEmail.Compras, null);
					logger.info("Scheduled de alerta de tipo de cambio finalizado:" + correoOcStatus);
				}
			}
		} catch (Exception e) {
			logger.info("scheduledAvisoRegistroTipoCambio:" + e.getMessage());
			e.printStackTrace();
		}

	}

	public String HTML_ALERTA_TIPO_CAMBIO_REGISTRO() {
		Date dtSiguiente = new Date();
		SimpleDateFormat dmy = new SimpleDateFormat("dd/MM/yyyy");
		Calendar c = Calendar.getInstance();
		c.setTime(dtSiguiente);
		c.add(Calendar.DATE, 1);
		dtSiguiente = c.getTime();
		StringBuilder html = new StringBuilder();
		html.append("<!DOCTYPE html>" + "<html lang='en'>" + "<body>");
		html.append(
				"Estimados, <br>Se debe registrar el tipo de cambio para la fecha:  <span style='font-weight: bold;'>"
						+ dmy.format(dtSiguiente) + "</span>.");
		html.append("</body>" + "</html>");
		return html.toString();
	}
}
