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
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Produto
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
          Referência
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("reference")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Descrição
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("description")}</div>,
  },
  {
    accessorKey: "unity",
    header: () => <div className="text-left">Unidade</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("unity")}</div>
    },
  },
  {
    accessorKey: "enabled",
    header: () => <div className="text-left">Ativo</div>,
    cell: ({ row }) => {
      return <div className="text-left font-medium">{row.getValue("enabled") ? <Badge className="bg-green-500 text-white">Sim</Badge> : <Badge className="bg-red-500 text-white">Não</Badge>}</div>
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