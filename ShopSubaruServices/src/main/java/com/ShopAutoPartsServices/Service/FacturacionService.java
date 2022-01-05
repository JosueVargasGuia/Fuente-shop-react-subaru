package com.ShopAutoPartsServices.Service;

import java.io.File;
import java.util.ArrayList;

import com.ShopAutoPartsServices.Domain.ReportePdfRequets;
import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;
import com.ShopAutoPartsServices.FE.Beans.BeanEmpresa;
import com.ShopAutoPartsServices.FE.Beans.BeanFacturacion;

public interface FacturacionService {

	BeanFacturacion ObtenerFacturaElectronicaCabecera(BeanFacturacion fac,ScheduledProceso scheduledProcesoStatus) throws Exception;

	ArrayList<BeanFacturacion> ListarFacturaElectronicaDetalle(BeanFacturacion fac) throws Exception;

	BeanEmpresa obtenerEmpresa(int numCodigoEmpre) throws Exception;

	File obtenerFileReporteOc(ScheduledProceso scheduledProceso)throws Exception;

	File obtenerFileReporteOcVarios(ScheduledProceso scheduledProceso)throws Exception;

	String obtenerReporteCotizacion(ReportePdfRequets reportePdfRequets)throws Exception;

	String obtenerReporteFactura(ReportePdfRequets reportePdfRequets)throws Exception;

	String obtenerReporteOrdenCompra(ReportePdfRequets reportePdfRequets)throws Exception;

	String obtenerReporteGuiaSalida(ReportePdfRequets reportePdfRequets)throws Exception;

	File obtenerFileReporteOcOnline(ScheduledProceso scheduledProceso)throws Exception;

}
