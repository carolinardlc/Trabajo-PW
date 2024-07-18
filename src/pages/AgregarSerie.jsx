import { Error } from "../components/Error";
import { addSerieSchema } from "../schemas/serie";
import { Sidebar } from "./dashboard/components/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";

const SERVER_URL = import.meta.env.VITE_SERVER_URL;

const createSerie = (values) => {
  return fetch(`${SERVER_URL}/series`, {
    method: "POST",
    body: JSON.stringify(values),
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  });
};

export function AgregarSeriePage() {
  const navigate = useNavigate();

  const form = useForm({
    resolver: zodResolver(addSerieSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    createSerie(values);
    navigate("/dashboard/series");
  });

  return (
    <div className="flex my-5 mx-12">
      <Sidebar />
      <div>
        <h1>Agregar Producto</h1>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <input
            type="text"
            placeholder="Enlace a la imagen"
            {...form.register("img")}
          />
          <Error>{form.formState.errors.img}</Error>
          <input
            type="text"
            placeholder="Nombre"
            {...form.register("nombre")}
          />
          <Error>{form.formState.errors.nombre}</Error>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
