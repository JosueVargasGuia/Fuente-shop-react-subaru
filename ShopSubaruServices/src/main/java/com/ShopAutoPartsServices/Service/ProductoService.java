package com.ShopAutoPartsServices.Service;

import java.util.List;

import com.ShopAutoPartsServices.Domain.Caracteristica;
import com.ShopAutoPartsServices.Domain.Familia;
import com.ShopAutoPartsServices.Domain.ImagenProductoReporte;
import com.ShopAutoPartsServices.Domain.Producto;
import com.ShopAutoPartsServices.Domain.ProductoCaracteristica;
import com.ShopAutoPartsServices.Domain.ProductoImagen;
import com.ShopAutoPartsServices.Domain.ProductoOnlineCategoria;
import com.ShopAutoPartsServices.Domain.ProductoOutlet;
import com.ShopAutoPartsServices.Domain.ProductoOutletVigencia;
import com.ShopAutoPartsServices.Domain.ProductoRequets;
import com.ShopAutoPartsServices.Domain.ProductoStock;
import com.ShopAutoPartsServices.Domain.SubFamilia;
import com.ShopAutoPartsServices.Domain.SubirImagen;
import com.ShopAutoPartsServices.Domain.Vigencia;

 
public interface ProductoService  {

	List<Producto> listarProductos(ProductoRequets productoRequets)throws Exception;

	SubirImagen subirImagenProducto(SubirImagen subirImagen)throws Exception;

	List<SubFamilia> listarSubfamilia(Familia familiaRequest)throws Exception;

	List<ProductoImagen> listarProductoImagen(ProductoImagen productoImagen)throws Exception;

	ProductoImagen subirImagenProducto(ProductoImagen productoImagen)throws Exception;

	List<Caracteristica> listarAtributos()throws Exception;

	List<ProductoCaracteristica> listarProductoAtributo(ProductoImagen productoImagen)throws Exception;

	ProductoOnlineCategoria listarProductoOnlineCategoria(ProductoImagen productoImagen)throws Exception;

	ProductoCaracteristica grabarProductoAtributo(ProductoCaracteristica productoCaracteristica)throws Exception;

	ProductoOnlineCategoria grabarProductoCategoria(ProductoOnlineCategoria productoOnlineCategoria)throws Exception;

	List<ImagenProductoReporte> listarProductoCategoria(ImagenProductoReporte imagenProductoReporte)throws Exception;

	List<ProductoStock> listarProductoStock(List<ProductoStock> listaStock)throws Exception;

	void actualizarProductoStock(List<ProductoStock> listaStock)throws Exception;

	Vigencia obtenerVigencia()throws Exception;

	List<ProductoOutletVigencia> listarProductoOutletVigencia()throws Exception;

	ProductoOutletVigencia saveProductoOutletVigencia(ProductoOutletVigencia productoOutletVigencia)throws Exception;

	List<ProductoOutlet> listaProductosOutlet(ProductoOutlet productoOutlet)throws Exception;

	ProductoOutletVigencia obtenerVigenciaXCodigo(ProductoOutlet productoOutlet)throws Exception;

	String saveProductoOutlet(ProductoOutlet productoOutlet)throws Exception;

	ProductoOutlet updateProductoOutlet(ProductoOutlet outletRequets)throws Exception;

	List<Producto> listarProductoFindCodigoDesc(ProductoImagen productoImagen)throws Exception;

	 
}
