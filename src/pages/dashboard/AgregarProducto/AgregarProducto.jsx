import { Error } from "../../../components/Error";
import { addProductSchema } from "../../../schemas/product";
import { Sidebar } from "../components/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const createProduct = (values) => {
  return fetch(`${SERVER_URL}/productos`, {
    method: "POST",
    body: JSON.stringify(values),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export function AgregarProductoPage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    createProduct({ ...values, serie_id: 1 });
    navigate("/dashboard/products");
  });

  return (
    <div className="flex my-5 mx-12">
      <Sidebar />
      <div>
        <h1>Agregar Producto</h1>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Nombre"
            {...form.register("nombre")}
          />
          <Error>{form.formState.errors.nombre}</Error>
          <input
            type="number"
            placeholder="Precio"
            {...form.register("precio")}
          />
          <Error>{form.formState.errors.price}</Error>
          <input type="text" placeholder="Marca" {...form.register("marca")} />
          <Error>{form.formState.errors.marca}</Error>
          <textarea
            type="text"
            placeholder="Descripción"
            {...form.register("descripcion")}
          />
          <Error>{form.formState.errors.descripcion}</Error>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
