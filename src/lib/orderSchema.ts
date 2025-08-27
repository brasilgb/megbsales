// import { z } from "zod"

// export const orderSchema = z.object({
//   customer_id: z.string({ error: "O cliente é obrigatório"}).optional(),
//   product: z.string({ error: "O produto é obrigatório"}).optional(),
//   unity: z.string({ error: "A quantidade é obrigatória" }).optional(),
//   quantity: z.string({ error: "A quantidade é obrigatória" }).optional(),
//   price: z.string({ error: "A quantidade é obrigatória" }).optional(),
//   total: z.string({ error: "A quantidade é obrigatória" }).optional()
// })

// export type OrderFormData = z.infer<typeof orderSchema>

// lib/schemas.ts
import { z } from 'zod';

// Schema para um único item no pedido
export const orderItemSchema = z.object({
  productId: z.string().min(1, 'Selecione um produto'),
  productName: z.string(),
  unitType: z.string(),
  unitPrice: z.number().min(0, 'O preço unitário não pode ser negativo'),
  quantity: z.number().min(1, 'A quantidade deve ser pelo menos 1'),
  total: z.number(),
});

// Schema para o formulário de pedido completo
export const orderFormSchema = z.object({
  customerId: z.string().min(1, 'O cliente é obrigatório.'),
  items: z.array(orderItemSchema).min(1, 'O pedido deve ter pelo menos um item.'),
  // Não precisamos do total geral aqui, pois ele será calculado dinamicamente
});

// Extrai o tipo do schema para usar no nosso componente
export type OrderFormData = z.infer<typeof orderFormSchema>;