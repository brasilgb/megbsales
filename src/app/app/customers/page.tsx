import { DataTable } from '@/components/data-table'
import { columns } from "./columns"
import React from 'react'
import { data } from './data'
import { AddClientModal } from '@/components/app/customer/AddClientModal'
import { User } from 'lucide-react'
import { BreadcrumbItem } from '@/types/typesapp'
import { Breadcrumbs } from '@/components/breadcrumbs'
import { get } from 'http'

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: 'Dashboard',
    href: '/',
  },
  {
    title: 'Clientes',
    href: '/customers',
  },
];

async function getCustomers() {
  const headers = {
    'Content-Type': 'application/json',
    // 'Authorization': `Bearer ${token}`,
  };

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}customers`, {
    method: 'GET',
    headers: headers,
  });

  if (!response.ok) {
    // Handle unauthorized or other errors
    if (response.status === 401) {
      // Potentially refresh token or redirect to login
    }
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
}

export default async function Customers() {
  const {data, error} = await getCustomers();
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
      <DataTable columns={columns} data={data} botaoAdd={<AddClientModal />} />
    </div>
  )
}
