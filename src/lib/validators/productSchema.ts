import { z } from "zod"

export const productSchema = z.object({
  // user_id: z.string().min(1, "ID do usuário é obrigatório"),
  name: z.string().min(1, {error: "O nome é obrigatório"}),
  reference: z.string().min(1, {error: "A referência é obrigatória"}),
  description: z.string().min(1, {error: "A descrição é obrigatória"}),
  unity: z.string().min(1, {error: "A unidade de medida é obrigatório"}),
  measure: z.string().min(1, {error: "A medida é obrigatória"}),
  price: z.string().min(1, {error:"O preço é obrigatório"}),
  enabled: z.boolean()
})

export type ProductFormData = z.infer<typeof productSchema>