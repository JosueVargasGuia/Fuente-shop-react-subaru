package com.ShopAutoPartsServices.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ShopAutoPartsServices.Domain.ClienteFactura;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;
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
import com.ShopAutoPartsServices.Repository.CotizacionOnlineServiceRepository;

import com.ShopAutoPartsServices.Service.CotizacionOnlineService;

@Service
public class CotizacionOnlineServiceImpl implements CotizacionOnlineService {
	@Autowired
	CotizacionOnlineServiceRepository onlineServiceRepository;

	@Override
	public CotizacionOnline registrarCotizacion(CotizacionOnline cotizacionOnlineRequets)throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.registrarCotizacion(cotizacionOnlineRequets);
	}

	@Override
	public CotizacionOnlineActiva obtenerCotizacionActiva(CotizacionOnlineActiva cotizacionOnlineActivaRequest)throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerCotizacionActiva(cotizacionOnlineActivaRequest);
	}

	@Override
	public CotizacionOnlineDetalle registrarCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)throws Exception  {
		// TODO Auto-generated method stub
		return onlineServiceRepository.registrarCotizacionDetalle(cotizacionOnlineDetalle);
	}

	@Override
	public List<CotizacionOnlineDetalle> obtenerCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)
			throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerCotizacionDetalle(cotizacionOnlineDetalle);
	}

	@Override
	public CotizacionOnlineResumen obtenerCotizacionOnline(int numCodigoCotizacionOnline) throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerCotizacionOnline(numCodigoCotizacionOnline);
	}

	@Override
	public CotizacionOnlineDetalle eliminarCotizacionDetalle(CotizacionOnlineDetalle cotizacionOnlineDetalle)
			throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.eliminarCotizacionDetalle(cotizacionOnlineDetalle);
	}

	@Override
	public MetodoEnvioRequets registrarModoEnvio(MetodoEnvioRequets metodoEnvioRequets) throws Exception{
		// TODO Auto-generated method stub
		return onlineServiceRepository.registrarModoEnvio(metodoEnvioRequets) ;
	}

	@Override
	public CreatePayment obtenerCotizacionPago(CreatePaymentRequest createPaymentRequest  ) throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerCotizacionPago(createPaymentRequest) ;
	}

	@Override
	public void confirmarCotizacion(IpnRequets ipnRequets) throws Exception {
		  onlineServiceRepository.confirmarCotizacion(ipnRequets) ;
		
	}

	@Override
	public List<ClienteFactura> obtenerCotizacionFactura() throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerCotizacionFactura();
	}

	@Override
	public void registrarDatosPayment(CreatePaymentRequest createPaymentRequest) throws Exception {
		onlineServiceRepository.registrarDatosPayment(createPaymentRequest);
		
	}

	@Override
	public ScheduledProceso scheduledProceso(ScheduledProceso scheduledProceso) throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.scheduledProceso(scheduledProceso);
	}

	@Override
	public List<TusCompras> obtenerTusCotizacion(CotizacionOnline cotizacionOnline) throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerTusCotizacion(cotizacionOnline);
	}

	@Override
	public List<CotizacionOnlineDetalle> obtenerTusCotizacionDetalle(CotizacionOnline cotizacionOnlineRequets)
			throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerTusCotizacionDetalle(cotizacionOnlineRequets);
	}

	@Override
	public List<ReporteCotizacion> obtenerReporteCotizacion(ReporteRequest reporteRequest) throws Exception {
		// TODO Auto-generated method stub
		return onlineServiceRepository.obtenerReporteCotizacion(reporteRequest);
	}
}
