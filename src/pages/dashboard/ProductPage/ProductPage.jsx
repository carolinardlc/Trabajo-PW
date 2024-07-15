import { Error } from "../../../components/Error";
import { addProductSchema } from "../../../schemas/product";
import { Sidebar } from "../components/Sidebar";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useLocation } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

export function ProductPage() {
  const location = useLocation();
  const productId = useMemo(
    () =>
      Number(location.pathname.slice(location.pathname.lastIndexOf("/") + 1)),
    [location.pathname],
  );
  const navigate = useNavigate();
  const [product, setProduct] = useState(undefined);

  const form = useForm({
    resolver: zodResolver(addProductSchema),
  });

  const onSubmit = form.handleSubmit((values) => {
    fetch(`http://localhost:8080/productos/${productId}`, {
      method: "PUT",
      body: values,
    });
    navigate("/dashboard/products");
  });

  useEffect(() => {
    fetch(`http://localhost:8080/productos/${productId}`)
      .then((res) => res.json())
      .then((data) => setProduct(data));
  }, []);

  useEffect(() => {
    if (product) {
      form.setValue("img", product.img);
      form.setValue("nombre", product.nombre);
      form.setValue("price", String(product.price));
    }
  }, [product]);

  return (
    <div className="flex gap-4 my-5 mx-12">
      <Sidebar />
      <div>
        <h1>Editar Producto</h1>
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <input type="text" placeholder="Image" {...form.register("img")} />
          <Error>{form.formState.errors.img}</Error>
          <input
            type="text"
            placeholder="Nombre"
            {...form.register("nombre")}
          />
          <Error>{form.formState.errors.nombre}</Error>
          <input
            type="number"
            placeholder="Precio"
            {...form.register("price")}
          />
          <Error>{form.formState.errors.price}</Error>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}
