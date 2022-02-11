package com.ShopAutoPartsServices.WsServices;

 
import java.util.ArrayList;
import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.util.Base64Utils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ShopAutoPartsServices.Config.IzipayConfiguracion;
import com.ShopAutoPartsServices.Domain.AsociaOc;
import com.ShopAutoPartsServices.Domain.CotizacionOnline;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineActiva;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineDetalle;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineDetalleResponse;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineResumen;
 
import com.ShopAutoPartsServices.Domain.MetodoEnvioRequets;
 
import com.ShopAutoPartsServices.Domain.ReporteCotizacionResponse;
import com.ShopAutoPartsServices.Domain.ReportePdfRequets;
import com.ShopAutoPartsServices.Domain.ReportePdfResponse;
import com.ShopAutoPartsServices.Domain.ReporteRequest;
import com.ShopAutoPartsServices.Domain.TusCompras;
import com.ShopAutoPartsServices.Domain.TusComprasResponse;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePayment;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePaymentFormResponse;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePaymentRequest;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePaymentResponse;
import com.ShopAutoPartsServices.Domain.IziPay.StatusAction;
 
import com.ShopAutoPartsServices.Enums.MetodoEnvio;
import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;
import com.ShopAutoPartsServices.Enums.Status;
import com.ShopAutoPartsServices.Enums.TypeReporte;
import com.ShopAutoPartsServices.Service.CotizacionOnlineService;
import com.ShopAutoPartsServices.Service.FacturacionService;
import com.google.gson.Gson;

@RestController
@RequestMapping("service/cotizacion")
public class CotizacionController {
	Logger logger = LoggerFactory.getLogger(CotizacionController.class);
	@Autowired
	CotizacionOnlineService cotizacionOnlineService;

	@Autowired
	FacturacionService facturacionService;

	@PostMapping(value = "/registrarCotizacion", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CotizacionOnline> registrarCotizacion(@RequestBody CotizacionOnline cotizacionOnlineRequets) {
		ResponseEntity<CotizacionOnline> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			cotizacionOnlineRequets.setStatusAction(StatusAction.ARMANDO_COMPRA);
			error.add("Se registro la cotización");
			cotizacionOnlineRequets = cotizacionOnlineService.registrarCotizacion(cotizacionOnlineRequets);
			cotizacionOnlineRequets.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<CotizacionOnline>(cotizacionOnlineRequets, HttpStatus.OK);

		} catch (Exception e) {
			logger.info(cotizacionOnlineRequets.toString());
			logger.info(e.getMessage());
			e.printStackTrace();
			cotizacionOnlineRequets.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			cotizacionOnlineRequets.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CotizacionOnline>(cotizacionOnlineRequets, HttpStatus.BAD_REQUEST);
			logger.info(cotizacionOnlineRequets.toString());
		}

		return responseEntity;
	}

