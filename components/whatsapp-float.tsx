"use client"

import { MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function WhatsAppFloat() {
  const handleWhatsAppClick = () => {
    const message = encodeURIComponent("Olá! Gostaria de saber mais sobre os produtos sem glúten da Feito por Elas.")
    const whatsappUrl = `https://wa.me/5511999999999?text=${message}`
    window.open(whatsappUrl, "_blank")
  }

  return (
    <Button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-green-500 hover:bg-green-600 text-white shadow-lg hover:shadow-xl transition-all duration-300 animate-bounce"
      size="sm"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="sr-only">Falar no WhatsApp</span>
    </Button>
  )
}
