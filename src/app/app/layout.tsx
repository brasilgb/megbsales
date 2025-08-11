'use client'
import AppFooter from '@/components/app/app-footer'
import AppHeader from '@/components/app/app-header'
import { AppSidebar } from '@/components/app/app-sidebar'
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

interface AppProps {
    children: React.ReactNode
}

export default function AppLayout({ children }: AppProps) {
const router = useRouter();
        useEffect(() => {
      // Verificar se o usuário está autenticado
      const user = localStorage.getItem("authUser")
      if (!user) {
        router.push("/login")
        return
      }
    }, [router])
    
    return (
        <SidebarProvider>
            <AppSidebar />
            <main className='min-h-screen flex flex-col w-full'>
                <SidebarTrigger className='absolute sm:top-5 top-3' />
                <AppHeader />
                <div className='flex-grow'>
                    {children}
                </div>
                <AppFooter />
            </main>
        </SidebarProvider>
    )
}