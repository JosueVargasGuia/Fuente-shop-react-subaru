import { useState } from "react";
import { HttpStatus } from "../service/ENUM";
import { uploadImagen } from "../service/producto.service";
export default function ImagenProducto() {
  const [fileByteBase64, setFileByteBase64] = useState(null);
  const [chrCodigoProducto, setChrCodigoProducto] = useState(null);
  function handleEnventReadFile(e) {
    let file = e.target.files[0];
    console.log(file);
    if (file !== undefined) {
      setChrCodigoProducto(file.name.replace(".png", "").replace(":PNG", ""));
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () {
        let _replace = "data:image/png;base64,";
        let filetext = reader.result.replace(_replace, "");
        setFileByteBase64(filetext);
      };
    } else {
      setFileByteBase64(null);
      setChrCodigoProducto(null);
    }
  }
  async function handleEnventEnviarFoto() {
    const rpt = await uploadImagen({
      chrCodigoProducto: chrCodigoProducto,
      fileByteBase64: fileByteBase64,
    });
    console.log(rpt);
    if (rpt.status === HttpStatus.HttpStatus_OK) {
      //const json = await rpt.json();
      setFileByteBase64(null);
      setChrCodigoProducto(null);
      window.location.reload();
    }
  }
  return (
    <>
      <div className="prod-img-upload">
        <input
          type="file"
          onChange={handleEnventReadFile}
          accept=".png"
        ></input>
        {fileByteBase64 !== null ? (
          <>
            <div className="prod-img-upload-detalle">
              <label>Codigo Producto:</label>
              {chrCodigoProducto}
              <br></br>

              <img
                src={"data:image/png;base64," + fileByteBase64}
                alt={chrCodigoProducto}
              ></img>
            </div>
            <div className="prod-img-upload-accion">
              <button
                className="btn btn-primary"
                onClick={handleEnventEnviarFoto}
              >
                Subir Foto
              </button>
            </div>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
