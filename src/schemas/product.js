import { z } from "zod";

export const addProductSchema = z.object({
  img: z.string().min(1),
  nombre: z.string().min(1),
  precio: z
    .string()
    .transform(Number)
    .refine((n) => n >= 1, { message: "Price must be at least 1" }),
  marca: z.string().min(1),
  descripcion: z.string().min(1),
});
