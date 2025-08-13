"use client"

import { ColumnDef } from "@tanstack/react-table"
import { ArrowUpDown, Edit } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Product } from "@/types/typesapp"
import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import DeleteButton from "@/components/app/app-delete"

export const columns: ColumnDef<Product>[] = [

  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Pedido
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("name")}</div>,
  },
  {
    accessorKey: "reference",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Cliente
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("reference")}</div>,
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "items",
    header: () => <div className="text-left">Ativo</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("items")}</div>
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const product = row.original
      return (
        <div className="flex justify-end gap-2">
          <Button asChild>
            <Link href={`/app/products/edit/${product.id}`}>
              <Edit className="h-4 w-4" />
            </Link>
          </Button>
          <DeleteButton itemid={product.id} action="este produto" url="/app/products" />
        </div>
      )
    },
  },
]