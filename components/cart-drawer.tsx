"use client"

import { useCart } from "@/lib/cart-context"
import { useOrders } from "@/lib/order-context"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { ShoppingCart, Plus, Minus, Trash2, Package } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export function CartDrawer() {
  const { state, dispatch } = useCart()
  const { addOrder } = useOrders()

  const updateQuantity = (id: number, quantity: number) => {
    dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } })
  }

  const removeItem = (id: number) => {
    dispatch({ type: "REMOVE_ITEM", payload: id })
  }

  const generateWhatsAppMessage = () => {
    const items = state.items.map((item) => `• ${item.name} (${item.quantity}x) - ${item.price}`).join("\\n")

    const message = `Olá! Gostaria de fazer um pedido:\\n\\n${items}\\n\\n*Total: R$ ${state.total.toFixed(2).replace(".", ",")}\\n\\nPor favor, me informe sobre disponibilidade e forma de entrega.`

    return encodeURIComponent(message)
  }

  const handleWhatsAppOrder = () => {
    console.log("[v0] Iniciando pedido WhatsApp")
    console.log("[v0] Items no carrinho:", state.items)
    console.log("[v0] Total:", state.total)

    const trackingCode = addOrder({
      customerName: "Cliente WhatsApp", // This would come from a form in a real app
      customerPhone: "5511999999999",
      items: state.items,
      total: state.total,
      status: "pendente",
    })

    console.log("[v0] Código de rastreamento gerado:", trackingCode)

    const items = state.items.map((item) => `• ${item.name} (${item.quantity}x) - ${item.price}`).join("\\\\n")

    const message = `Olá! Gostaria de fazer um pedido:\\\\n\\\\n${items}\\\\n\\\\n*Total: R$ ${state.total.toFixed(2).replace(".", ",")}*\\\\n\\\\n*Código de Rastreamento: ${trackingCode}*\\\\n\\\\nPor favor, me informe sobre disponibilidade e forma de entrega.`

    const whatsappNumber = "5511999999999" // Substitua pelo número real
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`

    console.log("[v0] Abrindo WhatsApp com mensagem:", message)
    window.open(whatsappUrl, "_blank")

    // Clear cart after order
    dispatch({ type: "CLEAR_CART" })
    console.log("[v0] Carrinho limpo após pedido")
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="relative bg-transparent">
          <ShoppingCart className="w-4 h-4" />
          {state.itemCount > 0 && (
            <Badge className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
              {state.itemCount}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrinho de Compras</SheetTitle>
        </SheetHeader>

        <div className="mt-6 space-y-4">
          {state.items.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-muted-foreground mb-4">Seu carrinho está vazio</p>
              <Button
                variant="outline"
                className="w-full bg-transparent"
                onClick={() => window.open("/rastrear", "_blank")}
              >
                <Package className="w-4 h-4 mr-2" />
                Rastrear Pedido
              </Button>
            </div>
          ) : (
            <>
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center gap-4 p-4 border rounded-lg">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-medium text-sm">{item.name}</h4>
                    <p className="text-primary font-semibold">{item.price}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)}>
                      <Minus className="w-3 h-3" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)}>
                      <Plus className="w-3 h-3" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="border-t pt-4">
                <div className="flex justify-between items-center mb-4">
                  <span className="font-semibold">Total:</span>
                  <span className="font-bold text-lg text-primary">R$ {state.total.toFixed(2).replace(".", ",")}</span>
                </div>

                <Button
                  onClick={handleWhatsAppOrder}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  Finalizar Pedido via WhatsApp
                </Button>

                <Button
                  variant="outline"
                  className="w-full mt-2 bg-transparent"
                  onClick={() => window.open("/rastrear", "_blank")}
                >
                  <Package className="w-4 h-4 mr-2" />
                  Rastrear Pedido
                </Button>

                <Button variant="outline" onClick={() => dispatch({ type: "CLEAR_CART" })} className="w-full mt-2">
                  Limpar Carrinho
                </Button>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
