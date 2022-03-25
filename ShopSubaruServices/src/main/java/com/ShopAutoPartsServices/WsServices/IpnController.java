package com.ShopAutoPartsServices.WsServices;

import java.io.File;
 

import java.text.SimpleDateFormat;
import java.util.ArrayList;

import java.util.Date;
import java.util.List;
import java.util.TimeZone;

import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;

import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ShopAutoPartsServices.Config.CorreoConfiguracion;
import com.ShopAutoPartsServices.Config.Empresa;
import com.ShopAutoPartsServices.Domain.ClienteFactura;
import com.ShopAutoPartsServices.Domain.CorreoJobsOnline;
import com.ShopAutoPartsServices.Domain.CorreoRequest;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineDetalle;
import com.ShopAutoPartsServices.Domain.IziPay.Answer;
import com.ShopAutoPartsServices.Domain.IziPay.IpnRequets;
import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;
import com.ShopAutoPartsServices.Domain.IziPay.StatusAction;
import com.ShopAutoPartsServices.Domain.IziPay.StatusIziPay;
import com.ShopAutoPartsServices.Enums.AccountsEmail;
import com.ShopAutoPartsServices.Enums.EstadoCotizacion;
import com.ShopAutoPartsServices.Enums.FilterCorreo;
import com.ShopAutoPartsServices.Enums.FilterValidacionGenerico;
import com.ShopAutoPartsServices.Enums.Moneda;
import com.ShopAutoPartsServices.Enums.OcEmail;
import com.ShopAutoPartsServices.FE.Archivo;
import com.ShopAutoPartsServices.FE.Constantes;
import com.ShopAutoPartsServices.FE.Beans.BeanEmpresa;
import com.ShopAutoPartsServices.FE.Beans.BeanFacturacion;
 
import com.ShopAutoPartsServices.Service.CotizacionOnlineService;
import com.ShopAutoPartsServices.Service.FacturacionService;
import com.ShopAutoPartsServices.Service.UtilService;
import com.ShopAutoPartsServices.Util.BuildEnviaCorreo;
import com.ShopAutoPartsServices.Util.NumeroLetras;
import com.google.gson.Gson;

@SpringBootApplication
@EnableScheduling
@RestController
@RequestMapping("service/ipn")
public class IpnController {
	Logger logger = LoggerFactory.getLogger(IpnController.class);

	@Autowired
	CotizacionOnlineService cotizacionOnlineService;

	@Autowired
	FacturacionService facturacionService;

	@Autowired
	Empresa empresa;

	@Autowired
	CorreoConfiguracion correoConfiguracion;

	@Autowired
	UtilService utilService;

