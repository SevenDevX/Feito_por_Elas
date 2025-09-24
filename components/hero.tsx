"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function Hero() {
  const scrollToProducts = () => {
    document.getElementById("products")?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToAbout = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[80vh] flex items-center">
      {/* Background with gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#6A4E4C] to-[#8B6B47]">
        <div className="absolute inset-0 bg-black/20"></div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-white">
            <p className="text-primary text-sm font-medium mb-4 tracking-wide uppercase">Feita com Carinho</p>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 text-balance">
              Delícias sem Glúten
              <span className="block text-primary">Feitas por Elas</span>
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 text-pretty leading-relaxed">
              Descubra o sabor autêntico de produtos artesanais sem glúten, preparados com ingredientes selecionados e
              muito amor por mulheres empreendedoras.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground"
                onClick={scrollToProducts}
              >
                Ver Produtos
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-foreground bg-transparent"
                onClick={scrollToAbout}
              >
                Saiba Mais
              </Button>
            </div>
          </div>

          {/* Hero Image */}
          <div className="relative">
            <div className="aspect-square rounded-full overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20">
              <img
                src="/delicious-gluten-free-cake-with-chocolate-and-berr.jpg"
                alt="Bolo sem glúten artesanal"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary rounded-full opacity-80"></div>
            <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-primary rounded-full opacity-60"></div>
            <div className="absolute top-1/2 -left-8 w-4 h-4 bg-primary rounded-full opacity-40"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
