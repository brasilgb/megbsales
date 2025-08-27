"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, ShoppingCart, FileText } from "lucide-react"
import { toast } from "sonner"

// Mock data
const clientes = [
  {
    id: 1,
    nome: "Pet Shop Amigo Fiel",
    cnpj: "12.345.678/0001-90",
    telefone: "(11) 99999-9999",
    cidade: "São Paulo",
    endereco: "Rua das Flores, 123 - Centro",
  },
  {
    id: 2,
    nome: "Mundo Pet",
    cnpj: "98.765.432/0001-10",
    telefone: "(11) 88888-8888",
    cidade: "Rio de Janeiro",
    endereco: "Av. Principal, 456 - Copacabana",
  },
]

const produtos = [
  {
    id: 1,
    nome: "Ração Premium Cães Adultos",
    unidade: "Saco 15kg",
    valor: 89.9,
  },
  {
    id: 2,
    nome: "Areia Sanitária Gatos",
    unidade: "Saco 10kg",
    valor: 25.5,
  },
  {
    id: 3,
    nome: "Brinquedo Corda",
    unidade: "Unidade",
    valor: 12.9,
  },
]

const orderSchema = z.object({
  customerId: z.string().min(1, "Selecione um cliente"),
  productId: z.string().min(1, "Selecione um produto"),
  quantity: z.number().min(1, "Quantidade deve ser maior que 0"),
})

type OrderForm = z.infer<typeof orderSchema>

interface OrderItem {
  productId: number
  nome: string
  unidade: string
  valorUnitario: number
  quantidade: number
  total: number
}

interface Order {
  customerId: number
  items: OrderItem[]
  total: number
}

