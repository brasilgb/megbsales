import { ArrowLeft, Package } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem } from '@/types/typesapp';
import { ProductForm } from '@/components/app/product/ProductForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

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
        title: 'Editar Produtos',
        href: '#',
    },
];

async function getProductsForId(id: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
    })
    const data = await response.json();
    return data?.data;
}

export default async function EditProduct({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const productsForId = await getProductsForId(id);

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
            <Card className='p-4 mt-4'>
                <ProductForm product={productsForId} />
            </Card>
        </div>
    );
}