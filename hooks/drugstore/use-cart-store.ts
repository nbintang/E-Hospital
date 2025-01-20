'use client'

import {create} from 'zustand'
import { persist } from 'zustand/middleware'
import { Medicine } from '@prisma/client'


interface CartItem extends Medicine {
  quantity: number
}

interface CartStore {
  items: CartItem[]
  addItem: (product: Medicine) => void
  removeItem: (productId: string) => void
  updateQuantity: (productId: string, quantity: number) => void
  clearCart: () => void
  subtotal: number
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (product) => {
        console.log(product)
        set((state) => {
          const existingItem = state.items.find(item => item.id === product.id)
          console.log(existingItem)
          if (existingItem) {
            return {
              items: state.items.map(item =>
                item.id === product.id
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            }
          }

          return { items: [...state.items, { ...product, quantity: 1 }] }
        })
      },
      removeItem: (productId) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== productId)
        }))
      },
      updateQuantity: (productId, quantity) => {
        set((state) => ({
          items: state.items
            .map(item =>
              item.id === productId
                ? { ...item, quantity: Math.max(0, quantity) }
                : item
            )
            .filter(item => item.quantity > 0)
        }))
      },
      clearCart: () => set({ items: [] }),
      get subtotal() {
        return get().items.reduce(
          (total, item) => total + item.price * item.quantity,
          0
        )
      }
    }),
    {
      name: 'cart-storage'
      
    }
  )
)
