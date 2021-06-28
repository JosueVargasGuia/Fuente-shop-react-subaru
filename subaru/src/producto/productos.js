import ProductosCard from "./productoCard";
import Pagination from "../utils/paginacion";
import Loading from "../utils/loading";

export default function Productos(props) {
  
  let rowproductos = [];
  let _totalRegistros = 0;
  for (let index = 0; index < props.lstProducto.length; index++) {
    const obj = props.lstProducto[index];
    _totalRegistros = obj.totalRegistros;
    rowproductos.push(
      <ProductosCard
        moneda={props.moneda}
        producto={obj}
        key={obj.chrCodigoProducto}
      ></ProductosCard>
    );
  }

  function onPageChanged(data, e) { 
    /*Siempre que se raliza un render, esta funcion se ejecuta */
      props.handlePaginacionEvent(data.currentPage);
  }
  return (
    <>
      <div className="producto-paginacion">
        <Pagination className="producto-paginacion"
          totalRecords={_totalRegistros}
          pageLimit={props.limite}
          pageNeighbours={2}
          onPageChanged={(page, e)=>onPageChanged(page,e)}
        />
      </div>
      {rowproductos.length===0? 
      props.search.chrcodigofamilia==='----'?'': <Loading></Loading>
      :<div className="producto-lista">{rowproductos}</div>}
      
    </>
  );
}
