import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../../../contexts/useUser";

const Header = () => {
  const { user } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (event) => {
    event.preventDefault();
    if (searchQuery) {
      navigate(`/search-results?query=${searchQuery}`);
    }
  };

  return (
    <>
      <div className="flex justify-between p-4">
        <section style={{ alignItems: "center" }} className="flex gap-4">
          <Link style={{ textDecoration: "none", color: "black", display: "flex" }} to="/">
            <img style={{borderRadius: 999}} className="rounded-full" width={50} height={50} src="https://static.vecteezy.com/system/resources/thumbnails/004/680/305/small/shoes-glyph-icon-free-vector.jpg" />
          </Link>
          <Link className="left" to="/#mas-vendidos">
            Más Vendidos
          </Link>
          <Link className="left" to="/#nuevos">
            Nuevos
          </Link>
        </section>
        <div style={{ alignItems: "center" }} className="flex gap-4">
          {user && user.rol === "admin" && <Link className="right" to="/dashboard">
            Dashboard
          </Link>}
          <Link className="right" to="/cart">
            Cart
          </Link>
          <Link className="right" to="/ayuda">
            Ayuda
          </Link>
        </div>
      </div>
      <div>
        <form className="search-bar" onSubmit={handleSearch}>
          <input
            className="search-bar"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Buscar productos por nombre..."
          />
          <button type="submit">Buscar</button>
        </form>
      </div>
    </>
  );
};

export { Header };
