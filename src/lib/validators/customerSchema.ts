import { z } from "zod"

export const customerSchema = z.object({
  // user_id: z.string().min(1, "ID do usuário é obrigatório"),
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  cpf_cnpj: z.string().min(11, "CPF/CNPJ deve ter pelo menos 11 caracteres"),
  birth_date: z.date().min(1, "Data de nascimento é obrigatória"),
  email: z.email("Email inválido"),
  zip_code: z.string().min(8, "CEP deve ter 8 caracteres"),
  state: z.string().min(2, "Estado é obrigatório"),
  city: z.string().min(2, "Cidade é obrigatória"),
  district: z.string().min(2, "Bairro é obrigatório"),
  street: z.string().min(2, "Rua é obrigatória"),
  complement: z.string().optional(),
  number: z.string().min(1, "Número é obrigatório"),
  telephone: z.string().min(10, "Telefone deve ter pelo menos 10 caracteres"),
  contact_name: z.string().min(2, "Nome do contato é obrigatório"),
  whatsapp: z.string().min(10, "WhatsApp deve ter pelo menos 10 caracteres"),
  contact_telephone: z.string().min(10, "Telefone do contato deve ter pelo menos 10 caracteres"),
  observations: z.string().optional(),
})

export type CustomerFormData = z.infer<typeof customerSchema>