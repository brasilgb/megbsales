"use client"

import type React from "react"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { OrderFormData, orderSchema } from "@/lib/validators/orderSchema"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { MinusIcon, Package2, PlusIcon, ShoppingCart, User2Icon } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { set } from "zod"
import { maskMoney } from "@/lib/mask"
import { Badge } from "@/components/ui/badge"

type OrdersFormProps = {
    order?: OrderFormData & { id: string }
    customers: any
    products: any
}

type Item = {
    id: number;
    name: number;
    reference: string;
    description: string;
    unity: string;
    quantity: 1;
    price: number;
}

export default function OrderForm({ customers, products, order }: OrdersFormProps) {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);
    const [totalProduct, setTotalProduct] = useState<any>([]);
    const [items, setItems] = useState<Item[]>([]);
    const [customerSelected, setCustomerSelected] = useState<any>([]);
    const [gerarPedido, setGerarPedido] = useState<boolean>(false);

    const form = useForm({
        defaultValues: order ? {
            customer_id: `${customerSelected[0].id}`,
            product: order.product,
            quantity: order.quantity,
            price: order.price,
            total: order.total
        }
            : undefined,
        resolver: zodResolver(orderSchema)
    });

    const handleInsertItem = (productId: string) => {
        const productFiltered = products.find((p: any) => (p.id === productId));
        if (productFiltered) {
            const newItem: Item = {
                id: productFiltered.id,
                name: productFiltered.name,
                reference: productFiltered.reference,
                description: productFiltered.description,
                unity: productFiltered.unity,
                quantity: productFiltered.quantity,
                price: productFiltered.price
            }

            const existingItemIndex = items.findIndex(item => item.id === newItem.id);
            if (existingItemIndex > -1) {
                const updatedItems = [...items];
                updatedItems[existingItemIndex].quantity += 1;
                setItems(updatedItems);
            } else {
                setItems([...items, newItem]);
            }
        }
    }

    const handleTotalProduct = (qtd: number, productId: number, price: number) => {
        const productIndex = totalProduct.findIndex((p: any) => p.productId === productId);
        const newTotal = qtd * price;
        if (productIndex > -1) {
            const updatedProducts = totalProduct.map((product: any, index: number) => {
                if (index === productIndex) {
                    return { ...product, quantity: qtd, total: newTotal };
                }
                return product;
            });
            setTotalProduct(updatedProducts);
        }
        else {
            setTotalProduct([
                ...totalProduct,
                { productId: productId, quantity: qtd, total: newTotal } // Adiciona o novo item
            ]);
        }
    };

    const handleCustomerSelected = (value: any) => {
        const customerFiltered = customers.filter((c: any) => (c.id === value));
        if (customerFiltered) {
            setCustomerSelected(customerFiltered);
        }
    }

    const handleRemoveItem = (productId: number) => {
        setItems(items.filter(item => item.id !== productId));
    }

    async function onSubmit(values: OrderFormData) {
        console.log(values);
    }

    return (
        <>
            <Card className="p-4">
                <CardHeader className="flex justify-start items-center border-b font-semibold text-lg text-gray-600">
                    <User2Icon className="h-6 w-6" />
                    Selecione o cliente
                </CardHeader>
                <CardContent>
                    <div>
                        <Select onValueChange={(value) => handleCustomerSelected(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o cliente" />
                            </SelectTrigger>
                            <SelectContent>
                                {customers.map((customer: any) => (
                                    <SelectItem key={customer.id} value={customer.id}>{customer.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {customerSelected.length > 0 &&
                        <div className="flex items-center justify-between mt-4 text-sm">
                            <div><span className="font-semibold">CNPJ:</span>{customerSelected[0].cpf_cnpj}</div>
                            <div><span className="font-semibold">UF:</span>{customerSelected[0].state}</div>
                            <div><span className="font-semibold">Cidade:</span>{customerSelected[0].city}</div>
                            <div><span className="font-semibold">Endereço:</span>{customerSelected[0].street}</div>
                            <div><span className="font-semibold">Telefone:</span>{customerSelected[0].telephone}</div>
                        </div>
                    }
                </CardContent>
            </Card>
            <Card className="p-4 mt-4">
                <CardHeader className="flex justify-start items-center border-b font-semibold text-lg text-gray-600">
                    <Package2 className="h-6 w-6" />
                    Selecione os produtos do pedido
                </CardHeader>
                <CardContent>
                    <div>
                        <Select onValueChange={(value) => handleInsertItem(value)}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecione o produto" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((product: any) => (
                                    <SelectItem key={product.id} value={product.id}>{product.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {items.length > 0 &&
                        <div className="flex-col">
                            <Table>
                                <TableHeader>
                                    <TableHead>Nome do produto</TableHead>
                                    <TableHead>Unidade</TableHead>
                                    <TableHead>Valor Unidade</TableHead>
                                    <TableHead>Quantidade</TableHead>
                                    <TableHead><div className="flex justify-end items-center font-semibold">Total</div></TableHead>
                                    <TableHead></TableHead>
                                </TableHeader>
                                <TableBody>
                                    {items.map((pro: any) => (
                                        <TableRow key={pro.id}>
                                            <TableCell>{pro.name}</TableCell>
                                            <TableCell>{pro.unity}</TableCell>
                                            <TableCell>R$ {maskMoney(pro.price)}</TableCell>
                                            <TableCell className="md:w-28">
                                                <Input
                                                    value={totalProduct?.filter((f: any) => (f.productId === pro.id)).map((t: any) => (t.quantity))}
                                                    type={'number'}
                                                    onChange={(value: any) => handleTotalProduct(value.target.value, pro.id, pro.price)}
                                                    className="md:w-28"
                                                />
                                            </TableCell>

                                            <TableCell>
                                                <div className="flex justify-end items-center font-semibold">
                                                    R$ {maskMoney((totalProduct?.filter((f: any) => (f.productId === pro.id)).map((t: any) => (t.total))).toString())}
                                                </div>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex justify-end items-center">
                                                    <Button variant={'destructive'} size={'icon'} type="button" onClick={() => handleRemoveItem(pro.id)}>
                                                        <MinusIcon className="h-6 w-6" />
                                                    </Button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </div>
                    }
                </CardContent>
                <CardFooter>
                    <div className="flex justify-end">
                        <Button
                            disabled={items.length === 0}
                            type="button"
                            onClick={() => setGerarPedido(true)}
                        >
                            <PlusIcon /> Gerar pedido
                        </Button>
                    </div>
                </CardFooter>
            </Card>

            {gerarPedido &&
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <Card className="p-4 mt-4">
                            <CardHeader className="flex justify-between items-center border-b font-semibold text-lg text-gray-600">
                                <div className="flex items-center gap-2"><ShoppingCart className="h-6 w-6" /> Detalhes do pedido</div>
                                <Badge variant={'destructive'}>{items.length} itens</Badge>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableHead>Nome do produto</TableHead>
                                        <TableHead>Unidade</TableHead>
                                        <TableHead>Valor Unidade</TableHead>
                                        <TableHead>Quantidade</TableHead>
                                        <TableHead><div className="flex justify-end items-center font-semibold">Total</div></TableHead>
                                        <TableHead></TableHead>
                                    </TableHeader>
                                    <TableBody>
                                        {items.map((pro: any) => (
                                            <TableRow key={pro.id}>
                                                <TableCell>{pro.name}</TableCell>
                                                <TableCell>{pro.unity}</TableCell>
                                                <TableCell>R$ {maskMoney(pro.price)}</TableCell>
                                                <TableCell className="md:w-28">
                                                    <FormField control={form.control} name="quantity" render={({ field }) => (
                                                        <FormItem>
                                                            <FormControl>
                                                                <Input
                                                                    {...field}
                                                                    type={'number'}
                                                                    defaultValue={totalProduct?.filter((f: any) => (f.productId === pro.id)).map((t: any) => (t.quantity))}
                                                                    onChange={(value: any) => handleTotalProduct(value.target.value, pro.id, pro.price)}
                                                                    className="md:w-28"
                                                                />
                                                            </FormControl>
                                                            <FormMessage />
                                                        </FormItem>
                                                    )} />
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end items-center font-semibold">
                                                        R$ {maskMoney((totalProduct?.filter((f: any) => (f.productId === pro.id)).map((t: any) => (t.total))).toString())}
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex justify-end items-center">
                                                        <Button variant={'destructive'} size={'icon'} type="button" onClick={() => handleRemoveItem(pro.id)}>
                                                            <MinusIcon className="h-6 w-6" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>

                                <FormField control={form.control} name="customer_id" render={({ field }) => (
                                    <FormItem>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                defaultValue={`${customerSelected[0].id}`}
                                                onChange={(e) => form.setValue('customer_id', e.target.value)}
                                                className="md:w-28"
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />

                            </CardContent>
                            <CardFooter>
                                <div className="flex justify-end">
                                    <Button
                                        type="submit"
                                    >
                                        Finalizar pedido
                                    </Button>
                                </div>
                            </CardFooter>
                        </Card >
                    </form>
                </Form>
            }
        </>
    )
}