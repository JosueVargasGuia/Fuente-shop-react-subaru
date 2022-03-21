package com.ShopAutoPartsServices.Repository.Impl;

import java.io.ByteArrayInputStream;
import java.math.RoundingMode;
import java.sql.Blob;
import java.sql.CallableStatement;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.Locale;

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
import com.ShopAutoPartsServices.Enums.TypePresentacion;
import com.ShopAutoPartsServices.Repository.ProductoServiceRepository;

import org.yaml.snakeyaml.external.biz.base64Coder.Base64Coder;
import oracle.jdbc.OracleTypes;

@Repository
public class ProductoServiceRepositoryImpl implements ProductoServiceRepository {
	final private String PKG_TIENDA = "PKG_TIENDA";
	// final private String imageNoDisponible =
	// "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";
	// final private String imageNoDisponible =
	// "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";
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

		StringBuilder builderQuery = new StringBuilder("");
		for (String query : productoRequets.getListaQuery()) {
			if (builderQuery.toString().equals("")) {
				builderQuery.append(query);
			} else {
				builderQuery.append("|").append(query);
			}
		}
		if (builderQuery.toString().equalsIgnoreCase("")) {
			builderQuery.append("*");
		}

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
					cs.setString(10, builderQuery.toString());

					logger.info("Size : " + productos.size() + " I_CHRCODIGOFAMILIA:"
							+ (productoRequets.getChrCodigoFamilia() != null ? productoRequets.getChrCodigoFamilia()
									: null)
							+ " I_VCHDESCRIPCION:"
							+ (productoRequets.getVchDescripcion() != null ? productoRequets.getVchDescripcion() : null)
							+ " I_CHRCODIGOPRODUCTO:"
							+ (productoRequets.getChrCodigoProducto() != null ? productoRequets.getChrCodigoProducto()
									: null)
							+ " I_PAGE:" + productoRequets.getPagina() + " I_LIMIT:" + productoRequets.getLimit()
							+ " I_FILTERPRODUCTO:" + productoRequets.getFilterProducto().toString() + " I_FILTER_ORDER:"
							+ productoRequets.getFilterOrder().toString()

							+ " I_FILTERTYPELISTA:" + builderQuery.toString() + " I_FILTERSUBFAMILIA_LIST:"
							+ builder.toString());

					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					DecimalFormat formatter = new DecimalFormat("###,###.00");

