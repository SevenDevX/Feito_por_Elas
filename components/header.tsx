"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { CartDrawer } from "@/components/cart-drawer"
import Link from "next/link"
import { useRouter } from "next/navigation"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const router = useRouter()

  const menuItems = [
    { name: "Página Inicial", href: "/" },
    { name: "Quem Somos", href: "/#about" },
    { name: "Produtos", href: "/produtos" },
    { name: "Fale Conosco", href: "/#contact" },
  ]

  const handleAnchorClick = (href: string) => {
    if (href.startsWith("/#")) {
      const targetId = href.substring(2) // Remove "/#"

      if (window.location.pathname !== "/") {
        // If not on home page, navigate to home first then scroll
        router.push("/")
        setTimeout(() => {
          const element = document.getElementById(targetId)
          if (element) {
            element.scrollIntoView({ behavior: "smooth" })
          }
        }, 100)
      } else {
        // If on home page, scroll directly
        const element = document.getElementById(targetId)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
    setIsMenuOpen(false)
  }

  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">FE</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Feito por Elas</h1>
              <p className="text-sm text-muted-foreground">Comida sem Glúten</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {menuItems.map((item) => (
              <div key={item.name}>
                {item.href.startsWith("/#") ? (
                  <button
                    onClick={() => handleAnchorClick(item.href)}
                    className="text-foreground hover:text-primary transition-colors duration-200 cursor-pointer"
                  >
                    {item.name}
                  </button>
                ) : (
                  <Link href={item.href} className="text-foreground hover:text-primary transition-colors duration-200">
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Cart and Mobile Menu */}
          <div className="flex items-center space-x-4">
            <div className="hidden sm:block">
              <CartDrawer />
            </div>

            {/* Mobile Menu Button */}
            <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-border pt-4">
            <div className="flex flex-col space-y-3">
              {menuItems.map((item) => (
                <div key={item.name}>
                  {item.href.startsWith("/#") ? (
                    <button
                      onClick={() => handleAnchorClick(item.href)}
                      className="text-foreground hover:text-primary transition-colors duration-200 py-2 text-left cursor-pointer w-full"
                    >
                      {item.name}
                    </button>
                  ) : (
                    <Link
                      href={item.href}
                      onClick={() => setIsMenuOpen(false)}
                      className="text-foreground hover:text-primary transition-colors duration-200 py-2 block"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-4">
                <CartDrawer />
              </div>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
