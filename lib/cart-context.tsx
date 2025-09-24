"use client"

import type React from "react"
import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Product {
  id: number
  name: string
  description: string
  price: string
  priceNumber: number
  image: string
  rating: number
  isNew?: boolean
}

export interface CartItem extends Product {
  quantity: number
}

interface CartState {
  items: CartItem[]
  total: number
  itemCount: number
}

type CartAction =
  | { type: "ADD_ITEM"; payload: Product }
  | { type: "REMOVE_ITEM"; payload: number }
  | { type: "UPDATE_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" }

const CartContext = createContext<{
  state: CartState
  dispatch: React.Dispatch<CartAction>
  addToCart: (product: Product) => void // Added addToCart function to context type
} | null>(null)

function cartReducer(state: CartState, action: CartAction): CartState {
  console.log("[v0] Cart action:", action.type, action.payload) // Debug log para verificar ações

  switch (action.type) {
    case "ADD_ITEM": {
      console.log("[v0] Adding item:", action.payload.name, "Price:", action.payload.priceNumber) // Debug log

      const existingItem = state.items.find((item) => item.id === action.payload.id)

      if (existingItem) {
        const updatedItems = state.items.map((item) =>
          item.id === action.payload.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
        const newTotal = updatedItems.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0)
        console.log("[v0] Updated total:", newTotal) // Debug log

        return {
          ...state,
          items: updatedItems,
          total: newTotal,
          itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
        }
      }

      const newItems = [...state.items, { ...action.payload, quantity: 1 }]
      const newTotal = newItems.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0)
      console.log("[v0] New total:", newTotal) // Debug log

      return {
        ...state,
        items: newItems,
        total: newTotal,
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      }
    }

    case "REMOVE_ITEM": {
      const newItems = state.items.filter((item) => item.id !== action.payload)
      return {
        ...state,
        items: newItems,
        total: newItems.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0),
        itemCount: newItems.reduce((sum, item) => sum + item.quantity, 0),
      }
    }

    case "UPDATE_QUANTITY": {
      const updatedItems = state.items
        .map((item) =>
          item.id === action.payload.id ? { ...item, quantity: Math.max(0, action.payload.quantity) } : item,
        )
        .filter((item) => item.quantity > 0)

      return {
        ...state,
        items: updatedItems,
        total: updatedItems.reduce((sum, item) => sum + item.priceNumber * item.quantity, 0),
        itemCount: updatedItems.reduce((sum, item) => sum + item.quantity, 0),
      }
    }

    case "CLEAR_CART":
      return {
        items: [],
        total: 0,
        itemCount: 0,
      }

    default:
      return state
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0,
  })

  const addToCart = (product: Product) => {
    dispatch({ type: "ADD_ITEM", payload: product })
  }

  return <CartContext.Provider value={{ state, dispatch, addToCart }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
