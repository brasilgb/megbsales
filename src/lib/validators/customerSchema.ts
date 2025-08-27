import { z } from "zod"
import { isCPF, isCNPJ } from 'validation-br'
const validateCpfCnpj = (num: string) => {
    if (num.length < 12) {
        return isCPF(num);
    }
    if (num.length > 11) {
        return isCNPJ(num);
    }
};
export const customerSchema = z.object({
  // user_id: z.string().min(1, {error: "ID do usuário é obrigatório"),
  name: z.string({error: "Nome é obrigatório"}),
  cnpj: z.string({error: "CPF/CNPJ é obrigatório"})
  .refine(value => validateCpfCnpj(value), {error: "CPF/CNPJ inválido!"}),
  birth_date: z.date({error: "Data de nascimento é obrigatória"}).optional(),
  email: z.email("Email inválido"),
  zip_code: z.string({error: "CEP é obrigatório"}),
  state: z.string({error: "Estado é obrigatório"}),
  city: z.string({error: "Cidade é obrigatória"}),
  district: z.string({error: "Bairro é obrigatório"}),
  street: z.string({error: "Rua é obrigatória"}),
  complement: z.string().optional(),
  number: z.string({error: "Número é obrigatório"}),
  telephone: z.string({error: "Telefone é obrigatórios"}),
  whatsapp: z.string({error: "WhatsApp é obrigatório"}),
  contact_name: z.string({error: "Nome do contato é obrigatório"}).optional(),
  contact_telephone: z.string({error: "Telefone do contato é obrigatório"}).optional(),
  observations: z.string().optional(),
})

export type CustomerFormData = z.infer<typeof customerSchema>