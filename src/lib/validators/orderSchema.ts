import { z } from "zod"

export const orderSchema = z.object({
  customer_id: z.string({ error: "O cliente é obrigatório"}).optional(),
  product: z.string({ error: "O produto é obrigatório"}).optional(),
  unity: z.string({ error: "A quantidade é obrigatória" }).optional(),
  quantity: z.string({ error: "A quantidade é obrigatória" }).optional(),
  price: z.string({ error: "A quantidade é obrigatória" }).optional(),
  total: z.string({ error: "A quantidade é obrigatória" }).optional()
})

export type OrderFormData = z.infer<typeof orderSchema>