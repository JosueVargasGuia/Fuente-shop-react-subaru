package com.ShopAutoParts.ShopAutoPartsServices;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.json.JacksonJsonParser;

import com.ShopAutoPartsServices.Config.Empresa;
import com.ShopAutoPartsServices.Config.EncriptadorAES;
import com.ShopAutoPartsServices.Domain.ClienteUsuario;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import org.json.*;

public class GsonJsonParserDemo {

	@Test
	void Gsondemo() {

		try {
			ClienteUsuario clienteUsuario = new ClienteUsuario();
			clienteUsuario.setNumCodigoCliente(25689);
			clienteUsuario.setTokenExpire(new Date("01/12/2021"));
			clienteUsuario.getTokenExpire().getTime();
			EncriptadorAES encriptador = new EncriptadorAES();
			String formatoJson = "{\"numCodigoCliente\":\"" + clienteUsuario.getNumCodigoCliente()
					+ "\",\"tokenExpire\":" + clienteUsuario.getTokenExpire().getTime() + "}";
			System.err.println(formatoJson);
			String encriptado = encriptador.encriptar(formatoJson,
					"uAG/GlOC0+bNziHnu2ckmZbB945CMLjLTLXQJir0S78=");
			 
			System.err.println(encriptado);
			
			String decencriptado = encriptador.desencriptar("31u8oXcw4ucHWCvaPxVzTlHglglM3gLMw5LFNl9Uqb58OEpNnlmFwnSa5tLUejAs1nyfkxD5VSULYMn 8jjOnw==",
					"uAG/GlOC0+bNziHnu2ckmZbB945CMLjLTLXQJir0S78=");
			System.err.println(decencriptado);	
			/* 
			JacksonJsonParser jacksonJsonParser = new JacksonJsonParser();
			HashMap<String, Object> map = (HashMap<String, Object>) jacksonJsonParser.parseMap(decencriptado);
			ClienteUsuario clienteUsuarioBluid = new ClienteUsuario();
			clienteUsuarioBluid.setNumCodigoCliente(Integer.parseInt(map.get("numCodigoCliente").toString()));
			clienteUsuarioBluid.setTokenExpire(new Date(Long.parseLong(map.get("tokenExpire").toString())));
			System.out.println(clienteUsuarioBluid.getNumCodigoCliente());
			System.out.println(clienteUsuarioBluid.getTokenExpire().getTime());*/
			 
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