export default function PedidosPage() {
  const [selectedCustomer, setSelectedCustomer] = useState<(typeof clientes)[0] | null>(null)
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [showSummary, setShowSummary] = useState(false)

  const form = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    defaultValues: {
      customerId: "",
      productId: "",
      quantity: 1,
    },
  })

  const handleCustomerSelect = (customerId: string) => {
    const customer = clientes.find((c) => c.id.toString() === customerId)
    setSelectedCustomer(customer || null)
    form.setValue("customerId", customerId)
  }

  const handleAddProduct = (data: OrderForm) => {
    const produto = produtos.find((p) => p.id.toString() === data.productId)
    if (!produto) return

    const existingItemIndex = orderItems.findIndex((item) => item.productId === produto.id)

    if (existingItemIndex >= 0) {
      const updatedItems = [...orderItems]
      updatedItems[existingItemIndex].quantidade += data.quantity
      updatedItems[existingItemIndex].total = updatedItems[existingItemIndex].quantidade * produto.valor
      setOrderItems(updatedItems)
    } else {
      const newItem: OrderItem = {
        productId: produto.id,
        nome: produto.nome,
        unidade: produto.unidade,
        valorUnitario: produto.valor,
        quantidade: data.quantity,
        total: produto.valor * data.quantity,
      }
      setOrderItems([...orderItems, newItem])
    }

    form.reset({
      customerId: data.customerId,
      productId: "",
      quantity: 1,
    })

    toast("Produto adicionado",{
      description: `${produto.nome} foi adicionado ao pedido.`,
    })
  }

  const handleRemoveItem = (productId: number) => {
    setOrderItems(orderItems.filter((item) => item.productId !== productId))
    toast("Produto removido",{
      description: "Item removido do pedido.",
    })
  }

  const calculateTotal = () => {
    return orderItems.reduce((sum, item) => sum + item.total, 0)
  }

  const handleGenerateOrder = () => {
    if (!selectedCustomer || orderItems.length === 0) {
      toast("Erro",{ 
        description: "Selecione um cliente e adicione produtos ao pedido."
      })
      return
    }
    setShowSummary(true)
  }

  const handleFinishOrder = async () => {
    if (!selectedCustomer) return

    const order: Order = {
      customerId: selectedCustomer.id,
      items: orderItems,
      total: calculateTotal(),
    }

    try {
      // Aqui você faria a chamada para sua API Node.js
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(order),
      })

      if (response.ok) {
        toast("Pedido finalizado!",{
          description: "Pedido gravado com sucesso no banco de dados.",
        })

        // Reset form
        setSelectedCustomer(null)
        setOrderItems([])
        setShowSummary(false)
        form.reset()
      } else {
        throw new Error("Erro ao salvar pedido")
      }
    } catch (error) {
      toast("Erro",{
        description: "Erro ao finalizar pedido. Tente novamente.",
      })
    }
  }

  if (showSummary) {
    return (
      <div className="container mx-auto p-6 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-space-grotesk">
              <FileText className="h-6 w-6" />
              Resumo do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Customer Info */}
            <div className="bg-card p-4 rounded-lg">
              <h3 className="font-semibold text-card-foreground mb-2">Cliente</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
                <p>
                  <strong>Nome:</strong> {selectedCustomer?.nome}
                </p>
                <p>
                  <strong>CNPJ:</strong> {selectedCustomer?.cnpj}
                </p>
                <p>
                  <strong>Telefone:</strong> {selectedCustomer?.telefone}
                </p>
                <p>
                  <strong>Cidade:</strong> {selectedCustomer?.cidade}
                </p>
                <p className="md:col-span-2">
                  <strong>Endereço:</strong> {selectedCustomer?.endereco}
                </p>
              </div>
            </div>

            {/* Order Items */}
            <div>
              <h3 className="font-semibold mb-4">Itens do Pedido</h3>
              <div className="space-y-2">
                {orderItems.map((item) => (
                  <div key={item.productId} className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <div>
                      <p className="font-medium">{item.nome}</p>
                      <p className="text-sm text-muted-foreground">{item.unidade}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">
                        {item.quantidade}x R$ {item.valorUnitario.toFixed(2)} = R$ {item.total.toFixed(2)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Total */}
            <div className="border-t pt-4">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total do Pedido:</span>
                <span className="text-primary">R$ {calculateTotal().toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <Button variant="outline" onClick={() => setShowSummary(false)}>
                Voltar
              </Button>
              <Button onClick={handleFinishOrder} className="flex-1">
                Finalizar Pedido
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold font-space-grotesk text-primary mb-2">Sistema de Pedidos</h1>
        <p className="text-muted-foreground">Gerencie seus pedidos de forma simples e eficiente</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Customer Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="font-space-grotesk">Selecionar Cliente</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="w-full">
              <Label htmlFor="customer">Cliente</Label>
              <Select onValueChange={handleCustomerSelect}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Selecione um cliente" />
                </SelectTrigger>
                <SelectContent>
                  {clientes.map((cliente) => (
                    <SelectItem key={cliente.id} value={cliente.id.toString()}>
                      {cliente.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {selectedCustomer && (
              <div className="bg-card p-4 rounded-lg space-y-2">
                <h4 className="font-semibold text-card-foreground">Dados do Cliente</h4>
                <div className="grid grid-cols-1 gap-1 text-sm">
                  <p>
                    <strong>CNPJ:</strong> {selectedCustomer.cnpj}
                  </p>
                  <p>
                    <strong>Telefone:</strong> {selectedCustomer.telefone}
                  </p>
                  <p>
                    <strong>Cidade:</strong> {selectedCustomer.cidade}
                  </p>
                  <p>
                    <strong>Endereço:</strong> {selectedCustomer.endereco}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Product Selection */}
        <Card>
          <CardHeader>
            <CardTitle className="font-space-grotesk">Adicionar Produtos</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={form.handleSubmit(handleAddProduct)} className="space-y-4">
              <div>
                <Label htmlFor="product">Produto</Label>
                <Select onValueChange={(value) => form.setValue("productId", value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Selecione um produto" />
                  </SelectTrigger>
                  <SelectContent>
                    {produtos.map((produto) => (
                      <SelectItem key={produto.id} value={produto.id.toString()}>
                        <div>
                          <p className="font-medium">{produto.nome}</p>
                          <p className="text-sm text-muted-foreground">
                            {produto.unidade} - R$ {produto.valor.toFixed(2)}
                          </p>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="quantity">Quantidade</Label>
                <Input type="number" min="1" {...form.register("quantity", { valueAsNumber: true })} />
              </div>

              <Button type="submit" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Produto
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>

      {/* Order Items */}
      {orderItems.length > 0 && (
        <Card className="mt-6">
          <CardHeader>
            <CardTitle className="font-space-grotesk flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Itens do Pedido
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {orderItems.map((item) => (
                <div key={item.productId} className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <div className="flex-1">
                    <h4 className="font-medium">{item.nome}</h4>
                    <p className="text-sm text-muted-foreground">{item.unidade}</p>
                    <div className="flex items-center gap-4 mt-2">
                      <Badge variant="secondary">Qtd: {item.quantidade}</Badge>
                      <span className="text-sm">R$ {item.valorUnitario.toFixed(2)} cada</span>
                      <span className="font-semibold text-primary">Total: R$ {item.total.toFixed(2)}</span>
                    </div>
                  </div>
                  <Button variant="destructive" size="sm" onClick={() => handleRemoveItem(item.productId)}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>

            <div className="border-t mt-6 pt-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total Geral:</span>
                <span className="text-xl font-bold text-primary">R$ {calculateTotal().toFixed(2)}</span>
              </div>
              <Button onClick={handleGenerateOrder} className="w-full" size="lg">
                Gerar Pedido
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
