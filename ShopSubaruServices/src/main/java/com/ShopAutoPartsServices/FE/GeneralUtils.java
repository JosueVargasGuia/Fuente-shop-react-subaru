package com.ShopAutoPartsServices.FE;

public class GeneralUtils {

	public static double round(String value) {
		return (isDoubleNumeric(value)) ? round(Double.parseDouble(value)) : 0;
	}

	public static boolean isDoubleNumeric(String value) {
		try {
			Double.parseDouble(value);
			return true;
		} catch (Exception e) {
			return false;
		}
	}

	private static double round(double value) {
		return Math.round(value * 100.00) / 100.00;
	}
}
