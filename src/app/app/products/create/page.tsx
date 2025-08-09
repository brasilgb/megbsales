"use client";

import { Package } from 'lucide-react';
import { AddProductForm } from '@/components/app/product/AddProductForm';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem } from '@/types/typesapp';

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

export default function AddProduct() {

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
                <AddProductForm />
            </Card>
        </div>
    );
}