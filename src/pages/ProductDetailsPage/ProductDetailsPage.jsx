import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useCart } from "../../contexts/useCart";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const ProductDetailsPage = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(undefined);

  useEffect(() => {
    fetch(`${SERVER_URL}/productos/${id}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  if (!product) {
    return null;
  }

  return (
    <div className="flex flex-col text-center items-center">
      <h1>{product.nombre}</h1>
      <img
        className="w-56 aspect-square object-cover rounded-2xl"
        src={product.img}
        alt={product.nombre}
      />
      <p>{product.description}</p>
      <p>Precio: S/ {product.precio}</p>
      <button
        className="px-8 py-4 bg-black rounded-md text-white border-0 cursor-pointer"
        onClick={() => addToCart({ product })}
      >
        Añadir al Carrito
      </button>
    </div>
  );
};

export default ProductDetailsPage;
