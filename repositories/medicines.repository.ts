import db from "@/lib/db";

export async function findMedicineById(id: string) {
  const medicine = await db.medicine.findFirst({ where: { id } });
  if (!medicine) return null;
  return medicine;
}
