'use client'

import { Badge } from '@/components/ui/badge';
import { AlertCircleIcon, PlusCircleIcon, Trash2Icon } from 'lucide-react';
import React, { useState, useEffect, useMemo } from 'react';
import { toast } from 'sonner';

// --- Tipagens ---
interface Customer {
    id: number;
    name: string;
    cpf_cnpj: string;
}

interface Product {
    id: number;
    name: string;
    reference: string;
    price: number;
}

interface OrderItem {
    productId: number;
    name: string;
    quantity: number;
    unitPrice: number;
    total: number;
}

interface NotificationState {
    message: string;
    type: 'success' | 'error' | '';
}

async function getFlex(userid: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}flex/${userid}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
    })
    const data = await response.json();
    return data?.data;
}

// --- Componente Principal da Página de Pedidos ---
export default function OrderForm({ customers, products }: any) {
    const [valueFlex, setValueFlex] = useState<any>([]);
    useEffect(() => {
        const getUserId = async () => {
            const userstring: any = await localStorage.getItem("authUser")
            const user = await JSON.parse(userstring);
            const allFlex = await getFlex(user.id);
            setValueFlex(allFlex);
        };
        getUserId();
    }, []);

    const [loading, setLoading] = useState<boolean>(false);

    // --- Estados do formulário do pedido ---
    const [selectedCustomerId, setSelectedCustomerId] = useState<string>('');
    const [orderItems, setOrderItems] = useState<OrderItem[]>([]);
    const [flex, setFlex] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);


    // --- Estados para o seletor de produtos ---
    const [selectedProductId, setSelectedProductId] = useState<string>('');
    const [quantity, setQuantity] = useState<number>(1);

    // --- Estados de UI ---
    const [notification, setNotification] = useState<NotificationState>({ message: '', type: '' });

    // --- Funções de Notificação ---
    const showNotification = (message: string, type: 'success' | 'error'): void => {
        setNotification({ message, type });
        setTimeout(() => {
            setNotification({ message: '', type: '' });
        }, 3000);
    };

    // --- Manipuladores de Eventos ---
    const handleAddProduct = (): void => {
        if (!selectedProductId || quantity <= 0) {
            showNotification("Selecione um produto e uma quantidade válida.", "error");
            return;
        }

        const existingItem = orderItems.find(item => item.productId === parseInt(selectedProductId));
        if (existingItem) {
            showNotification("Este produto já foi adicionado ao pedido.", "error");
            return;
        }

        const product = products.find((p: any) => p.id === parseInt(selectedProductId));
        if (product) {
            const newItem: OrderItem = {
                productId: product.id,
                name: product.name,
                quantity: quantity,
                unitPrice: product.price,
                total: quantity * product.price,
            };
            setOrderItems([...orderItems, newItem]);
            setSelectedProductId('');
            setQuantity(1);
        }
    };

    const handleRemoveProduct = async (productIdToRemove: number) => {
        setOrderItems(orderItems.filter(item => item.productId !== productIdToRemove));
    };

    const handleCreateOrder = async (): Promise<void> => {
        if (!selectedCustomerId) {
            showNotification("Por favor, selecione um cliente.", "error");
            return;
        }
        if (orderItems.length === 0) {
            showNotification("Adicione pelo menos um produto ao pedido.", "error");
            return;
        }

        const orderData = {
            userId: 1, // Viria do seu contexto de autenticação
            customerId: parseInt(selectedCustomerId),
            total: subtotal,
            flex: flex,
            TotalFlex: finalTotal,
            status: "pending", // Adicionado para corresponder ao backend
            items: orderItems.map(({ productId, quantity, unitPrice, total }) => ({ // Alterado de orderItems para items
                productId,
                quantity,
                unitPrice,
                total,
            })),
        };


        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                },
                body: JSON.stringify(orderData),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Falha criar pedido.');
            }

            // Substitua pela sua chamada de API real
            // await fetch('/api/orders', { ... });
            showNotification("Pedido criado com sucesso!", "success");

            // Limpar o formulário
            setSelectedCustomerId('');
            setOrderItems([]);
            setFlex(Number(valueFlex?.value) + Number(flex));

        } catch (error) {
            console.error("Erro ao criar pedido:", error);
            const errorMessage = error instanceof Error ? error.message : "Ocorreu um erro desconhecido.";
            showNotification(errorMessage, "error");
        }
    };

    // --- Cálculos com useMemo para otimização ---
    const subtotal = useMemo<number>(() => {
        return orderItems.reduce((acc, item) => acc + item.total, 0);
    }, [orderItems]);

    // const finalTotal = useMemo<number>(() => {
    //     return subtotal + flex;
    // }, [subtotal, flex]);
    const finalTotal = useMemo<number>(() => {
        let vlfd = subtotal;
        if (flex) {
            vlfd = subtotal + flex;
        }
        if (discount) {
            vlfd = subtotal - discount;
        }
        return vlfd;

    }, [subtotal, flex, discount]);


    return (
        <div className="bg-gray-50 min-h-screen p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto">
                {/* Notificação Flutuante */}
                {notification.message && (
                    <div className={`fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg flex items-center text-white ${notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'}`}>
                        <AlertCircleIcon className="w-6 h-6 mr-3" />
                        {notification.message}
                    </div>
                )}

                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Novo Pedido de Compra</h1>
                    <div className="mt-4 md:mt-0 flex space-x-2">
                        <button
                            onClick={handleCreateOrder}
                            className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200"
                        >
                            Salvar Pedido
                        </button>
                        <button
                            type="button"
                            onClick={() => { setSelectedCustomerId(''); setOrderItems([]); setFlex(0); }}
                            className="px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-75 transition duration-200"
                        >
                            Cancelar
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    {/* Coluna Principal: Itens e Adição */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Seção de Cliente */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">1. Selecione o Cliente</h2>
                            <select
                                id="customer"
                                value={selectedCustomerId}
                                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedCustomerId(e.target.value)}
                                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                            >
                                <option value="">-- Escolha um cliente --</option>
                                {customers.map((customer: any) => (
                                    <option key={customer.id} value={customer.id}>
                                        {customer.name} - {customer.cpf_cnpj}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Seção de Adicionar Produtos */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                            <h2 className="text-xl font-semibold text-gray-700 mb-4">2. Adicionar Produtos ao Pedido</h2>
                            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                                <div className="md:col-span-7">
                                    <label htmlFor="product" className="block text-sm font-medium text-gray-600 mb-1">Produto</label>
                                    <select
                                        id="product"
                                        value={selectedProductId}
                                        onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setSelectedProductId(e.target.value)}
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">-- Escolha um produto --</option>
                                        {products.map((product: any) => (
                                            <option key={product.id} value={product.id}>
                                                {product.name} (R$ {product.price})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <div className="md:col-span-2">
                                    <label htmlFor="quantity" className="block text-sm font-medium text-gray-600 mb-1">Qtd.</label>
                                    <input
                                        type="number"
                                        id="quantity"
                                        value={quantity}
                                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setQuantity(Number(e.target.value))}
                                        min="1"
                                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                    />
                                </div>
                                <div className="md:col-span-3">
                                    <button onClick={handleAddProduct} className="w-full flex justify-center items-center gap-2 p-3 bg-green-500 text-white font-semibold rounded-lg shadow-md hover:bg-green-600 transition duration-200">
                                        <PlusCircleIcon className="w-5 h-5" />
                                        Adicionar
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Lista de Itens do Pedido */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-700">Itens do Pedido</h2>
                            </div>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm text-left text-gray-600">
                                    <thead className="text-xs text-gray-700 uppercase bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">Produto</th>
                                            <th scope="col" className="px-6 py-3 text-right">Preço Unit.</th>
                                            <th scope="col" className="px-6 py-3 text-center">Qtd.</th>
                                            <th scope="col" className="px-6 py-3 text-right">Subtotal</th>
                                            <th scope="col" className="px-6 py-3 text-center">Ação</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderItems.length > 0 ? (
                                            orderItems.map(item => (
                                                <tr key={item.productId} className="bg-white border-b hover:bg-gray-50">
                                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{item.name}</th>
                                                    <td className="px-6 py-4 text-right">R$ {(item.unitPrice)}</td>
                                                    <td className="px-6 py-4 text-center">{item.quantity}</td>
                                                    <td className="px-6 py-4 text-right font-semibold">R$ {item.total}</td>
                                                    <td className="px-6 py-4 text-center">
                                                        <button onClick={() => handleRemoveProduct(item.productId)} className="text-red-500 hover:text-red-700">
                                                            <Trash2Icon className="w-5 h-5" />
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))
                                        ) : (
                                            <tr>
                                                <td colSpan={5} className="px-6 py-10 text-center text-gray-500">Nenhum produto adicionado.</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>

                    {/* Coluna Lateral: Resumo */}
                    <div className="lg:col-span-1">
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 sticky">
                            <div className='flex items-center justify-between border-b pb-6 mb-6'>
                                <h2 className="text-xl font-semibold text-gray-700">Resumo do Pedido</h2>
                                <div>Flex <Badge>R$ {flex === 0 ? (valueFlex?.value) : flex + Number(valueFlex?.value)} </Badge></div>
                            </div>
                            <div className="space-y-4">
                                <div className="flex justify-between text-gray-600">
                                    <span>Subtotal</span>
                                    <span className="font-medium text-gray-800">R$ {subtotal}</span>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <label htmlFor="flex" className="block text-sm font-medium">Flex</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            id="flex"
                                            value={flex}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFlex(Number(e.target.value))}
                                            placeholder="0.00"
                                            className="w-32 pl-9 pr-2 py-2 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="flex justify-between items-center text-gray-600">
                                    <label htmlFor="flex" className="block text-sm font-medium">Desconto</label>
                                    <div className="relative">
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500">R$</span>
                                        <input
                                            type="text"
                                            id="flex"
                                            value={discount}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setDiscount(Number(e.target.value))}
                                            placeholder="0.00"
                                            className="w-32 pl-9 pr-2 py-2 text-right border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                                        />
                                    </div>
                                </div>
                                <div className="border-t border-gray-200 my-4"></div>
                                <div className="flex justify-between text-xl font-bold text-gray-900">
                                    <span>Total Final</span>
                                    <span>R$ {finalTotal}</span>
                                </div>
                            </div>
                            <button
                                onClick={handleCreateOrder}
                                className="w-full mt-8 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 transition duration-200"
                            >
                                Finalizar e Salvar Pedido
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
