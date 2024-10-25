import OrderedProductTable from "@/components/admin/ordered-product";
import { findOrderedProducts } from "@/repositories/ordered-products.repository";
export default async function OrderedProducts() {
  const order = await findOrderedProducts();
  return <OrderedProductTable data={order} />;
}