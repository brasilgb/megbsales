
import { z } from "zod";

const productSchema = z.object({
    name: z.string({ message: "Digite o nome do produto." }),
    reference: z.string({ message: "Digite a referência." }),
    description: z.string({ message: "Digite a descrição." }),
    unidade: z.string({ message: "Selecione a unidade de medida." }),
    medida: z.string({ message: "Digite a quantidade de medida." }),
    price: z.string({ message: "Digite o preço." }),
});
export default productSchema;

export type ProductSchema = z.infer<typeof productSchema>;