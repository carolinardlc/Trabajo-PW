import { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

import './estiloSerieLista.css'

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ListaSerie = () => {
  const [series, setSeries] = useState([])

  useEffect(() => {
    fetch(`${SERVER_URL}/series`)
      .then((res) => res.json())
      .then((data) => setSeries(data));
  }, [])

  return (
    <>
      <header>
        <h2>TIENDA</h2>
      </header>
      <section id="medio1">
        <article className="Admin">
          <h3 className="admi">Admin</h3>
          <ul type="none">
            <li>Dashboard</li>
            <br />
            <li>Usuarios registrados</li>
            <br />
            <li>Productos</li>
            <br />
            <li>Órdenes</li>
            <br />
            <li>Series</li>
          </ul>
        </article>
        <article className="SeriesTodo">
          <h3 className="series">Series</h3>
          <Link className="py-1 px-2 bg-black text-white" to="/dashboard/series/agregar">
            Agregar Serie
          </Link>
          <input id="Buscarserie" type="text" placeholder="Buscar por nombre, descripción o ID..." />

          <article id="tabla">
            <table>
              <thead  >
                <tr className="columna">
                  <th id="item1">ID</th>
                  <th id="item2">Nombre</th>
                  <th id="item6">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {series.map((serie) => (
                  <tr key={serie.id} className="columna">
                    <td>{serie.id}</td>
                    <td>{serie.nombre}</td>
                    <td><Link to={`/dashboard/series/${serie.id}`}>Ver</Link></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </article>

          <div className="button-container">
            <button className="btn0"><b>&lt; Anterior</b></button>
            <button className="btn">1</button>
            <button className="btn">2</button>
            <button className="btn">3</button>
            <button className="btn">4</button>
            <button className="btn">5</button>
            <button className="btn">...</button>
            <button className="btn">7</button>
            <button className="btn0"><b>Siguiente &gt;</b></button>
          </div>
        </article>

      </section>

      <footer>
        <article className="pie">
          <div className="footer1">
            <h1 className="tienda">LA TIENDITA DE DON PEPE</h1>
            <p>@2010-2020</p>
            <p>Privacy-Terms</p>
          </div>
          <div className="footer2">
            <h3 className="til">Cuenta</h3>
            <ul className="wo" type="none">
              <li className="we">Login</li>

              <li className="we">Registro</li>

              <li className="we">Carrito</li>
            </ul>
          </div>
          <div className="footer3">
            <h3 className="til">Productos</h3>
            <ul className="wo" type="none">
              <li className="we">Más vendidos</li>

              <li className="we">Nuevos</li>

              <li className="we">Ofertas</li>
            </ul>
          </div>
          <div className="footer4">
            <h3 className="til">Ayuda</h3>
            <ul className="wo" type="none">
              <li className="we">Acerca de nosotros</li>

              <li className="we">Política de envío</li>

              <li className="we">FAQ</li>
            </ul>
          </div>
          <div className="footer5">
            <img src="src\assets\logosredes.png" className="logos" />
          </div>

        </article>
      </footer>
    </>
  )
}

export default ListaSerie;
