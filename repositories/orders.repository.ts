import db from "@/lib/db";
import { OrderProps } from "@/types/order";

export async function findOrderedProducts(): Promise<OrderProps[]> {
 
    return db.order.findMany({
      include: {
        medicine: {
          include: {
            categories: {
              select: {
                name: true,
              },
            },
          },
        },
        user: {
          select: {
            id: true,
            email: true,
            createdAt: true,
            updatedAt: true,
            password: true,
            role: true, // Ensure to fetch the role field
          },
        },
      },
    });
  
}
