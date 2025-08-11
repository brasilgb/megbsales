"use client";

import { useEffect, useState } from 'react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { AddClientForm } from "./CustomerForm";
import { Plus } from 'lucide-react';

export function AddClientModal() {
    const [open, setOpen] = useState(false);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Plus className="h-6 w-6" /> Cliente</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Cadastro de Cliente</DialogTitle>
                    <DialogDescription>
                        Preencha todos os campos abaixo para cadastrar um novo cliente.
                    </DialogDescription>
                </DialogHeader>
                <AddClientForm onSuccess={() => setOpen(false)} />
            </DialogContent>
        </Dialog>
    );
}