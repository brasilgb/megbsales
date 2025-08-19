"use client"

import type React from "react"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { OrderFormData, orderSchema } from "@/lib/validators/orderSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { PlusIcon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

type OrdersFormProps = {
    order?: OrderFormData & { id: string }
    customers: any
    products: any
}

export default function OrderForm({ customers, products, order }: OrdersFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalProduct, setTotalProduct] = useState<any>([]);
    const [productSelected, setProductSelected] = useState<any>([]);

    const form = useForm({
        defaultValues: order ? {
            customer_id: order.customer_id,
            product_id: order.product_id,
            quantity: order.quantity,
            price: order.price,
            total: order.total
        }
            : undefined,
        resolver: zodResolver(orderSchema)
    });

    const handleInsertItem = (value: string) => {
        // setProductSelected([...productSelected, form.getValues('product_id')]);
        // let productid = form.getValues('product_id');
        const filtered = products.find((p: any) => (p.id === value));
        const dataproduct = {
            id: filtered.id,
            name: filtered.name,
            reference: filtered.reference,
            description: filtered.description,
            unity: filtered.unity,
            measure: filtered.measure,
            price: filtered.price
        }
        setProductSelected([...productSelected, dataproduct]);
    }
    
    const handleTotalProduct = (value: any, pro: any) => {
        
        const totaldata = {
            id: pro.id,
            data: parseInt(value.target.value) * parseFloat(pro?.price)
        }
        setTotalProduct([...totalProduct, totaldata])
    }

    async function onSubmit(values: OrderFormData) {
        console.log(values);

    }

    return (
        <Form {...form}>
            <Card className="p-4">
                <FormField control={form.control} name="customer_id" render={({ field }) => (
                    <FormItem className="md:col-span-1">
                        <FormLabel>Clientes</FormLabel>
                        <FormControl>
                            <Select  {...field}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione o cliente" />
                                </SelectTrigger>
                                <SelectContent>
                                    {customers.map((customer: any) => (
                                        <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
            </Card>
            <Card className="p-4 mt-4">
                <div className="">
                    <FormField control={form.control} name="customer_id" render={({ field }) => (
                        <FormItem className="md:col-span-1">
                            <FormLabel>Produtos</FormLabel>
                            <FormControl>
                                <Select  {...field} onValueChange={(value) => handleInsertItem(value)}>
                                    <SelectTrigger className="w-full">
                                        <SelectValue placeholder="Selecione o produto" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {products.map((product: any) => (
                                            <SelectItem key={product.id} value={product.id}>{product.id} - {product.name}</SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )} />
                </div>
                {productSelected.length > 0 &&
                    <div className="flex-col">
                        <Table>
                            <TableHeader>
                                <TableHead>Nome do produto</TableHead>
                                <TableHead>Unidade</TableHead>
                                <TableHead>Valor Unidade</TableHead>
                                <TableHead>Quantidade</TableHead>
                                <TableHead>Total</TableHead>
                            </TableHeader>
                            <TableBody>
                                {productSelected.map((pro: any) => (
                                    <TableRow key={pro.id}>
                                        <TableCell>{pro.name}</TableCell>
                                        <TableCell>{pro.unity}</TableCell>
                                        <TableCell>{pro.price}</TableCell>
                                        <TableCell>
                                            <FormField control={form.control} name="quantity" render={({ field }) => (
                                                <FormItem>
                                                    <FormControl><Input {...field} type={'number'} onChange={(value) => handleTotalProduct(value, pro)} /></FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )} />
                                        </TableCell>
                                        
                                        <TableCell>{totalProduct?.filter((t: any) => (t.id === pro.id)).map((t: any) => (t.total))}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                }

                <div className="flex justify-end">
                    <Button
                        type="button"
                    >
                        <PlusIcon /> Adicionar item
                    </Button>
                </div>

            </Card>
        </Form>
    )
}