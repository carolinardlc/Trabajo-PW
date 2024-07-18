import { useState } from "react";
import { useCart } from "../../../../contexts/useCart";

export function CartProduct({ producto }) {
  const { updateProduct, removeFromCart } = useCart();

  const [previewProductQuantity, setPreviewProductQuantity] = useState(
    producto.cantidad,
  );

  const move = async () => {
    if (producto.estado === "in-cart") {
      updateProduct({ producto, estado: "saved" });
    }

    if (producto.estado === "saved") {
      updateProduct({ producto, estado: "in-cart" });
    }
  };

  const changeProductQuantity = (newQuantity) => {
    updateProduct({ producto, cantidad: newQuantity });
  };

  return (
    <div className="flex gap-4 bg-white p-4">
      <img src={producto.img} className="aspect-square w-[250px]" />
      <div className="flex-1">
        <h3>{producto.nombre}</h3>
        <div className="flex gap-4">
          <button onClick={() => removeFromCart({ producto })}>Eliminar</button>
          <span>|</span>
          <button onClick={() => move(producto)}>
            {producto.estado === "in-cart" && "Guardar para después"}
            {producto.estado === "saved" && "Mover al carrito"}
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
        <p>S/ {producto.precio}</p>
      </div>
      <div className="flex flex-col">
        <h3>Subtotal</h3>
        <p>S/ {producto.precio * producto.cantidad}</p>
      </div>
    </div>
  );
}
