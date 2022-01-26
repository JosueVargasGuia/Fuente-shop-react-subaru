package com.ShopAutoPartsServices.Repository.Impl;

import java.io.ByteArrayInputStream;
import java.math.RoundingMode;
import java.sql.Blob;
import java.sql.CallableStatement;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
 
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.CallableStatementCallback;
import org.springframework.jdbc.core.JdbcTemplate;
 
import org.springframework.stereotype.Repository;

import com.ShopAutoPartsServices.Domain.Caracteristica;
import com.ShopAutoPartsServices.Domain.Familia;
import com.ShopAutoPartsServices.Domain.ImagenProductoReporte;
import com.ShopAutoPartsServices.Domain.Producto;
import com.ShopAutoPartsServices.Domain.ProductoCaracteristica;
import com.ShopAutoPartsServices.Domain.ProductoDetalle;
import com.ShopAutoPartsServices.Domain.ProductoImagen;
import com.ShopAutoPartsServices.Domain.ProductoOnlineCategoria;
import com.ShopAutoPartsServices.Domain.ProductoOutlet;
import com.ShopAutoPartsServices.Domain.ProductoOutletVigencia;
import com.ShopAutoPartsServices.Domain.ProductoRequets;
import com.ShopAutoPartsServices.Domain.ProductoStock;
import com.ShopAutoPartsServices.Domain.SubFamilia;
import com.ShopAutoPartsServices.Domain.SubirImagen;
import com.ShopAutoPartsServices.Domain.Vigencia;
import com.ShopAutoPartsServices.Enums.FilterProducto;
import com.ShopAutoPartsServices.Repository.ProductoServiceRepository;
 
import org.yaml.snakeyaml.external.biz.base64Coder.Base64Coder;
import oracle.jdbc.OracleTypes;
 

@Repository
public class ProductoServiceRepositoryImpl implements ProductoServiceRepository {
	final private String PKG_TIENDA = "PKG_TIENDA";
	final private String imageNoDisponible = "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";
	Logger logger = LoggerFactory.getLogger(ProductoServiceRepositoryImpl.class);
	@Autowired
	JdbcTemplate jdbcTemplate;

