import { homepage } from "../service/ENUM";

export default function ProductoMarcaResumen(props) {
  let rowPromo = props.marcaSelect.lstBannerPromocion.map((row) => (
    <ProductoResumenMarcaCard key={row.codigoBanner} promocion={row}></ProductoResumenMarcaCard>
  ));
 
  return (
    <>
      {props.marcaSelect.lstBannerPromocion.length !== 0 ? (
        
        <div className="prod-resumen" key="1"> {rowPromo}</div>
      ) : (
        ""
      )}
    </>
  );
}

function ProductoResumenMarcaCard(props) {
   
  return (
    <div className="prod-resumen-card" key={props.promocion.codigoBanner}  >
      <img key={props.promocion.codigoBanner}
        src={(homepage===undefined?"":"/"+homepage) +props.promocion.srcImage}
        alt={props.promocion.descripcion}
        loading='lazy'
      ></img>
    </div>
  );
}
export { ProductoResumenMarcaCard };
