package com.ShopAutoPartsServices.Domain;

 
import java.util.ArrayList;
import java.util.List;

public class Producto {
	String chrCodigoProducto;// CHAR(20 BYTE) NOT NULL,
	String numValorVentaDolar;// NUMBER,
	String numValorVentaSoles;// NUMBER,
	String numValorVentaDolarIgv;// NUMBER,
	String numValorVentaSolesIgv;// NUMBER,
	int numCodigoMoneda;// NUMBER,
	String chrEstado;// CHAR(1 BYTE),
	String vchDescripcion;// VARCHAR2(100 BYTE),
	String vchDescripcionSmall;// VARCHAR2(100 BYTE),
	int numStock;// NUMBER
	Familia familia;
	List<ProductoImagen> listaProductoImagen=new ArrayList<ProductoImagen>();
	List<ProductoDetalle>listaProductoDetalle=new ArrayList<ProductoDetalle>();
	ProductoImagen imagenDefault;
	/*Total de registros de la BD*/
	int totalRegistros;
	int numOutlet;
	int numProductoVigencia;
	/*Valores de solo vizualizacion*/
	String numValorVentaRefDolar;// NUMBER,
	String numValorVentaRefSoles;// NUMBER,
	String numValorDesc;// NUMBER,
	int displayChrcodigoproducto;
	/*
	 * TPRODUCTO.CHRCODIGOPRODUCTO,TPRODUCTO.NUMVALORVENTA AS
	 * NUMVALORVENTADOLAR,TPRODUCTO.NUMVALORVENTA AS NUMVALORVENTASOLES,
	 * TPRODUCTO.VCHDESCRIPCION,TPRODUCTO.NUMSTOCK,
	 * TPRODUCTO.CHRSRCIMAGEN,TPRODUCTO.CHRNOMBRE,TPRODUCTO.CHRTYPE
	 */
	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}

	public Producto setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}

	public String getNumValorVentaDolar() {
		return numValorVentaDolar;
	}

	public Producto setNumValorVentaDolar(String numValorVentaDolar) {
		this.numValorVentaDolar = numValorVentaDolar;
		return this;
	}

	public String getNumValorVentaSoles() {
		return numValorVentaSoles;
	}

	public Producto setNumValorVentaSoles(String numValorVentaSoles) {
		this.numValorVentaSoles = numValorVentaSoles;
		return this;
	}

	public int getNumCodigoMoneda() {
		return numCodigoMoneda;
	}

	public Producto setNumCodigoMoneda(int numCodigoMoneda) {
		this.numCodigoMoneda = numCodigoMoneda;
		return this;
	}

	public String getChrEstado() {
		return chrEstado;
	}

	public Producto setChrEstado(String chrEstado) {
		this.chrEstado = chrEstado;
		return this;
	}

	public String getVchDescripcion() {
		return vchDescripcion;
	}

	public Producto setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}

	public int getNumStock() {
		return numStock;
	}

	public Producto setNumStock(int numStock) {
		this.numStock = numStock;
		return this;
	}

	public List<ProductoImagen> getListaProductoImagen() {
		return listaProductoImagen;
	}

	public Producto setListaProductoImagen(List<ProductoImagen> listaProductoImagen) {
		this.listaProductoImagen = listaProductoImagen;
		return this;
	}

	public Familia getFamilia() {
		return familia;
	}

	public Producto setFamilia(Familia familia) {
		this.familia = familia;
		return this;
	}

	public ProductoImagen getImagenDefault() {
		return imagenDefault;
	}

	public Producto setImagenDefault(ProductoImagen imagenDefault) {
		this.imagenDefault = imagenDefault;
		return this;
	}

	public String getVchDescripcionSmall() {
		return vchDescripcionSmall;
	}

	public Producto setVchDescripcionSmall(String vchDescripcionSmall) {
		this.vchDescripcionSmall = vchDescripcionSmall;
		return this;
	}

	public List<ProductoDetalle> getListaProductoDetalle() {
		return listaProductoDetalle;
	}

	public Producto setListaProductoDetalle(List<ProductoDetalle> listaProductoDetalle) {
		this.listaProductoDetalle = listaProductoDetalle;
		return this;
	}

	public int getTotalRegistros() {
		return totalRegistros;
	}

	public Producto setTotalRegistros(int totalRegistros) {
		this.totalRegistros = totalRegistros;
		return this;
	}

	public int getNumOutlet() {
		return numOutlet;
	}

	public void setNumOutlet(int numOutlet) {
		this.numOutlet = numOutlet;
	}

	public String getNumValorVentaRefDolar() {
		return numValorVentaRefDolar;
	}

	public void setNumValorVentaRefDolar(String numValorVentaRefDolar) {
		this.numValorVentaRefDolar = numValorVentaRefDolar;
	}

	public String getNumValorVentaRefSoles() {
		return numValorVentaRefSoles;
	}

	public void setNumValorVentaRefSoles(String numValorVentaRefSoles) {
		this.numValorVentaRefSoles = numValorVentaRefSoles;
	}

	public String getNumValorDesc() {
		return numValorDesc;
	}

	public void setNumValorDesc(String numValorDesc) {
		this.numValorDesc = numValorDesc;
	}

	public int getNumProductoVigencia() {
		return numProductoVigencia;
	}

	public void setNumProductoVigencia(int numProductoVigencia) {
		this.numProductoVigencia = numProductoVigencia;	 
	}

	public String getNumValorVentaDolarIgv() {
		return numValorVentaDolarIgv;
	}

	public void setNumValorVentaDolarIgv(String numValorVentaDolarIgv) {
		this.numValorVentaDolarIgv = numValorVentaDolarIgv;
	}

	public String getNumValorVentaSolesIgv() {
		return numValorVentaSolesIgv;
	}

	public void setNumValorVentaSolesIgv(String numValorVentaSolesIgv) {
		this.numValorVentaSolesIgv = numValorVentaSolesIgv;
	}

	public int getDisplayChrcodigoproducto() {
		return displayChrcodigoproducto;
	}

	public void setDisplayChrcodigoproducto(int displayChrcodigoproducto) {
		this.displayChrcodigoproducto = displayChrcodigoproducto;
		 
	}

	@Override
	public String toString() {
		return "Producto [chrCodigoProducto=" + chrCodigoProducto + ", numValorVentaDolar=" + numValorVentaDolar
				+ ", numValorVentaSoles=" + numValorVentaSoles + ", numValorVentaDolarIgv=" + numValorVentaDolarIgv
				+ ", numValorVentaSolesIgv=" + numValorVentaSolesIgv + ", numCodigoMoneda=" + numCodigoMoneda
				+ ", chrEstado=" + chrEstado + ", vchDescripcion=" + vchDescripcion + ", vchDescripcionSmall="
				+ vchDescripcionSmall + ", numStock=" + numStock + ", familia=" + familia + ", listaProductoImagen="
				+ listaProductoImagen + ", listaProductoDetalle=" + listaProductoDetalle + ", imagenDefault="
				+ imagenDefault + ", totalRegistros=" + totalRegistros + ", numOutlet=" + numOutlet
				+ ", numProductoVigencia=" + numProductoVigencia + ", numValorVentaRefDolar=" + numValorVentaRefDolar
				+ ", numValorVentaRefSoles=" + numValorVentaRefSoles + ", numValorDesc=" + numValorDesc + "]";
	}

	 
 

}
