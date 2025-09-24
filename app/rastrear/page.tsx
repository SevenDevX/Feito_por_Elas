"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Search, Package, Clock, CheckCircle, Truck, MapPin } from "lucide-react"
import { useOrders } from "@/lib/order-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

const statusConfig = {
  pendente: { label: "Pendente", color: "bg-yellow-500", icon: Clock },
  confirmado: { label: "Confirmado", color: "bg-blue-500", icon: CheckCircle },
  preparando: { label: "Preparando", color: "bg-orange-500", icon: Package },
  pronto: { label: "Pronto", color: "bg-green-500", icon: CheckCircle },
  saiu_entrega: { label: "Saiu para Entrega", color: "bg-purple-500", icon: Truck },
  entregue: { label: "Entregue", color: "bg-green-600", icon: MapPin },
  cancelado: { label: "Cancelado", color: "bg-red-500", icon: Clock },
}

export default function RastrearPage() {
  const [trackingCode, setTrackingCode] = useState("")
  const [searchResult, setSearchResult] = useState<any>(null)
  const [isSearching, setIsSearching] = useState(false)
  const { getOrderByTrackingCode } = useOrders()

  const handleSearch = () => {
    if (!trackingCode.trim()) return

    setIsSearching(true)

    // Simulate API delay
    setTimeout(() => {
      const order = getOrderByTrackingCode(trackingCode.trim())
      setSearchResult(order || "not_found")
      setIsSearching(false)
    }, 1000)
  }

  const getStatusSteps = (currentStatus: string) => {
    const steps = ["pendente", "confirmado", "preparando", "pronto", "saiu_entrega", "entregue"]
    const currentIndex = steps.indexOf(currentStatus)

    return steps.map((step, index) => ({
      status: step,
      completed: index <= currentIndex,
      active: index === currentIndex,
    }))
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-4">Rastrear Pedido</h1>
            <p className="text-muted-foreground">Digite o código de rastreamento para acompanhar seu pedido</p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardContent className="p-6">
              <div className="flex gap-4">
                <Input
                  placeholder="Digite o código de rastreamento (ex: FE123456ABC)"
                  value={trackingCode}
                  onChange={(e) => setTrackingCode(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleSearch}
                  disabled={isSearching || !trackingCode.trim()}
                  className="flex items-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  {isSearching ? "Buscando..." : "Buscar"}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Search Results */}
          {searchResult === "not_found" && (
            <Card className="border-red-200">
              <CardContent className="p-6 text-center">
                <div className="text-red-500 mb-4">
                  <Package className="w-12 h-12 mx-auto" />
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">Pedido não encontrado</h3>
                <p className="text-muted-foreground">
                  Verifique se o código de rastreamento está correto ou entre em contato conosco.
                </p>
              </CardContent>
            </Card>
          )}

          {searchResult && searchResult !== "not_found" && (
            <div className="space-y-6">
              {/* Order Info */}
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Package className="w-5 h-5" />
                      Pedido #{searchResult.trackingCode}
                    </CardTitle>
                    <Badge className={`${statusConfig[searchResult.status].color} text-white`}>
                      {statusConfig[searchResult.status].label}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Cliente</p>
                      <p className="font-medium">{searchResult.customerName}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Data do Pedido</p>
                      <p className="font-medium">{new Date(searchResult.createdAt).toLocaleDateString("pt-BR")}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Total</p>
                      <p className="font-medium text-primary">R$ {searchResult.total.toFixed(2)}</p>
                    </div>
                    {searchResult.estimatedDelivery && (
                      <div>
                        <p className="text-muted-foreground">Previsão de Entrega</p>
                        <p className="font-medium">
                          {new Date(searchResult.estimatedDelivery).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Status Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Status do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {getStatusSteps(searchResult.status).map((step, index) => {
                      const config = statusConfig[step.status]
                      const Icon = config.icon
                      const isLast = index === getStatusSteps(searchResult.status).length - 1

                      return (
                        <div key={step.status} className="relative">
                          <div className="flex items-center gap-4">
                            <div
                              className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                                step.completed ? config.color : "bg-gray-200"
                              } ${step.active ? "ring-4 ring-primary/20 scale-110" : ""}`}
                            >
                              <Icon className={`w-5 h-5 ${step.completed ? "text-white" : "text-gray-400"}`} />
                            </div>
                            <div className="flex-1">
                              <p
                                className={`font-medium ${step.completed ? "text-foreground" : "text-muted-foreground"}`}
                              >
                                {config.label}
                              </p>
                              {step.active && (
                                <p className="text-sm text-primary font-medium animate-pulse">Status atual</p>
                              )}
                            </div>
                          </div>
                          {!isLast && (
                            <div
                              className={`absolute left-5 top-10 w-0.5 h-6 ${
                                step.completed ? "bg-primary" : "bg-gray-200"
                              } transition-colors duration-300`}
                            />
                          )}
                        </div>
                      )
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Order Items */}
              <Card>
                <CardHeader>
                  <CardTitle>Itens do Pedido</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {searchResult.items.map((item: any, index: number) => (
                      <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                        <div>
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-muted-foreground">Quantidade: {item.quantity}</p>
                        </div>
                        <p className="font-medium">{item.price}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
