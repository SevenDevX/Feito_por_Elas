import { Card, CardContent } from "@/components/ui/card"
import { Users, Heart, Award, Leaf } from "lucide-react"

const values = [
  {
    icon: Heart,
    title: "Feito com Amor",
    description: "Cada produto é preparado com carinho e dedicação por nossas talentosas confeiteiras.",
  },
  {
    icon: Users,
    title: "Empreendedorismo Feminino",
    description: "Apoiamos e valorizamos o trabalho de mulheres empreendedoras em nossa comunidade.",
  },
  {
    icon: Award,
    title: "Qualidade Premium",
    description: "Utilizamos apenas ingredientes selecionados e técnicas artesanais tradicionais.",
  },
  {
    icon: Leaf,
    title: "Ingredientes Naturais",
    description: "Priorizamos ingredientes naturais e orgânicos para produtos mais saudáveis.",
  },
]

export function About() {
  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Sobre o <span className="text-primary">Feito por Elas</span>
            </h2>

            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              Somos um coletivo de mulheres apaixonadas pela arte da confeitaria sem glúten. Nossa missão é proporcionar
              momentos especiais através de sabores únicos, criados com técnicas artesanais e ingredientes
              cuidadosamente selecionados.
            </p>

            <p className="text-lg text-muted-foreground mb-8 text-pretty leading-relaxed">
              Cada receita conta uma história de dedicação, inovação e amor pela culinária. Acreditamos que todos
              merecem desfrutar de delícias sem abrir mão do sabor ou da qualidade, independentemente de restrições
              alimentares.
            </p>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((value, index) => (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center flex-shrink-0">
                    <value.icon className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">{value.title}</h3>
                    <p className="text-sm text-muted-foreground text-pretty">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Image */}
          <div className="relative">
            <Card className="overflow-hidden border-0 shadow-2xl">
              <CardContent className="p-0">
                <img
                  src="/women-baking-gluten-free-products-in-artisanal-kit.jpg"
                  alt="Mulheres preparando produtos sem glúten"
                  className="w-full h-[600px] object-cover"
                />
              </CardContent>
            </Card>

            {/* Decorative elements */}
            <div className="absolute -top-6 -left-6 w-24 h-24 bg-primary/20 rounded-full"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full"></div>
          </div>
        </div>
      </div>
    </section>
  )
}