	@PostMapping(value = "/obtenerCotizacionActiva", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CotizacionOnlineActiva> obtenerCotizacionActiva(
			@RequestBody CotizacionOnlineActiva cotizacionOnlineActivaRequest) {
		ResponseEntity<CotizacionOnlineActiva> responseEntity = null;
		CotizacionOnlineActiva cotizacionOnlineActiva = new CotizacionOnlineActiva();
		List<String> error = new ArrayList<String>();
		try {
			error.add("Cotizacion Activa");
			cotizacionOnlineActiva = cotizacionOnlineService.obtenerCotizacionActiva(cotizacionOnlineActivaRequest);
			cotizacionOnlineActiva.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<CotizacionOnlineActiva>(cotizacionOnlineActiva, HttpStatus.OK);

		} catch (Exception e) {
			logger.info(cotizacionOnlineActiva.toString());
			logger.info(e.getMessage());
			e.printStackTrace();
			cotizacionOnlineActiva.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			cotizacionOnlineActiva.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CotizacionOnlineActiva>(cotizacionOnlineActiva, HttpStatus.BAD_REQUEST);
			logger.info(cotizacionOnlineActiva.toString());
		}

		return responseEntity;
	}

	@PostMapping(value = "/registrarCotizacionDetalle", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CotizacionOnlineResumen> registrarCotizacionDetalle(
			@RequestBody CotizacionOnlineDetalle cotizacionOnlineDetalle) {
		ResponseEntity<CotizacionOnlineResumen> responseEntity = null;
		CotizacionOnlineResumen cotizacionOnline = new CotizacionOnlineResumen();
		List<String> error = new ArrayList<String>();
		boolean isValidado = true;

		try {
			if (cotizacionOnlineDetalle.getNumCodigoCotizacionOnline() <= 0) {
				error.add("No se encontro la cotización para este item");
				isValidado = false;
			}
			if (cotizacionOnlineDetalle.getNumCantidad() <= 0) {
				error.add("Ingrese la cantidad a comprar");
				isValidado = false;
			}
			if (isValidado) {
				cotizacionOnlineDetalle = cotizacionOnlineService.registrarCotizacionDetalle(cotizacionOnlineDetalle);
				cotizacionOnline = cotizacionOnlineService
						.obtenerCotizacionOnline(cotizacionOnlineDetalle.getNumCodigoCotizacionOnline());

				cotizacionOnline.setCantidadDetalleSeleccionado(cotizacionOnlineService
						.obtenerCotizacionDetalle(cotizacionOnlineDetalle).get(0).getNumCantidad());

				cotizacionOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.OK);
			} else {
				cotizacionOnlineDetalle.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.OK);
			}

		} catch (Exception e) {
			logger.info(cotizacionOnline.toString());
			logger.info(e.getMessage());
			e.printStackTrace();
			cotizacionOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			cotizacionOnline.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.BAD_REQUEST);
			logger.info(cotizacionOnline.toString());
		}

