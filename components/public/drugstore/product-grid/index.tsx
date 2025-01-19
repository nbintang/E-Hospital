'use client'

import { Medicine } from '@prisma/client'
import { Button } from '@/components/ui/button'
import { useCartStore } from '@/hooks/drugstore/use-cart-store'
import Image from 'next/image'
import { formatCurrency } from '@/helper/client'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Plus } from 'lucide-react'

interface ProductGridProps {
  products: Medicine[]
}

export default function ProductGrid({ products }: ProductGridProps) {
  const addItem = useCartStore((state) => state.addItem)

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
      {products.map((product) => (
        <Card key={product.id}>
          <CardHeader className="p-0">
            <div className="aspect-square relative">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover rounded-t-lg"
              />
            </div>
          </CardHeader>
          <CardContent className="p-4">
            <CardTitle className="text-sm font-semibold mb-2">
              {product.name}
            </CardTitle>
            <p className="text-sm text-muted-foreground">Per Strip</p>
          </CardContent>
          <CardFooter className="p-4 pt-0 flex items-center justify-between">
            <span className="font-semibold">
              {formatCurrency(product.price)}
            </span>
            <Button
              size="sm"
              onClick={() => addItem(product)}
              variant="secondary"
            >
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

