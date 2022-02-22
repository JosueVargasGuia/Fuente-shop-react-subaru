package com.ShopAutoPartsServices.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
import com.ShopAutoPartsServices.Repository.ProductoServiceRepository;
import com.ShopAutoPartsServices.Service.ProductoService;
@Service
public class ProductoServiceImpl implements ProductoService {
	@Autowired
	ProductoServiceRepository productoServiceRepository;
	@Override
	public List<Producto> listarProductos(ProductoRequets productoRequets) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarProductos(  productoRequets);
	}
	@Override
	public SubirImagen subirImagenProducto(SubirImagen subirImagen) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.subirImagenProducto(  subirImagen);
	}
	@Override
	public List<SubFamilia> listarSubfamilia(Familia familiaRequest) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarSubfamilia(familiaRequest);
	}
	@Override
	public List<ProductoImagen> listarProductoImagen(ProductoImagen productoRequets) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarProductoImagen(productoRequets) ;
	}
	@Override
	public ProductoImagen subirImagenProducto(ProductoImagen productoImagen) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.subirImagenProducto(productoImagen);
	}
	@Override
	public List<Caracteristica> listarAtributos() throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarAtributos();
	}
	@Override
	public List<ProductoCaracteristica> listarProductoAtributo(ProductoImagen productoImagen) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarProductoAtributo(productoImagen);
	}
	@Override
	public ProductoOnlineCategoria listarProductoOnlineCategoria(ProductoImagen productoImagen) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarProductoOnlineCategoria(productoImagen);
	}
	@Override
	public ProductoCaracteristica grabarProductoAtributo(ProductoCaracteristica productoCaracteristica)
			throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.grabarProductoAtributo(productoCaracteristica);
	}
	@Override
	public ProductoOnlineCategoria grabarProductoCategoria(ProductoOnlineCategoria productoOnlineCategoria)throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.grabarProductoCategoria(productoOnlineCategoria);
	}
	@Override
	public List<ImagenProductoReporte> listarProductoCategoria(ImagenProductoReporte imagenProductoReporte)
			throws Exception {
		return productoServiceRepository.listarProductoCategoria(imagenProductoReporte);
	}
	@Override
	public List<ProductoStock> listarProductoStock(List<ProductoStock> listaStock) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarProductoStock(listaStock);
	}
	@Override
	public void actualizarProductoStock(List<ProductoStock> listaStock) throws Exception {
		productoServiceRepository.actualizarProductoStock(listaStock);
		
	}
	@Override
	public Vigencia obtenerVigencia() throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.obtenerVigencia();
	}
	@Override
	public List<ProductoOutletVigencia> listarProductoOutletVigencia() throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listarProductoOutletVigencia();
	}
	@Override
	public ProductoOutletVigencia saveProductoOutletVigencia(ProductoOutletVigencia productoOutletVigencia) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.saveProductoOutletVigencia(productoOutletVigencia);
	}
	@Override
	public List<ProductoOutlet> listaProductosOutlet(ProductoOutlet productoOutlet) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.listaProductosOutlet(productoOutlet);
	}
	@Override
	public ProductoOutletVigencia obtenerVigenciaXCodigo(ProductoOutlet productoOutlet) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.obtenerVigenciaXCodigo(productoOutlet);
	}
	@Override
	public String saveProductoOutlet(ProductoOutlet productoOutlet) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.saveProductoOutlet(productoOutlet);
	}
	@Override
	public ProductoOutlet updateProductoOutlet(ProductoOutlet outletRequets) throws Exception {
		// TODO Auto-generated method stub
		return productoServiceRepository.updateProductoOutlet(outletRequets);
	}
	 

}
