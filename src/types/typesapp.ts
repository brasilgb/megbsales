export interface Customer {
  id?: string
  user_id: string
  name: string
  cpf_cnpj: string
  birth_date: string
  email: string
  zip_code: string
  state: string
  city: string
  district: string
  street: string
  complement?: string
  number: string
  telephone: string
  contact_name: string
  whatsapp: string
  contact_telephone: string
  observations?: string
  created_at?: string
  updated_at?: string
}
