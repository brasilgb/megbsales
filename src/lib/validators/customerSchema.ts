import { z } from "zod"

export const customerSchema = z.object({
  // user_id: z.string().min(1, {error: "ID do usuário é obrigatório"),
  name: z.string().min(1, {error: "Nome é obrigatório"}),
  cpf_cnpj: z.string().min(1, {error: "CPF/CNPJ é obrigatório"}),
  birth_date: z.date().min(1, {error: "Data de nascimento é obrigatória"}),
  email: z.email("Email inválido"),
  zip_code: z.string().min(1, {error: "CEP é obrigatório"}),
  state: z.string().min(1, {error: "Estado é obrigatório"}),
  city: z.string().min(1, {error: "Cidade é obrigatória"}),
  district: z.string().min(1, {error: "Bairro é obrigatório"}),
  street: z.string().min(1, {error: "Rua é obrigatória"}),
  complement: z.string().optional(),
  number: z.string().min(1, {error: "Número é obrigatório"}),
  telephone: z.string().min(1, {error: "Telefone é obrigatórios"}),
  contact_name: z.string().min(1, {error: "Nome do contato é obrigatório"}),
  whatsapp: z.string().min(1, {error: "WhatsApp é obrigatório"}),
  contact_telephone: z.string().min(1, {error: "Telefone do contato é obrigatório"}),
  observations: z.string().optional(),
})

export type CustomerFormData = z.infer<typeof customerSchema>