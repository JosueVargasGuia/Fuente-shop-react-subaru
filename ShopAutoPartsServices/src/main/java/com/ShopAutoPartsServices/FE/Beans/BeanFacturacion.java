package com.ShopAutoPartsServices.FE.Beans;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Date;



public class BeanFacturacion implements Serializable {


	private static final long serialVersionUID = 1L;
	private String codigo;
	private Date fecha;
	private String nroFactura;
	private String nroOS;
	private String nroCotizacion;
	private String codPresupuesto;
	private String tipo;     // BOLETA / FACTURA / N
	private String fecCreacion;
	private String horaCreacion;
    private String tipoPago; // CREDITO / CONTADO
    private String opcion;
    private String nroDocumentoFactura;
    private String valorizada;
    private String sumTotales;
    private String serie;
    private String cantidad;
    private String correlativo;
    private String origen;
    private String nroDias;
	private String codUsuario;
	private String tipoFacturar;  // C=CLIENTE, S=SEGURO, O=OTROS
	private String pagoFranquicia;
	private String codSucursal;
	private String montoLetras;
	private String factDctos;
	private String relacionFactura;
	private String pendiente;
	private String concepto;
	private String descConcepto;
	private String precioConcepto;
	private String itemConcepto;
	private String observacion;
	private String estado;
	private String fecInicio;
	private String fecFin;
	private String flag;
	private String hiddenSerie;
	private String cancelado;
	private String omiteDatos;
	private String sentencia;
	private String codigoEmpresa;
	private String codTransaccion; 
	private String nroCuotas;
	private String fecVenceCuota;
	private String tipoPago_relacionDoc;
	private String horasHombre;
	private String costoHH;
    private String nroDocumento;

	//CABECERA
	private String codCliente;
	private String nomCliente;
	private String tipoCliente; // 1= PERSONA NATURAL , 2 = PERSONA JURIDICA, 3= CARNET DE EXTRANJERIA
	private String direccion;
    private String documento;
    private String ubigeo;
    private String telefonos;
    private String contactoTelefonos;
    private String placa;
    private String vehiculo;
	private String marca;
    private String modelo;
    private String color;
    private String anio;
    private String vin;
    private String motor;
    private String usuarioVehiculo;
    private String codConceptoContable;
    private String nombreTecnico;
    private String kilometraje;
    private String codOS;
    private String tipoDocumento;
    private int asesorVenta;
    //cabecera 
    //DETALLE
    private String itemCodigo;
    private String itemDescripcion;
    private String itemCodigoOperacionMaestro;
    private String itemCodigoOperacionServicio;
    private double itemPrecio;
    private double itemDescuento;
    private double itemImporteTotal;
    private double itemPrecioIgv;
    private BigDecimal itemIcb;
    
	/************ TOTALES ***********/
    private String subTotalServicio;
    private String dsctoServicio;
    private String totalServicio;
	private String subTotalRepuesto;
	private String dsctoRepuesto;
	private String totalRepuesto;
	private String totalOtros;
    private String subTotal;
	private String dscto;
	private String franquicia;
	private String total;
    private String igv;
    private String isc;
    private String icb;
    private String totalFinal;

    /******* PAGO CUENTA **********/
	private String fecPago;
	private String importe;
	private String refPago;
	private String obsPago;
	private String tipoCambio;
	private String efeDolar;
	private String efeSoles;
	private String chqDolar;
	private String chqSoles;
	private String tarjDolar;
	private String tarjSoles;
	private String numChqDolar;
	private String numChqSoles;
	private String numTarjDolar;
	private String numTarjSoles;
	private String descChqDolar;
	private String descChqSoles;
	private String descTarjDolar;
	private String descTarjSoles;
	private String item;
	private String chkPagocuenta;
	private String codDetalle;
	private double tasaImpuesto;
	private double actualIgv;
	private BigDecimal montoAutorizado;
	
