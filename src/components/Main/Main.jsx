import "./Main.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const Main = () => {
  const [series, setSeries] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/series")
      .then((res) => res.json())
      .then((data) => setSeries(data));
    fetch("http://localhost:8080/productos")
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2>Colecciones Destacadas</h2>
        <div className="lineaSep" />
        <div className="flex flex-wrap gap-16 justify-center">
          {series.length === 0 && "No hay series"}
          {series.map((serie) => (
            <Link
              to={`/serie/${serie.id}`}
              key={serie.id}
              className="max-w-[20%] w-full"
            >
              <p>{serie.nombre}</p>
            </Link>
          ))}
        </div>
      </section>
      <section className="flex flex-col gap-4" id="mas-vendidos">
        <h2 id="#mas-vendidos">Más Vendidos del Mes</h2>
        <div className="lineaSep" />
        <div className="grid grid-cols-4 justify-center">
          {productos.length === 0 && "No hay productos"}
          {productos.slice(0, 4).map((producto) => (
            <Link to={`/product/${producto.id}`} key={producto.id}>
              <div className="relative w-56">
                <p>{producto.nombre}</p>
                <p>Marca: {producto.marca}</p>
                <p>Precio: ${producto.precio.toLocaleString()}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
};

export default Main;
