package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

import org.springframework.http.HttpStatus;

import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;

public class Response {
	List<String>error=new ArrayList<>();	 
	SUCCESS_SERVER status;//Codigo de repuesta del server
	String objectStatus;//estado del procedimientos, funcion o mensajes de la BD
	public List<String> getError() {
		return error;
	}
	public Response setError(List<String> error) {
		this.error = error;
		return this;
	}	 
	 
	public String getObjectStatus() {
		return objectStatus;
	}
	public Response setObjectStatus(String objectStatus) {
		this.objectStatus = objectStatus;
		return this;
	}
	public SUCCESS_SERVER getStatus() {
		return status;
	}
	public Response setStatus(SUCCESS_SERVER status) {
		this.status = status;
		return this;
	}
	@Override
	public String toString() {
		return "Response [error=" + error + ", status=" + status + ", objectStatus=" + objectStatus + "]";
	}
	
}