	//FACTURACION ELECTRONICA
	private String tipoNotaCredito;
	private String notaCreditoCodigoElectronico;
	private Double tipoCambioContableVenta;
	private String fechaCancelacion;
	private String asegurado;
	private String montoNeto;
	private String montoImpuesto;
	private String tipoFacturaElectronica;
	private String tipoDocumentoReceptorElectronico;
	private String DocumentoReceptorElectronico;
	private String sustentoNotaCredito;
	private String correlativoFacturaElectronica;
	private Double impuestoIgv;
	private String facturaTexto1;
	private String facturaTexto2;
	private int codigoOrigenFactura;
	private String montoNetoSubtotal;
	private String detraccion;
	private String unidadMedidaElectronica;
	//Sucursal nuevo
	private String razonSocial;
	private String telefonoFax;
	private String emailEmpresa;
	private String direccionSucursal;
	private String telefonoSucursal;
	private double igvDecimal;
	private double igvEnteroDecimal;
	private double cantidadFE;
	private String tipoSerie;
	private String flagAnular;
	private String fechaRelacionFactura;
	private String codModeloVersion;
	private String codSucursalAnexo;
	private String codUNSPC;
	
	//pago online
	
	private String codTienda;
	private String nombreEmpresa;
	private String codigoComercio;
	private int codFactura;
	private int codigoMoneda;
	private String usuarioVisa;
	private String claveVisa;
	private String transaccionId;
	private int cantidadBolsa;
	private int cantidadBolsaAnterior;
	private String impuestoIcb;
	private String clienteEmail;
	private String siniestro;
	private String poliza;
	private int visaRespuesta;
	private String textoFormaPago;
	
	public BeanFacturacion(){
		
	}
	
	public BeanFacturacion(String codigo, int codigoOrigenFactura){
		this.codigo = codigo;
		this.codigoOrigenFactura = codigoOrigenFactura;
	}
	
	public String getTextoFormaPago(){
		return textoFormaPago;
	}

	public void setTextoFormaPago(String textoFormaPago){
		this.textoFormaPago = textoFormaPago;
	}

	public String getNroDocumento() {
		return nroDocumento;
	}
	public void setNroDocumento(String nroDocumento) {
		this.nroDocumento = nroDocumento;
	}
	public String getHorasHombre() {
		return horasHombre;
	}
	public void setHorasHombre(String horasHombre) {
		this.horasHombre = horasHombre;
	}
	public String getCostoHH() {
		return costoHH;
	}
	public void setCostoHH(String costoHH) {
		this.costoHH = costoHH;
	}
	public String getCodigo() {
		return codigo;
	}
	public void setCodigo(String codigo) {
		this.codigo = codigo;
	}	
	public String getCodTransaccion() {
		return codTransaccion;
	}
	public void setCodTransaccion(String codTransaccion) {
		this.codTransaccion = codTransaccion;
	}
	public String getCodigoEmpresa() {
		return codigoEmpresa;
	}
	public void setCodigoEmpresa(String codigoEmpresa) {
		this.codigoEmpresa = codigoEmpresa;
	}
	public double getActualIgv() {
		return actualIgv;
	}
	public void setActualIgv(double actualIgv) {
		this.actualIgv = actualIgv;
	}
	public double getItemDescuento() {
		return itemDescuento;
	}
	public void setItemDescuento(double itemDescuento) {
		this.itemDescuento = itemDescuento;
	}
	public double getItemImporteTotal() {
		return itemImporteTotal;
	}
	public void setItemImporteTotal(double itemImporteTotal) {
		this.itemImporteTotal = itemImporteTotal;
	}
	public double getItemPrecio() {
		return itemPrecio;
	}
	public void setItemPrecio(double itemPrecio) {
		this.itemPrecio = itemPrecio;
	}
	public String getItemCodigo() {
		return itemCodigo;
	}
	public void setItemCodigo(String itemCodigo) {
		this.itemCodigo = itemCodigo;
	}
	public String getItemDescripcion() {
		return itemDescripcion;
	}
	public void setItemDescripcion(String itemDescripcion) {
		this.itemDescripcion = itemDescripcion;
	}
	public double getTasaImpuesto() {
		return tasaImpuesto;
	}
	public void setTasaImpuesto(double tasaImpuesto) {
		this.tasaImpuesto = tasaImpuesto;
	}
	public String getTipoCliente() {
		return tipoCliente;
	}
	public void setTipoCliente(String tipoCliente) {
		this.tipoCliente = tipoCliente;
	}
	public Date getFecha() {
		return fecha;
	}
	public void setFecha(Date fecha) {
		this.fecha = fecha;
	}
	public String getCodDetalle() {
		return codDetalle;
	}
	public void setCodDetalle(String codDetalle) {
		this.codDetalle = codDetalle;
	}
	public String getSumTotales(){
		return sumTotales;
	}
	public void setSumTotales(String sumTotales) {
		this.sumTotales = sumTotales;
	}
	public String getTipoPago() {
		return tipoPago;
	}
	public void setTipoPago(String tipoPago) {
		this.tipoPago = tipoPago;
	}
	
