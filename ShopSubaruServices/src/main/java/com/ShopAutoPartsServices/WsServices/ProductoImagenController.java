package com.ShopAutoPartsServices.WsServices;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ShopAutoPartsServices.Domain.AtributoResponse;
import com.ShopAutoPartsServices.Domain.Familia;
import com.ShopAutoPartsServices.Domain.ImagenProductoReporte;
import com.ShopAutoPartsServices.Domain.ImagenProductoReporteResponse;
import com.ShopAutoPartsServices.Domain.Producto;
import com.ShopAutoPartsServices.Domain.ProductoAtributoResponse;
import com.ShopAutoPartsServices.Domain.ProductoCaracteristica;
import com.ShopAutoPartsServices.Domain.ProductoImagen;
import com.ShopAutoPartsServices.Domain.ProductoImagenResponse;
import com.ShopAutoPartsServices.Domain.ProductoOnlineCategoria;
import com.ShopAutoPartsServices.Domain.ProductoOnlineCategoriaResponse;
import com.ShopAutoPartsServices.Domain.ProductoRequets;
import com.ShopAutoPartsServices.Domain.ProductoStock;
import com.ShopAutoPartsServices.Domain.ProductoStockResponse;
import com.ShopAutoPartsServices.Domain.SubirImagen;
import com.ShopAutoPartsServices.Enums.FilterProducto;
import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;
import com.ShopAutoPartsServices.Service.ProductoService;

@RestController
@RequestMapping("service/productoImagen")
public class ProductoImagenController {
	Logger logger = LoggerFactory.getLogger(ProductoController.class);
	@Autowired
	ProductoService productoService;

