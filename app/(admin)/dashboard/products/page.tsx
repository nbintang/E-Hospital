import { DataTableMedicine } from "@/components/admin/product";
import { findMedicines } from "@/repositories/medicines.repository";

export default async function MedicinePage() {
  const medicines = await findMedicines();
  return <DataTableMedicine data={medicines} />;
}