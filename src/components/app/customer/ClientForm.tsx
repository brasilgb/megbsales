"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { toast } from "sonner"
import { useState } from "react";
import { CustomerFormData, customerSchema } from "@/lib/validators/customerSchema";

interface ClientFormProps {
  onSuccess?: () => void; // Callback para fechar o modal
}

export function ClientForm({ onSuccess }: ClientFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<CustomerFormData>({
    resolver: zodResolver(customerSchema),
    // Valores padrão, se necessário
    defaultValues: {
      name: "",
      email: "",
    },
  });

  async function onSubmit(values: CustomerFormData) {
    setIsLoading(true);
console.log(values);


    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}customers`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.message || 'Falha ao cadastrar cliente.');
      }

      toast("Sucesso!",
        {
          description: "Cliente cadastrado com sucesso.",
        });
      form.reset(); // Limpa o formulário
      onSuccess?.(); // Chama o callback para, por exemplo, fechar o modal
    } catch (error) {
      console.error("Erro no formulário:", error);
      toast("Erro",
        {
          description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido.",
          variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Dados Pessoais */}
          <FormField control={form.control} name="name" render={({ field }) => (
            <FormItem className="lg:col-span-2">
              <FormLabel>Nome Completo</FormLabel>
              <FormControl><Input placeholder="João da Silva" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="cpf_cnpj" render={({ field }) => (
            <FormItem>
              <FormLabel>CPF/CNPJ</FormLabel>
              <FormControl><Input placeholder="000.000.000-00" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="email" render={({ field }) => (
            <FormItem className="md:col-span-2 lg:col-span-2">
              <FormLabel>Email</FormLabel>
              <FormControl><Input type="email" placeholder="exemplo@email.com" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
          <FormField control={form.control} name="birth_date" render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Data de Nascimento</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button variant={"outline"} className={cn("pl-3 text-left font-normal", !field.value && "text-muted-foreground")}>
                      {field.value ? format(field.value, "PPP", { locale: ptBR }) : <span>Escolha uma data</span>}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar mode="single" selected={field.value} onSelect={field.onChange} initialFocus />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )} />

          {/* Endereço */}
          <div className="md:col-span-2 lg:col-span-3 border-t pt-4 mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
            <FormField control={form.control} name="zip_code" render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>CEP</FormLabel>
                <FormControl><Input placeholder="00000-000" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="state" render={({ field }) => (
              <FormItem className="md:col-span-1">
                <FormLabel>Estado</FormLabel>
                <FormControl><Input placeholder="SP" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="city" render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Cidade</FormLabel>
                <FormControl><Input placeholder="São Paulo" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>
          <div className="md:col-span-2 lg:col-span-3 grid grid-cols-1 md:grid-cols-6 gap-4">
            <FormField control={form.control} name="street" render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Rua / Logradouro</FormLabel>
                <FormControl><Input placeholder="Av. Principal" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="district" render={({ field }) => (
              <FormItem className="md:col-span-2">
                <FormLabel>Bairro</FormLabel>
                <FormControl><Input placeholder="Centro" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="number" render={({ field }) => (
              <FormItem>
                <FormLabel>Número</FormLabel>
                <FormControl><Input placeholder="123" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="complement" render={({ field }) => (
              <FormItem>
                <FormLabel>Complemento</FormLabel>
                <FormControl><Input placeholder="Apto 101" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          {/* Contato */}
          <div className="md:col-span-2 lg:col-span-3 border-t pt-4 mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <FormField control={form.control} name="telephone" render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone</FormLabel>
                <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="whatsapp" render={({ field }) => (
              <FormItem>
                <FormLabel>WhatsApp</FormLabel>
                <FormControl><Input placeholder="(11) 99999-9999" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="contact_name" render={({ field }) => (
              <FormItem>
                <FormLabel>Nome do Contato</FormLabel>
                <FormControl><Input placeholder="Maria" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="contact_telephone" render={({ field }) => (
              <FormItem>
                <FormLabel>Telefone do Contato</FormLabel>
                <FormControl><Input placeholder="(11) 88888-8888" {...field} /></FormControl>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <FormField control={form.control} name="observations" render={({ field }) => (
            <FormItem className="md:col-span-2 lg:col-span-3">
              <FormLabel>Observações</FormLabel>
              <FormControl><Textarea placeholder="Cliente prefere contato via WhatsApp..." className="resize-y" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
          {isLoading ? "Salvando..." : "Salvar Cliente"}
        </Button>
      </form>
    </Form>
  );
}