"use client";

import { useEffect, useState } from 'react';
import { Package } from 'lucide-react';
import { EditProductForm } from '@/components/app/product/EditProductForm';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem } from '@/types/typesapp';
import { useParams } from 'next/navigation';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Produtos',
        href: '/app/products',
    },
    {
        title: 'Adicionar Produtos',
        href: '#',
    },
];

export default function EditProduct({ paramsPromise }: any) {
    const [productsForId, setProductsForId] = useState<any>([]);
    const params = useParams();
    const { id } = params
    console.log(id);
    
    useEffect(() => {
        const getProductsForId = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const { data } = await response.json();
            setProductsForId(data);
        };
        getProductsForId();
    }, [id]);

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
            <Card className='p-4 mt-4'>
                <EditProductForm product={productsForId} />
            </Card>
        </div>
    );
}