		return responseEntity;
	}

	@SuppressWarnings("static-access")
	@PostMapping(value = "/registrarCotizacionMetodoEnvio", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<MetodoEnvioRequets> registrarModoEnvio(@RequestBody MetodoEnvioRequets metodoEnvioRequets) {
		ResponseEntity<MetodoEnvioRequets> responseEntity = null;
		try {
			MetodoEnvioRequets metodoEnvioResponse = cotizacionOnlineService.registrarModoEnvio(metodoEnvioRequets);
			// metodoEnvioResponse.setMetodoEnvio(MetodoEnvio.EnvioRegular);

			if (metodoEnvioResponse.getStatus() == Status.ERROR_ZONA_INCONRRECTA) {
				// metodoEnvioResponse.setMetodoEnvio(MetodoEnvio.RecojoAlmacen);
				metodoEnvioResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO);
				responseEntity = new ResponseEntity<MetodoEnvioRequets>(metodoEnvioResponse, HttpStatus.OK);
			} else {
				metodoEnvioResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK);
				responseEntity = new ResponseEntity<MetodoEnvioRequets>(metodoEnvioResponse, HttpStatus.OK);
			}
		} catch (Exception e) {

			logger.info(e.getMessage());
			e.printStackTrace();
			metodoEnvioRequets.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR);
			metodoEnvioRequets.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<MetodoEnvioRequets>(metodoEnvioRequets, HttpStatus.BAD_REQUEST);
			logger.info(metodoEnvioRequets.toString());
		}
		return responseEntity;
	}

	@PostMapping(value = "/eliminarCotizacionDetalle", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CotizacionOnlineResumen> eliminarCotizacionDetalle(
			@RequestBody CotizacionOnlineDetalle cotizacionOnlineDetalle) {
		ResponseEntity<CotizacionOnlineResumen> responseEntity = null;
		CotizacionOnlineResumen cotizacionOnline = new CotizacionOnlineResumen();
		List<String> error = new ArrayList<String>();
		boolean isValidado = true;

		try {
			if (cotizacionOnlineDetalle.getNumCodigoCotizacionOnline() <= 0) {
				error.add("No se encontro la cotización");
				isValidado = false;
			}
			if (cotizacionOnlineDetalle.getNumcodCotizacionOnlinedet() <= 0) {
				error.add("No se encontro la cotización para este item");
				isValidado = false;
			}
			if (isValidado) {
				cotizacionOnlineDetalle = cotizacionOnlineService.eliminarCotizacionDetalle(cotizacionOnlineDetalle);
				cotizacionOnline = cotizacionOnlineService
						.obtenerCotizacionOnline(cotizacionOnlineDetalle.getNumCodigoCotizacionOnline());

				cotizacionOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.OK);
			} else {
				cotizacionOnlineDetalle.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.OK);
			}

		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			cotizacionOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			cotizacionOnline.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.BAD_REQUEST);
			logger.info(cotizacionOnline.toString());
		}

		return responseEntity;
	}

	@PostMapping(value = "/obtenerCotizacionDetalle", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CotizacionOnlineDetalleResponse> obtenerCotizacionDetalle(
			@RequestBody CotizacionOnline cotizacionOnline) {
		ResponseEntity<CotizacionOnlineDetalleResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		CotizacionOnlineDetalleResponse detalleResponse = new CotizacionOnlineDetalleResponse();
		try {
			CotizacionOnlineDetalle params = new CotizacionOnlineDetalle();
			params.setNumCodigoCotizacionOnline(cotizacionOnline.getNumCodigoCotizacionOnline());
			try {
				MetodoEnvioRequets metodoEnvioRequets = new MetodoEnvioRequets();
				metodoEnvioRequets.setMetodoEnvio(MetodoEnvio.EnvioRegular);
				metodoEnvioRequets.setNumCodigoCotizacionOnline(params.getNumCodigoCotizacionOnline());
				metodoEnvioRequets.setNumCodigoDireccion(0);
				MetodoEnvioRequets metodoEnvioResponse = cotizacionOnlineService.registrarModoEnvio(metodoEnvioRequets);
			} catch (Exception e) {

				logger.info("ERROR Registro de metodo de envio Detalle Carrito");
				logger.info(e.getMessage());
				e.printStackTrace();
			}
			detalleResponse.setLista(cotizacionOnlineService.obtenerCotizacionDetalle(params));
			detalleResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<CotizacionOnlineDetalleResponse>(detalleResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			detalleResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			detalleResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CotizacionOnlineDetalleResponse>(detalleResponse,
					HttpStatus.BAD_REQUEST);
			logger.info(detalleResponse.toString());
		}

		return responseEntity;
	}

	@PostMapping(value = "/obtenerCotizacion", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CotizacionOnlineResumen> obtenerCotizacion(
			@RequestBody CotizacionOnline cotizacionOnlineRequets) {
		ResponseEntity<CotizacionOnlineResumen> responseEntity = null;
		List<String> error = new ArrayList<String>();
		CotizacionOnlineResumen cotizacionOnline = new CotizacionOnlineResumen();
		try {
			cotizacionOnline = cotizacionOnlineService
					.obtenerCotizacionOnline(cotizacionOnlineRequets.getNumCodigoCotizacionOnline());
			cotizacionOnline.setCantidadDetalleSeleccionado(0);

			cotizacionOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			cotizacionOnline.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			cotizacionOnline.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CotizacionOnlineResumen>(cotizacionOnline, HttpStatus.BAD_REQUEST);
			logger.info(cotizacionOnline.toString());
		}
		return responseEntity;
	}

	@PostMapping(value = "/obtenerTusCompras", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TusComprasResponse> obtenerTusCompras(@RequestBody CotizacionOnline cotizacionOnlineRequets) {
		ResponseEntity<TusComprasResponse> responseEntity = null;
		List<TusCompras> lstCompras = new ArrayList<TusCompras>();
		List<String> error = new ArrayList<String>();
		TusComprasResponse comprasResponse = new TusComprasResponse();
		try {
			lstCompras = cotizacionOnlineService.obtenerTusCotizacion(cotizacionOnlineRequets);
			comprasResponse.setLista(lstCompras);
			comprasResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<TusComprasResponse>(comprasResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			comprasResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			comprasResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<TusComprasResponse>(comprasResponse, HttpStatus.BAD_REQUEST);
			logger.info(comprasResponse.toString());
		}
		return responseEntity;
	}

	@PostMapping(value = "/obtenerTusComprasDetalle", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<TusComprasResponse> obtenerTusComprasDetalle(
			@RequestBody CotizacionOnline cotizacionOnlineRequets) {
		ResponseEntity<TusComprasResponse> responseEntity = null;
		List<CotizacionOnlineDetalle> lstCompras = new ArrayList<CotizacionOnlineDetalle>();
		List<String> error = new ArrayList<String>();
		TusComprasResponse comprasResponse = new TusComprasResponse();
		try {
			lstCompras = cotizacionOnlineService.obtenerTusCotizacionDetalle(cotizacionOnlineRequets);
			comprasResponse.setListaDetalle(lstCompras);
			comprasResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<TusComprasResponse>(comprasResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			comprasResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			comprasResponse.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<TusComprasResponse>(comprasResponse, HttpStatus.BAD_REQUEST);
			logger.info(comprasResponse.toString());
		}
		return responseEntity;
	}

	@Autowired
	IzipayConfiguracion izipayConfiguracion;

	@PostMapping(value = "/iniciarCreatePayment", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<CreatePaymentFormResponse> iniciarFormularioIncrustadoPago(
			@RequestBody CreatePaymentRequest createPaymentRequest) {

		ResponseEntity<CreatePaymentFormResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		CreatePaymentFormResponse response = new CreatePaymentFormResponse();
		try {

			CreatePayment createPayment = cotizacionOnlineService.obtenerCotizacionPago(createPaymentRequest);

			cotizacionOnlineService.registrarDatosPayment(createPaymentRequest);
			CreatePaymentResponse paymentResponse = buildPeticionIzipay(createPayment);
			if (paymentResponse.getStatus().equalsIgnoreCase("ERROR")) {

				error.add(paymentResponse.getAnswer().getErrorCode() + ":"
						+ paymentResponse.getAnswer().getErrorMessage());
				response.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<CreatePaymentFormResponse>(response, HttpStatus.OK);

			} else {
				response.setPublicKey(izipayConfiguracion.getPublicKey());
				response.setEndPoint(izipayConfiguracion.getEndPoint());
				response.setHmacSha256Key(izipayConfiguracion.getHmacSha256Key());
				response.setFormToken(paymentResponse.getAnswer().getFormToken());
				response.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<CreatePaymentFormResponse>(response, HttpStatus.OK);
			}

		} catch (Exception e) {
			logger.info(createPaymentRequest.toString());
			logger.info(izipayConfiguracion.getEndPoint());
			logger.info(e.getMessage());
			e.printStackTrace();
			response.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(error);
			response.getResponse().getError().add(e.getMessage());
			responseEntity = new ResponseEntity<CreatePaymentFormResponse>(response, HttpStatus.BAD_REQUEST);
			logger.info(response.toString());
		}
		return responseEntity;
	}

	private CreatePaymentResponse buildPeticionIzipay(CreatePayment createPayment) throws Exception {

		CreatePaymentResponse paymentResponse = null;
		try {
			String apiUrl = izipayConfiguracion.getApiUrl();
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpPost httpPost = new HttpPost(apiUrl);
			httpPost.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
			httpPost.addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_UTF8_VALUE);
			httpPost.addHeader(HttpHeaders.AUTHORIZATION,
					"Basic " + Base64Utils.encodeToString(new String(izipayConfiguracion.getPrivateKey()).getBytes()));		
			
			Gson gson = new Gson();
			String json = gson.toJson(createPayment);
			StringEntity entity = new StringEntity(json);
			httpPost.setEntity(entity);
			CloseableHttpResponse response = httpClient.execute(httpPost);
			String body = EntityUtils.toString(response.getEntity());
			paymentResponse = gson.fromJson(body, CreatePaymentResponse.class);

			/*
			 * System.out.println(body);
			 * System.out.println("-----------------------------");
			 * System.out.println(paymentResponse.getStatus());
			 * System.out.println("-----------------------------");
			 * System.out.println("::"+paymentResponse.getAnswer().getFormToken());
			 */
		} catch (Exception e) {
			logger.info("[buildPeticionIzipay]:" + e.getMessage());
			throw new Exception(e);
		}
		return paymentResponse;

	}

	@PostMapping(value = "/reporteCotizacion", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReporteCotizacionResponse> listarProductoImagen(@RequestBody ReporteRequest reporteRequest) {
		ReporteCotizacionResponse reporteCotizacionResponse = new ReporteCotizacionResponse();
		ResponseEntity<ReporteCotizacionResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			reporteCotizacionResponse.setLista(cotizacionOnlineService.obtenerReporteCotizacion(reporteRequest));
			reporteCotizacionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK)
					.setError(new ArrayList<String>()).setError(error);
			responseEntity = new ResponseEntity<ReporteCotizacionResponse>(reporteCotizacionResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			reporteCotizacionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ReporteCotizacionResponse>(reporteCotizacionResponse,
					HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/obtenerReporteToPdf", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReportePdfResponse> obtenerReporteCotizacion(
			@RequestBody ReportePdfRequets reportePdfRequets) {
		ReportePdfResponse reporteCotizacionResponse = new ReportePdfResponse();
		ResponseEntity<ReportePdfResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {

			if (reportePdfRequets.getTypeReporte() == TypeReporte.ReporteCotizacion) {
				reporteCotizacionResponse
						.setByteEnconderBase64(facturacionService.obtenerReporteCotizacion(reportePdfRequets));
			} else if (reportePdfRequets.getTypeReporte() == TypeReporte.ReporteFacturaBoleta) {
				reporteCotizacionResponse
						.setByteEnconderBase64(facturacionService.obtenerReporteFactura(reportePdfRequets));
			} else if (reportePdfRequets.getTypeReporte() == TypeReporte.ReporteOrdenCompra) {
				reporteCotizacionResponse
						.setByteEnconderBase64(facturacionService.obtenerReporteOrdenCompra(reportePdfRequets));
			} else if (reportePdfRequets.getTypeReporte() == TypeReporte.ReporteGuiaSalida) {
				reporteCotizacionResponse
						.setByteEnconderBase64(facturacionService.obtenerReporteGuiaSalida(reportePdfRequets));
			} else if (reportePdfRequets.getTypeReporte() == TypeReporte.ReporteOrdenCompraOnline) {
				reporteCotizacionResponse
						.setByteEnconderBase64(facturacionService.obtenerReporteOrdenCompraOnline(reportePdfRequets));
			}
			reporteCotizacionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK)
					.setError(new ArrayList<String>()).setError(error);
			responseEntity = new ResponseEntity<ReportePdfResponse>(reporteCotizacionResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(reportePdfRequets.toString());
			logger.info(e.getMessage());
			e.printStackTrace();
			reporteCotizacionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ReportePdfResponse>(reporteCotizacionResponse, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}
	@PostMapping(value = "/asignarOcToCotizacion", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ReportePdfResponse> asignarOcToCotizacion(
			@RequestBody AsociaOc asociaOc) {
		ReportePdfResponse reporteCotizacionResponse = new ReportePdfResponse();
		ResponseEntity<ReportePdfResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			String _resultado=facturacionService.asignarOcToCotizacion(asociaOc);
			if(_resultado.equalsIgnoreCase("OK")) {
			reporteCotizacionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK)
					.setError(new ArrayList<String>()).setError(error);
			responseEntity = new ResponseEntity<ReportePdfResponse>(reporteCotizacionResponse, HttpStatus.OK);
			}else {
				error.add(_resultado);
				reporteCotizacionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO)
				.setError(new ArrayList<String>()).setError(error);
				responseEntity = new ResponseEntity<ReportePdfResponse>(reporteCotizacionResponse, HttpStatus.OK);
			}
		} catch (Exception e) {
			logger.info(asociaOc.toString());
			logger.info(e.getMessage());
			e.printStackTrace();
			reporteCotizacionResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ReportePdfResponse>(reporteCotizacionResponse, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}
}
