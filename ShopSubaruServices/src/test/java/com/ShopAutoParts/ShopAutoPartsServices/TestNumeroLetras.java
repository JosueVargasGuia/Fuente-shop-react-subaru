package com.ShopAutoParts.ShopAutoPartsServices;

import org.junit.jupiter.api.Test;

import com.ShopAutoPartsServices.Enums.Moneda;
import com.ShopAutoPartsServices.Util.NumeroLetras;

public class TestNumeroLetras {
	@Test
	void TestNumeroLetras() {
		NumeroLetras s=new NumeroLetras(Moneda.DOLARES);
		System.out.println(s.Convertir(".55", false));
		System.out.println(s.Convertir("2588,25", false));
		 
	}
}
