"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ShoppingCart } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { useRouter } from "next/navigation"

const allProducts = [
  // Bolos Doces
  {
    id: 1,
    name: "Bolo de Chocolate",
    category: "Bolos Doces",
    price: "R$ 45,00", // Mantendo price como string para exibição
    priceNumber: 45.0, // Adicionando priceNumber para cálculos
    image: "/beautiful-gluten-free-chocolate-cake-slice.jpg",
    description: "Bolo de chocolate sem glúten com cobertura cremosa",
    rating: 5,
  },
  {
    id: 2,
    name: "Bolo de Cenoura",
    category: "Bolos Doces",
    price: "R$ 40,00",
    priceNumber: 40.0,
    image: "/beautiful-gluten-free-chocolate-cake-slice.jpg",
    description: "Bolo de cenoura com brigadeiro sem glúten",
    rating: 5,
  },
  {
    id: 3,
    name: "Bolo Red Velvet",
    category: "Bolos Doces",
    price: "R$ 50,00",
    priceNumber: 50.0,
    image: "/beautiful-gluten-free-chocolate-cake-slice.jpg",
    description: "Clássico bolo red velvet sem glúten",
    rating: 5,
  },
  // Pães Salgados
  {
    id: 4,
    name: "Pão de Forma",
    category: "Pães Salgados",
    price: "R$ 15,00",
    priceNumber: 15.0,
    image: "/artisanal-gluten-free-bread-loaves.jpg",
    description: "Pão de forma sem glúten para o dia a dia",
    rating: 4,
  },
  {
    id: 5,
    name: "Pão Francês",
    category: "Pães Salgados",
    price: "R$ 12,00",
    priceNumber: 12.0,
    image: "/artisanal-gluten-free-bread-loaves.jpg",
    description: "Pãozinho francês crocante sem glúten",
    rating: 4,
  },
  // Cookies
  {
    id: 6,
    name: "Cookies de Chocolate",
    category: "Cookies",
    price: "R$ 25,00",
    priceNumber: 25.0,
    image: "/homemade-gluten-free-cookies-with-nuts.jpg",
    description: "Cookies crocantes com gotas de chocolate",
    rating: 5,
  },
  {
    id: 7,
    name: "Cookies de Aveia",
    category: "Cookies",
    price: "R$ 22,00",
    priceNumber: 22.0,
    image: "/homemade-gluten-free-cookies-with-nuts.jpg",
    description: "Cookies saudáveis de aveia sem glúten",
    rating: 4,
  },
  // Tortas
  {
    id: 8,
    name: "Torta de Frutas",
    category: "Tortas",
    price: "R$ 55,00",
    priceNumber: 55.0,
    image: "/elegant-gluten-free-fruit-tart.jpg",
    description: "Torta de frutas frescas da estação",
    rating: 5,
  },
  {
    id: 9,
    name: "Torta de Limão",
    category: "Tortas",
    price: "R$ 48,00",
    priceNumber: 48.0,
    image: "/elegant-gluten-free-fruit-tart.jpg",
    description: "Torta de limão com merengue",
    rating: 5,
  },
  // Salgados
  {
    id: 10,
    name: "Coxinha",
    category: "Salgados",
    price: "R$ 8,00",
    priceNumber: 8.0,
    image: "/gluten-free-savory-pastries-and-snacks.jpg",
    description: "Coxinha de frango sem glúten",
    rating: 4,
  },
  {
    id: 11,
    name: "Pastel",
    category: "Salgados",
    price: "R$ 10,00",
    priceNumber: 10.0,
    image: "/gluten-free-savory-pastries-and-snacks.jpg",
    description: "Pastel assado recheado",
    rating: 4,
  },
  // Brownies
  {
    id: 12,
    name: "Brownie Tradicional",
    category: "Brownies",
    price: "R$ 18,00",
    priceNumber: 18.0,
    image: "/rich-gluten-free-chocolate-brownies.jpg",
    description: "Brownie de chocolate intenso",
    rating: 5,
  },
  {
    id: 13,
    name: "Brownie com Nozes",
    category: "Brownies",
    price: "R$ 20,00",
    priceNumber: 20.0,
    image: "/rich-gluten-free-chocolate-brownies.jpg",
    description: "Brownie com nozes crocantes",
    rating: 5,
  },
]

const categories = ["Todos", "Bolos Doces", "Pães Salgados", "Cookies", "Tortas", "Salgados", "Brownies"]

export default function ProdutosPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const { addToCart } = useCart()
  const router = useRouter()

  const filteredProducts =
    selectedCategory === "Todos" ? allProducts : allProducts.filter((product) => product.category === selectedCategory)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="sm" onClick={() => router.push("/")} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nossos Produtos</h1>
            <p className="text-muted-foreground">Delícias artesanais sem glúten</p>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className="text-sm"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <Card key={product.id} className="group hover:shadow-lg transition-all duration-300">
              <CardContent className="p-0">
                <div className="aspect-square overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="p-4">
                  <Badge variant="secondary" className="mb-2 text-xs">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-foreground mb-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-3 text-pretty">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-primary">{product.price}</span>{" "}
                    {/* Usando price string formatada */}
                    <Button size="sm" onClick={() => addToCart(product)} className="flex items-center gap-2">
                      <ShoppingCart className="w-4 h-4" />
                      Adicionar
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum produto encontrado nesta categoria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
