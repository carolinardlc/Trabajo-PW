import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import { useUser } from "../../contexts/useUser";

const Register = () => {
  const [usuario, setUsuario] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const { register, login } = useUser();
  const navigate = useNavigate();

  const handleRegistro = async (e) => {
    e.preventDefault();
    if (password != confirmPassword) {
      setError("Las contraseñas no coinciden");
      return;
    }

    const usr = { usuario, password };

    const err = await register(usr);
    await login(usr);

    if (!err) {
      navigate("/");
      return;
    }

    setError(err);
  };

  return (
    <div className="register-body">
      <div className="register-container">
        <h2 className="unique-register-title">Register</h2>
        <form onSubmit={handleRegistro} className="register-form">
          <label>
            Usuario:
            <input
              type="usuario"
              value={usuario}
              onChange={(e) => setUsuario(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Contraseña:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <label>
            Confirmar contraseña:
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <br />
          <div className="error">{error}</div>
          <button type="submit" className="button">
            Registrarse
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
