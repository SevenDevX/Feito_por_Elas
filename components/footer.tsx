"use client"

import { Heart, Instagram, Facebook, WheatIcon as WhatsApp } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export function Footer() {
  const openInstagram = () => {
    window.open("https://instagram.com/feitoporelas", "_blank")
  }

  const openFacebook = () => {
    window.open("https://facebook.com/feitoporelas", "_blank")
  }

  const openWhatsApp = () => {
    window.open("https://wa.me/5511999999999?text=Olá! Gostaria de saber mais sobre os produtos sem glúten.", "_blank")
  }

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-lg">FE</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">Feito por Elas</h3>
                <p className="text-sm text-background/70">Comida sem Glúten</p>
              </div>
            </div>
            <p className="text-background/80 mb-6 text-pretty leading-relaxed">
              Deliciosas opções sem glúten feitas com carinho e dedicação por mulheres empreendedoras. Sabor autêntico,
              qualidade premium e ingredientes naturais em cada produto.
            </p>
            <div className="flex space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="text-background hover:text-primary hover:bg-background/10"
                onClick={openInstagram}
              >
                <Instagram className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-background hover:text-primary hover:bg-background/10"
                onClick={openFacebook}
              >
                <Facebook className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="text-background hover:text-primary hover:bg-background/10"
                onClick={openWhatsApp}
              >
                <WhatsApp className="w-5 h-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#home" className="text-background/80 hover:text-primary transition-colors">
                  Página Inicial
                </a>
              </li>
              <li>
                <a href="#about" className="text-background/80 hover:text-primary transition-colors">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#products" className="text-background/80 hover:text-primary transition-colors">
                  Produtos
                </a>
              </li>
              <li>
                <Link href="/produtos" className="text-background/80 hover:text-primary transition-colors">
                  Ver Todos os Produtos
                </Link>
              </li>
              <li>
                <Link href="/rastrear" className="text-background/80 hover:text-primary transition-colors">
                  Rastrear Pedido
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-background/80 hover:text-primary transition-colors">
                  Fale Conosco
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-semibold mb-4">Contato</h4>
            <ul className="space-y-2 text-background/80">
              <li>Rua das Flores, 123</li>
              <li>São Paulo - SP</li>
              <li>(11) 99999-9999</li>
              <li>contato@feitoporelas.com.br</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-background/60 text-sm">© 2025 Feito por Elas. Todos os direitos reservados.</p>
            <div className="flex flex-col md:flex-row items-center gap-4 mt-4 md:mt-0">
              <p className="text-background/60 text-sm flex items-center gap-1">
                Feito com <Heart className="w-4 h-4 text-primary fill-primary" /> por mulheres empreendedoras
              </p>
              <p className="text-background/60 text-sm">
                Desenvolvido pela{" "}
                <a
                  href="https://sevendevx.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary font-semibold hover:text-primary/80 transition-colors underline decoration-primary/50 hover:decoration-primary"
                >
                  SevenDevX
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
