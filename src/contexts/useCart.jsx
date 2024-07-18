import { createContext, useContext, useState, useMemo, useEffect } from "react";
import { useUser } from "./useUser";
import { useNavigate } from "react-router-dom";

const CartContext = createContext({});

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const getCart = async ({ carritoId }) => {
  const res = await fetch(`${SERVER_URL}/carritos/${carritoId}`);

  return res.json();
}

const postProductToCart = async ({ carritoId, product }) => {
  const res = await fetch(`${SERVER_URL}/carritos/items`, {
    method: "POST",
    body: JSON.stringify({
      carrito_id: carritoId,
      producto_id: product.id,
      estado: "in-cart",
      cantidad: 1,
    }),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const updateProductItem = async ({ productoId, estado, cantidad }) => {
  const res = await fetch(`${SERVER_URL}/carritos/items/${productoId}`, {
    method: "PUT",
    body: JSON.stringify({ estado, cantidad }),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });

  return res.json();
};

const removeProductFromCart = async ({ carritoId, productoId }) => {
  const res = await fetch(`${SERVER_URL}/carritos/${carritoId}/items/${productoId}`, {
    method: "DELETE",
  });

  return res.json();
};


export const CartProvider = ({ children }) => {
  const navigate = useNavigate();
  const { user } = useUser();
  const [cart, setCart] = useState(undefined);

  const refetch = async () => {
    if (user && user.carrito_id !== undefined) {
      const cartRes = await getCart({ carritoId: user.carrito_id })
      setCart(cartRes)
    }
  };

  const addToCart = async ({ product }) => {
    if (!cart) {
      navigate("/login");
      return;
    }

    await postProductToCart({ carritoId: user.carrito_id, product });
    await refetch();
  };

  const removeFromCart = async ({ producto }) => {
    if (!cart) {
      navigate("/login");
      return;
    }

    await removeProductFromCart({ carritoId: user.carrito_id, productoId: producto.id });
    await refetch();
  };

  const updateProduct = async ({ producto, cantidad, estado }) => {
    const newProduct = {
      cantidad: cantidad === undefined ? producto.cantidad : cantidad,
      estado: estado === undefined ? producto.estado : estado,
    };

    await updateProductItem({
      productoId: producto.id,
      cantidad: newProduct.cantidad,
      estado: newProduct.estado,
    });
    await refetch();

  }

  const value = useMemo(() => ({ cart, refetch, addToCart, removeFromCart, updateProduct }), [cart, refetch, addToCart, removeFromCart, updateProduct]);

  useEffect(() => {
    refetch();
  }, [user]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
