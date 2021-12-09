package com.ShopAutoPartsServices.Service;

import java.util.List;

import com.ShopAutoPartsServices.Domain.Caracteristica;
import com.ShopAutoPartsServices.Domain.Familia;
import com.ShopAutoPartsServices.Domain.ImagenProductoReporte;
import com.ShopAutoPartsServices.Domain.Producto;
import com.ShopAutoPartsServices.Domain.ProductoCaracteristica;
import com.ShopAutoPartsServices.Domain.ProductoImagen;
import com.ShopAutoPartsServices.Domain.ProductoOnlineCategoria;
import com.ShopAutoPartsServices.Domain.ProductoRequets;
import com.ShopAutoPartsServices.Domain.ProductoStock;
import com.ShopAutoPartsServices.Domain.SubFamilia;
import com.ShopAutoPartsServices.Domain.SubirImagen;

 
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

	 
}