	@PostMapping(value = "/confirmar")
	public ResponseEntity<String> confirmacionIziPay(HttpServletRequest httpServletRequest) {
		IpnRequets ipnRequets = new IpnRequets();
		try {			
			Gson g = new Gson();
			Answer answer = g.fromJson(httpServletRequest.getParameter("kr-answer"), Answer.class);
			ipnRequets.setEstadoCotizacion(EstadoCotizacion.CONFIRMADO);
			ipnRequets.setNumCodigoCotizacionOnline(Integer.parseInt(answer.getOrderDetails().getOrderId()));
			ipnRequets.setKrHash(httpServletRequest.getParameter("kr-hash"));
			ipnRequets.setKrHashAlgorithm(httpServletRequest.getParameter("kr-hash-algorithm"));
			ipnRequets.setKrHashKey(httpServletRequest.getParameter("kr-hash-key"));
			ipnRequets.setKrAnswerType(httpServletRequest.getParameter("kr-answer-type"));
			ipnRequets.setKrAnswer(httpServletRequest.getParameter("kr-answer"));
			ipnRequets.setStatus(answer.getOrderStatus());
			ipnRequets.setUuid(answer.getTransactions().get(0).getUuid());
			ipnRequets.setLegacyTransId(
					answer.getTransactions().get(0).getTransactionDetails().getCardDetails().getLegacyTransId());
			if (answer.getOrderStatus().equalsIgnoreCase(StatusIziPay.PAID.toString())) {
				ipnRequets.setStatusAction(StatusAction.FACTURAR.toString());
			}
			if (answer.getOrderStatus().equalsIgnoreCase(StatusIziPay.RUNNING.toString())) {
				ipnRequets.setStatusAction(StatusAction.PROCESANDO.toString());
			}
			if (answer.getOrderStatus().equalsIgnoreCase(StatusIziPay.UNPAID.toString())) {
				ipnRequets.setStatusAction(StatusAction.FACTURACION_CANCELADA.toString());
			}
			logger.info("numCodigoCotizacionOnline:" + answer.getOrderDetails().getOrderId() + " orderStatus:"
					+ answer.getOrderStatus());
			cotizacionOnlineService.confirmarCotizacion(ipnRequets);

		} catch (Exception e) {
			return new ResponseEntity<String>("ERROR:"+e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
		}
		return new ResponseEntity<String>("OK:Recepcion de estado:"+ipnRequets.getStatusAction()+" Status:"+ipnRequets.getStatus(), HttpStatus.OK);
	}

	/*
	 * INSERT INTO tipocambio(numcodigotipocambio,dtecreacion,numcodigomoneda,
	 * numtipocambioadmcompra,numtipocambioadmventa,chrestado,
	 * numcodigousuariocreacion,numcodigousuariomodificacion,dtemodificacion,
	 * numtipocambiocontcompra,numtipocambiocontventa)
	 * VALUES(ID_TIPOCAMBIO.nextval,TO_CHAR(sysdate,
	 * 'DD/MM/YY'),1,4.05,4.05,1,198,NULL,NULL,3.902,3.913)
	 */
	/*
	 * https://stackoverflow.com/questions/67179227/spring-boot-plugin-docker-oci-
	 * image-and-jasperreports RUN apt-get update \ && apt-get install -y
	 * --no-install-recommends \ libfreetype6 \ fontconfig \ && rm -rf
	 * /var/lib/apt/lists/*
	 * 
	 * 
	 */
	// @Scheduled(cron = "${shop.mail.smtp.to.oc.scheduled}")
	public void scheduledMailOcConsolidado() {
		/*
		 * JOB: Envio de correo de ordenes de compra consolidado
		 * 
		 */

		/* Ejecucion de Job de envio de Ordenes de compra consolidado */
		ScheduledProceso scheduledProceso = new ScheduledProceso();
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		TimeZone zona = TimeZone.getTimeZone("America/Lima");
		sdf.setTimeZone(zona);
		Date fecIni = new Date(new Date().getTime() - (86400000 * 1));// Menos un dia
		boolean correoOcStatus = false;
		try {
			BuildEnviaCorreo buildEnviaCorreo = new BuildEnviaCorreo(correoConfiguracion, empresa);
			scheduledProceso.setFechaIni(sdf.format(fecIni));
			scheduledProceso.setFechaFin(sdf.format(new Date()));
			scheduledProceso.setFechaIniHHmm(sdf.format(fecIni) + "14:01");
			scheduledProceso.setFechaFinHHmm(sdf.format(new Date()) + "14:00");
			CorreoRequest correoFERequest = new CorreoRequest();
			boolean _valida = utilService
					.validarScheduledCorrreo(FilterValidacionGenerico.SCHEDULED_CONSOLIDADO_OC.toString());
			if (_valida) {
				logger.info("Iniciando envio de consolidado:scheduledMailOcConsolidado");
				List<CorreoJobsOnline> listaCorreo = new ArrayList<CorreoJobsOnline>();
				listaCorreo.add(new CorreoJobsOnline(empresa.getToOrdenCompra()));
				correoFERequest.setListaCorreo(listaCorreo);
				String asuntoOc = "Ordenes de Compra del " + scheduledProceso.getFechaIni() + " hasta "
						+ scheduledProceso.getFechaFin() + " (" + empresa.getAlias() + ")";
				File file = facturacionService.obtenerFileReporteOcVarios(scheduledProceso);
				if (file != null) {
					ClienteFactura clienteFactura = new ClienteFactura();
					correoOcStatus = buildEnviaCorreo.buildCorreoSSL(correoFERequest,
							HTML_FE_(clienteFactura, OcEmail.OrdenCompraVarios), asuntoOc, AccountsEmail.Compras, file);
					file.deleteOnExit();
					logger.info("Envio de consolidado:" + asuntoOc);
				} else {
					logger.info("Archivo de reporte consolidad Null Correo Status:" + correoOcStatus);
				}
			}
		} catch (Exception e) {
			logger.info("Archivo de reporte consolidad Null Correo Status:" + correoOcStatus + " " + e.getMessage());
			e.printStackTrace();
		}

	}
	/*
	 * public void archivo() { try {
	 * 
	 * BeanFacturacion fac = new BeanFacturacion(); fac.setCodigo("B002-00000021");
	 * NUMFACTURAS fac.setCodigoOrigenFactura(2); NUMCODIGOORIGENFACTURA probar cada
	 * uno de los SP ScheduledProceso scheduledProcesoStatus = new
	 * ScheduledProceso(); scheduledProcesoStatus.setNumTipoCambio(new
	 * BigDecimal(3.90)); scheduledProcesoStatus.setIcbFec(new BigDecimal(3.90));
	 * logger.info("Codigo:" + fac.getCodigo().trim() + " codigoOrigenFactura:" +
	 * fac.getCodigoOrigenFactura()); BeanFacturacion beanFactura =
	 * facturacionService.ObtenerFacturaElectronicaCabecera(fac,
	 * scheduledProcesoStatus); ArrayList<BeanFacturacion> facturaDetalle =
	 * facturacionService.ListarFacturaElectronicaDetalle(fac); BeanEmpresa
	 * empresaFe = facturacionService
	 * .obtenerEmpresa(Integer.parseInt(Constantes.TIPE_PAGE_APLICATIVO));
	 * Generacion de FE, archivo .txt
	 * Archivo.interfazFacturaElectronicaV3(empresaFe, beanFactura, facturaDetalle);
	 * } catch (Exception e) { e.printStackTrace(); } }
	 * 
	 * public void archivoExcel() { try {
	 * 
	 * 
	 * ScheduledProceso scheduledProcesoStatus = new ScheduledProceso();
	 * scheduledProcesoStatus.setChrCodigoOc("OCO202239"); File file =
	 * facturacionService.obtenerFileReporteOcOnline(scheduledProcesoStatus);
	 * 
	 * } catch (Exception e) { e.printStackTrace(); } }
	 */

	@Scheduled(fixedRateString = "${izipay.ipn.scheduled}")
	public void scheduledConfirmaCotizacion() {	 
		boolean correoStatusTipoCambioTomado = false;
		String asuntoTipoCambioTomado = "Alerta de tipo de cambio tomado";
		boolean correoStatus = false;
		boolean feStatus = false;
		boolean correoOcStatus = false;
		String procesoStatus = "";
		String statusBD = "";
		String asunto = "";
		String asuntoOc = "";
		CorreoRequest correoRequest = new CorreoRequest();
		BuildEnviaCorreo buildEnviaCorreo = new BuildEnviaCorreo(correoConfiguracion, empresa);
		try {
			List<ClienteFactura> lista = cotizacionOnlineService.obtenerCotizacionFactura();			 
			for (ClienteFactura clienteFactura : lista) {
				ScheduledProceso scheduledProceso = new ScheduledProceso();
				scheduledProceso.setEstadoCotizacion(clienteFactura.getEstadoCotizacion());
				scheduledProceso.setNumCodigoCotizacionOnline(clienteFactura.getNumCodigoCotizacionOnline());
				scheduledProceso.setStatusAction(clienteFactura.getStatusAction());
				scheduledProceso.setStatus(clienteFactura.getStatusIziPay().toString());
				scheduledProceso.setTotalLetras(new NumeroLetras(clienteFactura.getMoneda())
						.Convertir(clienteFactura.getTotal() + "", false).toUpperCase());
				correoStatus = false;
				feStatus = false;
				correoOcStatus = false;
				procesoStatus = "";
				statusBD = "";
				asuntoOc = "";
				asunto = "";

				/*
				 * 
				 * clienteFactura.setStatusIziPay(StatusIziPay.PAID);
				 * clienteFactura.setStatusAction(StatusAction.FACTURAR.toString());
				 * scheduledProceso.setStatus(StatusIziPay.PAID.toString());
				 */

				try {
					scheduledProceso.setProceso("SCHEDULED");
					if (clienteFactura.getStatusIziPay() == StatusIziPay.PAID
							&& clienteFactura.getStatusAction().equalsIgnoreCase(StatusAction.FACTURAR.toString())) {
						scheduledProceso.setStatusAction(StatusAction.FACTURADO_EN_ERP.toString());
						scheduledProceso.setEstadoCotizacion(EstadoCotizacion.FACTURADO);
						procesoStatus = "Generando Cotizacion";
					}
					if (clienteFactura.getStatusIziPay() == StatusIziPay.UNPAID && clienteFactura.getStatusAction()
							.equalsIgnoreCase(StatusAction.FACTURACION_CANCELADA.toString())) {
						scheduledProceso.setStatusAction(StatusAction.COTIZACION_CANCELADA.toString());
						procesoStatus = "Cancelando Cotizacion";
					}

					ScheduledProceso scheduledProcesoStatus = cotizacionOnlineService
							.scheduledProceso(scheduledProceso);
					statusBD = scheduledProcesoStatus.getStatusBD();
					clienteFactura.setDocReferencia(scheduledProcesoStatus.getNumFacturas());
					if (clienteFactura.getStatusIziPay() == StatusIziPay.PAID
							|| clienteFactura.getStatusIziPay() == StatusIziPay.UNPAID) {

						if (clienteFactura.getStatusIziPay() == StatusIziPay.PAID
								&& statusBD.equalsIgnoreCase("OK_GENERADO")) {

							if (!scheduledProcesoStatus.getDteTomado().equalsIgnoreCase("")
									&& scheduledProcesoStatus.getNumTipoCambio().doubleValue() >= 1) {
								/* Alerta de tipo de cambio tomado por la factura */
								CorreoJobsOnline correoJobs = new CorreoJobsOnline();
								correoJobs.setFilterCorreo(FilterCorreo.FILTER_TIPO_CAMBIO_TOMADO);
								List<CorreoJobsOnline> listaCorreoAtc = utilService
										.obtenerListaCorreoJobs(correoJobs);
								if (listaCorreoAtc.size() >= 1) {
									CorreoRequest correoRequestAtCambio = new CorreoRequest();
									correoRequestAtCambio.setListaCorreo(listaCorreoAtc);
									correoStatusTipoCambioTomado = buildEnviaCorreo.buildCorreoSSL(
											correoRequestAtCambio, HTML_TIPO_CAMBIO_TOMADO(scheduledProceso),
											asuntoTipoCambioTomado, AccountsEmail.Compras, null);
									logger.info("Envio de alerta de tipo de cambio tomado status:"
											+ correoStatusTipoCambioTomado);
								}

							}
							asunto = "[" + empresa.getAlias() + "]" + " ¡Tu pedido N° "
									+ clienteFactura.getNumCodigoCotizacionOnline() + " fue confirmado!";

							BeanFacturacion fac = new BeanFacturacion();
							fac.setCodigo(scheduledProcesoStatus.getNumFacturas().trim());/* NUMFACTURAS */
							fac.setCodigoOrigenFactura(
									scheduledProcesoStatus.getNumCodigoOrigenFactura());/* NUMCODIGOORIGENFACTURA */
							/* probar cada uno de los SP */
							logger.info("Codigo:" + fac.getCodigo().trim() + " codigoOrigenFactura:"
									+ fac.getCodigoOrigenFactura());
							BeanFacturacion beanFactura = facturacionService.ObtenerFacturaElectronicaCabecera(fac,
									scheduledProcesoStatus);
							ArrayList<BeanFacturacion> facturaDetalle = facturacionService
									.ListarFacturaElectronicaDetalle(fac);
							BeanEmpresa empresaFe = facturacionService
									.obtenerEmpresa(Integer.parseInt(Constantes.TIPE_PAGE_APLICATIVO));
							/* Generacion de FE, archivo .txt */
							if (Archivo.interfazFacturaElectronicaV3(empresaFe, beanFactura, facturaDetalle)) {
								feStatus = true;
							}
							if (!scheduledProceso.getChrCodigoOc().equalsIgnoreCase("NO_EXISTE")) {
								/* Proceso de envio de OC de la compra realizada */
								CorreoRequest correoFERequest = new CorreoRequest();
								List<CorreoJobsOnline> listaCorreo = new ArrayList<CorreoJobsOnline>();
								listaCorreo.add(new CorreoJobsOnline(empresa.getToOrdenCompra()));
								correoFERequest.setListaCorreo(listaCorreo);
								// correoFERequest.setCorreoCliente(empresa.getToOrdenCompra());
								/*
								 * OC Originl File file =
								 * facturacionService.obtenerFileReporteOc(scheduledProceso);
								 */
								File file = facturacionService.obtenerFileReporteOcOnline(scheduledProceso);
								if (file != null) {
									asuntoOc = "Orden de Compra Online por registrar "
											+ scheduledProcesoStatus.getChrCodigoOc() + " generada por Venta On-line("
											+ empresa.getAlias() + ")";
									correoOcStatus = buildEnviaCorreo.buildCorreoSSL(correoFERequest,
											HTML_OC_(clienteFactura, scheduledProcesoStatus, OcEmail.OrdenCompra),
											asuntoOc, AccountsEmail.Compras, file);
									file.deleteOnExit();
								}
							}
						}
						if (clienteFactura.getStatusIziPay() == StatusIziPay.UNPAID) {
							asunto = "[" + empresa.getAlias() + "]" + " ¡Tu pedido N° "
									+ clienteFactura.getNumCodigoCotizacionOnline() + " Tu pedido ha sido cancelado!";
						}
						List<CorreoJobsOnline> listaCorreo = new ArrayList<CorreoJobsOnline>();
						listaCorreo.add(new CorreoJobsOnline(clienteFactura.getChrEmail()));
						correoRequest.setListaCorreo(listaCorreo);
						// correoRequest.setCorreoCliente(clienteFactura.getChrEmail());
						/* Envio de correo al cliente */
						correoStatus = buildEnviaCorreo.buildCorreoSSL(correoRequest, HTML_(clienteFactura), asunto,
								AccountsEmail.ConfirmacionPedido, null);
					}
					logger.info(procesoStatus + " NumCodigoCotizacionOnline:"
							+ scheduledProceso.getNumCodigoCotizacionOnline() + " StatusBD:" + statusBD
							+ " EnvioCorreo:" + correoStatus + " Status:" + scheduledProceso.getStatus()
							+ " StatusAction:" + scheduledProceso.getStatusAction() + " EstadoCotizacion:"
							+ scheduledProceso.getEstadoCotizacion() + " FE:" + feStatus + " OC:" + correoOcStatus
							+ " :" + scheduledProceso.getChrCodigoOc());
				} catch (Exception e) {
					statusBD = e.getMessage();
					procesoStatus = "Error en el codigo";
					logger.info("Error en LOOP @Schedule[scheduledConfirmaCotizacion]:" + e.getMessage());
					e.printStackTrace();
				}

			}

		} catch (Exception e) {
			logger.info("Error en @Schedule[scheduledConfirmaCotizacion]:" + e.getMessage());
			e.printStackTrace();
		}
		// logger.info(new Date().getTime() + " Finalizando");
	}

	public String HTML_(ClienteFactura clienteFactura) throws Exception {
		SimpleDateFormat dmy = new SimpleDateFormat("dd-MM-yyyy");
		// Tu pedido fue confirmado
		String titulo = "", nombre = "";
		// String urlDocumentoFE = "";
		if (clienteFactura.getStatusIziPay() == StatusIziPay.PAID) {
			titulo = "Tu pedido fue confirmado";
			// urlDocumentoFE = "";
		}
		if (clienteFactura.getStatusIziPay() == StatusIziPay.UNPAID) {
			titulo = "Tu pedido ha sido cancelado!";
		}
		if (clienteFactura.getNumTipoCliente() == 1) {
			nombre = clienteFactura.getVchNombre();
		}
		if (clienteFactura.getNumTipoCliente() == 2) {
			nombre = clienteFactura.getVchNombreCompleto();
		}
		CotizacionOnlineDetalle cotizacionOnlineDetalle = new CotizacionOnlineDetalle();
		cotizacionOnlineDetalle.setNumCodigoCotizacionOnline(clienteFactura.getNumCodigoCotizacionOnline());
		List<CotizacionOnlineDetalle> lista = cotizacionOnlineService.obtenerCotizacionDetalle(cotizacionOnlineDetalle);

		double subtotal = clienteFactura.getSubTotal();
		double costoEnvio = clienteFactura.getCostoEnvio();
		double total = clienteFactura.getTotal();
		StringBuilder html = new StringBuilder();
		html.append("<!DOCTYPE html>" + "<html lang='en'>" + "<body style='background: #a29e9e;'>"
				+ "    <div style='background:#fbfbfb;width: 800px; min-width: 500px;"
				+ "				    margin: auto;margin-top: 2em;   "
				+ "				    font-family: sans-serif,monospace,arial; "
				+ "				    font-size:  1em; color:#000;" + "				    border:solid 1px #fbfbfb'>"
				+ "        <div"
				+ "            style='padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;font-weight: normal;text-align: center;height: 25px;'>"
				+ "" + "        </div>"

				+ "        <div style='padding: 0.5em;padding-left: 2.5em;padding-right: 2.5em;color: red;font-size: 12px; text-align: center;"
				+ "        font-weight: bold;'> No responder a este correo, es una cuenta de aviso automatico, es un buzon desatendido </div>"

				+ "        <div style='width: 250px;height: auto;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;'>"
				+ "            <a href='" + empresa.getWeburl() + "'>" + "                <img src='"
				+ empresa.getLogourl() + "'" + "                    alt='" + empresa.getAlias()
				+ "' style='width: 250px;height: auto;'></img>" + "            </a>" + "        </div>" + ""

				+ "        <div style='padding: 0.5em;padding-left: 2.5em;padding-right: 2.5em;color: #4992ff;font-size: 18px; text-align: center;"
				+ "        font-weight: bold;'>" + titulo + " </div>"

				+ "        <div style=' padding: 0px;height: 2px;background: #a29e9e;'></div>"
				+ "        <div style='padding: 0.5em;" + "        padding-left: 2.5em;"
				+ "        padding-right: 2.5em;" + "        font-weight: bold;" + "        text-align: center;'>Hola "
				+ nombre + "</div>");
		if (clienteFactura.getStatusIziPay() == StatusIziPay.PAID) {
			html.append("        <div"
					+ "            style='margin-left: 1.5em;margin-right: 1.5em;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;text-align: justify;'>"
					+ "            Queremos informarle que su pedido fue confirmado satisfactoriamente, con documento de referencia <span style='color: #4992ff;font-size: 18px;'>N° "
					+ clienteFactura.getDocReferencia() + "</span> "

					+ ".En breve se le enviará el documento de pago.</div>");
		}
		if (clienteFactura.getStatusIziPay() == StatusIziPay.UNPAID) {
			html.append("        <div"
					+ "            style='margin-left: 1.5em;margin-right: 1.5em;padding: 0.5em; padding-left: 2.5em; padding-right:  2.5em ;text-align: justify;'>"
					+ "            Lamentamos informarte que hemos tenido inconvenientes con tu pedido <span style='color: #4992ff;font-size: 18px;'>N° "
					+ clienteFactura.getNumCodigoCotizacionOnline()
					+ "</span>, motivo por el cual tuvimos que cancelarlo." + "        </div>");
		}

		html.append("        <div style=' " + "        padding-top: 1em;" + "        padding-bottom: 1em;"
				+ "        font-weight: bold;" + "        border: solid 1px #4992ff;" + "        margin-right: 3em;"
				+ "        margin-left: 3em;" + "        border-radius: 10px; " + "        text-align: center; '>"
				+ "            <span>Modalidad de entrega: " + clienteFactura.getMetodoEnvio().getDescripcion()
				+ "</span>" + "        </div>" + "" + "        <div style=' " + "        padding-top: 1em;"
				+ "        padding-bottom: 1em;       " + "        background-color:#dedada;"
				+ "        margin-right: 3em;" + "        margin-left: 3em;" + "        margin-top: 1em;"
				+ "        border: solid 1px #f7f7f7; " + "        border-radius: 5px; "
				+ "        text-align: center; " + "        display: flex;" + "        margin-bottom: 2em;'>"
				+ "            <div style='width: 50%;border-right: solid 2px #9c9b9b; '>"
				+ "                <span style='color:#ffffff ;font-size: 15px; font-weight: bold;'>RESUMEN DEL PEDIDO</span>"
				+ ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'># Pedido</div>"
				+ "                <div style='text-align: left; margin-left: 1em;'>"
				+ clienteFactura.getNumCodigoCotizacionOnline() + "</div>" + ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'>Titular</div>"
				+ "                <div style='text-align: left; margin-left: 1em;'>" + clienteFactura.getVchNombre()
				+ " " + clienteFactura.getVchApellido() + "</div>" + ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'>Documento de"
				+ "                    Identidad</div>"
				+ "                <div style='text-align: left; margin-left: 1em;'>" + clienteFactura.getVchDocumento()
				+ "</div>" + ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'>Fecha de pedido"
				+ "                </div>" + "                <div style='text-align: left; margin-left: 1em;'>"
				+ dmy.format(clienteFactura.getFechaEmision()) + "</div>" + "" + "            </div>"
				+ "            <div style='width: 50%; '>"
				+ "                <span style='color:#ffffff;font-size: 15px; font-weight: bold;'>DATOS DE LA ENTREGA</span>"
				+ ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'>Persona autorizada"
				+ "                </div>" + "                <div style='text-align: left; margin-left: 1em;'>"
				+ clienteFactura.getVchNombreDireccion() + " " + clienteFactura.getVchApellidoDireccion() + "</div>"
				+ ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'>Documento de"
				+ "                    Identidad</div>"
				+ "                <div style='text-align: left; margin-left: 1em;'>"
				+ clienteFactura.getVchDocumentoDireccion() + "</div>" + ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'>Dirección</div>"
				+ "                <div style='text-align: left; margin-left: 1em;'>"
				+ clienteFactura.getVchrDireccionDireccion() + "</div>" + ""
				+ "                <div style='text-align: left;margin-top: 1em; font-weight: bold; margin-left: 1em;'>Fecha aproximada de"
				+ "                    entrega</div>"
				+ "                <div style='text-align: left; margin-left: 1em;'>"
				+ dmy.format(clienteFactura.getFechaEstimada()) + "</div></div>" + "        </div>" + ""
				+ "        <div style='margin-right: 3em; margin-left: 3em;"
				+ "        margin-bottom: 1em;border: solid 1px #9c9b9b;'>"
				+ "            <table style=\"width:  100%;\">"
				+ "                <thead style='background-color:#2fb5d2;text-align: center;color: #ffffff;font-weight: bold;'>"
				+ "                    <tr>" + "                        <td style='width: 60%;'>Producto</td>"
				+ "                        <td style='width: 20%;'>Cantidad</td>"
				+ "                        <td style='width: 20%;'>Precio</td></tr>" + "                </thead>"
				+ "                "

				+ "<tbody>");
		for (CotizacionOnlineDetalle element : lista) {
			html.append("<tr>");
			html.append("<td>" + element.getProducto().getVchDescripcion() + "</td>");
			html.append("<td style='text-align: center;'>" + element.getNumCantidad() + "</td>");
			html.append("<td style='text-align: right;'>" + Moneda.DOLARES.getCodigoIso4217() + element.getNumTotalDol()
					+ "</td>");
			html.append("</tr>");
		}

		html.append("</tbody>"

				+ "            </table>" + "        </div>" + "        <div style='margin-right: 3em;"
				+ "            margin-left: 3em;margin-bottom: 2em;display: flex; flex-direction: row; justify-content: flex-end;text-align: right;'>"
				+ "           <div style='width: 50%;'>  </div> <div style='width: 50%;'>"
				+ "                <div style='display: flex;width: 100%;margin-top: 1em;'>"
				+ "                    <div style='font-weight: bold;width: 155px;text-align: start;'>Sub-Total:</div>"
				+ "                    <div style='font-weight: bold;margin-left: 2em;width:155px ;'>"
				+ Moneda.DOLARES.getCodigoIso4217() + subtotal + "</div>" + "                </div>"
				+ "                <div style='display: flex;width: 100%;margin-top: 1em;'>"
				+ "                    <div style='font-weight: bold;width: 155px;text-align: start; '>Costo de Envio:</div>"
				+ "                    <div style='font-weight: bold;margin-left: 2em;width:155px ;'>"
				+ Moneda.DOLARES.getCodigoIso4217() + costoEnvio + "</div>" + "                </div>"
				+ "                <div style='display: flex;width: 100%;margin-top: 1em;'>"
				+ "                    <div style='font-weight: bold;width: 155px;text-align: start; '>Total:</div>"
				+ "                    <div style='font-weight: bold;margin-left: 2em;width:155px ;'>"
				+ Moneda.DOLARES.getCodigoIso4217() + total + "</div>" + "                </div>" + "            </div>"
				+ "        </div>" + "    </div>" + "</body>" + "</html>");
		return html.toString();
	}

	public String HTML_OC_(ClienteFactura clienteFactura, ScheduledProceso scheduledProcesoStatus, OcEmail ocEmail)
			throws Exception {
		StringBuilder html = new StringBuilder();
		html.append("<!DOCTYPE html>" + "<html lang='en'>" + "<body>");
		html.append(
				"Estimados, <br> Se adjunta la orden de Compra que debe ser generada para el documento Nro:<span style='font-weight: bold;'>"
						+ scheduledProcesoStatus.getNumFacturas() + "</span>.");
		html.append("</body>" + "</html>");
		return html.toString();
	}

	public String HTML_FE_(ClienteFactura clienteFactura, OcEmail ocEmail) throws Exception {
		StringBuilder html = new StringBuilder();
		html.append("<!DOCTYPE html>" + "<html lang='en'>" + "<body>");
		if (ocEmail == OcEmail.OrdenCompra) {
			html.append("Estimados, <br> Se adjunta la orden de Compra.");
		}
		if (ocEmail == OcEmail.OrdenCompraVarios) {
			html.append("Estimados, <br> Se adjunta el Consolidado de Ordenes de Compra.");
		}

		html.append("</body>" + "</html>");
		return html.toString();
	}

	public String HTML_TIPO_CAMBIO_TOMADO(ScheduledProceso scheduledPro) {

		StringBuilder html = new StringBuilder();
		html.append("<!DOCTYPE html>" + "<html lang='en'>" + "<body>");
		html.append("Estimados, <br>La factura Nro:" + scheduledPro.getNumFacturas() + " ha tomado el tipo de cambio "
				+ scheduledPro.getNumTipoCambio() + " del dia " + scheduledPro.getDteTomado() + ".");
		html.append("</body>" + "</html>");
		return html.toString();
	}

}
