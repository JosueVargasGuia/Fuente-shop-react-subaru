package com.ShopAutoPartsServices.Repository;

import java.io.File;
import java.util.ArrayList;

import com.ShopAutoPartsServices.Domain.ReportePdfRequets;
import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;
import com.ShopAutoPartsServices.FE.Beans.BeanEmpresa;
import com.ShopAutoPartsServices.FE.Beans.BeanFacturacion;

public interface FacturacionRepository {
	BeanFacturacion ObtenerFacturaElectronicaCabecera(BeanFacturacion fac,ScheduledProceso scheduledProcesoStatus) throws Exception;

	ArrayList<BeanFacturacion> ListarFacturaElectronicaDetalle(BeanFacturacion fac) throws Exception;

	BeanEmpresa obtenerEmpresa(int numCodigoEmpre) throws Exception;

	File obtenerFileReporteOc(ScheduledProceso scheduledProceso) throws Exception;

	File obtenerFileReporteOcVarios(ScheduledProceso scheduledProceso) throws Exception;
	public String obtenerReporteCotizacion(ReportePdfRequets reportePdfRequets)throws Exception;
	public String obtenerReporteFactura(ReportePdfRequets reportePdfRequets)throws Exception;
	public String obtenerReporteOrdenCompra(ReportePdfRequets reportePdfRequets)throws Exception;
	public String obtenerReporteGuiaSalida(ReportePdfRequets reportePdfRequets)throws Exception;
	public String obtenerReporteOrdenCompraOnline(ReportePdfRequets reportePdfRequets)throws Exception;
}
