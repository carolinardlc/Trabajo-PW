import { useForm } from "react-hook-form";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Separator } from "../../components/Separator";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import "./checkout-page.css";
import { useUser } from "../../contexts/useUser";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const createOrder = ({
  usuario_id,
  tipo_envio,
  subtotal,
  impuestos,
  total,
}) => {
  return fetch(`${SERVER_URL}/ordenes/`, {
    method: "POST",
    body: JSON.stringify({
      usuario_id,
      tipo_envio,
      subtotal,
      impuestos,
      total,
    }),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const removeFromCart = ({ carrito_id, producto_id }) => {
  fetch(`${SERVER_URL}/carritos/${carrito_id}/items/${producto_id}`, {
    method: "DELETE",
    mode: "cors",
  });
};

const updateDireccion = (direccionId, direccion) => {
  return fetch(`${SERVER_URL}/direcciones/${direccionId}`, {
    method: "PUT",
    body: JSON.stringify(direccion),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

const checkoutSchema = z.object({
  linea1: z.string().min(1),
  linea2: z.string(),
  distrito: z.string().min(1),
  provincia: z.string().min(1),
  pais: z.string().min(1),
  tipo_envio: z.literal("economico").or(z.literal("prioritario")),
});

const METODOS_DE_ENVIO = {
  economico: { label: "Económico Aéreo", amount: 10 },
  prioritario: { label: "Envío prioritario (5 o 10 días)", amount: 17 },
};

export function CheckoutPage() {
  const { user } = useUser();
  const [paymentMethod, setPaymentMethod] = useState("card"); // "card" or "qr"
  const [cart, setCart] = useState(undefined);
  const [direccion, setDireccion] = useState(undefined);

  useEffect(() => {
    if (user) {
      fetch(`${SERVER_URL}/carritos/${user.carrito_id}`)
        .then((res) => res.json())
        .then((data) => setCart(data));
      fetch(`${SERVER_URL}/direcciones/${user.direccion_id}`)
        .then((res) => res.json())
        .then((data) => setDireccion(data));
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(checkoutSchema),
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (direccion) {
      setValue("linea1", direccion.linea1);
      setValue("linea2", direccion.linea2);
      setValue("distrito", direccion.distrito);
      setValue("provincia", direccion.provincia);
      setValue("pais", direccion.pais);
    }
  }, [direccion]);

  if (!cart) {
    return null;
  }

  const cartProducts = cart.items.filter((item) => item.estado === "in-cart");

  const subtotalPrecio = cartProducts
    .map((product) => product.precio * product.cantidad)
    .reduce((partialSum, n) => partialSum + n, 0);
  const tipoEnvio = watch("tipo_envio");
  const envioPrecio = METODOS_DE_ENVIO[tipoEnvio]?.amount ?? 0;
  const totalPrecio = subtotalPrecio + envioPrecio;

  const onSubmit = handleSubmit((values) => {
    updateDireccion(user.direccion_id, values);

    if (cartProducts.length === 0) {
      return;
    }

    for (const product of cartProducts) {
      removeFromCart(product);
    }

    createOrder({
      usuario_id: user.id,
      tipo_envio: tipoEnvio,
      subtotal: subtotalPrecio,
      impuestos: 0,
      total: totalPrecio,
    })
      .then((res) => res.json())
      .then((data) => navigate(`/order/${data.id}`));
  });

  return (
    <div>
      <p>
        Casi listo! Tu orden no estará completa hasta que revises y presiones el
        botón {'"'}completar orden{'"'} al final de la página
      </p>
      <form className="checkout-page flex flex-col gap-4" onSubmit={onSubmit}>
        <Separator>Datos de compra</Separator>
        <div className="flex flex-row gap-4">
          <FormCard title="Dirección de Envio" className="flex-1 ">
            <input
              className="p-4"
              placeholder="Linea 1"
              {...register("linea1")}
            />
            <Error error={errors.linea1} />
            <input
              className="p-4"
              placeholder="Linea 2"
              {...register("linea2")}
            />
            <Error error={errors.linea2} />
            <input
              className="p-4"
              placeholder="Distrito"
              {...register("distrito")}
            />
            <Error error={errors.distrito} />
            <input
              className="p-4"
              placeholder="Provincia"
              {...register("provincia")}
            />
            <Error error={errors.provincia} />
            <input className="p-4" placeholder="País" {...register("pais")} />
            <Error error={errors.pais} />
          </FormCard>
          <FormCard title="Pago" className="flex-1">
            <div>
              <input
                disabled={true}
                onChange={() => setPaymentMethod("qr")}
                name="paymentMethod"
                type="radio"
                id="payment-method-qr"
              />
              <label htmlFor="payment-method-qr">Pago con Código QR</label>
            </div>
            <div>
              <input
                onChange={() => setPaymentMethod("card")}
                name="paymentMethod"
                type="radio"
                id="payment-method-card"
              />
              <label htmlFor="payment-method-card">
                Pago con tarjeta de crédito
              </label>
            </div>
            {paymentMethod === "card" && (
              <>
                <input className="p-4" placeholder="Número de tarjeta" />
                <input className="p-4" placeholder="Nombre en tarjeta" />
                <div className="flex gap-2">
                  <input className="p-4 flex-1" placeholder="Vencimiento" />
                  <input className="p-4 flex-1" placeholder="CCV" />
                </div>
              </>
            )}
          </FormCard>
        </div>
        <Separator>Método de Envío</Separator>
        <FormCard>
          <div className="flex gap-32">
            {Object.entries(METODOS_DE_ENVIO).map(
              ([method, { label, amount }]) => (
                <div key={method}>
                  <input
                    onChange={() => setValue("tipo_envio", method)}
                    name="tipo_envio"
                    type="radio"
                    id={`metodo-envio-${method}`}
                  />
                  <label htmlFor="metodo-envio-economico">
                    {label} - S/. {amount}
                  </label>
                </div>
              ),
            )}
          </div>
          {errors.tipo_envio && (
            <Error error={{ message: "Must select one" }} />
          )}
        </FormCard>
        <div className="flex gap-4">
          <FormCard className="flex-1" title="Items en Pedido:">
            <div className="p-8">
              {cartProducts.map((product) => (
                <div key={product.id} className="flex justify-between">
                  <p>
                    {product.cantidad} x {product.nombre}
                  </p>
                  <p>S/. {(product.cantidad ?? 1) * product.precio}</p>
                </div>
              ))}
            </div>
          </FormCard>
          <FormCard className="flex-1" title="Resumen de Orden:">
            <div className="flex flex-col p-4">
              <div className="flex justify-between">
                <p>Subtotal</p>
                <p>S/. {subtotalPrecio}</p>
              </div>
              <div className="flex justify-between">
                <p>Envío</p>
                <p>S/. {envioPrecio}</p>
              </div>
              <div className="flex justify-between">
                <p>Total</p>
                <p>S/. {totalPrecio}</p>
              </div>
            </div>
            <button
              type="submit"
              className="bg-black py-4 px-8 text-white border-0 cursor-pointer"
            >
              Completar Orden
            </button>
          </FormCard>
        </div>
      </form>
    </div>
  );
}

function FormCard({ title, children, className, ...props }) {
  return (
    <fieldset className={`bg-white border-0 ${className}`} {...props}>
      {title && <h3>{title}</h3>}
      <div className="flex flex-col gap-2">{children}</div>
    </fieldset>
  );
}

function Error({ error }) {
  if (!error) {
    return null;
  }

  return <span className="text-red-500">{error.message}</span>;
}