					while (rs.next()) {
						ProductoImagen imagenDefault = new ProductoImagen();
						Producto producto = new Producto();
						producto.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						producto.setNumValorVentaDolar(formatter.format(rs.getBigDecimal("NUMVALORVENTADOLAR")));
						producto.setNumValorVentaSoles(formatter.format(rs.getBigDecimal("NUMVALORVENTASOLES")));

						producto.setNumValorVentaDolarIgv(formatter.format(rs.getBigDecimal("NUMVALORVENTADOLARIGV")));
						producto.setNumValorVentaSolesIgv(formatter.format(rs.getBigDecimal("NUMVALORVENTASOLESIGV")));

						producto.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						producto.setVchDescripcionSmall(rs.getString("VCHDESCRIPCIONSMALL"));
						producto.setNumStock(rs.getInt("NUMSTOCK"));
						producto.setTotalRegistros(rs.getInt("TOTALREGISTROS"));
						producto.setFamilia(new Familia()).getFamilia()
								.setChrCodigoFamilia(rs.getString("CHRCODIGOFAMILIA"))
								.setVchDescripcion(rs.getString("VCHDESCRIPCIONFAMILIA"));
						producto.setNumOutlet(rs.getInt("NUMOUTLET"));
						producto.setNumValorVentaRefDolar(formatter.format(rs.getBigDecimal("NUMVALORVENTAREFDOLAR")));
						producto.setNumValorVentaRefSoles(formatter.format(rs.getBigDecimal("NUMVALORVENTAREFSOLES")));

						producto.setNumValorDesc(rs.getDouble("NUMVALORDESC"));
						producto.setDisplayChrcodigoproducto(rs.getInt("DISPLAY_CHRCODIGOPRODUCTO"));
						producto.setTypePresentacion(TypePresentacion.valueOf(rs.getString("TYPEPRESENTACION")));

						producto.setNumValorBaseDolar(formatter.format(rs.getBigDecimal("NUMVALORBASE")));
						producto.setNumValorBaseSoles(formatter.format(rs.getBigDecimal("NUMVALORBASESOLES")));
						producto.setNumValorDescBase(rs.getDouble("NUMVALORDESCBASE"));

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
			logger.info("I_CHRCODIGOFAMILIA:" + productoRequets.getChrCodigoFamilia() + " I_VCHDESCRIPCION:"
					+ productoRequets.getVchDescripcion() + " I_CHRCODIGOPRODUCTO:"
					+ productoRequets.getChrCodigoProducto() + " I_PAGE:" + productoRequets.getPagina() + " I_LIMIT:"
					+ productoRequets.getLimit() + " I_FILTERPRODUCTO:" + productoRequets.getFilterProducto().toString()
					+ " I_FILTER_ORDER:" + productoRequets.getFilterOrder().toString()

					+ " I_FILTER_QUERY:" + builderQuery.toString() + " I_FILTERSUBFAMILIA_LIST:" + builder.toString());

			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LISTA_PRODUCTOS(?,?,?,?,?,?,?,?,?)}";
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
		SimpleDateFormat dmy = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat dmyday = new SimpleDateFormat("dd");
		SimpleDateFormat dmymonth = new SimpleDateFormat("MM", new Locale("es_ES"));
		SimpleDateFormat dmyanio = new SimpleDateFormat("yyyy");
		try {
			callback = new CallableStatementCallback<Vigencia>() {
				@Override
				public Vigencia doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					Vigencia vigencia = new Vigencia();

					while (rs.next()) {
						vigencia.setDteDesde(dmy.format(rs.getDate("DTEDESDE")));
						vigencia.setDteHasta(dmy.format(rs.getDate("DTEHASTA")));
						vigencia.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));
						vigencia.setDteDesdeFormato(dmyday.format(rs.getDate("DTEDESDE")) + " "
								+ findMesEspañol(dmymonth.format(rs.getDate("DTEDESDE"))) + " "
								+ dmyanio.format(rs.getDate("DTEDESDE")));
						vigencia.setDteHastaFormato(dmyday.format(rs.getDate("DTEHASTA")) + " "
								+ findMesEspañol(dmymonth.format(rs.getDate("DTEHASTA"))) + " "
								+ dmyanio.format(rs.getDate("DTEHASTA")));
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

	public String findMesEspañol(String _mes) {
		switch (_mes) {
		case "01":
			return "enero";
		case "02":
			return "febrero";
		case "03":
			return "marzo";
		case "04":
			return "abril";
		case "05":
			return "mayo";
		case "06":
			return "junio";
		case "07":
			return "julio";
		case "08":
			return "agosto";
		case "09":
			return "setiembre";
		case "10":
			return "octubre";
		case "11":
			return "noviembre";
		case "12":
			return "diciempre";

		default:
			return "";
		}
	}

	@Override
	public List<ProductoOutletVigencia> listarProductoOutletVigencia() throws Exception {
		CallableStatementCallback<List<ProductoOutletVigencia>> callback = null;
		SimpleDateFormat dmy = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		try {
			callback = new CallableStatementCallback<List<ProductoOutletVigencia>>() {
				@Override
				public List<ProductoOutletVigencia> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					List<ProductoOutletVigencia> lista = new ArrayList<ProductoOutletVigencia>();
					while (rs.next()) {
						ProductoOutletVigencia vigencia = new ProductoOutletVigencia();
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
	public ProductoOutletVigencia saveProductoOutletVigencia(ProductoOutletVigencia productoOutletVigencia)
			throws Exception {
		CallableStatementCallback<ProductoOutletVigencia> callback = null;
		SimpleDateFormat dmy = new SimpleDateFormat("dd/MM/yyyy");

		logger.info(dmy.format(productoOutletVigencia.getDteDesdeDate()) + " 00:00:00");

		try {
			callback = new CallableStatementCallback<ProductoOutletVigencia>() {
				@Override
				public ProductoOutletVigencia doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setInt(1, productoOutletVigencia.getNumProductoVigencia());
					cs.setString(2, dmy.format(productoOutletVigencia.getDteDesdeDate()) + " 00:00:00");
					cs.setString(3, dmy.format(productoOutletVigencia.getDteHastaDate()) + " 11:59:59");
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
					List<ProductoOutlet> lista = new ArrayList<ProductoOutlet>();
					while (rs.next()) {
						ProductoOutlet productoOutlet = new ProductoOutlet();
						productoOutlet.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						productoOutlet.setNumProductoOutlet(rs.getInt("NUMPRODUCTO_OUTLET"));
						productoOutlet.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));
						productoOutlet.setNumStock(rs.getInt("NUMSTOCK"));
						productoOutlet.setNumUnspc(rs.getString("NUMUNSPC"));
						productoOutlet.setNumValorCompra(
								rs.getBigDecimal("NUMVALORCOMPRA").setScale(2, RoundingMode.HALF_UP));
						productoOutlet
								.setNumValorDesc(rs.getBigDecimal("NUMVALORDESC").setScale(2, RoundingMode.HALF_UP));
						productoOutlet.setNumValorRefVenta(
								rs.getBigDecimal("NUMVALORREFVENTA").setScale(2, RoundingMode.HALF_UP));
						productoOutlet
								.setNumValorVenta(rs.getBigDecimal("NUMVALORVENTA").setScale(2, RoundingMode.HALF_UP));
						productoOutlet.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						productoOutlet.setVchModelo(rs.getString("VCHMODELO"));
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
		SimpleDateFormat dmy = new SimpleDateFormat("yyyy/MM/dd");

		SimpleDateFormat dmyday = new SimpleDateFormat("dd");
		SimpleDateFormat dmymonth = new SimpleDateFormat("MM", new Locale("es_ES"));
		SimpleDateFormat dmyanio = new SimpleDateFormat("yyyy");
		try {
			callback = new CallableStatementCallback<ProductoOutletVigencia>() {
				@Override
				public ProductoOutletVigencia doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setInt(2, productoOutlet.getNumProductoVigencia());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					ProductoOutletVigencia ProductoOutletVigencia = new ProductoOutletVigencia();
					while (rs.next()) {
						ProductoOutletVigencia.setDteDesde(dmy.format(rs.getDate("DTEDESDE")));
						ProductoOutletVigencia.setDteHasta(dmy.format(rs.getDate("DTEHASTA")));
						ProductoOutletVigencia.setNumEstado(rs.getInt("NUMESTADO"));
						ProductoOutletVigencia.setNumProductoVigencia(rs.getInt("NUMPRODUCTOVIGENCIA"));
						ProductoOutletVigencia.setDteDesdeFormato(dmyday.format(rs.getDate("DTEDESDE")) + " "
								+ findMesEspañol(dmymonth.format(rs.getDate("DTEDESDE"))) + " "
								+ dmyanio.format(rs.getDate("DTEDESDE")));
						ProductoOutletVigencia.setDteHastaFormato(dmyday.format(rs.getDate("DTEHASTA")) + " "
								+ findMesEspañol(dmymonth.format(rs.getDate("DTEHASTA"))) + " "
								+ dmyanio.format(rs.getDate("DTEHASTA")));

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
				public String doInCallableStatement(CallableStatement cs) throws SQLException, DataAccessException {
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
					cs.setString(11, productoOutlet.getVchModelo());
					cs.registerOutParameter(12, OracleTypes.VARCHAR);
					cs.execute();
					return cs.getString(11);
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".REGISTRAR_PRODUC_OUTLET(?,?,?,?,?,?,?,?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public ProductoOutlet updateProductoOutlet(ProductoOutlet outletRequets) throws Exception {
		CallableStatementCallback<ProductoOutlet> callback = null;
		try {
			callback = new CallableStatementCallback<ProductoOutlet>() {
				@Override
				public ProductoOutlet doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.setString(1, outletRequets.getChrCodigoProducto());
					cs.setString(2, (outletRequets.getNumUnspc().length() <= 0 ? null : outletRequets.getNumUnspc()));
					cs.setInt(3, outletRequets.getNumProductoVigencia());
					cs.setInt(4, outletRequets.getNumProductoOutlet());
					cs.registerOutParameter(5, OracleTypes.VARCHAR);
					cs.execute();
					outletRequets.setStatus(cs.getString(5));
					return outletRequets;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{call " + PKG_TIENDA + ".UPDATE_EC_PRODUC_OUTLET(?,?,?,?,?)}";
		return jdbcTemplate.execute(sql, callback);
	}

	@Override
	public List<Producto> listarProductoFindCodigoDesc(ProductoImagen productoImagen) throws Exception {
		CallableStatementCallback<List<Producto>> callback = null;
		try {
			callback = new CallableStatementCallback<List<Producto>>() {
				@Override
				public List<Producto> doInCallableStatement(CallableStatement cs)
						throws SQLException, DataAccessException {
					cs.registerOutParameter(1, OracleTypes.CURSOR);
					cs.setString(2, productoImagen.getChrCodigoProducto());
					cs.executeQuery();
					ResultSet rs = (ResultSet) cs.getObject(1);
					List<Producto> list = new ArrayList<Producto>();
					while (rs.next()) {
						Producto producto=new Producto();
						producto.setChrCodigoProducto(rs.getString("CHRCODIGOPRODUCTO"));
						producto.setVchDescripcion(rs.getString("VCHDESCRIPCION"));
						producto.setFamilia(new Familia(rs.getString("CHRCODIGOFAMILIA"), rs.getString("VCHDESCRIPCIONFAMILIA")));
						list.add(producto);
					}
					return list;
				}
			};
		} catch (Exception e) {
			e.printStackTrace();
			throw new Exception(e);
		}
		String sql = "{?=call " + PKG_TIENDA + ".LST_PROD_FIND_CODDESC(?)}";
		return jdbcTemplate.execute(sql, callback);
	}

}
