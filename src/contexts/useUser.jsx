import { createContext, useContext, useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getUsers = async () => {
  return await fetch(`${SERVER_URL}/usuarios`).then((res) =>
    res.json(),
  );
};

const createUser = ({ usuario, password, rol }) => {
  return fetch(`${SERVER_URL}/usuarios`, {
    method: "POST",
    body: JSON.stringify({ usuario, password, rol }),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(undefined);

  const login = async ({ usuario, password }) => {
    const users = await getUsers();

	  console.log("users", users)

    for (const usr of users) {
      if (usr.usuario === usuario && usr.password === password) {
        setCurrentUser(usr);
        return;
      }

      if (usr.usuario === usuario && usr.password !== password) {
        return "Contraseña invalida.";
      }
    }

    return `No user found with the usuario "${usuario}"`;
  };

  const register = async ({ usuario, password, rol }) => {
    const res = await createUser({ usuario, password, rol });

    if (res.status === 200) {
      const registeredUser = await res.json();
      setCurrentUser(registeredUser);
    } else {
      const message = await res.json();
      return message;
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user: currentUser,
        login,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useUser = () => useContext(AuthContext);
