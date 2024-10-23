"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { DoubleArrowRightIcon } from "@radix-ui/react-icons";
import { Button } from "../ui/button";
import Image from "next/image";
import { Charts } from "./admin-panel/charts";

export default function Dashboard() {
  // Mock data for demonstration
  const recentPost = {
    title: "10 Tips for Effective Time Management",
    excerpt:
      "Learn how to manage your time efficiently and boost your productivity with these 10 simple tips. specture lorem ipsut, yurnak dowks diam dosp",
    author: "Jane Doe",
    date: "2024-03-15",
  };

  const clientQuestions = [
    { id: 1, question: "How do I reset my password?", status: "New" },
    {
      id: 2,
      question: "Can I change my subscription plan?",
      status: "Answered",
    },
    { id: 3, question: "Where can I find the user manual?", status: "New" },
  ];

  const products = [
    { id: 1, name: "Premium Widget", price: 99.99, stock: 50 },
    { id: 2, name: "Basic Gadget", price: 49.99, stock: 100 },
    { id: 3, name: "Super Tool", price: 149.99, stock: 25 },
  ];

  const orders = [
    {
      id: 1,
      product: "Premium Widget",
      customer: "John Smith",
      date: "2024-03-14",
      status: "Shipped",
    },
    {
      id: 2,
      product: "Basic Gadget",
      customer: "Alice Johnson",
      date: "2024-03-15",
      status: "Processing",
    },
    {
      id: 3,
      product: "Super Tool",
      customer: "Bob Brown",
      date: "2024-03-13",
      status: "Delivered",
    },
  ];

  const users = [
    { id: 1, name: "John Smith", email: "john@example.com", role: "Customer" },
    { id: 2, name: "Alice Johnson", email: "alice@example.com", role: "Admin" },
    { id: 3, name: "Bob Brown", email: "bob@example.com", role: "Customer" },
  ];

  return (
    <div className="container mx-auto p-4 space-y-2">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="col-span-2 row-span-3">
          <Card className="col-span-1 md:col-span-2 lg:col-span-3 overflow-hidden relative ">
            <CardContent>
              <div className="absolute inset-0">
                <Image
                  src="/img/surgery.jpg"
                  alt="Hero Image"
                  className=" object-cover"
                  fill
                />
              </div>
              <div className="absolute inset-0 bg-don-juan/50" />
              <div className=" relative  h-full flex flex-col justify-end p-6">
                <h3 className="text-lg md:text-xl font-semibold text-white">
                  {recentPost.title}
                </h3>
                <p className="text-sm text-secondary/70 mt-2">
                  {recentPost.excerpt}
                </p>
                <div className="flex justify-between items-center mt-4 text-sm text-secondary/60">
                  <span>{recentPost.author}</span>
                  <span>{recentPost.date}</span>
                </div>
              </div>
            </CardContent>
          </Card>
          <div className="justify-items-end ">
            <Button variant={"ghost"} size={"sm"} className="flex gap-2 my-1">
              <p className="text-sm">See More</p>
              <DoubleArrowRightIcon className="h-5 text-black/50 w-5" />
            </Button>
          </div>
          <div className="col-span-1 md:col-span-2 lg:col-span-3">
            <ScrollArea>
              <div className="flex gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card
                    key={i}
                    className="min-w-[300px] pt-4 overflow-hidden relative "
                  >
                    <CardContent>
                      <div className="absolute inset-0">
                        <Image
                          src="/img/coughing.jpg"
                          alt="Hero Image"
                          className=" object-cover"
                          fill
                        />
                      </div>
                      <div className="absolute inset-0 bg-don-juan/50" />
                      <div className=" relative h-full flex flex-col justify-end ">
                        <h3 className="text-lg md:text-xl font-semibold text-white">
                          {recentPost.title}
                        </h3>
                        <p className="text-sm truncate text-secondary/70 mt-2 w-36">
                          {recentPost.excerpt}
                        </p>
                        <div className="flex justify-between items-center mt-4 text-sm text-secondary/60">
                          <span>{recentPost.author}</span>
                          <span>{recentPost.date}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              <ScrollBar orientation="horizontal" />
            </ScrollArea>
          </div>
        </div>
        <Card className="h-full row-span-3 col-span-1 w-full min-w-sm">
          <CardHeader>
            <CardTitle>Client Questions</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea>
              <ul className="space-y-4">
                {clientQuestions.map((q) => (
                  <li key={q.id} className="flex justify-between items-center">
                    <span className="text-sm">{q.question}</span>
                    <Badge
                      variant={q.status === "New" ? "destructive" : "secondary"}
                    >
                      {q.status}
                    </Badge>
                  </li>
                ))}
              </ul>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-2">
        {/* Questions from Clients */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 col-span-3 gap-3">
          {/* Ordered Products Table */}
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
          <Charts className="col-span-1 order-1" />
        </div>
        {/* Users Table */}
        <Card className="col-span-1 md:col-span-2 lg:col-span-3 w-full min-w-sm">
          <CardHeader>
            <CardTitle>Users</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user) => (
                  <TableRow key={user.id}>
                    <TableCell className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/initials/svg?seed=${user.name}`}
                          alt={user.name}
                        />
                        <AvatarFallback>
                          {user.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      {user.name}
                    </TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
