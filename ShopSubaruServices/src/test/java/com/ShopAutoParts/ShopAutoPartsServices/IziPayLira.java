package com.ShopAutoParts.ShopAutoPartsServices;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import org.apache.http.client.methods.CloseableHttpResponse;
import org.apache.http.client.methods.HttpPost;
import org.apache.http.client.utils.HttpClientUtils;
import org.apache.http.entity.ContentType;
import org.apache.http.entity.StringEntity;
import org.apache.http.impl.client.CloseableHttpClient;
import org.apache.http.impl.client.HttpClients;
import org.apache.http.util.EntityUtils;
import org.junit.jupiter.api.Test;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.util.Base64Utils;

import com.google.gson.Gson;

public class IziPayLira {
	@Test
	void IziPayLira() {
		try {
			//https://secure.micuentaweb.pe/vads-merchant/
			//String fooResourceUrl = "https://api.lyra.com/api-payment/V4/Charge/CreatePayment";
			String fooResourceUrl = "https://api.micuentaweb.pe/api-payment/V4/Charge/CreatePayment";
			CloseableHttpClient httpClient = HttpClients.createDefault();
			HttpPost httpPost = new HttpPost(fooResourceUrl);
			httpPost.addHeader(HttpHeaders.CONTENT_TYPE, MediaType.APPLICATION_JSON_UTF8_VALUE);
			httpPost.addHeader(HttpHeaders.ACCEPT, MediaType.APPLICATION_JSON_UTF8_VALUE);
			httpPost.addHeader(HttpHeaders.AUTHORIZATION,"Basic " +Base64Utils.encodeToString(new String("60707340:testpassword_l0TV9ieDue3r8TPZJaYX2pcPn79QT9IGD5xC8CDCi6KJu").getBytes()));
			Gson gson = new Gson();
			String json = gson.toJson(new CreatePayment());
			StringEntity entity = new StringEntity(json);
			httpPost.setEntity(entity);
			CloseableHttpResponse response = httpClient.execute(httpPost);
			String body = EntityUtils.toString(response.getEntity());
			System.out.println(body);
			CreatePaymentResponse paymentResponse = gson.fromJson(body, CreatePaymentResponse.class);
			
			System.out.println("-----------------------------");
			System.out.println(paymentResponse.getStatus());
			System.out.println("::"+paymentResponse.getAnswer().getFormToken());
		} catch (Exception e) {
			System.err.println("Error:" + e.getMessage());
			e.printStackTrace();
		}
	}
 

	public class CreatePayment {
		int amount = 30050;
		String currency = "PEN";
		String orderId = "myOrderId-1234";
		String formAction = "PAYMENT";

		public int getAmount() {
			return amount;
		}

		public CreatePayment setAmount(int amount) {
			this.amount = amount;
			return this;
		}

		public String getCurrency() {
			return currency;
		}

		public CreatePayment setCurrency(String currency) {
			this.currency = currency;
			return this;
		}

		public String getOrderId() {
			return orderId;
		}

		public CreatePayment setOrderId(String orderId) {
			this.orderId = orderId;
			return this;
		}

		public String getFormAction() {
			return formAction;
		}

		public CreatePayment setFormAction(String formAction) {
			this.formAction = formAction;
			return this;
		}

	}

	public class Customer {
		String reference = "myCustomerRef-123456";
		String email = "sample@example.com";

		public Customer() {
			super();
		}

		public String getReference() {
			return reference;
		}

		public Customer setReference(String reference) {
			this.reference = reference;
			return this;
		}

		public String getEmail() {
			return email;
		}

		public Customer setEmail(String email) {
			this.email = email;
			return this;
		}

	}

	public class CreatePaymentResponse  {
		String webService, version, applicationVersion, status, ticket, 
		serverDate, applicationProvider, metadata,
				_type, type;
		Answer answer=new Answer();
		/*
		 * webService version applicationVersion status ticket serverDate
		 * applicationProvider metadata _type
		 */

		public CreatePaymentResponse() {
		}

		public String getType() {
			return type;
		}

