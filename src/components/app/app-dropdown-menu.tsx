'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { ChevronDown, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"
import router from "next/router"
import { useEffect, useState } from "react"

export default function AppDropDownMenu() {
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
    setUserApp(user && JSON.parse(user))

  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("authUser")
    router.push("/login")
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="flex items-center">
          <div className="h-8 w-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center">
            <User className="h-4 w-4" />
          </div>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="flex justify-center">{userApp && userApp.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Button variant="ghost" onClick={handleLogout} className="flex items-center justify-start gap-2 w-full">
              <User className="h-4 w-4 text-gray-600" />
              Profile
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Button variant="ghost" onClick={handleLogout} className="flex items-center justify-start gap-2 w-full">
            <LogOut className="h-4 w-4 text-gray-600" />
            Sair
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
