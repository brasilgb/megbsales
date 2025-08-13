'use client'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { DataTable } from '@/components/data-table';
import { BreadcrumbItem, Product } from '@/types/typesapp';
import { Package, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { columns } from './columns';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Pedidos',
    href: '/orders',
  },
];

export default function Orders() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataOrders, setDataOrders] = useState<Product | []>([]);

  useEffect(() => {
    let orderId = localStorage.getItem('orderid');

    const getOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}orders`, {
          cache: 'no-store',
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        const { data } = await response.json();
        const newData = data?.filter((item: any) => item.id !== orderId);
        setDataOrders(orderId ? newData : data);

      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      } finally {
        setIsLoading(false);
      }
    }

    getOrders();
  }, []);

  return (
    <div className="sm:p-6 p-2">
      <div className='flex justify-beetween items-center'>
        <div className='flex-1'>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6" />
            Pedidos
          </h1>
        </div>
        <div className='flex-1 flex justify-end'>
          <div className='sm:flex hidden'>
            <Breadcrumbs breadcrumbs={breadcrumbs} />
          </div>
        </div>
      </div>
      <DataTable columns={columns} data={dataOrders} addButton={<Button asChild><Link href="/app/orders/create"><Plus className="h-6 w-6" />Pedido</Link></Button>} />
    </div>
  )
}
