package com.ShopAutoPartsServices.Service.Impl;

import java.io.File;
import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ShopAutoPartsServices.Domain.AsociaOc;
import com.ShopAutoPartsServices.Domain.ReportePdfRequets;
import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;
import com.ShopAutoPartsServices.FE.Beans.BeanEmpresa;
import com.ShopAutoPartsServices.FE.Beans.BeanFacturacion;
import com.ShopAutoPartsServices.Repository.Impl.FacturacionRepositoryImpl;
import com.ShopAutoPartsServices.Service.FacturacionService;

@Service
public class FacturacionImpl implements FacturacionService {
	@Autowired
	FacturacionRepositoryImpl facturacionRepositoryImpl;

	@Override
	public BeanFacturacion ObtenerFacturaElectronicaCabecera(BeanFacturacion fac,ScheduledProceso scheduledProcesoStatus) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.ObtenerFacturaElectronicaCabecera(fac,scheduledProcesoStatus);
	}

	@Override
	public ArrayList<BeanFacturacion> ListarFacturaElectronicaDetalle(BeanFacturacion fac) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.ListarFacturaElectronicaDetalle(fac);
	}

	@Override
	public BeanEmpresa obtenerEmpresa(int numCodigoEmpre) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerEmpresa(numCodigoEmpre);
	}

	@Override
	public File obtenerFileReporteOc(ScheduledProceso scheduledProceso) throws Exception {
		// TODO Auto-generated method stub		
		return facturacionRepositoryImpl.obtenerFileReporteOc(scheduledProceso);
	}

	@Override
	public File obtenerFileReporteOcVarios(ScheduledProceso scheduledProceso) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerFileReporteOcVarios(scheduledProceso);
	}

	@Override
	public String obtenerReporteCotizacion(ReportePdfRequets reportePdfRequets) throws Exception{
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerReporteCotizacion(reportePdfRequets);
	}

	@Override
	public String obtenerReporteFactura(ReportePdfRequets reportePdfRequets) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerReporteFactura( reportePdfRequets);
	}

	@Override
	public String obtenerReporteOrdenCompra(ReportePdfRequets reportePdfRequets) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerReporteOrdenCompra( reportePdfRequets);
	}

	@Override
	public String obtenerReporteGuiaSalida(ReportePdfRequets reportePdfRequets) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerReporteGuiaSalida(reportePdfRequets);
	}

	@Override
	public File obtenerFileReporteOcOnline(ScheduledProceso scheduledProceso) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerFileReporteOcOnline(scheduledProceso);
	}

	@Override
	public String obtenerReporteOrdenCompraOnline(ReportePdfRequets reportePdfRequets) throws Exception {
		// TODO Auto-generated method stub
		return facturacionRepositoryImpl.obtenerReporteOrdenCompraOnline(reportePdfRequets);
	}

	@Override
	public String asignarOcToCotizacion(AsociaOc asociaOc) throws Exception {
		return facturacionRepositoryImpl.asignarOcToCotizacion(asociaOc);
	}

	 
}
