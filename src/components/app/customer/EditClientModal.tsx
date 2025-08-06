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
import { EditClientForm } from "./EditClientForm";
import { Edit, Plus } from 'lucide-react';

export function EditClientModal({ customer }: any) {
    const [open, setOpen] = useState(false);
console.log('customer', customer);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button><Edit className="h-6 w-6" /></Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] md:max-w-4xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Alteração de Cliente</DialogTitle>
                    <DialogDescription>
                        Altere os campos abaixo para alterar os dados do cliente.
                    </DialogDescription>
                </DialogHeader>
                <EditClientForm onSuccess={() => setOpen(false)} customer={customer} />
            </DialogContent>
        </Dialog>
    );
}