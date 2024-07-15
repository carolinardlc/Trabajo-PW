import { useEffect, useState } from "react";
import "./principal.css";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

export const Principal = () => {
  const [ordenes, setOrdenes] = useState([]);
  const [usuarios, setUsuarios] = useState([]);
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch(`${SERVER_URL}/ordenes`)
      .then((res) => res.json())
      .then((data) => setOrdenes(data));
    fetch(`${SERVER_URL}/usuarios`)
      .then((res) => res.json())
      .then((data) => setUsuarios(data));
    fetch(`${SERVER_URL}/productos`)
      .then((res) => res.json())
      .then((data) => setProductos(data));
  }, []);

  return (
    <>
      <div className="muestra">
        <header>
          <p>Dashboard</p>
        </header>

        <div className="dashboard">
          <div>
            <h2>{ordenes.length}</h2>
            <p>Ordenes</p>
          </div>
          <div>
            <h2>{usuarios.length}</h2>
            <p>Usuarios</p>
          </div>
          <div>
            <h2>{productos.length}</h2>
            <p>Productos</p>
          </div>
        </div>
      </div>
    </>
  );
};
