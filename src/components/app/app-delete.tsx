"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Save, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

interface DeleteButtonProps {
    itemid: string | undefined
    action: string
    url: string
}

export default function DeleteButton({ itemid, action, url }: DeleteButtonProps) {
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        setIsLoading(true);
        localStorage.setItem("itemid", itemid as string);
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}products/${itemid}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    // 'Authorization': `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN}`
                },
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Falha ao excluir produto.');
            }

            toast("Sucesso!",
                {
                    description: "Produto excluido com sucesso.",
                });
        } catch (error) {
            toast("Erro",
                {
                    description: error instanceof Error ? error.message : "Ocorreu um erro desconhecido."
                });
            console.error('Erro ao buscar produtos:', error);
        } finally {
            setIsLoading(false);
            router.push(`${url}`);
        }
    }
    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button variant="destructive" size="icon">
                    <Trash2 className="h-4 w-4" />
                </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Tem certeza que deseja excluir?</AlertDialogTitle>
                    <AlertDialogDescription>
                        Esta ação não pode ser desfeita. Isso irá excluir permanentemente este {action} ede sua base de dados.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction disabled={isLoading} onClick={handleDelete} className="bg-red-600 hover:bg-red-700">
                        {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
                        {isLoading ? "Excluindo..." : "Excluir"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