	@PostMapping(value = "/listaImangen", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoImagenResponse> listarProductoImagen(@RequestBody ProductoImagen productoImagen) {
		ProductoImagenResponse productoResponse = new ProductoImagenResponse();
		ResponseEntity<ProductoImagenResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		//logger.info(productoImagen.toString());
		try {
			productoResponse.setLista(productoService.listarProductoImagen(productoImagen));
			ProductoRequets producto = new ProductoRequets();
			producto.setChrCodigoProducto(productoImagen.getChrCodigoProducto());
			producto.setFilterProducto(FilterProducto.FILTER_CODIGO);
			producto.setListaSubFamilia(productoService.listarSubfamilia(new Familia()));
			producto.setPagina(1);
			producto.setLimit(1);
			List<Producto> lista = productoService.listarProductos(producto);
			if (lista.size() >= 1) {
				productoResponse.setProducto(lista.get(0));
			}
			productoResponse.setProductoOnlineCategoria(productoService.listarProductoOnlineCategoria(productoImagen));
			productoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(new ArrayList<String>())
					.setError(error);
			responseEntity = new ResponseEntity<ProductoImagenResponse>(productoResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			productoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoImagenResponse>(productoResponse, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/subirImagen", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoImagen> subirProductoImagen(@RequestBody ProductoImagen productoImagen) {
		ResponseEntity<ProductoImagen> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			productoImagen = productoService.subirImagenProducto(productoImagen);
			productoImagen.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<ProductoImagen>(productoImagen, HttpStatus.OK);
			//logger.info("Finaliza:" + productoImagen.toString());
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			productoImagen.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(new ArrayList<String>())
					.getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoImagen>(productoImagen, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/listaAtributo", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<AtributoResponse> listarAtributo() {
		AtributoResponse atributoResponse = new AtributoResponse();
		ResponseEntity<AtributoResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			atributoResponse.setLista(productoService.listarAtributos());
			atributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(new ArrayList<String>())
					.setError(error);
			responseEntity = new ResponseEntity<AtributoResponse>(atributoResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			atributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<AtributoResponse>(atributoResponse, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/listaProductoReporte", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ImagenProductoReporteResponse> listaProductoReporte(
			@RequestBody ImagenProductoReporte imagenProductoReporte) {
		ImagenProductoReporteResponse atributoResponse = new ImagenProductoReporteResponse();
		ResponseEntity<ImagenProductoReporteResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		//logger.info(imagenProductoReporte.toString());
		try {
			atributoResponse.setLista(productoService.listarProductoCategoria(imagenProductoReporte));
			atributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(new ArrayList<String>())
					.setError(error);
			responseEntity = new ResponseEntity<ImagenProductoReporteResponse>(atributoResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			atributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ImagenProductoReporteResponse>(atributoResponse,
					HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/listaProductoAtributo", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoAtributoResponse> listarProductoAtributo(@RequestBody ProductoImagen productoImagen) {
		ProductoAtributoResponse productoAtributoResponse = new ProductoAtributoResponse();
		ResponseEntity<ProductoAtributoResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			productoAtributoResponse.setLista(productoService.listarProductoAtributo(productoImagen));
			productoAtributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK)
					.setError(new ArrayList<String>()).setError(error);
			responseEntity = new ResponseEntity<ProductoAtributoResponse>(productoAtributoResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			productoAtributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoAtributoResponse>(productoAtributoResponse,
					HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/productoAtributo", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoAtributoResponse> grabarProductoAtributo(
			@RequestBody ProductoCaracteristica productoCaracteristica) {
		ProductoAtributoResponse productoAtributoResponse = new ProductoAtributoResponse();
		ResponseEntity<ProductoAtributoResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		//logger.info(productoCaracteristica.toString());
		try {
			productoCaracteristica = productoService.grabarProductoAtributo(productoCaracteristica);
			productoAtributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK)
					.setError(new ArrayList<String>()).setError(error);
			responseEntity = new ResponseEntity<ProductoAtributoResponse>(productoAtributoResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			productoAtributoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoAtributoResponse>(productoAtributoResponse,
					HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/productoCategoria", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoOnlineCategoriaResponse> grabarProductoCategoria(
			@RequestBody ProductoOnlineCategoria productoOnlineCategoria) {
		ProductoOnlineCategoriaResponse productoOnlineCategoriaResponse = new ProductoOnlineCategoriaResponse();
		ResponseEntity<ProductoOnlineCategoriaResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		//logger.info(productoOnlineCategoria.toString());
		try {
			productoOnlineCategoria = productoService.grabarProductoCategoria(productoOnlineCategoria);
			productoOnlineCategoriaResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK)
					.setError(new ArrayList<String>()).setError(error);
			responseEntity = new ResponseEntity<ProductoOnlineCategoriaResponse>(productoOnlineCategoriaResponse,
					HttpStatus.OK);
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			productoOnlineCategoriaResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoOnlineCategoriaResponse>(productoOnlineCategoriaResponse,
					HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}
/*
	@PostMapping(value = "/listaProductosStock", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoStockResponse> listaProductosStock(
			@RequestBody ProductoStockResponse _stockResponse) {
		ProductoStockResponse stockRequets = new ProductoStockResponse();
		ResponseEntity<ProductoStockResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			
			stockRequets.setListaStock(productoService.listarProductoStock(_stockResponse.getListaStock()));
			stockRequets.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(new ArrayList<String>())
					.setError(error);
			responseEntity = new ResponseEntity<ProductoStockResponse>(stockRequets, HttpStatus.OK);
			
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			stockRequets.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(new ArrayList<String>())
					.getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoStockResponse>(stockRequets, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

	@PostMapping(value = "/actualizarProductosStock", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoStockResponse> actualizarProductosStock(
			@RequestBody ProductoStockResponse _stockResponse) {
		ProductoStockResponse stockRequets = new ProductoStockResponse();
		ResponseEntity<ProductoStockResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			productoService.actualizarProductoStock(_stockResponse.getListaStock());
			stockRequets.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(new ArrayList<String>())
					.setError(error);
			responseEntity = new ResponseEntity<ProductoStockResponse>(stockRequets, HttpStatus.OK);			
		} catch (Exception e) {
			logger.info(e.getMessage());
			e.printStackTrace();
			stockRequets.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).setError(new ArrayList<String>())
					.getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoStockResponse>(stockRequets, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}*/
}
