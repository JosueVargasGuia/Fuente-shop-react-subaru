package com.ShopAutoParts.ShopAutoPartsServices;

import java.security.*;
import java.security.spec.*;
import java.util.Base64;

import javax.crypto.*;
import javax.crypto.interfaces.*;
import javax.crypto.spec.*;

import static org.hamcrest.CoreMatchers.instanceOf;

import java.io.*;

//import org.bouncycastle.jce.provider.BouncyCastleProvider;

import org.junit.jupiter.api.Test;

import com.ShopAutoPartsServices.Config.EncriptadorAES;
import com.ShopAutoPartsServices.Enums.MetodoEnvio;

class ShopAutoPartsServicesApplicationTests {
	@Test
	void encriptor() {
		try {
			System.err.println( MetodoEnvio.valueOf("RecojoAlmacen1").getDescripcion() );
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		MetodoEnvio d=MetodoEnvio.valueOf("RecojoAlmacen");
		try {
			final String claveEncriptacion = "secreto!";
			
			String datosOriginales = "20604770476EANET GLOBAL S.A.C.";

			EncriptadorAES encriptador = new EncriptadorAES();

			String encriptado = encriptador.encriptar(datosOriginales, claveEncriptacion);
			String desencriptado = encriptador.desencriptar(encriptado, claveEncriptacion);

			System.out.println("Cadena Original: " + datosOriginales);
			System.out.println("Escriptado     : " + encriptado);
			System.out.println("Desencriptado  : " + desencriptado);

		} catch (UnsupportedEncodingException | NoSuchAlgorithmException | InvalidKeyException | NoSuchPaddingException
				| IllegalBlockSizeException | BadPaddingException ex) {
			System.out.println(EncriptadorAES.class.getName() + ex.getMessage());
		}
	}

	void contextLoads() {
		try {
			//Security.addProvider(new BouncyCastleProvider());
			KeyPairGenerator keyGen = KeyPairGenerator.getInstance("RSA", "BC");
			keyGen.initialize(512); // tamano clave 512 bits
			KeyPair clavesRSA = keyGen.generateKeyPair();
			PrivateKey clavePrivada = clavesRSA.getPrivate();

			Cipher cifrador = Cipher.getInstance("RSA", "BC"); // Hace uso del provider BC
			cifrador.init(Cipher.ENCRYPT_MODE, clavePrivada); // Cifra con la clave publica
			byte[] bufferCifrado = cifrador.doFinal("JOSUE".getBytes("UTF-8"));

			cifrador.init(Cipher.DECRYPT_MODE, clavePrivada); // Descrifra con la clave privada
			byte[] bufferPlano2 = cifrador.doFinal(bufferCifrado);
			String s = new String(bufferPlano2);
			System.out.println(s);
		} catch (Exception e) {
			// TODO: handle exception
		}

	}

}