		public CreatePaymentResponse setType(String type) {
			this.type = type;
			return this;
		}

		public String getWebService() {
			return webService;
		}

		public CreatePaymentResponse setWebService(String webService) {
			this.webService = webService;
			return this;
		}

		public String getVersion() {
			return version;
		}

		public CreatePaymentResponse setVersion(String version) {
			this.version = version;
			return this;
		}

		public String getApplicationVersion() {
			return applicationVersion;
		}

		public CreatePaymentResponse setApplicationVersion(String applicationVersion) {
			this.applicationVersion = applicationVersion;
			return this;
		}

		public String getStatus() {
			return status;
		}

		public CreatePaymentResponse setStatus(String status) {
			this.status = status;
			return this;
		}

		public String getTicket() {
			return ticket;
		}

		public CreatePaymentResponse setTicket(String ticket) {
			this.ticket = ticket;
			return this;
		}

		public String getServerDate() {
			return serverDate;
		}

		public CreatePaymentResponse setServerDate(String serverDate) {
			this.serverDate = serverDate;
			return this;
		}

		public String getApplicationProvider() {
			return applicationProvider;
		}

		public CreatePaymentResponse setApplicationProvider(String applicationProvider) {
			this.applicationProvider = applicationProvider;
			return this;
		}

		public String getMetadata() {
			return metadata;
		}

		public CreatePaymentResponse setMetadata(String metadata) {
			this.metadata = metadata;
			return this;
		}

		public String get_type() {
			return _type;
		}

		public CreatePaymentResponse set_type(String _type) {
			this._type = _type;
			return this;
		}

		public Answer getAnswer() {
			return answer;
		}

		public CreatePaymentResponse setAnswer(Answer answer) {
			this.answer = answer;
			return this;
		}

		@Override
		public String toString() {
			return "CreatePaymentResponse [webService=" + webService + ", version=" + version + ", applicationVersion="
					+ applicationVersion + ", status=" + status + ", ticket=" + ticket + ", serverDate=" + serverDate
					+ ", applicationProvider=" + applicationProvider + ", metadata=" + metadata + ", _type=" + _type
					+ ", type=" + type + ", answer=" + answer.toString() + "]";
		}

	}

	public class Answer {
		String errorCode, errorMessage, detailedErrorCode, detailedErrorMessage, ticket, shopId, _type,formToken;

		public String getErrorCode() {
			return errorCode;
		}

		public Answer setErrorCode(String errorCode) {
			this.errorCode = errorCode;
			return this;
		}

		public String getErrorMessage() {
			return errorMessage;
		}

		public Answer setErrorMessage(String errorMessage) {
			this.errorMessage = errorMessage;
			return this;
		}

		public String getDetailedErrorCode() {
			return detailedErrorCode;
		}

		public Answer setDetailedErrorCode(String detailedErrorCode) {
			this.detailedErrorCode = detailedErrorCode;
			return this;
		}

		public String getDetailedErrorMessage() {
			return detailedErrorMessage;
		}

		public Answer setDetailedErrorMessage(String detailedErrorMessage) {
			this.detailedErrorMessage = detailedErrorMessage;
			return this;
		}

		public String getTicket() {
			return ticket;
		}

		public Answer setTicket(String ticket) {
			this.ticket = ticket;
			return this;
		}

		public String getShopId() {
			return shopId;
		}

		public Answer setShopId(String shopId) {
			this.shopId = shopId;
			return this;
		}

		public String get_type() {
			return _type;
		}

		public Answer set_type(String _type) {
			this._type = _type;
			return this;
		}

		public String getFormToken() {
			return formToken;
		}

		public Answer setFormToken(String formToken) {
			this.formToken = formToken;
			return this;
		}

		@Override
		public String toString() {
			return "Answer [errorCode=" + errorCode + ", errorMessage=" + errorMessage + ", detailedErrorCode="
					+ detailedErrorCode + ", detailedErrorMessage=" + detailedErrorMessage + ", ticket=" + ticket
					+ ", shopId=" + shopId + ", _type=" + _type + ", formToken=" + formToken + "]";
		}

		  
	}
}