	@Override
	public List<Producto> listarProductos(ProductoRequets productoRequets) throws Exception {
		StringBuilder builder = new StringBuilder();
		builder.append("<lista>");
		for (SubFamilia subFamilia : productoRequets.getListaSubFamilia()) {
			builder.append("<SubFamilia>");
			builder.append("<chrCodigoSubFamilia>").append(subFamilia.getChrCodigoSubFamilia())
					.append("</chrCodigoSubFamilia>");
			builder.append("</SubFamilia>");
		}
		builder.append("</lista>");

		CallableStatementCallback<List<Producto>> callback = null;
		try {
			callback = new CallableStatementCallback<List<Producto>>() {
				@Override
				public List<Producto> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<Producto> productos = new ArrayList<Producto>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2,
							(productoRequets.getChrCodigoFamilia() != null ? productoRequets.getChrCodigoFamilia()
									: null));
					cs.setString(3,
							(productoRequets.getVchDescripcion() != null ? productoRequets.getVchDescripcion() : null));
					cs.setString(4,
							(productoRequets.getChrCodigoProducto() != null ? productoRequets.getChrCodigoProducto()
									: null));
					cs.setInt(5, productoRequets.getPagina());
					cs.setInt(6, productoRequets.getLimit());
					cs.setString(7, productoRequets.getFilterProducto().toString());
					cs.setString(8, builder.toString());
					cs.setString(9, productoRequets.getFilterOrder().toString());

					
					 /*logger.info("I_CHRCODIGOFAMILIA:"+productoRequets.getChrCodigoFamilia(
					  ) +" I_VCHDESCRIPCION:"+productoRequets.getVchDescripcion()
					  +" I_CHRCODIGOPRODUCTO:"+productoRequets.getChrCodigoProducto()
					  +" I_PAGE:"+productoRequets.getPagina()
					  +" I_LIMIT:"+productoRequets.getLimit()
					  +" I_FILTERPRODUCTO:"+productoRequets.getFilterProducto().toString()
					  +" I_FILTERSUBFAMILIA_LIST:"+builder.toString()
					  +" I_FILTER_ORDER:"+productoRequets.getFilterOrder().toString());*/
					 
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ProductoImagen imagenDefault = new ProductoImagen();
						Producto producto = new Producto();
						producto.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						producto.setNumValorVentaDolar(rs.getString("NUMVALORVENTADOLAR"));
						producto.setNumValorVentaSoles(rs.getString("NUMVALORVENTASOLES"));
						producto.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						producto.setVchDescripcionSmall(rs.getString("VCHDESCRIPCIONSMALL"));
						producto.setNumStock(rs.getInt("NUMSTOCK"));
						producto.setTotalRegistros(rs.getInt("TOTALREGISTROS"));
						producto.setFamilia(new Familia()).getFamilia()
								.setChrCodigoFamilia(rs.getString("CHRCODIGOFAMILIA"))
								.setVchDescripcion(rs.getString("VCHDESCRIPCIONFAMILIA"));
						producto.setNumOutlet(rs.getInt("NUMOUTLET"));
						producto.setNumValorVentaRefDolar(rs.getString("NUMVALORVENTAREFDOLAR"));
						producto.setNumValorVentaRefSoles(rs.getString("NUMVALORVENTAREFSOLES"));
						producto.setNumValorDesc(rs.getString("NUMVALORDESC"));
						
						imagenDefault.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						imagenDefault.setChrNombre(rs.getString("CHRNOMBRE"));

						Blob imageBlob = rs.getBlob("CHRSRCIMAGEN");
						if (imageBlob != null) {
							byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
							imagenDefault.setChrSrcImagen(Base64Coder.encodeLines(imageBytes) + "");
						} else {
							imagenDefault.setChrSrcImagen(imageNoDisponible);
						}
						imagenDefault.setChrType(rs.getString("CHRTYPE"));

						producto.setImagenDefault(imagenDefault);
						if (productoRequets.getFilterProducto() == FilterProducto.FILTER_CODIGO) {
							try {
								List<ProductoImagen> lista = listarProductosImagenes(productoRequets);
								if (lista.size() <= 0) {
									ProductoImagen productoImagen = new ProductoImagen();
									productoImagen.setChrSrcImagen(imageNoDisponible);
									productoImagen.setChrCodigoProducto(producto.getChrCodigoProducto());
									productoImagen.setChrNombre("Sin Nombre");
									productoImagen.setChrType("png");
									lista.add(productoImagen);
								}
								producto.setListaProductoImagen(lista);

							} catch (Exception e) {
								e.printStackTrace();
								throw new SQLException(e);
							}
							try {
								producto.setListaProductoDetalle(listarProductosDetalle(productoRequets));
							} catch (Exception e) {
								e.printStackTrace();
								throw new SQLException(e);
							}
						}
						productos.add(producto);
					}
					
					cs.close();
					rs.close();
					return productos;
				}
			};
		} catch (Exception e) {
			logger.info("STORE --LISTA_PRODUCTOS");
			logger.info("I_CHRCODIGOFAMILIA:"+productoRequets.getChrCodigoFamilia(
					  ) +" I_VCHDESCRIPCION:"+productoRequets.getVchDescripcion()
					  +" I_CHRCODIGOPRODUCTO:"+productoRequets.getChrCodigoProducto()
					  +" I_PAGE:"+productoRequets.getPagina()
					  +" I_LIMIT:"+productoRequets.getLimit()
					  +" I_FILTERPRODUCTO:"+productoRequets.getFilterProducto().toString()
					  +" I_FILTERSUBFAMILIA_LIST:"+builder.toString()
					  +" I_FILTER_ORDER:"+productoRequets.getFilterOrder().toString()); 
					 
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PRODUCTOS(?,?,?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);

	}

	@Override
	public List<ProductoDetalle> listarProductosDetalle(ProductoRequets productoRequets) throws Exception {
		CallableStatementCallback<List<ProductoDetalle>> callback = null;
		try {
			callback = new CallableStatementCallback<List<ProductoDetalle>>() {
				@Override
				public List<ProductoDetalle> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ProductoDetalle> productosDetalles = new ArrayList<ProductoDetalle>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, productoRequets.getChrCodigoProducto());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ProductoDetalle detalle = new ProductoDetalle();
						detalle.setDescripcion(rs.getNString("DESCRIPCION")).setTitulo(rs.getString("TITUTLO"));
						detalle.setRowTipo(rs.getInt("ROWTIPO"));
						productosDetalles.add(detalle);
					}
					return productosDetalles;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PRODUC_DET(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ProductoImagen> listarProductosImagenes(ProductoRequets productoRequets) throws Exception {
		CallableStatementCallback<List<ProductoImagen>> callback = null;
		try {
			callback = new CallableStatementCallback<List<ProductoImagen>>() {
				@Override
				public List<ProductoImagen> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ProductoImagen> productosDetalles = new ArrayList<ProductoImagen>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, productoRequets.getChrCodigoProducto());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ProductoImagen productoImagen = new ProductoImagen();
						Blob imageBlob = rs.getBlob("CHRSRCIMAGEN");
						if (imageBlob != null) {
							byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
							productoImagen.setChrSrcImagen(Base64Coder.encodeLines(imageBytes) + "");
							productoImagen.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
							productoImagen.setChrNombre(rs.getString("CHRNOMBRE"));
							productoImagen.setChrType(rs.getString("CHRTYPE"));
							productosDetalles.add(productoImagen);
						}
					}
					return productosDetalles;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PRODUCTO_IMAGENES(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public SubirImagen subirImagenProducto(SubirImagen subirImagen) throws Exception {
		/*
		 * CallableStatementCallback<SubirImagen> callback = null; try { callback = new
		 * CallableStatementCallback<SubirImagen>() {
		 * 
		 * @Override public SubirImagen doInCallableStatement(CallableStatement cs)
		 * throws SQLException, DataAccessException { byte[] bytes =
		 * Base64Coder.decode(subirImagen.getFileByteBase64()); ByteArrayInputStream
		 * bais = new ByteArrayInputStream(bytes); cs.setString(1,
		 * subirImagen.getChrCodigoProducto()); cs.setBinaryStream(2, bais,
		 * bytes.length); cs.execute(); return subirImagen; } }; } catch (Exception e) {
		 * e.printStackTrace(); throw new Exception(e); } String sql = "{call " +
		 * PKG_TIENDA + ".REGISTRAR_IMAGENPRODUCTO(?,?)}"; return
		 * jdbcTemplate.execute(sql, callback);
		 */
		return null;
	}

	@Override
	public List<SubFamilia> listarSubfamilia(Familia familiaRequest) throws Exception {
		CallableStatementCallback<List<SubFamilia>> callback = null;
		try {
			callback = new CallableStatementCallback<List<SubFamilia>>() {
				@Override
				public List<SubFamilia> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<SubFamilia> listaSubFamilias = new ArrayList<SubFamilia>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, familiaRequest.getChrCodigoFamilia());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						SubFamilia subFamilia = new SubFamilia();
						subFamilia.setChrCodigoSubFamilia(rs.getString("CHRCODIGOSUBFAMILIA"));
						subFamilia.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						subFamilia.setChrCodigoFamilia(rs.getString("CHRCODIGOFAMILIA"));
						listaSubFamilias.add(subFamilia);
					}
					return listaSubFamilias;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_SUBFAMILIA(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ProductoImagen> listarProductoImagen(ProductoImagen productoImagen) throws Exception {
		CallableStatementCallback<List<ProductoImagen>> callback = null;
		try {
			callback = new CallableStatementCallback<List<ProductoImagen>>() {
				@Override
				public List<ProductoImagen> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ProductoImagen> listaProductoImagen = new ArrayList<ProductoImagen>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, productoImagen.getChrCodigoProducto());
					cs.setInt(3, productoImagen.getNumCodigoProductoImagen());
					cs.setString(4, productoImagen.getFilter().toString());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ProductoImagen productoImagen = new ProductoImagen();
						productoImagen.setNumCodigoProductoImagen(rs.getInt("NUMCODIGOPRODUCTOIMAGEN"));
						productoImagen.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						productoImagen.setChrNombre(rs.getString("CHRNOMBRE"));
						productoImagen.setChrPredeterminado(rs.getString("CHRPREDETERMINADO"));
						productoImagen.setChrType(rs.getString("CHRTYPE"));
						if (rs.getBlob("CHRSRCIMAGEN") != null) {
							Blob imageBlob = rs.getBlob("CHRSRCIMAGEN");
							byte[] imageBytes = imageBlob.getBytes(1, (int) imageBlob.length());
							productoImagen.setChrSrcImagen(Base64Coder.encodeLines(imageBytes) + "");
						}
						listaProductoImagen.add(productoImagen);
					}
					return listaProductoImagen;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PROD_IMAGEN(?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ProductoImagen subirImagenProducto(ProductoImagen productoImagen) throws Exception {
		CallableStatementCallback<ProductoImagen> callback = null;
		try {
			callback = new CallableStatementCallback<ProductoImagen>() {
				@Override
				public ProductoImagen doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					byte[] bytes = Base64Coder.decode(productoImagen.getChrSrcImagen());
					ByteArrayInputStream bais = new ByteArrayInputStream(bytes);
					cs.setInt(1, productoImagen.getNumCodigoProductoImagen());
					cs.setString(2, productoImagen.getChrCodigoProducto());
					cs.setBinaryStream(3, bais, bytes.length);
					cs.setString(4, productoImagen.getChrNombre());
					cs.setString(5, productoImagen.getChrType());
					cs.setString(6, productoImagen.getChrPredeterminado());
					cs.setString(7, productoImagen.getCrud().getDescripcion());
					cs.execute();
					return productoImagen;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_IMAGENPRODUCTO(?,?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<Caracteristica> listarAtributos() throws Exception {
		CallableStatementCallback<List<Caracteristica>> callback = null;
		try {
			callback = new CallableStatementCallback<List<Caracteristica>>() {
				@Override
				public List<Caracteristica> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<Caracteristica> listaProductoImagen = new ArrayList<Caracteristica>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						Caracteristica caracteristica = new Caracteristica();
						caracteristica.setChrDescripcion(rs.getString("CHRDESCRIPCION"));
						caracteristica.setNumCodigoCaracteristica(rs.getInt("NUMCODIGOCARACTERISTICA"));
						caracteristica.setNumPosicion(rs.getInt("NUMPOSICION"));
						listaProductoImagen.add(caracteristica);
					}
					return listaProductoImagen;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_CARACTERISTICA()}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ProductoCaracteristica> listarProductoAtributo(ProductoImagen productoImagen) throws Exception {
		CallableStatementCallback<List<ProductoCaracteristica>> callback = null;
		try {
			callback = new CallableStatementCallback<List<ProductoCaracteristica>>() {
				@Override
				public List<ProductoCaracteristica> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ProductoCaracteristica> listaProductoImagen = new ArrayList<ProductoCaracteristica>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, productoImagen.getChrCodigoProducto());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ProductoCaracteristica productoCaracteristica = new ProductoCaracteristica();
						Caracteristica caracteristica = new Caracteristica();
						caracteristica.setChrDescripcion(rs.getString("CHRDESCRIPCION"));
						caracteristica.setNumCodigoCaracteristica(rs.getInt("NUMCODIGOCARACTERISTICA"));
						productoCaracteristica.setCaracteristica(caracteristica);
						productoCaracteristica.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						productoCaracteristica.setNumCodProdCaracteristica(rs.getInt("NUMCODPRODCARACTERISTICA"));
						productoCaracteristica.setChrValue(rs.getString("CHRVALUE"));
						listaProductoImagen.add(productoCaracteristica);
					}
					return listaProductoImagen;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_CARACTERISTICA_PRODUCTO(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ProductoOnlineCategoria listarProductoOnlineCategoria(ProductoImagen productoImagen) throws Exception {
		CallableStatementCallback<ProductoOnlineCategoria> callback = null;
		try {
			callback = new CallableStatementCallback<ProductoOnlineCategoria>() {
				@Override
				public ProductoOnlineCategoria doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					ProductoOnlineCategoria productoCaracteristica = new ProductoOnlineCategoria();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, productoImagen.getChrCodigoProducto());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						productoCaracteristica.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						productoCaracteristica.setChrRemate(rs.getString("CHRREMATE"));
						productoCaracteristica.setChrDestacadoMarca(rs.getString("CHRDESTACADOMARCA"));
						productoCaracteristica.setChrOferta(rs.getString("CHROFERTA"));
						productoCaracteristica.setChrRecomendado(rs.getString("CHRRECOMENDADO"));
						productoCaracteristica.setChrDestacado(rs.getString("CHRDESTACADO"));
						productoCaracteristica.setNumCodigoProductoCategoria(rs.getInt("NUMCODIGOPRODUCTOCATEGORIA"));
					}
					return productoCaracteristica;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PROD_ONLINE_CATEG(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ProductoCaracteristica grabarProductoAtributo(ProductoCaracteristica productoCaracteristica)
			throws Exception {
		CallableStatementCallback<ProductoCaracteristica> callback = null;
		try {
			callback = new CallableStatementCallback<ProductoCaracteristica>() {
				@Override
				public ProductoCaracteristica doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, productoCaracteristica.getNumCodProdCaracteristica());
					cs.setString(2, productoCaracteristica.getChrCodigoProducto());
					cs.setInt(3, productoCaracteristica.getCaracteristica().getNumCodigoCaracteristica());
					cs.setString(4, productoCaracteristica.getChrValue());
					cs.setString(5, productoCaracteristica.getCrud().getDescripcion());
					cs.execute();
					return productoCaracteristica;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_PROD_CARACTERISTICA(?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ProductoOnlineCategoria grabarProductoCategoria(ProductoOnlineCategoria productoOnlineCategoria)
			throws Exception {
		CallableStatementCallback<ProductoOnlineCategoria> callback = null;
		try {
			callback = new CallableStatementCallback<ProductoOnlineCategoria>() {
				@Override
				public ProductoOnlineCategoria doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setString(1, productoOnlineCategoria.getChrCodigoProducto());
					cs.setString(2, productoOnlineCategoria.getChrRecomendado());
					cs.setString(3, productoOnlineCategoria.getChrDestacado());
					cs.setString(4, productoOnlineCategoria.getChrDestacadoMarca());
					cs.setString(5, productoOnlineCategoria.getChrOferta());
					cs.setString(6, productoOnlineCategoria.getChrRemate());
					cs.execute();
					return productoOnlineCategoria;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_PROD_CATEGORIA(?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ImagenProductoReporte> listarProductoCategoria(ImagenProductoReporte imagenProductoReporte)
			throws Exception {
		CallableStatementCallback<List<ImagenProductoReporte>> callback = null;
		try {
			callback = new CallableStatementCallback<List<ImagenProductoReporte>>() {
				@Override
				public List<ImagenProductoReporte> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					List<ImagenProductoReporte> lista = new ArrayList<>();
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, imagenProductoReporte.getChrDestacado());
					cs.setString(3, imagenProductoReporte.getChrDestacadoMarca());
					cs.setString(4, imagenProductoReporte.getChrOferta());
					cs.setString(5, imagenProductoReporte.getChrRecomendado());
					cs.setString(6, imagenProductoReporte.getChrRemate());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					while (rs.next()) {
						ImagenProductoReporte reporte = new ImagenProductoReporte();
						reporte.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						reporte.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						reporte.setChrDestacado(rs.getString("CHRDESTACADO"));
						reporte.setChrDestacadoMarca(rs.getString("CHRDESTACADOMARCA"));
						reporte.setChrOferta(rs.getString("CHROFERTA"));
						reporte.setChrRecomendado(rs.getString("CHRRECOMENDADO"));
						reporte.setChrRemate(rs.getString("CHRREMATE"));
						Familia familia = new Familia();
						familia.setChrCodigoFamilia(rs.getString("CHRCODIGOFAMILIA"));
						familia.setVchDescripcion(rs.getString("VCHDESCRIPCIONF"));
						reporte.setFamilia(familia);
						lista.add(reporte);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PROD_REP_CATEG(?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ProductoStock> listarProductoStock(List<ProductoStock> listaStock) throws Exception {
		for (ProductoStock productoStock : listaStock) {

			ProductoStock temp = new ProductoStock();
			temp.setChrCodigoProducto(productoStock.getChrCodigoProducto());
			temp.setDuplicado(productoStock.isDuplicado());
			try {
				productoStock.setObservacion(ValidalistarProductoStock(temp).getObservacion());
			} catch (Exception e) {
				e.printStackTrace();
			}

		}
		return listaStock;
	}

	@Override
	public ProductoStock ValidalistarProductoStock(ProductoStock productoStock) throws Exception {
		CallableStatementCallback<ProductoStock> callback = null;

		try {
			callback = new CallableStatementCallback<ProductoStock>() {
				@Override
				public ProductoStock doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {

					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, productoStock.getChrCodigoProducto());
					cs.setString(3, productoStock.isDuplicado() + "");
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					ProductoStock stock = new ProductoStock();
					while (rs.next()) {
						stock.setObservacion(rs.getString("OBSERVACION"));
					}
					return stock;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PROD_STOCK(?,?)}";
		return jdbcTemplate.execute(sql, callback);

	}

	@Override
	public void actualizarProductoStock(List<ProductoStock> listaStock) throws Exception {
		for (ProductoStock productoStock : listaStock) {
			try {
				actualizarProductoProcedure(productoStock);
			} catch (Exception e) {
				e.printStackTrace();
				throw new Exception(e);
			}
		}
	}

	private ProductoStock actualizarProductoProcedure(ProductoStock productoStock) throws Exception {
		CallableStatementCallback<ProductoStock> callback = null;
		try {
			callback = new CallableStatementCallback<ProductoStock>() {
				@Override
				public ProductoStock doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setString(1, productoStock.getChrCodigoProducto());
					cs.setInt(2, productoStock.getNumStock());
					cs.execute();
					return productoStock;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".UPDATE_STOCK_PRODUCTO(?,?)}";
		return jdbcTemplate.execute(sql, callback);

	}

	@Override
	public Vigencia obtenerVigencia() throws Exception {
		CallableStatementCallback<Vigencia> callback = null;
		SimpleDateFormat dmy=new SimpleDateFormat("dd/MM/yyyy");
		try {
			callback = new CallableStatementCallback<Vigencia>() {
				@Override
				public Vigencia doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);				
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					Vigencia vigencia = new Vigencia();
					while (rs.next()) {
						vigencia.setDteDesde(dmy.format(rs.getDate("DTEDESDE")));
						vigencia.setDteHasta(dmy.format(rs.getDate("DTEHASTA")));
						vigencia.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));
					}
					return vigencia;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".OBT_VIGENCIA()}";
		return jdbcTemplate.execute(sql, callback);

	}

	@Override
	public List<ProductoOutletVigencia> listarProductoOutletVigencia() throws Exception {
		CallableStatementCallback<List<ProductoOutletVigencia>> callback = null;
		SimpleDateFormat dmy=new SimpleDateFormat("dd/MM/yyyy HH:mm");
		try {
			callback = new CallableStatementCallback<List<ProductoOutletVigencia>>() {
				@Override
				public List<ProductoOutletVigencia> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);				
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					List<ProductoOutletVigencia> lista=new ArrayList<ProductoOutletVigencia>();
					while (rs.next()) {
						ProductoOutletVigencia vigencia=new ProductoOutletVigencia();
						vigencia.setDteDesde(dmy.format(rs.getDate("DTEDESDE")));
						vigencia.setDteHasta(dmy.format(rs.getDate("DTEHASTA")));
						vigencia.setNumEstado(rs.getInt("NUMESTADO"));
						vigencia.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));
						lista.add(vigencia);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_VIGENCIA()}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ProductoOutletVigencia saveProductoOutletVigencia(ProductoOutletVigencia productoOutletVigencia) throws Exception {
		CallableStatementCallback<ProductoOutletVigencia> callback = null;
		SimpleDateFormat dmy=new SimpleDateFormat("dd/MM/yyyy");
		 
		logger.info(dmy.format(productoOutletVigencia.getDteDesdeDate())+" 00:00:00");
		
		try {
			callback = new CallableStatementCallback<ProductoOutletVigencia>() {
				@Override
				public ProductoOutletVigencia doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, productoOutletVigencia.getNumProductoVigencia());
					cs.setString(2,dmy.format(productoOutletVigencia.getDteDesdeDate())+" 00:00:00");
					cs.setString(3, dmy.format(productoOutletVigencia.getDteHastaDate())+" 11:59:59");
					cs.setInt(4, productoOutletVigencia.getNumEstado());
					cs.registerOutParameter(5, OracleTypes.VARCHAR);
					cs.registerOutParameter(6, OracleTypes.NUMBER);
					cs.execute();
					productoOutletVigencia.setStatus(cs.getString(5));
					productoOutletVigencia.setNumProductoVigencia(cs.getInt(6));
					
					return productoOutletVigencia;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_OUTLETVIGENCIA(?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<ProductoOutlet> listaProductosOutlet(ProductoOutlet productoOutlet) throws Exception {
		CallableStatementCallback<List<ProductoOutlet>> callback = null;		 
		try {
			callback = new CallableStatementCallback<List<ProductoOutlet>>() {
				@Override
				public List<ProductoOutlet> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);	
					cs.setInt(2, productoOutlet.getNumProductoVigencia());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					List<ProductoOutlet> lista=new ArrayList<ProductoOutlet>();
					while (rs.next()) {
						ProductoOutlet productoOutlet=new ProductoOutlet();
						productoOutlet.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						productoOutlet.setNumProductoOutlet(rs.getInt("NUMPRODUCTO_OUTLET"));
						productoOutlet.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));
						productoOutlet.setNumStock(rs.getInt("NUMSTOCK"));
						productoOutlet.setNumUnspc(rs.getString("NUMUNSPC"));
						productoOutlet.setNumValorCompra(rs.getBigDecimal("NUMVALORCOMPRA").setScale(2, RoundingMode.HALF_UP));
						productoOutlet.setNumValorDesc(rs.getBigDecimal("NUMVALORDESC").setScale(2, RoundingMode.HALF_UP));
						productoOutlet.setNumValorRefVenta(rs.getBigDecimal("NUMVALORREFVENTA").setScale(2, RoundingMode.HALF_UP));
						productoOutlet.setNumValorVenta(rs.getBigDecimal("NUMVALORVENTA").setScale(2, RoundingMode.HALF_UP));
						productoOutlet.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						lista.add(productoOutlet);
					}
					return lista;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PROD_OUTLET(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ProductoOutletVigencia obtenerVigenciaXCodigo(ProductoOutlet productoOutlet) throws Exception {
		CallableStatementCallback<ProductoOutletVigencia> callback = null;
		SimpleDateFormat dmy=new SimpleDateFormat("yyyy/MM/dd");
		try {
			callback = new CallableStatementCallback<ProductoOutletVigencia>() {
				@Override
				public ProductoOutletVigencia doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);		
					cs.setInt(2, productoOutlet.getNumProductoVigencia());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					ProductoOutletVigencia ProductoOutletVigencia=new ProductoOutletVigencia();
					while (rs.next()) {					 
						ProductoOutletVigencia.setDteDesde(dmy.format(rs.getDate("DTEDESDE")));
						ProductoOutletVigencia.setDteHasta(dmy.format(rs.getDate("DTEHASTA")));
						ProductoOutletVigencia.setNumEstado(rs.getInt("NUMESTADO"));
						ProductoOutletVigencia.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));						 
					}
					return ProductoOutletVigencia;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".OBTENER_VIGENCIA(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public String saveProductoOutlet(ProductoOutlet productoOutlet) throws Exception {
		CallableStatementCallback<String> callback = null;
		try {
			callback = new CallableStatementCallback<String>() {
				@Override
				public String doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					 cs.setString(1, productoOutlet.getChrCodigoProducto().trim());
					 cs.setString(2, productoOutlet.getVchDescripcion());
					 cs.setBigDecimal(3, productoOutlet.getNumValorVenta());
					 cs.setString(4, productoOutlet.getNumUnspc());
					 cs.setDouble(5, productoOutlet.getNumStock());
					 cs.setBigDecimal(6, productoOutlet.getNumValorRefVenta());
					 cs.setBigDecimal(7, productoOutlet.getNumValorDesc());
					 cs.setInt(8, productoOutlet.getNumProductoVigencia());
					 cs.setBigDecimal(9, productoOutlet.getNumValorCompra());
					 cs.setInt(10, productoOutlet.getNumProductoOutlet());
					 cs.registerOutParameter(11, OracleTypes.VARCHAR);
					cs.execute();
					return cs.getString(11);
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_PRODUC_OUTLET(?,?,?,?,?,?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

 

}
