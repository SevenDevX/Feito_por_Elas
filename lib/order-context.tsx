"use client"

import React from "react"

import { createContext, useContext, useReducer, type ReactNode } from "react"

export interface Order {
  id: string
  customerName: string
  customerPhone: string
  items: Array<{
    id: number
    name: string
    quantity: number
    price: string
  }>
  total: number
  status: "pendente" | "confirmado" | "preparando" | "pronto" | "saiu_entrega" | "entregue" | "cancelado"
  createdAt: Date
  estimatedDelivery?: Date
  trackingCode: string
  deliveryAddress?: string
  notes?: string
}

interface OrderState {
  orders: Order[]
}

type OrderAction =
  | { type: "ADD_ORDER"; payload: Omit<Order, "id" | "createdAt" | "trackingCode"> }
  | { type: "UPDATE_ORDER_STATUS"; payload: { id: string; status: Order["status"]; estimatedDelivery?: Date } }
  | { type: "LOAD_ORDERS"; payload: Order[] }

const OrderContext = createContext<{
  state: OrderState
  dispatch: React.Dispatch<OrderAction>
  addOrder: (order: Omit<Order, "id" | "createdAt" | "trackingCode">) => string
  updateOrderStatus: (id: string, status: Order["status"], estimatedDelivery?: Date) => void
  getOrderByTrackingCode: (trackingCode: string) => Order | undefined
} | null>(null)

function generateTrackingCode(): string {
  return "FE" + Date.now().toString().slice(-6) + Math.random().toString(36).substr(2, 3).toUpperCase()
}

function orderReducer(state: OrderState, action: OrderAction): OrderState {
  switch (action.type) {
    case "ADD_ORDER":
      const trackingCode = generateTrackingCode()
      const newOrder: Order = {
        ...action.payload,
        id: Date.now().toString(),
        createdAt: new Date(),
        trackingCode, // usando o código gerado aqui
      }
      const newState = { orders: [...state.orders, newOrder] }
      localStorage.setItem("orders", JSON.stringify(newState.orders))
      console.log("[v0] Pedido salvo:", newOrder) // debug log
      return newState

    case "UPDATE_ORDER_STATUS":
      const updatedOrders = state.orders.map((order) =>
        order.id === action.payload.id
          ? { ...order, status: action.payload.status, estimatedDelivery: action.payload.estimatedDelivery }
          : order,
      )
      localStorage.setItem("orders", JSON.stringify(updatedOrders))
      return { orders: updatedOrders }

    case "LOAD_ORDERS":
      return { orders: action.payload }

    default:
      return state
  }
}

export function OrderProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(orderReducer, { orders: [] })

  // Load orders from localStorage on mount
  React.useEffect(() => {
    const savedOrders = localStorage.getItem("orders")
    if (savedOrders) {
      try {
        const orders = JSON.parse(savedOrders).map((order: any) => ({
          ...order,
          createdAt: new Date(order.createdAt),
          estimatedDelivery: order.estimatedDelivery ? new Date(order.estimatedDelivery) : undefined,
        }))
        dispatch({ type: "LOAD_ORDERS", payload: orders })
      } catch (error) {
        console.error("Error loading orders:", error)
      }
    }
  }, [])

  const addOrder = (orderData: Omit<Order, "id" | "createdAt" | "trackingCode">): string => {
    const trackingCode = generateTrackingCode()
    dispatch({
      type: "ADD_ORDER",
      payload: { ...orderData, trackingCode } as any,
    })
    console.log("[v0] Código retornado:", trackingCode) // debug log
    return trackingCode
  }

  const updateOrderStatus = (id: string, status: Order["status"], estimatedDelivery?: Date) => {
    dispatch({ type: "UPDATE_ORDER_STATUS", payload: { id, status, estimatedDelivery } })
  }

  const getOrderByTrackingCode = (trackingCode: string): Order | undefined => {
    return state.orders.find((order) => order.trackingCode === trackingCode)
  }

  return (
    <OrderContext.Provider value={{ state, dispatch, addOrder, updateOrderStatus, getOrderByTrackingCode }}>
      {children}
    </OrderContext.Provider>
  )
}

export function useOrders() {
  const context = useContext(OrderContext)
  if (!context) {
    throw new Error("useOrders must be used within an OrderProvider")
  }
  return context
}
