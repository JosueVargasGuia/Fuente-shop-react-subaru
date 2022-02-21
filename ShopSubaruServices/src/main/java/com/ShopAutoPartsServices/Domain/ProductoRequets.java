package com.ShopAutoPartsServices.Domain;

import java.util.ArrayList;
import java.util.List;

import com.ShopAutoPartsServices.Enums.FilterOrderBy;
import com.ShopAutoPartsServices.Enums.FilterProducto;
import com.ShopAutoPartsServices.Enums.FilterSubFamilia;
 
//import com.ShopAutoPartsServices.Enums.FilterTypeLista;

public class ProductoRequets {
	String chrCodigoProducto;
	String chrCodigoFamilia;
	String vchDescripcion;
	/*Filtro de type: Destacado,oferta,remate,destacado en marca*/
	FilterProducto filterProducto=FilterProducto.FILTER_ALL;
	/*Filtro de las subfamilias*/
	FilterSubFamilia filterSubFamilia=FilterSubFamilia.FILTER_SUBFAMILIA_ALL;
	/*Filter de ordenamiento,con imagenes*/
	FilterOrderBy filterOrder=FilterOrderBy.FilterAscDescripcion;
	/*Filter de type normal o de atajo se adiciona la busqueda de atajos o palabras en la busqueda
	FilterTypeLista filterTypeLista=FilterTypeLista.FilterNormal;*/
	/*variables del paginado*/
	int pagina=0,limit=0;
	List<SubFamilia>listaSubFamilia=new ArrayList<SubFamilia>();
	List<String>listaQuery=new ArrayList<String>();
	public String getChrCodigoFamilia() {
		return chrCodigoFamilia;
	}
	public ProductoRequets setChrCodigoFamilia(String chrCodigoFamilia) {
		this.chrCodigoFamilia = chrCodigoFamilia;
		return this;
	}
	public String getVchDescripcion() {
		return vchDescripcion;
	}
	public ProductoRequets setVchDescripcion(String vchDescripcion) {
		this.vchDescripcion = vchDescripcion;
		return this;
	}
	public String getChrCodigoProducto() {
		return chrCodigoProducto;
	}
	public ProductoRequets setChrCodigoProducto(String chrCodigoProducto) {
		this.chrCodigoProducto = chrCodigoProducto;
		return this;
	}
	public FilterProducto getFilterProducto() {
		return filterProducto;
	}
	public ProductoRequets setFilterProducto(FilterProducto filterProducto) {
		this.filterProducto = filterProducto;
		return this;
	}
	public int getPagina() {
		return pagina;
	}
	public ProductoRequets setPagina(int pagina) {
		this.pagina = pagina;
		return this;
	}
	public int getLimit() {
		return limit;
	}
	public ProductoRequets setLimit(int limit) {
		this.limit = limit;
		return this;
	}
	
	
	public List<SubFamilia> getListaSubFamilia() {
		return listaSubFamilia;
	}
	public ProductoRequets setListaSubFamilia(List<SubFamilia> listaSubFamilia) {
		this.listaSubFamilia = listaSubFamilia;
		return this;
	}
	
	
	public FilterSubFamilia getFilterSubFamilia() {
		return filterSubFamilia;
	}
	public ProductoRequets setFilterSubFamilia(FilterSubFamilia filterSubFamilia) {
		this.filterSubFamilia = filterSubFamilia;
		return this;
	}
	public FilterOrderBy getFilterOrder() {
		return filterOrder;
	}
	public ProductoRequets setFilterOrder(FilterOrderBy filterOrder) {
		this.filterOrder = filterOrder;
		return this;
	}	
 
	
	public List<String> getListaQuery() {
		return listaQuery;
	}
	public void setListaQuery(List<String> listaQuery) {
		this.listaQuery = listaQuery;
	}
	@Override
	public String toString() {
		return "ProductoRequets [chrCodigoProducto=" + chrCodigoProducto + ", chrCodigoFamilia=" + chrCodigoFamilia
				+ ", vchDescripcion=" + vchDescripcion + ", filterProducto=" + filterProducto + ", filterSubFamilia="
				+ filterSubFamilia + ", filterOrder=" + filterOrder + ", pagina=" + pagina + ", limit=" + limit
				+ ", listaSubFamilia=" + listaSubFamilia.size() + "]";
	}
	
}