	public String getTotalFinal() {
		return totalFinal;
	}
	public void setTotalFinal(String totalFinal) {
		this.totalFinal = totalFinal;
	}
	public String getCodCliente() {
		return codCliente;
	}
	public void setCodCliente(String codCliente) {
		this.codCliente = codCliente;
	}
	public String getNomCliente() {
		return nomCliente;
	}
	public void setNomCliente(String nomCliente) {
		this.nomCliente = nomCliente;
	}
	public String getNroFactura() {
		return nroFactura;
	}
	public void setNroFactura(String nroFactura) {
		this.nroFactura = nroFactura;
	}
	public String getNroOS() {
		return nroOS;
	}
	public void setNroOS(String nroOS) {
		this.nroOS = nroOS;
	}
	public String getPlaca() {
		return placa;
	}
	public void setPlaca(String placa) {
		this.placa = placa;
	}
	public String getFecCreacion() {
		return fecCreacion;
	}
	public void setFecCreacion(String fecCreacion) {
		this.fecCreacion = fecCreacion;
	}
	public String getTotal() {
		return total==null || total.equals("")?"0":total;
	}
	public void setTotal(String total) {
		this.total = total;
	}
	public String getIgv() {
		return igv;
	}
	public void setIgv(String igv) {
		this.igv = igv;
	}
	public String getSubTotal() {
		return subTotal;
	}
	public void setSubTotal(String subTotal) {
		this.subTotal = subTotal;
	}
	public String getDscto() {
		return dscto;
	}
	public void setDscto(String dscto) {
		this.dscto = dscto;
	}
	public String getTipo() {
		return tipo;
	}
	public void setTipo(String tipo) {
		this.tipo = tipo;
	}
	public String getOpcion() {
		return opcion;
	}
	public void setOpcion(String opcion) {
		this.opcion = opcion;
	}
	public String getNroDocumentoFactura() {
		return nroDocumentoFactura;
	}
	public void setNroDocumentoFactura(String nroDocumentoFactura) {
		this.nroDocumentoFactura = nroDocumentoFactura;
	}
	public String getValorizada() {
		return valorizada;
	}
	public void setValorizada(String valorizada) {
		this.valorizada = valorizada;
	}
	public String getHoraCreacion() {
		return BeanUtil.getHora(horaCreacion==null?"":horaCreacion);
	}
	public void setHoraCreacion(String horaCreacion) {
		this.horaCreacion = horaCreacion;
	}
	public String getSerie() {
		return serie;
	}
	public void setSerie(String serie) {
		this.serie = serie;
	}
	public String getCantidad() {
		return cantidad;
	}
	public void setCantidad(String cantidad) {
		this.cantidad = cantidad;
	}
	public String getCorrelativo() {
		return correlativo;
	}
	public void setCorrelativo(String correlativo) {
		this.correlativo = correlativo;
	}
	public String getFranquicia(){
		return franquicia;
	}
	public void setFranquicia(String franquicia) {
		this.franquicia = franquicia;
	}
	public String getOrigen() {
		return origen;
	}
	public void setOrigen(String origen) {
		this.origen = origen;
	}
	public String getDsctoRepuesto() {
		return dsctoRepuesto;
	}
	public void setDsctoRepuesto(String dsctoRepuesto) {
		this.dsctoRepuesto = dsctoRepuesto;
	}
	public String getDsctoServicio() {
		return dsctoServicio;
	}
	public void setDsctoServicio(String dsctoServicio) {
		this.dsctoServicio = dsctoServicio;
	}
	public String getSubTotalRepuesto() {
		return subTotalRepuesto;
	}
	public void setSubTotalRepuesto(String subTotalRepuesto) {
		this.subTotalRepuesto = subTotalRepuesto;
	}
	public String getSubTotalServicio() {
		return subTotalServicio;
	}
	public void setSubTotalServicio(String subTotalServicio) {
		this.subTotalServicio = subTotalServicio;
	}
	public String getTotalRepuesto() {
		return totalRepuesto;
	}
	public void setTotalRepuesto(String totalRepuesto) {
		this.totalRepuesto = totalRepuesto;
	}
	public String getTotalServicio() {
		return totalServicio;
	}
	public void setTotalServicio(String totalServicio) {
		this.totalServicio = totalServicio;
	}
	public String getNroDias() {
		return nroDias;
	}
	public void setNroDias(String nroDias) {
		this.nroDias = nroDias;
	}
	public String getCodUsuario() {
		return codUsuario;
	}
	public void setCodUsuario(String codUsuario) {
		this.codUsuario = codUsuario;
	}
	public String getNroCotizacion() {
		return nroCotizacion;
	}
	public void setNroCotizacion(String nroCotizacion) {
		this.nroCotizacion = nroCotizacion;
	}
	public String getTipoFacturar() {
		return tipoFacturar;
	}
	public void setTipoFacturar(String tipoFacturar) {
		this.tipoFacturar = tipoFacturar;
	}
	public String getPagoFranquicia() {
		return pagoFranquicia;
	}
	public void setPagoFranquicia(String pagoFranquicia) {
		this.pagoFranquicia = pagoFranquicia;
	}
	public String getCodPresupuesto() {
		return codPresupuesto;
	}
	public void setCodPresupuesto(String codPresupuesto) {
		this.codPresupuesto = codPresupuesto;
	}
	public String getCodSucursal() {
		return codSucursal;
	}
	public void setCodSucursal(String codSucursal) {
		this.codSucursal = codSucursal;
	}
	public String getTotalOtros() {
		return totalOtros;
	}
	public void setTotalOtros(String totalOtros) {
		this.totalOtros = totalOtros;
	}
	public String getMontoLetras() {
		return montoLetras;
	}
	public void setMontoLetras(String montoLetras) {
		this.montoLetras = montoLetras;
	}
	public String getAnio() {
		return anio;
	}
	public void setAnio(String anio) {
		this.anio = anio;
	}
	public String getColor() {
		return color;
	}
	public void setColor(String color) {
		this.color = color;
	}
	public String getContactoTelefonos() {
		return contactoTelefonos;
	}
	public void setContactoTelefonos(String contactoTelefonos) {
		this.contactoTelefonos = contactoTelefonos;
	}
	public String getDireccion() {
		return direccion;
	}
	public void setDireccion(String direccion) {
		this.direccion = direccion;
	}
	public String getDocumento() {
		return documento;
	}
	public void setDocumento(String documento) {
		this.documento = documento;
	}
	public String getMarca() {
		return marca;
	}
	public void setMarca(String marca) {
		this.marca = marca;
	}
	public String getModelo() {
		return modelo;
	}
	public void setModelo(String modelo) {
		this.modelo = modelo;
	}
	public String getMotor() {
		return motor;
	}
	public void setMotor(String motor) {
		this.motor = motor;
	}
	public String getTelefonos() {
		return telefonos;
	}
	public void setTelefonos(String telefonos) {
		this.telefonos = telefonos;
	}
	public String getUbigeo() {
		return ubigeo;
	}
	public void setUbigeo(String ubigeo) {
		this.ubigeo = ubigeo;
	}
	public String getUsuarioVehiculo() {
		return usuarioVehiculo;
	}
	public void setUsuarioVehiculo(String usuarioVehiculo) {
		this.usuarioVehiculo = usuarioVehiculo;
	}
	public String getVin() {
		return vin;
	}
	public void setVin(String vin) {
		this.vin = vin;
	}
	public String getVehiculo() {
		return vehiculo;
	}
	public void setVehiculo(String vehiculo) {
		this.vehiculo = vehiculo;
	}
	public String getFactDctos() {
		return factDctos;
	}
	public void setFactDctos(String factDctos) {
		this.factDctos = factDctos;
	}
	public String getRelacionFactura() {
		return relacionFactura;
	}
	public void setRelacionFactura(String relacionFactura) {
		this.relacionFactura = relacionFactura;
	}
	public String getPendiente() {
		return pendiente;
	}
	public void setPendiente(String pendiente) {
		this.pendiente = pendiente;
	}
	public static long getSerialVersionUID() {
		return serialVersionUID;
	}
	public String getChqDolar() {
		return chqDolar;
	}
	public void setChqDolar(String chqDolar) {
		this.chqDolar = chqDolar;
	}
	public String getChqSoles() {
		return chqSoles;
	}
	public void setChqSoles(String chqSoles) {
		this.chqSoles = chqSoles;
	}
	public String getDescChqDolar() {
		return descChqDolar;
	}
	public void setDescChqDolar(String descChqDolar) {
		this.descChqDolar = descChqDolar;
	}
	public String getDescChqSoles() {
		return descChqSoles;
	}
	public void setDescChqSoles(String descChqSoles) {
		this.descChqSoles = descChqSoles;
	}
	public String getDescTarjDolar() {
		return descTarjDolar;
	}
	public void setDescTarjDolar(String descTarjDolar) {
		this.descTarjDolar = descTarjDolar;
	}
	public String getDescTarjSoles() {
		return descTarjSoles;
	}
	public void setDescTarjSoles(String descTarjSoles) {
		this.descTarjSoles = descTarjSoles;
	}
	public String getEfeDolar() {
		return efeDolar;
	}
	public void setEfeDolar(String efeDolar) {
		this.efeDolar = efeDolar;
	}
	public String getEfeSoles() {
		return efeSoles;
	}
	public void setEfeSoles(String efeSoles) {
		this.efeSoles = efeSoles;
	}
	public String getFecPago() {
		return fecPago;
	}
	public void setFecPago(String fecPago) {
		this.fecPago = fecPago;
	}
	public String getImporte() {
		return importe;
	}
	public void setImporte(String importe) {
		this.importe = importe;
	}
	public String getItem() {
		return item;
	}
	public void setItem(String item) {
		this.item = item;
	}
	public String getNumChqDolar() {
		return numChqDolar;
	}
	public void setNumChqDolar(String numChqDolar) {
		this.numChqDolar = numChqDolar;
	}
	public String getNumChqSoles() {
		return numChqSoles;
	}
	public void setNumChqSoles(String numChqSoles) {
		this.numChqSoles = numChqSoles;
	}
	public String getNumTarjDolar() {
		return numTarjDolar;
	}
	public void setNumTarjDolar(String numTarjDolar) {
		this.numTarjDolar = numTarjDolar;
	}
	public String getNumTarjSoles() {
		return numTarjSoles;
	}
	public void setNumTarjSoles(String numTarjSoles) {
		this.numTarjSoles = numTarjSoles;
	}
	public String getObsPago() {
		return obsPago;
	}
	public void setObsPago(String obsPago) {
		this.obsPago = obsPago;
	}
	public String getRefPago() {
		return refPago;
	}
	public void setRefPago(String refPago) {
		this.refPago = refPago;
	}
	public String getTarjDolar() {
		return tarjDolar;
	}
	public void setTarjDolar(String tarjDolar) {
		this.tarjDolar = tarjDolar;
	}
	public String getTarjSoles() {
		return tarjSoles;
	}
	public void setTarjSoles(String tarjSoles) {
		this.tarjSoles = tarjSoles;
	}
	public String getTipoCambio() {
		return tipoCambio;
	}
	public void setTipoCambio(String tipoCambio) {
		this.tipoCambio = tipoCambio;
	}
	public String getConcepto() {
		return concepto;
	}
	public void setConcepto(String concepto) {
		this.concepto = concepto;
	}
	public String getDescConcepto() {
		return descConcepto;
	}
	public void setDescConcepto(String descConcepto) {
		this.descConcepto = descConcepto;
	}
	public String getItemConcepto() {
		return itemConcepto;
	}
	public void setItemConcepto(String itemConcepto) {
		this.itemConcepto = itemConcepto;
	}
	public String getPrecioConcepto() {
		return precioConcepto;
	}
	public void setPrecioConcepto(String precioConcepto) {
		this.precioConcepto = precioConcepto;
	}
	public String getChkPagocuenta() {
		return chkPagocuenta;
	}
	public void setChkPagocuenta(String chkPagocuenta) {
		this.chkPagocuenta = chkPagocuenta;
	}
	public String getObservacion() {
		return observacion;
	}
	public void setObservacion(String observacion) {
		this.observacion = observacion;
	}
	public String getEstado() {
		return estado;
	}
	public void setEstado(String estado) {
		this.estado = estado;
	}
	public String getFlag() {
		return flag;
	}
	public void setFlag(String flag) {
		this.flag = flag;
	}
	public String getFecFin() {
		return fecFin;
	}
	public void setFecFin(String fecFin) {
		this.fecFin = fecFin;
	}
	public String getFecInicio() {
		return fecInicio;
	}
	public void setFecInicio(String fecInicio) {
		this.fecInicio = fecInicio;
	}
	public String getHiddenSerie() {
		return hiddenSerie;
	}
	public void setHiddenSerie(String hiddenSerie) {
		this.hiddenSerie = hiddenSerie;
	}
	public String getCancelado() {
		return cancelado;
	}
	public void setCancelado(String cancelado) {
		this.cancelado = cancelado;
	}
	public String getOmiteDatos() {
		return omiteDatos;
	}
	public void setOmiteDatos(String omiteDatos) {
		this.omiteDatos = omiteDatos;
	}
	public String getSentencia() {
		return sentencia;
	}
	public void setSentencia(String sentencia) {
		this.sentencia = sentencia;
	}
    public String getCodConceptoContable() {
		return codConceptoContable;
	}
	public void setCodConceptoContable(String codConceptoContable) {
		this.codConceptoContable = codConceptoContable;
	}
	public String getTipoNotaCredito() {
		return tipoNotaCredito;
	}
	public void setTipoNotaCredito(String tipoNotaCredito) {
		this.tipoNotaCredito = tipoNotaCredito;
	}
	public String getNotaCreditoCodigoElectronico() {
		return notaCreditoCodigoElectronico;
	}
	public void setNotaCreditoCodigoElectronico(String notaCreditoCodigoElectronico) {
		this.notaCreditoCodigoElectronico = notaCreditoCodigoElectronico;
	}
	public Double getTipoCambioContableVenta() {
		return tipoCambioContableVenta;
	}
	public void setTipoCambioContableVenta(Double tipoCambioContableVenta) {
		this.tipoCambioContableVenta = tipoCambioContableVenta;
	}
	
