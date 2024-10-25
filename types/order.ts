import { OrderStatus } from "@prisma/client";

export type OrderProps = {
    id: string;
    medicine: {
      name: string;
      category: { name: string };
    };
    user: {
      email: string;
    };
    totalPrice: number;
    createdAt: Date;
    updatedAt: Date;
    status: OrderStatus;
  };