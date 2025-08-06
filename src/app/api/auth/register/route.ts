import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schema para validação no servidor
const registerSchema = z.object({
  name: z
    .string()
    .min(2, "Nome deve ter pelo menos 2 caracteres")
    .max(50, "Nome deve ter no máximo 50 caracteres"),
  email: z.email("Email inválido"),
  password: z
    .string()
    .min(5, "Senha deve ter pelo menos 8 caracteres"),
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validar dados recebidos
    const validatedData = registerSchema.parse(body)
   
    // Criar usuário na API externa
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(validatedData),
    })

    if (!response.ok) {
      const errorData = await response.json()
      return NextResponse.json(
        { message: errorData.error || "Erro ao criar conta" },
        { status: response.status }
      )
    }

    const userData = await response.json()

    // Retornar sucesso (sem dados sensíveis)
    return NextResponse.json({
      message: "Conta criada com sucesso",
      user: {
        id: userData.data.id,
        name: userData.data.name,
        email: userData.data.email,
      },
    })

  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { 
          message: "Dados inválidos", 
          errors: error
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      { message: "Erro interno do servidor" },
      { status: 500 }
    )
  }
}
