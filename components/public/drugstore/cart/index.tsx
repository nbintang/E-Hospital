"use client";

import { Button } from "@/components/ui/button";
import { useCartStore } from "@/hooks/drugstore/use-cart-store";
import { formatCurrency } from "@/helper/client";
import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useShallow } from "zustand/react/shallow";
export default function Cart() {
  const { items, removeItem, updateQuantity, subtotal } = useCartStore(
    useShallow((state) => ({
      items: state.items,
      removeItem: state.removeItem,
      updateQuantity: state.updateQuantity,
      subtotal: state.subtotal,
    }))
  );

  return (
    <div className="min-h-screen bg-background py-8">
      <div className="container mx-auto px-4">
        <Button variant="ghost" asChild className="mb-8">
          <Link href="/" className="inline-flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Continue Shopping
          </Link>
        </Button>

        <div className="grid lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8">
            <Card>
              <CardHeader>
                <CardTitle>Shopping cart</CardTitle>
                <CardDescription>
                  You have {items.length} item{items.length !== 1 ? "s" : ""} in
                  your cart
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="divide-y">
                  {items.map((item) => (
                    <div key={item.id} className="py-4 flex gap-4">
                      <div className="w-24 h-24 relative">
                        <Image
                          src="/placeholder.svg"
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Per Strip
                        </p>
                        <div className="flex items-center gap-4">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <span className="w-8 text-center">
                              {item.quantity}
                            </span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-destructive"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">
                          {formatCurrency(item.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-4">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-semibold">
                    <span>Total</span>
                    <span>{formatCurrency(subtotal)}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Sheet>
                  <SheetTrigger asChild>
                    <Button className="w-full" variant={"default"}>Checkout</Button>
                  </SheetTrigger>
                  <SheetContent>
                    <SheetHeader>
                      <SheetTitle>Checkout</SheetTitle>
                      <SheetDescription>
                        Complete your order by providing your payment
                        information.
                      </SheetDescription>
                    </SheetHeader>
                    {/* Checkout form would go here */}
                  </SheetContent>
                </Sheet>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
