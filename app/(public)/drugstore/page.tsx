import ProductGrid from "@/components/public/drugstore/product-grid";
import { findMedicineWithCategoriesAndOrder } from "@/repositories/medicines.repository";
import { Medicine, Prisma } from "@prisma/client";
import React from "react";

export default async function DrugStore() {
const medicines = await findMedicineWithCategoriesAndOrder();
  return (
    <main className="container min-h-screen mx-auto px-4 py-8">
      <section>
        <h2 className="text-2xl font-bold mb-6">Produk Kesehatan</h2>
        <ProductGrid
          products={medicines}
        />
      </section>

    </main>
  );
}


