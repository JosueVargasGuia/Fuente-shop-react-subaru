package com.ShopAutoPartsServices.FE;

 
import java.util.regex.Matcher;
import java.util.regex.Pattern;

 

/**
 * M�todo que maneja las cadenas para usos detallados.
 * @author Victor Sanchez
 *
 */
public class UtilString {
	
	/**
	 * M�todo que analiza una cadena enviada, si est� posee s�mbolos o est� en ascii, la transforma en su correposdiente a cadena.
	 * Decodifica una cadena en utf8.
	 * @param chain
	 * @return
	 */
	public static String defineString(String value) {
		if (value != null)
			return (value.trim().equalsIgnoreCase("null")) ? "" : value.trim();
		else
			return new String();
	}
	public static boolean emailValido(String email){
		final String regex = "(?:[a-z0-9!#$%&'*+/=?^_`\\{|\\}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`\\"
				+ "{|\\}~-]+)*|\"(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21\\x23-\\x5b\\x5d-\\x7f]|"
				+ "\\\\[\\x01-\\x09\\x0b\\x0c\\x0e-\\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])"
				+ "?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|"
				+ "[1-9]?[0-9]))\\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*"
				+ "[a-z0-9]:(?:[\\x01-\\x08\\x0b\\x0c\\x0e-\\x1f\\x21-\\x5a\\x53-\\x7f]|\\\\[\\x01-"
				+ "\\x09\\x0b\\x0c\\x0e-\\x7f])+)\\])";
		final Pattern pattern = Pattern.compile(regex, Pattern.MULTILINE);
		final Matcher matcher = pattern.matcher(email);
		return matcher.find();
    }
}