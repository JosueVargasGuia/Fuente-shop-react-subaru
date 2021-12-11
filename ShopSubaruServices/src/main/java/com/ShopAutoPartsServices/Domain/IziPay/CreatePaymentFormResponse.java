package com.ShopAutoPartsServices.Domain.IziPay;

import com.ShopAutoPartsServices.Domain.Response;

public class CreatePaymentFormResponse {
	Response response = new Response();
	String endPoint;
	String publicKey;
	String formToken;
	String hmacSha256Key;

	public Response getResponse() {
		return response;
	}

	public void setResponse(Response response) {
		this.response = response;
	}

	public String getEndPoint() {
		return endPoint;
	}

	public void setEndPoint(String endPoint) {
		this.endPoint = endPoint;
	}

	public String getPublicKey() {
		return publicKey;
	}

	public void setPublicKey(String publicKey) {
		this.publicKey = publicKey;
	}

	public String getFormToken() {
		return formToken;
	}

	public void setFormToken(String formToken) {
		this.formToken = formToken;
	}

	public String getHmacSha256Key() {
		return hmacSha256Key;
	}

	public void setHmacSha256Key(String hmacSha256Key) {
		this.hmacSha256Key = hmacSha256Key;
	}

}
