"use client"

import type React from "react"

import { use, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ArrowLeft, Save, Plus, Trash2, Search } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Customer, OrderItem, Product } from "@/types/typesapp"

export default function AddOrder() {

    const router = useRouter()
    const [selectedClient, setSelectedClient] = useState<Customer | null>(null)
    const [orderItems, setOrderItems] = useState<OrderItem[]>([])
    const [searchProduct, setSearchProduct] = useState("")
    const [showProductSearch, setShowProductSearch] = useState(false)
    const [dataCustomers, setDataCustomers] = useState<Customer[]>([])
    const [dataProducts, setDataProducts] = useState<Product[]>([])

    useEffect(() => {
        const getCustomers = async () => {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}customers`, {
                    cache: 'no-store',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const { data } = await response.json();
                setDataCustomers(data);

            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }
        getCustomers();
    }, []);

    useEffect(() => {
        const getProducts = async () => {

            try {
                const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
                    cache: 'no-store',
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });

                const { data } = await response.json();
                setDataProducts(data);

            } catch (error) {
                console.error('Erro ao buscar produtos:', error);
            }
        }
        getProducts();
    }, []);

    const filteredProducts = dataProducts?.filter((product: any) =>
        product.name.toLowerCase().includes(searchProduct.toLowerCase()) &&
        !orderItems.some((item: any) => item.productId === product.id),
    )

    const addProduct = (product: Product) => {
        const newItem: OrderItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            total: product.price,
        }
        setOrderItems([...orderItems, newItem])
        setSearchProduct("")
        setShowProductSearch(false)
    }

    const updateQuantity = (productId: string, quantity: number) => {
        if (quantity <= 0) {
            removeItem(productId)
            return
        }

        setOrderItems(
            orderItems.map((item) =>
                item.productId === productId ? { ...item, quantity, total: item.price * quantity } : item,
            ),
        )
    }

    const removeItem = (productId: string) => {
        setOrderItems(orderItems.filter((item) => item.productId !== productId))
    }

    const calculateTotal = () => {
        return orderItems.reduce((sum, item) => sum + item.total, 0)
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!selectedClient) {
            alert("Selecione um cliente")
            return
        }

        if (orderItems.length === 0) {
            alert("Adicione pelo menos um produto ao pedido")
            return
        }

        try {
            const orderData = {
                clientId: selectedClient.id,
                items: orderItems,
                total: calculateTotal(),
            }

            // Aqui será feita a chamada para a API
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(orderData),
            })

            if (!response.ok) {
                throw new Error("Erro ao criar pedido")
            }
            const data = await response.json()

            console.log("Dados do pedido:", orderData)

            // Simular sucesso
            alert("Pedido criado com sucesso!" + data)
            router.push("/app/orders")
        } catch (error) {
            console.error(`Erro ao criar pedido: ${error}}`)
            // alert("Erro ao criar pedido. Tente novamente.")
        }
    }

    return (
        <div className="space-y-6 sm:p-6 p-2">
            <div className="flex items-center gap-4">
                <Link href="/app/orders">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Novo Pedido</h1>
                    <p className="text-muted-foreground">Crie um novo pedido de venda</p>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="grid gap-6 lg:grid-cols-3">
                    <div className="lg:col-span-2 space-y-6">
                        {/* Seleção do Cliente */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Cliente</CardTitle>
                                <CardDescription>Selecione o cliente para este pedido</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-2">
                                    <Label htmlFor="client">Cliente *</Label>
                                    <Select
                                        onValueChange={(value) => {
                                            const client = dataCustomers.find((c) => c.id === value)
                                            setSelectedClient(client || null)
                                        }}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Selecione um cliente" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {dataCustomers.map((client) => (
                                                <SelectItem key={client.id} value={client.id} className="flex-1">
                                                    <div className="w-full">
                                                        <div className="font-medium">{client.name}</div>
                                                        <div className="text-sm text-muted-foreground">{client.company}</div>
                                                    </div>
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedClient && (
                                    <div className="mt-4 p-4 bg-muted rounded-lg">
                                        <h4 className="font-medium">{selectedClient.name}</h4>
                                        <p className="text-sm text-muted-foreground">{selectedClient.company}</p>
                                        <p className="text-sm text-muted-foreground">{selectedClient.email}</p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>

                        {/* Produtos do Pedido */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Produtos</CardTitle>
                                <CardDescription>Adicione produtos ao pedido</CardDescription>
                            </CardHeader>
                            <CardContent>
                                {/* Busca de Produtos */}
                                <div className="space-y-4">
                                    <div className="flex gap-2">
                                        <div className="relative flex-1">
                                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                            <Input
                                                placeholder="Buscar produtos para adicionar..."
                                                value={searchProduct}
                                                onChange={(e) => {
                                                    setSearchProduct(e.target.value)
                                                    setShowProductSearch(e.target.value.length > 0)
                                                }}
                                                className="pl-8"
                                            />
                                        </div>
                                    </div>

                                    {/* Lista de produtos para adicionar */}
                                    {showProductSearch && filteredProducts.length > 0 && (
                                        <div className="border rounded-lg p-2 bg-background">
                                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                                {filteredProducts.map((product) => (
                                                    <div
                                                        key={product.id}
                                                        className="flex items-center justify-between p-2 hover:bg-muted rounded cursor-pointer"
                                                        onClick={() => addProduct(product)}
                                                    >
                                                        <div>
                                                            <div className="font-medium">{product.name}</div>
                                                            <div className="text-sm text-muted-foreground">
                                                                Estoque: {product.stock} | R${" "}
                                                                {product.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                                            </div>
                                                        </div>
                                                        <Button size="sm" variant="outline">
                                                            <Plus className="h-4 w-4" />
                                                        </Button>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                    {/* Tabela de itens do pedido */}
                                    {orderItems.length > 0 && (
                                        <div className="rounded-md border">
                                            <Table>
                                                <TableHeader>
                                                    <TableRow>
                                                        <TableHead>Produto</TableHead>
                                                        <TableHead className="w-[100px]">Qtd</TableHead>
                                                        <TableHead className="w-[120px]">Preço Unit.</TableHead>
                                                        <TableHead className="w-[120px]">Total</TableHead>
                                                        <TableHead className="w-[50px]"></TableHead>
                                                    </TableRow>
                                                </TableHeader>
                                                <TableBody>
                                                    {orderItems.map((item) => (
                                                        <TableRow key={item.productId}>
                                                            <TableCell>
                                                                <div className="font-medium">{item.productName}</div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Input
                                                                    type="number"
                                                                    min="1"
                                                                    value={item.quantity}
                                                                    onChange={(e) =>
                                                                        updateQuantity(item.productId, Number.parseInt(e.target.value) || 0)
                                                                    }
                                                                    className="w-20"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                R$ {item.price.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                                            </TableCell>
                                                            <TableCell className="font-medium">
                                                                R$ {item.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                                            </TableCell>
                                                            <TableCell>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="sm"
                                                                    onClick={() => removeItem(item.productId)}
                                                                >
                                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                                </Button>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))}
                                                </TableBody>
                                            </Table>
                                        </div>
                                    )}

                                    {orderItems.length === 0 && (
                                        <div className="text-center py-8 text-muted-foreground">Nenhum produto adicionado ao pedido</div>
                                    )}
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Resumo do Pedido */}
                    <div className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Resumo do Pedido</CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>Itens:</span>
                                        <span>{orderItems.length}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span>Subtotal:</span>
                                        <span>R$ {calculateTotal().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                                    </div>
                                    <div className="border-t pt-2">
                                        <div className="flex justify-between font-medium">
                                            <span>Total:</span>
                                            <span>R$ {calculateTotal().toLocaleString("pt-BR", { minimumFractionDigits: 2 })}</span>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex gap-4">
                            <Button type="submit" className="flex-1" disabled={!selectedClient || orderItems.length === 0}>
                                <Save className="mr-2 h-4 w-4" />
                                Criar Pedido
                            </Button>
                            <Link href="/dashboard/orders">
                                <Button type="button" variant="outline">
                                    Cancelar
                                </Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    )
}
