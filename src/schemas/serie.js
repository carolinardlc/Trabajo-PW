import { z } from "zod";

export const addSerieSchema = z.object({
  img: z.string().min(1),
  nombre: z.string().min(1),
});
