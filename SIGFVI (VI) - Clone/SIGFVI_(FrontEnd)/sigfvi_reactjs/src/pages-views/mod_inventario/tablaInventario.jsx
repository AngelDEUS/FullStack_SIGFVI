import React, { useEffect, useState } from "react";
import axios from "axios";
import TituloyDesc from "../../components/Titles/TituloyDesc";
import { Tabla_Stock_item } from "./tablainventarioitem";
import "./Inventario.css";
import "./AllStyle.css";
import "./pruebastyle.css";

const Gestion_Inventario = () => {
  const titulo = "Inventario";
  const descripcion =
    "En este panel es el encargado de gestionar las Cantidades de los Productos, ademas, el registro de entrada y salido de los productos.";
  
    const [datos, setDatos] = useState([]);

    const consulta = () => {
      axios
        .get("http://localhost:3001/consultaInventario")
        .then((response) => {
          console.log("Datos recibidos:", response.data.datos);
          setDatos(response.data.datos);
        })
        .catch((error) => {
          console.error("Error al obtener datos:", error);
        });
    };
  
    useEffect(() => {
      console.log("Realizando solicitud...");
      consulta();
    }, []);

  return (
    <>
      <div className="mod__inventario--s">
        <div className="encabezado__titulos">
          <TituloyDesc titulo={titulo} descripcion={descripcion} />
        </div>
        <div className="mod__inventario">
          <div className="inventario">
            <div className="subtitulo">
              <h3 className="subtitulo__h3">Inventario de Productos</h3>
            </div>
          </div>
          <div className="busqueda__prod">
            <div className="buscar_productos">
              <div className="right__b">
                <div className="buscar">
                  <i className="bi bi-search buscar_i"></i>
                  <div className="sep_vertical_b"></div>
                  <input
                    type="text"
                    placeholder="Buscar productos"
                    id="buscarProducto"
                  />
                  <button className="btn_buscar">Buscar</button>
                </div>
                <div className="sep_vertical_b--outS"></div>
              </div>
              <div className="left__b">
                <button className="btn_f limpiar">entrega Productos</button>

                <button className="btn_f cancelar">Reporte</button>
              </div>
            </div>
          </div>
          <section className="table__body">
            <table>
              <thead>
                <tr>
                  <th>Codigo</th>
                  <th>Nombre del Producto</th>
                  <th>Tipo Producto</th>
                  <th>Descripcion</th>
                  <th>Cantidad</th>
                </tr>
              </thead>
              <tbody>
              {!datos
                  ? "Loading....."
                  : datos.map((dato) => (
                      <Tabla_Stock_item
                        key={dato.ID_Producto_PK}
                        id={dato.ID_Producto_PK}
                        nombre={dato.Nombre_Producto}
                        tProducto={dato.Nombre_Tipo_Producto}
                        descripcion={dato.Descripcion}
                        cantidad={dato.Stock}
                      />
                    ))}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    </>
  );
};

export default Gestion_Inventario;
