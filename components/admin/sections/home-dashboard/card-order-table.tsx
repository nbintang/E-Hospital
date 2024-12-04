import React from 'react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";;
import { Badge } from "@/components/ui/badge"
export  function CardOrderTable({orders}: {orders: any[]}) {
  return (
    <Card className="col-span-1 md:col-span-2 order-2">
    <CardHeader>
      <CardTitle>Recent Orders</CardTitle>
    </CardHeader>
    <CardContent>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell>{order.product}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell>{order.date}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    order.status === "Delivered"
                      ? "success"
                      : order.status === "Shipped"
                      ? "secondary"
                      : "default"
                  }
                >
                  {order.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </Card>
  )
}
