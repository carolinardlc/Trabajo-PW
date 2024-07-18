import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './UserList.css'; 

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 2;

  const filteredUsers = users.filter(user =>
    user.usuario.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.id.includes(searchTerm.toLowerCase())
  );

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(filteredUsers.length / usersPerPage);

  useEffect(() => {
    fetch(`${SERVER_URL}/usuarios`)
      .then((res) => res.json())
      .then((data) => setUsers(data));
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
        <h1>Usuarios registrados</h1>
        <input
          type="text"
          placeholder="Buscar usuarios..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Usuario</th>
              <th>Rol</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.usuario}</td>
                <td>{user.rol}</td>
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

export default UserList;

