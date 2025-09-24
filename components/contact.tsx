"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    subject: "",
    message: "",
  })

  const { toast } = useToast()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleWhatsAppSubmit = () => {
    if (!formData.name || !formData.message) {
      toast({
        title: "Campos obrigatórios",
        description: "Por favor, preencha pelo menos o nome e a mensagem.",
        variant: "destructive",
      })
      return
    }

    const whatsappMessage = `Olá! Meu nome é ${formData.name}.

${formData.subject ? `Assunto: ${formData.subject}\n` : ""}
${formData.message}

${formData.phone ? `Telefone: ${formData.phone}\n` : ""}
${formData.email ? `E-mail: ${formData.email}` : ""}`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    const whatsappUrl = `https://wa.me/5511999999999?text=${encodedMessage}`

    window.open(whatsappUrl, "_blank")

    toast({
      title: "Redirecionando para WhatsApp",
      description: "Você será redirecionado para o WhatsApp para enviar sua mensagem.",
    })
  }

  return (
    <section id="contact" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Fale Conosco</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Entre em contato conosco para encomendas personalizadas, dúvidas sobre nossos produtos ou para conhecer mais
            sobre nosso trabalho.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <Card className="border border-border">
            <CardHeader>
              <CardTitle className="text-2xl text-foreground">Envie sua Mensagem</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Nome *</label>
                  <Input
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Seu nome completo"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">Telefone</label>
                  <Input
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="(11) 99999-9999"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">E-mail</label>
                <Input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="seu@email.com"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Assunto</label>
                <Input
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  placeholder="Como podemos ajudar?"
                />
              </div>

              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Mensagem *</label>
                <Textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  placeholder="Conte-nos mais sobre sua necessidade..."
                  rows={5}
                />
              </div>

              <Button
                size="lg"
                className="w-full bg-green-600 hover:bg-green-700 text-white"
                onClick={handleWhatsAppSubmit}
              >
                <MessageCircle className="w-4 h-4 mr-2" />
                Enviar via WhatsApp
              </Button>

              <p className="text-xs text-muted-foreground text-center">
                * Campos obrigatórios. Você será redirecionado para o WhatsApp.
              </p>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <div className="space-y-8">
            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Localização</h3>
                    <p className="text-muted-foreground text-pretty">
                      Rua das Flores, 123
                      <br />
                      Bairro Jardim, São Paulo - SP
                      <br />
                      CEP: 01234-567
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Telefone</h3>
                    <p className="text-muted-foreground">
                      (11) 99999-9999
                      <br />
                      (11) 3333-4444
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">E-mail</h3>
                    <p className="text-muted-foreground">
                      contato@feitoporelas.com.br
                      <br />
                      pedidos@feitoporelas.com.br
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border border-border">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Horário de Funcionamento</h3>
                    <p className="text-muted-foreground text-pretty">
                      Segunda a Sexta: 8h às 18h
                      <br />
                      Sábado: 8h às 14h
                      <br />
                      Domingo: Fechado
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
