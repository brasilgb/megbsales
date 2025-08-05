import React from 'react'
import AppDropDownMenu from './app-dropdown-menu'

export default function AppHeader() {
    return (
        <header className='px-6 bg-accent shadow border-b border-white sm:h-16 h-12 flex items-center justify-end'>
            <AppDropDownMenu />
        </header>
    )
}
