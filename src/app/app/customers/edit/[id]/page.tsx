import { User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Breadcrumbs } from '@/components/breadcrumbs';
import { BreadcrumbItem } from '@/types/typesapp';
import { CustomerForm } from '@/components/app/customer/CustomerForm';

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
        title: 'Editar Clientes',
        href: '#',
    },
];

async function getCustomersForId(id: any) {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}customers/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
        },
    })
    const data = await response.json();
    return data?.data;
}

export default async function EditCustomer({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params

    const customersForId = await getCustomersForId(id);

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
                    <Breadcrumbs breadcrumbs={breadcrumbs} />
                </div>
            </div>
            <Card className='p-4 mt-4'>
                <CustomerForm customer={customersForId} />
            </Card>
        </div>
    );
}