package com.ShopAutoPartsServices.Domain;

import java.io.File;

public class ReportePdfResponse {
	Response response=new Response();
	String byteEnconderBase64;
	public Response getResponse() {
		return response;
	}

	public ReportePdfResponse setResponse(Response response) {
		this.response = response;
		return this;
	}

	public String getByteEnconderBase64() {
		return byteEnconderBase64;
	}

	public ReportePdfResponse setByteEnconderBase64(String byteEnconderBase64) {
		this.byteEnconderBase64 = byteEnconderBase64;
		return this;
	}

  
	
}