	public String getNombreTecnico() {
		return nombreTecnico;
	}
	public void setNombreTecnico(String nombreTecnico) {
		this.nombreTecnico = nombreTecnico;
	}
	public String getKilometraje() {
		return kilometraje;
	}
	public void setKilometraje(String kilometraje) {
		this.kilometraje = kilometraje;
	}
	public String getCodOS() {
		return codOS;
	}
	public void setCodOS(String codOS) {
		this.codOS = codOS;
	}
	public String getTipoDocumento() {
		return tipoDocumento;
	}
	public void setTipoDocumento(String tipoDocumento) {
		this.tipoDocumento = tipoDocumento;
	}
	public String getFechaCancelacion() {
		return fechaCancelacion;
	}
	public void setFechaCancelacion(String fechaCancelacion) {
		this.fechaCancelacion = fechaCancelacion;
	}
	public String getMontoNeto() {
		return montoNeto;
	}
	public void setMontoNeto(String montoNeto) {
		this.montoNeto = montoNeto;
	}
	public String getMontoImpuesto() {
		return montoImpuesto;
	}
	public void setMontoImpuesto(String montoImpuesto) {
		this.montoImpuesto = montoImpuesto;
	}

	public String getTipoFacturaElectronica() {
		return tipoFacturaElectronica;
	}
	public void setTipoFacturaElectronica(String tipoFacturaElectronica) {
		this.tipoFacturaElectronica = tipoFacturaElectronica;
	}
	public String getTipoDocumentoReceptorElectronico() {
		return tipoDocumentoReceptorElectronico;
	}
	public void setTipoDocumentoReceptorElectronico(
			String tipoDocumentoReceptorElectronico) {
		this.tipoDocumentoReceptorElectronico = tipoDocumentoReceptorElectronico;
	}
	public String getDocumentoReceptorElectronico() {
		return DocumentoReceptorElectronico;
	}
	public void setDocumentoReceptorElectronico(String documentoReceptorElectronico) {
		DocumentoReceptorElectronico = documentoReceptorElectronico;
	}
	public String getSustentoNotaCredito() {
		return sustentoNotaCredito;
	}
	public void setSustentoNotaCredito(String sustentoNotaCredito) {
		this.sustentoNotaCredito = sustentoNotaCredito;
	}
	public String getCorrelativoFacturaElectronica() {
		return correlativoFacturaElectronica;
	}
	public void setCorrelativoFacturaElectronica(
			String correlativoFacturaElectronica) {
		this.correlativoFacturaElectronica = correlativoFacturaElectronica;
	}
	public Double getImpuestoIgv() {
		return impuestoIgv;
	}
	public void setImpuestoIgv(Double impuestoIgv) {
		this.impuestoIgv = impuestoIgv;
	}
	public String getAsegurado() {
		return asegurado;
	}
	public void setAsegurado(String asegurado) {
		this.asegurado = asegurado;
	}
	public String getFacturaTexto1() {
		return facturaTexto1;
	}
	public void setFacturaTexto1(String facturaTexto1) {
		this.facturaTexto1 = facturaTexto1;
	}
	public String getFacturaTexto2() {
		return facturaTexto2;
	}
	public void setFacturaTexto2(String facturaTexto2) {
		this.facturaTexto2 = facturaTexto2;
	}
	public double getItemPrecioIgv() {
		return itemPrecioIgv;
	}
	public void setItemPrecioIgv(double itemPrecioIgv) {
		this.itemPrecioIgv = itemPrecioIgv;
	}
	public int getCodigoOrigenFactura() {
		return codigoOrigenFactura;
	}
	public void setCodigoOrigenFactura(int codigoOrigenFactura) {
		this.codigoOrigenFactura = codigoOrigenFactura;
	}
	public String getMontoNetoSubtotal() {
		return montoNetoSubtotal;
	}
	public void setMontoNetoSubtotal(String montoNetoSubtotal) {
		this.montoNetoSubtotal = montoNetoSubtotal;
	}
	public String getItemCodigoOperacionMaestro() {
		return itemCodigoOperacionMaestro;
	}
	public void setItemCodigoOperacionMaestro(String itemCodigoOperacionMaestro) {
		this.itemCodigoOperacionMaestro = itemCodigoOperacionMaestro;
	}
	public String getItemCodigoOperacionServicio() {
		return itemCodigoOperacionServicio;
	}
	public void setItemCodigoOperacionServicio(String itemCodigoOperacionServicio) {
		this.itemCodigoOperacionServicio = itemCodigoOperacionServicio;
	}
	public String getDetraccion() {
		return detraccion;
	}
	public void setDetraccion(String detraccion) {
		this.detraccion = detraccion;
	}
	public String getUnidadMedidaElectronica() {
		return unidadMedidaElectronica;
	}
	public void setUnidadMedidaElectronica(String unidadMedidaElectronica) {
		this.unidadMedidaElectronica = unidadMedidaElectronica;
	}
	public String getRazonSocial() {
		return razonSocial;
	}
	public void setRazonSocial(String razonSocial) {
		this.razonSocial = razonSocial;
	}
	public String getTelefonoFax() {
		return telefonoFax;
	}
	public void setTelefonoFax(String telefonoFax) {
		this.telefonoFax = telefonoFax;
	}
	public String getEmailEmpresa() {
		return emailEmpresa;
	}
	public void setEmailEmpresa(String emailEmpresa) {
		this.emailEmpresa = emailEmpresa;
	}
	public String getDireccionSucursal() {
		return direccionSucursal;
	}
	public void setDireccionSucursal(String direccionSucursal) {
		this.direccionSucursal = direccionSucursal;
	}
	public String getTelefonoSucursal() {
		return telefonoSucursal;
	}
	public void setTelefonoSucursal(String telefonoSucursal) {
		this.telefonoSucursal = telefonoSucursal;
	}
	public double getIgvDecimal() {
		return igvDecimal;
	}
	public void setIgvDecimal(double igvDecimal) {
		this.igvDecimal = igvDecimal;
	}
	public double getIgvEnteroDecimal() {
		return igvEnteroDecimal;
	}
	public void setIgvEnteroDecimal(double igvEnteroDecimal) {
		this.igvEnteroDecimal = igvEnteroDecimal;
	}
	public String getTipoSerie() {
		return tipoSerie;
	}
	public void setTipoSerie(String tipoSerie) {
		this.tipoSerie = tipoSerie;
	}
	public String getFlagAnular() {
		return flagAnular;
	}
	public void setFlagAnular(String flagAnular) {
		this.flagAnular = flagAnular;
	}
	public String getFechaRelacionFactura() {
		return fechaRelacionFactura;
	}
	public void setFechaRelacionFactura(String fechaRelacionFactura) {
		this.fechaRelacionFactura = fechaRelacionFactura;
	}
	public double getCantidadFE() {
		return cantidadFE;
	}
	public void setCantidadFE(double cantidadFE) {
		this.cantidadFE = cantidadFE;
	}
	public String getCodModeloVersion() {
		return codModeloVersion;
	}
	public void setCodModeloVersion(String codModeloVersion) {
		this.codModeloVersion = codModeloVersion;
	}
	public int getAsesorVenta() {
		return asesorVenta;
	}
	public void setAsesorVenta(int asesorVenta) {
		this.asesorVenta = asesorVenta;
	}
	public String getIsc() {
		return isc;
	}
	public void setIsc(String isc) {
		this.isc = isc;
	}
	public String getCodSucursalAnexo() {
		return codSucursalAnexo;
	}
	public void setCodSucursalAnexo(String codSucursalAnexo) {
		this.codSucursalAnexo = codSucursalAnexo;
	}
	public String getCodUNSPC() {
		return codUNSPC;
	}
	public void setCodUNSPC(String codUNSPC) {
		this.codUNSPC = codUNSPC;
	}
	public BigDecimal getMontoAutorizado() {
		return montoAutorizado;
	}
	public void setMontoAutorizado(BigDecimal montoAutorizado) {
		this.montoAutorizado = montoAutorizado;
	}
	public String getCodTienda() {
		return codTienda;
	}
	public void setCodTienda(String codTienda) {
		this.codTienda = codTienda;
	}
	public String getNombreEmpresa() {
		return nombreEmpresa;
	}
	public void setNombreEmpresa(String nombreEmpresa) {
		this.nombreEmpresa = nombreEmpresa;
	}
	public String getCodigoComercio() {
		return codigoComercio;
	}
	public void setCodigoComercio(String codigoComercio) {
		this.codigoComercio = codigoComercio;
	}
	public int getCodFactura() {
		return codFactura;
	}
	public void setCodFactura(int codFactura) {
		this.codFactura = codFactura;
	}
	public int getCodigoMoneda() {
		return codigoMoneda;
	}
	public void setCodigoMoneda(int codigoMoneda) {
		this.codigoMoneda = codigoMoneda;
	}
	public String getUsuarioVisa() {
		return usuarioVisa;
	}
	public void setUsuarioVisa(String usuarioVisa) {
		this.usuarioVisa = usuarioVisa;
	}
	public String getClaveVisa() {
		return claveVisa;
	}
	public void setClaveVisa(String claveVisa) {
		this.claveVisa = claveVisa;
	}
	public String getTransaccionId() {
		return transaccionId;
	}
	public void setTransaccionId(String transaccionId) {
		this.transaccionId = transaccionId;
	}
	public int getCantidadBolsa() {
		return cantidadBolsa;
	}
	public void setCantidadBolsa(int cantidadBolsa) {
		this.cantidadBolsa = cantidadBolsa;
	}
	public String getIcb() {
		return icb;
	}
	public void setIcb(String icb) {
		this.icb = icb;
	}
	public BigDecimal getItemIcb() {
		return itemIcb;
	}
	public void setItemIcb(BigDecimal itemIcb) {
		this.itemIcb = itemIcb;
	}
	public String getImpuestoIcb() {
		return impuestoIcb;
	}
	public void setImpuestoIcb(String impuestoIcb) {
		this.impuestoIcb = impuestoIcb;
	}
	public String getSiniestro() {
		return siniestro;
	}
	public void setSiniestro(String siniestro) {
		this.siniestro = siniestro;
	}
	public String getPoliza() {
		return poliza;
	}
	public void setPoliza(String poliza) {
		this.poliza = poliza;
	}
	public int getCantidadBolsaAnterior() {
		return cantidadBolsaAnterior;
	}
	public void setCantidadBolsaAnterior(int cantidadBolsaAnterior) {
		this.cantidadBolsaAnterior = cantidadBolsaAnterior;
	}
	public String getClienteEmail() {
		return clienteEmail;
	}
	public void setClienteEmail(String clienteEmail) {
		this.clienteEmail = clienteEmail;
	}
	public int getVisaRespuesta() {
		return visaRespuesta;
	}
	public void setVisaRespuesta(int visaRespuesta) {
		this.visaRespuesta = visaRespuesta;
	}
	public String getNroCuotas() {
		return nroCuotas;
	}
	public void setNroCuotas(String nroCuotas) {
		this.nroCuotas = nroCuotas;
	}
	public String getFecVenceCuota() {
		return fecVenceCuota;
	}
	public void setFecVenceCuota(String fecVenceCuota) {
		this.fecVenceCuota = fecVenceCuota;
	}
	public String getTipoPago_relacionDoc() {
		return tipoPago_relacionDoc;
	}
	public void setTipoPago_relacionDoc(String tipoPago_relacionDoc) {
		this.tipoPago_relacionDoc = tipoPago_relacionDoc;
	}
	

}
