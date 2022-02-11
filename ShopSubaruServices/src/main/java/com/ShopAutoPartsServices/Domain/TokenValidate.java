package com.ShopAutoPartsServices.Domain;

public class TokenValidate {
String token;
Response response=new Response();
public String getToken() {
	return token;
}
public TokenValidate setToken(String token) {
	this.token = token;
	return this;
}
public Response getResponse() {
	return response;
}
public TokenValidate setResponse(Response response) {
	this.response = response;
	return this;
} 

}
