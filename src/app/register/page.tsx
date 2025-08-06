"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Eye, EyeOff, Loader2 } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"
import Image from "next/image"

// Schema de validação com Zod
const registerSchema = z.object({
    name: z
        .string()
        .min(1, "Nome é obrigatório"),
    email: z
        .email("Email deve ter um formato válido"),
    password: z
        .string()
        .min(1, "Senha é obrigatória")
        .min(8, "Senha deve ter pelo menos 8 caracteres"),
    confirmPassword: z
        .string()
        .min(1, "Confirmação de senha é obrigatória"),
}).refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
})

type RegisterFormData = z.infer<typeof registerSchema>

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [apiError, setApiError] = useState<string | null>(null)
    const [successMessage, setSuccessMessage] = useState<string | null>(null)
    const router = useRouter()

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm<RegisterFormData>({
        resolver: zodResolver(registerSchema),
    })

    const onSubmit = async (data: RegisterFormData) => {
        setIsLoading(true)
        setApiError(null)
        setSuccessMessage(null)

        try {
            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    name: data.name,
                    email: data.email,
                    password: data.password,
                }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                throw new Error(errorData.message || "Erro ao criar conta")
            }

            const result = await response.json()

            setSuccessMessage("Conta criada com sucesso! Redirecionando para login...")
            reset()

            // Redirecionar para login após 2 segundos
            setTimeout(() => {
                router.push("/login")
            }, 2000)

        } catch (error) {
            setApiError(error instanceof Error ? error.message : "Erro interno do servidor")
        } finally {
            setIsLoading(false)
        }
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }

    const toggleConfirmPasswordVisibility = () => {
        setShowConfirmPassword(!showConfirmPassword)
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4 py-8">
            {/* Logo */}
            <div className="mb-8">
                <Image
                    src="/placeholder.svg?height=80&width=200&text=Logo"
                    alt="Logo da empresa"
                    width={200}
                    height={80}
                    className="h-20 w-auto"
                />
            </div>

            <Card className="w-full max-w-md">
                <CardHeader className="space-y-1">
                    <CardTitle className="text-2xl font-bold text-center">Criar Conta</CardTitle>
                    <CardDescription className="text-center">
                        Preencha os dados abaixo para criar sua conta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        {/* Campo Nome */}
                        <div className="space-y-2">
                            <Label htmlFor="name">Nome Completo</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Digite seu nome completo"
                                {...register("name")}
                                className={errors.name ? "border-red-500" : ""}
                            />
                            {errors.name && (
                                <p className="text-sm text-red-500">{errors.name.message}</p>
                            )}
                        </div>

                        {/* Campo Email */}
                        <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="seu@email.com"
                                {...register("email")}
                                className={errors.email ? "border-red-500" : ""}
                            />
                            {errors.email && (
                                <p className="text-sm text-red-500">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Campo Senha */}
                        <div className="space-y-2">
                            <Label htmlFor="password">Senha</Label>
                            <div className="relative">
                                <Input
                                    id="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Digite sua senha"
                                    {...register("password")}
                                    className={errors.password ? "border-red-500 pr-10" : "pr-10"}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={togglePasswordVisibility}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Ocultar senha" : "Mostrar senha"}
                                    </span>
                                </Button>
                            </div>
                            {errors.password && (
                                <p className="text-sm text-red-500">{errors.password.message}</p>
                            )}
                        </div>

                        {/* Campo Confirmar Senha */}
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirmar Senha</Label>
                            <div className="relative">
                                <Input
                                    id="confirmPassword"
                                    type={showConfirmPassword ? "text" : "password"}
                                    placeholder="Repita sua senha"
                                    {...register("confirmPassword")}
                                    className={errors.confirmPassword ? "border-red-500 pr-10" : "pr-10"}
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={toggleConfirmPasswordVisibility}
                                >
                                    {showConfirmPassword ? (
                                        <EyeOff className="h-4 w-4 text-gray-500" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-gray-500" />
                                    )}
                                    <span className="sr-only">
                                        {showConfirmPassword ? "Ocultar senha" : "Mostrar senha"}
                                    </span>
                                </Button>
                            </div>
                            {errors.confirmPassword && (
                                <p className="text-sm text-red-500">{errors.confirmPassword.message}</p>
                            )}
                        </div>

                        {/* Mensagem de sucesso */}
                        {successMessage && (
                            <div className="p-3 text-sm text-green-700 bg-green-50 border border-green-200 rounded-md">
                                {successMessage}
                            </div>
                        )}

                        {/* Erro da API */}
                        {apiError && (
                            <div className="p-3 text-sm text-red-500 bg-red-50 border border-red-200 rounded-md">
                                {apiError}
                            </div>
                        )}

                        {/* Botão de Submit */}
                        <Button type="submit" className="w-full" disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Criando conta...
                                </>
                            ) : (
                                "Criar Conta"
                            )}
                        </Button>
                    </form>

                    {/* Links adicionais */}
                    <div className="mt-6 text-center">
                        <div className="text-sm text-gray-600">
                            Já tem uma conta?{" "}
                            <a href="/login" className="text-blue-600 hover:underline font-medium">
                                Faça login
                            </a>
                        </div>
                    </div>

                    {/* Termos e condições */}
                    <div className="mt-4 text-xs text-gray-500 text-center">
                        Ao criar uma conta, você concorda com nossos{" "}
                        <a href="/terms" className="text-blue-600 hover:underline">
                            Termos de Uso
                        </a>{" "}
                        e{" "}
                        <a href="/privacy" className="text-blue-600 hover:underline">
                            Política de Privacidade
                        </a>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
