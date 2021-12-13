package com.ShopAutoPartsServices.Domain;

public class SubirImagen {
	String chrCodigoProducto;
	String fileByteBase64;
	Response response=new Response();
	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}

	public SubirImagen setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}

	public String getFileByteBase64() {
		return fileByteBase64;
	}

	public SubirImagen setFileByteBase64(String fileByteBase64) {
		this.fileByteBase64 = fileByteBase64;
		return this;
	}

	public Response getResponse() {
		return response;
	}

	public SubirImagen setResponse(Response response) {
		this.response = response;
		return this;
	}

	@Override
	public String toString() {
		return "SubirImagen [chrCodigoProducto=" + chrCodigoProducto + ", fileByteBase64=" + fileByteBase64
				+ ", response=" + response + "]";
	}

}
