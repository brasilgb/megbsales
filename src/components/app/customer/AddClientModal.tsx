"use client";

import { useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ClientForm } from "./ClientForm";

export function AddClientModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button>Adicionar Novo Cliente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Cadastro de Novo Cliente</DialogTitle>
                    <DialogDescription>
                        Preencha todos os campos abaixo para cadastrar um novo cliente.
                    </DialogDescription>
                </DialogHeader>
                <ClientForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}