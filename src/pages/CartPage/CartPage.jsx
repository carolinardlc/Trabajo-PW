import { CartProduct } from "./components/CartProduct";
import { Separator } from "../../components/Separator";

import "./cart-page.css";
import { Link } from "react-router-dom";
import { useCart } from "../../contexts/useCart";

export function CartPage() {
  const { cart } = useCart();

  if (cart === undefined) {
    return null;
  }

  const cartProducts = cart.items.filter((item) => item.estado === "in-cart");
  const savedProducts = cart.items.filter((item) => item.estado === "saved");

  const subtotalPrice = cartProducts
    .map((product) => product.precio * product.cantidad)
    .reduce((partialSum, n) => partialSum + n, 0);

  return (
    <div>
      <h1>{cartProducts.length} Items en tu Carrito de Compras</h1>
      <div className="products-container">
        <Separator>
          <h2>Items disponibles para Envío</h2>
        </Separator>
        {cartProducts.map((product) => (
          <CartProduct key={product.id} producto={product} />
        ))}
        <div className="checkout-container">
          <h4>Subtotal: S/ {subtotalPrice}</h4>
          <div className="checkout-button">
            <Link to="/checkout">Checkout</Link>
          </div>
        </div>
      </div>
      <div>
        <Separator>
          <h2>Guardado para después</h2>
        </Separator>
        {savedProducts.map((product) => (
          <CartProduct key={product.id} producto={product} />
        ))}
      </div>
    </div>
  );
}
