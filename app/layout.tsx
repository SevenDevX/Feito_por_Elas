import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Work_Sans } from "next/font/google"
import "./globals.css"
import { CartProvider } from "@/lib/cart-context"
import { OrderProvider } from "@/lib/order-context"
import { Toaster } from "@/components/ui/toaster"

const workSans = Work_Sans({
  subsets: ["latin"],
  variable: "--font-work-sans",
  display: "swap",
})

const geistMono = localFont({
  src: [
    {
      path: "../public/fonts/geist-mono/GeistMono-Regular.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../public/fonts/geist-mono/GeistMono-Bold.woff2",
      weight: "700",
      style: "normal",
    },
  ],
  variable: "--font-geist-mono",
})

export const metadata: Metadata = {
  title: "Feito por Elas - Comida sem Glúten",
  description: "Deliciosas opções sem glúten feitas com carinho e dedicação por mulheres empreendedoras.",
  manifest: "/manifest.json",
  themeColor: "#d9bf77",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Feito por Elas",
  },
  formatDetection: {
    telephone: false,
  },
  openGraph: {
    type: "website",
    siteName: "Feito por Elas",
    title: "Feito por Elas - Comida sem Glúten",
    description: "Deliciosas opções sem glúten feitas com carinho e dedicação por mulheres empreendedoras.",
  },
  twitter: {
    card: "summary",
    title: "Feito por Elas - Comida sem Glúten",
    description: "Deliciosas opções sem glúten feitas com carinho e dedicação por mulheres empreendedoras.",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className={`${workSans.variable} ${geistMono.variable} antialiased`}>
      <head>
        <meta name="application-name" content="Feito por Elas" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Feito por Elas" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-config" content="/icons/browserconfig.xml" />
        <meta name="msapplication-TileColor" content="#d9bf77" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#d9bf77" />

        <link rel="apple-touch-icon" href="/icons/icon-152x152.jpg" />
        <link rel="apple-touch-icon" sizes="152x152" href="/icons/icon-152x152.jpg" />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/icon-192x192.jpg" />

        <link rel="icon" type="image/png" sizes="32x32" href="/icons/icon-32x32.jpg" />
        <link rel="icon" type="image/png" sizes="16x16" href="/icons/icon-16x16.jpg" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#d9bf77" />
        <link rel="shortcut icon" href="/favicon.ico" />
      </head>
      <body>
        <OrderProvider>
          <CartProvider>
            {children}
            <Toaster />
          </CartProvider>
        </OrderProvider>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js')
                    .then(function(registration) {
                      console.log('[SW] Registration successful with scope: ', registration.scope);
                    }, function(err) {
                      console.log('[SW] Registration failed: ', err);
                    });
                });
              }
            `,
          }}
        />
      </body>
    </html>
  )
}
