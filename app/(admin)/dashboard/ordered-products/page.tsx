import OrderedProductTable from "@/components/admin/sections/ordered-product";
import { findOrderedProducts } from "@/repositories/orders.repository";
export default async function OrderedProducts() {
  const order = await findOrderedProducts();

  return <OrderedProductTable data={order} />;
}