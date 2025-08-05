// src/app/data.ts

export type Pessoa = {
  id: string
  name: string
  email: string
  cpfCnpj: string
}

export const data: Pessoa[] = [
  {
    id: "1",
    name: "João da Silva",
    email: "joao.silva@example.com",
    cpfCnpj: "123.456.789-00",
  },
  {
    id: "2",
    name: "Maria Oliveira",
    email: "maria.oliveira@example.com",
    cpfCnpj: "987.654.321-11",
  },
  {
    id: "3",
    name: "Tech Solutions Ltda",
    email: "contato@techsolutions.com",
    cpfCnpj: "12.345.678/0001-99",
  },
  {
    id: "4",
    name: "Ana Costa",
    email: "ana.costa@example.com",
    cpfCnpj: "111.222.333-44",
  },
  // Adicione mais 20+ entradas para testar a paginação
  {
    id: "5",
    name: "Pedro Martins",
    email: "pedro.m@example.com",
    cpfCnpj: "222.333.444-55",
  },
  {
    id: "6",
    name: "Inovatec SA",
    email: "financeiro@inovatec.com",
    cpfCnpj: "99.888.777/0001-66",
  },
    {
    id: "7",
    name: "Carlos Pereira",
    email: "carlos.p@example.com",
    cpfCnpj: "333.444.555-66",
  },
  {
    id: "8",
    name: "Beatriz Almeida",
    email: "bia.almeida@example.com",
    cpfCnpj: "444.555.666-77",
  },
  {
    id: "9",
    name: "Global Services",
    email: "suporte@globalservices.com",
    cpfCnpj: "10.203.040/0001-01",
  },
  {
    id: "10",
    name: "Lucas Fernandes",
    email: "lucas.f@example.com",
    cpfCnpj: "555.666.777-88",
  },
  {
    id: "11",
    name: "Juliana Souza",
    email: "ju.souza@example.com",
    cpfCnpj: "666.777.888-99",
  },
  {
    id: "12",
    name: "Consultoria XYZ",
    email: "consultoria@xyz.com",
    cpfCnpj: "01.928.374/0001-55",
  },
]