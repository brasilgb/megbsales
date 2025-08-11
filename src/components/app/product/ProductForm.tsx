"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner"
import { useState } from "react";
import { ProductFormData, productSchema } from "@/lib/validators/productSchema";
import { Switch } from "@/components/ui/switch";
import { useRouter } from "next/navigation";

type ProductFormProps = {
  product?: ProductFormData & { id: string }
}
export function ProductForm({product}: ProductFormProps) {
  const [isLoading, setIsLoading] = useState(false);
const router = useRouter();

  const form = useForm<ProductFormData>({
    // Valores padrão, se necessário
    defaultValues: product ? {
      name: product?.name,
      reference: product?.reference,
      description: product?.description,
      unity: product?.unity,
      measure: product?.measure,
      price: product?.price,
      enabled: product?.enabled
    }
    : undefined,
    resolver: zodResolver(productSchema),
  });

  async function onSubmit(values: ProductFormData) {
    setIsLoading(true);
    if (product) {
      try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products/${product.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Falha ao editar produto.');
      }

      toast("Sucesso!",
        {
          description: "Produto editado com sucesso.",
        });
      
    } catch (error) {
      toast("Erro",
        {
          description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
        });
      } finally {
        setIsLoading(false);
    }
    } else {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
          },
          body: JSON.stringify(values),
        });
  
        const result = await response.json();
  
        if (!response.ok) {
          throw new Error(result.error || 'Falha ao cadastrar produto.');
        }
  
        toast("Sucesso!",
          {
            description: "Produto cadastrado com sucesso.",
          });
        form.reset();
      } catch (error) {
        toast("Erro",
          {
            description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
          });
        } finally {
          setIsLoading(false);
          router.push("/app/products");
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Dados Pessoais */}
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Nome do produto</FormLabel>
              <FormControl><Input placeholder="produto" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="reference" render={({ field }) => (
            <FormItem>
              <FormLabel>Referência</FormLabel>
              <FormControl><Input placeholder="A97T54" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="description" render={({ field }) => (
            <FormItem className="md:col-span-6 lg:col-span-3">
              <FormLabel>Descrição</FormLabel>
              <FormControl><Input type="text" placeholder="" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>
        {/* Endereço */}
        <div className="pt-4 mt-4 grid md:grid-cols-3 gap-4">
          <FormField control={form.control} name="unity" render={({ field }) => (
            <FormItem className="md:col-span-1">
              <FormLabel>Unidade de medida</FormLabel>
              <FormControl><Input placeholder="Kg" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="measure" render={({ field }) => (
            <FormItem>
              <FormLabel>Quantidade</FormLabel>
              <FormControl><Input placeholder="" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="price" render={({ field }) => (
            <FormItem>
              <FormLabel>Preço</FormLabel>
              <FormControl><Input placeholder="0.00" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        {/* Contato */}
        <div className="md:col-span-2 lg:col-span-3 pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <FormField control={form.control} name="enabled" render={({ field }) => (
            <FormItem>
              <FormLabel>Habilitado</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

        </div>
        <div className="flex items-center justify-end">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
            {isLoading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </form>
    </Form >
  );
}