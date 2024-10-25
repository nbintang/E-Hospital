import db from "@/lib/db";

export async function findOrderedProducts() {
  const orderedProducts = await db.order.findMany({
    include: {
      user: true,
      medicine:{
        include:{
            category: true
        }
      }
    },
  });
  if (!orderedProducts) return null;
  return orderedProducts.map((order) => ({
    id: order.id,
    medicine: {
      name: order.medicine.name,
      category: { name: order.medicine.category.name },
    },
    user: {
      email: order.user.email,
    },
    totalPrice: order.totalPrice,
    createdAt: order.createdAt.toISOString(),
    status: order.status,
  }));
}
