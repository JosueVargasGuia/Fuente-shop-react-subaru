import { homepage } from "../service/ENUM";

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
    <div className="prod-resumen-card" key={props.key}  >
      <img key={props.key}
        src={(homepage===undefined?"":"/"+homepage) +props.promocion.srcImage}
        alt={props.promocion.descripcion}
      ></img>
    </div>
  );
}
export { ProductoResumenMarcaCard };
