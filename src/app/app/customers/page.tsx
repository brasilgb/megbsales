import { DataTable } from '@/components/data-table'
import { columns } from "./columns"
import React from 'react'
import { data } from './data'
import { AddClientModal } from '@/components/app/customer/AddClientModal'

export default function Customers() {
  return (
    <div className="container mx-auto py-10">
        <AddClientModal />
      <h1 className="text-2xl font-bold mb-4">Lista de Clientes</h1>
      <DataTable columns={columns} data={data} />
    </div>
  )
}
