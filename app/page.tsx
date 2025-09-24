import { Header } from "@/components/header"
import { Hero } from "@/components/hero"
import { ProductCategories } from "@/components/product-categories"
import { FeaturedProducts } from "@/components/featured-products"
import { About } from "@/components/about"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { WhatsAppFloat } from "@/components/whatsapp-float"
import { SmoothScroll } from "@/components/smooth-scroll"
import { PWAInstallPrompt } from "@/components/pwa-install-prompt"

export default function Home() {
  return (
    <main className="min-h-screen">
      <SmoothScroll />
      <Header />
      <section id="home">
        <Hero />
      </section>
      <section id="products">
        <ProductCategories />
        <FeaturedProducts />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="contact">
        {" "}
        {/* Added contact ID to section */}
        <Contact />
      </section>
      <Footer />
      <WhatsAppFloat />
      <PWAInstallPrompt />
    </main>
  )
}
