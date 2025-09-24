"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Download, X } from "lucide-react"

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: string[]
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed"
    platform: string
  }>
  prompt(): Promise<void>
}

export function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null)
  const [showInstallPrompt, setShowInstallPrompt] = useState(false)

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e as BeforeInstallPromptEvent)
      setShowInstallPrompt(true)
    }

    window.addEventListener("beforeinstallprompt", handler)

    return () => window.removeEventListener("beforeinstallprompt", handler)
  }, [])

  const handleInstallClick = async () => {
    if (!deferredPrompt) return

    deferredPrompt.prompt()
    const { outcome } = await deferredPrompt.userChoice

    if (outcome === "accepted") {
      console.log("[PWA] User accepted the install prompt")
    } else {
      console.log("[PWA] User dismissed the install prompt")
    }

    setDeferredPrompt(null)
    setShowInstallPrompt(false)
  }

  const handleDismiss = () => {
    setShowInstallPrompt(false)
    setDeferredPrompt(null)
  }

  if (!showInstallPrompt) return null

  return (
    <Card className="fixed bottom-4 left-4 right-4 z-50 mx-auto max-w-sm border-primary/20 bg-card/95 backdrop-blur-sm">
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex-1">
          <h3 className="font-semibold text-sm">Instalar App</h3>
          <p className="text-xs text-muted-foreground">Adicione à tela inicial para acesso rápido</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" onClick={handleInstallClick} className="h-8 px-3">
            <Download className="h-3 w-3 mr-1" />
            Instalar
          </Button>
          <Button size="sm" variant="ghost" onClick={handleDismiss} className="h-8 w-8 p-0">
            <X className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
