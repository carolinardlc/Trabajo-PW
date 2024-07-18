// import "./Main.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL; 

const Main = () => {
  const [series, setSeries] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/series`)
      .then((res) => res.json())
      .then((data) => setSeries(data));
    fetch(`${SERVER_URL}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <>
      <section className="flex flex-col gap-4">
        <h2>Colecciones Destacadas</h2>
        <div className="flex flex-wrap gap-16">
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
        <div className="flex flex-wrap">
          {productos.length === 0 && "No hay productos"}
          {productos.slice(0, 4).map((producto) => (
            <Link to={`/products/${producto.id}`} key={producto.id}>
              <img src={producto.img} width={200} className="aspect-square" />
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
