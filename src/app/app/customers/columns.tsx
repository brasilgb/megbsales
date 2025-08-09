"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Customer } from "@/types/typesapp"
import { EditClientModal } from "@/components/app/customer/EditClientModal"
import { maskCpfCnpj } from "@/lib/mask"

export const columns: ColumnDef<Customer>[] = [

  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Nome
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "cpf_cnpj",
    header: () => <div className="text-left">CPF/CNPJ</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{maskCpfCnpj(row.getValue("cpf_cnpj"))}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const customer = row.original
      return (
        <div className="flex justify-end gap-2">
          <EditClientModal customer={row.original} />
          <Button onClick={() => alert(`Excluindo: ${customer.name}`)} className="text-red-600">
            Excluir
          </Button>
        </div>
      )
    },
  },
]