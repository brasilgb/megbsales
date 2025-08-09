'use client'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { DataTable } from '@/components/data-table';
import { BreadcrumbItem, Product } from '@/types/typesapp';
import { Package, Plus } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import { columns } from './columns';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Produtos',
    href: '/products',
  },
];

export default function Products() {
  const [isLoading, setIsLoading] = useState(false);
  const [dataProducts, setDataProducts] = useState<Product | []>([]);

  const getProducts = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const { data } = await response.json();
      setDataProducts(data);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="sm:p-6 p-2">
      <div className='flex justify-beetween items-center'>
        <div className='flex-1'>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Package className="h-6 w-6" />
            Produtos
          </h1>
        </div>
        <div className='flex-1 flex justify-end'>
          <Breadcrumbs breadcrumbs={breadcrumbs} />
        </div>
      </div>
      <DataTable columns={columns} data={dataProducts} addButton={<Button asChild><Link href="/app/products/create"><Plus className="h-6 w-6" /> Produto</Link></Button>} />
    </div>
  )
}
