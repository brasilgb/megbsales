import React from 'react'
import AppDropDownMenu from './app-dropdown-menu'
import { Button } from '../ui/button'
import { Bell } from 'lucide-react'

export default function AppHeader() {
    return (
        <header className='px-6 bg-accent shadow border-b border-white sm:h-16 h-12 flex items-center justify-end'>
            <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-4 w-4" />
                <span className="absolute -top-1 -right-1 h-3 w-3 rounded-full bg-red-500 text-[10px] font-medium text-white flex items-center justify-center">
                    3
                </span>
            </Button>
            <AppDropDownMenu />
        </header>
    )
}
