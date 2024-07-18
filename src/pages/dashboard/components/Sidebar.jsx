import { Link } from "react-router-dom";

import "./sidebar.css";

export function Sidebar() {
  return (
    <>
      <div className="listado">
        <ul>
          Admin
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            {/* TODO */}

            <Link to="/admin/users">Usuarios registrados</Link>

           

          </li>
          <li>
            <Link to="/dashboard/products">Productos</Link>
          </li>
          <li>
            {/* TODO */}

            <Link to="/admin/orders">Ordenes</Link>

            

          </li>
          <li>
            {/* TODO */}
            <Link to="/dashboard/series">Series</Link>
          </li>
        </ul>
      </div>
    </>
  );
}
