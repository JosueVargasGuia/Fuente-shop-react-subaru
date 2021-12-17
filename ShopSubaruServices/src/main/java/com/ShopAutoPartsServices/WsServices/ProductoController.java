package com.ShopAutoPartsServices.WsServices;

import java.util.ArrayList;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ShopAutoPartsServices.Domain.Familia;
import com.ShopAutoPartsServices.Domain.Producto;
import com.ShopAutoPartsServices.Domain.ProductoRequets;
import com.ShopAutoPartsServices.Domain.ProductoResponse;
import com.ShopAutoPartsServices.Domain.Response;
import com.ShopAutoPartsServices.Domain.SubFamilia;
import com.ShopAutoPartsServices.Domain.SubFamiliaResponse;
import com.ShopAutoPartsServices.Domain.SubirImagen;
import com.ShopAutoPartsServices.Enums.FilterOrderBy;
import com.ShopAutoPartsServices.Enums.FilterProducto;
import com.ShopAutoPartsServices.Enums.FilterSubFamilia;
import com.ShopAutoPartsServices.Enums.SUCCESS_SERVER;
import com.ShopAutoPartsServices.Service.ProductoService;

@RestController
@RequestMapping("service/producto")
public class ProductoController {
	Logger logger = LoggerFactory.getLogger(ProductoController.class);
	@Autowired
	ProductoService productoService;

	@PostMapping(value = "/lista", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<ProductoResponse> listarProductos(@RequestBody ProductoRequets productoRequets) {

		ProductoResponse productoResponse = new ProductoResponse();
		ResponseEntity<ProductoResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();

		try {
			boolean boolvalida = true;
			if (productoRequets.getFilterOrder() != FilterOrderBy.FilterOutlet) {
				if (productoRequets.getFilterSubFamilia() == FilterSubFamilia.FILTER_SUBFAMILIA_ALL) {
					productoRequets.setListaSubFamilia(productoService.listarSubfamilia(new Familia()));
				}
				if (productoRequets.getFilterSubFamilia() == FilterSubFamilia.FILTER_SUBFAMILIA_LIST) {
					if (productoRequets.getListaSubFamilia().size() <= 0) {
						productoRequets.setListaSubFamilia(
								productoService.listarSubfamilia(new Familia(productoRequets.getChrCodigoFamilia())));
					}
				}
			}
			if (productoRequets.getFilterOrder() == FilterOrderBy.FilterOutlet) {
				productoResponse.setVigencia(productoService.obtenerVigencia());
			}
			if (boolvalida) {
				productoResponse.setListaProductos(productoService.listarProductos(productoRequets));
				productoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
				responseEntity = new ResponseEntity<ProductoResponse>(productoResponse, HttpStatus.OK);
			} else {
				productoResponse.setListaProductos(new ArrayList<>());
				productoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_INFO).setError(error);
				responseEntity = new ResponseEntity<ProductoResponse>(productoResponse, HttpStatus.OK);
			}
			logger.info("Size:" + productoResponse.getListaProductos().size() + " " + productoRequets.toString());
		} catch (Exception e) {
			logger.info(productoRequets.toString());
			logger.info(e.getMessage());
			e.printStackTrace();
			productoResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<ProductoResponse>(productoResponse, HttpStatus.BAD_REQUEST);
		}

		return responseEntity;
	}

	/*
	 * @PostMapping(value = "/subirImagen", consumes =
	 * MediaType.APPLICATION_JSON_VALUE, produces =
	 * MediaType.APPLICATION_JSON_VALUE) public ResponseEntity<SubirImagen>
	 * listarProductos(@RequestBody SubirImagen subirImagen) {
	 * ResponseEntity<SubirImagen> responseEntity = null; List<String> error = new
	 * ArrayList<String>(); try { subirImagen =
	 * productoService.subirImagenProducto(subirImagen);
	 * subirImagen.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError
	 * (error); responseEntity = new ResponseEntity<SubirImagen>(subirImagen,
	 * HttpStatus.OK); logger.info("Finaliza:" + subirImagen.toString()); } catch
	 * (Exception e) { logger.info(e.getMessage()); e.printStackTrace();
	 * subirImagen.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR).
	 * setError(new ArrayList<String>()) .getError().add(e.getMessage());
	 * responseEntity = new ResponseEntity<SubirImagen>(subirImagen,
	 * HttpStatus.BAD_REQUEST); } return responseEntity; }
	 */
	@PostMapping(value = "/listaSubfamilia", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<SubFamiliaResponse> listarSubfamilia(@RequestBody Familia familiaRequest) {

		SubFamiliaResponse familiaResponse = new SubFamiliaResponse();
		ResponseEntity<SubFamiliaResponse> responseEntity = null;
		List<String> error = new ArrayList<String>();
		try {
			familiaResponse.setLista(productoService.listarSubfamilia(familiaRequest));
			familiaResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_OK).setError(error);
			responseEntity = new ResponseEntity<SubFamiliaResponse>(familiaResponse, HttpStatus.OK);
		} catch (Exception e) {
			logger.info(familiaRequest.toString());
			logger.info(e.getMessage());
			e.printStackTrace();
			familiaResponse.getResponse().setStatus(SUCCESS_SERVER.SUCCES_SERVER_ERROR)
					.setError(new ArrayList<String>()).getError().add(e.getMessage());
			responseEntity = new ResponseEntity<SubFamiliaResponse>(familiaResponse, HttpStatus.BAD_REQUEST);
		}
		return responseEntity;
	}

}
