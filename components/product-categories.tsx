import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const categories = [
  {
    name: "Bolos Doces",
    description: "Bolos artesanais sem glúten com sabores únicos",
    image: "/beautiful-gluten-free-chocolate-cake-slice.jpg",
    color: "bg-[#6A4E4C]",
  },
  {
    name: "Pães Salgados",
    description: "Pães frescos e saborosos para o dia a dia",
    image: "/artisanal-gluten-free-bread-loaves.jpg",
    color: "bg-[#8B6B47]",
  },
  {
    name: "Cookies",
    description: "Biscoitos crocantes com ingredientes naturais",
    image: "/homemade-gluten-free-cookies-with-nuts.jpg",
    color: "bg-[#A67C52]",
  },
  {
    name: "Tortas",
    description: "Tortas doces e salgadas para ocasiões especiais",
    image: "/elegant-gluten-free-fruit-tart.jpg",
    color: "bg-[#B8956A]",
  },
  {
    name: "Salgados",
    description: "Deliciosos salgados para lanches e festas",
    image: "/gluten-free-savory-pastries-and-snacks.jpg",
    color: "bg-[#C4A373]",
  },
  {
    name: "Brownies",
    description: "Brownies irresistíveis com chocolate premium",
    image: "/rich-gluten-free-chocolate-brownies.jpg",
    color: "bg-[#D9BF77]",
  },
]

export function ProductCategories() {
  return (
    <section id="products" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Alguns dos Nossos Produtos</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Explore nossa variedade de produtos artesanais sem glúten, cada um preparado com ingredientes selecionados e
            técnicas tradicionais.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map((category, index) => (
            <Card
              key={category.name}
              className="group cursor-pointer hover:shadow-lg transition-all duration-300 border-0 bg-card"
            >
              <CardContent className="p-4">
                <div
                  className={`w-16 h-16 ${category.color} rounded-full mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                >
                  <span className="text-white font-bold text-lg">{category.name.charAt(0)}</span>
                </div>
                <h3 className="font-semibold text-center text-sm text-foreground mb-2">{category.name}</h3>
                <p className="text-xs text-muted-foreground text-center text-pretty">{category.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link href="/produtos">
            <Button size="lg" className="bg-primary hover:bg-primary/90">
              Ver Todos os Produtos
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
