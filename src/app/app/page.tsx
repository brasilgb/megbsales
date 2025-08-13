"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Users, Package, ShoppingCart, Plus, Eye, DollarSign } from "lucide-react"
import Link from "next/link"

export default function page() {

    const [stats] = useState({
        totalClients: 45,
        totalProducts: 128,
        totalOrders: 23,
        monthlyRevenue: 15420.5,
    })

    const [recentOrders] = useState([
        {
            id: "PED-001",
            client: "João Silva",
            total: 1250.0,
            status: "pending",
            date: "2024-01-15",
        },
        {
            id: "PED-002",
            client: "Maria Santos",
            total: 890.5,
            status: "completed",
            date: "2024-01-14",
        },
        {
            id: "PED-003",
            client: "Pedro Costa",
            total: 2100.0,
            status: "processing",
            date: "2024-01-13",
        },
    ])

    const getStatusColor = (status: string) => {
        switch (status) {
            case "completed":
                return "bg-green-100 text-green-800"
            case "processing":
                return "bg-blue-100 text-blue-800"
            case "pending":
                return "bg-yellow-100 text-yellow-800"
            default:
                return "bg-gray-100 text-gray-800"
        }
    }

    const getStatusText = (status: string) => {
        switch (status) {
            case "completed":
                return "Concluído"
            case "processing":
                return "Processando"
            case "pending":
                return "Pendente"
            default:
                return status
        }
    }

    return (
        <div className="space-y-6 sm:p-6 p-2">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-muted-foreground">Visão geral das suas vendas e atividades</p>
            </div>

            {/* Stats Cards */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total de Clientes</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalClients}</div>
                        <p className="text-xs text-muted-foreground">+2 novos este mês</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Produtos Cadastrados</CardTitle>
                        <Package className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalProducts}</div>
                        <p className="text-xs text-muted-foreground">+12 adicionados este mês</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Pedidos do Mês</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">{stats.totalOrders}</div>
                        <p className="text-xs text-muted-foreground">+8% em relação ao mês anterior</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Receita Mensal</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">
                            R$ {stats.monthlyRevenue.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                        </div>
                        <p className="text-xs text-muted-foreground">+15% em relação ao mês anterior</p>
                    </CardContent>
                </Card>
            </div>

            {/* Quick Actions */}
            <Card>
                <CardHeader>
                    <CardTitle>Ações Rápidas</CardTitle>
                    <CardDescription>Acesse rapidamente as principais funcionalidades</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                        <Link href="/app/orders/create">
                            <Button className="w-full h-20 flex flex-col gap-2">
                                <Plus className="h-6 w-6" />
                                Novo Pedido
                            </Button>
                        </Link>
                        <Link href="/app/customers/create">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                                <Users className="h-6 w-6" />
                                Novo Cliente
                            </Button>
                        </Link>
                        <Link href="/app/products/create">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                                <Package className="h-6 w-6" />
                                Novo Produto
                            </Button>
                        </Link>
                        <Link href="/app/orders">
                            <Button variant="outline" className="w-full h-20 flex flex-col gap-2 bg-transparent">
                                <Eye className="h-6 w-6" />
                                Ver Pedidos
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>

            {/* Recent Orders */}
            <Card>
                <CardHeader>
                    <CardTitle>Pedidos Recentes</CardTitle>
                    <CardDescription>Últimos pedidos realizados</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {recentOrders.map((order) => (
                            <div key={order.id} className="flex items-center justify-between p-4 border rounded-lg">
                                <div className="flex items-center space-x-4">
                                    <div>
                                        <p className="font-medium">{order.id}</p>
                                        <p className="text-sm text-muted-foreground">{order.client}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-4">
                                    <Badge className={getStatusColor(order.status)}>{getStatusText(order.status)}</Badge>
                                    <div className="text-right">
                                        <p className="font-medium">
                                            R$ {order.total.toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            {new Date(order.date).toLocaleDateString("pt-BR")}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-4">
                        <Link href="/app/orders">
                            <Button variant="outline" className="w-full bg-transparent">
                                Ver todos os pedidos
                            </Button>
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}