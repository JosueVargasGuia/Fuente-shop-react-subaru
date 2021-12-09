package com.ShopAutoParts.ShopAutoPartsServices;

 
import java.io.File;

import org.junit.jupiter.api.Test;

import com.ShopAutoPartsServices.Domain.IziPay.ScheduledProceso;
import com.ShopAutoPartsServices.Service.FacturacionService;
import com.ShopAutoPartsServices.Service.Impl.FacturacionImpl;
public class IreportsExecute {
	@Test
	void fileExecute() {
		
		FacturacionService facturacionService=new FacturacionImpl();
		ScheduledProceso scheduledProceso=new ScheduledProceso();
		try {
			File file=facturacionService.obtenerFileReporteOc(scheduledProceso);
			System.out.println("Execute");
		} catch (Exception e) {
			e.printStackTrace();
		}
		
	}

}
