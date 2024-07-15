import { useState } from "react";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const removeFromCart = ({ carrito_id, producto_id }) => {
  fetch(`${SERVER_URL}/carritos/${carrito_id}/items/${producto_id}`, {
    method: "DELETE",
  });
};

const updateProductItem = ({ producto_id, estado, cantidad }) => {
  fetch(`${SERVER_URL}/carritos/items/${producto_id}`, {
    method: "PUT",
    body: JSON.stringify({ estado, cantidad }),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export function CartProduct({ product }) {
  const [previewProductQuantity, setPreviewProductQuantity] = useState(
    product.cantidad,
  );

  const remove = async () => {
    removeFromCart(product);
  };

  const move = async () => {
    if (product.estado === "in-cart") {
      updateProductItem({ ...product, estado: "saved" });
    }

    if (product.estado === "saved") {
      updateProductItem({ ...product, estado: "in-cart" });
    }
  };

  const changeProductQuantity = (newQuantity) => {
    updateProductItem({ ...product, cantidad: newQuantity });
  };

  return (
    <div className="flex gap-4 bg-white p-4">
      <img src={product.img} className="aspect-square w-[250px]" />
      <div className="flex-1">
        <h3>{product.nombre}</h3>
        <div className="flex gap-4">
          <button onClick={() => remove(product)}>Eliminar</button>
          <span>|</span>
          <button onClick={() => move(product)}>
            {product.estado === "in-cart" && "Guardar para después"}
            {product.estado === "saved" && "Mover al carrito"}
          </button>
        </div>
      </div>
      <input
        value={previewProductQuantity}
        onChange={(e) => setPreviewProductQuantity(e.target.value)}
        onBlur={(e) => {
          let newQuantity = e.target.value;

          if (!e.target.value) {
            newQuantity = 1;
          }

          setPreviewProductQuantity(newQuantity);
          changeProductQuantity(newQuantity);
        }}
        className="h-fit py-2 self-center"
        type="number"
      />
      <div className="flex flex-col">
        <h3>Precio</h3>
        <p>S/ {product.precio}</p>
      </div>
      <div className="flex flex-col">
        <h3>Subtotal</h3>
        <p>S/ {product.precio * product.cantidad}</p>
      </div>
    </div>
  );
}
