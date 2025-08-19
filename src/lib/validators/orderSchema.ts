import { z } from "zod"

export const orderSchema = z.object({
  customer_id: z.string({ error: "O cliente é obrigatório"}),
  product_id: z.string({ error: "O produto é obrigatório"}),
  quantity: z.string({ error: "A quantidade é obrigatória" }),
  price: z.string({ error: "A quantidade é obrigatória" }),
  total: z.string({ error: "A quantidade é obrigatória" })
})

export type OrderFormData = z.infer<typeof orderSchema>