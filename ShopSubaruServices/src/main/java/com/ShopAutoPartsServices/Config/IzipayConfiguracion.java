package com.ShopAutoPartsServices.Config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;

@Configuration
public class IzipayConfiguracion {
	@Value("${izipay.publicKey.javascript}")
	String publicKey;

	@Value("${izipay.endPoint}")
	String endPoint;

	@Value("${izipay.privatecKey.api}")
	String privateKey;

	@Value("${izipay.api.url}")
	String apiUrl;

	@Value("${izipay.publicKey.api.rest}")
	String hmacSha256Key;

	public String getPublicKey() {
		return publicKey;
	}

	public void setPublicKey(String publicKey) {
		this.publicKey = publicKey;
	}

	public String getEndPoint() {
		return endPoint;
	}

	public void setEndPoint(String endPoint) {
		this.endPoint = endPoint;
	}

	public String getPrivateKey() {
		return privateKey;
	}

	public void setPrivateKey(String privateKey) {
		this.privateKey = privateKey;
	}

	public String getApiUrl() {
		return apiUrl;
	}

	public void setApiUrl(String apiUrl) {
		this.apiUrl = apiUrl;
	}

	public String getHmacSha256Key() {
		return hmacSha256Key;
	}

	public void setHmacSha256Key(String hmacSha256Key) {
		this.hmacSha256Key = hmacSha256Key;
	}

}
