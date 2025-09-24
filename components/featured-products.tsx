"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Heart } from "lucide-react"
import { useCart, type Product } from "@/lib/cart-context"
import { useToast } from "@/hooks/use-toast"

const featuredProducts: Product[] = [
  {
    id: 1,
    name: "Bolo de Chocolate Premium",
    description: "Bolo de chocolate sem glúten com cobertura de ganache e frutas vermelhas",
    price: "R$ 45,00",
    priceNumber: 45.0,
    image: "/premium-chocolate-cake-with-berries-gluten-free.jpg",
    rating: 4.9,
    isNew: true,
  },
  {
    id: 2,
    name: "Pão de Forma Integral",
    description: "Pão de forma sem glúten com sementes e grãos integrais",
    price: "R$ 18,00",
    priceNumber: 18.0,
    image: "/whole-grain-gluten-free-sandwich-bread.jpg",
    rating: 4.8,
    isNew: false,
  },
  {
    id: 3,
    name: "Cookies de Aveia e Mel",
    description: "Biscoitos crocantes de aveia com mel e castanhas",
    price: "R$ 25,00",
    priceNumber: 25.0,
    image: "/oatmeal-honey-cookies-gluten-free-with-nuts.jpg",
    rating: 4.7,
    isNew: false,
  },
  {
    id: 4,
    name: "Torta de Limão Siciliano",
    description: "Torta cremosa de limão siciliano com base crocante sem glúten",
    price: "R$ 38,00",
    priceNumber: 38.0,
    image: "/sicilian-lemon-tart-gluten-free-with-meringue.jpg",
    rating: 4.9,
    isNew: true,
  },
]

export function FeaturedProducts() {
  const { dispatch } = useCart()
  const { toast } = useToast()

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
    toast({
      title: "Produto adicionado!",
      description: `${product.name} foi adicionado ao carrinho.`,
    })
  }

  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Produtos em Destaque</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Conheça alguns dos nossos produtos mais queridos pelos clientes, preparados com receitas exclusivas e
            ingredientes premium.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {featuredProducts.map((product) => (
            <Card
              key={product.id}
              className="group cursor-pointer hover:shadow-xl transition-all duration-300 border border-border bg-card overflow-hidden"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.isNew && (
                  <span className="absolute top-3 left-3 bg-primary text-primary-foreground text-xs font-semibold px-2 py-1 rounded-full">
                    Novo
                  </span>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-3 right-3 bg-white/90 hover:bg-white text-foreground p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  <Heart className="w-4 h-4" />
                </Button>
              </div>

              <CardContent className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating) ? "text-primary fill-primary" : "text-muted-foreground"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-muted-foreground ml-1">({product.rating})</span>
                </div>

                <h3 className="font-semibold text-foreground mb-2 text-balance">{product.name}</h3>

                <p className="text-sm text-muted-foreground mb-4 text-pretty">{product.description}</p>

                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-primary">{product.price}</span>
                  <Button size="sm" className="bg-primary hover:bg-primary/90" onClick={() => addToCart(product)}>
                    Adicionar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Mais Produtos
          </Button>
        </div>
      </div>
    </section>
  )
}
