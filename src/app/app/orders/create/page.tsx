import OrderForm from '@/components/app/Order/OrderForm'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { BreadcrumbItem } from '@/types/typesapp'
import { ArrowLeft, ShoppingCart } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Pedidos',
        href: '/app/orders',
    },
    {
        title: 'Adicionar Pedido',
        href: '#',
    },
];

async function getCustomers() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}customers`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
    })
    const data = await response.json();
    return data?.data;
}

async function getProducts() {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
    })
    const data = await response.json();
    return data?.data;
}

export default async function OrderCreate() {

    const allCustomers = await getCustomers();
    const allProducts = await getProducts();

    return (
        <div className="sm:p-6 p-2">
            <div className='flex justify-beetween items-center'>
                <div className='flex-1'>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <ShoppingCart className="h-6 w-6" />
                        Pedidos
                    </h1>
                </div>
                <div className='flex-1 flex justify-end'>
                    <div className='sm:flex hidden'>
                        <Breadcrumbs breadcrumbs={breadcrumbs} />
                    </div>
                    <div className='sm:hidden flex justify-end'>
                        <Button asChild>
                            <Link href={`/app/products`}>
                                <ArrowLeft className="h-4 w-4" />
                            </Link>
                        </Button>
                    </div>
                </div>
            </div>
            <div className='mt-4'>
                <OrderForm customers={allCustomers} products={allProducts} />
            </div>
        </div>
    )
}