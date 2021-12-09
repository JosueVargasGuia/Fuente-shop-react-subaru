package com.ShopAutoPartsServices.FE.Beans;
 

public class BeanUtil {
 
	//HORA SIN SEGUNDOS HH:MM:SS AM
	public static String getHora(String hora) {

		String cad="";
		int cont = 0;
		for(int i=0;i<hora.length();i++){
			if(hora.charAt(i)==':'){
				cont++;
				if(cont==2){
					i+=2;
					continue;//A DIFERENCIA DEL BREAK "CONTINUE" NO SALDRA DEL BUCLE FOR,PERO IGNORARA LAS LINEAS DE ABAJO
				}
			}
		 cad += ""+hora.charAt(i);
		}

		return cad;
	}
}
