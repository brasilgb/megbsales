"use client";

import { ArrowLeft, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem } from '@/types/typesapp';
import { CustomerForm } from '@/components/app/customer/CustomerForm';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/',
    },
    {
        title: 'Clientes',
        href: '/app/customers',
    },
    {
        title: 'Adicionar Clientes',
        href: '#',
    },
];

export default function AddCustomer() {

    return (
        <div className="sm:p-6 p-2">
            <div className='flex justify-beetween items-center'>
                <div className='flex-1'>
                    <h1 className="text-2xl font-bold flex items-center gap-2">
                        <User className="h-6 w-6" />
                        Clientes
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
                <CustomerForm />
            </Card>
        </div>
    );
}