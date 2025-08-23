import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from "@/components/ui/sidebar"
import {
  Home,
  Package,
  ShoppingCart,
  Users,
  Settings,
  BookDashedIcon,
} from "lucide-react";
import Link from "next/link";
import { Badge } from "../ui/badge";
import { usePathname } from "next/navigation";

export function AppSidebar() {
const pathname = usePathname()
  const menuItems = [
    { title: "Dashboard", url: "/app", icon: Home },
    { title: "Pedidos", url: "/app/orders", icon: ShoppingCart, badge: "12" },
    { title: "Produtos", url: "/app/products", icon: Package },
    { title: "Clientes", url: "/app/customers", icon: Users },
    { title: "Configurações", url: "/app/settings", icon: Settings },
  ];

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenuButton
          size="lg"
          className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
        >
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <BookDashedIcon />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">nome</span>
            <span className="truncate text-xs">activeTeam</span>
          </div>
        </SidebarMenuButton>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => {
            const isActive = pathname === item.url
            return(
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold transition-colors ${
                          isActive
                            ? "bg-blue-700 text-white dark:bg-blue-900 dark:text-blue-100"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span>{item.title}</span>
                    {item.badge && (
                      <Badge className="ml-auto h-5 w-5 shrink-0 items-center justify-center rounded-full">
                        {item.badge}
                      </Badge>
                    )}
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )}
          )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>

      </SidebarFooter>

    </Sidebar>
  )
}