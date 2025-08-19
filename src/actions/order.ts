// ./app/actions.ts
'use server';

import { revalidatePath } from 'next/cache';

// Interface para garantir a tipagem dos dados do pedido
interface Item {
  produtoId: number;
  quantidade: number;
  precoUnitario: number;
}

interface OrderData {
  clienteId: string;
  items: Item[];
}

// A Server Action que se comunica com nosso backend
export async function createOrderAction(data: OrderData) {
  const backendUrl = 'http://localhost:3000/pedidos'; // URL do seu backend

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      // Se a resposta não for OK, captura a mensagem de erro do backend
      const errorData = await response.json();
      throw new Error(errorData.error || 'Falha ao criar o pedido no backend.');
    }

    const result = await response.json();

    // Se o pedido for criado com sucesso, podemos revalidar dados na página
    // Ex: para atualizar uma lista de pedidos recentes
    revalidatePath('/'); // Revalida a página inicial

    return {
      success: true,
      message: `Pedido #${result.id} criado com sucesso!`,
      data: result,
    };
  } catch (error) {
    // Retorna uma mensagem de erro genérica ou específica
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.',
    };
  }
}