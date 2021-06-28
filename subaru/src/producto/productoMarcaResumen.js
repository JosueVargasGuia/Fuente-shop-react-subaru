
export default function ProductoMarcaResumen(props) {
  let rowPromo = props.marcaSelect.lstBannerPromocion.map((row) => (
    <ProductoResumenMarcaCard key={row.codigoMarca} promocion={row}></ProductoResumenMarcaCard>
  ));
 
  return (
    <>
      {props.marcaSelect.lstBannerPromocion.length !== 0 ? (
        <div className="prod-resumen">{rowPromo}</div>
      ) : (
        ""
      )}
    </>
  );
}

function ProductoResumenMarcaCard(props) {
   
  return (
    <div className="prod-resumen-card"  >
      <img
        src={props.promocion.srcImage}
        alt={props.promocion.descripcion}
      ></img>
    </div>
  );
}
export { ProductoResumenMarcaCard };
