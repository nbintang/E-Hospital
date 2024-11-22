import db from "@/lib/db";

export async function findOrderedProducts() {
  const orderedProducts = await db.order.findMany({
    include: {
      user: true,
      medicine: {
        include: {
          category: true,
        },
      },
    },
  });
  return orderedProducts;
}
