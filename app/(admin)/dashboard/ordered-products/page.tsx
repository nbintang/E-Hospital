import OrderedProductTable from "@/components/admin/ordered-product";
import { findOrderedProducts } from "@/repositories/ordered-products.repository";
export default async function OrderedProducts() {
  const data = await findOrderedProducts();
  if (!data) {
    return <div>No orders found</div>; // Fallback if `data` is `null`
  }

  return <OrderedProductTable data={data} />;
}