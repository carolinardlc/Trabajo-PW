import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './OrderList.css'; 

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const OrderList = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 2;

  const filteredOrders = orders.filter(order =>
    order.usuarioNombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.usuarioApellido.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.correo.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = filteredOrders.slice(indexOfFirstOrder, indexOfLastOrder);

  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);

  useEffect(() => {
    fetch(`${SERVER_URL}/ordenes`)
      .then((res) => res.json())
      .then((data) => setOrders(data));
  }, [])

  return (
    <div className="container">
      <nav className="sidebar">
        <ul>
          <li><Link to="/admin/orders">Lista de Órdenes</Link></li>
          <li><Link to="/admin/users">Lista de Usuarios</Link></li>
        </ul>
      </nav>
      <div className="content table-container">
        <h1>Órdenes</h1>
        <input
          type="text"
          placeholder="Buscar órdenes..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Nombre</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Correo</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {currentOrders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.usuarioNombre} {order.usuarioApellido}</td>
                <td>{order.fecha}</td>
                <td>S/{order.total}</td>
                <td>{order.correo}</td>
                <td>{order.estado}</td>
                <td className="actions">
                  <Link to={`/admin/orders/${order.id}`}>Ver</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="pagination">
          <button 
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} 
            disabled={currentPage === 1}
          >
            Anterior
          </button>
          <span>Página {currentPage} de {totalPages}</span>
          <button 
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))} 
            disabled={currentPage === totalPages}
          >
            Siguiente
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderList;
