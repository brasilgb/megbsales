import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

// Schema para validação no servidor
const loginSchema = z.object({
    email: z.email("Email inválido"),
    password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
})

export async function POST(request: NextRequest) {
    try {
        const body = await request.json()

        // Validar dados recebidos
        const validatedData = loginSchema.parse(body)

        // Aqui você faria a autenticação com seu backend/banco de dados
        // Exemplo de chamada para API externa:
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(validatedData),
        })

        if (!response.ok) {
            const errorData = await response.json()
            return NextResponse.json(
                { message: errorData.error || "Credenciais inválidas" },
                { status: response.status }
            )
        }

        const userData = await response.json()

        // Retornar dados do usuário e token
        return NextResponse.json({
            message: "Login realizado com sucesso",
            user: userData
        })

    } catch (error) {
        if (error instanceof z.ZodError) {
            return NextResponse.json(
                { message: "Dados inválidos", errors: error },
                { status: 400 }
            )
        }

        console.error("Erro no login:", error)
        return NextResponse.json(
            { message: "Erro interno do servidor" },
            { status: 500 }
        )
    }
}