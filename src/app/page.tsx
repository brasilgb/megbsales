"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const [userApp, setUserApp] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // Verificar se o usuário está autenticado
    const user = localStorage.getItem("authUser")
    if (!user) {
      router.push("/login")
      return
    }

    // Aqui você pode fazer uma chamada para verificar o token
    // e buscar dados do usuário
    setUserApp(user)

  }, [router])

  const handleLogout = () => {
    localStorage.removeItem("authUser")
    router.push("/login")
  }

  if (!userApp) {
    return <div>Carregando...</div>
  }
console.log('user', userApp);

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* <p>Bem-vindo, {userApp.data.name}!</p>
              <p>Email: {userApp.data.email}</p> */}
              <Button onClick={handleLogout} variant="outline">
                Sair
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}