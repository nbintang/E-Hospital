import db from "@/lib/db";

export async function findMedicineById(id: string) {
  const medicine = await db.medicine.findFirst({ where: { id } });
  if (!medicine) return null;
  return medicine;
}

export async function findMedicines() {
  const medicines = await db.medicine.findMany();
return medicines;
}
