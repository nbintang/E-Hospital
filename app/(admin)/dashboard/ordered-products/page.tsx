import OrderedProductTable from "@/components/admin/ordered-product";
import { OrderProps } from "@/components/admin/ordered-product/column";
export default function OrderedProducts() {
    return (
        <>
        <OrderedProductTable data={data}/>
        </>
    );
}

const data: OrderProps[] = [
    {
      id: "MED001",
      medicine: "Amoxicillin",
      category: "pill",
      user: {
        name: "Alice Johnson",
        email: "alice@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-15",
      price: 29.99,
      status: "Shipped",
    },
    {
      id: "MED002",
      medicine: "Insulin",
      category: "injection",
      user: {
        name: "Bob Smith",
        email: "bob@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-16",
      price: 89.99,
      status: "Processing",
    },
    {
      id: "MED003",
      medicine: "Ibuprofen",
      category: "pill",
      user: {
        name: "Charlie Brown",
        email: "charlie@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-17",
      price: 9.99,
      status: "Delivered",
    },
    {
      id: "MED004",
      medicine: "Antibiotic Ointment",
      category: "topical",
      user: {
        name: "Diana Prince",
        email: "diana@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-18",
      price: 14.99,
      status: "Shipped",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
    {
      id: "MED005",
      medicine: "Cough Syrup",
      category: "liquid",
      user: {
        name: "Ethan Hunt",
        email: "ethan@example.com",
        avatar: "/placeholder.svg?height=32&width=32",
      },
      date: "2023-04-19",
      price: 19.99,
      status: "Processing",
    },
  ]