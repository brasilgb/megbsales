import { z } from "zod"

export const productSchema = z.object({
  // user_id: z.string().min(1, "ID do usuário é obrigatório"),
  name: z.string({error: "O nome é obrigatório"}),
  reference: z.string({error: "A referência é obrigatória"}),
  description: z.string({error: "A descrição é obrigatória"}),
  unity: z.string({error: "A unidade de medida é obrigatório"}),
  measure: z.string({error: "A medida é obrigatória"}),
  price: z.string({error:"O preço é obrigatório"}),
  enabled: z.boolean().optional()
})

export type ProductFormData = z.infer<typeof productSchema>