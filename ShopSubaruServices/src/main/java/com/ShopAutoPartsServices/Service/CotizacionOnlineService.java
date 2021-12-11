package com.ShopAutoPartsServices.Service;

 
import java.util.List;

import com.ShopAutoPartsServices.Domain.ClienteFactura;
import com.ShopAutoPartsServices.Domain.CotizacionOnline;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineActiva;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineDetalle;
import com.ShopAutoPartsServices.Domain.CotizacionOnlineResumen;
import com.ShopAutoPartsServices.Domain.MetodoEnvioRequets;
import com.ShopAutoPartsServices.Domain.ReporteCotizacion;
import com.ShopAutoPartsServices.Domain.ReporteRequest;
import com.ShopAutoPartsServices.Domain.TusCompras;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePayment;
import com.ShopAutoPartsServices.Domain.IziPay.CreatePaymentRequest;
import com.ShopAutoPartsServices.Domain.IziPay.IpnRequets;
import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;

public interface CotizacionOnlineService {

	CotizacionOnline registrarCotizacion(CotizacionOnline cotizacionOnlineRequets) throws Exception;

	CotizacionOnlineActiva obtenerCotizacionActiva(CotizacionOnlineActiva cotizacionOnlineActivaRequest) throws Exception;

	CotizacionOnlineDetalle registrarCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)throws Exception ;

	List<CotizacionOnlineDetalle> obtenerCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)throws Exception;

	CotizacionOnlineResumen obtenerCotizacionOnline(int numCodigoCotizacionOnline)throws Exception;

	CotizacionOnlineDetalle eliminarCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)throws Exception;

	MetodoEnvioRequets registrarModoEnvio(MetodoEnvioRequets metodoEnvioRequets)throws Exception;

	CreatePayment obtenerCotizacionPago(CreatePaymentRequest createPaymentRequest)throws Exception;

	void confirmarCotizacion(IpnRequets ipnRequets)throws Exception;

	List<ClienteFactura> obtenerCotizacionFactura()throws Exception;

	void registrarDatosPayment(CreatePaymentRequest createPaymentRequest)throws Exception;

	ScheduledProceso scheduledProceso(ScheduledProceso scheduledProceso)  throws Exception;

	List<TusCompras> obtenerTusCotizacion(CotizacionOnline cotizacionOnline)throws Exception;

	List<CotizacionOnlineDetalle> obtenerTusCotizacionDetalle(CotizacionOnline cotizacionOnlineRequets)throws Exception;

	List<ReporteCotizacion> obtenerReporteCotizacion(ReporteRequest reporteRequest)throws Exception;
}
